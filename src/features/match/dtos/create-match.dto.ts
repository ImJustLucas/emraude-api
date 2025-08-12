import { z } from "zod";

export const CreateMatchSchema = z.object({});

export class CreateMatchDto {
  // No properties needed - match creation is automatic
}

export type CreateMatchDtoType = z.infer<typeof CreateMatchSchema>;
