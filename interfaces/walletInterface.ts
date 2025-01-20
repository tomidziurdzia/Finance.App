export interface TransactionWallet {
  id: string;
  categoryId: string;
  categoryName: string;
  amount: number;
  description: string;
  userId: string;
  date: string;
  type: "Income" | "Expense" | "Investment" | "Transfer";
}

export interface Wallet {
  id: string;
  name: string;
  currency: string;
  data: TransactionWallet[];
  totalBalance: number;
}

export interface Wallets {
  wallets: Wallet[];
}
