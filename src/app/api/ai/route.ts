import { NextResponse } from 'next/server';
import { aiSchema } from '@/lib/schema';

const rasaUrl = process.env.RASA_URL;

const fallbackFaq: { match: RegExp; response: string }[] = [
  {
    match: /rate|price|cost/i,
    response:
      'We offer two packages: Full Studio at ₦90,000/hr (min 2 hours) with full-floor access, and Partial Studio at ₦55,000/hr for agile teams. Add-ons like lighting kits and camera bodies are available à la carte.',
  },
  {
    match: /hour|time|availability/i,
    response:
      'The studio is bookable in hourly blocks from 6am–10pm. Check the booking calendar for live availability and select your preferred start time.',
  },
  {
    match: /included|amenities|what do i get/i,
    response:
      'Each booking includes concierge support, vanity lounge, lounge seating, complimentary refreshments, Wi-Fi, and blackout capability. Full Studio adds private client areas.',
  },
  {
    match: /book|reserve/i,
    response:
      'Head to the Booking page, choose your date and start time, select a package, and proceed with Paystack checkout to confirm your reservation instantly.',
  },
  {
    match: /reschedule|cancel|refund/i,
    response:
      'We allow rescheduling up to 48 hours before your session. Cancellations within 48 hours incur a 50% fee. Email studio@dhayjosh.com for assistance.',
  },
];

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = aiSchema.parse(json);

    if (rasaUrl) {
      const response = await fetch(`${rasaUrl}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: 'guest', message: payload.message, metadata: payload.context }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data?.[0]?.text ?? 'I will follow up shortly with that information.';
        return NextResponse.json({ reply });
      }
    }

    const rule = fallbackFaq.find((item) => item.match.test(payload.message));
    const reply =
      rule?.response ||
      'Thanks for reaching out. Our concierge can help with packages, availability, and equipment — email studio@dhayjosh.com for a detailed reply.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ reply: 'I could not understand that just now. Please try again or email studio@dhayjosh.com.' });
  }
}
