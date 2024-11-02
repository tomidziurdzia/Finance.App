import { Transaction } from "./transactionInterface";

export interface Wallet {
  id: string;
  name: string;
  currency: string;
  total: number;
  transactions: Transaction[];
  income: number;
  expense: number;
  investment: number;
}

export interface Wallets {
  wallets: Wallet[];
  total: number;
}

export interface TotalWallets {
  wallets: {
    id: string;
    total: number;
    income: number;
    expense: number;
    investment: number;
  };
  total: number;
  income: number;
  expense: number;
  investment: number;
}

export interface WalletApiEndpoints {
  getWallets: () => Promise<Wallets>;
  getWalletById: (id: string) => Promise<Wallet>;
  createWallet: (wallet: Partial<Wallet>) => Promise<Wallet>;
  updateWallet: (id: string, wallet: Partial<Wallet>) => Promise<Wallet>;
  deleteWallet: (id: string) => Promise<{ mensaje: string }>;
}
