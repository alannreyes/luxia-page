import dynamic from 'next/dynamic'
import { getServerDictionary, type PageParams } from '@/lib/i18n'
import Hero from '@/components/Hero'
import MapBandLazy from '@/components/MapBandLazy'

// Lazy load components below the fold for better performance
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
      <section id="audiencia">
        <TargetAudience locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="servicios">
        <ServicesSummary locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="geo" className="px-5 sm:px-8 py-20 md:py-24" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--ed-accent)' }}>
            {isSpanish ? 'Inteligencia geoespacial · datos en vivo' : 'Geospatial intelligence · live data'}
          </p>
          <h2 className="font-editorial font-bold text-3xl md:text-5xl tracking-[-0.02em] mb-4" style={{ color: 'var(--ed-ink)' }}>
            {isSpanish ? 'Decisiones sobre el terreno, en tiempo real' : 'Decisions on the ground, in real time'}
          </h2>
          <p className="text-lg max-w-2xl mb-8" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish
              ? 'Cruzamos datos geoespaciales, clima y activos para que la operación decida en el momento — no al día siguiente.'
              : 'We cross geospatial, weather and asset data so operations decide in the moment — not the next day.'}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-[0_30px_60px_-24px_rgba(15,27,45,0.25)]" style={{ border: '1px solid var(--ed-line)' }}>
            <MapBandLazy />
          </div>
        </div>
      </section>
      <section id="fundador">
        <Founder locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
      <section id="contacto">
        <CTA locale={resolvedParams.locale} dictionary={dictionary} />
      </section>
    </>
  )
}
