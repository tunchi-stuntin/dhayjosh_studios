import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/styles/**/*.{ts,tsx,css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          500: '#111111',
          900: '#050505',
        },
      },
      boxShadow: {
        subtle: '0 20px 50px -20px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
