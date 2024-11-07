"use client";

import { useCallback, useState } from "react";
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

export default function IncomeTable() {
  const [selected, setSelected] = useState({});
  const { data, loading, filter, mutate } = useData();
  const { user } = useUser();
  const { categories } = useCategories();

  const filteredCategories =
    categories?.filter(
      (category) => category.type === "Transfer" || category.type === "Income"
    ) || [];
  const mappedCategories = filteredCategories.map((category) => ({
    categoryId: category.id,
    categoryName: category.name,
  }));

  const onDelete = useCallback(
    async (id: string) => {
      try {
        console.log(id);
        // await deleteIncome(id);
        toast.success(messages.deleted);
        mutate();
      } catch {
        toast.error(messages.error);
      }
    },
    [mutate]
  );

  const onEdit = useCallback((data: Transaction) => {
    setSelected(data);
  }, []);

  const onHide = useCallback(() => {
    setSelected({});
  }, []);

  const onLookup = useCallback(
    (name: string) => lookup({ data, name }),
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
        filename="Income"
        categories={mappedCategories}
      />
      <Add
        onHide={onHide}
        onLookup={onLookup}
        selected={selected}
        mutate={mutate}
        type="income"
      />
    </>
  );
}
