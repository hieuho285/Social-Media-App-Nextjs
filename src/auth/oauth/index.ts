import { buildAuthUrl, validateState } from "@/auth/oauth/helpers";
import {
  InvalidError,
  InvalidStateError,
  InvalidUserError,
} from "@/lib/errors/auth";
import { tokenSchema } from "@/zod/schemas";
import { userInfoType } from "@/zod/types";
import { OAuthProvider } from "@prisma/client";

export type OAuthConstructorType<T> = {
  provider: OAuthProvider;
  clientId: string;
  clientSecret: string;
  scopes: string[];
  urls: { auth: string; token: string; user: string };
  userInfo: userInfoType<T>;
};

export class OAuthClient<T> {
  private readonly provider: OAuthProvider;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: { auth: string; token: string; user: string };
  private readonly userInfo: userInfoType<T>;
  private readonly baseRedirectUri = process.env
    .OAUTH_REDIRECT_URI_BASE as string;

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: OAuthConstructorType<T>) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectUri() {
    return new URL(this.provider, this.baseRedirectUri);
  }

  async createAuthUrl() {
    const authUrl = buildAuthUrl({
      providerUrl: this.urls.auth,
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      scope: this.scopes.join(" "),
    });

    return authUrl.toString();
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
        redirect_uri: this.redirectUri.toString(),
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
      throw new InvalidError("Token", error);
    }

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    };
  }

  async fetchUser(code: string, state: string) {
    const isValidState = await validateState(state);

    if (!isValidState) throw new InvalidStateError();

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
    const { data, success, error } = this.userInfo.schema.safeParse(rawData);

    if (!success) {
      throw new InvalidUserError(error);
    }

    return this.userInfo.parse(data);
  }
}
