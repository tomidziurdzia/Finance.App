import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Wallets } from "@/interfaces/walletInterface";
import { Category } from "@/interfaces/categoryInterface";
import { getAllWallets } from "@/app/actions/wallets";
import { getAllCategories } from "@/app/actions/category";
import { SidebarItem } from "./sidebarItem";

const Sidebar = async () => {
  const wallets: Wallets = await getAllWallets();
  const categories: Category[] = await getAllCategories();

  return (
    <SidebarComponent>
      <SidebarHeader className="relative p-4">
        <Link
          href="/"
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
            <SidebarMenu>
              {wallets.wallets.map((item) => (
                <SidebarItem
                  key={item.id}
                  {...item}
                  description={item.currency}
                  pathname="/wallets"
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarItem
                  key={item.id}
                  {...item}
                  description={item.type}
                  pathname="/categories"
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  );
};
export default Sidebar;
