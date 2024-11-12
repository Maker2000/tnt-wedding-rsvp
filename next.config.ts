import type { NextConfig, Redirect } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  /* config options here */

  serverExternalPackages: ["mongoose"],
  // and the following to enable top-level await support for Webpack
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
