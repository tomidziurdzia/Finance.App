"use client";

import { useEffect, useState } from "react";
import { PlusIcon, User, Settings, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { Button } from "components/ui/button";
import AddIncome from "./add/income";
import AddExpense from "./add/expense";
import AddInvestment from "./add/investment";

type TypeProps = "expenses" | "income" | "investments";

type AddProps = {
  mutate: () => void;
  type?: TypeProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected?: Record<string, any>;
  onHide?: () => void;
  onLookup?: (name: { name: string }) => void;
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

  const handleAddClick = (newType: TypeProps) => {
    setShow(true);
    if (type !== newType && onHide) {
      onHide();
    }
  };

  return (
    <>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <div className="z-100 fixed bottom-[20px] right-[20px] h-[56px] w-[56px] rounded-full bg-[#C6F133] p-0 sm:h-[48px] sm:w-[48px] flex items-center justify-center">
            <PlusIcon className="h-6 w-6 text-[#3f3f47]" />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          align="end"
          className="w-40 bg-transparent p-0"
        >
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start bg-[#C6F133] hover:bg-[#d4f55b] text-[#3f3f47]"
              onClick={() => handleAddClick("income")}
            >
              <User className="mr-2 h-4 w-4" />
              Income
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start bg-[#C6F133] hover:bg-[#d4f55b] text-[#3f3f47]"
              onClick={() => handleAddClick("expenses")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Expense
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start bg-[#C6F133] hover:bg-[#d4f55b] text-[#3f3f47]"
              onClick={() => handleAddClick("investments")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Investment
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
      {type === "expenses" && (
        <AddExpense
          lookup={(value: { name: string }) => {
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
      )}
      {type === "income" && (
        <AddIncome
          lookup={(value: { name: string }) => {
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
      )}
      {type === "investments" && (
        <AddInvestment
          lookup={(value: { name: string }) => {
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
      )}
    </>
  );
}
