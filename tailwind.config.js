/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}', // Fix: double asterisk for deep folders
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      borderRadius: {
        'button': '8px',
      },
      boxShadow: {
        button: '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-pressed': '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        background: '#f7f9fb',
        danger: '#ef4444',
        muted: '#6b7280',
        primary: '#55a4ff',
        'primary-dark': '#2a7ed9',
        'primary-light': '#a8d4ff',
        text: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      minWidth: {
        'icon-button': '80px', // Minimum width for icon buttons
      },
      spacing: {
        '0.5': '2px', // For fine-tuned spacing in icon designs
      },
    },
  },
  plugins: [],
};