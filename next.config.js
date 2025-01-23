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
          }
        ],
      },
      {
        source: '/ffmpeg-core.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          }
        ],
      },
      {
        source: '/ffmpeg-core.wasm',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/wasm',
          }
        ],
      }
    ]
  },
}

module.exports = nextConfig 