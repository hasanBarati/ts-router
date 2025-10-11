import { AppSidebar } from "@/features/app-sidebar/ui";
import { useSetAuthentication } from "@/pages/login/hooks/useSetAuth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";
import { useUserData } from "@/features/auth/hooks/useUserData";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetAuthentication();
  useUserData();
  const isMobile = useIsMobile();
  return (
    <SidebarProvider defaultOpen={false}>
      {isMobile && <SidebarTrigger />}
      <AppSidebar />

      <SidebarInset>
        {/* <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background">
          <SidebarTrigger />
          <div className="flex-1" />
        </header> */}
        <main className="flex-1 p-6">{children}</main>

        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};
