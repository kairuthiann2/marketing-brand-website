/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['League Spartan', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#023C8B',
          navy: '#023C8B',
          accent: '#20E3EB',
          teal: '#20E3EB',
          'teal-light': '#20E3EB',
          'nav-bg': '#F0F3F8',
          'pill-bg': '#F7F9FC',
          100: 'rgba(32, 227, 235, 0.12)',
          600: '#20E3EB',
          900: '#023C8B',
        },
        beige: {
          DEFAULT: '#F0F3F8',
          50: '#F7F9FC',
          100: '#F0F3F8',
          200: '#B4B4B4',
        },
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        card: '16px',
        button: '12px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
      },
      spacing: {
        18: '72px',
        22: '88px',
      },
    },
  },
  plugins: [],
};
