import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/content/blog/posts'
import { getCaseSlugs } from '@/content/cases'

// DIETA DEL SITEMAP (ago-2026, plan GEO/sitelinks): antes listaba ~206 páginas hoja de
// learning/cooking (94% del sitemap) y Google indexaba 30 de 691 — el sitio se leía como
// "recetas y tutoriales" en vez de estudio de IA, diluyendo a /services, /cases e /insights
// (los candidatos a sitelinks de marca). Las hojas SIGUEN publicadas y enlazadas desde sus
// hubs (Google puede rastrearlas); solo salen del sitemap para que la señal priorice el
// núcleo del negocio. Si algún día el contenido educativo es la apuesta SEO, revertir con git.

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luxia.us'
  // Fecha fija de última edición real (no la hora del build): mover SOLO cuando
  // se edite contenido de verdad. Evita que cada deploy marque las 213 URLs como
  // "actualizadas ahora" y Google deje de confiar en el <lastmod>.
  const lastModified = new Date('2026-07-28')

  const routes: MetadataRoute.Sitemap = [
    // ===== PÁGINAS PRINCIPALES =====
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },

    // ===== SERVICES PAGE =====
    {
      url: `${baseUrl}/es/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== CASES INDEX =====
    {
      url: `${baseUrl}/es/cases`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/cases`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== INSIGHTS (BLOG) =====
    {
      url: `${baseUrl}/es/insights`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/insights`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== LEARNING INDEX =====
    {
      url: `${baseUrl}/es/learning`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/learning`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== COOKING INDEX =====
    {
      url: `${baseUrl}/es/cooking`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/cooking`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // ===== ARTÍCULOS DE INSIGHTS (n x 2 idiomas) =====
  getAllSlugs().forEach((slug) => {
    routes.push({
      url: `${baseUrl}/es/insights/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    routes.push({
      url: `${baseUrl}/en/insights/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // ===== CASOS DOCUMENTADOS (9 x 2 idiomas) — publicados 15-ago-2026 =====
  const casesLastModified = new Date('2026-08-15')
  getCaseSlugs().forEach((slug) => {
    routes.push({
      url: `${baseUrl}/es/cases/${slug}`,
      lastModified: casesLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    routes.push({
      url: `${baseUrl}/en/cases/${slug}`,
      lastModified: casesLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Las páginas hoja de learning/cooking quedan FUERA del sitemap a propósito (ver nota
  // arriba): siguen enlazadas desde sus hubs /es/learning y /es/cooking.

  return routes
}
