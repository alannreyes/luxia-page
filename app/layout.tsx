import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Luxia AI - Transformación Digital Inteligente',
  description: 'Partner estratégico en IA para empresas. Desarrollo de APIs, integración ERP con chat, sistemas RAG y consultoría en transformación digital.',
  keywords: 'IA empresarial, RAG, n8n, automatización, ERP, chatbot, transformación digital',
  authors: [{ name: 'Luxia' }],
  openGraph: {
    title: 'Luxia AI - Transformación Digital Inteligente',
    description: 'Partner estratégico en IA para empresas.',
    url: 'https://luxiabrands.com',
    siteName: 'Luxia',
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Luxia AI - Transformación Digital Inteligente',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
