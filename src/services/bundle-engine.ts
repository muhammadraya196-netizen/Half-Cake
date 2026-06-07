import type { Bundle, CartItem } from "@/types/pos";

export type BundleResult = {
  bundleId: string;
  name: string;
  discount: number;
  message: string;
};

export function evaluateBundles(cart: CartItem[], bundles: Bundle[], today = new Date()) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const results: BundleResult[] = [];

  for (const bundle of bundles) {
    if (!bundle.active) continue;
    const startsAt = new Date(bundle.startsAt);
    const endsAt = new Date(bundle.endsAt);
    if (today < startsAt || today > endsAt) continue;

    const matchingItems = cart.filter((item) => bundle.productIds.includes(item.product.id));
    const matchingQuantity = matchingItems.reduce((sum, item) => sum + item.quantity, 0);
    const matchingTotal = matchingItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (bundle.type === "FIXED" && matchingItems.length === bundle.productIds.length && bundle.fixedPrice) {
      const discount = Math.max(0, matchingTotal - bundle.fixedPrice);
      if (discount > 0) {
        results.push({ bundleId: bundle.id, name: bundle.name, discount, message: `${bundle.name} applied` });
      }
    }

    if (bundle.type === "FLEXIBLE" && matchingItems.length >= 2 && bundle.discountPercent) {
      const discount = Math.round(matchingTotal * (bundle.discountPercent / 100));
      results.push({ bundleId: bundle.id, name: bundle.name, discount, message: `${bundle.discountPercent}% flexible bundle discount` });
    }

    if (bundle.type === "BUY_X_GET_Y" && bundle.buyQuantity && bundle.getQuantity && matchingQuantity >= bundle.buyQuantity + bundle.getQuantity) {
      const cheapest = [...matchingItems].sort((a, b) => a.product.price - b.product.price)[0];
      const sets = Math.floor(matchingQuantity / (bundle.buyQuantity + bundle.getQuantity));
      const discount = cheapest.product.price * bundle.getQuantity * sets;
      results.push({ bundleId: bundle.id, name: bundle.name, discount, message: `${bundle.name} reward item applied` });
    }
  }

  const bundleDiscount = results.reduce((sum, result) => sum + result.discount, 0);
  return {
    subtotal,
    bundleDiscount,
    results,
    taxableTotal: Math.max(0, subtotal - bundleDiscount)
  };
}

export function calculateCheckout(cart: CartItem[], bundles: Bundle[], manualDiscount = 0, taxRate = 0.11) {
  const bundle = evaluateBundles(cart, bundles);
  const discount = bundle.bundleDiscount + manualDiscount;
  const taxable = Math.max(0, bundle.subtotal - discount);
  const tax = Math.round(taxable * taxRate);
  const total = taxable + tax;

  return {
    subtotal: bundle.subtotal,
    bundlePromos: bundle.results,
    discount,
    tax,
    total
  };
}
