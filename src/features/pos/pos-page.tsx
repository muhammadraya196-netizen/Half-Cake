"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Barcode, CreditCard, Minus, Plus, Printer, QrCode, ReceiptText, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { bundles, categories, products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useCheckoutSummary, usePosStore } from "@/stores/pos-store";
import type { PaymentMethod } from "@/types/pos";
import { RealtimeStatus } from "@/components/ui/realtime-status";

const methods: PaymentMethod[] = ["QRIS", "Cash", "Debit", "Credit", "E-Wallet"];

export function PosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [paid, setPaid] = useState(false);
  const cart = usePosStore((state) => state.cart);
  const addItem = usePosStore((state) => state.addItem);
  const removeItem = usePosStore((state) => state.removeItem);
  const updateQuantity = usePosStore((state) => state.updateQuantity);
  const clearCart = usePosStore((state) => state.clearCart);
  const customer = usePosStore((state) => state.customer);
  const setCustomer = usePosStore((state) => state.setCustomer);
  const paymentMethod = usePosStore((state) => state.paymentMethod);
  const setPaymentMethod = usePosStore((state) => state.setPaymentMethod);
  const manualDiscount = usePosStore((state) => state.manualDiscount);
  const setManualDiscount = usePosStore((state) => state.setManualDiscount);
  const summary = useCheckoutSummary();

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = `${product.name} ${product.sku} ${product.barcode}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return product.active && matchesQuery && matchesCategory;
    });
  }, [category, query]);

  function completePayment() {
    if (!cart.length) return;
    setPaid(true);
    window.setTimeout(() => {
      clearCart();
      setPaid(false);
    }, 2200);
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[1fr_440px]">
      <section className="space-y-5">
        <Card className="overflow-hidden border-white/70 bg-white/70 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
          <div className="relative h-56">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80"
              alt="Ray Cake cafe counter"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-blue-950/45 to-cyan-700/20" />
            <div className="absolute left-6 top-6"><RealtimeStatus label="Register online" /></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-black tracking-normal">POS Kasir</h2>
              <p className="mt-2 max-w-xl text-sm font-medium text-white/85">Barcode scan, smart cart, automatic bundle promos, split-ready payments, and printable receipts.</p>
            </div>
          </div>
        </Card>

        <Card className="border-white/70 bg-white/78 shadow-[0_18px_50px_rgba(15,23,42,.06)] backdrop-blur-xl">
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <Input className="pl-10" placeholder="Search product, SKU, or scan barcode" value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
              <Button variant="secondary"><Barcode size={18} /> Scan Barcode</Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setCategory(item)}
                  whileHover={{ y: -2 }}
                  className={`h-10 shrink-0 rounded-xl px-4 text-sm font-bold transition ${category === item ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-blue-50"}`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => addItem(product)}
              className="overflow-hidden rounded-2xl border border-white/70 bg-white/82 text-left shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(37,99,235,.14)]"
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative h-44">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <div className="absolute left-3 top-3 flex gap-2">
                  {product.favorite && <Badge tone="amber">Favorite</Badge>}
                  {bundles.some((bundle) => bundle.productIds.includes(product.id)) && <Badge tone="blue">Bundle</Badge>}
                </div>
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-black">{product.name}</h3>
                  <Badge tone={product.stock <= product.lowStockAt ? "red" : "green"}>{product.stock}</Badge>
                </div>
                <p className="text-xs font-semibold text-slate-500">{product.sku} - {product.category}</p>
                <p className="text-lg font-black text-primary">{formatCurrency(product.price)}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <aside className="space-y-5 2xl:sticky 2xl:top-24 2xl:self-start">
        <Card className="border-white/70 bg-white/82 shadow-[0_26px_80px_rgba(15,23,42,.10)] backdrop-blur-xl">
          <CardHeader>
            <h2 className="text-lg font-black">Smart Cart</h2>
            <p className="text-sm text-slate-500">Pending order, refund, void, receipt preview, and payment calculation.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={customer} onChange={(event) => setCustomer(event.target.value)} placeholder="Customer name" />
            <div className="max-h-72 space-y-3 overflow-auto pr-1">
              {cart.length === 0 && <p className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-500">Cart is empty. Add products from the grid.</p>}
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 rounded-xl border border-slate-100 p-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{item.product.name}</p>
                    <p className="text-sm text-slate-500">{formatCurrency(item.product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                      <button className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus size={14} /></button>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-danger" onClick={() => removeItem(item.product.id)}><Trash2 size={18} /></button>
                </div>
              ))}
            </div>

            <motion.div layout className="space-y-3 rounded-2xl border border-white/70 bg-gradient-to-br from-slate-50 to-blue-50/60 p-4 shadow-inner">
              <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{formatCurrency(summary.subtotal)}</strong></div>
              <div className="flex justify-between text-sm"><span>Manual discount</span><input className="w-32 rounded-lg border border-slate-200 px-2 text-right" type="number" value={manualDiscount} onChange={(e) => setManualDiscount(Number(e.target.value))} /></div>
              {summary.bundlePromos.map((promo) => <div key={promo.bundleId} className="flex justify-between text-sm text-emerald-700"><span>{promo.name}</span><strong>-{formatCurrency(promo.discount)}</strong></div>)}
              <div className="flex justify-between text-sm"><span>Tax 11%</span><strong>{formatCurrency(summary.tax)}</strong></div>
              <motion.div key={summary.total} initial={{ scale: 0.98, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-between border-t border-slate-200 pt-3 text-xl font-black"><span>Total</span><span>{formatCurrency(summary.total)}</span></motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-2">
              {methods.map((method) => (
                <button key={method} onClick={() => setPaymentMethod(method)} className={`rounded-xl border px-3 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${paymentMethod === method ? "border-primary bg-blue-50 text-primary shadow-sm shadow-blue-100" : "border-slate-200 bg-white"}`}>
                  {method}
                </button>
              ))}
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <Button variant="secondary"><ReceiptText size={18} /> Hold</Button>
              <Button variant="secondary"><Printer size={18} /> Print</Button>
            </div>
            <Button className="h-12 w-full shadow-[0_18px_45px_rgba(37,99,235,.24)]" onClick={completePayment}><CreditCard size={18} /> Pay {formatCurrency(summary.total)}</Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-white/70 bg-white/82 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-black">QRIS Preview</h2>
            <QrCode size={20} />
          </CardHeader>
          <CardContent>
            <div className="mx-auto grid aspect-square max-w-64 place-items-center rounded-xl bg-white p-4 shadow-inner ring-1 ring-slate-200">
              <div className="grid h-full w-full grid-cols-5 gap-2">
                {Array.from({ length: 25 }).map((_, index) => <span key={index} className={index % 3 === 0 || index % 7 === 0 ? "rounded bg-slate-950" : "rounded bg-slate-100"} />)}
              </div>
            </div>
            {paid && <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 rounded-xl bg-emerald-50 p-3 text-center font-black text-emerald-700">Payment success. Receipt queued.</motion.p>}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
