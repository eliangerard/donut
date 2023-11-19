/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
        'hit-pink': {
          '50': '#fef4ee',
          '100': '#fee6d6',
          '200': '#fbcaad',
          '300': '#fab692',
          '400': '#f57642',
          '500': '#f2511d',
          '600': '#e33813',
          '700': '#bc2712',
          '800': '#962116',
          '900': '#791f15',
          '950': '#410c09',
        },
        'turquoise': {
          '50': '#f1fcfa',
          '100': '#cff8f1',
          '200': '#9ef1e4',
          '300': '#5ee1d1',
          '400': '#36cbbd',
          '500': '#1dafa4',
          '600': '#148d86',
          '700': '#15706c',
          '800': '#155a57',
          '900': '#164b49',
          '950': '#062d2d',
        },

      },
    },
  },
  plugins: [],
}
