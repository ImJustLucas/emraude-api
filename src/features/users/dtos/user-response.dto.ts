import type { UserRole } from "src/common/types";

export interface IUserResponseDto {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}