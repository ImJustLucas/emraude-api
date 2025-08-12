import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { ICreateUserDto } from "../dtos/create-user.dto";
import { User, UserDocument } from "../schemas/user.schema";

import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select("-password");

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findByIdForAuth(id: string): Promise<User | null> {
    return (await this.userModel
      .findById(id)
      .select("-password")) as User | null;
  }

  async create(createUserDto: ICreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email.toLowerCase(),
    });

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const user = new this.userModel({
      email: createUserDto.email.toLowerCase(),
      password: hashedPassword,
      username: createUserDto.username,
      role: createUserDto.role || "player",
      isActive: createUserDto.isActive ?? true,
    });

    return await user.save();
  }
}
