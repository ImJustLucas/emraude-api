import type { ILeaderboardEntry } from "../../../common/types";

export class LeaderboardResponseDto {
  players: ILeaderboardEntry[];
  total: number;
  limit: number;

  constructor(players: ILeaderboardEntry[], total: number, limit: number) {
    this.players = players;
    this.total = total;
    this.limit = limit;
  }
}
