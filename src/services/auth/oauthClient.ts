import { env } from "@/lib/env";
import { InvalidError, UnsupportedProviderError } from "@/lib/error";
import {
  createOAuthState,
  validateOAuthState,
  validateOAuthUserInfo,
} from "@/services/auth/helpers";
import { OAuthProvider } from "@prisma/client";
import "server-only";
import { z } from "zod";

type OAuthConstructorProps = {
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  urls: { authorization: string; token: string; user: string };
};

const tokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export class OAuthClient {
  private readonly provider: OAuthProvider;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: { authorization: string; token: string; user: string };
  private readonly baseRedirectUri = env.OAUTH_REDIRECT_URL_BASE;

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
  }: OAuthConstructorProps) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
  }

  private get redirectUrl() {
    const url = new URL(this.provider, this.baseRedirectUri);
    return url.toString();
  }

  async createAuthorizationUrl(from?: string) {
    const state = await createOAuthState(from);
    const url = new URL(this.urls.authorization);

    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectUrl);

    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", this.scopes.join(" "));
    url.searchParams.set("state", state);

    return url.toString();
  }

  private async fetchToken(code: string) {
    const response = await fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.redirectUrl,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    const rawData = await response.json();
    const { data, success, error } = tokenSchema.safeParse(rawData);

    if (!success) {
      throw new InvalidError("OAuth Token", error);
    }

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    };
  }

  async fetchUser(code: string, state: string) {
    const isValidState = await validateOAuthState(state);

    if (!isValidState) {
      throw new InvalidError("State");
    }

    const { accessToken, tokenType } = await this.fetchToken(code);

    const response = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const rawData = await response.json();
    const user = validateOAuthUserInfo(rawData, this.provider);

    return user;
  }
}

export const getOAuthClient = (provider: OAuthProvider) => {
  switch (provider) {
    case "discord":
      return new OAuthClient({
        provider: "discord",
        clientId: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_CLIENT_SECRET,
        scopes: ["identify", "email"],
        urls: {
          authorization: "https://discord.com/api/oauth2/authorize",
          token: "https://discord.com/api/oauth2/token",
          user: "https://discord.com/api/users/@me",
        },
      });
    case "github":
      return new OAuthClient({
        provider: "discord",
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        scopes: ["user:email", "read:user"],
        urls: {
          authorization: "https://github.com/login/oauth/authorize",
          token: "https://github.com/login/oauth/access_token",
          user: "https://api.github.com/user",
        },
      });
    default:
      throw new UnsupportedProviderError(provider);
  }
};
