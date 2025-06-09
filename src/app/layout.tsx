import { AppSidebar } from "@/features/app-sidebar/ui";
import { useSetAuthentication } from "@/pages/login/hooks/useSetAuth";
import { SidebarProvider } from "@/shared/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";
import { useUserData } from "@/features/auth/hooks/useUserData";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetAuthentication();
  useUserData(); 

  return (
    <SidebarProvider>
      <div className="min-h-screen ">
        {/* <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center"></div>
          </header> */}
        <main className="flex-1 container p-6 mx-auto">{children}</main>
        <AppSidebar />
        <Toaster />
      </div>
    </SidebarProvider>
  );
};
