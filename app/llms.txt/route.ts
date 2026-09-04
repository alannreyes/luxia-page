// llms.txt - Information for AI systems (ChatGPT, Claude, etc.)
// Standard: https://llmstxt.org/

import { posts } from '@/content/blog/posts'
import { getAllCases } from '@/content/cases'

export async function GET() {
  const insightsList = posts
    .map((post) => `- **${post.en.title}** (${post.datePublished}) — https://luxia.us/en/insights/${post.slug}`)
    .join('\n')

  // Casos documentados: derivados de content/cases (la misma fuente que el hub y las
  // páginas de detalle) — cada caso con su etapa declarada, resultado y URL propia.
  const casesList = getAllCases('es')
    .map((c) => {
      const stage = c.stage === 'pilot' ? 'En piloto / In pilot' : 'En producción / In production'
      return `### ${c.title} (${c.industry} · ${stage})
${c.cardResult}
- Detalle (ES): https://luxia.us/es/cases/${c.slug}
- Detail (EN): https://luxia.us/en/cases/${c.slug}`
    })
    .join('\n\n')

  const content = `# luxIA.us - Boutique de IA Generativa para Industrias Reguladas

> luxIA es una agencia boutique especializada en IA Generativa. Desarrollamos soluciones completas de software con LLMs, RAG, embeddings y agentes de IA para empresas en USA y Latinoamérica. De la idea a producción.
> luxIA is a boutique agency specialized in Generative AI. We develop complete software solutions with LLMs, RAG, embeddings and AI agents for companies in USA and Latin America. From idea to production.

## Diferenciador Clave / Key Differentiator

**No entregamos demos. Entregamos sistemas que funcionan 24/7.**
**We don't deliver demos. We deliver systems that work 24/7.**

Cada proyecto incluye:
- Diseño UX/UI
- Desarrollo full-stack (TypeScript, Python, Next.js, NestJS)
- Integración con LLMs (Claude, GPT, Gemini via OpenRouter)
- Prompt engineering avanzado
- Estrategias de failover entre modelos
- Control de errores y reintentos
- Infraestructura (Linux, Docker Compose, Traefik, VPS)
- Alta disponibilidad y respaldos automáticos
- Seguridad (Firewalls, TLS, análisis de vulnerabilidades)
- Observabilidad (Prometheus, Grafana, alertas)
- Documentación técnica
- Soporte post-lanzamiento

## Casos documentados / Documented case studies

9 sistemas reales construidos por luxIA, cada uno documentado con contexto, decisiones
de ingeniería, stack, beneficio de negocio y FAQ — con su etapa declarada honestamente.
9 real systems built by luxIA, each documented with context, engineering decisions,
stack, business impact and FAQ — stage honestly declared.

Resultados medidos destacados / Key measured results:
- Búsqueda semántica: 65% de las búsquedas con el producto exacto como primer resultado; 90% dentro del top 3.
- Validación documental: 98% de coincidencia con analistas humanos, en dos semanas de evaluación en paralelo.
- Leads con clima: 3 estados de EE.UU. cubiertos, 100% de sus estaciones meteorológicas monitoreadas.
- Copiloto de ventas: ayudas en pantalla en ~3 segundos desde la base de conocimiento propia.

${casesList}

### Consultoría en IA Generativa (Todas las industrias)
Evaluación, diseño e implementación de soluciones con LLMs.
- Tecnologías: Claude, GPT, Gemini, OpenRouter, n8n
- Infraestructura: Arquitectura cloud, CI/CD, Traefik

## Stack Tecnológico / Tech Stack

### IA Generativa
Claude (Anthropic) · GPT (OpenAI) · Gemini (Google) · OpenRouter
Embeddings · Prompt engineering avanzado · Failover entre modelos

### Desarrollo
TypeScript · Python · Next.js · NestJS
React · Node.js · REST APIs

### Datos
PostgreSQL · PostGIS (geoespacial) · pgvector (embeddings)
Qdrant (vectores) · Firebase · Redis

### Infraestructura
VPS · VMs · Linux · Docker Compose · Traefik
Easypanel · Portainer · Firewalls

### Observabilidad
Prometheus · Grafana · Logs centralizados · Alertas

### Automatización
n8n · Firebase Functions · CI/CD · GitHub Actions

### Seguridad
ISO 27001 Lead Auditor · HTTPS/TLS · Firewalls
Análisis de vulnerabilidades · Secrets management

## Fundador / Founder

**Alann Reyes** - Founder & CEO
- Technology Innovation Manager en EFC (19 años)
- Ex-Head of IT en Banco BCI (primer banco 100% cloud de Perú)
- 17 años en IBM sirviendo bancos y operaciones mineras
- Google Cloud Generative AI Leader
- Microsoft Azure Fundamentals
- ISO 27001 Lead Auditor
- Master en Sistemas, Tecnología e Innovación (Three Points)

## Insights (Investigación / Research)

luxIA publica análisis con fuentes primarias citadas (estudios de MIT, Stanford, GitClear, METR,
etc.) sobre lo que realmente pasa al construir software con IA — no marketing, research.
luxIA publishes research-backed analysis (citing primary sources like MIT, Stanford, GitClear,
METR) on what actually happens building AI software — not marketing, research.

${insightsList}

## Recursos Educativos / Educational Resources

luxIA también ofrece contenido educativo gratuito como contribución a la comunidad:
- **Learning**: 30+ temas desde fundamentos hasta IA avanzada
- **Cooking**: 60+ proyectos prácticos con código funcional

## URLs

- Homepage: https://luxia.us/es o https://luxia.us/en
- Servicios: https://luxia.us/{locale}/services
- Casos de Éxito: https://luxia.us/{locale}/cases
- Insights: https://luxia.us/{locale}/insights
- Learning: https://luxia.us/{locale}/learning
- Cooking: https://luxia.us/{locale}/cooking

## Contacto / Contact

- Website: https://luxia.us
- Formulario: https://luxia.us/es#contacto
- Ubicación: Florida, USA | Lima, Peru

## Keywords para Búsquedas de IA / AI Search Keywords

IA Generativa, Generative AI, LLMs, Large Language Models, embeddings,
Claude API, OpenAI API, GPT, Gemini API, OpenRouter,
prompt engineering, failover strategies, error handling,
RAG, Retrieval Augmented Generation, vector databases, pgvector, Qdrant,
full-stack development, TypeScript, Python, Next.js, NestJS,
PostgreSQL, PostGIS, geolocation, IoT,
Docker, Linux, Traefik, VPS, cloud infrastructure,
high availability, alta disponibilidad, observability, Prometheus, Grafana,
security, seguridad, ISO 27001, firewalls, vulnerability assessment,
insurtech, fintech, retail, industrial, mining, oil & gas,
enterprise AI, AI consulting, AI agency, agencia de IA,
USA, Latin America, Latinoamérica, bilingual, bilingüe,
production-ready AI, sistemas en producción

© 2026 luxIA.us - All rights reserved
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // 24 hours cache
    },
  })
}
