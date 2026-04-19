/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        // Avatar dari Google
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Avatar dari GitHub
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
