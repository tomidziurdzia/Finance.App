import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarGroupComponentProps {
  items: Array<{ id: string; name: string; currency?: string }>;
  basePath: string;
}

const SidebarGroupComponent: React.FC<SidebarGroupComponentProps> = ({
  items,
  basePath,
}) => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton asChild>
            <Link
              href={`${basePath}/${item.id}`}
              className={cn(
                "flex items-center gap-2 rounded-md p-3 text-sm font-semibold",
                "hover:bg-primary/80 hover:text-primary-foreground",
                "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50",
                pathname === `${basePath}/${item.id}` &&
                  "bg-primary text-primary-foreground dark:bg-gray-700 dark:text-white"
              )}
            >
              <div className="flex justify-between w-full items-center">
                <p>{item.name}</p>
                <SidebarGroupLabel className="text-xs">
                  {item.currency}
                </SidebarGroupLabel>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarGroupComponent;
