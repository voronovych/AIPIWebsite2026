import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Careers form attaches a resume; the 1MB default rejects most PDFs.
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
