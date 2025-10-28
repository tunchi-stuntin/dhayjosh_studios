import { NextResponse } from 'next/server';
import type { Booking, User } from '@prisma/client';
import { prisma } from '@/lib/db';
import { initializeTransaction } from '@/lib/paystack';

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
      include: { user: true },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const bookingWithUser = booking as Booking & { user: User };

    const amountKobo = bookingWithUser.amountNGN * 100;
    const response = await initializeTransaction({
      email: bookingWithUser.user.email,
      amountKobo,
      reference: bookingWithUser.reference ?? `DHAY-${Date.now()}`,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success`,
      metadata: {
        bookingId: bookingWithUser.id,
        packageId: bookingWithUser.packageId,
      },
    });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to initialize transaction' }, { status: 400 });
  }
}
