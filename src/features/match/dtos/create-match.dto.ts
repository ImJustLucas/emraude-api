import { z } from "zod";

export const CreateMatchSchema = z.object({});

export type CreateMatchDto = z.infer<typeof CreateMatchSchema>;
