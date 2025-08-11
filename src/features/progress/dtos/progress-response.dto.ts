export interface IProgressResponseDto {
  id: string;
  userId: string;
  currentLevel: number;
  totalScore: number;
  lastPlayedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
