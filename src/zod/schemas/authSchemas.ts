import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSessionSchema = z.object({
  id: requiredStr,
  role: z.nativeEnum(UserRole),
});

export const unverifiedUserSchema = z.object({
  username: requiredStr,
  email: requiredStr.email(),
  password: requiredStr,
});
