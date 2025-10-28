import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { bookingSchema } from '@/lib/schema';
import { calculateBookingTotal } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const json = await request.json();
    const payload = bookingSchema.parse(json);

    const [pkg, addons] = await Promise.all([
      prisma.package.findUnique({ where: { id: payload.packageId } }),
      prisma.addon.findMany({ where: { id: { in: payload.addons.map((addon) => addon.addonId) } } }),
    ]);

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const addonQuantities = payload.addons.reduce<Record<string, number>>((acc, addon) => {
      acc[addon.addonId] = addon.quantity;
      return acc;
    }, {});

    const amount = calculateBookingTotal({ pkg, hours: payload.hours, addons, addonQuantities });

    const user = await prisma.user.upsert({
      where: { email: payload.email },
      update: {
        name: payload.name,
        phone: payload.phone,
      },
      create: {
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
      },
    });

    const bookingDate = new Date(`${payload.date}T00:00:00`);
    const reference = `DHAY-${Date.now()}`;

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        packageId: pkg.id,
        date: bookingDate,
        startHour: payload.startHour,
        hours: payload.hours,
        amountNGN: amount,
        reference,
        addonItems: {
          create: payload.addons.map((addon) => ({ addonId: addon.addonId, qty: addon.quantity })),
        },
      },
    });

    return NextResponse.json({ bookingId: booking.id, reference: booking.reference, amount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
