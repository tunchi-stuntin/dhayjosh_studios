import type { Addon, Package } from '@prisma/client';
import { defaultAddons } from '@/content/addons';
import { defaultPackages } from '@/content/packages';

export const fallbackPackages: Package[] = defaultPackages.map((pkg, index) => ({
  id: `fallback-package-${index}`,
  name: pkg.name,
  description: pkg.description,
  hourlyRate: pkg.hourlyRate,
  minHours: pkg.minHours,
  createdAt: new Date(0),
})) as Package[];

export const fallbackAddons: Addon[] = defaultAddons.map((addon, index) => ({
  id: `fallback-addon-${index}`,
  name: addon.name,
  description: addon.description,
  price: addon.price,
  createdAt: new Date(0),
})) as Addon[];
