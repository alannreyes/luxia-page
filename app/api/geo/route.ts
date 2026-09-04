import { NextResponse } from 'next/server'

// Centro aproximado por IP (referencial, sin pedir permiso). Se limita a la
// cobertura de GOES-19 (Américas); fuera de ahí, vista continental por defecto.
export const dynamic = 'force-dynamic'

const AM = { latMin: -55, latMax: 58, lonMin: -138, lonMax: -32 }

export async function GET(req: Request) {
  const xff = req.headers.get('x-forwarded-for') || ''
  const ip = xff.split(',')[0].trim()
  let center: [number, number] = [-10, -62]
  let zoom = 3.4 // vista Américas por defecto

  try {
    if (ip && !/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|127\.|::1|fc|fd)/.test(ip)) {
      const g = await fetch(`https://ipapi.co/${ip}/json/`, { signal: AbortSignal.timeout(3000) })
      if (g.ok) {
        const j = await g.json()
        const la = Number(j.latitude), lo = Number(j.longitude)
        if (Number.isFinite(la) && Number.isFinite(lo) && la >= AM.latMin && la <= AM.latMax && lo >= AM.lonMin && lo <= AM.lonMax) {
          center = [la, lo]; zoom = 5
        }
      }
    }
  } catch { /* fallback a vista Américas */ }

  return NextResponse.json({ center, zoom })
}
