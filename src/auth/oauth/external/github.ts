import { OAuthClient } from "@/auth/oauth";
import { env } from "@/lib/env";

export const createGithubOAuthClient = () => {
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
};
