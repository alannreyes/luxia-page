import dynamic from 'next/dynamic'
import { getServerDictionary, type PageParams } from '@/lib/i18n'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

// Lazy load components below the fold for better performance
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const Proof = dynamic(() => import('@/components/Proof'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const Insights = dynamic(() => import('@/components/Insights'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div className="h-48 bg-gray-50 animate-pulse" />
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />
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
        <section id="servicios">
          <Services locale={resolvedParams.locale} dictionary={dictionary} />
        </section>
        <section id="casos-reales">
          <Proof locale={resolvedParams.locale} dictionary={dictionary} />
        </section>
        <section id="insights">
          <Insights locale={resolvedParams.locale} dictionary={dictionary} />
        </section>
        <section id="contacto">
          <CTA locale={resolvedParams.locale} dictionary={dictionary} />
        </section>
      </main>
      <Footer locale={resolvedParams.locale} dictionary={dictionary} />
    </>
  )
}
