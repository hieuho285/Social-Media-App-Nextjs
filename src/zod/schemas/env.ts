import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),

  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string(),

  OAUTH_REDIRECT_URL_BASE: z.string().url(),

  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  BASE_URL: z.string(),

  SMTP_SERVER_USERNAME: z.string(),
  SMTP_SERVER_PASSWORD: z.string(),
});
