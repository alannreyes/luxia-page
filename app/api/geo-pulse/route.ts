import { NextResponse } from 'next/server'

// Datos reales en vivo (clima + temperatura del mar) para la banda geoespacial.
// Fuente: Open-Meteo (gratis, sin API key). Se cachea y revalida cada hora.
export const revalidate = 3600

type Pt = { name: string; lat: number; lng: number }

// Puntos genéricos sobre Perú — costa, sierra y sur
const POINTS: Pt[] = [
  { name: 'Lima', lat: -12.046, lng: -77.043 },
  { name: 'Trujillo', lat: -8.112, lng: -79.029 },
  { name: 'Arequipa', lat: -16.409, lng: -71.537 },
  { name: 'Cusco', lat: -13.532, lng: -71.967 },
  { name: 'Ilo', lat: -17.64, lng: -70.935 },
]

// Punto marino frente a la costa central (señal de El Niño Costero: temperatura del mar)
const SEA = { lat: -12.2, lng: -77.25 }

async function getJson(url: string) {
  const r = await fetch(url, { next: { revalidate } })
  if (!r.ok) throw new Error(`upstream ${r.status}`)
  return r.json()
}

function ensoStatus(a: number): string {
  if (a >= 2.0) return 'El Niño fuerte'
  if (a >= 1.0) return 'El Niño moderado'
  if (a >= 0.5) return 'El Niño'
  if (a <= -0.5) return 'La Niña'
  return 'Neutral'
}

// Anomalía oficial de temperatura del mar en la región Niño 1+2 (El Niño Costero, frente a Perú).
// Fuente NOAA CPC (ERSSTv5). Best-effort; si falla devolvemos null y el panel usa el SST en vivo.
async function getElNino(): Promise<{ anom: number; status: string } | null> {
  try {
    const r = await fetch('https://www.cpc.ncep.noaa.gov/data/indices/ersst5.nino.mth.91-20.ascii', {
      next: { revalidate: 86400 },
    })
    if (!r.ok) return null
    const txt = await r.text()
    const rows = txt.trim().split('\n').filter((l) => /^\s*\d{4}\s/.test(l))
    if (!rows.length) return null
    // Columnas: YR MON NINO1+2 ANOM NINO3 ANOM NINO4 ANOM NINO3.4 ANOM  → ANOM 1+2 = índice 3
    const cols = rows[rows.length - 1].trim().split(/\s+/).map(Number)
    const anom = cols[3]
    if (!Number.isFinite(anom)) return null
    const a = Math.round(anom * 10) / 10
    return { anom: a, status: ensoStatus(a) }
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const lats = POINTS.map((p) => p.lat).join(',')
    const lngs = POINTS.map((p) => p.lng).join(',')

    // Clima actual multi-punto
    const wx = await getJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}` +
        `&current=temperature_2m,wind_speed_10m,weather_code&timezone=America%2FLima`
    )
    const arr = Array.isArray(wx) ? wx : [wx]

    // Temperatura del mar en la costa (best-effort; si falla, seguimos sin ella)
    let sstCoast: number | null = null
    try {
      const marine = await getJson(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${SEA.lat}&longitude=${SEA.lng}` +
          `&current=sea_surface_temperature&timezone=America%2FLima`
      )
      const s = marine?.current?.sea_surface_temperature
      if (typeof s === 'number') sstCoast = Math.round(s * 10) / 10
    } catch {
      /* opcional */
    }

    const points = POINTS.map((p, i) => {
      const c = arr[i]?.current ?? {}
      return {
        name: p.name,
        lat: p.lat,
        lng: p.lng,
        temp: typeof c.temperature_2m === 'number' ? Math.round(c.temperature_2m) : null,
        wind: typeof c.wind_speed_10m === 'number' ? Math.round(c.wind_speed_10m) : null,
        code: typeof c.weather_code === 'number' ? c.weather_code : null,
      }
    })

    const elNino = await getElNino()

    return NextResponse.json(
      { updatedAt: new Date().toISOString(), sstCoast, elNino, points },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
    )
  } catch {
    // Nunca romper la página: devolvemos vacío y el mapa cae a su estado base
    return NextResponse.json({ updatedAt: null, sstCoast: null, elNino: null, points: [] }, { status: 200 })
  }
}
