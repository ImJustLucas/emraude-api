import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const UpdateProgressSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Update user progress",
      description:
        "Update the game progression (level, score) of the authenticated user",
    }),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          currentLevel: {
            type: "number",
            minimum: 1,
            example: 6,
            description: "New current level (optional)",
          },
          totalScore: {
            type: "number",
            minimum: 0,
            example: 1500,
            description: "New total score (optional)",
          },
          lastPlayedAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T11:00:00Z",
            description: "Date of game session (optional)",
          },
        },
      },
    }),
    ApiOkResponse({
      description: "Progress updated successfully",
      schema: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
            description: "Progress unique identifier",
          },
          userId: {
            type: "string",
            example: "507f1f77bcf86cd799439012",
            description: "User unique identifier",
          },
          currentLevel: {
            type: "number",
            example: 6,
            description: "Updated current level",
          },
          totalScore: {
            type: "number",
            example: 1500,
            description: "Updated total score",
          },
          lastPlayedAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T11:00:00Z",
            description: "Updated last played date",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-01T10:30:00Z",
            description: "Progress creation date",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T11:00:00Z",
            description: "Progress last update date",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Invalid input data",
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Validation failed",
          },
          errors: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["currentLevel: Number must be greater than 0"],
          },
          statusCode: {
            type: "number",
            example: 400,
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
  );
