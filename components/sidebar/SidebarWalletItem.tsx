"use client";

import { Wallet } from "@/interfaces/walletInterface";
import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Props {
  wallet: Wallet;
}

export const SidebarWalletItem = ({ wallet }: Props) => {
  const path = `/wallets/${wallet.id}`;
  const currentPath = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={path}
          className={cn(
            "flex items-center gap-2 rounded-md p-3 text-sm font-semibold",
            "hover:bg-primary/80 hover:text-primary-foreground",
            "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50",
            currentPath === path &&
              "bg-primary text-primary-foreground dark:bg-gray-700 dark:text-white"
          )}
        >
          <div className="flex justify-between w-full items-center">
            <p>{wallet.name}</p>
            <SidebarGroupLabel className="text-xs">
              {wallet.currency}
            </SidebarGroupLabel>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
