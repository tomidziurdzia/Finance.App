"use client";

import SummaryCard from "components/card/summary-card";
import { useUser } from "components/context/auth-provider";
import { useOverview } from "components/context/overview-provider";
import CardLoader from "components/loader/card";
import { useCategories } from "hooks/use-categories";
import { formatCurrency } from "lib/formatter";
import { Wallet2 } from "lucide-react";

export default function InvestmentsSummary() {
  const { user } = useUser();
  const { loading } = useOverview();
  const { categoriesTotal } = useCategories();
  const topInvestments = categoriesTotal?.investment?.slice(0, 5) || [];

  return (
    <div>
      <h2 className="mb-2 font-semibold dark:text-white">
        Investments Summary
      </h2>
      {loading ? (
        <CardLoader
          cards={Math.min(categoriesTotal?.investment.length || 0, 5)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {topInvestments.map((investment) => (
            <SummaryCard
              key={investment.id}
              icon={Wallet2}
              title={investment.name}
              data={formatCurrency({
                value: investment.total,
                locale: user?.locale,
              })}
              color="text-green-700"
              backgroundColor="bg-green-100"
            />
          ))}
        </div>
      )}
    </div>
  );
}
