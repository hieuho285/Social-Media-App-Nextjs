import { z } from "zod";

const requiredStr = z.string().trim().min(1, "Required");

export const signInSchema = z.object({
  email: requiredStr.email("Invalid Email Address"),
  password: requiredStr,
});

export type SignInTypes = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    displayName: requiredStr.regex(
      /^[a-zA-Z0-9 ]+$/,
      "Only letters, numbers, and spaces allowed",
    ),
    email: requiredStr.email("Invalid Email Address"),
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

export type SignUpTypes = z.infer<typeof signUpSchema>;
