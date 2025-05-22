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
import { NoSessionFoundError } from "@/lib/errors";
import { userSessionSchema } from "@/zod/schemas";
import { User } from "@prisma/client";

export const createUserSession = async (user: User) => {
  try {
    const sessionId = createRandomId();
    const userSession = userSessionSchema.parse(user);
    await setUserSessionInCache(sessionId, userSession);
    await setUserSessionCookie(sessionId);
  } catch (error) {
    console.log("Error creating user session: ", error);
    throw new Error("Error Creating User Session");
  }
};

export const deleteUserSession = async () => {
  try {
    const sessionId = await getUserSessionCookie();
    if (!sessionId) throw new NoSessionFoundError();

    await deleteUserSessionFromCache(sessionId);
    await deleteUserSessionCookie();
  } catch (error) {
    console.log("Error deleting user session: ", error);
    throw new Error("Error Deleting User Session");
  }
};
