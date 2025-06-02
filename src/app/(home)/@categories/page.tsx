import CategoriesSection from "@/app/(home)/@categories/components/categories-section";
import { getCategories } from "@/data-access-layer/category";

type HomePageProps = {
  searchParams: Promise<{
    categoryId?: string;
  }>;
};

export default async function Categories({ searchParams }: HomePageProps) {
  const { categoryId } = await searchParams;
  const categories = await getCategories();

  return <CategoriesSection categoryId={categoryId} categories={categories} />;
}
