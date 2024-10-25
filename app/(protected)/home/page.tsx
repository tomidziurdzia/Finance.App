"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from "lucide-react";
import walletService from "@/services/walletService";
import { TotalWallets } from "@/interfaces/walletInterface";

export default function Home() {
  const [wallets, setWallets] = useState<TotalWallets>();

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await walletService.getTotals();
        setWallets(data);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchWallets();
  }, []);
  const totalBalance = wallets?.total;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#1B212D]">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#363A3F] flex p-4 items-center justify-center">
            <div className="bg-[#4E5257] border-[#4E5257] w-14 h-14 flex justify-center items-center rounded-full border-[14px]">
              <WalletIcon className="h-5 w-5 text-primary" strokeWidth={2} />
            </div>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#929EAE]">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ${totalBalance}
                </div>
              </CardContent>
            </div>
          </Card>
          <Card className="flex p-4 items-center justify-center">
            <div className="bg-[#4E5257] border-[#4E5257] w-14 h-14 flex justify-center items-center rounded-full border-[14px]">
              <ArrowUpIcon className="h-5 w-5 text-primary" strokeWidth={4} />
            </div>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#929EAE]">
                  Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalBalance}</div>
              </CardContent>
            </div>
          </Card>
          <Card className="flex p-4 items-center justify-center">
            <div className="bg-[#4E5257] border-[#4E5257] w-14 h-14 flex justify-center items-center rounded-full border-[14px]">
              <ArrowDownIcon className="h-5 w-5 text-red-400" strokeWidth={4} />
            </div>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#929EAE]">
                  Expense
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalBalance}</div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
