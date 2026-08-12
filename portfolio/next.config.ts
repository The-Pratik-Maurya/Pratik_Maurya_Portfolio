/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Vercel ko TS errors ignore karne ke liye bolna
    ignoreBuildErrors: true,
  },
};

export default nextConfig;