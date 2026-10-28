import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let ngrok tunnels load dev assets (JS chunks, HMR). The subdomain changes
  // on every ngrok restart, so allow any of its domains.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.io"],
};

export default nextConfig;
