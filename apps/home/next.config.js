import '@repo/env-config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
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
