import { NextResponse } from 'next/server'

// Anomalía SST gridded de NOAA Coral Reef Watch (CoralTemp) — solo para el HEATMAP VISUAL de fondo.
// El NÚMERO autoritativo NO sale de aquí (usa base 1985-2012, corre caliente); viene de /api/nino
// (OISST 1991-2020, el estándar). Aquí traemos 6 fotogramas MENSUALES (últimos ~5 meses + actual)
// para que la animación sea mensual y homogénea, sincronizada con /api/nino.
export const dynamic = 'force-dynamic'

const BASE = 'https://oceanwatch.pifsc.noaa.gov/erddap/griddap/CRW_sst_anom_v1_0.json'
const QUERY = 'sea_surface_temperature_anomaly[last-155:31:last][(-25):20:(25)][(185):20:(290)]'
const BOXES = [
  { name: 'Niño 1+2', latN: 0, latS: -10, lonW: -90, lonE: -80 },
  { name: 'Niño 3.4', latN: 5, latS: -5, lonW: -170, lonE: -120 },
]
const TTL = 6 * 60 * 60 * 1000 // 6h

type Row = [string, number, number, number | null]
let memo: { at: number; body: unknown } | null = null

async function build() {
  const r = await fetch(`${BASE}?${encodeURIComponent(QUERY)}`, { cache: 'no-store' })
  if (!r.ok) throw new Error('erddap')
  const rows = ((await r.json()).table as { rows: Row[] }).rows
  if (!rows?.length) throw new Error('empty')

  const times = [...new Set(rows.map((x) => x[0]))].sort()
  const lats = [...new Set(rows.map((x) => x[1]))].sort((a, b) => a - b)
  const lonsRaw = [...new Set(rows.map((x) => x[2]))].sort((a, b) => a - b)
  const nLat = lats.length, nLon = lonsRaw.length
  const iLat = new Map(lats.map((v, i) => [v, i]))
  const iLon = new Map(lonsRaw.map((v, i) => [v, i]))
  const iTime = new Map(times.map((v, i) => [v, i]))
  const frames = times.map((t) => ({ date: t, v: new Array<number | null>(nLat * nLon).fill(null) }))
  for (const row of rows) {
    const f = iTime.get(row[0])!, i = iLat.get(row[1])!, j = iLon.get(row[2])!
    frames[f].v[i * nLon + j] = row[3] == null ? null : Math.round(row[3] * 100) / 100
  }
  const dLat = nLat > 1 ? lats[1] - lats[0] : 1
  const dLon = nLon > 1 ? lonsRaw[1] - lonsRaw[0] : 1
  const conv = (lon: number) => (lon > 180 ? lon - 360 : lon)
  return { source: 'NOAA Coral Reef Watch', latMin: lats[0], lonMin: conv(lonsRaw[0]), dLat, dLon, nLat, nLon, frames, boxes: BOXES }
}

export async function GET() {
  try {
    if (!memo || Date.now() - memo.at > TTL) memo = { at: Date.now(), body: await build() }
    return NextResponse.json(memo.body, { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } })
  } catch {
    if (memo) return NextResponse.json(memo.body) // sirve lo último bueno si NOAA falla
    return NextResponse.json({ source: 'NOAA Coral Reef Watch', nLat: 0, nLon: 0, frames: [] })
  }
}
