'use client';

import Image from 'next/image';
import { useState } from 'react';

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export default function LightboxGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((image) => (
          <button
            type="button"
            key={image.id}
            onClick={() => setActive(image)}
            className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-subtle dark:border-neutral-800 dark:bg-neutral-900"
          >
            <Image
              src={`${image.src}`}
              alt={image.alt}
              width={600}
              height={800}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <div className="relative max-h-[90vh] max-w-3xl">
            <Image src={active.src} alt={active.alt} width={1200} height={1600} className="h-full w-full object-contain" />
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 rounded-full border border-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
