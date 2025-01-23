/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; worker-src 'self' blob:; child-src 'self' blob:; connect-src 'self' blob:; script-src-elem 'self' 'unsafe-inline' blob:;"
          }
        ],
      },
      {
        source: '/ffmpeg-core.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          }
        ],
      },
      {
        source: '/ffmpeg-core.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          }
        ],
      }
    ]
  },
}

module.exports = nextConfig 