import { getSessionFromCache } from "@/cache/session";
import { sessionSchema } from "@/zod/schemas";

export async function getUserFromSession(sessionId: string) {
  const session = await getSessionFromCache(sessionId);

  const { success, data: user } = sessionSchema.safeParse(session);

  return success ? user : null;
}
