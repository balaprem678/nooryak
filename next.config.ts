import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // 👈 important
  images: {
    unoptimized: true, // 👈 avoids image issues in static hosting
  },
};

export default nextConfig;