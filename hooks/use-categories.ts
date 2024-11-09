import useSWR from "swr";
import { Category } from "interfaces/categoryInterface";
import { getAllCategories } from "app/actions/category";

interface CategoryItem {
  id: string;
  name: string;
}

interface Categories {
  income: { [parentType: string]: CategoryItem[] };
  expense: { [parentType: string]: CategoryItem[] };
  investment: { [parentType: string]: CategoryItem[] };
  transfer: { [parentType: string]: CategoryItem[] };
}

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    "categories",
    getAllCategories
  );

  const categories = data?.reduce(
    (acc: Categories, item) => {
      const typeKey = item.type.toLowerCase() as keyof Categories;

      if (!acc[typeKey]) acc[typeKey] = {};

      if (!acc[typeKey][item.parentType]) {
        acc[typeKey][item.parentType] = [];
      }

      acc[typeKey][item.parentType].push({
        id: item.id,
        name: item.name,
      });

      return acc;
    },
    { income: {}, expense: {}, investment: {}, transfer: {} } as Categories
  );

  return {
    categoriesToFilter: data,
    categories,
    isLoading,
    isError: error,
  };
}
