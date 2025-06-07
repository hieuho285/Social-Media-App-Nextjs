import { userRouter } from "@/trpc/routers/userRouter";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
