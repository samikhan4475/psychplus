/** @type {import("next").NextConfig} */
const config = {
  basePath: '/ehr',
  assetPrefix: '/ehr',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
  async redirects() {
    return [
      {
        source: '/chart/:id',
        destination: '/chart/:id/quicknotes',
        permanent: true,
      },
    ]
  },
}

module.exports = config
