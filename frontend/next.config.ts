// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure we build the app with the pages router
  experimental: {
    appDir: false,
  },
  // Configure redirects if needed
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
