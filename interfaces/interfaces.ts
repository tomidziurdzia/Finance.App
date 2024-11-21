// interfaces.ts
export interface TransactionBase {
  id: string;
  walletId?: string | null;
  walletName?: string | null;
  investmentAccountId?: string | null;
  investmentAccountName?: string | null;
  categoryId: string;
  categoryName: string;
  userId: string;
  amount: number;
  description?: string | null;
  date?: string | null;
}

export interface Income extends TransactionBase {
  type: "Income";
}

export interface Expense extends TransactionBase {
  type: "Expense";
}

export interface Investment extends TransactionBase {
  type: "Investment";
}

export interface IncomesDto {
  data: Income[];
  total: number;
}

export interface ExpensesDto {
  data: Expense[];
  total: number;
}

export interface InvestmentsDto {
  data: Investment[];
  total: number;
}

export interface NewTransaction {
  id?: string;
  walletId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}

export type TransactionsDto = IncomesDto | ExpensesDto | InvestmentsDto;
export type Transaction = Income | Expense | Investment;
