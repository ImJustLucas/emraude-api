import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User } from "../../../common/decorators/user.decorator";
import { UserInterceptor } from "../../../common/interceptors/user.interceptor";
import { ZodValidationPipe } from "../../../common/pipes/zod-validation.pipe";
import { AuthenticationGuard } from "../../auth/guards/authentication.guard";
import { User as UserEntity } from "../../users/schemas/user.schema";
import { CreateMatchSwaggerDocs } from "../docs/create-match.swagger";
import { GetMatchSwaggerDocs } from "../docs/get-match.swagger";
import { SubmitResultSwaggerDocs } from "../docs/submit-result.swagger";
import { MatchResultDto } from "../dtos";
import { MatchResultSchema } from "../dtos";
import { MatchDocument } from "../schemas/match.schema";
import { MatchService } from "../services/match.service";

@ApiTags("Match")
@Controller("match")
@UseGuards(AuthenticationGuard)
@UseInterceptors(UserInterceptor)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post("create")
  @CreateMatchSwaggerDocs()
  async createMatch(@User() user: UserEntity): Promise<MatchDocument> {
    const userId = (user._id as string).toString();
    return this.matchService.create(userId);
  }

  @Get(":id")
  @GetMatchSwaggerDocs()
  async getMatch(
    @Param("id") matchId: string,
    @User() user: UserEntity,
  ): Promise<MatchDocument> {
    const userId = (user._id as string).toString();
    return this.matchService.getMatchById(matchId, userId);
  }

  @Post(":id/result")
  @SubmitResultSwaggerDocs()
  async submitResult(
    @Param("id") matchId: string,
    @Body(new ZodValidationPipe(MatchResultSchema)) resultDto: MatchResultDto,
    @User() user: UserEntity,
  ): Promise<MatchDocument> {
    const userId = (user._id as string).toString();
    return this.matchService.submitResult(matchId, resultDto, userId);
  }
}
