import { COOKIE_SESSION_KEY, SESSION_EXPIRE_TIME } from "@/constants";
import { cookies } from "next/headers";

export const getSessionCookie = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_SESSION_KEY);

  return sessionId?.value ?? null;
};

export const setSessionCookie = async (sessionId: string) => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRE_TIME * 1000,
  });
};

export const deleteSessionCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_SESSION_KEY);
};
