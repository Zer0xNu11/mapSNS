/** @type {import('next').NextConfig} */
// const nextConfig = {};

import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  // App Routerの設定
  reactStrictMode: true,
}

export default pwaConfig(nextConfig);