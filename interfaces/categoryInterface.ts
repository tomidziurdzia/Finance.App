export interface Category {
  id: string;
  name: string;
  description?: string;
  type: CategoryType;
  parentType: string;
}

export enum CategoryType {
  Other = "Other",
  Income = "Income",
  Expense = "Expense",
  Investment = "Investment",
  Transfer = "Transfer",
}
