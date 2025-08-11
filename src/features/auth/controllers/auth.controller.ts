import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UsersService } from "../../users/services/users.service";
import { mapUserToResponse } from "../../users/utils/user-mapper";
import { LoginSwaggerDocs } from "../docs/login.swagger";
import { MeSwaggerDocs } from "../docs/me.swagger";
import { RegisterSwaggerDocs } from "../docs/register.swagger";
import { type LoginDto, LoginSchema } from "../dtos/login.dto";
import { type SignupDto, SignupSchema } from "../dtos/signup.dto";
import { AuthenticationGuard } from "../guards/authentication.guard";
import { AuthService } from "../services/auth.service";

import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";

interface IAuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
  };
}

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post("register")
  @RegisterSwaggerDocs()
  @UsePipes(new ZodValidationPipe(SignupSchema))
  async register(@Body() signupDto: SignupDto) {
    return this.authService.register(signupDto);
  }

  @Post("login")
  @LoginSwaggerDocs()
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("me")
  @MeSwaggerDocs()
  @UseGuards(AuthenticationGuard)
  async getProfile(@Request() req: IAuthenticatedRequest) {
    const user = await this.usersService.findById(req.user.sub);
    return mapUserToResponse(user);
  }
}
