import dynamic from 'next/dynamic'
import { getServerDictionary, type PageParams } from '@/lib/i18n'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

// Lazy load components below the fold for better performance
const TargetAudience = dynamic(() => import('@/components/TargetAudience'), {
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />
})
const ServicesSummary = dynamic(() => import('@/components/ServicesSummary'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
})
const Founder = dynamic(() => import('@/components/Founder'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64 bg-slate-900 animate-pulse" />
})

interface HomeProps {
  params: Promise<PageParams>
}

export default async function Home({ params }: HomeProps) {
  const resolvedParams = await params
  const dictionary = await getServerDictionary(resolvedParams.locale)

  return (
    <>
      <Navigation locale={resolvedParams.locale} dictionary={dictionary} />
      <main>
        <section id="hero">
          <Hero locale={resolvedParams.locale} dictionary={dictionary} />
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
        <section id="contacto">
          <CTA locale={resolvedParams.locale} dictionary={dictionary} />
        </section>
      </main>
      <Footer locale={resolvedParams.locale} dictionary={dictionary} />
    </>
  )
}
