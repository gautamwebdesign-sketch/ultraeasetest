import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/product/ultrasonic-physiological-therapy',
        destination: '/product/ultrasound-device-for-home-wireless-warming-physiological-therapy',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
