"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Category, CategoryType } from "@/interfaces/categoryInterface";
import categoryService from "@/services/categoryService";
import walletService from "@/services/walletService";
import { Wallets } from "@/interfaces/walletInterface";
import transactionService from "@/services/transactionService";
import { TransactionType } from "@/interfaces/transactionInterface";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

const typeOptions = Object.entries(TransactionType)
  .filter(([, value]) => typeof value === "number")
  .map(([label, value]) => ({
    label,
    value: value.toString(),
  }));

const formSchema = z.object({
  createdAt: z.date({ required_error: "Date is required" }),
  categoryId: z.string().min(1, { message: "Category is required." }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  amount: z.union([
    z.number().min(0.01, {
      message: "Amount must be a valid number greater than 0.",
    }),
    z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a number greater than 0.",
    }),
  ]),
  type: z.string().min(1, { message: "Type is required." }),
  walletId: z.string().min(1, { message: "Wallet is required." }),
});

const TransactionDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wallets, setWallets] = useState<Wallets>();
  const [selectedType, setSelectedType] = useState<TransactionType | null>(
    null
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataWallets, dataCategories] = await Promise.all([
          walletService.getAll(),
          categoryService.getAll(),
        ]);
        setWallets(dataWallets);
        setCategories(dataCategories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      categoryId: "",
      type: "",
      walletId: "",
      amount: "",
      createdAt: new Date(),
    },
  });

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setSelectedType(null);
      form.setValue("categoryId", "");
      setAlertMessage(null);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const transactionData = {
      ...values,
      amount: Number(values.amount),
      type: Number(values.type),
      createdAt: values.createdAt.toISOString(),
    };

    const selectedWallet = wallets?.wallets.find(
      (wallet) => wallet.id === transactionData.walletId
    );

    if (!selectedWallet) {
      setAlertMessage("Selected wallet not found");
      return;
    }

    const requiresBalanceCheck = [
      TransactionType.Expense,
      TransactionType.Transfer,
      TransactionType.Investment,
    ].includes(Number(transactionData.type));

    if (requiresBalanceCheck && selectedWallet.total < transactionData.amount) {
      setAlertMessage(
        `Insufficient funds. Your wallet balance is ${selectedWallet.total} ${selectedWallet.currency}.`
      );
      return;
    }

    try {
      await transactionService.createTransaction(transactionData);
      setOpen(false);
      form.reset();
      setAlertMessage(null);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setAlertMessage(
        "An error occurred while creating the transaction. Please try again."
      );
    }
  }

  const filteredCategories = selectedType
    ? categories.filter(
        (category) =>
          category.type === (selectedType as unknown as CategoryType)
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full p-3 shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="walletId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        {wallets?.wallets.find(
                          (wallet) => wallet.id === field.value
                        )?.name || "Select wallet"}
                      </SelectTrigger>
                      <SelectContent>
                        {wallets?.wallets.map((wallet) => (
                          <SelectItem key={wallet.id} value={wallet.id}>
                            {wallet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedType(
                          TransactionType[value as keyof typeof TransactionType]
                        );
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        {typeOptions.find((opt) => opt.value === field.value)
                          ?.label || "Select type"}
                      </SelectTrigger>
                      <SelectContent>
                        {typeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter transaction description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {alertMessage && (
              <div className="text-xs text-center p-4 bg-red-500 text-white rounded">
                {alertMessage}
              </div>
            )}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedType}
                    >
                      <SelectTrigger>
                        {filteredCategories.find(
                          (cat) => cat.id === field.value
                        )?.name || "Select category"}
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
