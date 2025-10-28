import Link from 'next/link';
import type { Addon, Package } from '@prisma/client';
import { prisma } from '@/lib/db';
import { fallbackAddons, fallbackPackages } from '@/lib/fallback-data';
import PriceCards from '@/components/PriceCards';

const faqs = [
  {
    question: 'What is included with the Full Studio package?',
    answer:
      'Full Studio grants exclusive access to the entire space including lounge, vanity, cyclorama, and all hospitality areas with a dedicated concierge.',
  },
  {
    question: 'Can we bring our own crew and equipment?',
    answer:
      'Absolutely. You may bring your team, or rent from our add-ons catalogue which includes lighting, cameras, props, and more.',
  },
  {
    question: 'Do you allow overtime?',
    answer:
      'Yes, subject to availability. Overtime is billed hourly at the same package rate and must be requested 30 minutes before your slot ends.',
  },
];

export default async function StudioPage() {
  let packages: Package[] = fallbackPackages;
  let addons: Addon[] = fallbackAddons;

  if (prisma) {
    const [dbPackages, dbAddons] = (await Promise.all([
      prisma.package.findMany({ orderBy: { hourlyRate: 'desc' } }),
      prisma.addon.findMany({ orderBy: { price: 'desc' } }),
    ])) as [Package[], Addon[]];

    packages = dbPackages.length ? dbPackages : fallbackPackages;
    addons = dbAddons.length ? dbAddons : fallbackAddons;
  }

  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">The Studio</p>
          <h1 className="brand-h1 mt-6 max-w-3xl">
            Tailored rentals for fashion, portrait, and commercial productions.
          </h1>
          <p className="brand-lead mt-6 max-w-2xl">
            Select your access level, layer on equipment, and preview totals instantly. Every booking includes concierge support, complimentary refreshments, and blackout options.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Reserve a slot
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-neutral-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] transition hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
            >
              Arrange a tour
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="brand-h2 mb-10">Packages</h2>
          <PriceCards packages={packages} />
        </div>
      </section>
      <section className="bg-neutral-50 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="brand-h2 mb-10">Add-ons</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {addons.map((addon) => (
              <div key={addon.id} className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{addon.name}</h3>
                  <span className="text-sm uppercase tracking-[0.3em]">₦{addon.price.toLocaleString()}</span>
                </div>
                {addon.description ? (
                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{addon.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="brand-h2 mb-10">FAQs</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800">
                <summary className="cursor-pointer text-sm uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-300">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
