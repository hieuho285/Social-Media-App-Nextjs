import {
  discordUserInfoSchema,
  githubUserInfoSchema,
  oauthUserSchema,
  unverifiedUserSchema,
  userSessionSchema,
} from "@/zod/schemas/";
import * as z from "zod";

export type OAuthUserType = z.infer<typeof oauthUserSchema>;
export type UserSessionType = z.infer<typeof userSessionSchema>;

export type OAuthUserInfoSchemaType =
  | typeof discordUserInfoSchema
  | typeof githubUserInfoSchema;

export type OAuthUserInfoType = z.infer<typeof discordUserInfoSchema>;

export type UnverifiedUserType = z.infer<typeof unverifiedUserSchema>;
