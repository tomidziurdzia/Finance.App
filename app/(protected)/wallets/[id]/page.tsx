import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from "lucide-react";
import TransactionTable from "@/components/Transaction/TransactionTable";
import AddTransaction from "@/components/Transaction/AddTransaction";
import { getWalletById } from "@/app/actions/wallets";

export default async function WalletPage({
  params,
}: {
  params: { id: string };
}) {
  const wallet = await getWalletById(params.id);
  const totalIncome = wallet?.income || "0";
  const totalExpense = wallet?.expense || "0";

  return (
    <>
      <div className="p-4">
        <div className="flex justify-center gap-8 h-20 pb-2">
          <Card className="bg-[#363A3F] flex items-center justify-center gap-4 w-60">
            <div className="bg-[#4E5257] border-[#4E5257] flex justify-center items-center rounded-full border-[8px]">
              <WalletIcon className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <div className="p-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                <CardTitle className="text-sm font-medium text-[#929EAE]">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-xl font-bold text-white">
                  {wallet?.total || "0"} {wallet?.currency}
                </div>
              </CardContent>
            </div>
          </Card>
          <Card className="flex items-center justify-center gap-4 w-60">
            <div className="bg-[#4E5257] border-[#4E5257] flex justify-center items-center rounded-full border-[8px]">
              <ArrowUpIcon className="h-4 w-4 text-green-300" strokeWidth={2} />
            </div>
            <div className="p-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                <CardTitle className="text-sm font-medium text-[#929EAE]">
                  Income
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-xl font-bold text-[#363a3f]">
                  {totalIncome} {wallet?.currency}
                </div>
              </CardContent>
            </div>
          </Card>
          <Card className="flex items-center justify-center gap-4 w-60">
            <div className="bg-[#4E5257] border-[#4E5257] flex justify-center items-center rounded-full border-[8px]">
              <ArrowDownIcon className="h-4 w-4 text-red-400" strokeWidth={2} />
            </div>
            <div className="p-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
                <CardTitle className="text-sm font-medium text-[#929EAE]">
                  Expense
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="text-xl font-bold text-[#363a3f]">
                  {totalExpense} {wallet?.currency}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
        {wallet ? (
          <TransactionTable
            transactions={wallet.transactions}
            currency={wallet.currency}
          />
        ) : (
          <p>Loading wallet information...</p>
        )}
      </div>
      <AddTransaction />
    </>
  );
}
