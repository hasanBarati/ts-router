import { useUserStore } from "@/app/user-store";
import { useUserData } from "@/features/auth/hooks/useUserData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { LogoutButton } from "../../logout/ui/logout-button";
import { menuItems, type MenuItem } from "../config/menuItems";
import { hasPermissionMenu } from "../model/menuPermission";

export function AppSidebar() {
  const { userInfo } = useUserStore();
  const { isLoading } = useUserData();

  const renderMenuItems = (items: MenuItem[]) => {
    // If no user data, only show items without permission
    if (!userInfo) {
      return items
        .filter((item) => !item.permission)
        .map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center gap-3 pl-4">
                {item.icon}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ));
    }

    // If we have user data, show all items with proper permissions
    return items
      .filter((item) => {
        if (!item.permission) return true;
        return hasPermissionMenu(item.permission);
      })
      .map((item) => {
        if (item.subItems) {
          const visibleSubItems = item.subItems.filter(
            (sub) => !sub.permission || hasPermissionMenu(sub.permission)
          );
          if (visibleSubItems.length === 0) return null;
          return (
            <Collapsible key={item.title} defaultOpen={false}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-full justify-between pl-4">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 transition-transform data-[state=open]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className="pl-6">
                    {visibleSubItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <a
                          href={subItem.url}
                          className="flex items-center gap-3 text-sm pl-4"
                        >
                          {subItem.title}
                        </a>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center gap-3 pl-4">
                {item.icon}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      });
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      side="right"
      className="bg-gray-100"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarTrigger />
              {renderMenuItems(menuItems)}
              <LogoutButton />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
