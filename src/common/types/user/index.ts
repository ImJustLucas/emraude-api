import { z } from "zod";

export const UserRoleSchema = z.enum(["admin", "player"]);
export type UserRole = z.infer<typeof UserRoleSchema>;
