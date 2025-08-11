import { z } from "zod";

export const UpdateProgressSchema = z.object({
  currentLevel: z.number().int().min(1),
  totalScore: z.number().min(0),
});

export type UpdateProgressDto = z.infer<typeof UpdateProgressSchema>;
