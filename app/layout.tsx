import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'luxIA - La IA es tu superpoder | Demos Interactivas',
  description: 'Actúa primero, decide mejor, lidera con inteligencia. Descubre el poder de la IA empresarial con nuestras demos interactivas. Chat con ERP, análisis de documentos, automatización n8n y más.',
  keywords: 'IA empresarial, RAG, n8n, automatización, ERP, chatbot, transformación digital, demos IA, consulta gratuita, fintech IA, análisis documentos, superpoder IA',
  authors: [{ name: 'luxIA', url: 'https://luxiabrands.com' }],
  creator: 'luxIA',
  publisher: 'luxIA',
  openGraph: {
    title: 'luxIA - La IA es tu superpoder | Demos Interactivas',
    description: 'Actúa primero, decide mejor, lidera con inteligencia. Experimenta el futuro de la IA empresarial con nuestras demos en vivo.',
    url: 'https://luxiabrands.com',
    siteName: 'luxIA',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Agregar imagen OG
        width: 1200,
        height: 630,
        alt: 'luxIA - La IA es tu superpoder'
      }
    ]
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
    title: 'luxIA - La IA es tu superpoder | Demos Interactivas',
    description: 'Actúa primero, decide mejor, lidera con inteligencia. Experimenta el futuro de la IA empresarial.',
    card: 'summary_large_image',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://luxiabrands.com',
    languages: {
      'es-ES': 'https://luxiabrands.com',
      'en-US': 'https://luxiabrands.com/en'
    }
  },
  verification: {
    google: '', // Agregar Google Search Console verification
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "luxIA",
              "url": "https://luxiabrands.com",
              "logo": "https://luxiabrands.com/logo.png",
              "description": "La IA es tu superpoder: Actúa primero, decide mejor, lidera con inteligencia. Partner estratégico en IA para empresas.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "alann@luxiabrands.com"
              },
              "sameAs": [
                "https://linkedin.com/company/luxia-ai",
                "https://twitter.com/luxia_ai"
              ],
              "offers": {
                "@type": "Offer",
                "name": "Consulta Gratuita de IA",
                "description": "Consulta gratuita de 30 minutos para explorar cómo la IA puede ser tu superpoder empresarial",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
