/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  compiler: {
    // disable SWC entirely, fall back to Babel
  }
}

module.exports = nextConfig