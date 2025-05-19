import { createState, validateState } from "@/auth/oauth/helpers";
import {
  InvalidError,
  InvalidStateError,
  InvalidUserError,
} from "@/lib/errors/auth";
import { tokenSchema, userSchema } from "@/zod/schemas";

export class OAuthClient<T> {
  private get redirectURI() {
    return new URL("discord", process.env.OAUTH_REDIRECT_URI_BASE as string);
  }

  async createAuthUrl() {
    const state = await createState();

    const url = new URL("https://discord.com/oauth2/authorize");
    url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID as string);
    console.log(this.redirectURI.toString());
    url.searchParams.set("redirect_uri", this.redirectURI.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "identify email");
    url.searchParams.set("state", state);

    return url.toString();
  }

  private async fetchToken(code: string) {
    const response = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: this.redirectURI.toString(),
        client_id: process.env.DISCORD_CLIENT_ID as string,
        client_secret: process.env.DISCORD_CLIENT_SECRET as string,
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

    const url = new URL("https://discord.com/api/users/@me");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const rawData = await response.json();
    const { data, success, error } = userSchema.safeParse(rawData);

    if (!success) {
      throw new InvalidUserError(error);
    }

    return {
      id: data.id,
      email: data.email,
      name: data.global_name ?? data.username,
    };
  }
}
