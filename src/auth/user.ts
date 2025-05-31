import "server-only";

import { getUserSessionFromCache } from "@/cache/session";
import { getUserSessionCookie } from "@/cookies/session";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const sessionId = await getUserSessionCookie();
  if (!sessionId) return null;

  const cachedUser = await getUserSessionFromCache(sessionId);
  if (!cachedUser) return null;

  return { ...cachedUser, sessionId };
});
