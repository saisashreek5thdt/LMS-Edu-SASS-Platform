/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com", // ✅ add this
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
