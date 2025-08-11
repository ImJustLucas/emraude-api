import { Module } from "@nestjs/common";

import { MatchController } from "./controllers/match.controller";
import { MatchService } from "./services/match.service";

@Module({
  imports: [],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
