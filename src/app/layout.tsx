import { useSetAuthentication } from "@/pages/login/hooks/useSetAuth";
import React from "react";
import { Toaster } from "sonner";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useSetAuthentication();
  return (
    <div className="min-h-screen">
      <header className="p-4 bg-gray-800 text-white">My App</header>
      <main className="p-4">{children}</main>
      <Toaster />
    </div>
  );
};
