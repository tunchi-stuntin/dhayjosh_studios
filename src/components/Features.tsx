'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Transparent Pricing',
    description: 'Choose Full or Partial studio access with a clear hourly rate and curated add-ons.',
  },
  {
    title: 'Real-time Availability',
    description: 'Plan confidently with a live calendar synced to confirmed bookings and Paystack payments.',
  },
  {
    title: 'Premium Hospitality',
    description: 'Concierge support, vanity lounge, and production amenities curated for discerning teams.',
  },
];

export default function Features() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="space-y-4"
          >
            <h3 className="brand-h3">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
