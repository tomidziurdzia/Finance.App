import SummaryCard from "@/components/card/summary-card";
import { formatCurrency } from "@/lib/formatter";
import { Banknote, Briefcase, PiggyBank, Wallet2 } from "lucide-react";
import { cookies } from "next/headers";

export default async function Summary() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  return (
    <>
      <h2 className="mb-4 font-semibold dark:text-white">Summary</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SummaryCard
          icon={Wallet2}
          title="available balance"
          data={formatCurrency({
            value: 2,
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
            value: 3,
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
            value: 4,
            currency: user?.currency,
            locale: user?.locale,
          })}
          color="text-red-700"
          backgroundColor="bg-red-100"
        />
        <SummaryCard
          icon={PiggyBank}
          title="total investment"
          data={formatCurrency({
            value: 5,
            currency: user?.currency,
            locale: user?.locale,
          })}
          color="text-purple-700"
          backgroundColor="bg-purple-100"
        />
      </div>
    </>
  );
}
