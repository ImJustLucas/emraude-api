import { Controller } from "@nestjs/common";

import { MatchService } from "../services/match.service";

@Controller("match")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
}
