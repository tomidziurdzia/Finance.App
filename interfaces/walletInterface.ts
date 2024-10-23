export interface Wallet {
  id: string;
  name: string;
  currency: string;
  total: number;
}

export interface Wallets {
  wallets: Wallet[];
  total: number;
}

export interface WalletApiEndpoints {
  getWallets: () => Promise<Wallets>;
  getWalletById: (id: string) => Promise<Wallet>;
  createWallet: (wallet: Partial<Wallet>) => Promise<Wallet>;
  updateWallet: (id: string, wallet: Partial<Wallet>) => Promise<Wallet>;
  deleteWallet: (id: string) => Promise<{ mensaje: string }>;
}
