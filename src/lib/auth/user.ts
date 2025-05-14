import { getUserSession } from "@/lib/auth/session";
import { getSessionCookie } from "@/lib/cookies";
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  const sessionId = await getSessionCookie();

  return await getUserSession(sessionId);
});
