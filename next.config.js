/** @type {import('next').NextConfig} */
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '/',
  images: {
    domains: isProd ? ['https://lhome.odooformybusiness.com'] : ['localhost'],
    unoptimized: isProd,
  },
  distDir: 'dist',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  output: isProd ? 'export' : undefined,
  assetPrefix: isProd ? 'https://lhome.odooformybusiness.com' : undefined,
  trailingSlash: true,
};

module.exports = nextConfig;
