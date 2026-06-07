"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicRoutes = ["/login"];
const TOKEN_KEY = "ray_pos_token";

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    setReady(false);

    if (publicRoutes.includes(pathname)) {
      setReady(true);
      return;
    }

    const fallback = window.setTimeout(() => {
      if (!active) return;

      const token = localStorage.getItem(TOKEN_KEY) || getCookie(TOKEN_KEY);
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        setReady(true);
        return;
      }

      document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
      window.location.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }, 2500);

    const token = localStorage.getItem(TOKEN_KEY) || getCookie(TOKEN_KEY);
    if (!token) {
      document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return () => {
        active = false;
        window.clearTimeout(fallback);
      };
    }

    localStorage.setItem(TOKEN_KEY, token);
    setReady(true);

    return () => {
      active = false;
      window.clearTimeout(fallback);
    };
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-semibold text-slate-500">
        Loading Ray Cake POS...
      </div>
    );
  }

  return <>{children}</>;
}
