import { createDiscordOAuthClient } from "@/auth/oauth/external/discord";
import { getStateCookie, setStateCookie } from "@/cookies/state";
import { createRandomId } from "@/lib/crypto";
import { OAuthProvider } from "@prisma/client";

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
}: {
  authUrl: string;
  clientId: string;
  redirectUri: string | URL;
  scope: string;
}) => {
  const state = await createState();
  const url = new URL(authUrl);

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri.toString());
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);

  return url;
};

export const getOAuthClient = (provider: OAuthProvider) => {
  switch (provider) {
    case "discord":
      return createDiscordOAuthClient();
    default:
      throw new Error(`Unsupported provider: ${provider satisfies never}`);
  }
};
