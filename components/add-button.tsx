/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { Tooltip, TooltipTrigger } from "components/ui/tooltip";
import AddIncome from "./add/income";
import AddExpense from "./add/expense";
import AddInvestment from "./add/investment";

type TypeProps = "expenses" | "income" | "investments" | "subscriptions";

type AddProps = {
  mutate?: any;
  type?: TypeProps;
  selected?: any;
  onHide?: () => void;
  onLookup?: (name: string) => void;
};

export default function Add({
  mutate,
  type,
  selected = {},
  onHide,
  onLookup,
}: AddProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selected?.id) {
      setShow(true);
    }
  }, [selected.id]);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="z-100 fixed bottom-[20px] right-[20px] flex h-[56px] w-[56px] items-center justify-between rounded-full bg-primary hover:bg-primary/90 p-[12px] text-sm font-medium uppercase text-white shadow-lg sm:h-[48px] sm:w-[48px]"
            onClick={() => {
              setShow(!show);
            }}
          >
            <PlusIcon className="h-12 w-12" />
          </button>
        </TooltipTrigger>
      </Tooltip>
      {type === "expenses" ? (
        <AddExpense
          lookup={(value: string) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
      {type === "income" ? (
        <AddIncome
          lookup={(value: string) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
      {type === "investments" ? (
        <AddInvestment
          lookup={(value: string) => {
            if (onLookup) return onLookup(value);
          }}
          show={show}
          selected={selected}
          mutate={mutate}
          onHide={() => {
            if (onHide) onHide();
            setShow(false);
          }}
        />
      ) : null}
    </>
  );
}
