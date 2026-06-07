"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CakeSlice, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const particles = [
  { left: "8%", top: "18%", delay: 0.1, size: "h-1.5 w-1.5" },
  { left: "18%", top: "72%", delay: 0.8, size: "h-1 w-1" },
  { left: "31%", top: "28%", delay: 1.3, size: "h-1.5 w-1.5" },
  { left: "62%", top: "15%", delay: 0.4, size: "h-1 w-1" },
  { left: "78%", top: "64%", delay: 1.7, size: "h-1.5 w-1.5" },
  { left: "89%", top: "34%", delay: 0.9, size: "h-1 w-1" },
  { left: "46%", top: "82%", delay: 2.1, size: "h-1.5 w-1.5" },
  { left: "70%", top: "46%", delay: 1.1, size: "h-1 w-1" }
];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = useMemo(() => searchParams.get("next") || "/", [searchParams]);
  const [email, setEmail] = useState("owner@raycake.test");
  const [password, setPassword] = useState("RayCake2026!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const hasToken = localStorage.getItem("ray_pos_token") || document.cookie.includes("ray_pos_token=");
    if (hasToken) {
      router.replace(nextUrl);
    }
  }, [nextUrl, router]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setError("");
    setLoading(true);

    window.setTimeout(() => {
      const token = `ray-pos-${Date.now()}`;
      localStorage.setItem("ray_pos_token", token);
      localStorage.setItem("ray_pos_user", JSON.stringify({ email, role: "Owner" }));
      sessionStorage.setItem("ray_pos_login_at", new Date().toISOString());
      document.cookie = `ray_pos_token=${token}; path=/; max-age=86400; SameSite=Lax`;

      router.replace(nextUrl);
      router.refresh();
    }, 650);
  }

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white md:px-8">
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(125deg,#020617_0%,#1e1b4b_28%,#1d4ed8_52%,#0891b2_74%,#020617_100%)] bg-[length:220%_220%]"
        animate={{ backgroundPosition: ["0% 50%", "100% 35%", "30% 100%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:42px_42px]" />
      <motion.div
        className="absolute -left-24 top-10 h-80 w-[34rem] rounded-[44%] bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, 80, 25, 0], y: [0, 35, 100, 0], rotate: [0, 8, -6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-28 bottom-8 h-80 w-[36rem] rounded-[48%] bg-violet-500/25 blur-3xl"
        animate={{ x: [0, -75, -15, 0], y: [0, -65, -20, 0], rotate: [0, -7, 9, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className={cn("absolute rounded-full bg-white/70 shadow-[0_0_22px_rgba(125,211,252,.9)]", particle.size)}
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25], scale: [1, 1.35, 1] }}
          transition={{ duration: 4.5, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_460px]">
        <motion.div
          className="hidden max-w-2xl lg:block"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-2xl backdrop-blur-xl">
            <Sparkles size={16} />
            Smart bakery management system
          </div>
          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-normal text-white">
            Welcome back to Ray Cake POS
          </h1>
          <p className="mt-5 max-w-lg text-base font-medium leading-7 text-blue-100/85">
            Operasikan kasir, inventory, payment tracking, dan analytics outlet dalam satu dashboard modern yang cepat dan rapi.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {["Realtime sales", "Outlet ready", "Secure access"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
                <p className="text-sm font-bold text-white">{item}</p>
                <p className="mt-1 text-xs font-medium text-cyan-100/75">Ray Cake POS</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-[1px] rounded-[1.75rem] bg-[linear-gradient(120deg,rgba(255,255,255,.45),rgba(34,211,238,.7),rgba(99,102,241,.75),rgba(255,255,255,.25))] opacity-80 blur-sm" />
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/20 bg-white/[0.12] p-6 shadow-[0_34px_100px_rgba(2,6,23,.45)] backdrop-blur-2xl md:p-8">
            <motion.div
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
              animate={{ x: ["-40%", "40%", "-40%"], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="mb-8 flex items-center gap-4">
              <motion.div
                className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 text-white shadow-[0_18px_45px_rgba(34,211,238,.35)]"
                whileHover={{ scale: 1.06, rotate: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <CakeSlice size={28} />
              </motion.div>
              <div>
                <p className="text-xl font-black text-white">Ray Cake POS</p>
                <p className="text-sm font-medium text-cyan-100/75">Smart bakery management system</p>
              </div>
            </div>

            <div className="mb-7">
              <h2 className="text-2xl font-black text-white md:text-3xl">Welcome back</h2>
              <p className="mt-2 text-sm font-medium text-blue-100/75">Masuk untuk membuka dashboard operasional.</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="mb-2 block text-sm font-bold text-blue-50">Email</label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-3.5 text-cyan-100/60 transition group-focus-within:text-cyan-200" size={18} />
                  <input
                    className="h-12 w-full rounded-xl border border-white/15 bg-slate-950/25 px-4 pl-11 text-sm font-semibold text-white outline-none transition placeholder:text-blue-100/35 focus:border-cyan-300/70 focus:bg-slate-950/35 focus:shadow-[0_0_0_4px_rgba(34,211,238,.14),0_0_34px_rgba(34,211,238,.18)]"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="owner@raycake.test"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-blue-50">Password</label>
                <div className="group relative">
                  <Lock className="absolute left-4 top-3.5 text-cyan-100/60 transition group-focus-within:text-cyan-200" size={18} />
                  <input
                    className="h-12 w-full rounded-xl border border-white/15 bg-slate-950/25 px-4 pl-11 pr-12 text-sm font-semibold text-white outline-none transition placeholder:text-blue-100/35 focus:border-cyan-300/70 focus:bg-slate-950/35 focus:shadow-[0_0_0_4px_rgba(34,211,238,.14),0_0_34px_rgba(34,211,238,.18)]"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-2.5 grid h-7 w-7 place-items-center rounded-lg text-cyan-100/65 transition hover:bg-white/10 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-xl border border-red-300/20 bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-100"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
                className="relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 text-sm font-black text-white shadow-[0_18px_48px_rgba(14,165,233,.35)] transition disabled:cursor-wait disabled:opacity-80"
              >
                <span className="absolute inset-0 bg-white/0 transition hover:bg-white/10" />
                <span className="relative inline-flex items-center justify-center gap-2">
                  {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                  {loading ? "Signing in..." : "Login"}
                </span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
