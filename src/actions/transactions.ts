"use server";

import { z } from "zod";

const transactionSchema = z.object({
  customer: z.string().min(1),
  outletId: z.string().min(1),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })),
  paymentMethod: z.enum(["Cash", "QRIS", "Debit", "Credit", "E-Wallet"])
});

export async function createTransaction(input: unknown) {
  const parsed = transactionSchema.parse(input);
  return {
    invoice: `RC-${Date.now()}`,
    status: "Paid",
    audit: `Transaction created for ${parsed.customer}`
  };
}
