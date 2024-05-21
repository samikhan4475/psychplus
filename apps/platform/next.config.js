/** @type {import("next").NextConfig} */
const config = {
  basePath: '/platform',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
}

module.exports = config
