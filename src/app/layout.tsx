import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <header className="p-4 bg-gray-800 text-white">My App</header>
    <main className="p-4">{children}</main>
  </div>
);
