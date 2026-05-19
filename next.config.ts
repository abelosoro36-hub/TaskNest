import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
      {
        /* ── ADD YOUR OWN CDN HERE WHEN READY ──
           e.g. for Cloudinary:
           protocol: "https",
           hostname: "res.cloudinary.com",
           pathname: "/your-cloud-name/**",
        */
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};
 
export default nextConfig;
 