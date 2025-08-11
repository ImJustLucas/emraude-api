import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../../users/services/users.service";
import { LoginDto } from "../dtos/login.dto";
import { SignupDto } from "../dtos/signup.dto";

import * as bcrypt from "bcryptjs";
import { IJwtPayload } from "src/common/types";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(signupDto: SignupDto) {
    const user = await this.usersService.create({
      ...signupDto,
      role: "player",
      isActive: true,
    });

    const payload: IJwtPayload = {
      sub: (user._id as string).toString(),
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: IJwtPayload = {
      sub: (user._id as string).toString(),
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
