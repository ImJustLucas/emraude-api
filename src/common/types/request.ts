import { User } from "../../features/users/schemas/user.schema";

import { IJwtPayload } from "./auth";

import { Request } from "express";

export interface IAuthenticatedRequest extends Request {
  user?: IJwtPayload;
  userEntity?: User;
}
