/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // If you are using Turbopack, this helps resolve the shared React instance
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.js', // Helps with some fiber/canvas issues
      },
    },
  },
};

export default nextConfig;