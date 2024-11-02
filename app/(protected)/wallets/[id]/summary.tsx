import SummaryCard from "@/components/Card/SummaryCard";
import { formatCurrency } from "@/lib/formatter";
import { Banknote, Briefcase, PiggyBank, Wallet2 } from "lucide-react";

interface Props {
  walletCurrency: string;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalInvestment: number;
}

export default function WalletSummary({
  walletCurrency,
  totalBalance,
  totalIncome,
  totalExpense,
  totalInvestment,
}: Props) {
  return (
    <>
      <h2 className="mb-4 font-semibold dark:text-white">Summary</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SummaryCard
          icon={Wallet2}
          title="available balance"
          data={formatCurrency({
            value: totalBalance,
            currency: walletCurrency,
          })}
          color="text-green-700"
          backgroundColor="bg-green-100"
        />
        <SummaryCard
          icon={Briefcase}
          title="total income"
          data={formatCurrency({
            value: totalIncome,
            currency: walletCurrency,
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
            currency: walletCurrency,
          })}
          color="text-red-700"
          backgroundColor="bg-red-100"
        />
        <SummaryCard
          icon={PiggyBank}
          title="total investment"
          data={formatCurrency({
            value: totalInvestment,
            currency: walletCurrency,
          })}
          color="text-purple-700"
          backgroundColor="bg-purple-100"
        />
      </div>
    </>
  );
}
