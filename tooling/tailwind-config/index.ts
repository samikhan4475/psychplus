import { type Config } from 'tailwindcss'

export default {
  content: [
    '../../packages/ui/**/*.tsx',
    '../../packages/components/**/*.tsx',
    '../../packages/widgets/**/*.tsx',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
