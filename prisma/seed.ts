import { PrismaClient } from '@prisma/client';
import { defaultPackages } from '../src/content/packages';
import { defaultAddons } from '../src/content/addons';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding packages and add-ons...');

  for (const pkg of defaultPackages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {
        description: pkg.description,
        hourlyRate: pkg.hourlyRate,
        minHours: pkg.minHours,
      },
      create: {
        name: pkg.name,
        description: pkg.description,
        hourlyRate: pkg.hourlyRate,
        minHours: pkg.minHours,
      },
    });
  }

  for (const addon of defaultAddons) {
    await prisma.addon.upsert({
      where: { name: addon.name },
      update: {
        description: addon.description,
        price: addon.price,
      },
      create: {
        name: addon.name,
        description: addon.description,
        price: addon.price,
      },
    });
  }

  console.log('✅ Seed complete');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
