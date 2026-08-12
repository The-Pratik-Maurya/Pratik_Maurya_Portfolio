/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Apne Render backend ka exact URL yahan daal do
        destination: 'https://pratik-maurya-portfolio.onrender.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;