/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        padding: '1rem',
        center: true,
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula'],
    logs: false,
  },
};
