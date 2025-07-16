/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
      },
      fontFamily: {
        'epilogue': ['Epilogue', 'system-ui', 'sans-serif'],
      },
      colors: {
        'pft-blue': '#0077C8',
        'pft-orange': '#FF7A21',
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s infinite',
      }
    },
  },
  plugins: [],
};
