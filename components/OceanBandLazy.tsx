'use client'
import dynamic from 'next/dynamic'

const OceanBand = dynamic(() => import('./OceanBand'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] min-h-[460px] max-h-[760px] animate-pulse" style={{ backgroundColor: 'var(--ed-ink)' }} />
  ),
})

export default function OceanBandLazy({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  return <OceanBand locale={locale} />
}
