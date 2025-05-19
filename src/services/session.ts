import { deleteSessionFromCache, setSessionInCache } from "@/cache/session";
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/cookies/session";
import { createRandomId } from "@/lib/crypto";
import {
  InvalidSessionDataError,
  NoSessionFoundError,
} from "@/lib/errors/auth";
import { sessionSchema } from "@/zod/schemas";
import { SessionType } from "@/zod/types";

export async function createUserSession(user: SessionType) {
  const sessionId = createRandomId();

  const { success, data: sessionData, error } = sessionSchema.safeParse(user);

  if (!success) {
    throw new InvalidSessionDataError(error);
  }

  try {
    await setSessionInCache(sessionId, JSON.stringify(sessionData));
    await setSessionCookie(sessionId);
  } catch (error) {
    console.error("Error creating user session:", error);
    throw new Error("Error creating user session");
  }
}

export async function deleteUserSession() {
  const sessionId = await getSessionCookie();

  if (!sessionId) {
    throw new NoSessionFoundError();
  }

  try {
    await deleteSessionFromCache(sessionId);
    await deleteSessionCookie();
  } catch (error) {
    console.error("Error deleting user session:", error);
    throw new Error("Error deleting user session");
  }
}
