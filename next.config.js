/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line:
  // output: 'export',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig