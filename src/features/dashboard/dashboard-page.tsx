"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Activity, AlertTriangle, Clock, Receipt, Users, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard } from "@/components/ui/chart-card";
import { KPIStatCard } from "@/components/ui/kpi-stat-card";
import { RealtimeStatus } from "@/components/ui/realtime-status";
import { bundles, orders, outlets, paymentMix, products, revenueSeries } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useRealtime } from "@/hooks/use-realtime";

const colors = ["#2563EB", "#10B981", "#F59E0B", "#EF4444"];

export function DashboardPage() {
  const { connected, lastEvent } = useRealtime("transaction");
  const todayRevenue = orders.reduce((sum, order) => (order.status === "Paid" ? sum + order.total : sum), 0);
  const lowStock = products.filter((product) => product.stock <= product.lowStockAt);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3"><RealtimeStatus label="Realtime dashboard" /></div>
          <h2 className="text-3xl font-black tracking-normal text-slate-950 md:text-4xl">Ray Cake Command Center</h2>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Pantau revenue, transaksi, stok, promo bundle, dan performa outlet dalam satu workspace premium.
          </p>
        </div>
        <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-wide text-slate-400">Realtime revenue ticker</p>
          <motion.p
            key={todayRevenue}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-black text-primary"
          >
            {formatCurrency(todayRevenue)}
          </motion.p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {[
          { label: "Total Revenue Today", value: formatCurrency(todayRevenue), helper: "+18.4% vs yesterday", icon: Wallet, tone: "blue" as const },
          { label: "Total Orders", value: formatNumber(orders.length), helper: "Across 3 outlets", icon: Receipt, tone: "green" as const },
          { label: "Active Cashier", value: "7", helper: "All registers online", icon: Users, tone: "cyan" as const },
          { label: "Peak Transaction Hour", value: "11:00 - 13:00", helper: "Lunch service window", icon: Clock, tone: "amber" as const }
        ].map((item, index) => <KPIStatCard key={item.label} {...item} delay={index * 0.06} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <ChartCard title="Revenue Analytics" description="Daily sales, order volume, and realtime register movement" badge={connected ? "Socket connected" : "Offline sync"}>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area dataKey="revenue" stroke="#2563EB" fill="url(#revenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Payment Analytics" description="QRIS, cash, debit, credit, and e-wallet mix">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentMix} dataKey="value" nameKey="name" outerRadius={105} innerRadius={62}>
                  {paymentMix.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Outlet Performance" description="Comparison by city and branch">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outlets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="city" />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <Card className="border-white/70 bg-white/78 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
          <CardHeader><h2 className="text-lg font-black">Bundle Promo Analytics</h2></CardHeader>
          <CardContent className="space-y-4">
            {bundles.map((bundle) => (
              <motion.div key={bundle.id} whileHover={{ x: 4 }} className="flex items-center justify-between rounded-2xl border border-white/70 bg-gradient-to-r from-white to-blue-50/50 p-3 shadow-sm">
                <div>
                  <p className="font-bold">{bundle.name}</p>
                  <p className="text-sm text-slate-500">{bundle.usage} redemptions</p>
                </div>
                <p className="font-black">{formatCurrency(bundle.revenue)}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-amber-100/80 bg-white/78 shadow-[0_24px_70px_rgba(245,158,11,.10)] backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertTriangle className="text-warning" size={20} />
            <h2 className="text-lg font-black">Low Stock Alerts</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStock.map((product) => (
              <motion.div key={product.id} whileHover={{ scale: 1.015 }} className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50/80 p-3 shadow-[0_12px_32px_rgba(245,158,11,.12)]">
                <div>
                  <p className="font-bold">{product.name}</p>
                  <p className="text-sm text-amber-700">Threshold {product.lowStockAt}</p>
                </div>
                <Badge tone="amber">{product.stock} left</Badge>
              </motion.div>
            ))}
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Activity size={16} />
                {lastEvent}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
