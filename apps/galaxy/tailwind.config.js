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
        'pp-bg-primary': '#194595',
        'pp-icon-sub': '#60646C',
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
        'pp-accent-mint': '#8BD5C9',
        'pp-green-100': '#E9F9EE',
        'pp-primary-light': '#A0B6DC',
        'pp-blue-100': '#E1F0FF',
        'pp-states-info': '#0091FF',
        'pp-red-100': '#FFE5E5',
        'pp-states-error': '#E5484D',
        'pp-text-sub': '#60646C',
        'pp-text-primary-base': '#194595',
        'pp-bg-table-cell': '#F9F9FB',
        'pp-img-border': '#9BABF0',
      },
      animation: {
        loader: 'bounce 500ms infinite, pulse 2s infinite',
      },
      boxShadow: {
        'light-08':
          '0px 0px 2px 0px rgba(0, 0, 0, 0.12), 0px 4px 8px 0px rgba(0, 0, 0, 0.14)',
      },
    },
  },
  plugins: [],
  presets: [radixThemePreset],
}

module.exports = config
