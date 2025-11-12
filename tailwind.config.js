/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#004C97',
        success: '#2ECC71',
        warning: '#FF9500',
      },
    },
  },
  plugins: [],
};
