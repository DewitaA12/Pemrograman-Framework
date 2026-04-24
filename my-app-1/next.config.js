/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // gabungkan SEMUA config di sini
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
       {
        protocol: "https",
        hostname: "cdn.salla.sa",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.made-in-china.com",
        pathname: "/**",
      },
     {
       protocol: "https",
       hostname: "images.tokopedia.net",
       pathname: "/**",
      },
    ],

    domains: ["static-id.zacdn.com", "dynamic.zacdn.com"],
  },
};

module.exports = nextConfig;