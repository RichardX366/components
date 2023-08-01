/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/stories/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
