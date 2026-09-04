'use client'
import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Strike = { lat: number; lon: number; e: number; t: number; px: number; py: number }

const LIFE = 15 * 1000            // vida visible de cada rayo: pop + fade suave de ~15s (no 5s seco de Windy, no 12 min)
const DELAY = 3 * 60 * 1000       // diferido: reproducimos ~3 min atrás del tiempo real
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

// Chasquido eléctrico corto y discreto: transiente resonante + brillo variable por rayo.
// Volumen bajo a propósito → al superponerse varios rayos arma una textura de tormenta, sin reventar el oído.
function crackle(ctx: AudioContext, energy: number) {
  const t = ctx.currentTime
  const dur = 0.035 + energy * 0.05                       // 35–85 ms
  const buf = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * dur)), ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) { const k = 1 - i / d.length; d[i] = (Math.random() * 2 - 1) * k * k } // decaimiento agudo
  const src = ctx.createBufferSource(); src.buffer = buf
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'
  bp.frequency.value = 2200 + energy * 2800 + (Math.random() * 700 - 350) // brillo variable → textura
  bp.Q.value = 4 + energy * 7                              // resonante = "eléctrico"
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 850
  const g = ctx.createGain()
  const vol = 0.09 + energy * 0.24                          // audible pero discreto (el filtro resonante baja el pico ~6×)
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(bp); bp.connect(hp); hp.connect(g); g.connect(ctx.destination); src.start(t)
}

export default function MapBand({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const es = locale === 'es'
  const mapEl = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const strikesRef = useRef<Strike[]>([])
  const frontRef = useRef(0)          // reloj de reproducción (avanza en tiempo real, diferido)
  const soundQRef = useRef<number[]>([]) // cola de energías de rayos recién revelados (para el zap)
  const lastZapRef = useRef(0)
  const soundRef = useRef(false)
  const audioRef = useRef<AudioContext | null>(null)
  const visRef = useRef(true) // banda a la vista (para callar el chasquido al bajar al océano)
  const [sound, setSound] = useState(false)
  const [count, setCount] = useState(0)
  const [clock, setClock] = useState('')

  // Reloj vivo = hora REAL del dato en pantalla (diferido ~3 min). Zona horaria local del visitante.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    const tick = () => setClock(fmt.format(new Date(Date.now() - DELAY)).replace(',', ' ·'))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let cancelled = false
    let raf = 0
    let poll: ReturnType<typeof setInterval> | undefined
    let onResize: (() => void) | undefined
    let visObserver: IntersectionObserver | null = null

    const zap = (energy: number) => { if (audioRef.current) crackle(audioRef.current, energy) }

    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !mapEl.current || !cvRef.current) return

      let center: [number, number] = [-10, -62], zoom = 3.4
      try {
        const g = await (await fetch('/api/geo')).json()
        if (Array.isArray(g.center)) { center = g.center; zoom = g.zoom || zoom }
      } catch { /* default */ }

      const map = L.map(mapEl.current, {
        center, zoom, minZoom: 2, maxZoom: 9,
        zoomControl: true, attributionControl: false,
        dragging: true, doubleClickZoom: true, touchZoom: true, boxZoom: true, keyboard: true,
        scrollWheelZoom: false, // no atrapar el scroll de la página
        zoomSnap: 0.25, fadeAnimation: false, zoomAnimation: false, // zoom instantáneo: el overlay de rayos no "nada"
      })
      mapRef.current = map

      const tiles = token
        ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token=${token}`
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      L.tileLayer(tiles, { tileSize: 512, zoomOffset: -1, className: 'lux-tiles', crossOrigin: true }).addTo(map)

      const cv = cvRef.current, ctx = cv.getContext('2d')!
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // sprite de brillo precomputado (drawImage es mucho más rápido que crear gradientes por frame)
      const spr = document.createElement('canvas'); spr.width = spr.height = 64
      const sc = spr.getContext('2d')!
      const sg = sc.createRadialGradient(32, 32, 0, 32, 32, 32)
      sg.addColorStop(0, 'rgba(215,232,255,1)')
      sg.addColorStop(0.4, 'rgba(95,145,255,0.55)')
      sg.addColorStop(1, 'rgba(37,64,255,0)')
      sc.fillStyle = sg; sc.fillRect(0, 0, 64, 64)
      const project = () => {
        for (const s of strikesRef.current) {
          const p = map.latLngToContainerPoint([s.lat, s.lon])
          s.px = p.x; s.py = p.y
        }
      }
      // conteo = rayos dentro del área visible (cambia al hacer zoom / mover)
      const recount = () => {
        const b = map.getBounds()
        let n = 0
        for (const s of strikesRef.current) if (b.contains([s.lat, s.lon])) n++
        setCount(n)
      }
      const size = () => {
        const w = mapEl.current!.clientWidth, h = mapEl.current!.clientHeight
        cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        project()
      }
      onResize = size; window.addEventListener('resize', size); map.on('resize', size)
      map.on('move zoomend viewreset', project) // mantener los rayos pegados al mapa al arrastrar/hacer zoom
      map.on('moveend zoomend', recount)         // el número sigue al área visible
      visObserver = new IntersectionObserver((es) => { visRef.current = es.some((e) => e.isIntersecting) }, { threshold: 0.12 })
      visObserver.observe(mapEl.current)
      setTimeout(size, 60)

      const load = async () => {
        try {
          const d = await (await fetch('/api/strikes')).json()
          if (!Array.isArray(d?.strikes)) return
          const arr: Strike[] = d.strikes.map((s: number[]) => ({ lat: s[0], lon: s[1], e: s[2], t: s[3], px: 0, py: 0 }))
          arr.sort((a, b) => a.t - b.t) // cronológico
          strikesRef.current = arr
          project()
          recount()
        } catch { /* noop */ }
      }
      await load()
      poll = setInterval(load, 30000)

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const draw = () => {
        const w = cv.width / dpr, h = cv.height / dpr
        ctx.clearRect(0, 0, w, h)
        const pn = Date.now() - DELAY            // reloj de reproducción (diferido)
        if (frontRef.current === 0) frontRef.current = pn - 1  // 1er frame: lo anterior es "historia" (sin tormenta de flashes)
        const prevFront = frontRef.current

        // rayos recién revelados (≥0.72) → chasquidos que se superponen en textura
        if (soundRef.current && visRef.current && !reduce) {
          for (const s of strikesRef.current) if (s.t > prevFront && s.t <= pn && s.e >= 0.72) soundQRef.current.push(s.e)
          if (soundQRef.current.length > 8) soundQRef.current.splice(0, soundQRef.current.length - 8)
          const nowMs = Date.now()
          if (soundQRef.current.length && nowMs - lastZapRef.current > 70) { zap(soundQRef.current.shift()!); lastZapRef.current = nowMs }
        } else {
          soundQRef.current.length = 0
        }
        frontRef.current = pn

        for (const s of strikesRef.current) {
          if (s.t > pn) continue                 // aún no "cae" (diferido)
          const age = pn - s.t
          if (age > LIFE || s.px < -30 || s.py < -30 || s.px > w + 30 || s.py > h + 30) continue
          const birth = Math.max(0, 1 - age / 700)          // destello al aparecer
          const alpha = Math.pow(Math.max(0, 1 - age / LIFE), 1.8) * 0.9  // fade progresivo (ease-out), no corte seco
          const baseR = (1.4 + s.e * 5) * (1 + birth * 1.7)
          const glow = baseR + 5 + s.e * 12 + birth * 16
          ctx.globalAlpha = Math.min(1, 0.65 * alpha + birth * 0.6)
          ctx.drawImage(spr, s.px - glow, s.py - glow, glow * 2, glow * 2)
          if (alpha > 0.1 || birth > 0) {
            ctx.globalAlpha = Math.min(1, alpha + birth)
            ctx.fillStyle = '#ffffff'
            ctx.beginPath(); ctx.arc(s.px, s.py, Math.max(0.6, baseR * 0.5), 0, Math.PI * 2); ctx.fill()
          }
        }
        ctx.globalAlpha = 1
        if (!reduce) raf = requestAnimationFrame(draw)
      }
      if (reduce) draw(); else raf = requestAnimationFrame(draw)
    })()

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      if (poll) clearInterval(poll)
      if (onResize) window.removeEventListener('resize', onResize)
      if (visObserver) visObserver.disconnect()
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [])

  // exclusividad: si se enciende OTRO audio (océano), este se apaga
  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== 'storms' && soundRef.current) { soundRef.current = false; setSound(false) }
    }
    window.addEventListener('lux-audio', onOther)
    return () => window.removeEventListener('lux-audio', onOther)
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) {
      try { audioRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)() } catch { /* noop */ }
    }
    const ctx = audioRef.current
    soundRef.current = !soundRef.current; setSound(soundRef.current)
    if (ctx && soundRef.current) {
      window.dispatchEvent(new CustomEvent('lux-audio', { detail: 'storms' })) // apaga el océano
      ctx.resume?.().then(() => { crackle(ctx, 0.9); lastZapRef.current = Date.now() }).catch(() => {})
    }
  }


  return (
    <div className="relative w-full h-[70vh] min-h-[460px] max-h-[760px] overflow-hidden" style={{ backgroundColor: 'var(--ed-ink)' }}>
      <div ref={mapEl} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 pointer-events-none z-[4]" style={{ background: 'linear-gradient(180deg, rgba(6,11,20,0.62) 0%, rgba(6,11,20,0) 24%, rgba(6,11,20,0) 60%, rgba(6,11,20,0.58) 100%)' }} />
      <canvas ref={cvRef} className="absolute inset-0 pointer-events-none z-[5]" />

      <button onClick={toggleSound} aria-label={sound ? (es ? 'Silenciar rayos' : 'Mute lightning') : (es ? 'Activar sonido de rayos' : 'Enable lightning sound')} title={sound ? (es ? 'Silenciar' : 'Mute') : (es ? 'Activar sonido' : 'Enable sound')}
        className="absolute top-4 right-4 z-20 h-11 w-11 rounded-full flex items-center justify-center"
        style={{
          background: sound ? 'rgba(37,64,255,0.9)' : 'rgba(8,13,24,0.6)',
          border: `1px solid ${sound ? 'rgba(140,165,255,0.8)' : 'rgba(255,255,255,0.28)'}`,
          color: '#fff', backdropFilter: 'blur(6px)', cursor: 'pointer',
          boxShadow: sound ? '0 0 16px -3px rgba(37,64,255,0.8)' : '0 4px 12px -4px rgba(0,0,0,0.6)',
          transition: 'all 0.25s ease',
        }}>
        {sound ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>

      <div className="lux-monitor absolute bottom-5 left-5 sm:left-8 z-10">
        <div className="lux-monitor-live">
          <span className="lux-live-dot" />
          <span className="lux-live-label">{es ? 'EN VIVO' : 'LIVE'}</span>
          {clock && <span className="lux-monitor-ago" style={{ fontVariantNumeric: 'tabular-nums' }}>{clock}</span>}
        </div>
        <div className="lux-monitor-alert">
          <span className="lux-monitor-sev" style={{ backgroundColor: '#a855f7' }}>{es ? 'RAYOS' : 'LIGHTNING'}</span>
          <span className="lux-monitor-title">
            {es ? 'Actividad eléctrica' : 'Lightning activity'} — <b style={{ color: '#c4b5fd' }}>{count.toLocaleString(locale)}</b> <span style={{ opacity: 0.6, fontWeight: 400 }}>{es ? 'descargas · 15 min' : 'strikes · 15 min'}</span>
          </span>
        </div>
        <div className="lux-monitor-readings">
          <span>{es ? 'Rayos en vivo' : 'Live lightning'}</span>
        </div>
      </div>

      <span className="absolute bottom-2 right-3 z-10 font-data text-[10px] text-white/35">{es ? '© Mapbox · rayos por satélite en vivo' : '© Mapbox · live satellite lightning'}</span>
    </div>
  )
}
