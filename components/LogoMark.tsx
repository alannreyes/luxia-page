// Marca LuxIA — rosa de los vientos facetada, plana (Dirección A).
// Fuente única del arte del logo; favicons/og/avatar se generan del mismo SVG.
type Tone = 'color' | 'white' | 'ink'

const TONES: Record<Tone, { bright: string; dark: string; light: string }> = {
  color: { bright: '#2E4BFF', dark: '#1B2FB5', light: '#7C93FF' },
  white: { bright: '#FFFFFF', dark: '#AEB9FF', light: '#6E86FF' },
  ink:   { bright: '#0E1116', dark: '#0E1116', light: '#5B6270' },
}

export default function LogoMark({ tone = 'color', className = '', title = 'LuxIA' }: { tone?: Tone; className?: string; title?: string }) {
  const { bright, dark, light } = TONES[tone]
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label={title}>
      {/* rosa diagonal (detrás) */}
      <path d="M71.21,28.79 L58,50 L71.21,71.21 L50,58 L28.79,71.21 L42,50 L28.79,28.79 L50,42 Z" fill={light} />
      {/* puntas cardinales facetadas (molinete claro/oscuro) */}
      <path d="M50,50 L50,4 L55.66,44.34 Z" fill={bright} />
      <path d="M50,50 L44.34,44.34 L50,4 Z" fill={dark} />
      <path d="M50,50 L96,50 L55.66,55.66 Z" fill={bright} />
      <path d="M50,50 L55.66,44.34 L96,50 Z" fill={dark} />
      <path d="M50,50 L50,96 L44.34,55.66 Z" fill={bright} />
      <path d="M50,50 L55.66,55.66 L50,96 Z" fill={dark} />
      <path d="M50,50 L4,50 L44.34,44.34 Z" fill={bright} />
      <path d="M50,50 L44.34,55.66 L4,50 Z" fill={dark} />
    </svg>
  )
}
