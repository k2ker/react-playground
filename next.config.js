/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "phinf.pstatic.net",
      "k.kakaocdn.net",
      "fakestoreapi.com",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
    ],
  },
};

module.exports = nextConfig;
