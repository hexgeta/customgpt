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
            value: "default-src 'self' blob: data: https://unpkg.com https://plausible.io; connect-src 'self' blob: https://unpkg.com https://plausible.io; script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' blob: 'unsafe-inline' https://unpkg.com https://plausible.io; worker-src 'self' blob: https://unpkg.com; child-src 'self' blob: https://unpkg.com; img-src 'self' blob: data: https://unpkg.com; media-src 'self' blob: data: https://unpkg.com; script-src-elem 'self' 'unsafe-inline' blob: https://unpkg.com https://plausible.io;"
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