import { findUserById } from "@/data-access-layer/user";
import { getCurrentSession } from "@/services/session";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  current: baseProcedure.query(async () => {
    const session = await getCurrentSession();
    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to access this resource.",
      });
    }

    const user = await findUserById(session.user.id, {
      omit: { password: true },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      });
    }

    return { user };
  }),
});
