import { ImageResponse } from 'next/og'
import { getCase, getCaseSlugs } from '@/content/cases'

// OG image dinámica por caso (marca Luxia + título + sector + etapa). Al existir este archivo,
// Next inyecta og:image y twitter:image automáticamente en la página del caso — cierra el hueco
// de "og:image ausente" que reportó la auditoría GEO. Sin fuentes externas (font por defecto).

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'luxIA — Caso de estudio'

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }))
}

const STAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M71.21,28.79 L58,50 L71.21,71.21 L50,58 L28.79,71.21 L42,50 L28.79,28.79 L50,42 Z" fill="#7C93FF"/>' +
      '<path d="M50,50 L50,4 L55.66,44.34 Z" fill="#2E4BFF"/><path d="M50,50 L44.34,44.34 L50,4 Z" fill="#1B2FB5"/>' +
      '<path d="M50,50 L96,50 L55.66,55.66 Z" fill="#2E4BFF"/><path d="M50,50 L55.66,44.34 L96,50 Z" fill="#1B2FB5"/>' +
      '<path d="M50,50 L50,96 L44.34,55.66 Z" fill="#2E4BFF"/><path d="M50,50 L55.66,55.66 L50,96 Z" fill="#1B2FB5"/>' +
      '<path d="M50,50 L4,50 L44.34,44.34 Z" fill="#2E4BFF"/><path d="M50,50 L44.34,55.66 L4,50 Z" fill="#1B2FB5"/>' +
      '</svg>',
  )

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = (rawLocale === 'en' ? 'en' : 'es') as 'es' | 'en'
  const c = getCase(locale, slug)

  const title = c?.title ?? 'Caso de estudio'
  const kicker = (c?.kicker ?? 'luxIA').toUpperCase()
  const industry = c?.industry ?? ''
  const isPilot = c?.stage === 'pilot'
  const stage = isPilot
    ? locale === 'es' ? 'En piloto' : 'In pilot'
    : locale === 'es' ? 'En producción' : 'In production'
  // título muy largo → baja un poco el tamaño para que respire
  const titleSize = title.length > 62 ? 46 : title.length > 44 ? 54 : 62

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F7F8FA',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={STAR} width={46} height={46} alt="" />
          <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, color: '#0E1116' }}>
            <span>lux</span>
            <span style={{ color: '#2540FF' }}>IA</span>
          </div>
        </div>

        {/* título */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, color: '#2540FF', marginBottom: 20 }}>
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize,
              fontWeight: 800,
              color: '#0E1116',
              lineHeight: 1.08,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        {/* pie */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {industry ? (
            <div style={{ display: 'flex', fontSize: 24, color: '#5B6270' }}>{industry}</div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              color: isPilot ? '#a37500' : '#0c8599',
              background: isPilot ? '#fff9db' : '#e6fcf5',
              padding: '6px 16px',
              borderRadius: 999,
            }}
          >
            {stage}
          </div>
          <div style={{ display: 'flex', flex: 1 }} />
          <div style={{ display: 'flex', fontSize: 22, color: '#5B6270' }}>luxia.us</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
