import type { IMatchResponse, MatchStateEnum } from "../../../common/types";

export class MatchResponseDto implements IMatchResponse {
  id: string;
  player1: {
    id: string;
    username: string;
  };
  player2?: {
    id: string;
    username: string;
  };
  state: MatchStateEnum;
  createdAt: Date;
  winner?: {
    id: string;
    username: string;
  };
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
