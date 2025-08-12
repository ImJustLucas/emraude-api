export interface ILeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  totalScore: number;
  currentLevel: number;
  lastPlayedAt: Date;
}

export interface ILeaderboardQuery {
  limit?: number;
}
