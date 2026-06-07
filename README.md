# Ray Cake POS System

Enterprise-grade Next.js 14 POS SaaS scaffold for bakery, cake shop, and restaurant operations.

## Features

- Premium Ray Cake POS shell with responsive sidebar navigation
- Realtime-ready analytics dashboard with Recharts
- Interactive POS cashier workflow with product search, barcode field, cart, tax, payment methods, QRIS preview, receipt actions, and bundle promotion calculation
- Product, inventory, bundle promo, order, payment, reporting, closing harian, printer, outlet, cashier, customer, category, and settings modules
- Prisma PostgreSQL schema for users, roles, permissions, outlets, products, inventory, transactions, transaction items, payments, bundles, bundle items, customers, stock logs, activity logs, printers, and settings
- NextAuth credentials scaffold with password hashing and RBAC-ready session role
- PWA manifest and offline service worker

## Run

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:seed
npm run dev
```

Seeded owner account:

- Email: `owner@raycake.test`
- Password: `RayCake2026!`
