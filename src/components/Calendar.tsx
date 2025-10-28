'use client';

import { useEffect, useMemo, useState } from 'react';
import { addDays, format, isBefore, isSameDay } from 'date-fns';

type AvailabilityResponse = {
  occupied: number[];
};

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
  selectedHour: number | null;
  onHourSelect: (hour: number) => void;
};

const hours = Array.from({ length: 24 }, (_, index) => index);

export default function Calendar({ date, onDateChange, selectedHour, onHourSelect }: Props) {
  const [occupied, setOccupied] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/availability?date=${formattedDate}`);
        if (!res.ok) throw new Error('Failed to load availability');
        const data: AvailabilityResponse = await res.json();
        if (!ignore) setOccupied(data.occupied || []);
      } catch (error) {
        console.error(error);
        if (!ignore) setOccupied([]);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [formattedDate]);

  const nextSevenDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(new Date(), i)), []);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-auto pb-2">
        {nextSevenDays.map((day) => {
          const active = isSameDay(day, date);
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onDateChange(day)}
              className={`min-w-[120px] rounded-2xl border px-4 py-3 text-left transition ${
                active
                  ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-900 dark:border-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-100'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.3em]">{format(day, 'EEE')}</p>
              <p className="mt-1 text-lg font-semibold">{format(day, 'MMM d')}</p>
            </button>
          );
        })}
      </div>
      <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
            Select Start Hour
          </h3>
          {isLoading ? <span className="text-xs text-neutral-500">Refreshing…</span> : null}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
          {hours.map((hour) => {
            const slotDate = new Date(date);
            slotDate.setHours(hour, 0, 0, 0);
            const isPast = isBefore(slotDate, new Date());
            const isOccupied = occupied.includes(hour);
            const disabled = isPast || isOccupied;
            const isSelected = selectedHour === hour;
            return (
              <button
                key={hour}
                type="button"
                disabled={disabled}
                onClick={() => onHourSelect(hour)}
                className={`rounded-xl border px-3 py-2 text-sm transition focus-visible:ring-2 ${
                  disabled
                    ? 'cursor-not-allowed border-neutral-200 text-neutral-400 dark:border-neutral-800 dark:text-neutral-600'
                    : isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-100'
                }`}
              >
                {format(slotDate, 'ha')}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
