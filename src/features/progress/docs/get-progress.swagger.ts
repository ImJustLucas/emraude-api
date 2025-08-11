import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const GetProgressSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get user progress",
      description:
        "Retrieve the current game progression of the authenticated user",
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: "User progress retrieved successfully",
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
            example: 5,
            description: "Current game level",
          },
          totalScore: {
            type: "number",
            example: 1250,
            description: "Total accumulated score",
          },
          lastPlayedAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T10:30:00Z",
            description: "Date of last game session",
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
            example: "2023-12-07T10:30:00Z",
            description: "Progress last update date",
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
