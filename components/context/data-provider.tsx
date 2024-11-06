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

interface DataContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
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

  const {
    data = [],
    mutate,
    isLoading,
  } = useSWR(getApiUrl(filter, name, categories, isNotRange));

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

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error(`useData must be used within a DataContext.`);
  }
  return context;
};
