"use client";

import SummaryCard from "components/card/summary-card";
import { useUser } from "components/context/auth-provider";
import { useData } from "components/context/data-provider";
import CardLoader from "components/loader/card";
import { formatCurrency } from "lib/formatter";
import { Briefcase } from "lucide-react";

export default function IncomeSummary() {
  const { user } = useUser();
  const { data, loading } = useData();

  const totalAmount = data?.total || 0;

  return (
    <>
      <h2 className="mb-4 font-semibold dark:text-white">Summary</h2>
      {loading ? (
        <CardLoader cards={1} className="mb-6" />
      ) : (
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
          <SummaryCard
            icon={Briefcase}
            title="total amount"
            data={formatCurrency({
              value: totalAmount,
              currency: user?.currency,
              locale: user?.locale,
            })}
            color="text-blue-700"
            backgroundColor="bg-blue-100"
          />
        </div>
      )}
    </>
  );
}
