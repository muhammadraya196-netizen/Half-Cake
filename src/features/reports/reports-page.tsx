"use client";

import { Download, Printer } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { revenueSeries } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function ReportsPage({ mode = "reports" }: { mode?: "reports" | "closing" | "printer" | "settings" | "simple" }) {
  if (mode === "closing") {
    return (
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl"><CardHeader><h2 className="text-lg font-black">Closing Harian</h2><p className="text-sm text-slate-500">Daily sales recap, cash reconciliation, approval workflow, and printable report.</p></CardHeader><CardContent className="space-y-4">{["Cash counted", "QRIS settled", "Debit batch", "Difference detection"].map((item, index) => <div key={item} className="flex justify-between rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm"><span className="font-bold">{item}</span><strong>{index === 3 ? "Rp0" : formatCurrency([1840000, 3920000, 2260000][index] || 0)}</strong></div>)}<Button className="w-full"><Printer size={18} /> Print Closing Report</Button></CardContent></Card>
        <Card className="border-emerald-100 bg-emerald-50/80 shadow-[0_24px_70px_rgba(16,185,129,.12)] backdrop-blur-xl"><CardHeader><h2 className="text-lg font-black">Approval</h2></CardHeader><CardContent><div className="rounded-2xl border border-emerald-100 bg-white/60 p-5"><p className="font-black text-emerald-700">Ready for owner approval</p><p className="mt-2 text-sm text-emerald-700">All payment channels reconciled with no cash difference.</p></div></CardContent></Card>
      </div>
    );
  }
  if (mode === "printer") {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Kitchen Printer", "Receipt Printer", "Bluetooth Printer", "USB Backup"].map((printer, index) => <Card key={printer} className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl"><CardContent><Printer className="text-primary" /><h3 className="mt-4 font-black">{printer}</h3><p className="text-sm text-slate-500">{["LAN 192.168.1.40", "WiFi online", "Paired", "Standby"][index]}</p><Button className="mt-4 w-full" variant="secondary">Test Print</Button></CardContent></Card>)}
      </div>
    );
  }
  if (mode === "settings") {
    return (
      <div className="grid gap-4 xl:grid-cols-3">
        {["Store Profile", "Tax Settings", "Receipt Settings", "Theme Settings", "User Management", "Role Permissions", "Payment Gateway", "Outlet Settings"].map((item) => <Card key={item} className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl"><CardContent><h3 className="font-black">{item}</h3><p className="mt-2 text-sm text-slate-500">Configure {item.toLowerCase()} for Ray Cake POS.</p><Button className="mt-4" variant="secondary">Open</Button></CardContent></Card>)}
      </div>
    );
  }
  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between"><div><h2 className="text-lg font-black">Reporting & Analytics</h2><p className="text-sm text-slate-500">Daily, weekly, monthly, product, bundle, cashier, outlet, inventory, and payment reports.</p></div><Button><Download size={18} /> Export</Button></CardHeader>
      <CardContent className="h-96"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="day" /><Tooltip formatter={(v) => formatCurrency(Number(v))} /><Area dataKey="revenue" stroke="#2563EB" fill="#dbeafe" strokeWidth={3} /></AreaChart></ResponsiveContainer></CardContent>
    </Card>
  );
}
