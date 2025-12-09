/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  assetPrefix: '/contact-static',
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
