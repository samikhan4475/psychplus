/** @type {import("next").NextConfig} */
const config = {
  basePath: '/ehr',
  assetPrefix: '/ehr',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.resolve.alias['@azure/communication-calling'] =
      '@azure/communication-calling/dist-esm/sdk.bundle.js'
    return config
  },
}

module.exports = config
