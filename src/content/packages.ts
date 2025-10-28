export type PackageSeed = {
  name: string;
  description: string;
  hourlyRate: number;
  minHours: number;
};

export const defaultPackages: PackageSeed[] = [
  {
    name: 'Full Studio',
    description:
      'Exclusive access to the entire studio floor including lounge, vanity, cyc wall, and lighting grid.',
    hourlyRate: 90000,
    minHours: 2,
  },
  {
    name: 'Partial Studio',
    description:
      'Access to the primary shooting bay, make-up counter, and shared lounge — perfect for nimble teams.',
    hourlyRate: 55000,
    minHours: 2,
  },
];
