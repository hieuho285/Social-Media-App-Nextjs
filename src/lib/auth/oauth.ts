import { InvalidTokenError, InvalidUserError } from "@/lib/errors/authErrors";
import { tokenSchema, userSchema } from "@/lib/zod/schemas";

export class OAuthClient<T> {
  private get redirectURI() {
    return new URL("discord", process.env.OAUTH_REDIRECT_URI_BASE as string);
  }

  private fetchTokenURL(code: string) {
    const url = new URL("https://discord.com/api/oauth2/token");
    url.searchParams.set("grant_type", "authorization_code");
    url.searchParams.set("code", code);
    url.searchParams.set("redirect_uri", this.redirectURI.toString());
    url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID as string);
    url.searchParams.set(
      "client_secret",
      process.env.DISCORD_CLIENT_SECRET as string,
    );
    return url;
  }

  createAuthUrl() {
    const url = new URL("https://discord.com/oauth2/authorize");
    url.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID as string);
    console.log(this.redirectURI.toString());
    url.searchParams.set("redirect_uri", this.redirectURI.toString());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "identify email");
    console.log(url.toString());
    return url.toString();
  }

  private async fetchToken(code: string) {
    const url = this.fetchTokenURL(code);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: url.searchParams,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const rawData = await response.json();
    const { data, success, error } = tokenSchema.safeParse(rawData);

    if (!success) {
      throw new InvalidTokenError(error);
    }

    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    };
  }

  async fetchUser(code: string) {
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
