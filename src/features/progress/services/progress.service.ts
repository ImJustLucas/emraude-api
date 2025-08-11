import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import type { UpdateProgressDto } from "../dtos/update-progress.dto";
import { Progress, ProgressDocument } from "../schemas/progress.schema";

import { Model } from "mongoose";

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
  ) {}

  async getProgressByUserId(userId: string): Promise<Progress> {
    let progress = await this.progressModel.findOne({ userId });

    if (!progress) {
      progress = new this.progressModel({
        userId,
        currentLevel: 1,
        totalScore: 0,
        lastPlayedAt: new Date(),
      });
      await progress.save();
    }

    return progress;
  }

  async updateProgress(
    userId: string,
    updateData: UpdateProgressDto,
  ): Promise<Progress> {
    const progress = await this.progressModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          currentLevel: updateData.currentLevel,
          totalScore: updateData.totalScore,
          lastPlayedAt: new Date(),
        },
      },
      { new: true, upsert: true },
    );

    if (!progress) {
      throw new NotFoundException("Progress not found");
    }

    return progress;
  }

  async incrementScore(userId: string, scoreToAdd: number): Promise<Progress> {
    const progress = await this.progressModel.findOneAndUpdate(
      { userId },
      {
        $inc: { totalScore: scoreToAdd },
        $set: { lastPlayedAt: new Date() },
      },
      { new: true, upsert: true },
    );

    if (!progress) {
      throw new NotFoundException("Progress not found");
    }

    return progress;
  }

  async levelUp(userId: string): Promise<Progress> {
    const progress = await this.progressModel.findOneAndUpdate(
      { userId },
      {
        $inc: { currentLevel: 1 },
        $set: { lastPlayedAt: new Date() },
      },
      { new: true },
    );

    if (!progress) {
      throw new NotFoundException("Progress not found");
    }

    return progress;
  }
}
