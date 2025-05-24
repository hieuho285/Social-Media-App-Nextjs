"use server";

import { COOKIE_USER_SESSION_KEY, SESSION_EXPIRE_TIME } from "@/constants";
import { cookies } from "next/headers";

export const getUserSessionCookie = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_USER_SESSION_KEY);

  return sessionId?.value ?? null;
};

export const setUserSessionCookie = async (sessionId: string) => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_USER_SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRE_TIME * 1000,
  });
};

export const deleteUserSessionCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_USER_SESSION_KEY);
};
