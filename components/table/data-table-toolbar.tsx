"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import DataTableFacetedFilter from "./data-table-faceted-filter";
import DataTableFilterOptions from "./data-table-filter-options";
import DataTableViewOptions from "./data-table-view-options";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  className?: string;
  loading: boolean;
  hideViewOptions?: boolean | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: {
    name: string;
    setFilter: (filter: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilter?: (filterData: any) => void;
  };
  categories: {
    categoryId: string;
    categoryName: string;
  }[];
}

export default function DataTableToolbar<TData>(
  props: DataTableToolbarProps<TData>
) {
  const {
    table,
    className,
    loading,
    categories,
    filter,
    hideViewOptions = false,
  } = props;
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={`mb-4 mt-10 flex flex-col items-center justify-between sm:flex-row ${className}`}
    >
      <div className="mb-4 flex w-full flex-1 items-center space-x-2 sm:mb-0">
        <Input
          disabled={loading}
          placeholder="Filter by description"
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="mr-1.5 h-8 w-full sm:w-[200px] md:w-[300px]"
        />
        {table.getColumn("categoryName") ? (
          <DataTableFacetedFilter
            disabled={loading}
            column={table.getColumn("categoryName")}
            title="Category"
            onFilter={filter.onFilter}
            options={categories}
          />
        ) : null}
        {isFiltered && (
          <Button
            variant="secondary"
            onClick={() => {
              filter.onFilter?.([]);
              table.resetColumnFilters();
            }}
            className="h-7"
          >
            Reset
            <Cross2Icon className="ml-3 h-4 w-4" />
          </Button>
        )}
      </div>
      <div
        className={`${
          loading ? "pointer-events-none opacity-50" : ""
        } grid w-full grid-flow-col gap-3 sm:w-auto`}
      >
        {!hideViewOptions ? (
          <DataTableFilterOptions
            setFilter={filter?.setFilter}
            filter={filter.name}
          />
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
