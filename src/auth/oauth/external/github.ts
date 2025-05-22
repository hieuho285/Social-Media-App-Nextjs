import { OAuthClient } from "@/auth/oauth";
import { env } from "@/lib/env";

export const createGithubOAuthClient = () => {
  return new OAuthClient({
    provider: "discord",
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    scopes: ["identify", "email"],
    urls: {
      authorization: "https://discord.com/api/oauth2/authorize",
      token: "https://discord.com/api/oauth2/token",
      user: "https://discord.com/api/users/@me",
    },
  });
};
