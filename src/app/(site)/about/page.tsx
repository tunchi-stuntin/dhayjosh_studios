export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-900 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">About</p>
          <h1 className="brand-h1 mt-6">The DhayJosh philosophy</h1>
          <p className="brand-lead mt-4">
            DhayJosh Photos is a Lagos-based creative studio founded by photographers for photographers. We obsess over ambience,
            impeccable lighting, and concierge-level service to keep your production flowing.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="brand-h2">Design-first space</h2>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Our studio pairs a 6m cyclorama and modular sets with a private client lounge, glam room, and production office. We
              intentionally curate natural light, acoustics, and textures to complement lighting setups from strobe to continuous.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Each booking includes a concierge who prepares sets, coordinates equipment, and welcomes your clients with refined
              hospitality touches.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="brand-h2">For ambitious teams</h2>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              We collaborate with fashion houses, creative agencies, and production companies across West Africa. From campaign
              pre-light to editorial wrap, our team is available for recommendations, crew support, and post-booking logistics.
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              The studio is centrally located in Victoria Island with secure parking and easy access to top-tier vendors and
              accommodation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
