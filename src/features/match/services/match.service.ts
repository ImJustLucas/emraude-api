import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { IMatchResponse, MatchStateEnum } from "../../../common/types";
import { MatchResponseDto } from "../dtos/match-response.dto";
import type { MatchResultDto } from "../dtos/match-result.dto";
import { Match, MatchDocument } from "../schemas/match.schema";

import { Document, Model } from "mongoose";

interface IPopulatedMatch extends Document {
  _id: string;
  player1Id: {
    _id: string;
    username: string;
  };
  player2Id?: {
    _id: string;
    username: string;
  };
  winnerId?: {
    _id: string;
    username: string;
  };
  state: MatchStateEnum;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async getById(matchId: string): Promise<MatchDocument | null> {
    const match = await this.matchModel.findById(matchId);

    if (!match) {
      throw new NotFoundException("Match not found");
    }

    return match;
  }

  async create(userId: string): Promise<MatchResponseDto> {
    const existingMatch = (await this.matchModel
      .findOne({
        $and: [
          {
            $or: [{ player1Id: userId }, { player2Id: userId }],
          },
          {
            state: { $in: [MatchStateEnum.WAITING, MatchStateEnum.PLAYING] },
          },
        ],
      })
      .populate([
        { path: "player1Id", select: "username" },
        { path: "player2Id", select: "username" },
        { path: "winnerId", select: "username" },
      ])) as unknown as IPopulatedMatch | null;

    if (existingMatch) {
      return this.mapMatchToResponse(existingMatch);
    }

    const waitingMatch = await this.matchModel.findOne({
      state: MatchStateEnum.WAITING,
      player1Id: { $ne: userId },
    });

    if (waitingMatch) {
      waitingMatch.player2Id = userId as any;
      waitingMatch.state = MatchStateEnum.PLAYING;
      const updatedMatch = await waitingMatch.save();

      const populatedMatch = (await this.matchModel
        .findById(updatedMatch._id)
        .populate([
          { path: "player1Id", select: "username" },
          { path: "player2Id", select: "username" },
        ])) as unknown as IPopulatedMatch;

      return this.mapMatchToResponse(populatedMatch);
    }

    const newMatch = new this.matchModel({
      player1Id: userId as any,
      state: MatchStateEnum.WAITING,
    });

    const savedMatch = await newMatch.save();
    const populatedMatch = (await this.matchModel
      .findById(savedMatch._id)
      .populate({
        path: "player1Id",
        select: "username",
      })) as unknown as IPopulatedMatch;

    return this.mapMatchToResponse(populatedMatch);
  }

  async getMatchById(
    matchId: string,
    requestingUserId: string,
  ): Promise<MatchResponseDto> {
    const match = (await this.matchModel.findById(matchId).populate([
      { path: "player1Id", select: "username" },
      { path: "player2Id", select: "username" },
      { path: "winnerId", select: "username" },
    ])) as unknown as IPopulatedMatch | null;

    if (!match) {
      throw new NotFoundException("Match not found");
    }

    const isParticipant =
      match.player1Id._id.toString() === requestingUserId ||
      (match.player2Id && match.player2Id._id.toString() === requestingUserId);

    if (!isParticipant) {
      throw new ForbiddenException(
        "You can only view matches you participate in",
      );
    }

    return this.mapMatchToResponse(match);
  }

  async submitResult(
    matchId: string,
    resultDto: MatchResultDto,
    requestingUserId: string,
  ): Promise<MatchResponseDto> {
    const match = (await this.matchModel.findById(matchId).populate([
      { path: "player1Id", select: "username" },
      { path: "player2Id", select: "username" },
    ])) as unknown as IPopulatedMatch | null;

    if (!match) {
      throw new NotFoundException("Match not found");
    }

    if (match.state !== MatchStateEnum.PLAYING) {
      throw new BadRequestException(
        "Can only submit results for matches in progress",
      );
    }

    const isParticipant =
      match.player1Id._id.toString() === requestingUserId ||
      (match.player2Id && match.player2Id._id.toString() === requestingUserId);

    if (!isParticipant) {
      throw new ForbiddenException(
        "You can only submit results for matches you participate in",
      );
    }

    const isValidWinner =
      resultDto.winnerId === match.player1Id._id.toString() ||
      (match.player2Id &&
        resultDto.winnerId === match.player2Id._id.toString());

    if (!isValidWinner) {
      throw new BadRequestException(
        "Winner must be one of the match participants",
      );
    }

    match.state = MatchStateEnum.FINISHED;
    match.winnerId = resultDto.winnerId as any;

    const updatedMatch = await match.save();
    const populatedMatch = (await this.matchModel
      .findById(updatedMatch._id)
      .populate([
        { path: "player1Id", select: "username" },
        { path: "player2Id", select: "username" },
        { path: "winnerId", select: "username" },
      ])) as unknown as IPopulatedMatch;

    return this.mapMatchToResponse(populatedMatch);
  }

  private mapMatchToResponse(match: IPopulatedMatch): MatchResponseDto {
    const response: IMatchResponse = {
      id: match._id.toString(),
      player1: {
        id: match.player1Id._id.toString(),
        username: match.player1Id.username,
      },
      player2: match.player2Id
        ? {
            id: match.player2Id._id.toString(),
            username: match.player2Id.username,
          }
        : undefined,
      state: match.state,
      createdAt: match.createdAt,
      winner: match.winnerId
        ? {
            id: match.winnerId._id.toString(),
            username: match.winnerId.username,
          }
        : undefined,
      updatedAt: match.updatedAt,
    };

    return new MatchResponseDto(response);
  }
}
