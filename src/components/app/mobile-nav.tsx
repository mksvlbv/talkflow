"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { UserButton } from "@clerk/nextjs";
import {
  Clock,
  GitBranch,
  LayoutDashboard,
  LogIn,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/create", label: "Create", icon: Plus },
  { href: "/history", label: "History", icon: Clock },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav({ isPreview = false }: { isPreview?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between border-b border-line bg-panel px-4">
        <BrandLogo href="/dashboard" />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex size-10 items-center justify-center"
          aria-label="Toggle navigation"
        >
          {open ? (
            <X className="size-5 text-text-sub" />
          ) : (
            <Menu className="size-5 text-text-sub" />
          )}
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <nav className="border-b border-line bg-panel px-4 py-3">
          {navItems.map((item) => {
            const active = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 text-sm transition-colors ${
                  active ? "text-primary" : "text-text-sub hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 border-t border-line px-3 pt-3">
            {isPreview ? (
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 text-sm text-text-sub transition-colors hover:text-primary"
              >
                <LogIn className="size-4" />
                Sign Up
              </Link>
            ) : (
              <UserButton
                appearance={{ elements: { avatarBox: "size-7" } }}
              />
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
