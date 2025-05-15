import { getUserSession } from "@/lib/auth/session";
import { getSessionCookie } from "@/lib/cookies";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return null;
  }

  const user = await getUserSession(sessionId);

  return user;
});
