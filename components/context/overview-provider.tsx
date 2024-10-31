"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { format } from "date-fns";
import useSWR from "swr";
import { useDate } from "./datepicker-provider";
import { apiUrls } from "@/lib/apiUrls";
import { dateFormat } from "@/constants/date";

interface Transaction {
  id: string;
  amount: number;
  type: number;
  description: string;
  createdAt: string;
  // Add other fields as necessary
}

interface OverviewContextType {
  loading: boolean;
  data: {
    transactions: Transaction[];
    mutate: {
      mutateTransactions: () => Promise<Transaction[] | undefined>;
    };
  };
}

const OverviewContext = createContext<OverviewContextType | null>(null);

interface OverviewContextProviderProps {
  children: ReactNode;
}

export const OverviewContextProvider: React.FC<
  OverviewContextProviderProps
> = ({ children }) => {
  const { date } = useDate();
  const from = format(date.from || date.to, dateFormat);
  const to = format(date.to || date.from, dateFormat);

  const {
    data: transactionsData = [],
    isLoading: isTransactionsLoading,
    mutate: mutateTransactions,
  } = useSWR<Transaction[]>(apiUrls.transactions.getTransactions({ from, to }));

  const data = {
    transactions: transactionsData,
    mutate: {
      mutateTransactions,
    },
  };

  const loading = isTransactionsLoading;

  return (
    <OverviewContext.Provider value={{ loading, data }}>
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverview = (): OverviewContextType => {
  const context = useContext(OverviewContext);
  if (context === null) {
    throw new Error(
      `useOverview must be used within an OverviewContextProvider`
    );
  }
  return context;
};
