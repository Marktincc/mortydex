import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/**',
      },
    ],
    // unoptimized: true, // Removed to enable image optimization
  },
  turbopack: {
    // https://nextjs.org/docs/app/api-reference/next-config-js/turbopack#root-directory
    // This is the root of the project, where package.json is located.
    // It's used to resolve the workspace root when there are multiple lockfiles.
    root: __dirname,
  },
};

export default nextConfig;