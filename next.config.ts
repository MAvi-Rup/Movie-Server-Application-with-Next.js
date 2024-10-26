import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Add this line to allow images from TMDB
  },
  // other config options here
};

export default nextConfig;
