import { createDiscordOAuthClient } from "@/auth/oauth/external/discord";
import { getStateCookie, setStateCookie } from "@/cookies/state";
import { createRandomId } from "@/lib/crypto";
import { InvalidError, UnsupportedProviderError } from "@/lib/errors";
import { discordUserInfoSchema, githubUserInfoSchema } from "@/zod/schemas";
import { UserInfoSchemaType } from "@/zod/types";
import { OAuthProvider } from "@prisma/client";

type buildAuthUrlType = {
  authUrl: string;
  clientId: string;
  redirectUri: string | URL;
  scope: string;
};

export const createState = async () => {
  const state = createRandomId();
  await setStateCookie(state);
  return state;
};

export const validateState = async (state: string) => {
  const stateCookie = await getStateCookie();
  return stateCookie === state;
};

export const buildAuthUrl = async ({
  authUrl,
  clientId,
  redirectUri,
  scope,
}: buildAuthUrlType) => {
  const state = await createState();
  const url = new URL(authUrl);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri.toString());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);

  return url.toString();
};

export const getOAuthClient = (provider: OAuthProvider) => {
  switch (provider) {
    case "discord":
      return createDiscordOAuthClient();
    case "github":
      // TODO: Implement GitHub OAuth client
      return createDiscordOAuthClient();
    default:
      throw new UnsupportedProviderError(provider);
  }
};

export const validateUserInfo = (rawData: unknown, provider: OAuthProvider) => {
  let userInfoSchema: UserInfoSchemaType;

  switch (provider) {
    case "discord":
      userInfoSchema = discordUserInfoSchema;
      break;
    case "github":
      userInfoSchema = githubUserInfoSchema;
      break;
    default:
      throw new UnsupportedProviderError(provider);
  }

  const { data, success, error } = userInfoSchema.safeParse(rawData);

  if (!success) {
    throw new InvalidError("User", error);
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
