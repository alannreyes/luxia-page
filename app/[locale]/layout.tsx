import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getServerDictionary, generateLocalizedMetadata, type PageParams } from '@/lib/i18n'
import { locales, type Locale } from '@/middleware'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// Generar metadata dinámica según idioma
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const resolvedParams = await params
  const dictionary = await getServerDictionary(resolvedParams.locale)
  
  return {
    metadataBase: new URL('https://luxia.us'),
    ...generateLocalizedMetadata(dictionary, resolvedParams.locale),
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
    verification: {
      google: '', // Agregar Google Search Console verification
    },
    category: 'technology',
  }
}

// Generar rutas estáticas para todos los idiomas
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<PageParams>
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  
  // Verificar que el locale sea válido
  if (!locales.includes(resolvedParams.locale)) {
    notFound()
  }

  const dictionary = await getServerDictionary(resolvedParams.locale)

  return (
    <html lang={resolvedParams.locale} className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cal.luxia.us" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "luxIA",
              "url": `https://luxia.us/${resolvedParams.locale}`,
              "logo": "https://luxiabrands.com/logo.png",
              "description": dictionary.meta.description,
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
                "name": resolvedParams.locale === 'es' ? 'Consulta Gratuita de IA' : 'Free AI Consultation',
                "description": dictionary.hero.description,
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased no-scrollbar-x`}>
        <AnalyticsProvider locale={resolvedParams.locale}>
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