import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://luxia.us'),
  title: 'luxIA - La IA a tu medida',
  description: 'Soluciones de IA personalizadas que funcionan desde el primer día. Optimiza procesos, reduce costos y acelera decisiones. Consulta gratuita de 30 min.',
  keywords: 'IA empresarial, RAG, n8n, automatización, ERP, chatbot, transformación digital, demos IA, consulta gratuita, fintech IA, análisis documentos, superpoder IA',
  authors: [{ name: 'luxIA', url: 'https://luxia.us' }],
  creator: 'luxIA',
  publisher: 'luxIA',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'luxIA - La IA a tu medida',
    description: 'Soluciones de IA personalizadas que funcionan desde el primer día. Optimiza procesos, reduce costos y acelera decisiones.',
    url: 'https://luxia.us',
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
    description: 'Soluciones de IA personalizadas que funcionan desde el primer día. Optimiza procesos, reduce costos y acelera decisiones.',
    card: 'summary_large_image',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://luxia.us',
    languages: {
      'es-ES': 'https://luxia.us',
      'en-US': 'https://luxia.us/en'
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
              "url": "https://luxia.us",
              "logo": "https://luxia.us/logo.png",
              "description": "La IA a tu medida: soluciones personalizadas que funcionan desde el primer día. Partner estratégico en IA para empresas.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+51 993131883",
                "contactType": "customer service",
                "email": "info@luxia.us"
              },
              "sameAs": [
                "https://www.linkedin.com/company/luxia/"
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
      <body className={`${inter.className} antialiased no-scrollbar-x`}>
        <AnalyticsProvider>
          <ErrorBoundary>
            <div className="viewport-safe">
              {children}
            </div>
          </ErrorBoundary>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
