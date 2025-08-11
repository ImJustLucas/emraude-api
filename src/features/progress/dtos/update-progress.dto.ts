import { z } from "zod";

export const UpdateProgressSchema = z.object({
  currentLevel: z.number().int().min(1).optional(),
  totalScore: z.number().min(0).optional(),
  lastPlayedAt: z.date().optional(),
});

export type UpdateProgressDto = z.infer<typeof UpdateProgressSchema>;
