"use client";

import { createContext, useContext, ReactNode } from "react";
import { format } from "date-fns";
import useSWR, { KeyedMutator } from "swr";
import { dateFormat } from "constants/date";
import { useDate } from "./datepicker-provider";

import { getIncomes } from "app/actions/income";
import { getExpenses } from "app/actions/expense";
import { getInvestments } from "app/actions/investment";
import { ExpensesDto, IncomesDto, InvestmentsDto } from "interfaces/interfaces";

interface OverviewData {
  expenses: ExpensesDto | null;
  incomes: IncomesDto | null;
  investments: InvestmentsDto | null;
}

interface OverviewContextType {
  loading: boolean;
  data: OverviewData;
  mutate: {
    mutateExpenses: KeyedMutator<ExpensesDto>;
    mutateIncome: KeyedMutator<IncomesDto>;
    mutateInvestments: KeyedMutator<InvestmentsDto>;
  };
}

const OverviewContext = createContext<OverviewContextType | null>(null);

const useOverviewData = (
  startDate: string,
  endDate: string
): OverviewContextType => {
  const {
    data: incomeData,
    isLoading: isIncomeLoading,
    mutate: mutateIncome,
  } = useSWR<IncomesDto>(["incomes", startDate, endDate], () =>
    getIncomes({ startDate, endDate })
  );

  const {
    data: expensesData,
    isLoading: isExpenseLoading,
    mutate: mutateExpenses,
  } = useSWR<ExpensesDto>(["expenses", startDate, endDate], () =>
    getExpenses({ startDate, endDate })
  );

  const {
    data: investmentsData,
    isLoading: isInvestmentsLoading,
    mutate: mutateInvestments,
  } = useSWR<InvestmentsDto>(["investments", startDate, endDate], () =>
    getInvestments({ startDate, endDate })
  );

  const loading = isExpenseLoading || isInvestmentsLoading || isIncomeLoading;

  return {
    loading,
    data: {
      expenses: expensesData || null,
      incomes: incomeData || null,
      investments: investmentsData || null,
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
