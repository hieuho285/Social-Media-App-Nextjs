import { getInfiniteVideosByUserId } from "@/services/video";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).nullish(),
        // direction: z.enum(["forward", "backward"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { id } = ctx.user;
      const { cursor } = input;
      const result = await getInfiniteVideosByUserId(id, limit, cursor);

      // if (input.direction === "backward") {
      //   videos.reverse();
      // }

      return result;
    }),
});
