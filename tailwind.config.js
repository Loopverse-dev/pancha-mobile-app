/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx','./components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        splash: {
          background: '#C8E3F5',
          button: '#2B5F7F',
          buttonAlt: '#3A6B8C',
          circle: '#A8D0E8',
        },
      },
    },
  },
  plugins: [],
}

