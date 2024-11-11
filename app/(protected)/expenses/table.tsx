"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";
import { useUser } from "components/context/auth-provider";
import messages from "constants/messages";
import { Transaction } from "interfaces/transactionInterface";
import { lookup } from "lib/lookup";
import DataTable from "components/table/data-table";
import Add from "components/add-button";
import { useCategories } from "hooks/use-categories";
import { useData } from "components/context/data-provider";
import { useWallets } from "hooks/use-wallets";
import { Category } from "interfaces/categoryInterface";

export default function ExpenseTable() {
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  const { user } = useUser();
  const { categories } = useCategories();
  const { wallets } = useWallets();

  const filteredCategories = useMemo(() => {
    const incomeCategories = categories?.income
      ? Object.values(categories.income).flat()
      : [];
    const transferCategories = categories?.transfer?.Transfer || [];

    return [...incomeCategories, ...transferCategories];
  }, [categories]);

  const onDelete = useCallback(
    async (id: string) => {
      try {
        console.log(id);
        // await deleteExpense(id);
        toast.success(messages.deleted);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  console.log(filteredCategories);
  console.log(wallets);

  const onEdit = useCallback((data: Transaction) => {
    setSelected(data);
  }, []);

  const onHide = useCallback(() => {
    setSelected({});
  }, []);

  const onLookup = useCallback(
    (name: { name: string }) => lookup({ data, name }),
    [data]
  );

  return (
    <>
      <DataTable
        options={{ user, onDelete, onEdit }}
        filter={filter}
        columns={columns}
        data={data}
        loading={loading}
        filename="Expense"
        categories={filteredCategories as unknown as Category[]}
        wallets={wallets}
      />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="expenses"
      />
    </>
  );
}
