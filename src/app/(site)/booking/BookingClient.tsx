'use client';

import { useState } from 'react';
import type { Addon, Package } from '@prisma/client';
import Calendar from '@/components/Calendar';
import BookingForm from '@/components/BookingForm';
import ChatWidget from '@/components/ChatWidget';

function startOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export default function BookingClient({ packages, addons }: { packages: Package[]; addons: Addon[] }) {
  const [date, setDate] = useState(startOfToday());
  const [hour, setHour] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-900 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Booking</p>
          <h1 className="brand-h1 mt-6">Plan your session</h1>
          <p className="brand-lead mt-4">
            Reserve your desired slot with live availability, custom add-ons, and secure Paystack checkout.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr]">
          <Calendar date={date} onDateChange={setDate} selectedHour={hour} onHourSelect={setHour} />
          <BookingForm
            packages={packages}
            addons={addons}
            date={date}
            hour={hour}
            onPackageChange={() => {}}
            onHoursChange={() => {}}
            onSubmitSuccess={() => {}}
          />
        </div>
      </section>
      <ChatWidget />
    </div>
  );
}
