import { InvalidError, UnsupportedProviderError } from "@/lib/error";
import { createRandomId } from "@/lib/utils";
import {
  getOAuthStateCookie,
  setOAuthStateCookie,
} from "@/services/auth/cookies";
import { OAuthProvider } from "@prisma/client";
import { z } from "zod";

export const createOAuthState = async (from?: string) => {
  const id = createRandomId();
  const state = encodeURIComponent(
    JSON.stringify({
      id,
      ...(from ? { from } : {}),
    }),
  );

  await setOAuthStateCookie(state);

  return state;
};

export const validateOAuthState = async (state: string) => {
  const stateCookie = await getOAuthStateCookie();
  return stateCookie === state;
};

export const validateOAuthUserInfo = (
  rawData: unknown,
  provider: OAuthProvider,
) => {
  if (provider === "discord") {
    const { data, success, error } = z
      .object({
        id: z.string(),
        username: z.string(),
        global_name: z.string().nullable(),
        email: z.string().email(),
      })
      .safeParse(rawData);

    if (!success) {
      throw new InvalidError("OAuth User", error);
    }

    return {
      email: data.email,
      id: data.id,
      username: data.global_name ?? data.username,
    };
  } else if (provider === "github") {
    const { data, success, error } = z
      .object({
        id: z.string(),
        login: z.string(),
        name: z.string().nullable(),
        email: z.string().email(),
      })
      .safeParse(rawData);

    if (!success) {
      throw new InvalidError("OAuth User", error);
    }

    return {
      email: data.email,
      id: data.id,
      username: data.name ?? data.login,
    };
  } else {
    throw new UnsupportedProviderError(provider);
  }
};
