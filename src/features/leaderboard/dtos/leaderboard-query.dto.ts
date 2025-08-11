import { z } from "zod";

export const LeaderboardQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val >= 1 && val <= 50, {
      message: "Limit must be between 1 and 50",
    }),
});

export type LeaderboardQueryDto = z.infer<typeof LeaderboardQuerySchema>;
