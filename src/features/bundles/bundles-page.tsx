"use client";

import { Calendar, Gift, Plus, Power } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { bundles } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function BundlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_55px_rgba(15,23,42,.06)] backdrop-blur-xl md:flex-row md:items-center">
        <div><h2 className="text-2xl font-black">Bundling Promotion Engine</h2><p className="text-sm text-slate-500">Fixed bundles, flexible bundles, Buy X Get Y validation, scheduling, and analytics.</p></div>
        <Button><Plus size={18} /> Create Bundle</Button>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {bundles.map((bundle) => (
          <Card key={bundle.id} className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
            <CardHeader className="flex flex-row items-start justify-between">
              <div><Gift className="text-primary" /><h3 className="mt-3 text-lg font-black">{bundle.name}</h3><p className="text-sm text-slate-500">{bundle.type.replace(/_/g, " ")}</p></div>
              <Badge tone={bundle.active ? "green" : "slate"}>{bundle.active ? "Active" : "Paused"}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Calendar size={16} /> {bundle.startsAt} to {bundle.endsAt}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/70 bg-blue-50/65 p-3"><p className="text-xs text-slate-500">Usage</p><p className="text-xl font-black">{bundle.usage}</p></div>
                <div className="rounded-2xl border border-white/70 bg-cyan-50/65 p-3"><p className="text-xs text-slate-500">Revenue</p><p className="text-xl font-black">{formatCurrency(bundle.revenue)}</p></div>
              </div>
              <div className="flex gap-2"><Button variant="secondary" className="flex-1"><Power size={18} /> Toggle</Button><Button className="flex-1">Edit</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
