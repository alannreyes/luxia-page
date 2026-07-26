'use client'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Puntos genéricos (operaciones/activos) — sin nombres de cliente
const POINTS: [number, number][] = [
  [-77.043, -12.046], // Lima
  [-71.537, -16.409], // Arequipa
  [-70.935, -17.64],  // Ilo (costa sur)
  [-70.02, -15.84],   // altiplano
  [-78.52, -9.53],    // norte
]

export default function MapBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(true)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { setReady(false); return }
    if (!ref.current) return
    mapboxgl.accessToken = token

    const map = new mapboxgl.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-74.2, -13.8],
      zoom: 4.3,
      attributionControl: false,
      cooperativeGestures: true,
      projection: { name: 'mercator' },
    })

    map.on('load', () => {
      // marcadores pulsantes
      POINTS.forEach(([lng, lat]) => {
        const el = document.createElement('div')
        el.className = 'lux-marker'
        new mapboxgl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map)
      })
      // entrada suave
      map.easeTo({ center: [-73.5, -14.2], zoom: 4.7, duration: 3200 })
    })

    return () => map.remove()
  }, [])

  if (!ready) {
    // Fallback sobrio si aún no hay token configurado (p. ej. en un entorno nuevo)
    return (
      <div
        className="w-full h-[380px] md:h-[500px] flex items-center justify-center"
        style={{ backgroundColor: 'var(--ed-paper-2)' }}
        aria-label="Mapa geoespacial LuxIA"
      >
        <div className="text-center px-6">
          <div className="mx-auto mb-4 h-2.5 w-2.5 rounded-full lux-marker" />
          <p className="font-data text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--ed-gray)' }}>
            Inteligencia geoespacial
          </p>
        </div>
      </div>
    )
  }

  return <div ref={ref} className="w-full h-[380px] md:h-[500px]" aria-label="Mapa geoespacial LuxIA" />
}
