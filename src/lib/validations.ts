import { z } from "zod";

const requiredStr = z.string().trim().min(1, "Required");

// Sign in schema and type
export const signInSchema = z.object({
  email: requiredStr.email("Invalid Email Address").toLowerCase(),
  password: requiredStr,
});

export type SignInType = z.infer<typeof signInSchema>;

// Sign up schema and type
const signUpBaseSchema = z.object({
  displayName: requiredStr.regex(
    /^[a-zA-Z0-9 ]+$/,
    "Only letters, numbers, and spaces allowed",
  ),
  email: requiredStr.email("Invalid Email Address").toLowerCase(),
  password: requiredStr.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&]{8,20}$/,
    "8–20 characters. Must include uppercase, lowercase, number, and special character @$!%*?&",
  ),
  confirmPassword: requiredStr,
});

export const signUpSchema = signUpBaseSchema.superRefine(
  ({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  },
);

export const signUpSchemaWithoutConfirm = signUpBaseSchema.omit({
  confirmPassword: true,
});

export type signUpWithoutConfirmType = Omit<SignUpType, "confirmPassword">;

export type SignUpType = z.infer<typeof signUpSchema>;

export const userCacheSchema = z.record(z.string(), signUpSchemaWithoutConfirm);
