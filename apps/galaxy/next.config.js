/** @type {import("next").NextConfig} */
const config = {
  basePath: '/ehr',
  assetPrefix: '/ehr',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
}

module.exports = config
