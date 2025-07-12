/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'epilogue': ['Epilogue', 'system-ui', 'sans-serif'],
      },
      colors: {
        'pft-blue': '#0077C8',
        'pft-orange': '#FF7A21',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
      }
    },
  },
  plugins: [],
};
