"use client";

import SummaryCard from "components/card/summary-card";
import { useUser } from "components/context/auth-provider";
import { useOverview } from "components/context/overview-provider";
import CardLoader from "components/loader/card";
import { useWallets } from "hooks/use-wallets";
import { formatCurrency } from "lib/formatter";
import { Wallet2 } from "lucide-react";

export default function WalletsSummary() {
  const { user } = useUser();
  const { loading } = useOverview();
  const { wallets } = useWallets();

  console.log(wallets);

  return (
    <div>
      <h2 className="mb-2 font-semibold dark:text-white">Wallets Summary</h2>
      {loading ? (
        <CardLoader cards={wallets?.length} />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {wallets?.map((wallet) => (
            <SummaryCard
              key={wallet.id}
              icon={Wallet2}
              title={wallet.name}
              data={formatCurrency({
                value: wallet.total,
                currency: wallet?.currency,
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
