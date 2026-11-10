import type { NextConfig } from "next";

// PAGES_BASE_PATH is set by the GitHub Pages workflow; local dev/start stay a normal server at "/".
const basePath = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = basePath ? {
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
} : {};

export default nextConfig;
