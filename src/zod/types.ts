import {
  discordUserInfoSchema,
  sessionSchema,
  signInSchema,
  signUpSchema,
  userSchema,
} from "@/zod/schemas/";
import * as z from "zod";

export type SessionType = z.infer<typeof sessionSchema>;
export type UserType = z.infer<typeof userSchema>;

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;

export type UserInfoSchemaType = typeof discordUserInfoSchema;

export type UserInfoType = z.infer<typeof discordUserInfoSchema>;
