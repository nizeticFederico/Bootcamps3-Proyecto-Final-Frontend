import type { NextConfig } from "next";

const NextConfig = {
  images: {
    domains: ['grafiasmusic.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grafiasmusic.com',
      }
    ]
  }
}
export default NextConfig;
