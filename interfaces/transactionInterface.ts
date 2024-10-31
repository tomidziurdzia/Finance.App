export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: number;
  categoryId: string;
  categoryName: string;
  walletId: string;
  walletName: string;
  createdAt: Date;
}

//! Why category name and not categoryId?
export interface TransactionRequest {
  description: string;
  walletId: string;
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
