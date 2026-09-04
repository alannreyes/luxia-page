import { NextResponse } from 'next/server'

// Proxy server-side al colector GLM (red interna Docker). Cachea ~30s.
export const revalidate = 30

export async function GET() {
  try {
    const r = await fetch('http://luxia-glm:8000/strikes', { next: { revalidate: 30 } })
    if (!r.ok) throw new Error('collector')
    const d = await r.json()
    return NextResponse.json(d, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=180' },
    })
  } catch {
    return NextResponse.json({ updatedAt: Date.now(), windowMin: 15, count: 0, strikes: [] })
  }
}
