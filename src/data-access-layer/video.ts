import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getVideos = async (args: Prisma.VideoFindManyArgs) => {
  return await prisma.video.findMany(args);
};
