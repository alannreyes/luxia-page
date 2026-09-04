import type { Metadata } from 'next'
import { Inter, Space_Grotesk, IBM_Plex_Mono, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-editorial' })

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
        
        
        {/* Structured Data · capa de entendimiento (SEO+GEO) — act. 2026-07-28 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://luxia.us/#organization",
                  "name": "LuxIA",
                  "alternateName": "luxIA",
                  "url": "https://luxia.us",
                  "logo": "https://luxia.us/logo.png",
                  "image": "https://luxia.us/og-image.jpg",
                  "description": "Estudio de software AI-native. Llevamos IA a producción — autenticada, segura y probada — en días, y construimos tecnología que anticipa el riesgo climático en minería, industria y agro.",
                  "foundingDate": "2024",
                  "areaServed": ["US", "MX", "PE", "Latin America"],
                  "knowsAbout": [
                    "Production AI", "Generative AI", "Retrieval-Augmented Generation (RAG)",
                    "LLMOps", "AI agents", "Semantic search", "Insurtech AI", "Fintech AI",
                    "Climate risk technology", "AI security and compliance", "ISO 27001",
                    "Software engineering to production"
                  ],
                  "founder": {
                    "@type": "Person",
                    "name": "Alann Reyes",
                    "jobTitle": "Founder & Principal AI Engineer",
                    "url": "https://www.linkedin.com/in/alannreyes"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/luxiaus/",
                    "https://github.com/alannreyes",
                    "https://www.wikidata.org/wiki/Q140753114"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "sales",
                    "email": "info@luxia.us",
                    "areaServed": ["US", "MX", "PE"],
                    "availableLanguage": ["English", "Spanish"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://luxia.us/#website",
                  "url": "https://luxia.us",
                  "name": "LuxIA",
                  "description": "Estudio de software AI-native: tu software en producción, en días.",
                  "publisher": { "@id": "https://luxia.us/#organization" },
                  "inLanguage": ["es", "en"]
                }
              ]
            })
          }}
        />
        {/* Umami · analítica privacy-first (self-host app04, panel stats.luxia.us) */}
        <script defer src="https://stats.luxia.us/script.js" data-website-id="4060e0df-4feb-4c37-9339-6786b061419c"></script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} ${bricolage.variable} ${inter.className} antialiased no-scrollbar-x`}>
        <Providers>
          <AnalyticsProvider>
            <ErrorBoundary>
              <div className="viewport-safe">
                {children}
              </div>
            </ErrorBoundary>
          </AnalyticsProvider>
        </Providers>
      </body>
    </html>
  )
}
