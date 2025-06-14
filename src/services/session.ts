import {
  deleteUserSessionFromCache,
  getUserSessionFromCache,
  setUserSessionInCache,
} from "@/data-access-layer/session";
import { findUserWithoutPasswordById } from "@/data-access-layer/user";
import { NoFoundError } from "@/lib/error";
import { createRandomId } from "@/lib/utils";
import { userSessionSchema } from "@/lib/validations";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";

const SESSION_EXPIRE_TIME = 60 * 60 * 24 * 7; // 7 days

export const COOKIE_USER_SESSION_KEY = "user-session";

export const createUserSession = async (user: User) => {
  const sessionId = createRandomId();
  const userSession = userSessionSchema.parse(user);
  const cookieStore = await cookies();

  await setUserSessionInCache(sessionId, userSession);
  cookieStore.set(COOKIE_USER_SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRE_TIME * 1000,
  });
};

export const getCurrentSession = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_USER_SESSION_KEY);
  if (!session) return null;

  console.log(session.value);

  const cachedUser = await getUserSessionFromCache(session.value);
  if (!cachedUser) return null;

  return { user: cachedUser, id: session.value };
});

export const destroyCurrentSession = async () => {
  const session = await getCurrentSession();
  const cookieStore = await cookies();
  if (!session) throw new NoFoundError("Session");

  await deleteUserSessionFromCache(session.user.id);

  cookieStore.delete(COOKIE_USER_SESSION_KEY);
};

export const getCurrentUser = cache(async () => {
  const session = await getCurrentSession();
  if (!session) return null;

  const user = await findUserWithoutPasswordById(session.user.id);

  if (!user) return null;

  return user;
});
