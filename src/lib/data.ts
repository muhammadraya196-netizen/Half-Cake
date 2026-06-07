import type { Bundle, Order, Outlet, PaymentLog, Product } from "@/types/pos";

export const categories = ["All", "Cake", "Coffee", "Pastry", "Dessert", "Bread", "Bundle"];

export const products: Product[] = [
  {
    id: "p1",
    name: "Ray Signature Chocolate Cake",
    sku: "RAY-CAK-001",
    barcode: "899700100001",
    category: "Cake",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    price: 185000,
    cost: 92000,
    stock: 18,
    lowStockAt: 8,
    favorite: true,
    active: true,
    variants: ["Slice", "Whole"]
  },
  {
    id: "p2",
    name: "Strawberry Chantilly Slice",
    sku: "RAY-CAK-014",
    barcode: "899700100014",
    category: "Cake",
    image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?auto=format&fit=crop&w=900&q=80",
    price: 42000,
    cost: 19000,
    stock: 34,
    lowStockAt: 12,
    favorite: true,
    active: true
  },
  {
    id: "p3",
    name: "Butter Croissant",
    sku: "RAY-PAS-021",
    barcode: "899700100021",
    category: "Pastry",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    price: 28000,
    cost: 11000,
    stock: 42,
    lowStockAt: 15,
    active: true
  },
  {
    id: "p4",
    name: "Iced Latte",
    sku: "RAY-COF-007",
    barcode: "899700100007",
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    price: 36000,
    cost: 12000,
    stock: 86,
    lowStockAt: 25,
    favorite: true,
    active: true
  },
  {
    id: "p5",
    name: "Pandan Klepon Cake",
    sku: "RAY-CAK-033",
    barcode: "899700100033",
    category: "Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    price: 155000,
    cost: 76000,
    stock: 7,
    lowStockAt: 8,
    active: true
  },
  {
    id: "p6",
    name: "Macaron Gift Box",
    sku: "RAY-DES-018",
    barcode: "899700100018",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=900&q=80",
    price: 98000,
    cost: 42000,
    stock: 23,
    lowStockAt: 10,
    active: true
  },
  {
    id: "p7",
    name: "Cinnamon Roll",
    sku: "RAY-BRD-005",
    barcode: "899700100005",
    category: "Bread",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=80",
    price: 32000,
    cost: 13000,
    stock: 28,
    lowStockAt: 12,
    active: true
  },
  {
    id: "p8",
    name: "Sweet Couple Package",
    sku: "RAY-BUN-002",
    barcode: "899700100102",
    category: "Bundle",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
    price: 120000,
    cost: 54000,
    stock: 20,
    lowStockAt: 8,
    active: true
  }
];

export const bundles: Bundle[] = [
  {
    id: "b1",
    name: "Coffee + Cake Combo",
    type: "FIXED",
    active: true,
    startsAt: "2026-06-01",
    endsAt: "2026-07-31",
    productIds: ["p2", "p4"],
    fixedPrice: 69000,
    usage: 128,
    revenue: 8832000
  },
  {
    id: "b2",
    name: "Buy 2 Get 1 Pastry",
    type: "BUY_X_GET_Y",
    active: true,
    startsAt: "2026-06-01",
    endsAt: "2026-06-30",
    productIds: ["p3", "p7"],
    buyQuantity: 2,
    getQuantity: 1,
    discountPercent: 100,
    usage: 74,
    revenue: 6216000
  },
  {
    id: "b3",
    name: "Family Box Bundle",
    type: "FLEXIBLE",
    active: true,
    startsAt: "2026-06-05",
    endsAt: "2026-08-05",
    productIds: ["p1", "p5", "p6"],
    discountPercent: 12,
    usage: 41,
    revenue: 12950000
  }
];

export const orders: Order[] = [
  { id: "o1", invoice: "RC-260606-1001", cashier: "Nadia", customer: "Ayu Lestari", outlet: "Ray Cake Sudirman", total: 211000, status: "Paid", method: "QRIS", createdAt: "2026-06-06 10:12" },
  { id: "o2", invoice: "RC-260606-1002", cashier: "Rafi", customer: "Walk-in", outlet: "Ray Cake Kemang", total: 72000, status: "Pending", method: "E-Wallet", createdAt: "2026-06-06 10:33" },
  { id: "o3", invoice: "RC-260606-1003", cashier: "Nadia", customer: "Bima Putra", outlet: "Ray Cake Sudirman", total: 348000, status: "Paid", method: "Debit", createdAt: "2026-06-06 11:05" },
  { id: "o4", invoice: "RC-260606-1004", cashier: "Sari", customer: "Dewi", outlet: "Ray Cake Bandung", total: 126000, status: "Refunded", method: "Cash", createdAt: "2026-06-06 11:42" }
];

export const payments: PaymentLog[] = [
  { id: "pay1", invoice: "RC-260606-1001", method: "QRIS", status: "Paid", amount: 211000, receivedAt: "10:12:45" },
  { id: "pay2", invoice: "RC-260606-1002", method: "E-Wallet", status: "Pending", amount: 72000, receivedAt: "10:33:12" },
  { id: "pay3", invoice: "RC-260606-1003", method: "Debit", status: "Paid", amount: 348000, receivedAt: "11:05:27" }
];

export const outlets: Outlet[] = [
  { id: "out1", name: "Ray Cake Sudirman", city: "Jakarta", revenue: 24870000, orders: 184, activeCashiers: 3 },
  { id: "out2", name: "Ray Cake Kemang", city: "Jakarta", revenue: 17240000, orders: 137, activeCashiers: 2 },
  { id: "out3", name: "Ray Cake Bandung", city: "Bandung", revenue: 12980000, orders: 96, activeCashiers: 2 }
];

export const revenueSeries = [
  { day: "Mon", revenue: 6800000, orders: 82 },
  { day: "Tue", revenue: 7200000, orders: 91 },
  { day: "Wed", revenue: 9100000, orders: 108 },
  { day: "Thu", revenue: 8700000, orders: 102 },
  { day: "Fri", revenue: 11800000, orders: 141 },
  { day: "Sat", revenue: 15400000, orders: 186 }
];

export const paymentMix = [
  { name: "QRIS", value: 42 },
  { name: "Debit", value: 24 },
  { name: "Cash", value: 18 },
  { name: "E-Wallet", value: 16 }
];
