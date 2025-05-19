import { COOKIE_EXPIRATION, STATE_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";

export const setStateCookie = async (state: string) => {
  const cookieStore = await cookies();

  cookieStore.set(STATE_COOKIE_KEY, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: Date.now() + COOKIE_EXPIRATION * 1000,
  });
};

export const getStateCookie = async () => {
  const cookieStore = await cookies();
  const state = cookieStore.get(STATE_COOKIE_KEY);

  return state?.value ?? null;
};
