import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
};

export default nextConfig;