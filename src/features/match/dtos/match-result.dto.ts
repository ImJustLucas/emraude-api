import { z } from "zod";

export const MatchResultSchema = z.object({
  winnerId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "winnerId must be a valid MongoDB ObjectId",
  }),
});

export type MatchResultDto = z.infer<typeof MatchResultSchema>;
