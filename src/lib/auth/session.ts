"use server";

import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/lib/cookies";
import { createRandomId } from "@/lib/utils";
import { sessionSchema } from "@/lib/zod/schemas";
import { SessionType } from "@/lib/zod/types";
import {
  deleteSessionFromCache,
  getSessionFromCache,
  setSessionInCache,
} from "@/services/cache/session";

export async function getUserSession(sessionId: string | null) {
  if (!sessionId) {
    return null;
  }

  const session = await getSessionFromCache(sessionId);

  if (!session) {
    return null;
  }

  const { success, data: user } = sessionSchema.safeParse(JSON.parse(session));

  return success ? user : null;
}

export async function createUserSession(user: SessionType) {
  const sessionId = createRandomId();

  const { success, data: sessionData } = sessionSchema.safeParse(user);
  if (!success) {
    throw new Error("Invalid session data");
  }

  await setSessionInCache(sessionId, JSON.stringify(sessionData));

  await setSessionCookie(sessionId);
}

export async function deleteUserSession() {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    return;
  }

  await deleteSessionFromCache(sessionId);
  await deleteSessionCookie();
}
