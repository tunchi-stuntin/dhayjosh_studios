import { NextResponse } from 'next/server';
import type { Addon, Booking, BookingAddon, Package, User } from '@prisma/client';
import { prisma } from '@/lib/db';
import { renderInvoiceHTML, sendInvoiceEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const { bookingId } = await request.json();
    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        package: true,
        addonItems: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const bookingWithRelations = booking as Booking & {
      user: User;
      package: Package;
      addonItems: BookingAddon[];
    };

    const bookingAddons = bookingWithRelations.addonItems;
    const addons = (await prisma.addon.findMany({
      where: {
        id: {
          in: bookingAddons.map((item) => item.addonId),
        },
      },
    })) as Addon[];

    const invoice = await prisma.invoice.upsert({
      where: { bookingId: bookingWithRelations.id },
      update: {
        totalNGN: bookingWithRelations.amountNGN,
        sentAt: new Date(),
      },
      create: {
        bookingId: bookingWithRelations.id,
        email: bookingWithRelations.user.email,
        totalNGN: bookingWithRelations.amountNGN,
        sentAt: new Date(),
      },
    });

    const html = renderInvoiceHTML({
      invoice,
      booking: bookingWithRelations,
      user: bookingWithRelations.user,
      pkg: bookingWithRelations.package,
      addons,
      bookingAddons,
    });

    await sendInvoiceEmail({
      to: bookingWithRelations.user.email,
      subject: 'DhayJosh Photos invoice',
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to send invoice' }, { status: 400 });
  }
}
