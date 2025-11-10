import type React from "react";
import { Navbar } from "@/components/navbar";

import { SidebarNav } from "@/components/sidebar-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Navbar />
      <SidebarNav />
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
