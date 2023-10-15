/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ['./base.js'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
}

module.exports = config
