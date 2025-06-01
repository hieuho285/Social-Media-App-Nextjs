"use server";

import { getUserSessionFromCache } from "@/cache/session";
import { getUserSessionCookie } from "@/cookies/session";
import { findUserById } from "@/data-access/user";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const sessionId = await getUserSessionCookie();
  if (!sessionId) return null;

  const cachedUser = await getUserSessionFromCache(sessionId);
  if (!cachedUser) return null;

  const user = await findUserById(cachedUser.id, { omit: { password: true } });
  if (!user) return null;

  return { ...user, sessionId };
});
