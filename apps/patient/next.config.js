/** @type {import("next").NextConfig} */
const config = {
  basePath: '',
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: '/account',
        destination: '/account/profile',
        permanent: true,
      },
      {
        source: '/health',
        destination: '/health/medications',
        permanent: true,
      },
      {
        source: '/care-plan',
        destination: '/care-plan/action-items',
        permanent: true,
      },
      {
        source: '/billing',
        destination: '/billing/credit-debit-cards',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
}

module.exports = config
