export enum MatchStateEnum {
  WAITING = "waiting",
  PLAYING = "playing",
  FINISHED = "finished",
  CANCELED = "canceled",
}

export interface IMatch {
  _id: string;
  player1Id: string;
  player2Id?: string;
  state: MatchStateEnum;
  createdAt: Date;
  winnerId?: string;
  updatedAt: Date;
}

export interface IMatchResultDto {
  winnerId: string;
}

export interface IMatchResponse {
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
}
