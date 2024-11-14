"use client";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "components/ui/sidebar";
import Link from "next/link";
import { ChevronDown, Wallet } from "lucide-react";
import { cn } from "lib/utils";
import { usePathname } from "next/navigation";
import { useCategories } from "hooks/use-categories";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/ui/collapsible";
import { dashboardLinks } from "constants/links";
import { useWallets } from "hooks/use-wallets";
import SidebarLoader from "components/loader/sidebar";

type CategoryItem = {
  id: string;
  name: string;
};

type SubCategories = {
  [key: string]: CategoryItem[];
};

type Categories = {
  [key: string]: SubCategories;
};

export default function Component() {
  const pathname = usePathname();
  const {
    categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategories() as {
    categories: Categories | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  const {
    wallets,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useWallets();

  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryType: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryType)
        ? prev.filter((type) => type !== categoryType)
        : [...prev, categoryType]
    );
  };

  return (
    <SidebarComponent>
      <SidebarHeader className="relative">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold justify-center text-2xl"
          prefetch={false}
        >
          <span>Finance App</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardLinks.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2 rounded-md p-2 w-full",
                        pathname === link.href &&
                          "bg-primary text-sidebar-accent-foreground"
                      )}
                    >
                      <link.Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroupLabel className="pl-4">Wallets</SidebarGroupLabel>
        <SidebarGroup className="mb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {isWalletLoading ? (
                <SidebarLoader />
              ) : isWalletError ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    Error loading wallets
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : wallets && wallets.length > 0 ? (
                wallets.map((wallet) => (
                  <SidebarMenuItem key={wallet.id}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/wallets/${wallet.id}`}
                        className={cn(
                          "flex items-center justify-between w-full rounded-md p-2 text-sm",
                          pathname === `/wallets/${wallet.id}` &&
                            "bg-primary text-sidebar-accent-foreground"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          {wallet.name}
                        </span>
                        <span>{wallet.currency}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    No wallets found
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroupLabel className="pl-4">Categories</SidebarGroupLabel>
        {isCategoryLoading ? (
          <SidebarLoader />
        ) : isCategoryError ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel>Error loading categories</SidebarGroupLabel>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : categories ? (
          Object.entries(categories).map(([categoryType, subCategories]) => (
            <SidebarGroup className="px-2 py-0" key={categoryType}>
              <SidebarGroupContent>
                <Collapsible
                  open={openCategories.includes(categoryType)}
                  onOpenChange={() => toggleCategory(categoryType)}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full flex justify-between items-center">
                      <span className="capitalize">{categoryType}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openCategories.includes(categoryType)
                            ? "transform rotate-180"
                            : ""
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu>
                      {Object.entries(subCategories).map(
                        ([subCategoryName, items]) => (
                          <SidebarMenuItem key={subCategoryName}>
                            <Collapsible>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="w-full h-8 flex justify-between items-center pl-4">
                                  <span>{subCategoryName}</span>
                                  <ChevronDown className="h-3 w-3" />
                                </SidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenu>
                                  {items.map((item: CategoryItem) => (
                                    <SidebarMenuItem key={item.id}>
                                      <SidebarMenuButton asChild>
                                        <Link
                                          href={`/categories/${item.id}`}
                                          className={cn(
                                            "flex items-center justify-between w-full rounded-md p-2 text-sm pl-6",
                                            pathname ===
                                              `/categories/${item.id}` &&
                                              "bg-primary text-sidebar-accent-foreground"
                                          )}
                                        >
                                          <span>{item.name}</span>
                                        </Link>
                                      </SidebarMenuButton>
                                    </SidebarMenuItem>
                                  ))}
                                </SidebarMenu>
                              </CollapsibleContent>
                            </Collapsible>
                          </SidebarMenuItem>
                        )
                      )}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        ) : null}
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  );
}
