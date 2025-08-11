import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User } from "../../../common/decorators/user.decorator";
import { UserInterceptor } from "../../../common/interceptors/user.interceptor";
import { ZodValidationPipe } from "../../../common/pipes/zod-validation.pipe";
import { AuthenticationGuard } from "../../auth/guards/authentication.guard";
import { User as UserEntity } from "../../users/schemas/user.schema";
import { GetProgressSwaggerDocs } from "../docs/get-progress.swagger";
import { UpdateProgressSwaggerDocs } from "../docs/update-progress.swagger";
import {
  type UpdateProgressDto,
  UpdateProgressSchema,
} from "../dtos/update-progress.dto";
import { ProgressService } from "../services/progress.service";

@ApiTags("Progress")
@Controller("progress")
@UseGuards(AuthenticationGuard)
@UseInterceptors(UserInterceptor)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  @GetProgressSwaggerDocs()
  async getProgress(@User() user: UserEntity) {
    const userId = (user._id as string).toString();
    const progress = await this.progressService.getProgressByUserId(userId);
    return progress;
  }

  @Post("update")
  @UpdateProgressSwaggerDocs()
  @UsePipes(new ZodValidationPipe(UpdateProgressSchema))
  async updateProgress(
    @User() user: UserEntity,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    const userId = (user._id as string).toString();
    const progress = await this.progressService.updateProgress(
      userId,
      updateProgressDto,
    );
    return progress;
  }
}
