import { sessionSchema, signInSchema, signUpSchema } from "@/zod/schemas";
import * as z from "zod";

export type SessionType = z.infer<typeof sessionSchema>;

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;
