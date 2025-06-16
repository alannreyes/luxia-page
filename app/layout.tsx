import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'luxIA - La IA a tu medida',
  description: 'Actúa primero, decide mejor, lidera con inteligencia. Descubre el poder de la IA empresarial con nuestras demos interactivas. Chat con ERP, análisis de documentos, automatización n8n y más.',
  keywords: 'IA empresarial, RAG, n8n, automatización, ERP, chatbot, transformación digital, demos IA, consulta gratuita, fintech IA, análisis documentos, superpoder IA',
  authors: [{ name: 'luxIA', url: 'https://luxiabrands.com' }],
  creator: 'luxIA',
  publisher: 'luxIA',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' }
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'luxIA - La IA a tu medida',
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
        alt: 'luxIA - La IA a tu medida'
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
    title: 'luxIA - La IA a tu medida',
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
              "description": "La IA a tu medida: Actúa primero, decide mejor, lidera con inteligencia. Partner estratégico en IA para empresas.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+51 993131883",
                "contactType": "customer service",
                "email": "alann@luxiabrands.com"
              },
              "sameAs": [
                "https://www.linkedin.com/company/luxiabrands/"
              ],
              "offers": {
                "@type": "Offer",
                "name": "Consulta Gratuita de IA",
                "description": "Consulta gratuita de 30 minutos para explorar cómo la IA puede adaptarse a tu medida empresarial",
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
