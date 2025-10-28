export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-900 dark:bg-neutral-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Contact</p>
          <h1 className="brand-h1 mt-6">Schedule a walkthrough</h1>
          <p className="brand-lead mt-4">
            Share your production details and our concierge will respond within one business day with tailored availability.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <form
            className="space-y-6 rounded-3xl border border-neutral-200 p-8 shadow-subtle dark:border-neutral-800"
            method="POST"
            action="https://formspree.io/f/mgegnzya"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
                Name
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
                />
              </label>
              <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
                />
              </label>
            </div>
            <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
              Project Type
              <input
                name="project"
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
              Notes
              <textarea
                name="notes"
                rows={4}
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full border border-neutral-900 bg-neutral-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Submit
            </button>
          </form>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800">
              <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Visit</h2>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                12 Bishop Abayomi Street,<br /> Victoria Island, Lagos, Nigeria
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800">
              <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Connect</h2>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                studio@dhayjosh.com<br /> +234 (0) 700 000 0000
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
