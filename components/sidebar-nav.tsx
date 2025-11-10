"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function SidebarNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // Read role from localStorage on client only
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  const navItems: NavItem[] =
    role === "athlete"
      ? [
          { label: "Dashboard", href: "/athlete/dashboard", icon: "📊" },
          { label: "Performance", href: "/athlete/performance", icon: "🏋️" },
          { label: "Injuries", href: "/athlete/injuries", icon: "🩹" },
          { label: "Nutrition", href: "/athlete/nutrition", icon: "🥗" },
          { label: "Profile", href: "/athlete/profile", icon: "👤" },
        ]
      : role === "coach"
      ? [
          { label: "Dashboard", href: "/coach/dashboard", icon: "📊" },
          { label: "Athletes", href: "/coach/athletes", icon: "👥" },
          { label: "Schedule", href: "/coach/schedule", icon: "📅" },
          { label: "Performance", href: "/coach/performance", icon: "📈" },
          { label: "Alerts", href: "/coach/alerts", icon: "🚨" },
        ]
      : role === "admin"
      ? [
          { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
          { label: "Users", href: "/admin/users", icon: "👥" },
          { label: "Teams", href: "/admin/teams", icon: "🏢" },
          { label: "Reports", href: "/admin/reports", icon: "📋" },
          { label: "Settings", href: "/admin/settings", icon: "⚙️" },
        ]
      : [];

  // Show nothing (or a loader) until role is loaded
  if (!role) return null;

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-40 flex flex-col transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary">
            Athlete Pro
          </h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${
                  isActive ? "sidebar-link-active" : "sidebar-link-inactive"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full gap-2"
            variant="outline"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
