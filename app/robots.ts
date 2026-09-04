import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // Crawlers de IA generativa (permitidos para ser citable) — act. 2026-07-28
      { userAgent: 'GPTBot', allow: '/' },              // OpenAI · entrenamiento
      { userAgent: 'OAI-SearchBot', allow: '/' },       // OpenAI · búsqueda/citas
      { userAgent: 'ChatGPT-User', allow: '/' },        // OpenAI · navegación en vivo
      { userAgent: 'ClaudeBot', allow: '/' },           // Anthropic · entrenamiento
      { userAgent: 'Claude-User', allow: '/' },         // Anthropic · navegación en vivo
      { userAgent: 'PerplexityBot', allow: '/' },       // Perplexity · índice
      { userAgent: 'Perplexity-User', allow: '/' },     // Perplexity · navegación en vivo
      { userAgent: 'Google-Extended', allow: '/' },     // Google · Gemini/Vertex
      { userAgent: 'Applebot-Extended', allow: '/' },   // Apple Intelligence
    ],
    sitemap: 'https://luxia.us/sitemap.xml',
    host: 'https://luxia.us',
  }
}