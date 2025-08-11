import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const LoginSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "User login",
      description: "Authenticate user with email and password",
    }),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
            description: "User's email address",
          },
          password: {
            type: "string",
            example: "password123",
            description: "User's password",
          },
        },
        required: ["email", "password"],
      },
    }),
    ApiOkResponse({
      description: "User successfully authenticated",
      schema: {
        type: "object",
        properties: {
          access_token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            description: "JWT access token",
          },
          user: {
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
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Invalid credentials or inactive user",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 401,
          },
          message: {
            type: "string",
            example: "Invalid credentials",
          },
          error: {
            type: "string",
            example: "Unauthorized",
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: "Invalid input data",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 400,
          },
          message: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["Invalid email format", "Password is required"],
          },
          error: {
            type: "string",
            example: "Bad Request",
          },
        },
      },
    }),
  );
