import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Booking Confirmed</p>
          <h1 className="brand-h1 mt-6">You&apos;re all set.</h1>
          <p className="brand-lead mt-4">
            Thank you for reserving the DhayJosh studio. An invoice and session details have been emailed to you. We&apos;ll be in
            touch to ensure every detail is perfect.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/portfolio"
              className="rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] transition hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
            >
              View Portfolio
            </Link>
            <Link
              href="/booking"
              className="rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Manage Booking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
