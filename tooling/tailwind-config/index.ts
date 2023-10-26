import { type Config } from 'tailwindcss'

export default {
  content: [
    '../../packages/ui/**/*.tsx',
    '../../packages/components/**/*.tsx',
    '../../packages/widgets/**/*.tsx',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--indigo-9)',
        foreground: 'var(--indigo-9-contrast)',
        background: 'var(--indigo-a2)',
        border: 'var(--gray-4)',
      },
    },
  },
  plugins: [],
} satisfies Config
