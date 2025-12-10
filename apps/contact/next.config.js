/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  assetPrefix: '/contact-static',
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/contact-static/_next/:path+',
          destination: '/_next/:path+',
        },
      ],
    };
  },
};

export default nextConfig;
