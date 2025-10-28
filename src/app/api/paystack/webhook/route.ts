import { NextResponse } from 'next/server';
import type { Addon, Booking, BookingAddon, Package, User } from '@prisma/client';
import { prisma } from '@/lib/db';
import { verifyPaystackSignature } from '@/lib/paystack';
import { renderInvoiceHTML, sendInvoiceEmail } from '@/lib/email';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-paystack-signature') ?? undefined;

  const isValid = await verifyPaystackSignature(signature, rawBody);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  if (event.event !== 'charge.success') {
    return NextResponse.json({ received: true });
  }

  const metadata = event.data?.metadata ?? {};
  const bookingId: string | undefined = metadata.bookingId;
  const reference: string = event.data?.reference;

  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking metadata' }, { status: 400 });
  }

  if (!prisma) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'PAID',
      reference,
    },
    include: {
      user: true,
      package: true,
      addonItems: true,
    },
  });

  const bookingWithRelations = booking as Booking & {
    user: User;
    package: Package;
    addonItems: BookingAddon[];
  };

  const invoice = await prisma.invoice.upsert({
    where: { bookingId: bookingWithRelations.id },
    update: {
      paid: true,
      sentAt: new Date(),
      totalNGN: bookingWithRelations.amountNGN,
    },
    create: {
      bookingId: bookingWithRelations.id,
      email: bookingWithRelations.user.email,
      totalNGN: bookingWithRelations.amountNGN,
      paid: true,
      sentAt: new Date(),
    },
  });

  const bookingAddons = bookingWithRelations.addonItems;
  const addons = (await prisma.addon.findMany({
    where: {
      id: {
        in: bookingAddons.map((item) => item.addonId),
      },
    },
  })) as Addon[];

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
    subject: 'Your DhayJosh Photos booking confirmation',
    html,
  });

  return NextResponse.json({ received: true });
}
