import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "grafiasmusic.com",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cifraclub.com',
      },
      {
        protocol: 'https',
        hostname: 'cifraclub.com',
      },
      {
        protocol: 'https',
        hostname: 'museomoderno.org',
      },
      {
        protocol: "https",
        hostname: "e.rpp-noticias.io",
      },
      {
        protocol: "https",
        hostname: "offloadmedia.feverup.com",
      },
      {
        protocol: "https",
        hostname: "www.teatrovera.com",
      },
      {
        protocol: "https",
        hostname: "somosiberoamerica.org",
      },
      {
        protocol: "https",
        hostname: "blog.marti.mx",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
