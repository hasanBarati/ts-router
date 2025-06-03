import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";
import { LogOut } from "lucide-react";
import { useLogout } from "../model/logout";

export const LogoutButton = () => {
  const { handleLogout } = useLogout();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a onClick={handleLogout} className=" ">
          <LogOut className="w-5 h-5" />
          <span>خروج</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
