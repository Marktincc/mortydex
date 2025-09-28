import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['rickandmortyapi.com'],
    unoptimized: true,
  },
}
export default nextConfig;
