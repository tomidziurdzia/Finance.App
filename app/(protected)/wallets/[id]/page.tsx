import AddTransaction from "@/components/Transaction/AddTransaction";
import { getWalletById } from "@/app/actions/wallets";
import LayoutHeader from "@/components/Layout/LayoutHeader";
import WalletSummary from "./summary";
import { DataContextProvider } from "@/components/context/data-provider";
import WalletTable from "./table";

export default async function WalletPage({
  params,
}: {
  params: { id: string };
}) {
  const wallet = await getWalletById(params.id);
  const totalIncome = wallet?.income || 0;
  const totalExpense = -wallet?.expense || 0;
  const totalInvestment = wallet?.investment || 0;

  return (
    <>
      <LayoutHeader title={wallet.name} />
      <DataContextProvider name={wallet.name}>
        <div className="p-4 pt-4 w-full">
          <WalletSummary
            walletCurrency={wallet.currency}
            totalBalance={wallet.total}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalInvestment={totalInvestment}
          />
          <WalletTable {...wallet} />
        </div>
      </DataContextProvider>
      <AddTransaction />
    </>
  );
}
