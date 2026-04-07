"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import {
  Clock,
  GitBranch,
  LayoutDashboard,
  LogIn,
  Plus,
  Settings,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, num: "01" },
  { href: "/create", label: "Create", icon: Plus, num: "02" },
  { href: "/history", label: "History", icon: Clock, num: "03" },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch, num: "04" },
  { href: "/settings", label: "Settings", icon: Settings, num: "05" },
];

export function AppSidebar({ isPreview = false }: { isPreview?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 flex-col border-r border-line bg-panel md:flex">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-line px-5">
        <BrandLogo href="/dashboard" />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {navItems.map((item) => {
          const active = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 border-b border-line px-5 py-4 transition-all ${
                active
                  ? "bg-[rgba(255,255,255,0.02)] text-foreground"
                  : "text-text-sub hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-primary" />
              )}
              <span className="font-mono text-[10px] text-muted-foreground">
                {item.num}
              </span>
              <item.icon className="size-4" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-line p-4">
        {isPreview ? (
          <Link
            href="/sign-up"
            className="flex items-center gap-2 text-sm text-text-sub transition-colors hover:text-primary"
          >
            <LogIn className="size-4" />
            <span>Sign Up</span>
          </Link>
        ) : (
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-8",
              },
            }}
          />
        )}
      </div>
    </aside>
  );
}
