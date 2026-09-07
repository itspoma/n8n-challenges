import type { NextConfig } from "next";

const siteBasePath = process.env.SITE_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  reactStrictMode: true,
  output: "export",
  basePath: siteBasePath,
  assetPrefix: siteBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: siteBasePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
