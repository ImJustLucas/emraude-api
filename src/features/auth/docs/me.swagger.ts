import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const MeSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get current user profile",
      description: "Retrieve the profile information of the authenticated user",
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "User profile retrieved successfully",
      schema: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
            description: "User's unique identifier",
          },
          email: {
            type: "string",
            example: "user@example.com",
            description: "User's email address",
          },
          username: {
            type: "string",
            example: "johndoe",
            description: "User's username",
          },
          role: {
            type: "string",
            enum: ["admin", "player"],
            example: "player",
            description: "User's role",
          },
          isActive: {
            type: "boolean",
            example: true,
            description: "User's active status",
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Authentication required",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 401,
          },
          message: {
            type: "string",
            example: "Unauthorized",
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: "User not found",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 404,
          },
          message: {
            type: "string",
            example: "User not found",
          },
          error: {
            type: "string",
            example: "Not Found",
          },
        },
      },
    }),
  );
