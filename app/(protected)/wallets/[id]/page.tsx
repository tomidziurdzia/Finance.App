"use client";

import { useEffect, useState } from "react";
import walletService from "@/services/walletService";
import { Wallet as WalletInterface } from "@/interfaces/walletInterface";
import { usePathname } from "next/navigation";
import TransactionTable from "@/components/Transaction/TransactionTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from "lucide-react";
import TransactionForm from "@/components/Transaction/TransactionForm";
import {
  Transaction,
  TransactionType,
} from "@/interfaces/transactionInterface";

const Wallet = () => {
  const id = usePathname().split("/").pop();
  const [wallet, setWallet] = useState<WalletInterface>();

  useEffect(() => {
    if (id) {
      const fetchWallet = async () => {
        try {
          const data = await walletService.getWalletById(id);
          setWallet(data);
        } catch (error) {
          console.error("Error fetching wallet", error);
        }
      };
      fetchWallet();
    }
  }, [id]);

  const mapTransactionType = (type: string | number): number => {
    if (typeof type === "number") return type;
    return TransactionType[type as keyof typeof TransactionType];
  };

  const onTransactionAdded = (newTransaction: Transaction) => {
    setWallet((prevWallet) => {
      if (!prevWallet) return prevWallet;

      const updatedTransactions = [newTransaction, ...prevWallet.transactions];

      const newTotalBalance = updatedTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );

      const newTotalIncome = updatedTransactions
        .filter(
          (transaction) =>
            mapTransactionType(transaction.type) === TransactionType.Income
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      const newTotalExpense = updatedTransactions
        .filter(
          (transaction) =>
            mapTransactionType(transaction.type) === TransactionType.Expense
        )
        .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

      return {
        ...prevWallet,
        transactions: updatedTransactions,
        total: newTotalBalance,
        income: newTotalIncome,
        expense: newTotalExpense,
      };
    });
  };

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
      <TransactionForm onTransactionAdded={onTransactionAdded} />
    </>
  );
};

export default Wallet;
