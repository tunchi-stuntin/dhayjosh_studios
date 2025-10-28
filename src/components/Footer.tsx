import Link from 'next/link';

const socials = [
  { href: 'https://www.instagram.com/dhayjosh', label: 'Instagram' },
  { href: 'https://www.behance.net/dhayjosh', label: 'Behance' },
  { href: 'mailto:hello@dhayjosh.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 bg-white py-12 text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl leading-relaxed">
          © {new Date().getFullYear()} DhayJosh Photos. Crafted for creators who value refined spaces and seamless production support.
        </p>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <Link key={social.href} href={social.href} className="uppercase tracking-[0.3em] hover:text-neutral-900 dark:hover:text-white">
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
