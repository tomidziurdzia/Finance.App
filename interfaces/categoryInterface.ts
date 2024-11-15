export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  parentType: string;
  total: number;
}

export interface Categories {
  categories: Category[];
}

export enum CategoryType {
  Other = "Other",
  Income = "Income",
  Expense = "Expense",
  Investment = "Investment",
  Transfer = "Transfer",
}
