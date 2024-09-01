/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['raw.githubusercontent.com'],
      remotePatterns: [
        {
          hostname: "utfs.io",
        },
      ],
    },
  };
  
  export default nextConfig;