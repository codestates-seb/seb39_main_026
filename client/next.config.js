/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: [
      'images.unsplash.com',
      'main026.shop',
      'main026-s3.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};
