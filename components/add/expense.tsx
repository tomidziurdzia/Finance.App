/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useUser } from "components/context/auth-provider";
import debounce from "debounce";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { getCurrencySymbol } from "lib/formatter";
import { dateFormat, datePattern } from "constants/date";
import messages from "constants/messages";
import AutoCompleteList from "components/autocomplete-list";
import CircleLoader from "components/loader/circle";
import { useCategories } from "hooks/use-categories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { useWallets } from "hooks/use-wallets";
import { NewTransaction } from "interfaces/transactionInterface";
import { createExpense } from "app/actions/expense";

interface AddExpense {
  show: boolean;
  selected: any;
  onHide: () => void;
  mutate: () => void;
  lookup: (value: any) => void;
}

const initialState = {
  category: "",
  date: "",
  name: "",
  amount: "",
  wallet: "",
  autocomplete: [],
};

type CategoryItem = {
  id: string;
  name: string;
};

export default function AddExpense({
  show,
  onHide,
  mutate,
  selected,
  lookup,
}: AddExpense) {
  const { user } = useUser();
  const todayDate = format(new Date(), dateFormat);
  const [state, setState] = useState<any>({ ...initialState, date: todayDate });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories } = useCategories();
  const { wallets } = useWallets();

  const filteredCategories = useMemo(() => {
    if (!categories) return {};
    console.log(categories);

    const result: { [key: string]: CategoryItem[] } = {};

    if (categories.expense) {
      result.expense = Object.entries(categories.expense).flatMap(
        ([parentType, items]) => items.map((item) => ({ ...item, parentType }))
      );
    }

    if (categories.transfer && categories.transfer.Transfer) {
      result.transfer = categories.transfer.Transfer.map((item) => ({
        ...item,
        parentType: "Transfer",
      }));
    }

    if (categories.other && categories.other.Others) {
      result.other = categories.other.Others.map((item) => ({
        ...item,
        parentType: "Other",
      }));
    }

    return result;
  }, [categories]);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    setState(
      selected.id
        ? { ...selected, autocomplete: [] }
        : { ...initialState, date: todayDate }
    );
  }, [selected, todayDate]);

  const onLookup = useMemo(() => {
    const callbackHandler = (value: object) => {
      const allItems = [
        ...Object.values(categories || {}).flat(),
        ...(state.previousTransactions || []),
      ];
      const results = lookup({ data: allItems, name: value });
      setState((prev: any) => ({ ...prev, autocomplete: results }));
    };
    return debounce(callbackHandler, 500);
  }, [categories, state.previousTransactions, lookup]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const isEditing = selected?.id;
      if (isEditing) {
        // await editExpense(state);
      } else {
        const newData: NewTransaction = {
          walletId: state.wallet,
          categoryId: state.category,
          amount: Number(state.amount),
          description: state.name,
          date: state.date,
        };

        await createExpense(newData);
      }
      setLoading(false);
      toast.success(isEditing ? messages.updated : messages.success);
      if (mutate) mutate();
      onHide();
      setState({ ...initialState, date: todayDate });
    } catch {
      setLoading(false);
      toast.error(messages.error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setState((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${selected.id ? "Edit" : "Add"} Expense`}</DialogTitle>
        </DialogHeader>
        <form
          className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="relative">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="mt-1.5"
              placeholder="Salary"
              maxLength={30}
              required
              ref={inputRef}
              autoFocus
              autoComplete="off"
              onChange={({ target }) => {
                const { value } = target;
                handleInputChange("name", value);
                if (value.length > 2) {
                  onLookup(value);
                } else {
                  setState((prev: any) => ({ ...prev, autocomplete: [] }));
                }
              }}
              value={state.name || ""}
            />
            <AutoCompleteList
              onHide={() => {
                setState((prev: any) => ({ ...prev, autocomplete: [] }));
              }}
              data={state.autocomplete || []}
              searchTerm={state.name?.length > 2 ? state.name : ""}
              onClick={({ description: name }) => {
                console.log(state.autocomplete);
                setState((prev: any) => ({
                  ...prev,
                  name: name || "",
                  autocomplete: [],
                }));
              }}
              show={Boolean(state.autocomplete?.length)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">
                Amount
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  ({getCurrencySymbol(user?.currency, user?.locale)})
                </span>
              </Label>
              <Input
                className="mt-1.5"
                id="amount"
                type="number"
                inputMode="decimal"
                placeholder="10000"
                required
                min="0"
                step="any"
                onChange={(event) =>
                  handleInputChange("amount", event.target.value)
                }
                value={state.amount || ""}
              />
            </div>
            <div>
              <Label htmlFor="date">Received Date</Label>
              <Input
                className="mt-1.5 appearance-none"
                id="date"
                type="date"
                required
                max={todayDate}
                pattern={datePattern}
                onChange={(event) =>
                  handleInputChange("date", event.target.value)
                }
                value={state.date || ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="mt-1.5 flex h-9 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) =>
                  handleInputChange("category", event.target.value)
                }
                value={state.category || ""}
                required
              >
                <option disabled value="">
                  Select a category
                </option>
                {Object.entries(filteredCategories).map(
                  ([type, categories]) => (
                    <React.Fragment key={type}>
                      <option disabled>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </React.Fragment>
                  )
                )}
              </select>
            </div>
            <div>
              <Label htmlFor="wallet">Wallet</Label>
              <select
                id="wallet"
                className="mt-1.5 flex h-9 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) =>
                  handleInputChange("wallet", event.target.value)
                }
                value={state.wallet || ""}
                required
              >
                <option disabled value="">
                  Select a wallet
                </option>
                {wallets?.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name} {wallet.currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button disabled={loading} className="mt-1.5" type="submit">
            {loading ? (
              <CircleLoader />
            ) : (
              `${selected?.id ? "Update" : "Submit"}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
