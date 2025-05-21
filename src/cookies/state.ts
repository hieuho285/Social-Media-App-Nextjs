import { COOKIE_EXPIRE_TIME, COOKIE_OAUTH_STATE_KEY } from "@/constants";
import { cookies } from "next/headers";

export const setOAuthStateCookie = async (state: string) => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_OAUTH_STATE_KEY, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRE_TIME * 1000,
  });
};

export const getOAuthStateCookie = async () => {
  const cookieStore = await cookies();
  const oauthState = cookieStore.get(COOKIE_OAUTH_STATE_KEY);

  return oauthState?.value ?? null;
};
