import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const GetMatchSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Get match details",
      description:
        "Retrieve details of a specific match. Only participants can view match details.",
    }),
    ApiBearerAuth(),
    ApiParam({
      name: "id",
      type: String,
      description: "Match ID",
      example: "507f1f77bcf86cd799439011",
    }),
    ApiOkResponse({
      description: "Match details retrieved successfully",
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
            description: "Player 2 info (only if joined)",
          },
          state: {
            type: "string",
            enum: ["waiting", "playing", "finished"],
            example: "playing",
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
    ApiNotFoundResponse({
      description: "Match not found",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 404,
          },
          message: {
            type: "string",
            example: "Match not found",
          },
        },
      },
    }),
    ApiForbiddenResponse({
      description: "Access denied - not a participant",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 403,
          },
          message: {
            type: "string",
            example: "You can only view matches you participate in",
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
