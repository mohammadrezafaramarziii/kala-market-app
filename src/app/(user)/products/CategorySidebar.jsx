import { getCategories } from "@/services/categoryService";
import ProductsFilter from "./ProductsFilter";
import { ProductsSort } from "./ProductsSort";

export const dynamic = "force-dynamic"; // force-dynamic or lazy (lazy is default)

export default async function CategorySidebar() {
  const { categories } = await getCategories();

  return (
    <div className="w-full flex lg:flex-col items-center gap-2 lg:gap-8 col-span-1 lg:overflow-yscroll">
      <ProductsSort />
      <ProductsFilter categories={categories} />
    </div>
  )
}
