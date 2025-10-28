import Image from 'next/image';
import Link from 'next/link';

const LOGO_WIDTH = 32;
const LOGO_HEIGHT = 48;

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-sm uppercase tracking-[0.3em] ${className}`}>
      <span className="flex h-12 w-8 items-center justify-center">
        <Image
          src="/logo-black.png"
          alt="DhayJosh Photos logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority
          className="block h-full w-auto dark:hidden"
        />
        <Image
          src="/logo-white.png"
          alt="DhayJosh Photos logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority
          className="hidden h-full w-auto dark:block"
        />
      </span>
      <span className="font-medium text-neutral-900 dark:text-neutral-100">DhayJosh Photos</span>
    </Link>
  );
}
