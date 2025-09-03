import { radixThemePreset } from 'radix-themes-tw'

/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    '../../packages/**/*.tsx',
    '../../packages-v2/**/*.tsx',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-spectral)'],
        logo: ['var(--font-josefin)'],
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        'pp-blue-1': '#F0F4FF',
        'pp-blue-2': '#EEF2F6',
        'pp-blue-3': '#194595',
        'pp-blue-4': '#d9e2fc',
        'pp-blue-5': '#EBF3FC',
        'pp-blue-6': '#A0D1FA',
        'pp-blue-7': '#24366B',
        'pp-blue-8': '#151B4A',
        'pp-gray-1': '#60646C',
        'pp-gray-2': '#DDDDE3',
        'pp-gray-3': '#EBEBEF',
        'pp-gray-4': '#B9BBC6',
        'pp-gray-5': '#F7F9FC',
        'pp-gray-6': '#888888',
        'pp-gray-7': '#D9E2FC',
        'pp-gray-8': '#E3E5F2',
        'pp-gray-9': '#575759',
        'pp-gray-10': '#F9F9FB',
        'pp-chip-1': '#EEF2F6',
        'pp-warning-border': '#F2AE40',
        'pp-table-border': '#CAD8FD',
        'pp-info-text': '#1E75BB',
        'pp-info-bg-1': '#E6F4FF',
        'pp-warning-bg-1': '#E97135',
        'pp-success-1': '#30A46C',
        'pp-info-1': '#0B68CB',
        'pp-info-2': '#E1F0FF',
        'pp-focus-bg': '#D9E2FC',
        'pp-text-color': '#1C2024',
        'pp-placeholder': '#9ca3af',
      },
      borderRadius: {
        full: '100%',
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        loader: 'bounce 500ms infinite, pulse 2s infinite',
        slideDown: 'slideDown 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 150ms cubic-bezier(0.87, 0, 0.13, 1)',
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [],
  presets: [radixThemePreset],
}

module.exports = config