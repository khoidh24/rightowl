import '@repo/env-config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    return [
      {
        source: '/apply-visa',
        destination: `${process.env.NEXT_PUBLIC_APPLY_VISA_DOMAIN}/`
      },
      {
        source: '/apply-visa/:path+',
        destination: `${process.env.NEXT_PUBLIC_APPLY_VISA_DOMAIN}/:path+`
      },
      {
        source: '/apply-visa-static/:path+',
        destination: `${process.env.NEXT_PUBLIC_APPLY_VISA_DOMAIN}/apply-visa-static/:path+`
      }
    ]
  }
}

export default nextConfig
