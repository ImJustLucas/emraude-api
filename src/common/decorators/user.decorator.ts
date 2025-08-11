import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import { User as UserEntity } from "../../features/users/schemas/user.schema";
import { IAuthenticatedRequest } from "../types/request";

export const User = createParamDecorator(
  (
    data: keyof UserEntity | undefined,
    ctx: ExecutionContext,
  ): UserEntity | string => {
    const request = ctx.switchToHttp().getRequest<IAuthenticatedRequest>();

    // The user entity should be populated by UserInterceptor
    if (request.userEntity) {
      return data ? (request.userEntity[data] as string) : request.userEntity;
    }

    // Throw error if no user is found
    throw new UnauthorizedException("User not found");
  },
);
