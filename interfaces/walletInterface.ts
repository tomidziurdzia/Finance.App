export interface Wallet {
  id: string;
  name: string;
  currency: string;
  total: number;
}

export interface Wallets {
  wallets: Wallet[];
}
