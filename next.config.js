/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*geektori.ir',
          }
        ]
      }
}

module.exports = nextConfig
