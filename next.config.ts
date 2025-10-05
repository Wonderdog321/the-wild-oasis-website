import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // explicitly sets the correct root
  },
};

export default nextConfig;
