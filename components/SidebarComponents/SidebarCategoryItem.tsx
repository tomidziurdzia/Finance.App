"use client";

import {
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Category } from "@/interfaces/categoryInterface";

interface Props {
  category: Category;
}

export const SidebarCategoryItem = ({ category }: Props) => {
  const path = `/categories/${category.id}`;
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
            <p>{category.name}</p>
            <SidebarGroupLabel className="text-xs">
              {category.type}
            </SidebarGroupLabel>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
