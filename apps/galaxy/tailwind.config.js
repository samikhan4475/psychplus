import { radixThemePreset } from 'radix-themes-tw'

/** @type {import("tailwindcss").Config} */
const config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        // Base colors
        white: '#ffffff',
        black: '#000000',

        // PsychPlus colors
        'pp-bg-accent': '#F0F4FF',
        'pp-focus-outline': '#8DA4EF',
        'pp-blue': '#194595',
        'pp-focus-bg': '#D9E2FC',
        'pp-focus-bg-2': '#F0F4FF',
        'pp-table-border': '#CAD8FD',
        'pp-success-bg': '#E9F9EE',
        'pp-success-text': '#18794E',
        'pp-warning-bg': '#FFEDD5',
        'pp-warning-text': '#99543A',
        'pp-link-text': '#194595',
        'pp-send-icon': '#60646C',
        'pp-grey': '#DDDDE3',
        'pp-dark-grey': '#656565',
        'pp-black-1': '#151B4A',
        'pp-black-2': '#101D46',
        'pp-black-3': '#1C2024',
        'pp-gray-1': '#60646C',
        'pp-gray-2': '#DDDDE3',
        'pp-gray-3': '#8B8D98',
        'pp-alt-blue': '#0F6CBD',
        'pp-bg-table-cell': '#F9F9FB',
      },
      animation: {
        loader: 'bounce 500ms infinite, pulse 2s infinite',
      },
    },
  },
  plugins: [],
  presets: [radixThemePreset],
}

module.exports = config
