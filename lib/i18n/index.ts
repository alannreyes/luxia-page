import { notFound } from 'next/navigation'
import type { Locale } from '@/middleware'
import { getDictionary, type Dictionary } from './dictionaries'

// Cache para diccionarios (performance)
const dictionaryCache = new Map<Locale, Dictionary>()

// Función para obtener diccionario con cache
export async function getServerDictionary(locale: Locale): Promise<Dictionary> {
  // Verificar si el locale es válido
  if (!['es', 'en'].includes(locale)) {
    notFound()
  }

  // Verificar cache
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!
  }

  // Cargar diccionario
  const dictionary = getDictionary(locale)
  
  // Guardar en cache
  dictionaryCache.set(locale, dictionary)
  
  return dictionary
}

// Hook para Client Components
export function createClientDictionary(dictionary: Dictionary) {
  return {
    t: dictionary,
    
    // Helper para obtener valor anidado
    get: (path: string) => {
      return path.split('.').reduce((obj: Record<string, unknown>, key) => obj?.[key] as Record<string, unknown>, dictionary as unknown as Record<string, unknown>)
    },
    
    // Helper para interpolación
    interpolate: (text: string, variables: Record<string, string | number>) => {
      return Object.entries(variables).reduce(
        (str, [key, value]) => str.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value)),
        text
      )
    }
  }
}

// Tipos para parámetros de página
export interface PageParams {
  locale: Locale
}

export interface PageProps {
  params: PageParams
}

// Helper para generar metadata multiidioma
export function generateLocalizedMetadata(
  dictionary: Dictionary,
  locale: Locale,
  pathname: string = ''
) {
  const baseUrl = 'https://luxia.us'
  const currentUrl = `${baseUrl}/${locale}${pathname}`
  
  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: currentUrl,
      siteName: 'LuxIA',
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: dictionary.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'es': `${baseUrl}/es${pathname}`,
        'en': `${baseUrl}/en${pathname}`,
        'x-default': `${baseUrl}/es${pathname}`, // Default a español
      }
    }
  }
}

// Helper para Analytics multiidioma
export function trackLanguageEvent(locale: Locale, source: 'auto' | 'manual' | 'geo') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'language_selection', {
      event_category: 'internationalization',
      event_label: locale,
      selection_method: source,
      page_language: locale
    })
  }
}

// Constantes útiles
export const LOCALE_LABELS = {
  es: { name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' }
} as const

export const LANGUAGE_REGIONS = {
  es: ['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ'],
  en: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'SG', 'IN']
} as const