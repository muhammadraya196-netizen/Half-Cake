"use client";

import Image from "next/image";
import { Download, FileSpreadsheet, MoreHorizontal, Plus, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_55px_rgba(15,23,42,.06)] backdrop-blur-xl md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-normal">Product Management</h2>
          <p className="text-sm text-slate-500">SKU, barcode, variants, availability, stock and bulk import/export.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary"><Upload size={18} /> Import Excel</Button>
          <Button variant="secondary"><Download size={18} /> Export</Button>
          <Button><Plus size={18} /> Add Product</Button>
        </div>
      </div>
      <Card className="border-white/70 bg-white/80 shadow-[0_24px_70px_rgba(15,23,42,.08)] backdrop-blur-xl">
        <CardHeader className="grid gap-3 md:grid-cols-[1fr_auto]">
          <Input placeholder="Search product, category, SKU, or barcode" />
          <Button variant="secondary"><FileSpreadsheet size={18} /> Bulk Action</Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="py-3">Product</th>
                <th>SKU</th>
                <th>Barcode</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-blue-50/45">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl"><Image src={product.image} alt={product.name} fill className="object-cover" /></div>
                      <div><p className="font-black">{product.name}</p><p className="text-xs text-slate-500">{product.variants?.join(", ") || "Standard"}</p></div>
                    </div>
                  </td>
                  <td className="font-semibold">{product.sku}</td>
                  <td>{product.barcode}</td>
                  <td>{product.category}</td>
                  <td className="font-bold">{formatCurrency(product.price)}</td>
                  <td><Badge tone={product.stock <= product.lowStockAt ? "red" : "green"}>{product.stock}</Badge></td>
                  <td><Badge tone={product.active ? "green" : "slate"}>{product.active ? "Available" : "Hidden"}</Badge></td>
                  <td><Button variant="ghost"><MoreHorizontal size={18} /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
