import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ZodValidationPipe } from "../../../common/pipes/zod-validation.pipe";
import { AuthenticationGuard } from "../../auth/guards/authentication.guard";
import { GetLeaderboardSwaggerDocs } from "../docs/get-leaderboard.swagger";
import type { LeaderboardQueryDto } from "../dtos/leaderboard-query.dto";
import { LeaderboardQuerySchema } from "../dtos/leaderboard-query.dto";
import type { LeaderboardResponseDto } from "../dtos/leaderboard-response.dto";
import { LeaderboardService } from "../services/leaderboard.service";

@ApiTags("Leaderboard")
@Controller("leaderboard")
@UseGuards(AuthenticationGuard)
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get("top")
  @GetLeaderboardSwaggerDocs()
  async getTopPlayers(
    @Query(new ZodValidationPipe(LeaderboardQuerySchema))
    query: LeaderboardQueryDto,
  ): Promise<LeaderboardResponseDto> {
    return await this.leaderboardService.getTopPlayers(query.limit);
  }
}
