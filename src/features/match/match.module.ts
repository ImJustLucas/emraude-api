import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersModule } from "../users/users.module";

import { MatchController } from "./controllers/match.controller";
import { Match, MatchSchema } from "./schemas/match.schema";
import { MatchService } from "./services/match.service";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
