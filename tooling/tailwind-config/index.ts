import { radixThemePreset } from 'radix-themes-tw'
import { type Config } from 'tailwindcss'

export default {
  content: ['../../packages/**/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [radixThemePreset],
} satisfies Config
