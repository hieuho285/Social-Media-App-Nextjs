import { getVideos } from "@/data-access-layer/video";

export const getInfiniteVideosByUserId = async (
  userId: string,
  limit: number,
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

  return { videos, nextCursor, prevCursor };
};

export const getPaginatedVideosByUserId = async (
  userId: string,
  limit: number,
  currentPage: number = 1,
  cursor?: string | null,
) => {
  const videos = await getVideos({
    take: limit,
    skip: !cursor ? (currentPage - 1) * limit : 1,
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
