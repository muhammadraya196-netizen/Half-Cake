import { Building2, FolderTree, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const icons = { Customers: Users, Cashier: ShieldCheck, Outlet: Building2, Kategori: FolderTree };

export function SimpleAdminPage({ title }: { title: keyof typeof icons }) {
  const Icon = icons[title];
  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-primary"><Icon size={22} /></div>
          <div><h2 className="text-lg font-black">{title}</h2><p className="text-sm text-slate-500">Enterprise administration, role rules, outlet scope, and audit-ready activity.</p></div>
        </div>
        <Button>Add New</Button>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {["Ray Cake Sudirman", "Ray Cake Kemang", "Ray Cake Bandung"].map((name, index) => (
          <div key={name} className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <Badge tone={index === 0 ? "green" : "blue"}>{index === 0 ? "Primary" : "Active"}</Badge>
            <h3 className="mt-3 font-black">{title === "Customers" ? ["Ayu Lestari", "Bima Putra", "Dewi Anggraini"][index] : name}</h3>
            <p className="mt-1 text-sm text-slate-500">Synced with Ray Cake POS access rules.</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
