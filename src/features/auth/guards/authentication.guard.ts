import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthenticationGuard extends AuthGuard("jwt") {
  handleRequest<T = any>(err: unknown, user: T, _info: unknown): T {
    if (err || !user) {
      throw (err as Error) || new UnauthorizedException("Authentication required");
    }
    return user;
  }
}
