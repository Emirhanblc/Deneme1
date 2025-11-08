/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      // 'your-cms-domain.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    // CMS_API_URL: process.env.CMS_API_URL,
    // CMS_API_TOKEN: process.env.CMS_API_TOKEN,
  },
  // output: 'export',   // BUNU KALDIR
  trailingSlash: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
