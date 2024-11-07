"use client";

import { createContext, useContext, ReactNode } from "react";
import { format } from "date-fns";
import useSWR, { KeyedMutator } from "swr";
import { dateFormat } from "@/constants/date";
import { useDate } from "./datepicker-provider";
import { Expense, Income, Investment } from "@/interfaces/transactionInterface";
import { getIncomes } from "@/app/actions/income";
import { getExpenses } from "@/app/actions/expense";
import { getInvestments } from "@/app/actions/investment";

interface OverviewData {
  expenses: Expense[];
  incomes: Income[];
  investments: Investment[];
}

interface OverviewContextType {
  loading: boolean;
  data: OverviewData;
  mutate: {
    mutateExpenses: KeyedMutator<Expense[]>;
    mutateIncome: KeyedMutator<Income[]>;
    mutateInvestments: KeyedMutator<Investment[]>;
  };
}

const OverviewContext = createContext<OverviewContextType | null>(null);

const useOverviewData = (
  startDate: string,
  endDate: string
): OverviewContextType => {
  const {
    data: incomeData = [],
    isLoading: isIncomeLoading,
    mutate: mutateIncome,
  } = useSWR<Income[]>(["incomes", startDate, endDate], () =>
    getIncomes({ startDate, endDate })
  );

  const {
    data: expensesData = [],
    isLoading: isExpenseLoading,
    mutate: mutateExpenses,
  } = useSWR<Expense[]>(["expenses", startDate, endDate], () =>
    getExpenses({ startDate, endDate })
  );

  const {
    data: investmentsData = [],
    isLoading: isInvestmentsLoading,
    mutate: mutateInvestments,
  } = useSWR<Investment[]>(["investments", startDate, endDate], () =>
    getInvestments({ startDate, endDate })
  );

  const loading = isExpenseLoading || isInvestmentsLoading || isIncomeLoading;

  return {
    loading,
    data: {
      expenses: expensesData,
      investments: investmentsData,
      incomes: incomeData,
    },
    mutate: {
      mutateExpenses,
      mutateIncome,
      mutateInvestments,
    },
  };
};

interface OverviewContextProviderProps {
  children: ReactNode;
}

export const OverviewContextProvider = ({
  children,
}: OverviewContextProviderProps) => {
  const { date } = useDate();
  const from = format(date.from || date.to, dateFormat);
  const to = format(date.to || date.from, dateFormat);

  const overviewData = useOverviewData(from, to);

  return (
    <OverviewContext.Provider value={overviewData}>
      {children}
    </OverviewContext.Provider>
  );
};

export const useOverview = (): OverviewContextType => {
  const context = useContext(OverviewContext);
  if (context === null) {
    throw new Error(
      "useOverview must be used within an OverviewContextProvider"
    );
  }
  return context;
};
