import type { IUserResponseDto } from "../dtos/user-response.dto";
import type { User } from "../schemas/user.schema";

export const mapUserToResponse = (user: User): IUserResponseDto => ({
  id: (user._id as string).toString(),
  email: user.email,
  username: user.username,
  role: user.role,
  isActive: user.isActive,
});
