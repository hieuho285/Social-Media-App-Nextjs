import {
  getPaginatedVideosWithTotal,
  getVideos,
} from "@/data-access-layer/video";

export const getInfiniteVideosByUserId = async (
  userId: string,
  limit: number = 10,
  cursor?: string | null,
) => {
  const videos = await getVideos({
    take: limit + 1,
    where: {
      userId,
    },
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      id: "asc",
    },
  });

  let nextCursor: typeof cursor = undefined;
  if (videos.length > limit) {
    const nextItem = videos.pop();
    nextCursor = nextItem!.id;
  }

  return { videos, nextCursor };
};

export const getPaginatedVideosByUserId = async (
  userId: string,
  page: number,
  limit: number = 10,
) => {
  const [videos, total] = await getPaginatedVideosWithTotal({
    take: limit,
    skip: page * 10,
    where: {
      userId,
    },
    orderBy: {
      id: "asc",
    },
  });

  return { videos, total };
};
