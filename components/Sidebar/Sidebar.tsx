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
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Banknote,
  Briefcase,
  CandlestickChart,
  ChevronDown,
  HandCoins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCategories } from "@/hooks/use-categories";
import {
  groupCategoriesByParentType,
  GroupedCategories,
} from "@/lib/groupCategories";
import { useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import CategoryLoader from "../loader/category";

const dashboardLinks = [
  {
    name: "Overview",
    href: "/",
    Icon: HandCoins,
  },
  {
    name: "Income",
    href: "/incomes",
    Icon: Briefcase,
  },
  {
    name: "Expenses",
    href: "/expenses",
    Icon: Banknote,
  },
  {
    name: "Investments",
    href: "/investments",
    Icon: CandlestickChart,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { categories, isLoading, isError } = useCategories();
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const groupedCategories: GroupedCategories = useMemo(() => {
    return categories ? groupCategoriesByParentType(categories) : {};
  }, [categories]);

  const toggleCategory = (parentType: string) => {
    setOpenCategories((prev) =>
      prev.includes(parentType)
        ? prev.filter((type) => type !== parentType)
        : [...prev, parentType]
    );
  };

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
        <SidebarGroupLabel className="pl-4">Categories</SidebarGroupLabel>
        {isLoading ? (
          <CategoryLoader />
        ) : isError ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarGroupLabel>Error loading categories</SidebarGroupLabel>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          Object.entries(groupedCategories).map(([parentType, categories]) => (
            <SidebarGroup key={parentType}>
              <SidebarGroupContent>
                <Collapsible
                  open={openCategories.includes(parentType)}
                  onOpenChange={() => toggleCategory(parentType)}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full h-2 flex justify-between items-center">
                      <span>{parentType}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openCategories.includes(parentType)
                            ? "transform rotate-180"
                            : ""
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu>
                      {categories.map((category) => (
                        <SidebarMenuItem key={category.id}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={`/categories/${category.id}`}
                              className={cn(
                                "flex items-center justify-between w-full rounded-md p-2 text-sm",
                                pathname === `/categories/${category.id}` &&
                                  "bg-primary text-sidebar-accent-foreground"
                              )}
                            >
                              <span>{category.name}</span>
                              <SidebarGroupLabel className="text-xs">
                                {category.type}
                              </SidebarGroupLabel>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>
      <SidebarRail />
    </SidebarComponent>
  );
}
