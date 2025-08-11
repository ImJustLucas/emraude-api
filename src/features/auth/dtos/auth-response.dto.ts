import { UserRoleSchema } from "src/common/types";
import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.email(),
  username: z.string(),
  role: UserRoleSchema,
  isActive: z.boolean(),
});

export const AuthResponseSchema = z.object({
  access_token: z.string(),
  user: UserResponseSchema,
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
export type UserResponseDto = z.infer<typeof UserResponseSchema>;
