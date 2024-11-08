"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { createIncome } from "app/actions/income";

interface AddIncome {
  show: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected: any;
  onHide: () => void;
  mutate: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lookup: (value: any) => void;
}

const initialState = {
  category: "",
  date: "",
  name: "",
  notes: "",
  amount: "",
  wallet: "",
  autocomplete: [],
};

export default function AddIncome({
  show,
  onHide,
  mutate,
  selected,
  lookup,
}: AddIncome) {
  const { user } = useUser();
  const todayDate = format(new Date(), dateFormat);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, setState] = useState<any>({ ...initialState, date: todayDate });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories } = useCategories();
  const { wallets } = useWallets();

  const filteredCategories =
    categories?.filter(
      (category) => category.type === "Transfer" || category.type === "Income"
    ) || [];

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  useEffect(
    () =>
      setState(selected.id ? selected : { ...initialState, date: todayDate }),
    [selected, todayDate]
  );

  const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState((prev: any) => ({ ...prev, autocomplete: lookup(value) }));
    };
    return debounce(callbackHandler, 500);
  }, [lookup]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const isEditing = selected?.id;
      if (isEditing) {
        // await editIncome(state);
      } else {
        const newData: NewTransaction = {
          walletId: state.wallet,
          categoryId: state.category,
          amount: Number(state.amount),
          description: state.name,
          date: state.date,
        };

        await createIncome(newData);

        // await addIncome(state);
      }
      setLoading(false);
      toast.success(isEditing ? messages.updated : messages.success);
      if (mutate) mutate();
      onHide();
      setState({ ...initialState });
    } catch {
      setLoading(false);
      toast.error(messages.error);
    }
  };

  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${selected.id ? "Edit" : "Add"} Income`}</DialogTitle>
        </DialogHeader>
        <form
          className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
            if (!selected.id) setState({ ...initialState });
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
                if (value.length) {
                  setState({ ...state, name: value, autocomplete: [] });
                  if (value.length > 2) onLookup(value);
                } else {
                  setState({
                    ...state,
                    name: "",
                    category: "",
                    autocomplete: [],
                  });
                }
              }}
              value={state.name}
            />
            <AutoCompleteList
              onHide={() => {
                setState({ ...state, autocomplete: [] });
              }}
              data={state.autocomplete}
              searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ""}
              onClick={({ name, category }) => {
                setState({ ...state, name, category, autocomplete: [] });
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
                  setState({ ...state, amount: event.target.value })
                }
                value={state.amount}
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
                onChange={(event) => {
                  setState({ ...state, date: event.target.value });
                }}
                value={state.date}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="mt-1.5 flex h-9 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => {
                  setState({ ...state, category: event.target.value });
                }}
                value={state.category}
                required
              >
                <option disabled value="">
                  Select a category
                </option>
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="wallet">Wallet</Label>
              <select
                id="wallet"
                className="mt-1.5 flex h-9 max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => {
                  setState({ ...state, wallet: event.target.value });
                }}
                value={state.wallet}
                required
              >
                <option disabled value="">
                  Select a wallet
                </option>
                {wallets?.wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label className="block">
              Notes{" "}
              <span className="text-center text-sm text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Input
              className="mt-2"
              onChange={(event) =>
                setState({ ...state, notes: event.target.value })
              }
              value={state.notes}
              maxLength={60}
            />
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