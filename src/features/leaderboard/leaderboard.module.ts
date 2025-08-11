import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Progress, ProgressSchema } from "../progress/schemas/progress.schema";
import { User, UserSchema } from "../users/schemas/user.schema";

import { LeaderboardController } from "./controllers/leaderboard.controller";
import { LeaderboardService } from "./services/leaderboard.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
