export type AddonSeed = {
  name: string;
  description: string;
  price: number;
};

export const defaultAddons: AddonSeed[] = [
  {
    name: 'Profoto Lighting Kit',
    description: 'Pair of B10X heads with modifiers and stands.',
    price: 35000,
  },
  {
    name: 'Seamless Backdrop Set',
    description: 'Three 9ft seamless colors installed on the backdrop system.',
    price: 15000,
  },
  {
    name: 'Props Library Access',
    description: 'Curated lifestyle props and furniture staging pieces.',
    price: 20000,
  },
  {
    name: 'Cinema Camera Body',
    description: 'Full-frame cinema body with monitoring and media.',
    price: 65000,
  },
  {
    name: 'Prime Lens Trio',
    description: 'Set of 24mm, 50mm, and 85mm fast primes.',
    price: 30000,
  },
];
