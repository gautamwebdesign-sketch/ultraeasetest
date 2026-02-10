import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Fix for the lockfile warning: we are deliberately ignoring it for now to ensure build stability
  // as the experimental config caused validation errors.
};

export default nextConfig;
