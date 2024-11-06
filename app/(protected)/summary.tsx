"use client";

import SummaryCard from "@/components/card/summary-card";
import { useUser } from "@/components/context/auth-provider";
import { useOverview } from "@/components/context/overview-provider";
import CardLoader from "@/components/loader/card";
import { formatCurrency } from "@/lib/formatter";
import {
  Banknote,
  Briefcase,
  CandlestickChart,
  PiggyBank,
  Wallet2,
} from "lucide-react";

export default function Summary() {
  const { user } = useUser();
  const { data, loading } = useOverview();

  console.log(data);

  const totalIncome = data.incomes.reduce(
    (acc: number, { amount }) => Number(amount) + acc,
    0
  );

  const totalExpense = data.expenses.reduce(
    (acc: number, { amount }) => Number(amount) + acc,
    0
  );

  const totalInvestment = data.investments.reduce(
    (acc: number, { amount }) => Number(amount) + acc,
    0
  );

  const totalAvailable = totalIncome - totalExpense - totalInvestment;

  const totalBalance = totalAvailable + totalInvestment;

  return (
    <>
      <h2 className="mb-4 font-semibold dark:text-white">Summary</h2>
      {loading ? (
        <CardLoader cards={5} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <SummaryCard
            icon={Wallet2}
            title="available balance"
            data={formatCurrency({
              value: totalAvailable,
              currency: user?.currency,
              locale: user?.locale,
            })}
            color="text-green-700"
            backgroundColor="bg-green-100"
          />
          <SummaryCard
            icon={Briefcase}
            title="total income"
            data={formatCurrency({
              value: totalIncome,
              currency: user?.currency,
              locale: user?.locale,
            })}
            color="text-blue-700"
            backgroundColor="bg-blue-100"
          />
          <SummaryCard
            icon={Banknote}
            title="total spent"
            tooltip="Total of expenses + investments + subscriptions"
            data={formatCurrency({
              value: totalExpense,
              currency: user?.currency,
              locale: user?.locale,
            })}
            color="text-red-700"
            backgroundColor="bg-red-100"
          />
          <SummaryCard
            icon={CandlestickChart}
            title="total investment"
            data={formatCurrency({
              value: totalInvestment,
              currency: user?.currency,
              locale: user?.locale,
            })}
            color="text-purple-700"
            backgroundColor="bg-purple-100"
          />
          <SummaryCard
            icon={Banknote}
            title="total balance"
            tooltip="Total of expenses + investments + subscriptions"
            data={formatCurrency({
              value: totalBalance,
              currency: user?.currency,
              locale: user?.locale,
            })}
            color="text-red-700"
            backgroundColor="bg-red-100"
          />
        </div>
      )}
    </>
  );
}
