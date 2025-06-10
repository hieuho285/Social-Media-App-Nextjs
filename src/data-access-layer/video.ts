import { prisma } from "@/lib/db";

export const getVideos = async () => {
  return await prisma.video.findMany();
};
