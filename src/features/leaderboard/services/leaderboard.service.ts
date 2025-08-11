import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import type { ILeaderboardEntry } from "../../../common/types";
import {
  Progress,
  ProgressDocument,
} from "../../progress/schemas/progress.schema";
import type { LeaderboardResponseDto } from "../dtos/leaderboard-response.dto";
import { createTopPlayersPipeline } from "../pipelines/top-players.pipeline";

import { Model } from "mongoose";

interface IAggregationResult {
  userId: string;
  username: string;
  totalScore: number;
  currentLevel: number;
  lastPlayedAt: Date;
}

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
  ) {}

  async getTopPlayers(limit: number = 10): Promise<LeaderboardResponseDto> {
    const pipeline = createTopPlayersPipeline(limit);
    const results =
      await this.progressModel.aggregate<IAggregationResult>(pipeline);

    const playersWithRank: ILeaderboardEntry[] = results.map(
      (player, index) => ({
        rank: index + 1,
        ...player,
      }),
    );

    const totalCount = await this.progressModel.countDocuments({});

    return {
      players: playersWithRank,
      total: totalCount,
      limit,
    };
  }
}
