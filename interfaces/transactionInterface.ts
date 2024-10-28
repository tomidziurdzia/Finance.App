export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: number;
  categoryName: string;
  createdAt: Date;
}

export interface TransactionRequest {
  description: string;
  amount: number;
  type: number;
  categoryName?: string;
  createdAt: string;
}

export interface Transactions {
  transactions: Transaction[];
}

export enum TransactionType {
  Income = 1,
  Expense = 2,
  Investment = 3,
  Transfer = 4,
}
