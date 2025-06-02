import "server-only";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),

  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string(),

  OAUTH_REDIRECT_URL_BASE: z.string().url(),

  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  NEXT_PUBLIC_APP_URL: z.string(),

  SMTP_SERVER_USERNAME: z.string(),
  SMTP_SERVER_PASSWORD: z.string(),

  JWT_SECRET: z.string(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.log(error);
  throw new Error("Invalid environment variables");
}

export const env = data;
