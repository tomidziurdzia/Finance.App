import { GlobeIcon, Wallet, WalletIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import walletService from "@/services/walletService";
import { Wallets } from "@/interfaces/walletInterface";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Sidebar = () => {
  const [wallets, setWallets] = useState<Wallets>();
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const data = await walletService.getAll();
        setWallets(data);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchWallets();
  }, []);

  console.log(wallets);

  return (
    <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-primary dark:lg:bg-gray-800">
      <div className="flex h-full flex-col justify-between py-6 px-4">
        <ThemeToggle />
        <div className="space-y-6">
          <Link
            href="/home"
            className="flex items-center gap-2 font-bold"
            prefetch={false}
          >
            <Wallet className="h-6 w-6" />
            <span className="text-lg">Finance App</span>
          </Link>
          <nav className="space-y-1">
            {wallets?.wallets?.map((wallet) => (
              <Link
                key={wallet.id}
                href={`/wallets/${wallet.id}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                prefetch={false}
              >
                <WalletIcon className="h-5 w-5" />
                <span>{wallet.name}</span>
                {wallet.currency}
                <span>{wallet.total}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4">
          <Button variant="outline" size="sm" className="w-full">
            Upgrade to Pro
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <GlobeIcon className="h-5 w-5" />
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
