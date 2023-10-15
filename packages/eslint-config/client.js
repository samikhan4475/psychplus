/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ['./base.js', 'next'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
}

module.exports = config
