'use client';

import { Package } from '@prisma/client';
import { motion } from 'framer-motion';

export default function PriceCards({ packages }: { packages: Package[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex flex-col justify-between rounded-3xl border border-neutral-200 p-8 shadow-subtle dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="space-y-4">
            <h3 className="brand-h3">{pkg.name}</h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{pkg.description}</p>
          </div>
          <div className="mt-10 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Hourly</p>
              <p className="text-3xl font-semibold">₦{pkg.hourlyRate.toLocaleString()}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Min {pkg.minHours} hours</p>
            </div>
            <span className="rounded-full border border-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.3em] text-neutral-900 dark:border-neutral-100 dark:text-neutral-100">
              Signature
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
