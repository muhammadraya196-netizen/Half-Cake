"use client";

import { CheckCircle2, Clock, RadioTower, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { payments } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useRealtime } from "@/hooks/use-realtime";

export function PaymentsPage() {
  const { lastEvent } = useRealtime("payment");
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
        <CardHeader><h2 className="text-lg font-black">Realtime Payment Tracking</h2><p className="text-sm text-slate-500">QRIS status, split payment, failed monitoring, logs, and reconciliation.</p></CardHeader>
        <CardContent className="space-y-3">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center gap-3">
                {payment.status === "Paid" ? <CheckCircle2 className="text-success" /> : payment.status === "Pending" ? <Clock className="text-warning" /> : <XCircle className="text-danger" />}
                <div><p className="font-black">{payment.invoice}</p><p className="text-sm text-slate-500">{payment.method} at {payment.receivedAt}</p></div>
              </div>
              <div className="text-right"><p className="font-black">{formatCurrency(payment.amount)}</p><Badge tone={payment.status === "Paid" ? "green" : "amber"}>{payment.status}</Badge></div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
        <CardHeader className="flex flex-row items-center gap-2"><RadioTower className="text-primary" /><h2 className="text-lg font-black">Live Monitor</h2></CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-xl bg-blue-50 p-4 text-sm font-bold text-primary">{lastEvent}</div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Reconciliation difference</p><p className="text-2xl font-black">Rp0</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Failed payments today</p><p className="text-2xl font-black">1</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
