import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const CreateMatchSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Create or join a match",
      description:
        "Create a new match or join an existing waiting match. Uses automatic matchmaking - if a match is waiting for a player, you'll join it. Otherwise, creates a new match in waiting state.",
    }),
    ApiBearerAuth(),
    ApiCreatedResponse({
      description: "Match created or joined successfully",
      schema: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
            description: "Match unique identifier",
          },
          player1: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "507f1f77bcf86cd799439012",
                description: "Player 1 ID",
              },
              username: {
                type: "string",
                example: "PlayerOne",
                description: "Player 1 username",
              },
            },
          },
          player2: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                example: "507f1f77bcf86cd799439013",
                description: "Player 2 ID",
              },
              username: {
                type: "string",
                example: "PlayerTwo",
                description: "Player 2 username",
              },
            },
            description: "Player 2 info (only if match is playing)",
          },
          state: {
            type: "string",
            enum: ["waiting", "playing", "finished"],
            example: "waiting",
            description: "Current match state",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T10:30:00Z",
            description: "Match creation date",
          },
          winner: {
            type: "object",
            nullable: true,
            properties: {
              id: {
                type: "string",
                description: "Winner ID",
              },
              username: {
                type: "string",
                description: "Winner username",
              },
            },
            description: "Winner info (only for finished matches)",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T10:30:00Z",
            description: "Match last update date",
          },
        },
      },
    }),
    ApiConflictResponse({
      description: "User already has an active match",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 409,
          },
          message: {
            type: "string",
            example: "User already has an active match",
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
