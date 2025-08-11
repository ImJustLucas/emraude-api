import { z } from "zod";

export const MatchStateSchema = z.enum([
  "waiting",
  "playing",
  "finished",
  "cancelled",
]);

export type MatchState = z.infer<typeof MatchStateSchema>;
