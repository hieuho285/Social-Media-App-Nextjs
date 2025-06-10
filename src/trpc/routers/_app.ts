import { studioRouter } from "@/trpc/routers/studioRouter";
import { userRouter } from "@/trpc/routers/userRouter";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  user: userRouter,
  studio: studioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
