"use client";

import { Download, FileText, RotateCcw, Search, ShieldX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { orders } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function OrdersPage() {
  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
      <CardHeader className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div><h2 className="text-lg font-black">Order Management</h2><p className="text-sm text-slate-500">Invoice detail, refunds, voids, status filtering, and export.</p></div>
        <div className="flex flex-wrap gap-2"><Button variant="secondary"><Download size={18} /> Export PDF</Button><Button variant="secondary"><FileText size={18} /> Export Excel</Button></div>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4"><Search className="absolute left-3 top-2.5 text-slate-400" size={18} /><Input className="pl-10" placeholder="Search invoice, customer, cashier, or outlet" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead className="text-left text-xs uppercase text-slate-500"><tr><th className="py-3">Invoice</th><th>Customer</th><th>Cashier</th><th>Outlet</th><th>Payment</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-blue-50/45">
                  <td className="py-4 font-black">{order.invoice}<p className="text-xs font-medium text-slate-500">{order.createdAt}</p></td>
                  <td>{order.customer}</td><td>{order.cashier}</td><td>{order.outlet}</td><td>{order.method}</td><td className="font-bold">{formatCurrency(order.total)}</td>
                  <td><Badge tone={order.status === "Paid" ? "green" : order.status === "Refunded" ? "amber" : "red"}>{order.status}</Badge></td>
                  <td><div className="flex gap-2"><Button variant="secondary"><RotateCcw size={16} /> Refund</Button><Button variant="danger"><ShieldX size={16} /> Void</Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
