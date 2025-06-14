import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import TrustIndicators from '@/components/TrustIndicators'
import DemoPreview from '@/components/DemoPreview'
import Services from '@/components/Services'
import CaseStudies from '@/components/CaseStudies'
import Insights from '@/components/Insights'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <TrustIndicators />
        <DemoPreview />
        <Services />
        <CaseStudies />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
