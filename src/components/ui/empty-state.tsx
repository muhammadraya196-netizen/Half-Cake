import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white/55 p-6 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
        <Icon size={22} />
      </div>
      <p className="mt-3 font-black text-slate-900">{title}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
    </div>
  );
}
