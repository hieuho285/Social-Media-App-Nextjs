import { OAuthClient } from "@/auth/oauth";

export const createDiscordOAuthClient = () => {
  return new OAuthClient({
    provider: "discord",
    clientId: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    scopes: ["identify", "email"],
    urls: {
      auth: "https://discord.com/api/oauth2/authorize",
      token: "https://discord.com/api/oauth2/token",
      user: "https://discord.com/api/users/@me",
    },
  });
};
