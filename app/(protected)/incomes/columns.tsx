"use client";

import DataTableColumnHeader from "@/components/table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/interfaces/transactionInterface";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: (props) => {
      const { row } = props;
      const date = row.getValue<string>("date");
      const formatted = formatDate({ date, locale: "es-ES" });
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: (props) => {
      const { row } = props;
      const description = row.getValue<string>("description");
      return <div className="font-medium">{description}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: (props) => {
      const { row } = props;
      const price = parseFloat(row.getValue("amount"));
      const formatted = formatCurrency({
        value: price,
        currency: "USD",
        locale: "es-ES",
      });

      return <div className="font-medium tabular-nums">{formatted}</div>;
    },
  },
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue<string>("categoryName");
      return <div className="">{category}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue<string>("type");
      return <div className="">{type}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (props) => {
      const {
        row,
        table: {
          options: { meta },
        },
      } = props;
      return (
        <div className="flex">
          <Button
            className="mr-1 rounded-lg p-0 hover:bg-transparent hover:opacity-70"
            variant={"ghost"}
          >
            <Pencil
              className="h-4 w-4"
              onClick={() => {
                meta?.onEdit(row.original);
              }}
            />
          </Button>
          <Button
            className="ml-2 rounded-lg p-0 hover:bg-transparent hover:opacity-70"
            variant={"ghost"}
          >
            <Trash2
              className="h-4 w-4"
              onClick={() => {
                meta?.onDelete(row.original?.id);
              }}
            />
          </Button>
        </div>
      );
    },
    meta: {
      isTogglable: false,
    },
  },
];
