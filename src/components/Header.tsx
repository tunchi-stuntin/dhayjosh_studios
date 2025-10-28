'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/studio', label: 'Studio' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-600 md:flex dark:text-neutral-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-neutral-900 dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/booking"
            className="hidden rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 md:inline-flex"
          >
            Book Now
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
