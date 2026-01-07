/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static export
  experimental: { appDir: true },
  basePath: '/alireza-ashkbar.github.io', // GitHub Pages repo path
  images: { unoptimized: true }, // prevents next/image issues on static export
};

module.exports = nextConfig;