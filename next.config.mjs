/** @type {import('next').NextConfig} */
// const nextConfig = {};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  // App Routerの設定
  reactStrictMode: true,
}

export default withPWA(nextConfig);