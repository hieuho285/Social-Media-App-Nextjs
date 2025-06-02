"use server";

import { deleteUserSessionFromCache } from "@/data-access-layer/session";
import { NoSessionFoundError } from "@/lib/error";
import { getErrorMessage } from "@/lib/utils";
import {
  deleteUserSessionCookie,
  getUserSessionCookie,
} from "@/services/session/cookies";

export const signOut = async () => {
  try {
    const sessionId = await getUserSessionCookie();
    if (!sessionId) throw new NoSessionFoundError();

    await deleteUserSessionFromCache(sessionId);
    await deleteUserSessionCookie();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
