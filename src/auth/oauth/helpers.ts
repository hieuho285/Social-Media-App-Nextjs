import { createDiscordOAuthClient } from "@/auth/oauth/external/discord";
import { createGithubOAuthClient } from "@/auth/oauth/external/github";
import { getOAuthStateCookie, setOAuthStateCookie } from "@/cookies/state";
import { createRandomId } from "@/lib/crypto";
import { InvalidError, UnsupportedProviderError } from "@/lib/errors";
import { discordUserInfoSchema, githubUserInfoSchema } from "@/zod/schemas";
import { OAuthUserInfoSchemaType } from "@/zod/types";
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
  let oauthUserInfoSchema: OAuthUserInfoSchemaType;

  switch (provider) {
    case "discord":
      oauthUserInfoSchema = discordUserInfoSchema;
      break;
    case "github":
      oauthUserInfoSchema = githubUserInfoSchema;
      break;
    default:
      throw new UnsupportedProviderError(provider);
  }

  const { data, success, error } = oauthUserInfoSchema.safeParse(rawData);

  if (!success) {
    throw new InvalidError("OAuth User", error);
  }

  if (provider === "discord") {
    return {
      email: data.email,
      id: data.id,
      username: data.global_name ?? data.username,
    };
  } else {
    // TODO: data for github provider
    return {
      email: data.email,
      id: data.id,
      username: data.global_name ?? data.username,
    };
  }
};
