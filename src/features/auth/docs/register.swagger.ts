import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from "@nestjs/swagger";

export const RegisterSwaggerDocs = () =>
  applyDecorators(
    ApiOperation({
      summary: "Register a new user",
      description:
        "Create a new user account with email, password and username",
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
            minLength: 6,
            example: "password123",
            description: "User's password (minimum 6 characters)",
          },
          username: {
            type: "string",
            minLength: 1,
            maxLength: 50,
            example: "johndoe",
            description: "User's username",
          },
        },
        required: ["email", "password", "username"],
      },
    }),
    ApiCreatedResponse({
      description: "User successfully registered",
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
    ApiConflictResponse({
      description: "Email already exists",
      schema: {
        type: "object",
        properties: {
          statusCode: {
            type: "number",
            example: 409,
          },
          message: {
            type: "string",
            example: "Email already exists",
          },
          error: {
            type: "string",
            example: "Conflict",
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
            example: [
              "Invalid email format",
              "Password must be at least 6 characters",
            ],
          },
          error: {
            type: "string",
            example: "Bad Request",
          },
        },
      },
    }),
  );
