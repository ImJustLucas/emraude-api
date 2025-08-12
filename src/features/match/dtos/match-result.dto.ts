import { ApiProperty } from "@nestjs/swagger";

import { z } from "zod";

export const MatchResultSchema = z.object({
  winnerId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "winnerId must be a valid MongoDB ObjectId",
  }),
});

export class MatchResultDto {
  @ApiProperty({
    description: "ID of the winning player (must be a participant)",
    pattern: "^[0-9a-fA-F]{24}$",
    example: "507f1f77bcf86cd799439012",
  })
  winnerId: string;
}

export type MatchResultDtoType = z.infer<typeof MatchResultSchema>;
