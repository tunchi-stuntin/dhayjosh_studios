'use client';

import { useMemo, useState } from 'react';
import type { Addon, Package } from '@prisma/client';
import { calculateBookingTotal, summarizeAddons } from '@/lib/pricing';
import AddonsPicker from './AddonsPicker';

export default function BookingForm({
  packages,
  addons,
  date,
  hour,
  onPackageChange = () => {},
  onHoursChange = () => {},
  onSubmitSuccess = () => {},
}: {
  packages: Package[];
  addons: Addon[];
  date: Date;
  hour: number | null;
  onPackageChange?: (pkgId: string) => void;
  onHoursChange?: (hours: number) => void;
  onSubmitSuccess?: (bookingId: string) => void;
}) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(packages[0]?.id ?? '');
  const [hours, setHours] = useState(packages[0]?.minHours ?? 1);
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === selectedPackageId) || packages[0],
    [packages, selectedPackageId],
  );

  const total = useMemo(
    () => calculateBookingTotal({ pkg: selectedPackage, hours, addons, addonQuantities }),
    [selectedPackage, hours, addons, addonQuantities],
  );

  const canSubmit = selectedPackage && hour !== null && Boolean(form.name && form.email && form.phone) && !isSubmitting;

  const handleAddonChange = (addonId: string, quantity: number) => {
    setAddonQuantities((prev) => ({ ...prev, [addonId]: quantity }));
  };

  const handlePackageSelect = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    const pkg = packages.find((p) => p.id === pkgId);
    if (pkg) setHours(Math.max(pkg.minHours, hours));
    onPackageChange(pkgId);
  };

  const handleHours = (value: number) => {
    if (!selectedPackage) return;
    const normalized = Math.max(selectedPackage.minHours, Math.min(12, value));
    setHours(normalized);
    onHoursChange(normalized);
  };

  const formattedDate = useMemo(() => date.toISOString().split('T')[0], [date]);

  const handleSubmit = async () => {
    if (!selectedPackage || hour === null) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const addonsPayload = summarizeAddons(addons, addonQuantities);
      const bookingRes = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          packageId: selectedPackage.id,
          date: formattedDate,
          startHour: hour,
          hours,
          addons: addonsPayload,
        }),
      });

      if (!bookingRes.ok) {
        throw new Error('Unable to create booking');
      }

      const bookingData = await bookingRes.json();

      const paystackRes = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: bookingData.bookingId,
        }),
      });

      if (!paystackRes.ok) {
        throw new Error('Unable to initialize payment');
      }

      const { authorization_url } = await paystackRes.json();
      onSubmitSuccess(bookingData.bookingId);
      window.location.href = authorization_url;
    } catch (err) {
      console.error(err);
      setError('We could not start the booking. Please verify your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-neutral-200 p-8 dark:border-neutral-800">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
              Name
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
              Phone
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-sm focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:focus:border-neutral-100"
              />
            </label>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Package</h3>
              <div className="flex flex-col gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      pkg.id === selectedPackage?.id
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{pkg.name}</p>
                      <span className="text-sm">₦{pkg.hourlyRate.toLocaleString()}/hr</span>
                    </div>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Min {pkg.minHours} hrs · {pkg.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Duration</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="h-10 w-10 rounded-full border border-neutral-900 text-lg dark:border-neutral-100"
                  onClick={() => handleHours(hours - 1)}
                >
                  −
                </button>
                <span className="text-lg font-semibold">{hours} hour(s)</span>
                <button
                  type="button"
                  className="h-10 w-10 rounded-full border border-neutral-900 text-lg dark:border-neutral-100"
                  onClick={() => handleHours(hours + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Summary</p>
              <p className="mt-3 text-3xl font-semibold">₦{total.toLocaleString()}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Paystack checkout secured with SSL</p>
            </div>
          </div>
        </div>
      </div>
      <AddonsPicker addons={addons} selected={addonQuantities} onChange={handleAddonChange} />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      <button
        type="button"
        disabled={!canSubmit}
        onClick={handleSubmit}
        className="w-full rounded-full border border-neutral-900 bg-neutral-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-200 disabled:text-neutral-500 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:disabled:border-neutral-800 dark:disabled:bg-neutral-900 dark:disabled:text-neutral-600"
      >
        {isSubmitting ? 'Processing…' : 'Proceed to Paystack'}
      </button>
    </div>
  );
}
