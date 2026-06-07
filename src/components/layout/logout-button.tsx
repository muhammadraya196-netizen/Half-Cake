"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("ray_pos_token");
    localStorage.removeItem("ray_pos_user");
    sessionStorage.clear();
    document.cookie = "ray_pos_token=; path=/; max-age=0; SameSite=Lax";
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/90 px-3 py-2.5 text-sm font-bold text-red-600 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-100 hover:text-red-700 hover:shadow-red-100"
      title="Logout"
    >
      <LogOut size={18} />
      {!compact && "Logout"}
    </button>
  );
}
