import type { NextConfig } from "next";

const githubPagesBasePath = process.env.GITHUB_PAGES === "true" ? "/n8n-challenges" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
