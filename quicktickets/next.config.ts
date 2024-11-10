import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grafiasmusic.com',
      },
      {
        protocol: 'https',
        hostname: 'museomoderno.org',
      },
      {
        protocol: 'https',
        hostname: 'e.rpp-noticias.io',
      }
    ]
  }
}

export default nextConfig;
