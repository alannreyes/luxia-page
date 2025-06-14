/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Deshabilitar ESLint durante el build de producción
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Deshabilitar type checking durante el build de producción
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 