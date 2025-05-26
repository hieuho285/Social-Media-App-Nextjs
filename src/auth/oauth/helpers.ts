import { createDiscordOAuthClient } from "@/auth/oauth/external/discord";
import { createGithubOAuthClient } from "@/auth/oauth/external/github";
import { getOAuthStateCookie, setOAuthStateCookie } from "@/cookies/state";
import { InvalidError, UnsupportedProviderError } from "@/lib/errors";
import { createRandomId } from "@/lib/utils";
import { discordUserInfoSchema, githubUserInfoSchema } from "@/zod/schemas";
import { OAuthProvider } from "@prisma/client";

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

export const getOAuthClient = (provider: OAuthProvider) => {
  switch (provider) {
    case "discord":
      return createDiscordOAuthClient();
    case "github":
      return createGithubOAuthClient();
    default:
      throw new UnsupportedProviderError(provider);
  }
};

export const validateOAuthUserInfo = (
  rawData: unknown,
  provider: OAuthProvider,
) => {
  if (provider === "discord") {
    const { data, success, error } = discordUserInfoSchema.safeParse(rawData);

    if (!success) {
      throw new InvalidError("OAuth User", error);
    }

    return {
      email: data.email,
      id: data.id,
      username: data.global_name ?? data.username,
    };
  } else if (provider === "github") {
    const { data, success, error } = githubUserInfoSchema.safeParse(rawData);

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
