/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1A393B',
          green: '#1A393B',
          teal: '#13969F',
          'teal-light': '#6ED3CF',
          'nav-bg': '#C6E0F1',
          'pill-bg': '#D1E6F3',
          100: 'rgba(19, 150, 159, 0.12)',
          600: '#13969F',
          900: '#1A393B',
        },
        beige: {
          DEFAULT: '#F5F0E8',
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#EDE6DC',
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
