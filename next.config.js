const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com',
      },
      {
        hostname: process.env.NEXT_PUBLIC_BASE_API,
      },
    ],
  },
};
module.exports = withVanillaExtract(nextConfig);
