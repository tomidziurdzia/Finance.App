export interface TransactionBase {
  id: string;
  walletId: string;
  walletName: string;
  categoryId: string;
  categoryName: string;
  userId: string;
  amount: number;
  description?: string;
  date?: Date;
  type: string;
}

export interface Investment extends TransactionBase {
  type: "Investment";
}

export interface Income extends TransactionBase {
  type: "Income";
}

export interface Expense extends TransactionBase {
  type: "Expense";
}

// You can also create a union type for all transaction types
export type Transaction = Investment | Income | Expense;

export interface NewTransaction {
  walletId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: Date;
}
