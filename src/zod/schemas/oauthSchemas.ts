import { OAuthProvider } from "@prisma/client";
import { z } from "zod";

export const oauthProviderSchema = z.nativeEnum(OAuthProvider);

export const oauthTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const discordUserInfoSchema = z.object({
  id: z.string(),
  username: z.string(),
  global_name: z.string().nullable(),
  email: z.string().email(),
});

export const githubUserInfoSchema = z.object({
  id: z.string(),
  username: z.string(),
  global_name: z.string().nullable(),
  email: z.string().email(),
});

export const oauthUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});
