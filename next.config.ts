import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'kv21.io.vn', 
        'www.kv21.io.vn', 
        'localhost:3000',
        '10.199.1.16:3000'
      ],
    },
  },
  allowedDevOrigins: ['localhost', '10.199.1.16'],
  reactCompiler: true,

  // Rewrite the scripts.js file to the umami script.js file
  // This is to avoid the umami script being blocked by the browser
  async rewrites() {
    return [
      {
        source: '/scripts.js',
        destination: 'https://cloud.umami.is/script.js',
      },
    ]
  },
}

export default nextConfig
