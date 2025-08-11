import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "../../users/schemas/user.schema";

import { Document, Types } from "mongoose";

export type ProgressDocument = Progress & Document;

@Schema({ timestamps: true })
export class Progress extends Document {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId: User;

  @Prop({ default: 1, min: 1 })
  currentLevel: number;

  @Prop({ default: 0, min: 0 })
  totalScore: number;

  @Prop({ default: Date.now })
  lastPlayedAt: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

ProgressSchema.index({ userId: 1 });
ProgressSchema.index({ totalScore: -1 });
