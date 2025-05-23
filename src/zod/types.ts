import {
  discordUserInfoSchema,
  githubUserInfoSchema,
  oauthUserSchema,
  signInSchema,
  signUpSchema,
  unverifiedUserSchema,
  userSessionSchema,
} from "@/zod/schemas/";
import * as z from "zod";

export type OAuthUserType = z.infer<typeof oauthUserSchema>;
export type UserSessionType = z.infer<typeof userSessionSchema>;

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;

export type OAuthUserInfoSchemaType =
  | typeof discordUserInfoSchema
  | typeof githubUserInfoSchema;

export type OAuthUserInfoType = z.infer<typeof discordUserInfoSchema>;

export type UnverifiedUserType = z.infer<typeof unverifiedUserSchema>;
