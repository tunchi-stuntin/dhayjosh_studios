import { NextResponse } from 'next/server';
import { getOccupiedHours } from '@/lib/calendar';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');

  if (!dateParam) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }

  const date = new Date(dateParam);
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }

  const occupied = await getOccupiedHours(date);
  return NextResponse.json({ occupied });
}
