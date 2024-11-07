"use client";

import { useCallback, useState, useMemo } from "react";
import { toast } from "sonner";

import { columns } from "./columns";
import { useData } from "@/components/context/data-provider";
import { useUser } from "@/components/context/auth-provider";
import messages from "@/constants/messages";
import { Transaction } from "@/interfaces/transactionInterface";
import { lookup } from "@/lib/lookup";
import DataTable from "@/components/table/data-table";
import Add from "@/components/add-button";
import { useCategories } from "@/hooks/use-categories";

interface Category {
  id: string;
  name: string;
  type: string;
}

interface DataTableCategory {
  categoryId: string;
  categoryName: string;
}

function getCategoriesWithIncomeData(
  incomeData: Transaction[],
  categories: Category[]
): DataTableCategory[] {
  const incomeCategoryIds = new Set(
    incomeData
      ?.filter((item) => item.type === "Income")
      .map((item) => item.categoryId)
  );

  const categoriesWithIncome = categories
    ?.filter((category) => incomeCategoryIds.has(category.id))
    .map((category) => ({
      categoryId: category.id,
      categoryName: category.name,
    }));

  return categoriesWithIncome;
}

export default function IncomeTable() {
  const [selected, setSelected] = useState<Transaction | object>({});
  const { data, loading, filter, mutate } = useData();
  const { categories } = useCategories();
  const { user } = useUser();

  const categoriesFiltered = useMemo(
    () => getCategoriesWithIncomeData(data, categories!),
    [data, categories]
  );

  console.log(categories);

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
        categories={categoriesFiltered}
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
