import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { MatchStateEnum } from "../../../common/types";
import { User } from "../../users/schemas/user.schema";

import { Document, Types } from "mongoose";

export type MatchDocument = Match & Document;

@Schema({ timestamps: true })
export class Match extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  player1Id: User;

  @Prop({ type: Types.ObjectId, ref: "User", required: false })
  player2Id?: User;

  @Prop({
    type: String,
    enum: Object.values(MatchStateEnum),
    default: MatchStateEnum.WAITING,
  })
  state: MatchStateEnum;

  @Prop({ type: Types.ObjectId, ref: "User", required: false })
  winnerId?: User;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

MatchSchema.index({ state: 1 });
MatchSchema.index({ player1Id: 1 });
MatchSchema.index({ player2Id: 1 });
MatchSchema.index({ createdAt: -1 });
MatchSchema.index({ state: 1, createdAt: 1 });
