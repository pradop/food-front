/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue-custom': '#003780',
        'light-blue-custom': '#20A7E4',
      },
      screens: {
        'xs-custom': { 'raw': '(max-height: 400px)' },
      }
    },
  },
  plugins: [],
}
