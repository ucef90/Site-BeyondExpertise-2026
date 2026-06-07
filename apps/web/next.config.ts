import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

// In production the public site is the only service exposed to the reverse proxy.
// It proxies the browser's `/api/v1/*` calls (forms) to the internal NestJS
// service. API_PROXY_TARGET is set at build time in the Docker image.
const apiProxyTarget = process.env.API_PROXY_TARGET;

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Self-contained server bundle for a small production image.
  output: "standalone",
  outputFileTracingRoot: path.join(currentDir, "../../"),
  async rewrites() {
    if (!apiProxyTarget) {
      return [];
    }

    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiProxyTarget}/api/v1/:path*`
      }
    ];
  }
};

export default nextConfig;
