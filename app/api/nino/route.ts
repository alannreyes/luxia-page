import { NextResponse } from 'next/server'

// Dataset CANÓNICO de El Niño para luxia.us — la MISMA fuente que solvayu.com, para que el dato sea idéntico.
// OISST semanal por región Niño, base climatológica 1991-2020 (el estándar oficial NOAA/CPC).
//   https://www.cpc.ncep.noaa.gov/data/indices/wksst9120.for
// Emite: current (última semana) + frames (actual + 5 previos espaciados mensualmente) + top-5 histórico.
// El número autoritativo sale de aquí; el heatmap (CRW satélite) es solo fondo visual.
export const dynamic = 'force-dynamic'

const URL = 'https://www.cpc.ncep.noaa.gov/data/indices/wksst9120.for'
const MON = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
const MON_ES = ['ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic']
const ERSST = 'https://www.cpc.ncep.noaa.gov/data/indices/ersst5.nino.mth.91-20.ascii'
const TTL = 6 * 60 * 60 * 1000
let memo: { at: number; body: unknown } | null = null

// ICEN oficial (ENFEN): media móvil CENTRADA de 3 meses de la anomalía ERSSTv5 Niño 1+2 (base 1991-2020).
function icenCat(v: number): string {
  if (v >= 3.0) return 'Cálida Extraordinaria'
  if (v >= 1.7) return 'Cálida Fuerte'
  if (v >= 1.0) return 'Cálida Moderada'
  if (v >= 0.4) return 'Cálida Débil'
  if (v > -0.4) return 'Neutra'
  if (v > -1.0) return 'Fría Débil'
  if (v > -1.4) return 'Fría Moderada'
  return 'Fría Fuerte'
}
async function getIcen(): Promise<{ v: number; cat: string; tri: string } | null> {
  try {
    const txt = await (await fetch(ERSST, { cache: 'no-store' })).text()
    const r: { m: number; y: number; a: number }[] = []
    for (const ln of txt.split('\n')) {
      const p = ln.trim().split(/\s+/)
      if (p.length >= 4 && /^\d{4}$/.test(p[0])) r.push({ y: +p[0], m: +p[1], a: parseFloat(p[3]) })
    }
    if (r.length < 4) return null
    const i = r.length - 2
    const v = Math.round((r[i - 1].a + r[i].a + r[i + 1].a) / 3 * 100) / 100
    const M = ['ene','feb','mar','abr','may','jun','jul','ago','set','oct','nov','dic']
    return { v, cat: icenCat(v), tri: `${M[r[i-1].m-1]}-${M[r[i].m-1]}-${M[r[i+1].m-1]} ${r[i+1].y}` }
  } catch { return null }
}

type Row = { t: number; n12: number; n34: number } // t = epoch ms
const DATE = /^\s*(\d{2})([A-Z]{3})(\d{4})/

async function fetchRows(): Promise<Row[]> {
  const r = await fetch(URL, { cache: 'no-store' })
  if (!r.ok) throw new Error('cpc')
  const text = await r.text()
  const rows: Row[] = []
  for (const line of text.split('\n')) {
    const m = DATE.exec(line)
    if (!m || !MON.includes(m[2].toUpperCase())) continue
    // OJO: anomalía negativa se pega al SST ("25.9-0.1"); separar con regex, no por espacios.
    const nums = line.slice(m[0].length).match(/-?\d+\.\d+/g)
    if (!nums || nums.length !== 8) continue
    const t = Date.UTC(parseInt(m[3], 10), MON.indexOf(m[2].toUpperCase()), parseInt(m[1], 10))
    rows.push({ t, n12: parseFloat(nums[1]), n34: parseFloat(nums[5]) }) // anom 1+2=idx1, anom 3.4=idx5
  }
  return rows
}

const lbl = (t: number) => { const d = new Date(t); return `${MON_ES[d.getUTCMonth()]} ${d.getUTCFullYear()}` }
const iso = (t: number) => new Date(t).toISOString().slice(0, 10)
function trend(s: number[]) { if (s.length < 2) return '→'; const d = s[s.length - 1] - s[0]; return d > 0.1 ? '▲' : d < -0.1 ? '▼' : '→' }
function nearest(rows: Row[], target: number) { return rows.reduce((a, b) => Math.abs(b.t - target) < Math.abs(a.t - target) ? b : a) }

function monthlyFrames(rows: Row[], months = 5) {
  const last = rows[rows.length - 1]
  const d = new Date(last.t)
  const picks: Row[] = []
  for (let k = months; k >= 1; k--) {
    const tgt = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - k, Math.min(d.getUTCDate(), 28))
    picks.push(nearest(rows, tgt))
  }
  picks.push(last)
  return picks.map((r) => ({ date: iso(r.t), label: lbl(r.t), n12: r.n12, n34: r.n34, isNow: r === last }))
}

function topPeaks(rows: Row[], key: 'n12' | 'n34', k = 5, gap = 20) {
  const order = rows.map((_, i) => i).sort((a, b) => rows[b][key] - rows[a][key])
  const chosen: number[] = []
  for (const i of order) { if (chosen.every((j) => Math.abs(i - j) >= gap)) chosen.push(i); if (chosen.length >= k) break }
  const lastI = rows.length - 1
  return chosen.map((i) => ({ v: rows[i][key], label: lbl(rows[i].t), isNow: i === lastI }))
}

async function build() {
  const rows = await fetchRows()
  if (rows.length < 30) throw new Error('insuficiente')
  const icen = await getIcen()
  const last = rows[rows.length - 1]
  const tail12 = rows.slice(-8).map((r) => r.n12)
  const tail34 = rows.slice(-8).map((r) => r.n34)
  const d = new Date(last.t)
  return {
    source: 'NOAA CPC · OISST semanal (base 1991-2020)',
    note: 'Anomalía semanal OISST, base 1991-2020. Punto actual = última semana disponible. El veredicto oficial lo declara ENFEN.',
    recordFrom: iso(rows[0].t),
    current: {
      week: iso(last.t),
      weekLabel: `semana del ${d.getUTCDate()} ${MON_ES[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
      peru: { anom: last.n12, trend: trend(tail12), history: tail12 },
      global: { anom: last.n34, trend: trend(tail34), history: tail34 },
    },
    icen, // {v, cat, tri} — índice oficial peruano, o null
    frames: monthlyFrames(rows, 5),
    rankPeru: topPeaks(rows, 'n12'),
    rankGlobal: topPeaks(rows, 'n34'),
  }
}

export async function GET() {
  try {
    if (!memo || Date.now() - memo.at > TTL) memo = { at: Date.now(), body: await build() }
    return NextResponse.json(memo.body, { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } })
  } catch {
    if (memo) return NextResponse.json(memo.body)
    return NextResponse.json({ source: 'NOAA CPC · OISST', frames: [], rankPeru: [], rankGlobal: [], current: null })
  }
}
