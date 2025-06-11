import { AppSidebar } from "@/features/app-sidebar/ui";
import { useSetAuthentication } from "@/pages/login/hooks/useSetAuth";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";
import { useUserData } from "@/features/auth/hooks/useUserData";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export  const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetAuthentication();
  useUserData();
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <div className="min-h-screen  ">
        {/* <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center"></div>
          </header> */}
        {isMobile && <SidebarTrigger />}
        <AppSidebar />
        <main className="flex-1 container   p-6 mx-auto">{children}</main>

        <Toaster />
      </div>
    </SidebarProvider>
  );
};


