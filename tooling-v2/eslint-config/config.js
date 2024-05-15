/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
    'next',
  ],
  rules: {
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@next/next/no-html-link-for-pages': 'off',
    'import/no-anonymous-default-export': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

module.exports = config
