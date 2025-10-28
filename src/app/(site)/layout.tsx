import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import './globals.css';
import '../../styles/typography.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DhayJosh Photos — Elevated Studio Rentals in Lagos',
    template: '%s • DhayJosh Photos',
  },
  description:
    'Boutique studio rentals with premium amenities, real-time availability, and effortless booking powered by Paystack.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'DhayJosh Photos — Elevated Studio Rentals in Lagos',
    description:
      'Boutique studio rentals with premium amenities, real-time availability, and effortless booking powered by Paystack.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Minimal monochrome photography studio with lighting equipment',
      },
    ],
    locale: 'en_NG',
    siteName: 'DhayJosh Photos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DhayJosh Photos',
    description:
      'Minimal, luxurious studio rentals built for photographers and creators.',
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    ],
  },
};

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable}`} suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        {GA_MEASUREMENT_ID ? (
          <Script id="ga" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        ) : null}
        {GA_MEASUREMENT_ID ? (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        ) : null}
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
