import { getUserFromSession } from "@/cache/helpers";
import { getSessionCookie } from "@/cookies/session";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return null;
  }

  const user = await getUserFromSession(sessionId);

  return user;
});
