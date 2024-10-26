import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */

const nextPWA = withPWA ({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = nextPWA({
  reactStrictMode: true,
});


export default nextConfig;
