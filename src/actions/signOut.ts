"use server";

import { deleteUserSessionFromCache } from "@/cache/session";
import {
  deleteUserSessionCookie,
  getUserSessionCookie,
} from "@/cookies/session";
import { NoSessionFoundError } from "@/lib/errors";

export const signOut = async () => {
  const sessionId = await getUserSessionCookie();
  if (!sessionId) throw new NoSessionFoundError();

  await deleteUserSessionFromCache(sessionId);
  await deleteUserSessionCookie();
};
