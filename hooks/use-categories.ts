import useSWR from "swr";
import { Category } from "interfaces/categoryInterface";
import { getAllCategories } from "app/actions/category";

interface Categories {
  income: { [parentType: string]: Category[] };
  expense: { [parentType: string]: Category[] };
  investment: { [parentType: string]: Category[] };
  transfer: { [parentType: string]: Category[] };
}

interface CategoriesTotal {
  income: Category[];
  expense: Category[];
  investment: Category[];
  transfer: Category[];
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
        type: item.type,
        parentType: item.parentType,
        total: item.total,
      });

      return acc;
    },
    { income: {}, expense: {}, investment: {}, transfer: {} } as Categories
  );

  const categoriesTotal = data?.reduce(
    (acc: CategoriesTotal, item) => {
      if (item.total > 0) {
        const typeKey = item.type.toLowerCase() as keyof CategoriesTotal;

        if (!acc[typeKey]) {
          acc[typeKey] = [];
        }

        acc[typeKey].push({
          id: item.id,
          name: item.name,
          type: item.type,
          parentType: item.parentType,
          total: item.total,
        });
      }

      return acc;
    },
    { income: [], expense: [], investment: [], transfer: [] } as CategoriesTotal
  );

  return {
    categoriesToFilter: data,
    categories,
    categoriesTotal,
    isLoading,
    isError: error,
  };
}
