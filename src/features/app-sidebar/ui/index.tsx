import { useUserStore } from "@/app/user-store";
import { useUserData } from "@/features/auth/hooks/useUserData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/shared/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { LogoutButton } from "../../logout/ui/logout-button";
import { menuItems, type MenuItem } from "../config/menuItems";
import { hasPermissionMenu } from "../model/menuPermission";

export function AppSidebar() {
  const { userInfo } = useUserStore();
  const { isLoading } = useUserData();
  const { state } = useSidebar();
  console.log(isLoading, userInfo);
  const renderMenuItems = (items: MenuItem[]) => {
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
                <HoverCard
                  openDelay={200}
                  open={state === "expanded" ? false : undefined}
                >
                  <div className="relative">
                    <HoverCardTrigger asChild>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between pl-4">
                          <div className="flex items-center gap-3">
                            {item.icon}
                            {state === "expanded" && <span>{item.title}</span>}
                          </div>
                          <ChevronDown className="w-4 h-4 transition-transform data-[state=open]:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </HoverCardTrigger>

                    {/* HoverCard Content - فقط وقتی Sidebar کوچیک است نمایش داده میشه */}
                    <HoverCardContent
                      side="left"
                      align="start"
                      className="w-48 p-1"
                      sideOffset={8}
                    >
                      {visibleSubItems.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {subItem.icon && (
                            <span className="w-4 h-4">{subItem.icon}</span>
                          )}
                          <span>{subItem.title}</span>
                        </a>
                      ))}
                    </HoverCardContent>
                  </div>
                </HoverCard>

                <CollapsibleContent>
                  <SidebarMenuSub className="pl-6">
                    {visibleSubItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <a
                          href={subItem.url}
                          className="flex items-center gap-3 text-sm pl-4 hover:bg-secondary p-1 rounded-lg hover:text-primary"
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
              <a
                href={item.url}
                className="flex items-center gap-3 text-sm pl-4 hover:bg-secondary p-1 rounded-lg hover:text-primary"
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      });
  };

  return (
    <Sidebar collapsible="icon" variant="inset" side="right">
      <SidebarContent className="text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarTrigger />
              {isLoading ? (
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SidebarMenuSkeleton key={i} className=" bg-white" />
                  ))}
                </>
              ) : (
                <>
                  {renderMenuItems(menuItems)}
                  <LogoutButton />
                </>
              )}

              <LogoutButton />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
