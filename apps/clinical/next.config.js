/** @type {import("next").NextConfig} */
const config = {
  assetPrefix:
    process.env.NODE_ENV !== 'development' &&
    process.env.DISABLE_APP_PATH !== 'true'
      ? `/${process.env.APP_PATH}/`
      : undefined,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  transpilePackages: [],
}

module.exports = config
