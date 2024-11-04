"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import useSWR from "swr";

import { views } from "@/constants/table";
import { getApiUrl } from "@/constants/url";

const DataContext = createContext(null);

type Props = {
  children: React.ReactNode;
  id: string;
  isNotRange?: boolean;
};

export const DataContextProvider = (props: Props) => {
  const { children, id, isNotRange = false } = props;
  const [filter, setFilter] = useState(views.thisMonth.key);
  const [categories, setCategories] = useState<string[]>([]);

  const {
    data = [],
    mutate,
    isLoading,
  } = useSWR(getApiUrl(filter, id, categories, isNotRange));

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

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <DataContext.Provider value={value as any}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = useContext<any>(DataContext);
  if (context === undefined) {
    throw new Error(`useData must be used within a DataContext.`);
  }
  return context;
};
