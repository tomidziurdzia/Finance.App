import { Home, WalletIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import walletService from "@/services/walletService";
import { Wallets } from "@/interfaces/walletInterface";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [wallets, setWallets] = useState<Wallets>();
  const pathname = usePathname();

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

  return (
    <div className="hidden lg:block lg:w-64 lg:shrink-0 bg-[#FAFAFA] text-[#1B212D] dark:lg:bg-gray-800">
      <div className="flex h-full flex-col justify-between py-6 px-4">
        <div className="space-y-6">
          <Link
            href="/home"
            className="flex items-center gap-2 font-bold justify-center text-2xl"
            prefetch={false}
          >
            <span>Finance App</span>
          </Link>
          <nav className="space-y-1 text-[#929EAE]">
            <Link
              href={`/home`}
              className={`flex items-center gap-2 rounded-md p-3 text-sm font-semibold hover:bg-primary hover:opacity-80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50 ${
                pathname === `/home`
                  ? "bg-primary text-black dark:bg-gray-700 dark:text-white"
                  : ""
              }`}
              prefetch={false}
            >
              <Home />
              <span>Dashboard</span>
            </Link>
            {wallets?.wallets?.map((wallet) => (
              <Link
                key={wallet.id}
                href={`/wallets/${wallet.id}`}
                className={`flex items-center gap-2 rounded-md p-3 text-sm font-semibold hover:bg-primary hover:opacity-80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50 ${
                  pathname === `/wallets/${wallet.id}`
                    ? "bg-primary text-black dark:bg-gray-700 dark:text-white"
                    : ""
                }`}
                prefetch={false}
              >
                <WalletIcon className="h-5 w-5" />
                <span>{wallet.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
