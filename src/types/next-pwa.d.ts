declare module 'next-pwa' {
  import type { NextConfig } from 'next'
  
  // declare function withPWA(config: NextConfig): NextConfig

  interface PWAConfig {
    dest?: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    // 他のPWA設定オプション
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  export default withPWA
  
  // export = withPWA
}