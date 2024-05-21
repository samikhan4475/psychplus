/** @type {import("next").NextConfig} */
const config = {
  basePath: '/galaxy',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
}

module.exports = config
