import { AppSidebar } from "@/features/app-sidebar";
import { useSetAuthentication } from "@/pages/login/hooks/useSetAuth";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetAuthentication();
  return (
    <SidebarProvider >
      <div className="min-h-screen bg-background">
   
          {/* <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center"></div>
          </header> */}
          <main className="flex-1 container py-6 mx-auto">{children}</main>
       
        <AppSidebar />

        <Toaster />
      </div>
    </SidebarProvider>
  );
};
