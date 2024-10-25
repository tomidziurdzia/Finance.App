export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: number;
  category: string;
  createdAt: Date;
}

export interface Transactions {
  transactions: Transaction[];
}
