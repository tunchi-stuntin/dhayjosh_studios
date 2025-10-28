import { startOfDay, endOfDay } from 'date-fns';
import { prisma } from './db';

export async function getOccupiedHours(date: Date) {
  if (!prisma) {
    return [];
  }

  const bookings = (await prisma.booking.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
      status: {
        in: ['PENDING', 'PAID'],
      },
    },
    select: {
      startHour: true,
      hours: true,
    },
  })) as Array<{ startHour: number; hours: number }>;

  const occupied = new Set<number>();
  bookings.forEach((booking) => {
    for (let i = 0; i < booking.hours; i += 1) {
      occupied.add(booking.startHour + i);
    }
  });

  return Array.from(occupied.values()).sort((a, b) => a - b);
}
