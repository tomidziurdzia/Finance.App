import LayoutHeader from "components/layout/header";
import WalletSummary from "./summary";
import { WalletContextProvider } from "components/context/wallet-provider";
import { getWalletById } from "app/actions/wallet";
import WalletTable from "./table";

export default async function Page({ params }: { params: { id: string } }) {
  const wallet = await getWalletById(params.id);
  const walletName = wallet.name + " " + wallet.currency;
  return (
    <>
      <LayoutHeader title={walletName} />
      <WalletContextProvider walletId={params.id}>
        <div className="w-full overflow-x-auto p-4">
          <WalletSummary />
          <WalletTable />
        </div>
      </WalletContextProvider>
    </>
  );
}
