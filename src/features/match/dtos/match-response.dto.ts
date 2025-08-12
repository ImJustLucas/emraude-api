import { ApiProperty } from "@nestjs/swagger";

import type { IMatchResponse, MatchStateEnum } from "../../../common/types";

export class MatchResponseDto implements IMatchResponse {
  @ApiProperty({
    description: "Match unique identifier",
    example: "507f1f77bcf86cd799439011",
  })
  id: string;

  @ApiProperty({
    description: "First player information",
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "507f1f77bcf86cd799439012",
        description: "Player 1 ID",
      },
      username: {
        type: "string",
        example: "PlayerOne",
        description: "Player 1 username",
      },
    },
  })
  player1: {
    id: string;
    username: string;
  };

  @ApiProperty({
    description: "Second player information (only if joined)",
    type: "object",
    nullable: true,
    required: [],
    properties: {
      id: {
        type: "string",
        example: "507f1f77bcf86cd799439013",
        description: "Player 2 ID",
      },
      username: {
        type: "string",
        example: "PlayerTwo",
        description: "Player 2 username",
      },
    },
  })
  player2?: {
    id: string;
    username: string;
  };

  @ApiProperty({
    description: "Current match state",
    enum: ["waiting", "playing", "finished", "canceled"],
    example: "playing",
  })
  state: MatchStateEnum;

  @ApiProperty({
    description: "Match creation date",
    type: "string",
    format: "date-time",
    example: "2023-12-07T10:30:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Winner information (only for finished matches)",
    type: "object",
    nullable: true,
    required: [],
    properties: {
      id: {
        type: "string",
        example: "507f1f77bcf86cd799439012",
        description: "Winner ID",
      },
      username: {
        type: "string",
        example: "PlayerOne",
        description: "Winner username",
      },
    },
  })
  winner?: {
    id: string;
    username: string;
  };

  @ApiProperty({
    description: "Match last update date",
    type: "string",
    format: "date-time",
    example: "2023-12-07T11:00:00Z",
  })
  updatedAt: Date;

  constructor(data: IMatchResponse) {
    this.id = data.id;
    this.player1 = data.player1;
    this.player2 = data.player2;
    this.state = data.state;
    this.createdAt = data.createdAt;
    this.winner = data.winner;
    this.updatedAt = data.updatedAt;
  }
}
