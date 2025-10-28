import type { Addon, Package } from '@prisma/client';
import { prisma } from '@/lib/db';
import { fallbackAddons, fallbackPackages } from '@/lib/fallback-data';
import BookingClient from './BookingClient';

export default async function BookingPage() {
  let packages: Package[] = fallbackPackages;
  let addons: Addon[] = fallbackAddons;

  if (prisma) {
    const [dbPackages, dbAddons] = (await Promise.all([
      prisma.package.findMany({ orderBy: { hourlyRate: 'desc' } }),
      prisma.addon.findMany({ orderBy: { price: 'desc' } }),
    ])) as [Package[], Addon[]];

    packages = dbPackages.length ? dbPackages : fallbackPackages;
    addons = dbAddons.length ? dbAddons : fallbackAddons;
  }

  return <BookingClient packages={packages} addons={addons} />;
}
