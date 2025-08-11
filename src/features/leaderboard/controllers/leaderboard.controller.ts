import { Controller } from "@nestjs/common";

import { LeaderboardService } from "../services/leaderboard.service";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}
}
