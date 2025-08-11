import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersModule } from "../users/users.module";

import { ProgressController } from "./controllers/progress.controller";
import { Progress, ProgressSchema } from "./schemas/progress.schema";
import { ProgressService } from "./services/progress.service";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
    ]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
