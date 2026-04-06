/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true, // Enable strict mode for better development
  poweredByHeader: false, // Remove X-Powered-By header for security
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Image optimization for 100 Performance score
  images: {
    unoptimized: false,
    domains: ['picsum.photos', 'api.dicebear.com', 'simocasino.com'],
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 70, 75, 80, 85],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable SWR (Stale-While-Revalidate) caching
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },

  // Enable compression
  compress: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Security headers for Best Practices
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Enable experimental features for faster builds
  experimental: {
    // Optimized package imports
    optimizePackageImports: [
      'lodash-es',
      'date-fns',
      'react-icons',
      'lucide-react',
      '@heroicons/react',
      '@reduxjs/toolkit',
      'react-hook-form',
      'framer-motion'
    ],
  },

  // TURBOPACK - Dramatically faster rebuilds (5-10x faster than Webpack)
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
        },
      };
    }

    return config;
  },
};

export default nextConfig;
