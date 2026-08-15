// Modelo de un "documento de caso": la unidad de autoridad del plan GEO (ago-2026).
// Regla editorial NO negociable: sin nombres de cliente, sin nombres de producto propio,
// sin dominios — se describe la CAPACIDAD y el sector, nunca la marca.

export interface QA {
  q: string
  a: string
}

export interface Decision {
  title: string
  body: string
}

export interface StackItem {
  name: string
  role: string
}

export interface Application {
  sector: string
  use: string
}

export interface CaseDoc {
  slug: string
  /** Etapa declarada honestamente: 'production' (default si se omite) o 'pilot'.
   * Los pilotos se muestran como "En piloto" — nunca inflar a producción. */
  stage?: 'production' | 'pilot'
  // --- Hub card (tarjeta en /cases) ---
  industry: string
  tagline: string
  cardProblem: string
  cardResult: string
  techTerms: string[]
  infraTerms: string[]
  // --- Página de detalle ---
  kicker: string // eyebrow sobre el H1
  title: string // H1 (apunta a la búsqueda comercial)
  seoTitle: string
  seoDescription: string
  lede: string // párrafo de apertura, respuesta-primero
  context: string[] // "El contexto": párrafos
  solutionIntro: string[] // "Cómo funciona": párrafos
  decisions: Decision[] // decisiones de ingeniería con opinión
  stack: StackItem[]
  businessIntro: string
  outcomes: string[]
  applications: Application[]
  faq: QA[]
  related: string[] // slugs de casos relacionados
}
