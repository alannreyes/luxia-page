'use client'
import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Frame = { date: string; v: (number | null)[] }
type Data = { source: string; latMin: number; lonMin: number; dLat: number; dLon: number; nLat: number; nLon: number; frames: Frame[] }
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// escala extendida hasta ~+5° porque la anomalía costera está en máximos (+4..+6): así se ve gradación, no un rojo plano
function rgba(a: number): [number, number, number, number] {
  if (a >= 5.0) return [124, 22, 72, 222]   // magenta oscuro (extremo)
  if (a >= 4.0) return [153, 27, 27, 214]   // rojo muy oscuro
  if (a >= 3.0) return [200, 30, 34, 204]
  if (a >= 2.5) return [225, 45, 45, 194]
  if (a >= 2.0) return [236, 94, 20, 182]
  if (a >= 1.5) return [246, 132, 22, 170]
  if (a >= 1.0) return [247, 168, 20, 156]
  if (a >= 0.5) return [250, 204, 21, 138]
  if (a >= -0.5) return [255, 255, 255, 10]
  if (a >= -1.0) return [125, 211, 252, 138]
  if (a >= -1.5) return [56, 189, 248, 158]
  return [2, 132, 199, 186]
}
function phase(a: number | null, es: boolean) {
  if (a == null) return null
  if (a >= 1.7) return { t: es ? 'Aguas muy cálidas · alerta El Niño Costero' : 'Very warm waters · Coastal El Niño alert', c: '#ef4444' }
  if (a >= 1.0) return { t: es ? 'Aguas cálidas · vigilancia El Niño' : 'Warm waters · El Niño watch', c: '#f97316' }
  if (a >= 0.4) return { t: es ? 'Ligeramente cálido' : 'Slightly warm', c: '#f59e0b' }
  if (a <= -1.0) return { t: es ? 'Aguas frías · La Niña' : 'Cold waters · La Niña', c: '#38bdf8' }
  if (a <= -0.4) return { t: es ? 'Ligeramente frío' : 'Slightly cold', c: '#7dd3fc' }
  return { t: es ? 'Condiciones normales' : 'Normal conditions', c: '#22c55e' }
}
function fmtDate(iso: string | null, locale: 'es' | 'en') {
  if (!iso) return ''
  try { return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: '2-digit' }).format(new Date(iso)) } catch { return '' }
}
// oleaje: ruido marrón grave + vaivén lento (LFO). Devuelve el gain maestro (volumen = visibilidad × severidad).
function buildSwell(ctx: AudioContext): GainNode {
  const len = Math.floor(ctx.sampleRate * 2)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2 }
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 560; lp.Q.value = 0.6
  const swell = ctx.createGain(); swell.gain.value = 0.55
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.11 // ~9s por ola
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.4
  lfo.connect(lfoGain); lfoGain.connect(swell.gain)
  const master = ctx.createGain(); master.gain.value = 0.0001
  src.connect(lp); lp.connect(swell); swell.connect(master); master.connect(ctx.destination)
  src.start(); lfo.start()
  return master
}
// zonas de riesgo EN TIERRA (impacto documentado según la fase). El tamaño del símbolo = intensidad.
const ZONES: { lat: number; lon: number; kind: 'coast' | 'sierra' }[] = [
  { lat: -6.5, lon: -78.3, kind: 'coast' },   // norte del Perú, tierra adentro (sobre el verde, no el litoral)
  { lat: -14.5, lon: -70.5, kind: 'sierra' }, // sierra sur (Andes, Cusco/Puno)
]
function rainSVG(color: string, size: number) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" style="display:block"><path d="M6.5 14.5a4 4 0 0 1 .6-7.96 5.2 5.2 0 0 1 10 1.2A3.6 3.6 0 0 1 17 14.5" fill="${color}" fill-opacity="0.28"/><line x1="8" y1="17" x2="6.8" y2="20.5"/><line x1="12" y1="17.5" x2="10.8" y2="21.5"/><line x1="16" y1="17" x2="14.8" y2="20.5"/></svg>`
}
function sunSVG(color: string, size: number) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" style="display:block"><circle cx="12" cy="12" r="4.4" fill="${color}" fill-opacity="0.32"/><line x1="12" y1="1.5" x2="12" y2="4.5"/><line x1="12" y1="19.5" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="4.5" y2="12"/><line x1="19.5" y1="12" x2="22.5" y2="12"/><line x1="4.6" y1="4.6" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.4" y2="19.4"/><line x1="4.6" y1="19.4" x2="6.7" y2="17.3"/><line x1="17.3" y1="6.7" x2="19.4" y2="4.6"/></svg>`
}
type RiskState = { active: boolean; symbol?: 'rain' | 'sun'; color?: string; label?: string; sev?: number }
function riskState(kind: 'coast' | 'sierra', c: number, es: boolean): RiskState {
  const warm = c >= 0.4, cold = c <= -0.4
  if (kind === 'coast') {
    if (warm) return { active: true, symbol: 'rain', color: '#38bdf8', label: es ? 'Más lluvia · huaicos' : 'More rain · landslides', sev: Math.min(1, (c - 0.4) / 3.6) }
    if (cold) return { active: true, symbol: 'sun', color: '#f59e0b', label: es ? 'Seco' : 'Dry', sev: Math.min(1, (-c - 0.4) / 1.6) }
    return { active: false }
  }
  if (warm) return { active: true, symbol: 'sun', color: '#f59e0b', label: es ? 'Sequía' : 'Drought', sev: Math.min(1, (c - 0.4) / 3.6) }
  if (cold) return { active: true, symbol: 'rain', color: '#38bdf8', label: es ? 'Más lluvia' : 'More rain', sev: Math.min(1, (-c - 0.4) / 1.6) }
  return { active: false }
}

export default function OceanBand({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const es = locale === 'es'
  const mapEl = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const fieldsRef = useRef<HTMLCanvasElement[]>([])
  const gridRef = useRef<Data | null>(null)
  const idxRef = useRef(0)
  const audioRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const armedRef = useRef(false)
  const visibleRef = useRef(false)
  const coastRef = useRef(0)
  const [date, setDate] = useState<string | null>(null)
  const [coast, setCoast] = useState<number | null>(null)
  const [fi, setFi] = useState(0)
  const [sound, setSound] = useState(false)
  const [nino, setNino] = useState<{ rankPeru?: { v: number; label: string; isNow: boolean }[]; rankGlobal?: { v: number; label: string; isNow: boolean }[] } | null>(null)
  const playingRef = useRef(true)      // pausa manual
  const holdUntilRef = useRef(0)       // retención automática en "hoy" (timestamp fin)
  const [playing, setPlaying] = useState(true)

  // volumen del oleaje = (armado y visible) × severidad de la anomalía costera
  const applyGain = () => {
    const ctx = audioRef.current, m = masterRef.current
    if (!ctx || !m) return
    const on = armedRef.current && visibleRef.current
    const sev = Math.max(0, Math.min(1, (coastRef.current + 1) / 6)) // −1..+5 → 0..1
    const target = on ? 0.02 + sev * 0.12 : 0
    m.gain.setTargetAtTime(target, ctx.currentTime, 0.6)
  }
  const toggleSound = () => {
    if (!audioRef.current) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        audioRef.current = ctx; masterRef.current = buildSwell(ctx)
      } catch { /* noop */ }
    }
    audioRef.current?.resume?.()
    armedRef.current = !armedRef.current; setSound(armedRef.current); applyGain()
    if (armedRef.current) window.dispatchEvent(new CustomEvent('lux-audio', { detail: 'ocean' })) // apaga las tormentas
  }
  const togglePlay = () => {
    playingRef.current = !playingRef.current
    holdUntilRef.current = 0            // al reanudar, cancela cualquier retención pendiente
    setPlaying(playingRef.current)
  }
  // exclusividad: si se enciende OTRO audio (tormentas), este se apaga
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'ocean' && armedRef.current) { armedRef.current = false; setSound(false); applyGain() }
    }
    window.addEventListener('lux-audio', onOther)
    return () => window.removeEventListener('lux-audio', onOther)
  }, [])


  useEffect(() => {
    let cancelled = false
    let onResize: (() => void) | null = null
    let observer: IntersectionObserver | null = null
    let timer: ReturnType<typeof setInterval> | null = null
    let raf = 0

    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !mapEl.current || !cvRef.current) return

      const map = L.map(mapEl.current, {
        center: [-6, -102], zoom: 3.4, minZoom: 2, maxZoom: 8,
        zoomControl: true, attributionControl: false,
        dragging: true, doubleClickZoom: true, touchZoom: true, boxZoom: true, keyboard: true,
        scrollWheelZoom: false, zoomSnap: 0.25, fadeAnimation: false, zoomAnimation: false,
      })
      mapRef.current = map

      const tiles = token
        ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${token}`
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      L.tileLayer(tiles, { tileSize: 512, zoomOffset: -1, className: 'lux-tiles', crossOrigin: true }).addTo(map)

      const cv = cvRef.current, ctx = cv.getContext('2d')!
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      // dibuja el fotograma cur, opcionalmente fundiéndose desde prev (crossfade blend 0→1)
      const drawField = (curIdx: number, prevIdx: number, blend: number) => {
        const g = gridRef.current, cur = fieldsRef.current[curIdx]
        const w = mapEl.current!.clientWidth, h = mapEl.current!.clientHeight
        ctx.clearRect(0, 0, w, h)
        if (!g || !cur) return
        const latTop = g.latMin + (g.nLat - 1) * g.dLat + g.dLat / 2
        const latBot = g.latMin - g.dLat / 2
        const lonL = g.lonMin - g.dLon / 2
        const lonR = g.lonMin + (g.nLon - 1) * g.dLon + g.dLon / 2
        const tl = map.latLngToContainerPoint([latTop, lonL])
        const br = map.latLngToContainerPoint([latBot, lonR])
        const dw = br.x - tl.x, dh = br.y - tl.y
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
        const prev = fieldsRef.current[prevIdx]
        if (prev && blend < 1 && prevIdx !== curIdx) { ctx.globalAlpha = 1; ctx.drawImage(prev, tl.x, tl.y, dw, dh) }
        ctx.globalAlpha = (prev && blend < 1 && prevIdx !== curIdx) ? blend : 1
        ctx.drawImage(cur, tl.x, tl.y, dw, dh)
        ctx.globalAlpha = 1
      }
      const redraw = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; drawField(idxRef.current, idxRef.current, 1) }) }
      const size = () => {
        const w = mapEl.current!.clientWidth, h = mapEl.current!.clientHeight
        cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        drawField(idxRef.current, idxRef.current, 1)
      }
      onResize = size; window.addEventListener('resize', size); map.on('resize', size)
      map.on('move zoomend viewreset', redraw)
      map.whenReady(() => { map.invalidateSize(); size() })
      setTimeout(() => { map.invalidateSize(); size() }, 150)
      observer = new IntersectionObserver((es) => {
        const vis = es.some((e) => e.isIntersecting)
        visibleRef.current = vis; applyGain() // oleaje suena solo cuando la banda está a la vista
        if (vis) { map.invalidateSize(); redraw() }
      }, { threshold: 0.15 })
      observer.observe(mapEl.current)

      const coastAt = (g: Data, fr: Frame) => {
        let sum = 0, n = 0
        for (let i = 0; i < g.nLat; i++) {
          const lat = g.latMin + i * g.dLat
          if (lat < -10 || lat > 0) continue
          for (let j = 0; j < g.nLon; j++) {
            const lon = g.lonMin + j * g.dLon
            if (lon < -90 || lon > -80) continue
            const a = fr.v[i * g.nLon + j]
            if (a != null) { sum += a; n++ }
          }
        }
        return n ? Math.round((sum / n) * 10) / 10 : null
      }

      try {
        const g: Data = await (await fetch('/api/sst')).json()
        if (cancelled || !g?.frames?.length) return
        gridRef.current = g

        // NÚMERO AUTORITATIVO (OISST 1991-2020) desde /api/nino; el heatmap CRW es solo visual.
        let canon: { frames?: { date: string; n12: number }[]; rankPeru?: []; rankGlobal?: [] } | null = null
        try { canon = await (await fetch('/api/nino')).json() } catch { /* fallback a CRW */ }
        if (!cancelled && canon) setNino(canon as never)
        const canonN12 = (isoDate: string): number | null => {
          if (!canon?.frames?.length) return null
          const ft = Date.parse(isoDate); let best = canon.frames[0], bd = Infinity
          for (const cf of canon.frames) { const dd = Math.abs(Date.parse(cf.date) - ft); if (dd < bd) { bd = dd; best = cf } }
          return best.n12
        }

        // pre-renderizar cada día a un canvas chico (norte arriba)
        const fields: HTMLCanvasElement[] = []
        const coasts: (number | null)[] = []
        for (const fr of g.frames) {
          const f = document.createElement('canvas'); f.width = g.nLon; f.height = g.nLat
          const fctx = f.getContext('2d')!
          const img = fctx.createImageData(g.nLon, g.nLat)
          for (let i = 0; i < g.nLat; i++) for (let j = 0; j < g.nLon; j++) {
            const a = fr.v[i * g.nLon + j]
            const idx = ((g.nLat - 1 - i) * g.nLon + j) * 4
            if (a == null) { img.data[idx + 3] = 0; continue }
            const [r, gr, b, al] = rgba(a); img.data[idx] = r; img.data[idx + 1] = gr; img.data[idx + 2] = b; img.data[idx + 3] = al
          }
          fctx.putImageData(img, 0, 0); fields.push(f); coasts.push(canonN12(fr.date) ?? coastAt(g, fr))
        }
        fieldsRef.current = fields

        // zonas de riesgo en tierra: símbolos que crecen con la intensidad y evolucionan con el día
        const empty = () => L.divIcon({ className: '', iconSize: [0, 0], html: '' })
        const riskMarkers = ZONES.map((z) => ({ z, m: L.marker([z.lat, z.lon], { icon: empty(), interactive: false, keyboard: false }).addTo(map) }))
        const updateRisk = (c: number) => {
          for (const { z, m } of riskMarkers) {
            const st = riskState(z.kind, c, es)
            if (!st.active) { m.setIcon(empty()); continue }
            const size = Math.round(32 + (st.sev ?? 0) * 44)
            const svg = st.symbol === 'rain' ? rainSVG(st.color!, size) : sunSVG(st.color!, size)
            const html = `<div class="lux-risk2">${svg}<span class="lux-risk2-cap" style="color:${st.color}">${st.label}</span></div>`
            m.setIcon(L.divIcon({ className: '', iconSize: [size, size + 16], iconAnchor: [size / 2, (size + 16) / 2], html }))
          }
        }

        // loop de 14 días con crossfade suave entre fotogramas (estilo Windy)
        const tick = () => {
          if (!playingRef.current) return                        // pausa manual
          if (performance.now() < holdUntilRef.current) return    // retención automática en "hoy"
          const g2 = gridRef.current!
          const prevIdx = idxRef.current
          const nextIdx = (prevIdx + 1) % g2.frames.length
          idxRef.current = nextIdx
          setDate(g2.frames[nextIdx].date); setCoast(coasts[nextIdx]); setFi(nextIdx)
          coastRef.current = coasts[nextIdx] ?? 0; applyGain() // el oleaje sube con la severidad del día
          updateRisk(coasts[nextIdx] ?? 0) // los símbolos de riesgo evolucionan con el día
          if (nextIdx === g2.frames.length - 1) holdUntilRef.current = performance.now() + 5000 // se detiene ≥5s al llegar a la fecha actual
          const start = performance.now()
          const stepFn = () => {
            const b = Math.min(1, (performance.now() - start) / 280)
            drawField(nextIdx, prevIdx, b)
            raf = b < 1 ? requestAnimationFrame(stepFn) : 0
          }
          if (raf) cancelAnimationFrame(raf)
          raf = requestAnimationFrame(stepFn)
        }
        idxRef.current = 0
        setDate(g.frames[0].date); setCoast(coasts[0]); setFi(0)
        coastRef.current = coasts[0] ?? 0; updateRisk(coasts[0] ?? 0)
        map.invalidateSize(); drawField(0, 0, 1)
        timer = setInterval(tick, 1000) // 1s por mes previo; el frame actual se retiene 5s (holdUntil)
      } catch (e) { console.error('[ocean]', e) }
    })()

    return () => {
      cancelled = true
      if (timer) clearInterval(timer)
      if (raf) cancelAnimationFrame(raf)
      if (onResize) window.removeEventListener('resize', onResize)
      if (observer) observer.disconnect()
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  const ph = phase(coast, es)
  const total = gridRef.current?.frames?.length ?? 14
  const pct = total > 1 ? (fi / (total - 1)) * 100 : 0

  return (
    <div style={{ backgroundColor: 'var(--ed-ink)' }}>
    <div className="relative w-full h-[70vh] min-h-[460px] max-h-[760px] overflow-hidden">
      <div ref={mapEl} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 pointer-events-none z-[4]" style={{ background: 'linear-gradient(180deg, rgba(6,11,20,0.62) 0%, rgba(6,11,20,0) 24%, rgba(6,11,20,0) 60%, rgba(6,11,20,0.58) 100%)' }} />
      <canvas ref={cvRef} className="absolute inset-0 pointer-events-none z-[5]" />

      <button onClick={togglePlay} aria-label={playing ? (es ? 'Pausar animación' : 'Pause animation') : (es ? 'Reanudar animación' : 'Resume animation')} title={playing ? (es ? 'Pausar' : 'Pause') : (es ? 'Reanudar' : 'Resume')}
        className="absolute top-4 right-[4.25rem] z-20 h-11 w-11 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(8,13,24,0.6)', border: '1px solid rgba(255,255,255,0.28)',
          color: '#fff', backdropFilter: 'blur(6px)', cursor: 'pointer',
          boxShadow: '0 4px 12px -4px rgba(0,0,0,0.6)', transition: 'all 0.25s ease',
        }}>
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>

      <button onClick={toggleSound} aria-label={sound ? (es ? 'Silenciar oleaje' : 'Mute waves') : (es ? 'Activar sonido' : 'Enable sound')} title={sound ? (es ? 'Silenciar' : 'Mute') : (es ? 'Activar sonido' : 'Enable sound')}
        className="absolute top-4 right-4 z-20 h-11 w-11 rounded-full flex items-center justify-center"
        style={{
          background: sound ? 'rgba(14,165,233,0.9)' : 'rgba(8,13,24,0.6)',
          border: `1px solid ${sound ? 'rgba(125,211,252,0.8)' : 'rgba(255,255,255,0.28)'}`,
          color: '#fff', backdropFilter: 'blur(6px)', cursor: 'pointer',
          boxShadow: sound ? '0 0 16px -3px rgba(14,165,233,0.8)' : '0 4px 12px -4px rgba(0,0,0,0.6)', transition: 'all 0.25s ease',
        }}>
        {sound ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      <div className="lux-monitor absolute bottom-5 left-5 sm:left-8 z-10">
        <div className="lux-monitor-live">
          <span className="lux-live-dot" />
          <span className="lux-live-label">{fi === total - 1 ? (es ? 'ÚLTIMO REPORTE' : 'LATEST REPORT') : (es ? 'EVOLUCIÓN' : 'EVOLUTION')}</span>
          {date && <span className="lux-monitor-ago" style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtDate(date, locale)} · {fi + 1}/{total}</span>}
        </div>
        <div className="lux-monitor-alert">
          <span className="lux-monitor-sev" style={{ backgroundColor: '#0ea5e9' }}>{es ? 'OCÉANO' : 'OCEAN'}</span>
          <span className="lux-monitor-title">
            {es ? 'Temperatura del mar' : 'Sea temperature'} {coast != null && <>— <b style={{ color: ph?.c }}>{coast > 0 ? `+${coast}` : coast}°</b> <span style={{ opacity: 0.6, fontWeight: 400 }}>{es ? 'costa norte' : 'north coast'}</span></>}
          </span>
        </div>
        {ph && (
          <div className="lux-monitor-alert" style={{ marginTop: 6 }}>
            <span className="lux-monitor-sev" style={{ backgroundColor: ph.c }}>{es ? 'FASE' : 'PHASE'}</span>
            <span className="lux-monitor-title" style={{ fontSize: 14 }}>{ph.t}</span>
          </div>
        )}
        <div className="lux-monitor-readings" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <div style={{ display: 'flex', height: 8, width: '100%', borderRadius: 4, overflow: 'hidden' }}>
            {['rgba(2,132,199,0.9)', 'rgba(56,189,248,0.9)', 'rgba(125,211,252,0.9)', 'rgba(255,255,255,0.5)', 'rgba(250,204,21,0.9)', 'rgba(247,168,20,0.9)', 'rgba(236,94,20,0.9)', 'rgba(225,45,45,0.95)', 'rgba(153,27,27,0.95)', 'rgba(124,22,72,0.95)'].map((c, i) => (
              <span key={i} style={{ flex: 1, background: c }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 10 }}>
            <span>−1.5°</span><span>0</span><span>+5°</span>
          </div>
          <span style={{ opacity: 0.7 }}>{es ? 'Anomalía Niño 1+2 · OISST · base 1991-2020' : 'Niño 1+2 anomaly · OISST · 1991-2020 base'}</span>
        </div>
      </div>

      <div className="lux-timeline hidden sm:block z-10">
        <div className="lux-timeline-track">
          <div className="lux-timeline-fill" style={{ width: `${pct}%` }} />
          <div className="lux-timeline-head" style={{ left: `${pct}%` }} />
        </div>
        <div className="lux-timeline-label">{es ? 'Evolución · últimos 6 meses · ' : 'Evolution · last 6 months · '}{fmtDate(date, locale)}{fi === total - 1 ? (es ? ' · hoy' : ' · today') : ''}</div>
      </div>

      <span className="absolute bottom-2 right-3 z-10 font-data text-[10px] text-white/35">{es ? 'Mapa: NOAA Coral Reef Watch (satélite) · dato: OISST 1991-2020' : 'Map: NOAA Coral Reef Watch (satellite) · data: OISST 1991-2020'}</span>
    </div>

    {nino?.rankPeru?.length ? (
      <div className="w-full px-5 sm:px-8 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{ h: es ? 'Mar frente a Perú · dónde cae hoy' : 'Sea off Peru · where today ranks', r: nino.rankPeru }, { h: es ? 'Índice global · dónde cae hoy' : 'Global index · where today ranks', r: nino.rankGlobal }].map((col, ci) => (
          <div key={ci} className="rounded-xl border p-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
            <div className="font-data text-[11px] uppercase tracking-wide mb-2" style={{ color: '#7d94a4' }}>{col.h}</div>
            <ol className="flex flex-col gap-1 font-data text-sm">
              {col.r!.map((it, i) => (
                <li key={i} className="grid items-baseline gap-2 px-2 py-1 rounded" style={{ gridTemplateColumns: '1.3rem auto 1fr', color: '#cdd8e0', ...(it.isNow ? { background: 'rgba(56,189,248,0.16)', border: '1px solid rgba(56,189,248,0.5)' } : {}) }}>
                  <span style={{ color: '#7d94a4', fontSize: 12 }}>{i + 1}</span>
                  <span style={{ fontWeight: 700, color: it.isNow ? '#7dd3fc' : '#e9f1f5' }}>+{it.v.toFixed(1)}°</span>
                  <span style={{ textAlign: 'right', fontSize: 12, color: it.isNow ? '#7dd3fc' : '#7d94a4' }}>{it.isNow ? `${es ? 'AHORA' : 'NOW'} · ${it.label}` : it.label}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
        <p className="sm:col-span-2 font-data text-[11px]" style={{ color: '#6d8798', fontStyle: 'italic' }}>{es ? 'Récord semanal OISST (NOAA) desde 1981. Solo ubica el valor de hoy — no implica que se repita lo de esos años.' : 'OISST weekly record (NOAA) since 1981. It only places today in history.'}</p>
      </div>
    ) : null}
    </div>
  )
}
