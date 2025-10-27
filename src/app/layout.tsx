import { AppSidebar } from "@/features/app-sidebar/ui";
import { useUserData } from "@/features/auth/hooks/useUserData";
import DynamicBreadcrump from "@/features/dynamic-breadcrump";
import { ProfileMenu } from "@/features/profile";
import { useSetAuthentication } from "@/pages/login/hooks/useSetAuth";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { Separator } from "@radix-ui/react-select";
import React from "react";
import { Toaster } from "sonner";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetAuthentication();
  useUserData();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            {isMobile && <SidebarTrigger />}
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrump />
          </div>
          <ProfileMenu />
        </header>

        <div className="flex-1 p-6">{children}</div>

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};
