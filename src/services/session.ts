import {
  deleteUserSessionFromCache,
  setUserSessionInCache,
} from "@/cache/session";
import {
  deleteUserSessionCookie,
  getUserSessionCookie,
  setUserSessionCookie,
} from "@/cookies/session";
import { createRandomId } from "@/lib/crypto";
import { InvalidError, NoSessionFoundError } from "@/lib/errors";
import { userSessionSchema } from "@/zod/schemas";
import { User } from "@prisma/client";

export async function createUserSession(user: User) {
  const sessionId = createRandomId();

  const { success, data, error } = userSessionSchema.safeParse(user);

  if (!success) {
    throw new InvalidError("Session Data", error);
  }

  try {
    await setUserSessionInCache(sessionId, data);
    await setUserSessionCookie(sessionId);
  } catch (error) {
    console.error("Error creating user session:", error);
    throw new Error("Error creating session");
  }
}

export async function deleteUserSession() {
  const sessionId = await getUserSessionCookie();

  if (!sessionId) {
    throw new NoSessionFoundError();
  }

  try {
    await deleteUserSessionFromCache(sessionId);
    await deleteUserSessionCookie();
  } catch (error) {
    console.error("Error deleting user session:", error);
    throw new Error("Error deleting user session");
  }
}
