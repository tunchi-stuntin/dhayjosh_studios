'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 py-24 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Lagos Studio</p>
          <h1 className="brand-h1 mt-6">A canvas for ambitious image makers.</h1>
          <p className="brand-lead mt-6">
            DhayJosh Photos offers a serene, fully-equipped studio with white-glove support, transparent pricing, and hourly rentals.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/studio"
              className="rounded-full border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
            >
              Explore Studio
            </Link>
            <Link
              href="/booking"
              className="rounded-full border border-neutral-200 bg-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-700 dark:border-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              View Availability
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative flex-1"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-subtle dark:border-neutral-800 dark:bg-neutral-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-neutral-500 dark:text-neutral-400">Amenities</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <li>• 180m² shooting space</li>
                  <li>• 6m cyclorama wall</li>
                  <li>• Styling lounge & glam room</li>
                  <li>• Dedicated client concierge</li>
                </ul>
              </div>
              <p className="text-right text-xs uppercase tracking-[0.5em] text-neutral-500 dark:text-neutral-400">
                Crafted for the decisive creative.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
