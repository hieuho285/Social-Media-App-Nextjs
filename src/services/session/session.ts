import {
  getUserSessionFromCache,
  setUserSessionInCache,
} from "@/data-access-layer/session";
import { findUserById } from "@/data-access-layer/user";
import { createRandomId } from "@/lib/utils";
import { userSessionSchema } from "@/lib/validations";
import {
  getUserSessionCookie,
  setUserSessionCookie,
} from "@/services/session/cookies";
import { User } from "@prisma/client";
import { cache } from "react";
import "server-only";

export const createUserSession = async (user: User) => {
  const sessionId = createRandomId();
  const userSession = userSessionSchema.parse(user);

  await setUserSessionInCache(sessionId, userSession);
  await setUserSessionCookie(sessionId);
};

export const getCurrentUser = cache(async () => {
  const sessionId = await getUserSessionCookie();
  if (!sessionId) return null;

  const cachedUser = await getUserSessionFromCache(sessionId);
  if (!cachedUser) return null;

  const user = await findUserById(cachedUser.id, { omit: { password: true } });
  if (!user) return null;

  return { ...user, sessionId };
});
