/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  
  async redirects() {
    return [
      {
        source: '/weather/:cityName',
        destination: '/city/:cityName',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
