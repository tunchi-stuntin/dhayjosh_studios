import { Addon, Package } from '@prisma/client';

export type BookingCalculationInput = {
  pkg: Package | undefined;
  hours: number;
  addons: Addon[];
  addonQuantities: Record<string, number>;
};

export function calculateBookingTotal({ pkg, hours, addons, addonQuantities }: BookingCalculationInput) {
  if (!pkg) return 0;
  const base = pkg.hourlyRate * Math.max(hours, pkg.minHours);
  const addonTotal = addons.reduce((sum, addon) => {
    const qty = addonQuantities[addon.id] || 0;
    return sum + addon.price * qty;
  }, 0);
  return base + addonTotal;
}

export function summarizeAddons(addons: Addon[], addonQuantities: Record<string, number>) {
  return addons
    .filter((addon) => (addonQuantities[addon.id] || 0) > 0)
    .map((addon) => ({ addonId: addon.id, quantity: addonQuantities[addon.id], price: addon.price }));
}
