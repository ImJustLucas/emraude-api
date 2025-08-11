import { UserRole } from "..";

export interface IJwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface IAuthenticatedUser {
  userId: string;
  email: string;
  role: UserRole;
}
