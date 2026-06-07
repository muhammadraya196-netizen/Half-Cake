import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-cyan-500/25",
        variant === "secondary" && "bg-white/75 text-slate-900 ring-1 ring-slate-200 backdrop-blur hover:bg-white",
        variant === "ghost" && "bg-transparent text-slate-700 hover:bg-slate-100",
        variant === "danger" && "bg-danger text-white hover:bg-red-600",
        className
      )}
      {...props}
    />
  );
}
