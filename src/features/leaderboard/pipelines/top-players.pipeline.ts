/* eslint-disable @typescript-eslint/naming-convention */
import type { PipelineStage } from "mongoose";

export const createTopPlayersPipeline = (limit: number): PipelineStage[] => [
  {
    $sort: {
      totalScore: -1,
      currentLevel: -1,
      lastPlayedAt: -1,
    },
  },
  {
    $limit: limit,
  },
  // Convertir userId (string) en ObjectId pour le lookup
  {
    $addFields: {
      userObjectId: { $toObjectId: "$userId" },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "userObjectId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $unwind: "$user",
  },
  {
    $match: {
      "user.isActive": true,
    },
  },
  {
    $project: {
      userId: "$userId",
      username: "$user.username",
      totalScore: "$totalScore",
      currentLevel: "$currentLevel",
      lastPlayedAt: "$lastPlayedAt",
    },
  },
];
