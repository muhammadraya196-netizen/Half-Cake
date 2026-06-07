import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const ownerRole = await prisma.role.upsert({
    where: { name: RoleName.OWNER },
    update: {},
    create: { name: RoleName.OWNER }
  });

  const outlet = await prisma.outlet.upsert({
    where: { id: "out_ray_sudirman" },
    update: {},
    create: {
      id: "out_ray_sudirman",
      name: "Ray Cake Sudirman",
      city: "Jakarta",
      address: "Jl. Jenderal Sudirman No. 18, Jakarta"
    }
  });

  await prisma.user.upsert({
    where: { email: "owner@raycake.test" },
    update: {},
    create: {
      name: "Ray Cake Owner",
      email: "owner@raycake.test",
      passwordHash: await bcrypt.hash("RayCake2026!", 10),
      roleId: ownerRole.id,
      outletId: outlet.id
    }
  });

  const cake = await prisma.category.upsert({
    where: { name: "Cake" },
    update: {},
    create: { name: "Cake" }
  });

  const product = await prisma.product.upsert({
    where: { sku: "RAY-CAK-001" },
    update: {},
    create: {
      name: "Ray Signature Chocolate Cake",
      sku: "RAY-CAK-001",
      barcode: "899700100001",
      imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      price: 185000,
      cost: 92000,
      categoryId: cake.id
    }
  });

  await prisma.inventory.upsert({
    where: { productId_outletId: { productId: product.id, outletId: outlet.id } },
    update: { stock: 18 },
    create: { productId: product.id, outletId: outlet.id, stock: 18, lowStockAt: 8 }
  });

  await prisma.setting.upsert({
    where: { key: "tax.rate" },
    update: { value: 0.11 },
    create: { key: "tax.rate", value: 0.11 }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
