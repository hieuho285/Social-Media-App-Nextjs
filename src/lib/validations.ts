import { UserRole } from "@prisma/client";
import { z } from "zod";

const requiredStr = z.string().trim().min(1, "Required");

// Sign in schema and type
export const signInSchema = z.object({
  email: requiredStr.email("Invalid Email Address").toLowerCase(),
  password: requiredStr,
});
export type SignInType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: requiredStr.regex(
      /^[a-zA-Z0-9 ]+$/,
      "Only letters, numbers, and spaces allowed",
    ),
    email: requiredStr.email("Invalid Email Address").toLowerCase(),
    password: requiredStr.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,20}$/,
      "8–20 characters. Must include uppercase, lowercase, number, and special character @$!%*?&",
    ),
    confirmPassword: requiredStr,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
export type SignUpType = z.infer<typeof signUpSchema>;

export const oauthStateSchema = z.object({
  from: z.string().nullable(),
});
export type OAuthStateType = z.infer<typeof oauthStateSchema>;

export const userSessionSchema = z.object({
  id: requiredStr,
  role: z.nativeEnum(UserRole),
});
export type UserSessionType = z.infer<typeof userSessionSchema>;

export const unverifiedUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});
export type UnverifiedUserType = z.infer<typeof unverifiedUserSchema>;

export const resetPasswordSchema = z
  .object({
    password: requiredStr,
    confirmPassword: requiredStr,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: requiredStr.email("Invalid Email Address"),
});
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const discordUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  global_name: z.string().nullable(),
  email: z.string().email(),
});

export const githubUserSchema = z.object({
  id: z.string(),
  login: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
});

export const oauthTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});
