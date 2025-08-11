import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  // Make sure this isn't redirecting .sh files
  async redirects() {
    return [
      // your redirects - make sure no .sh files are redirected
    ];
  },
  
  // Add this to serve .sh files properly
  async headers() {
    return [
      {
        source: '/scripts/:path*.sh',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
    ];
  },
}