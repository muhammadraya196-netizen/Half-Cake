"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type KPIStatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon: LucideIcon;
  tone?: "blue" | "cyan" | "green" | "amber" | "red" | "indigo";
  delay?: number;
};

const tones = {
  blue: "from-blue-500/18 to-sky-400/8 text-blue-600",
  cyan: "from-cyan-400/18 to-blue-400/8 text-cyan-600",
  green: "from-emerald-400/18 to-cyan-400/8 text-emerald-600",
  amber: "from-amber-400/18 to-orange-400/8 text-amber-600",
  red: "from-red-400/18 to-rose-400/8 text-red-600",
  indigo: "from-indigo-400/18 to-blue-500/8 text-indigo-600"
};

export function KPIStatCard({ label, value, helper, icon: Icon, tone = "blue", delay = 0 }: KPIStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/78 p-5 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl transition"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", tones[tone])} />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-black tracking-normal text-slate-950">{value}</p>
          {helper && <p className="mt-2 text-xs font-semibold text-slate-500">{helper}</p>}
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/70 bg-white/80 shadow-lg shadow-slate-200/70 transition group-hover:shadow-blue-200/70">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}
