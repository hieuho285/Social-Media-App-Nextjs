import { envSchema } from "@/zod/schemas/env";

const { success, data } = envSchema.safeParse(process.env);

if (!success) throw new Error("Invalid environment variables");

export const env = data;
