"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

interface ColumnMeta {
  isTogglable?: boolean;
}

export default function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const columns = table.getAllColumns().map((column) => {
    if (column.id === "createdAt") {
      return {
        ...column,
        id: "Date",
      };
    }

    if (column.id === "categoryName") {
      return {
        ...column,
        id: "Category",
      };
    }

    if (column.id === "walletName") {
      return {
        ...column,
        id: "Wallet",
      };
    }
    return column;
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 max-sm:h-10 text-sm capitalize max-sm:px-1 lg:flex"
        >
          <MixerHorizontalIcon className="mr-1.5 h-4 w-4 sm:inline-block" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {columns
          .filter((column) => {
            const meta = column.columnDef.meta as ColumnMeta;
            return (
              typeof column.accessorFn !== "undefined" &&
              column.getCanHide() &&
              meta?.isTogglable !== false
            );
          })
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id.replace(/_/g, " ")}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
