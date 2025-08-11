import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const GetLeaderboardSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get top players leaderboard",
      description:
        "Retrieve the top players ranking based on total score. Returns players with their rank, score, level and last activity.",
    }),
    ApiBearerAuth(),
    ApiQuery({
      name: "limit",
      required: false,
      type: Number,
      minimum: 1,
      maximum: 50,
      example: 10,
      description: "Number of top players to retrieve (default: 10, max: 50)",
    }),
    ApiOkResponse({
      description: "Leaderboard retrieved successfully",
      schema: {
        type: "object",
        properties: {
          players: {
            type: "array",
            items: {
              type: "object",
              properties: {
                rank: {
                  type: "number",
                  example: 1,
                  description: "Player rank in leaderboard",
                },
                userId: {
                  type: "string",
                  example: "507f1f77bcf86cd799439011",
                  description: "User unique identifier",
                },
                username: {
                  type: "string",
                  example: "PlayerOne",
                  description: "Player username",
                },
                totalScore: {
                  type: "number",
                  example: 15000,
                  description: "Player total score",
                },
                currentLevel: {
                  type: "number",
                  example: 8,
                  description: "Player current level",
                },
                lastPlayedAt: {
                  type: "string",
                  format: "date-time",
                  example: "2023-12-07T14:30:00Z",
                  description: "Last game session date",
                },
              },
            },
          },
          total: {
            type: "number",
            example: 150,
            description: "Total number of active players with scores",
          },
          limit: {
            type: "number",
            example: 10,
            description: "Number of players requested",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Invalid query parameters",
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
            example: ["limit: Limit must be between 1 and 50"],
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
