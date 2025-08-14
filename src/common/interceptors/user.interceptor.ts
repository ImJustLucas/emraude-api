import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { UsersService } from "../../features/users/services/users.service";
import { IAuthenticatedRequest } from "../types/request";

import { Observable } from "rxjs";

@Injectable()
export class UserInterceptor implements NestInterceptor<unknown, unknown> {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();

    if (request.user?.sub) {
      const jwtPayload = request.user;
      try {
        const userEntity = await this.usersService.findById(jwtPayload.sub);
        request.userEntity = userEntity;
        console.log("User entity loaded:", userEntity?.email);
      } catch (error) {
        console.log("Failed to load user entity:", error.message);
        request.userEntity = undefined;
      }
    } else {
      console.log("No JWT user in request");
    }

    return next.handle();
  }
}
