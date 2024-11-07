"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import useSWR from "swr";

import { views } from "constants/table";
import { getApiUrl } from "constants/url";
import { Transaction } from "interfaces/transactionInterface";
import { useCategories } from "hooks/use-categories";

interface DataContextType {
  data: Transaction[];
  loading: boolean;
  filter: {
    name: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    onFilter: (categories: string[]) => void;
  };
  mutate: () => void;
}

interface DataContextProviderProps {
  children: React.ReactNode;
  name: string;
  isNotRange?: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataContextProvider = (props: DataContextProviderProps) => {
  const { children, name, isNotRange = false } = props;
  const [filter, setFilter] = useState(views.thisMonth.key);
  const [categories, setCategories] = useState<string[]>([]);
  const { categories: categoriesToFilter } = useCategories();
  const uniqueCategoriesMap = new Map();

  categoriesToFilter?.forEach((item) => {
    uniqueCategoriesMap.set(item.name, {
      categoryId: item.id,
      categoryName: item.name,
    });
  });

  const selectedCategoryIds = categories
    .map((name) => uniqueCategoriesMap.get(name)?.categoryId)
    .filter((id): id is string => id !== undefined);

  const {
    data = [],
    mutate,
    isLoading,
  } = useSWR<Transaction[]>(
    getApiUrl(filter, name, selectedCategoryIds, isNotRange)
  );

  const onFilter = useCallback((categories: string[] = []) => {
    setCategories(categories);
  }, []);

  const value = useMemo(
    () => ({
      data,
      loading: isLoading,
      filter: { name: filter, setFilter, onFilter },
      mutate,
    }),
    [data, isLoading, filter, mutate, onFilter]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error(`useData must be used within a DataContext.`);
  }
  return context;
};
