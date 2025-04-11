/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
