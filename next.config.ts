import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // explicitly sets the correct root
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gmrvheufnvkxcsexiwlc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
};

export default nextConfig;
