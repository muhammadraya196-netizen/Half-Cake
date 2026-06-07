"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Boxes,
  Building2,
  CalendarCheck,
  CreditCard,
  Gift,
  Home,
  Menu,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Printer,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  WalletCards
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "./logout-button";
import { RealtimeStatus } from "@/components/ui/realtime-status";
import { PageTransition } from "@/components/ui/page-transition";

const nav = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/pos", label: "POS Kasir", icon: ShoppingCart },
  { href: "/products", label: "Produk", icon: Package },
  { href: "/categories", label: "Kategori", icon: Package },
  { href: "/inventory", label: "Inventory", icon: Boxes },
  { href: "/bundles", label: "Bundling Promo", icon: Gift },
  { href: "/orders", label: "Pesanan", icon: Receipt },
  { href: "/payments", label: "Payment", icon: CreditCard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/cashiers", label: "Cashier", icon: WalletCards },
  { href: "/outlets", label: "Outlet", icon: Building2 },
  { href: "/reports", label: "Laporan", icon: BarChart3 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/closing", label: "Closing Harian", icon: CalendarCheck },
  { href: "/printer", label: "Printer", icon: Printer },
  { href: "/settings", label: "Pengaturan", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/login") {
    return <div className="min-h-screen bg-slate-950 text-slate-950">{children}</div>;
  }

  const sidebar = (
    <>
      <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <Logo />}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="hidden h-10 w-10 place-items-center rounded-xl border border-white/70 bg-white/75 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-primary lg:grid"
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-white/80 hover:text-slate-950 hover:shadow-sm",
                active && "bg-white text-primary shadow-[0_14px_38px_rgba(37,99,235,.12)]",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              {active && (
                <motion.span
                  layoutId="active-sidebar"
                  className="absolute inset-y-2 left-0 w-1 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400"
                />
              )}
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-primary">
                <Icon size={18} />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/70 pt-4">
        {!collapsed && (
          <div className="mb-3 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">Outlet live</p>
            <p className="mt-1 text-sm font-black text-slate-900">Ray Cake Sudirman</p>
          </div>
        )}
        <LogoutButton compact={collapsed} />
      </div>
    </>
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f8ff] text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,.10),transparent_32%,rgba(6,182,212,.10)),linear-gradient(180deg,#f8fbff,#eef4ff)]" />
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:linear-gradient(rgba(15,23,42,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.06)_1px,transparent_1px)] [background-size:38px_38px]" />
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/70 bg-white/55 p-4 shadow-[18px_0_80px_rgba(15,23,42,.08)] backdrop-blur-2xl xl:flex",
          collapsed ? "w-24" : "w-72"
        )}
        animate={{ width: collapsed ? 96 : 288 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        {sidebar}
      </motion.aside>
      {mobileOpen && (
        <motion.div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.aside
            className="h-full w-80 max-w-[86vw] border-r border-white/70 bg-white/80 p-4 shadow-2xl backdrop-blur-2xl"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
          >
            {sidebar}
          </motion.aside>
        </motion.div>
      )}
      <main className={cn("relative transition-[padding] duration-300", collapsed ? "xl:pl-24" : "xl:pl-72")}>
        <header className="sticky top-0 z-30 border-b border-white/70 bg-white/60 px-4 py-3 shadow-sm shadow-slate-200/30 backdrop-blur-2xl md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 xl:hidden">
              <button className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-700 shadow-sm" onClick={() => setMobileOpen(true)}>
                <Menu size={20} />
              </button>
              <Logo />
            </div>
            <div className="hidden xl:block">
              <p className="text-sm text-slate-500">Ray Cake Sudirman</p>
              <h1 className="text-xl font-black tracking-normal">Commercial bakery operations</h1>
            </div>
            <div className="flex items-center gap-3">
              <RealtimeStatus label="Live" />
              <Badge tone="blue">Enterprise</Badge>
              <div className="text-right">
                <p className="text-sm font-bold">Owner Session</p>
                <p className="text-xs text-slate-500">Role: Owner</p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </div>
  );
}
