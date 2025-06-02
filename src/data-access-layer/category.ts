import { prisma } from "@/lib/db";
import { cache } from "react";
import 'server-only'

export const getCategories = cache(async () => {
  const categories = await prisma.category.findMany();

  return categories;
});
