import { UserRole } from "src/common/types";

export interface ICreateUserDto {
  email: string;
  username: string;
  password: string;
  role?: UserRole;
  isActive?: boolean;
}
