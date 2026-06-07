"use client";

import { AlertTriangle, ArrowDownToLine, ArrowUpFromLine, PackageCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function InventoryPage() {
  const valuation = products.reduce((sum, product) => sum + product.cost * product.stock, 0);
  const lowStock = products.filter((product) => product.stock <= product.lowStockAt);
  const chartData = products.map((product) => ({ name: product.name.split(" ").slice(0, 2).join(" "), stock: product.stock }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/70 bg-white/80 backdrop-blur-xl"><CardContent><PackageCheck className="text-primary" /><p className="mt-3 text-sm text-slate-500">Stock valuation</p><p className="text-2xl font-black">{formatCurrency(valuation)}</p></CardContent></Card>
        <Card className="border-amber-100 bg-amber-50/70 shadow-[0_18px_48px_rgba(245,158,11,.12)] backdrop-blur-xl"><CardContent><AlertTriangle className="text-warning" /><p className="mt-3 text-sm text-slate-500">Low stock SKU</p><p className="text-2xl font-black">{lowStock.length}</p></CardContent></Card>
        <Card className="border-white/70 bg-white/80 backdrop-blur-xl"><CardContent><ArrowDownToLine className="text-success" /><p className="mt-3 text-sm text-slate-500">Today stock movement</p><p className="text-2xl font-black">146 units</p></CardContent></Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><h2 className="text-lg font-black">Stock Analytics</h2><p className="text-sm text-slate-500">Realtime stock deduction and ingredient tracking.</p></div>
            <div className="flex gap-2"><Button variant="secondary"><ArrowUpFromLine size={18} /> Stock In</Button><Button variant="secondary"><ArrowDownToLine size={18} /> Stock Out</Button></div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="name" /><Tooltip /><Bar dataKey="stock" fill="#2563EB" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
          <CardHeader><h2 className="text-lg font-black">Stock Movement Timeline</h2></CardHeader>
          <CardContent className="space-y-3">
            {["QRIS sale deducted 2 Strawberry Slice", "Supplier ABC added 24 Butter Croissant", "Expired warning: 7 Pandan Klepon Cake", "Manual adjustment by Store Admin"].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm"><Badge tone={index === 2 ? "red" : "blue"}>{index === 2 ? "Warning" : "Synced"}</Badge><p className="mt-2 font-semibold">{item}</p></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
