import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const SubmitResultSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Submit match result",
      description:
        "Submit the result of a match by specifying the winner. Only participants can submit results and only for matches in 'playing' state.",
    }),
    ApiBearerAuth(),
    ApiParam({
      name: "id",
      type: String,
      description: "Match ID",
      example: "507f1f77bcf86cd799439011",
    }),
    ApiBody({
      type: "application/json",
      schema: {
        $ref: "#/components/schemas/MatchResultDto",
      },
    }),
    ApiOkResponse({
      description: "Match result submitted successfully",
      schema: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
            description: "Match unique identifier",
          },
          player1Id: {
            type: "object",
            properties: {
              _id: {
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
          player2Id: {
            type: "object",
            properties: {
              _id: {
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
          },
          state: {
            type: "string",
            example: "finished",
            description: "Match state (will be 'finished')",
          },
          winnerId: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "507f1f77bcf86cd799439012",
                description: "Winner ID",
              },
              username: {
                type: "string",
                example: "PlayerOne",
                description: "Winner username",
              },
            },
            description: "Winner information",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T10:30:00Z",
            description: "Match creation date",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2023-12-07T11:00:00Z",
            description: "Match last update date",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Invalid request data or match state",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 400,
          },
          message: {
            type: "string",
            examples: [
              "Can only submit results for matches in progress",
              "Winner must be one of the match participants",
              "Validation failed",
            ],
          },
          errors: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["winnerId: winnerId must be a valid MongoDB ObjectId"],
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
            example:
              "You can only submit results for matches you participate in",
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
