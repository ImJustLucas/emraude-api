import { UnauthorizedException } from "@nestjs/common";

export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(
    message: string,
    metadata?: { details?: string; [key: string]: unknown },
  ) {
    super({
      message,
      statusCode: 401,
      error: "Unauthorized",
      ...metadata,
    });
  }
}