import { sessionSchema } from "@/lib/zod/schemas";
import * as z from "zod";

export type SessionType = z.infer<typeof sessionSchema>;
