/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Exponer env vars al cliente (también se leen de .env.local)
  env: {
    NEXT_PUBLIC_WEB3FORMS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
  },
  // Sin output: 'export' para Vercel: permite API routes, serverless y env vars
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
