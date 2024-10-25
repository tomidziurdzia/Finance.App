import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import walletService from "@/services/walletService";
import categoryService from "@/services/categoryService";
import { Wallets } from "@/interfaces/walletInterface";
import { Category } from "@/interfaces/categoryInterface";
import { useEffect, useState } from "react";
import SidebarGroupComponent from "./SidebarGroupComponent";

const Sidebar = () => {
  const [wallets, setWallets] = useState<Wallets>();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataWallets, dataCategories] = await Promise.all([
          walletService.getAll(),
          categoryService.getAll(),
        ]);
        setWallets(dataWallets);
        setCategories(dataCategories);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SidebarComponent>
      <SidebarHeader className="relative p-4">
        <Link
          href="/home"
          className="flex items-center gap-2 font-bold justify-center text-2xl"
          prefetch={false}
        >
          <span>Finance App</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>My Wallets</SidebarGroupLabel>
            {wallets && (
              <SidebarGroupComponent
                items={wallets.wallets}
                basePath="/wallets"
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            {categories && (
              <SidebarGroupComponent
                items={categories}
                basePath="/categories"
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  );
};

export default Sidebar;
