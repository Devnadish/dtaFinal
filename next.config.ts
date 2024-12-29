import createNextIntlPlugin from "next-intl/plugin";
import BundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

// Initialize bundle analyzer plugin
const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Initialize internationalization plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Enable stable experimental features
  experimental: {
    // Optimize package imports for reduced bundle size
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "lucide-react",
      "@radix-ui/react-accordion",
      "framer-motion",
    ],
    // Enable modern JavaScript optimizations
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["localhost:3000", "dreamtoapp.vercel.app"],
    },
  },

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "dreamtoapp-worksample.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Add CORS and security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        ],
      },
    ];
  },

  // Configure allowed domains for fetch
  async rewrites() {
    return [
      {
        source: '/api/geo/:path*',
        destination: 'http://ip-api.com/:path*',
      },
    ];
  },

  webpack(config, { dev, isServer }) {
    // Your existing webpack config
    return config;
  },
};

// Apply plugins and export configuration
export default withBundleAnalyzer(withNextIntl(nextConfig));