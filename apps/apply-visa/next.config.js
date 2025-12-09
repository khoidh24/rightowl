/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  assetPrefix: '/apply-visa-static',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/apply-visa-static/_next/:path+',
          destination: '/_next/:path+'
        }
      ]
    }
  }
}

export default nextConfig
