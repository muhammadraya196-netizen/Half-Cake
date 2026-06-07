export type Role = "Owner" | "Admin" | "Store Admin" | "Cashier";
export type PaymentMethod = "Cash" | "QRIS" | "Debit" | "Credit" | "E-Wallet";
export type OrderStatus = "Paid" | "Pending" | "Failed" | "Refunded" | "Cancelled";
export type BundleType = "FIXED" | "FLEXIBLE" | "BUY_X_GET_Y";

export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  image: string;
  price: number;
  cost: number;
  stock: number;
  lowStockAt: number;
  favorite?: boolean;
  active: boolean;
  variants?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  discount?: number;
};

export type Bundle = {
  id: string;
  name: string;
  type: BundleType;
  active: boolean;
  startsAt: string;
  endsAt: string;
  productIds: string[];
  buyQuantity?: number;
  getQuantity?: number;
  discountPercent?: number;
  fixedPrice?: number;
  usage: number;
  revenue: number;
};

export type Order = {
  id: string;
  invoice: string;
  cashier: string;
  customer: string;
  outlet: string;
  total: number;
  status: OrderStatus;
  method: PaymentMethod;
  createdAt: string;
};

export type PaymentLog = {
  id: string;
  invoice: string;
  method: PaymentMethod;
  status: OrderStatus;
  amount: number;
  receivedAt: string;
};

export type Outlet = {
  id: string;
  name: string;
  city: string;
  revenue: number;
  orders: number;
  activeCashiers: number;
};
