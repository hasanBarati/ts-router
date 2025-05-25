import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible";
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
import { ChevronDown, Home, Inbox, Settings } from "lucide-react";

type MenuItem = {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  subItems?: MenuItem[]; // فقط یک سطح زیرمنو
};

const menuItems: MenuItem[] = [
  {
    title: "Home",
    url: "#home",
    icon: <Home className="w-5 h-5" />,
  },
  {
    title: "Products",
    icon: <Inbox className="w-5 h-5" />,
    subItems: [
      {
        title: "All Products",
        url: "#products",
      },
      {
        title: "Categories",
        url: "#categories",
      },
    ],
  },
  {
    title: "Settings",
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      {
        title: "Account",
        url: "#account",
      },
      {
        title: "Security",
        url: "#security",
      },
    ],
  },
];

export function AppSidebar() {
  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.subItems) {
        return (
          <Collapsible key={item.title}>
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
                  {item.subItems.map((subItem) => (
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
            <a
              href={item.url}
              className="flex items-center gap-3 pl-4"
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
    <Sidebar
      collapsible="icon"
      variant="inset"
      side="right"
      className="bg-gray-100 w-[280px]"
      
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarTrigger  />
              {renderMenuItems(menuItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}