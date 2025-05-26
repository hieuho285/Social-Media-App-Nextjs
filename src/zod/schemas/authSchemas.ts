import { UserRole } from "@prisma/client";
import { z } from "zod";
const requiredStr = z.string().trim().min(1, "Required");

export const userSessionSchema = z.object({
  id: requiredStr,
  role: z.nativeEnum(UserRole),
});
