import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/image',
      },
    ];
  },
  experimental: {
    authInterrupts: true,
  },
  devIndicators: false,
};

export default nextConfig;
