// src/features/profile-menu/ui/ProfileMenu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { Button } from "@/shared/ui/button";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useUserStore } from "@/app/user-store";
import { useLogout } from "@/features/logout/model/logout";
import { useNavigate } from "@tanstack/react-router";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export function ProfileMenu() {
  const { userInfo } = useUserStore();
  const { handleLogout } = useLogout();
  const navigate = useNavigate();
  const getUserInitials = () => {
    if (!userInfo) return "U";
    return userInfo.selectEmployee?.text.at(0)  ; // کاربر
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 h-auto "
        >
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">پروفایل</span>
            {userInfo?.isSuperAdmin && (
              <span className="text-xs text-muted-foreground">ادمین</span>
            )}
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 ml-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">حساب کاربری</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo?.isSuperAdmin ? "مدیر سیستم" : "کاربر"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate({ to: "/dashboard" })}
          className="cursor-pointer"
        >
          <LayoutDashboard className="ml-2 h-4 w-4" />
          <span>داشبورد</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate({ to: "/" })}
          className="cursor-pointer"
        >
          <User className="ml-2 h-4 w-4" />
          <span>پروفایل</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate({ to: "/" })}
          className="cursor-pointer"
        >
          <Settings className="ml-2 h-4 w-4" />
          <span>تنظیمات کاربر</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="ml-2 h-4 w-4" />
          <span>خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
