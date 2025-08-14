import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { GetUserSwaggerDocs } from "../docs/get-user.swagger";
import { UsersService } from "../services/users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  @GetUserSwaggerDocs()
  async getUserById(@Param("id") id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }
}
