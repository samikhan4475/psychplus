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
        "pp-blue-1":'#F0F4FF',
        "pp-gray-1":'#60646C',
        "pp-blue-2":'#EEF2F6',
        "pp-gray-2":'#DDDDE3',
        "pp-gray-3":'#EBEBEF',
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
