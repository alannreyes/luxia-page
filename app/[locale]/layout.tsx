import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { getServerDictionary, generateLocalizedMetadata, type PageParams } from '@/lib/i18n'
import { locales } from '@/middleware'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

// Generar metadata dinámica según idioma
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const dictionary = await getServerDictionary(locale)
  
  return {
    metadataBase: new URL('https://luxia.us'),
    ...generateLocalizedMetadata(dictionary, locale),
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
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'

  // Verificar que el locale sea válido
  if (!locales.includes(locale)) {
    notFound()
  }

  const dictionary = await getServerDictionary(locale)

  return (
    <>
      {/* Solo devolvemos el contenido, sin html/body */}
      <AnalyticsProvider locale={locale}>
        <ErrorBoundary>
          <div className="viewport-safe">
            {children}
          </div>
        </ErrorBoundary>
      </AnalyticsProvider>
    </>
  )
}