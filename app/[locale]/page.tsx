import dynamic from 'next/dynamic'
import { getServerDictionary, type PageParams } from '@/lib/i18n'
import Hero from '@/components/Hero'
import MapBandLazy from '@/components/MapBandLazy'
import OceanBandLazy from '@/components/OceanBandLazy'
import FAQ from '@/components/FAQ'

// Lazy load components below the fold for better performance
const BuiltGallery = dynamic(() => import('@/components/BuiltGallery'), {
  loading: () => <div className="h-96 animate-pulse" style={{ backgroundColor: 'var(--ed-paper)' }} />
})
const OwnersSection = dynamic(() => import('@/components/OwnersSection'), {
  loading: () => <div className="h-96 animate-pulse" style={{ backgroundColor: 'var(--ed-paper-2)' }} />
})
const TargetAudience = dynamic(() => import('@/components/TargetAudience'), {
  loading: () => <div className="h-64 animate-pulse" style={{ backgroundColor: 'var(--ed-paper-2)' }} />
})
const ServicesSummary = dynamic(() => import('@/components/ServicesSummary'), {
  loading: () => <div className="h-96 animate-pulse" style={{ backgroundColor: 'var(--ed-paper)' }} />
})
const Founder = dynamic(() => import('@/components/Founder'), {
  loading: () => <div className="h-96 animate-pulse" style={{ backgroundColor: 'var(--ed-paper-2)' }} />
})
const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div className="h-96 animate-pulse" style={{ backgroundColor: 'var(--ed-paper)' }} />
})

interface HomeProps {
  params: Promise<PageParams>
}

export default async function Home({ params }: HomeProps) {
  const resolvedParams = await params
  const dictionary = await getServerDictionary(resolvedParams.locale)
  const isSpanish = resolvedParams.locale === 'es'

  return (
    <>
      <section id="hero">
        <Hero locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      {/* Banda geoespacial cinematográfica · protagonista en primera pantalla */}
      <section id="geo" className="relative w-full overflow-hidden" style={{ borderTop: '1px solid var(--ed-line)', borderBottom: '1px solid var(--ed-line)' }}>
        <MapBandLazy locale={resolvedParams.locale as 'es' | 'en'} />
        {/* Título superpuesto sobre el mapa */}
        <div className="absolute inset-x-0 top-0 z-20 px-5 sm:px-8 pt-9 md:pt-12 pointer-events-none">
          <div className="max-w-6xl mx-auto">
            <p className="font-data text-xs tracking-[0.2em] uppercase mb-2.5" style={{ color: '#8fa8ff' }}>
              {isSpanish ? 'Tormentas eléctricas · en vivo' : 'Lightning storms · live'}
            </p>
            <h2
              className="font-editorial font-bold text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-white max-w-[22ch]"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
            >
              {isSpanish ? 'Dónde cae cada rayo, ahora' : 'Where every strike lands, now'}
            </h2>
            <p className="font-data text-[11px] sm:text-xs mt-2.5 text-white/55 max-w-[38ch]" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
              {isSpanish ? 'Software construido por LuxIA. Datos por satélite, sin trucos.' : 'Built by LuxIA. Live satellite data, no tricks.'}
            </p>
          </div>
        </div>
      </section>
      {/* Segunda banda viva · océano / El Niño — demostración de capacidad */}
      <section id="oceano" className="relative w-full overflow-hidden" style={{ borderBottom: '1px solid var(--ed-line)' }}>
        <OceanBandLazy locale={resolvedParams.locale as 'es' | 'en'} />
        <div className="absolute inset-x-0 top-0 z-20 px-5 sm:px-8 pt-9 md:pt-12 pointer-events-none">
          <div className="max-w-6xl mx-auto">
            <p className="font-data text-xs tracking-[0.2em] uppercase mb-2.5" style={{ color: '#7dd3fc' }}>
              {isSpanish ? 'Temperatura del mar · reporte semanal' : 'Sea temperature · weekly report'}
            </p>
            <h2 className="font-editorial font-bold text-2xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-white max-w-[24ch]" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
              {isSpanish ? 'La información real de El Niño' : 'The real data behind El Niño'}
            </h2>
            <p className="font-data text-[11px] sm:text-xs mt-2.5 text-white/55 max-w-[40ch]" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
              {isSpanish ? 'Cuánto se ha calentado el mar frente al Perú, mes a mes, según el último reporte oficial de NOAA. Otra que construimos.' : 'How much the sea off Peru has warmed, month by month, from NOAA’s latest official report. Another one we built.'}
            </p>
          </div>
        </div>
      </section>
      <section id="construido">
        <BuiltGallery locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="para-duenos">
        <OwnersSection locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="audiencia">
        <TargetAudience locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="servicios">
        <ServicesSummary locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="fundador">
        <Founder locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <FAQ
        title={isSpanish ? 'Preguntas frecuentes' : 'Frequently asked questions'}
        items={isSpanish ? [
          { q: '¿Qué es LuxIA?', a: 'LuxIA es un estudio de software AI-native. Construimos e integramos software a medida y lo llevamos a producción rápido, usando IA cuando aporta — no como titular, sino como método.' },
          { q: '¿En cuánto tiempo tienen algo en producción?', a: 'Una POC sólida en horas, escalada en días, y en producción en pocas semanas — con autenticación, seguridad y pasarela de pagos incluidas. No entregamos demos: software que opera 24/7.' },
          { q: '¿Qué tipo de IA implementan?', a: 'IA a producción: búsqueda semántica y RAG sobre tus documentos, agentes, automatización, visión por computadora y alertas — siempre autenticada, segura y probada.' },
          { q: '¿En qué industrias trabajan?', a: 'Fintech, insurtech, industria y minería, y riesgo climático/geoespacial. Experiencia real en entornos regulados y exigentes.' },
          { q: '¿Dónde están y atienden en remoto?', a: 'Estamos en Lima, Perú y EE.UU., y trabajamos en remoto para clientes en Estados Unidos, México y Latinoamérica.' },
        ] : [
          { q: 'What is LuxIA?', a: 'LuxIA is an AI-native software studio. We build and integrate custom software and take it to production fast, using AI where it adds value — as the method, not the headline.' },
          { q: 'How fast can you get to production?', a: 'A solid POC in hours, scaled in days, and in production within weeks — with authentication, security and a payment gateway included. Not demos: software that runs 24/7.' },
          { q: 'What kind of AI do you build?', a: 'Production AI: semantic search and RAG over your documents, agents, automation, computer vision and alerting — always authenticated, secured and tested.' },
          { q: 'Which industries do you serve?', a: 'Fintech, insurtech, industry and mining, and climate/geospatial risk — with real experience in regulated, high-stakes environments.' },
          { q: 'Where are you based, and do you work remotely?', a: 'We are based in Lima, Peru and the U.S., and we work remotely for clients in the United States, Mexico and Latin America.' },
        ]}
      />
      <section id="contacto">
        <CTA locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
    </>
  )
}
