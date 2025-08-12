import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { DatabaseModule } from "./core/database/database.core";
import { AuthModule } from "./features/auth/auth.module";
import { LeaderboardModule } from "./features/leaderboard/leaderboard.module";
import { MatchModule } from "./features/match/match.module";
import { ProgressModule } from "./features/progress/progress.module";
import { UsersModule } from "./features/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env["NODE_ENV"] === "production"
          ? [".env.production", ".env"]
          : [
              ".env.development.local",
              ".env.local",
              ".env.development",
              ".env",
            ],
      isGlobal: true,
    }),
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    ProgressModule,
    MatchModule,
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
