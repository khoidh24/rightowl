import '@repo/env-config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_HOME_DOMAIN]
    }
  },
  async rewrites() {
    return [
      {
        source: '/contact',
        destination: `${process.env.NEXT_PUBLIC_CONTACT_DOMAIN}/`
      },
      {
        source: '/contact/:path+',
        destination: `${process.env.NEXT_PUBLIC_CONTACT_DOMAIN}/:path+`
      },
      {
        source: '/contact-static/:path+',
        destination: `${process.env.NEXT_PUBLIC_CONTACT_DOMAIN}/contact-static/:path+`
      }
    ]
  }
}

export default nextConfig
