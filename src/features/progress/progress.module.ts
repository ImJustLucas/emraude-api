import { Module } from "@nestjs/common";

import { ProgressController } from "./controllers/progress.controller";
import { ProgressService } from "./services/progress.service";

@Module({
  imports: [],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
