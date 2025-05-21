import {
  createOAuthState,
  validateOAuthState,
  validateOAuthUserInfo,
} from "@/auth/oauth/helpers";
import { InvalidError } from "@/lib/errors";
import { oauthTokenSchema } from "@/zod/schemas";
import { OAuthProvider } from "@prisma/client";

type OAuthConstructorType = {
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
  private readonly baseRedirectUri = process.env
    .OAUTH_REDIRECT_URI_BASE as string;

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
  }: OAuthConstructorType) {
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

  async createAuthorizationUrl() {
    const state = await createOAuthState();
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
    const { data, success, error } = oauthTokenSchema.safeParse(rawData);

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
