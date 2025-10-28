'use client';

import { Addon } from '@prisma/client';

type Props = {
  addons: Addon[];
  selected: Record<string, number>;
  onChange: (addonId: string, quantity: number) => void;
};

export default function AddonsPicker({ addons, selected, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">Add-ons</h3>
      <div className="space-y-3">
        {addons.map((addon) => {
          const qty = selected[addon.id] || 0;
          const isActive = qty > 0;
          return (
            <div
              key={addon.id}
              className={`flex items-center justify-between rounded-2xl border p-4 transition ${
                isActive
                  ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                  : 'border-neutral-200 hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-100'
              }`}
            >
              <div>
                <p className="font-medium">{addon.name}</p>
                {addon.description ? (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{addon.description}</p>
                ) : null}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>₦{addon.price.toLocaleString()}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border border-current"
                    onClick={() => onChange(addon.id, Math.max(qty - 1, 0))}
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{qty}</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full border border-current"
                    onClick={() => onChange(addon.id, qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
