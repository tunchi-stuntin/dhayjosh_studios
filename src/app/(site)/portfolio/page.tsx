import LightboxGallery from '@/components/LightboxGallery';

const galleryImages = Array.from({ length: 9 }, (_, index) => ({
  id: `shot-${index + 1}`,
  src: `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/v1680000000/studio-${index + 1}.jpg`,
  alt: `DhayJosh Photos studio capture ${index + 1}`,
}));

export default function PortfolioPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-900 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Portfolio</p>
          <h1 className="brand-h1 mt-6">Scenes captured at DhayJosh</h1>
          <p className="brand-lead mt-4">
            From campaign shoots to editorial portraits, explore the versatility of our studio and lighting setups.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <LightboxGallery images={galleryImages} />
        </div>
      </section>
    </div>
  );
}
