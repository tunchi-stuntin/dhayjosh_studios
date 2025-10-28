'use client';

import { motion } from 'framer-motion';

export default function Testimonial() {
  return (
    <section className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <p className="text-2xl font-light leading-relaxed text-neutral-700 dark:text-neutral-200 md:text-3xl">
            “The DhayJosh studio is a dream — immaculate, well-equipped, and the concierge handled every detail so our crew could focus on the work.”
          </p>
          <footer className="text-sm uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
            T. Balogun — Fashion Director
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
