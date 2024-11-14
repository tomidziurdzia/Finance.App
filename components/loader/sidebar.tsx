import React from "react";
import { Skeleton } from "components/ui/skeleton";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "components/ui/sidebar";

interface SidebarCategoryLoaderProps {
  groups?: number;
  itemsPerGroup?: number;
}

export default function SidebarLoader({
  groups = 1,
  itemsPerGroup = 4,
}: SidebarCategoryLoaderProps) {
  return (
    <>
      {Array(groups)
        .fill(0)
        .map((_, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupContent>
              <SidebarMenuButton className="w-full flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </SidebarMenuButton>
              <SidebarMenu>
                {Array(itemsPerGroup)
                  .fill(0)
                  .map((_, itemIndex) => (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton className="w-full flex justify-between items-center">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-8" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
    </>
  );
}
