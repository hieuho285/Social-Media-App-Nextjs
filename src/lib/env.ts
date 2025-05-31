import "server-only";

import { envSchema } from "@/zod/schemas/";

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.log(error);
  throw new Error("Invalid environment variables");
}

export const env = data;
