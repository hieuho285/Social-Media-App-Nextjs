import { getVideos } from "@/data-access-layer/video";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const studioRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const videos = await getVideos();

    return videos;
  }),
});
