export class OAuthClient<T> {
  private get redirectURI() {
    return new URL("discord", process.env.OAUTH_REDIRECT_URI_BASE as string);
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
}
