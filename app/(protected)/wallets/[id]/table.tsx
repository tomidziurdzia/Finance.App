"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useData } from "@/components/context/data-provider";
import messages from "@/constants/messages";
import { columns } from "./columns";
import { Wallet } from "@/interfaces/walletInterface";
import { Transaction } from "@/interfaces/transactionInterface";
// import { lookup } from "@/lib/lookup";
import DataTable from "@/components/table/data-table";

export default function WalletTable(wallet: Wallet) {
  const categories = wallet.transactions.reduce(
    (acc, { categoryId, categoryName }) => {
      if (!acc.some((category) => category.categoryId === categoryId)) {
        acc.push({ categoryId, categoryName });
      }
      return acc;
    },
    [] as Array<{ categoryId: string; categoryName: string }>
  );
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  console.log(selected);

  //! Change url
  const onDelete = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/transactions/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete transaction");
        }

        toast.success(messages.deleted);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  const onEdit = useCallback(async (data: Transaction) => {
    setSelected(data);
  }, []);

  // const onHide = useCallback(() => {
  //   setSelected({});
  // }, []);

  // const onLookup = useCallback(
  //   (name: string) => lookup({ data, name }),
  //   [data]
  // );

  return (
    <>
      <DataTable
        options={{ onDelete, onEdit }}
        filter={filter}
        columns={columns}
        data={data}
        loading={loading}
        categories={categories}
      />
    </>
  );
}
