import { NextRequest, NextResponse } from 'next/server'

// Idiomas soportados
export const locales = ['es', 'en'] as const
export const defaultLocale = 'es' as const

// Tipos TypeScript para idiomas
export type Locale = (typeof locales)[number]

export function middleware(request: NextRequest) {
  // Verificar si hay un idioma en la URL
  const { pathname } = request.nextUrl

  // LEARNING routes
  if (pathname === '/aprendiendo' || pathname.startsWith('/aprendiendo/')) {
    const newPath = pathname.replace('/aprendiendo', '/es/learning')
    return NextResponse.redirect(new URL(newPath, request.url))
  }
  if (pathname === '/learning' || pathname.startsWith('/learning/')) {
    const newPath = pathname.replace('/learning', '/en/learning')
    return NextResponse.redirect(new URL(newPath, request.url))
  }
  // Legacy redirects
  if (pathname === '/aprende' || pathname.startsWith('/aprende/')) {
    const newPath = pathname.replace('/aprende', '/es/learning')
    return NextResponse.redirect(new URL(newPath, request.url))
  }
  if (pathname === '/learn' || pathname.startsWith('/learn/')) {
    const newPath = pathname.replace('/learn', '/en/learning')
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // COOKING routes
  if (pathname === '/cocinando' || pathname.startsWith('/cocinando/')) {
    const newPath = pathname.replace('/cocinando', '/es/cooking')
    return NextResponse.redirect(new URL(newPath, request.url))
  }
  if (pathname === '/cooking' || pathname.startsWith('/cooking/')) {
    const newPath = pathname.replace('/cooking', '/en/cooking')
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // Verificar si la ruta ya tiene un idioma
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Detectar idioma preferido del usuario
  const locale = getLocale(request) || defaultLocale

  // Redireccionar con el idioma detectado
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  
  // Agregar header para analytics
  const response = NextResponse.redirect(newUrl)
  response.headers.set('x-detected-locale', locale)
  
  return response
}

function getLocale(request: NextRequest): Locale {
  // 1. Verificar cookie de preferencia (mayor prioridad)
  const cookieLocale = request.cookies.get('preferred-locale')?.value
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }

  // 2. Verificar header Accept-Language del navegador
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    // Parsear idiomas preferidos del navegador
    const preferredLanguages = acceptLanguage
      .split(',')
      .map(lang => {
        const [language, quality = '1'] = lang.split(';q=')
        return {
          language: language.trim().toLowerCase(),
          quality: parseFloat(quality)
        }
      })
      .sort((a, b) => b.quality - a.quality)

    // Buscar coincidencia exacta o parcial
    for (const { language } of preferredLanguages) {
      // Coincidencia exacta (ej: 'es' o 'en')
      if (locales.includes(language as Locale)) {
        return language as Locale
      }
      
      // Coincidencia parcial (ej: 'en-US' -> 'en', 'es-MX' -> 'es')
      const shortLang = language.split('-')[0]
      if (locales.includes(shortLang as Locale)) {
        return shortLang as Locale
      }
    }
  }

  // 3. Detectar por geolocalización (usando headers de Vercel/Cloudflare)
  const country = request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-vercel-ip-country')
  
  // Países de habla inglesa
  const englishSpeakingCountries = ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA']
  if (country && englishSpeakingCountries.includes(country)) {
    return 'en'
  }

  // 4. Default a español
  return defaultLocale
}

export const config = {
  // Matcher excluye archivos estáticos y API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images in public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.).*)',
  ],
}