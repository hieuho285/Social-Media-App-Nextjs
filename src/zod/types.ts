import {
  sessionSchema,
  signInSchema,
  signUpSchema,
  userSchema,
} from "@/zod/schemas";
import * as z from "zod";

export type SessionType = z.infer<typeof sessionSchema>;

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;

export type userInfoType<T> = {
  schema: z.ZodSchema<T>;
  parse: (data: T) => { id: string; email: string; name: string };
};

export type userType = z.infer<typeof userSchema>;
