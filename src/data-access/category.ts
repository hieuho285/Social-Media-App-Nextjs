import { prisma } from "@/lib/db";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};
