import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    JWT_SECRET: 'd2e408c5d245f3f56bba9cbe81b45699abef712b6a0ed85283d5a9f26fc5a687',
  },
  reactStrictMode: false
};

export default nextConfig;
