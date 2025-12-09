/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  assetPrefix: '/contact-static',
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_CONTACT_DOMAIN, process.env.NEXT_PUBLIC_HOME_DOMAIN]
    }
  },
  crossOrigin: [process.env.NEXT_PUBLIC_CONTACT_DOMAIN, process.env.NEXT_PUBLIC_HOME_DOMAIN],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/contact-static/_next/:path+',
          destination: '/_next/:path+'
        }
      ]
    }
  }
}

export default nextConfig
