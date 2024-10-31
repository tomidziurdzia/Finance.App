export const apiUrls = {
  user: {
    update: "user/update-user",
    updatePassowrd: "user/update-password",
  },
  auth: {
    signup: "user/register",
    singin: "user/login",
  },
  transactions: {
    transactions: "transactions",
    getTransactions: ({ from, to }: { from: string; to: string }) =>
      `/transactions?from=${from}&to=${to}`,
  },
  wallets: {
    wallets: "wallets",
    getWallets: ({ from, to }: { from: string; to: string }) =>
      `/transactions?from=${from}&to=${to}`,
  },
  categories: {
    categories: "categories",
    getCategories: ({ from, to }: { from: string; to: string }) =>
      `/transactions?from=${from}&to=${to}`,
  },
};
