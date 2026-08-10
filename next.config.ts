import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendURL = process.env.BACKEND_URL ?? "http://localhost:4000";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendURL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
