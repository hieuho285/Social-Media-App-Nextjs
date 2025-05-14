import { REGEX } from "@/constants/regex";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const signUpSchema = z
  .object({
    username: z.string().min(8),
    email: z.string().email(),
    password: z
      .string()
      .regex(REGEX.password.regex, REGEX.password.description),
    confirmPassword: z.string().min(1),
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

export const sessionSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(UserRole),
});
