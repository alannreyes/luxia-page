// Insight de /insights alineado al caso ATS (cluster pilar↔satélite): responde una pregunta
// real de un gerente de GDH y enlaza al caso `ai-recruiting-ats`. Respuesta-primero + FAQ.
// Fuente primaria verificada: Hidden Workers: Untapped Talent (Harvard Business School + Accenture, 2021).

import type { BlogPost, BlogSource } from './the-70-percent-wall'

const sourcesEs: BlogSource[] = [
  {
    title: 'Hidden Workers: Untapped Talent (Joseph Fuller et al.)',
    publisher: 'Harvard Business School + Accenture, 2021',
    url: 'https://www.hks.harvard.edu/centers/mrcbg/programs/growthpolicy/look-inside-hidden-workers-untapped-talent-joseph-fuller',
  },
  {
    title: 'ATS con IA: leer todos los CVs y rankear con criterio, no con keywords (caso)',
    publisher: 'luxIA',
    url: 'https://luxia.us/es/cases/ai-recruiting-ats',
  },
]

const sourcesEn: BlogSource[] = [
  {
    title: 'Hidden Workers: Untapped Talent (Joseph Fuller et al.)',
    publisher: 'Harvard Business School + Accenture, 2021',
    url: 'https://www.hks.harvard.edu/centers/mrcbg/programs/growthpolicy/look-inside-hidden-workers-untapped-talent-joseph-fuller',
  },
  {
    title: 'AI ATS: read every CV and rank with judgment, not keywords (case)',
    publisher: 'luxIA',
    url: 'https://luxia.us/en/cases/ai-recruiting-ats',
  },
]

const bodyEs = `
Tu ATS descarta buenos candidatos porque filtra por **coincidencia exacta de palabras**, no por lo que la persona sabe hacer. Si alguien describió la misma experiencia con otras palabras —o su CV tenía un formato que el sistema no supo leer— queda fuera antes de que un humano lo vea. El estudio de Harvard Business School y Accenture lo cuantifica sin rodeos: **el 88% de los empleadores admite que su sistema rechaza candidatos calificados** por no calzar exactamente los criterios. La salida no es un filtro más fino: es **leer y entender cada CV por su significado**.

## El costo oculto: 27 millones de personas

El informe *Hidden Workers: Untapped Talent* encuestó a más de 8,000 trabajadores clasificados como "ocultos" por los sistemas automáticos y a más de 2,250 ejecutivos en EE.UU., Reino Unido y Alemania. Su hallazgo central es incómodo: hay millones de personas con las habilidades para cubrir vacantes abiertas que **nunca llegan a un reclutador humano** porque un filtro las eliminó antes. No es un problema de talento escaso; es un problema de criterios rígidos.

## Por qué falla el filtro por palabra clave

El filtro clásico evalúa lo que es fácil de contar —años exactos en un cargo, un título específico, densidad de una palabra— en lugar de la capacidad real de hacer el trabajo. Tres fallas típicas:

- **Sinónimos e idioma.** "Atención al cliente" y "servicio al usuario" son lo mismo para una persona, pero no para un filtro literal. El buen candidato que eligió otra palabra desaparece.
- **Errores de lectura del CV.** Un formato con columnas, tablas o un PDF escaneado se parsea mal y el sistema lo puntúa como incompleto — descartando a alguien por su plantilla, no por su perfil.
- **Trayectorias no lineales.** Quien cambió de rubro o creció por un camino distinto es justo el perfil que el filtro por palabras castiga más.

## Entender por significado, no por palabras

La alternativa es dejar de buscar palabras y empezar a buscar **significado**. Cada CV se convierte en una representación de lo que la persona es capaz de hacer —material, uso, sinónimos técnicos, sector— y se compara con lo que el puesto realmente necesita. Así aparecen candidatos que calzan aunque no compartan ni una palabra con la convocatoria. Y algo igual de importante: se pueden **leer todos los CVs**, no una muestra filtrada de antemano.

## Ranking explicado, no caja negra

Entender no basta si el resultado es un número sin razón. Un buen sistema entrega un **ranking argumentado**: por qué cada candidato está donde está, con citas del propio CV. Eso cambia el trabajo del reclutador —de descartar por formato a decidir con evidencia— y mantiene una línea que no se debe cruzar: **la IA acerca y explica; la decisión final es del comité.** Bien hecho, además reduce el sesgo del filtro rígido en vez de amplificarlo, porque deja de premiar la redacción y empieza a valorar la capacidad.

## Nosotros lo construimos

No es teoría. Construimos exactamente esto para procesos reales: cada CV leído y estructurado por IA, y un ranking explicado sobre el pool completo. Los detalles de ingeniería —embeddings, curación del texto antes de vectorizar, requisitos explícitos— están en [el caso completo](/es/cases/ai-recruiting-ats).
`

const bodyEn = `
Your ATS rejects good candidates because it filters by **exact keyword match**, not by what the person can actually do. If someone described the same experience with different words — or their CV had a layout the system couldn't parse — they're out before a human ever sees them. The Harvard Business School and Accenture study puts a number on it: **88% of employers admit their system rejects qualified candidates** for not matching the criteria exactly. The fix isn't a finer filter: it's **reading and understanding every CV by meaning**.

## The hidden cost: 27 million people

*Hidden Workers: Untapped Talent* surveyed more than 8,000 workers classified as "hidden" by automated systems and over 2,250 executives across the U.S., U.K. and Germany. Its core finding is uncomfortable: millions of people who have the skills to fill open roles **never reach a human recruiter** because a filter removed them first. It isn't a talent-scarcity problem; it's a rigid-criteria problem.

## Why keyword filtering fails

The classic filter scores what's easy to count — exact years in a title, a specific degree, keyword density — instead of the real ability to do the job. Three typical failures:

- **Synonyms and language.** "Customer service" and "user support" mean the same to a person, not to a literal filter. The good candidate who picked another word vanishes.
- **CV parsing errors.** A layout with columns, tables, or a scanned PDF parses badly and the system scores it as incomplete — discarding someone for their template, not their profile.
- **Non-linear careers.** Whoever switched fields or grew a different way is exactly the profile keyword filters punish most.

## Understand meaning, not words

The alternative is to stop searching for words and start searching for **meaning**. Each CV becomes a representation of what the person can do — material, use, technical synonyms, sector — and is compared to what the role truly needs. Candidates who fit surface even when they share not a single word with the posting. And just as important: you can **read every CV**, not a pre-filtered sample.

## Explained ranking, not a black box

Understanding isn't enough if the output is a number with no reason. A good system delivers an **argued ranking**: why each candidate sits where they do, with quotes from their own CV. That changes the recruiter's job — from discarding by format to deciding with evidence — and keeps one line that must not be crossed: **AI narrows and explains; the final decision is the committee's.** Done right, it also reduces the rigid filter's bias instead of amplifying it, because it stops rewarding wording and starts valuing capability.

## We built it

This isn't theory. We built exactly this for real processes: every CV read and structured by AI, and an explained ranking over the full pool. The engineering details — embeddings, cleaning the text before vectorizing, explicit requirements — are in [the full case](/en/cases/ai-recruiting-ats).
`

export const atsDescartaBuenosCandidatos: BlogPost = {
  slug: 'ats-descarta-buenos-candidatos',
  datePublished: '2026-09-03',
  dateModified: '2026-09-03',
  es: {
    title: '¿Por qué tu ATS descarta buenos candidatos? El problema de los filtros por palabra clave',
    description:
      'El 88% de los empleadores admite que su ATS rechaza candidatos calificados por no calzar exacto las palabras. Por qué pasa, y cómo leer y entender cada CV por su significado.',
    excerpt:
      'Los filtros por palabra clave descartan buenos candidatos por un detalle de redacción o de formato. Qué dice el estudio de Harvard/Accenture y qué hace distinto entender por significado.',
    topic: 'Reclutamiento con IA',
    readingTime: '6 min de lectura',
    body: bodyEs,
    faq: [
      {
        q: '¿Un ATS con IA puede leer TODOS los CVs de una vacante?',
        a: 'Sí. En lugar de filtrar por palabras clave antes de mirar, cada CV se lee y se estructura, y luego se rankea el pool completo por significado. Nadie queda fuera por un detalle de formato o de redacción.',
      },
      {
        q: '¿La IA decide a quién contratar?',
        a: 'No. La IA acerca a los que realmente calzan y explica por qué; la decisión final es del comité de selección. Es una herramienta de evidencia, no un juez.',
      },
      {
        q: '¿Entender por significado no amplifica el sesgo?',
        a: 'Bien diseñado, lo reduce: deja de premiar la redacción y el formato —donde vive buena parte del sesgo del filtro rígido— y valora la capacidad, con un ranking explicable que el humano puede auditar.',
      },
      {
        q: '¿Reemplaza a mi ATS o a mi sistema de planilla actual?',
        a: 'No necesariamente. Se puede usar como capa de lectura y ranking sobre tu proceso actual, y convive con tu sistema administrativo (planilla, asistencia) en vez de reemplazarlo.',
      },
    ],
    sources: sourcesEs,
  },
  en: {
    title: 'Why Does Your ATS Reject Good Candidates? The Keyword-Filter Problem',
    description:
      '88% of employers admit their ATS rejects qualified candidates for not matching keywords exactly. Why it happens, and how to read and understand every CV by meaning.',
    excerpt:
      'Keyword filters discard good candidates over a wording or formatting detail. What the Harvard/Accenture study says, and what understanding by meaning does differently.',
    topic: 'AI recruiting',
    readingTime: '6 min read',
    body: bodyEn,
    faq: [
      {
        q: 'Can an AI ATS read EVERY CV for a role?',
        a: 'Yes. Instead of filtering by keywords before looking, every CV is read and structured, then the full pool is ranked by meaning. No one is dropped over a formatting or wording detail.',
      },
      {
        q: 'Does the AI decide who to hire?',
        a: 'No. The AI narrows to those who truly fit and explains why; the final decision is the selection committee’s. It is an evidence tool, not a judge.',
      },
      {
        q: 'Doesn’t understanding by meaning amplify bias?',
        a: 'Done right, it reduces it: it stops rewarding wording and formatting — where much of the rigid filter’s bias lives — and values capability, with an explainable ranking a human can audit.',
      },
      {
        q: 'Does it replace my current ATS or payroll system?',
        a: 'Not necessarily. It can work as a reading-and-ranking layer over your current process, and coexists with your administrative system (payroll, attendance) rather than replacing it.',
      },
    ],
    sources: sourcesEn,
  },
}
