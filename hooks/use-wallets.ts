import useSWR from "swr";
import { Wallets } from "interfaces/walletInterface";
import { getAllWallets } from "app/actions/wallet";

export function useWallets() {
  const { data, error, isLoading } = useSWR<Wallets>("wallets", getAllWallets);

  return {
    wallets: data?.wallets,
    isLoading,
    isError: error,
  };
}
