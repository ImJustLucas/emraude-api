import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiBadRequestResponse } from "@nestjs/swagger";

export const GetUserSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get user by ID",
      description: "Retrieve a user's public profile information by their unique identifier",
    }),
    ApiParam({
      name: "id",
      description: "User's unique identifier (MongoDB ObjectId)",
      example: "507f1f77bcf86cd799439011",
      type: "string",
    }),
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
    ApiBadRequestResponse({
      description: "Invalid user ID format",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 400,
          },
          message: {
            type: "string",
            example: "Invalid ID format",
          },
          error: {
            type: "string",
            example: "Bad Request",
          },
        },
      },
    }),
  );