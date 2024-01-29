/** @type {import("next").NextConfig} */
const config = {
  assetPrefix:
    process.env.NODE_ENV !== 'development' &&
    process.env.NEXT_PUBLIC_DISABLE_APP_PATH !== 'true'
      ? process.env.NEXT_PUBLIC_APP_PATH
        ? `/${process.env.NEXT_PUBLIC_APP_PATH}/`
        : undefined
      : undefined,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
  env: {
    APP_ENV: process.env.APP_ENV,
  },
}

module.exports = config
