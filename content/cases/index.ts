import type { CaseDoc } from './types'
import { casesEs } from './es'
import { casesEn } from './en'

export type { CaseDoc, QA, Decision, StackItem, Application } from './types'

const byLocale: Record<'es' | 'en', CaseDoc[]> = {
  es: casesEs,
  en: casesEn,
}

export function getAllCases(locale: 'es' | 'en'): CaseDoc[] {
  return byLocale[locale]
}

export function getCase(locale: 'es' | 'en', slug: string): CaseDoc | undefined {
  return byLocale[locale].find((c) => c.slug === slug)
}

export function getCaseSlugs(): string[] {
  return casesEs.map((c) => c.slug)
}
