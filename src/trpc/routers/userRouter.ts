import { getCurrentUser } from "@/services/session";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  current: baseProcedure.query(async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to access this resource.",
      });
    }
    return user
  }),
});
