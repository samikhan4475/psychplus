import { type Config } from 'tailwindcss'

export default {
  content: [
    '../../packages/ui/**/*.tsx',
    '../../packages/core/**/*.tsx',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
