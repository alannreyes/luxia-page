import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import FAQ from '@/components/FAQ'
import ArticleContent from '@/components/ArticleContent'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { getPost, getAllSlugs } from '@/content/blog/posts'
import { Clock, ArrowRight, ExternalLink } from 'lucide-react'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const p = post[locale as 'es' | 'en']

  const imageUrl = post.ogImage ? `https://luxia.us${post.ogImage}` : undefined
  const url = `https://luxia.us/${locale}/insights/${slug}`

  return {
    title: `${p.title} | luxIA Insights`,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      siteName: 'luxIA',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      ...(imageUrl && { images: [{ url: imageUrl, width: 1280, height: 720, alt: p.title }] }),
    },
    ...(imageUrl && {
      twitter: {
        card: 'summary_large_image',
        title: p.title,
        description: p.description,
        images: [imageUrl],
      },
    }),
    alternates: {
      canonical: url,
      languages: {
        'es-ES': `https://luxia.us/es/insights/${slug}`,
        'en-US': `https://luxia.us/en/insights/${slug}`,
      },
    },
  }
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params
  const locale = rawLocale as 'es' | 'en'
  const isSpanish = locale === 'es'
  const post = getPost(slug)

  if (!post) notFound()

  const p = post[locale]
  const url = `https://luxia.us/${locale}/insights/${slug}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { '@type': 'Organization', name: 'LuxIA' },
    publisher: {
      '@type': 'Organization',
      name: 'LuxIA',
      logo: { '@type': 'ImageObject', url: 'https://luxia.us/logo.png' },
    },
    articleSection: p.topic,
    keywords: p.topic,
    mainEntityOfPage: url,
    inLanguage: locale,
  }

  const videoJsonLd = post.videoId
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: p.title,
        description: p.description,
        uploadDate: post.datePublished,
        thumbnailUrl: `https://i.ytimg.com/vi/${post.videoId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${post.videoId}`,
        publisher: {
          '@type': 'Organization',
          name: 'LuxIA',
          logo: { '@type': 'ImageObject', url: 'https://luxia.us/logo.png' },
        },
      }
    : null

  return (
    <div style={{ backgroundColor: 'var(--ed-paper)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {videoJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      )}

      <Breadcrumbs
        items={[
          { name: isSpanish ? 'Inicio' : 'Home', url: `https://luxia.us/${locale}` },
          { name: 'Insights', url: `https://luxia.us/${locale}/insights` },
          { name: p.title, url },
        ]}
      />

      {/* Header del artículo */}
      <section className="px-5 sm:px-8 pt-4 pb-10 md:pt-6" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-accent)' }}>
            {p.topic}
          </p>
          <h1 className="font-editorial font-extrabold tracking-[-0.03em] leading-[1.02] text-3xl md:text-5xl mb-6" style={{ color: 'var(--ed-ink)' }}>
            {p.title}
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{ color: 'var(--ed-gray)' }}>
            {p.description}
          </p>
          <div className="flex items-center gap-4 font-data text-xs pt-5" style={{ color: 'var(--ed-gray)', borderTop: '1px solid var(--ed-line)' }}>
            <span>LuxIA</span>
            <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
            <time dateTime={post.datePublished}>{post.datePublished}</time>
            <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {p.readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* Video del episodio (si ya está publicado) */}
      {post.videoId && (
        <section className="px-5 sm:px-8 pb-6" style={{ backgroundColor: 'var(--ed-paper)' }}>
          <YouTubeEmbed videoId={post.videoId} title={p.title} />
        </section>
      )}

      {/* Cuerpo del artículo */}
      <section className="px-5 sm:px-8 pb-6" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <ArticleContent content={p.body} />
      </section>

      {/* Fuentes — capa 3 de /citable: citar y enlazar la fuente primaria */}
      <section className="px-5 sm:px-8 pb-16 md:pb-24" style={{ backgroundColor: 'var(--ed-paper)' }}>
        <div className="max-w-3xl mx-auto pt-8" style={{ borderTop: '1px solid var(--ed-line)' }}>
          <p className="font-data text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--ed-gray)' }}>
            {isSpanish ? 'Fuentes' : 'Sources'}
          </p>
          <ul className="space-y-3">
            {p.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 group"
                  style={{ color: 'var(--ed-ink)' }}
                >
                  <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--ed-accent)' }} />
                  <span>
                    <span className="font-medium group-hover:underline">{s.title}</span>
                    <span className="font-data text-xs block" style={{ color: 'var(--ed-gray)' }}>{s.publisher}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ
        eyebrow={isSpanish ? 'Preguntas frecuentes' : 'FAQ'}
        title={isSpanish ? 'Preguntas frecuentes sobre este análisis' : 'Frequently asked questions about this research'}
        items={p.faq.map((f) => ({ q: f.q, a: f.a }))}
      />

      {/* CTA de cierre — mismo bloque de tinta que services/cases, sin endurecer el tono */}
      <section className="py-16 md:py-24 px-5 sm:px-8 text-white" style={{ backgroundColor: 'var(--ed-ink)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-editorial text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-6">
            {isSpanish ? '¿Ya viste este muro de cerca?' : 'Have you hit this wall yourself?'}
          </h2>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto">
            {isSpanish
              ? 'Cuéntanos en qué punto se estancó tu proyecto — sin costo ni compromiso.'
              : 'Tell us where your project stalled — no cost, no commitment.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}#contacto`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full bg-white font-medium hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
              style={{ color: 'var(--ed-ink)' }}
            >
              {isSpanish ? 'Contactar' : 'Contact Us'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`/${locale}/insights`}
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-full font-medium transition-colors w-full sm:w-auto border border-white/20 text-white hover:bg-white/10"
            >
              {isSpanish ? 'Más Insights' : 'More Insights'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
