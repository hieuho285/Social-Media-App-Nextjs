import { env } from "@/lib/env";
import { UnsupportedProviderError } from "@/lib/error";
import {
  discordUserSchema,
  githubUserSchema,
  oauthTokenSchema,
} from "@/lib/validations";
import { jwtOAuthStateSign, jwtOAuthStateVerify } from "@/services/jwt";
import { OAuthProvider } from "@prisma/client";
import "server-only";

type OAuthConstructorProps = {
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  urls: { authorization: string; token: string; user: string };
};

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

  private validateOAuthUser(data: unknown) {
    if (this.provider === "discord") {
      const user = discordUserSchema.parse(data);
      return {
        email: user.email,
        id: user.id,
        name: user.global_name ?? user.name,
      };
    } else if (this.provider === "github") {
      const user = githubUserSchema.parse(data);
      return {
        email: user.email,
        id: user.id,
        name: user.name ?? user.login,
      };
    } else {
      throw new UnsupportedProviderError(this.provider);
    }
  }

  createAuthorizationUrl(from: string | null) {
    const url = new URL(this.urls.authorization);

    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectUrl);

    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", this.scopes.join(" "));
    url.searchParams.set("state", jwtOAuthStateSign({ from }));

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

    const data = await response.json();
    const { access_token, token_type } = oauthTokenSchema.parse(data);

    return {
      accessToken: access_token,
      tokenType: token_type,
    };
  }

  async fetchUser(code: string, state: string) {
    jwtOAuthStateVerify(state);

    const { accessToken, tokenType } = await this.fetchToken(code);

    const response = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();

    const user = this.validateOAuthUser(data);

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
