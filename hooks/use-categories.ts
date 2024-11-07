import useSWR from "swr";
import { Category } from "@/interfaces/categoryInterface";
import { getAllCategories } from "@/app/actions/category";

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>(
    "categories",
    getAllCategories
  );

  return {
    categories: data,
    isLoading,
    isError: error,
  };
}
