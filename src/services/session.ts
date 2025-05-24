"use server";

import { setUserSessionInCache } from "@/cache/session";
import { setUserSessionCookie } from "@/cookies/session";
import { createRandomId } from "@/lib/crypto";
import { userSessionSchema } from "@/zod/schemas";
import { User } from "@prisma/client";

export const createUserSession = async (user: User) => {
  const sessionId = createRandomId();
  const userSession = userSessionSchema.parse(user);

  await setUserSessionInCache(sessionId, userSession);
  await setUserSessionCookie(sessionId);
};
