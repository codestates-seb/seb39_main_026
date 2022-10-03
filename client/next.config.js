/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 타입 오류가 발생할 때, 빌드를 중단하지 않고 빌드를 진행합니다.
  typescript: {
    ignoreBuildErrors: true,
  },
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
