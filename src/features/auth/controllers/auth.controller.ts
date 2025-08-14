import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { User } from "../../../common/decorators/user.decorator";
import { UserInterceptor } from "../../../common/interceptors/user.interceptor";
import { ZodValidationPipe } from "../../../common/pipes/zod-validation.pipe";
import { User as UserEntity } from "../../users/schemas/user.schema";
import { LoginSwaggerDocs } from "../docs/login.swagger";
import { MeSwaggerDocs } from "../docs/me.swagger";
import { RegisterSwaggerDocs } from "../docs/register.swagger";
import { type LoginDto, LoginSchema } from "../dtos/login.dto";
import { type SignupDto, SignupSchema } from "../dtos/signup.dto";
import { AuthenticationGuard } from "../guards/authentication.guard";
import { AuthService } from "../services/auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @RegisterSwaggerDocs()
  async register(
    @Body(new ZodValidationPipe(SignupSchema)) signupDto: SignupDto,
  ) {
    return this.authService.register(signupDto);
  }

  @Post("login")
  @LoginSwaggerDocs()
  async login(@Body(new ZodValidationPipe(LoginSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("me")
  @MeSwaggerDocs()
  @UseGuards(AuthenticationGuard)
  @UseInterceptors(UserInterceptor)
  me(@User() user: UserEntity) {
    return user;
  }
}
