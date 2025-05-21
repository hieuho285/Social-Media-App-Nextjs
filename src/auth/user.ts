import { getUserSessionFromCache } from "@/cache/session";
import { getUserSessionCookie } from "@/cookies/session";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const sessionId = await getUserSessionCookie();
  if (!sessionId) return null;
  const user = await getUserSessionFromCache(sessionId);
  if (!user) return null;

  return { ...user, sessionId };
});
