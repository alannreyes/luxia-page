'use client'
import dynamic from 'next/dynamic'

const MapBand = dynamic(() => import('./MapBand'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] md:h-[500px] animate-pulse" style={{ backgroundColor: 'var(--ed-paper-2)' }} />
  ),
})

export default function MapBandLazy() {
  return <MapBand />
}
