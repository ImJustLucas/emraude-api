import { z } from "zod";

export const CreateMatchSchema = z.object({});

export class CreateMatchDto {}

export type CreateMatchDtoType = z.infer<typeof CreateMatchSchema>;
