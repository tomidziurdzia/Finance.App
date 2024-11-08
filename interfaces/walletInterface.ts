export interface Wallet {
  id: string;
  name: string;
  currency: string;
}

export interface Wallets {
  wallets: Wallet[];
}
