"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";
import { getApiUrl } from "constants/url";
import { useCategories } from "hooks/use-categories";
import { Wallet } from "interfaces/walletInterface";

interface WalletContextType {
  data: Wallet;
  loading: boolean;
  filter: {
    name: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    onFilter: (categories: string[]) => void;
  };
  mutate: () => void;
}

interface WalletContextProviderProps {
  children: React.ReactNode;
  name: string;
  walletId: string;
  isNotRange?: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

const defaultWallet: Wallet = {
  id: "",
  name: "",
  currency: "",
  totalBalance: 0,
  data: [],
};

export const WalletContextProvider = (props: WalletContextProviderProps) => {
  const { children, walletId, isNotRange = false } = props;
  const [filter, setFilter] = useState("defaultFilterKey");
  const [categories, setCategories] = useState<string[]>([]);
  const { categoriesToFilter } = useCategories();
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

  const walletPlusId = `wallets/${walletId}`;

  const {
    data = defaultWallet,
    mutate,
    isLoading,
  } = useSWR<Wallet>(
    getApiUrl(filter, walletPlusId, selectedCategoryIds, isNotRange)
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

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error("useWallet must be used within a WalletContextProvider.");
  }
  return context;
};
