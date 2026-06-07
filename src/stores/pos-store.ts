"use client";

import { create } from "zustand";
import { bundles } from "@/lib/data";
import { calculateCheckout } from "@/services/bundle-engine";
import type { CartItem, PaymentMethod, Product } from "@/types/pos";

type PosState = {
  cart: CartItem[];
  customer: string;
  paymentMethod: PaymentMethod;
  note: string;
  manualDiscount: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCustomer: (customer: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNote: (note: string) => void;
  setManualDiscount: (value: number) => void;
};

export const usePosStore = create<PosState>((set) => ({
  cart: [],
  customer: "Walk-in",
  paymentMethod: "QRIS",
  note: "",
  manualDiscount: 0,
  addItem: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item
          )
        };
      }
      return { cart: [...state.cart, { product, quantity: 1 }] };
    }),
  removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item.product.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) => (item.product.id === id ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) } : item))
        .filter((item) => item.quantity > 0)
    })),
  clearCart: () => set({ cart: [], customer: "Walk-in", note: "", manualDiscount: 0 }),
  setCustomer: (customer) => set({ customer }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setNote: (note) => set({ note }),
  setManualDiscount: (manualDiscount) => set({ manualDiscount })
}));

export function useCheckoutSummary() {
  const cart = usePosStore((state) => state.cart);
  const manualDiscount = usePosStore((state) => state.manualDiscount);
  return calculateCheckout(cart, bundles, manualDiscount);
}
