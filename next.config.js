/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // Habilitar ESLint durante el build para detectar errores
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Habilitar type checking durante el build para mayor seguridad
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig 