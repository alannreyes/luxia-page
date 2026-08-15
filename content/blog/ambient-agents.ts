// Tercer artículo de /insights. Tesis del copiloto comercial: agentes ambientales —
// IA que asiste en el momento sin ser invocada. Hermano editorial del caso
// /cases/realtime-sales-copilot. Bilingüe autocontenido, fecha fija.

import type { BlogPost, BlogSource } from './the-70-percent-wall'

const sourcesEn: BlogSource[] = [
  {
    title: 'Stream RAG: Instant and Accurate Spoken Dialogue Systems with Streaming Tool Usage',
    publisher: 'arXiv',
    url: 'https://arxiv.org/abs/2510.02044',
  },
  {
    title: 'Case: real-time sales copilot',
    publisher: 'LuxIA',
    url: 'https://luxia.us/en/cases/realtime-sales-copilot',
  },
]

const sourcesEs: BlogSource[] = [
  {
    title: 'Stream RAG: Instant and Accurate Spoken Dialogue Systems with Streaming Tool Usage',
    publisher: 'arXiv',
    url: 'https://arxiv.org/abs/2510.02044',
  },
  {
    title: 'Caso: copiloto comercial en tiempo real',
    publisher: 'LuxIA',
    url: 'https://luxia.us/es/cases/realtime-sales-copilot',
  },
]

const bodyEn = `
Every AI tool you use today waits for you to ask. You open the chat, you type the question, you read the answer. That interaction model — the chatbot — has become so universal that it is easy to mistake it for the only one. But the most interesting AI systems being built right now invert it completely: they listen to the context you are already in, decide for themselves whether they have something worth saying, and stay silent the rest of the time.

That category has a name: **ambient agents**. And after building one — a sales copilot that listens to live video calls and whispers cues only the salesperson can see — we think it is the interaction model that will matter most for real work. Not because it is more impressive than a chatbot, but because of a simple observation: the moments where help is most valuable are exactly the moments where you cannot stop to ask for it.

## The cost of asking

Think about what a chatbot actually demands from you. You must notice that you need help, formulate the question, switch context to another window, type, wait, read, and return. In a quiet moment at your desk, that cost is trivial. In the middle of a negotiation, a live call, a surgery, an incident response — the moments where the right fact at the right time changes the outcome — that cost is prohibitive. Stopping to ask is the same as not asking.

So the assistance either arrives on its own, or it does not arrive at all. That is the entire case for ambient agents in one sentence.

## Three decisions that make or break an ambient agent

Building one taught us that the hard problems are not where we expected. Transcribing audio in real time is a solved problem; large language models are astonishingly good. The difficulty is entirely in the *judgment layer* — the part that decides when to act. Three design decisions ended up mattering more than any model choice.

**First: silence is a feature.** An assistant that interrupts constantly does not get turned off because it is wrong — it gets turned off because it is exhausting. We measure our copilot on trigger precision: the right card, at the right moment, and nothing the rest of the time. Every intervention it *doesn't* make is part of the product. This is the exact opposite of a chatbot, which answers every single time you ask.

**Second: suggest intentions, not scripts.** When the system detects an opening, it suggests *"→ ask about last season's losses"* — never the full sentence to read aloud. A person reading sounds like a robot; a person reminded of the right point sounds like an expert. This distinction seems small and is everything: it keeps the human being the one who performs, with the machine as memory rather than mouth.

**Third: the knowledge has to be yours.** An ambient agent that answers with what anyone can google is a novelty. Ours consults the company's own knowledge first — product sheets, competitive comparisons, the account's history — and only complements with the web. The agent's value is exactly the value of the private knowledge behind it. That is also, not coincidentally, what makes it defensible as a product.

## The engineering shape

Under the hood, the pattern that works is a **two-tier judge**. A fast, cheap model watches the transcript continuously and answers a single question: is this moment worth acting on? Only when the answer is yes does a more capable model retrieve, reason and write the cue. Run everything through the big model and you get chatbot latency in a context that cannot tolerate it; run everything through the small one and the cues are not worth showing. Recent research formalizes a version of this — retrieving in parallel *while the other person is still talking*, with a judge deciding whether to search or stay quiet — and our production experience matches it: the gatekeeper architecture is what makes conversation-speed assistance economically and technically viable.

There is also an invisible requirement that no benchmark captures: the assistance must be private. In our copilot, the overlay is excluded from screen capture at the operating-system level, so the salesperson can share their screen and the cues remain theirs alone. An ambient agent the other party can see is not an assistant — it is a liability.

## Where this goes

Sales calls are one instance of a much larger pattern: any situation where an expert performs live and the knowledge that would help them exists but is not reachable in the moment. Support agents with the knowledge base in their ear. Insurance brokers with the policy details surfacing as the client asks. Interviewers with the candidate's file and the right next question in sight. Field technicians, emergency coordinators, teachers.

The chatbot decade taught everyone to go to the AI. The next one, we think, is about AI that comes to you — precisely, briefly, and only when it has earned the interruption.
`.trim()

const bodyEs = `
Toda herramienta de IA que usas hoy espera a que preguntes. Abres el chat, escribes la pregunta, lees la respuesta. Ese modelo de interacción — el chatbot — se volvió tan universal que es fácil confundirlo con el único posible. Pero los sistemas de IA más interesantes que se están construyendo ahora lo invierten por completo: escuchan el contexto en el que ya estás, deciden por sí mismos si tienen algo que valga la pena decir, y se quedan callados el resto del tiempo.

Esa categoría tiene nombre: **agentes ambientales**. Y después de construir uno — un copiloto comercial que escucha videollamadas en vivo y sopla ayudas que solo el vendedor ve — creemos que es el modelo de interacción que más va a importar para el trabajo real. No porque sea más impresionante que un chatbot, sino por una observación simple: los momentos donde la ayuda vale más son exactamente los momentos donde no puedes detenerte a pedirla.

## El costo de preguntar

Piensa en lo que un chatbot realmente te exige. Tienes que darte cuenta de que necesitas ayuda, formular la pregunta, cambiar de contexto a otra ventana, escribir, esperar, leer y volver. En un momento tranquilo frente al escritorio, ese costo es trivial. En medio de una negociación, una llamada en vivo, una cirugía, la respuesta a un incidente — los momentos donde el dato correcto a tiempo cambia el resultado — ese costo es prohibitivo. Detenerse a preguntar equivale a no preguntar.

Así que la asistencia llega sola, o no llega. Ese es todo el argumento de los agentes ambientales en una frase.

## Tres decisiones que hacen o deshacen un agente ambiental

Construir uno nos enseñó que los problemas difíciles no estaban donde esperábamos. Transcribir audio en tiempo real es un problema resuelto; los modelos de lenguaje son asombrosamente buenos. La dificultad está por completo en la *capa de juicio* — la parte que decide cuándo actuar. Tres decisiones de diseño terminaron importando más que cualquier elección de modelo.

**Primera: callar es una función.** Un asistente que interrumpe todo el tiempo no se apaga porque se equivoque — se apaga porque cansa. Nuestro copiloto se mide por la precisión del disparo: la tarjeta correcta, en el momento correcto, y nada el resto del tiempo. Cada intervención que *no* hace es parte del producto. Es exactamente lo contrario de un chatbot, que responde todas las veces que le preguntas.

**Segunda: sugerir intenciones, no guiones.** Cuando el sistema detecta una oportunidad, sugiere *"→ pregunta por las pérdidas de la última campaña"* — nunca la frase completa para leer en voz alta. Una persona leyendo suena a robot; una persona a la que le recordaron el punto correcto suena a experto. La distinción parece pequeña y lo es todo: mantiene al humano como el que ejecuta, con la máquina de memoria y no de boca.

**Tercera: el conocimiento tiene que ser tuyo.** Un agente ambiental que responde con lo que cualquiera puede googlear es una curiosidad. El nuestro consulta primero el conocimiento propio de la empresa — fichas de producto, comparativas contra la competencia, la historia de la cuenta — y solo complementa con la web. El valor del agente es exactamente el valor del conocimiento privado que tiene detrás. Y eso, no por casualidad, es también lo que lo vuelve defendible como producto.

## La forma de la ingeniería

Por debajo, el patrón que funciona es un **juez de dos niveles**. Un modelo rápido y barato observa la transcripción de forma continua y responde una sola pregunta: ¿este momento amerita actuar? Solo cuando la respuesta es sí, un modelo más capaz recupera información, razona y redacta la ayuda. Si todo pasa por el modelo grande, obtienes latencia de chatbot en un contexto que no la tolera; si todo pasa por el chico, las ayudas no valen la pena. La investigación reciente formaliza una versión de esto — recuperar información en paralelo *mientras la otra persona todavía habla*, con un juez que decide si buscar o callar — y nuestra experiencia en producción coincide: la arquitectura de portero es lo que hace viable, técnica y económicamente, asistir a velocidad de conversación.

Hay además un requisito invisible que ningún benchmark captura: la asistencia debe ser privada. En nuestro copiloto, el overlay está excluido de la captura de pantalla a nivel del sistema operativo, de modo que el vendedor puede compartir su pantalla y las ayudas siguen siendo solo suyas. Un agente ambiental que la otra parte puede ver no es un asistente — es un problema.

## Hacia dónde va esto

Las llamadas de ventas son una instancia de un patrón mucho más grande: cualquier situación donde un experto ejecuta en vivo y el conocimiento que lo ayudaría existe, pero no está alcanzable en el momento. Agentes de soporte con la base de conocimiento en el oído. Corredores de seguros con el detalle de la póliza apareciendo mientras el cliente pregunta. Entrevistadores con la ficha del candidato y la siguiente pregunta correcta a la vista. Técnicos de campo, coordinadores de emergencia, docentes.

La década del chatbot nos enseñó a todos a ir hacia la IA. La que viene, creemos, es de la IA que viene hacia ti — precisa, breve, y solo cuando se ganó la interrupción.
`.trim()

export const ambientAgents: BlogPost = {
  slug: 'ambient-agents',
  datePublished: '2026-08-15',
  dateModified: '2026-08-15',
  en: {
    title: 'Ambient Agents: AI That Assists Without Being Asked',
    description:
      'Chatbots wait for your question. Ambient agents listen to the context you are in, act only when they have something worth saying, and stay silent the rest of the time. What we learned building one for live sales calls.',
    excerpt:
      'The moments where help is most valuable are exactly the moments where you cannot stop to ask for it. That is the entire case for ambient agents.',
    topic: 'AI Agents',
    readingTime: '6 min read',
    body: bodyEn,
    faq: [
      {
        q: 'What is an ambient agent?',
        a: 'An AI system that assists without being invoked: it observes the context you are already in (a call, a document, an operation), decides on its own whether it has something valuable to contribute at that moment, and stays silent otherwise. The chatbot waits for your question; the ambient agent earns its interruptions.',
      },
      {
        q: 'How is an ambient agent different from a chatbot?',
        a: 'Three ways: initiative (it acts on context rather than waiting for a prompt), brevity (glanceable cues instead of paragraphs), and restraint (staying quiet is a core feature, measured as trigger precision). A chatbot answers every question; an ambient agent intervenes only when the moment justifies it.',
      },
      {
        q: 'What makes an ambient agent technically feasible in real time?',
        a: 'A two-tier architecture: a fast, inexpensive model continuously judges whether the moment is worth acting on, and only then does a more capable model retrieve information and write the cue. Retrieval runs in parallel while the conversation continues, which keeps latency at conversation speed instead of chatbot speed.',
      },
      {
        q: 'Where do ambient agents apply beyond sales calls?',
        a: 'Any live expert performance where useful knowledge exists but is unreachable in the moment: customer support, insurance and financial advisory, interviews and recruiting, field technicians, incident response. If stopping to search breaks the task, an ambient agent fits.',
      },
    ],
    sources: sourcesEn,
  },
  es: {
    title: 'Agentes ambientales: la IA que asiste sin que le preguntes',
    description:
      'Los chatbots esperan tu pregunta. Los agentes ambientales escuchan el contexto en el que estás, actúan solo cuando tienen algo que valga la pena decir, y callan el resto del tiempo. Lo que aprendimos construyendo uno para llamadas de ventas en vivo.',
    excerpt:
      'Los momentos donde la ayuda vale más son exactamente los momentos donde no puedes detenerte a pedirla. Ese es todo el argumento de los agentes ambientales.',
    topic: 'Agentes de IA',
    readingTime: '6 min de lectura',
    body: bodyEs,
    faq: [
      {
        q: '¿Qué es un agente ambiental?',
        a: 'Un sistema de IA que asiste sin ser invocado: observa el contexto en el que ya estás (una llamada, un documento, una operación), decide por sí mismo si tiene algo valioso que aportar en ese momento, y calla el resto del tiempo. El chatbot espera tu pregunta; el agente ambiental se gana sus interrupciones.',
      },
      {
        q: '¿En qué se diferencia un agente ambiental de un chatbot?',
        a: 'En tres cosas: iniciativa (actúa por contexto en vez de esperar un prompt), brevedad (ayudas de un vistazo en vez de párrafos) y contención (callar es una función central, medida como precisión del disparo). Un chatbot responde todas las preguntas; un agente ambiental interviene solo cuando el momento lo justifica.',
      },
      {
        q: '¿Qué hace viable a un agente ambiental en tiempo real?',
        a: 'Una arquitectura de dos niveles: un modelo rápido y barato juzga continuamente si el momento amerita actuar, y solo entonces un modelo más capaz recupera información y redacta la ayuda. La búsqueda corre en paralelo mientras la conversación sigue, lo que mantiene la latencia a velocidad de conversación y no de chatbot.',
      },
      {
        q: '¿Dónde aplican los agentes ambientales más allá de las ventas?',
        a: 'En cualquier ejecución experta en vivo donde el conocimiento útil existe pero no está alcanzable en el momento: soporte al cliente, asesoría de seguros y finanzas, entrevistas y reclutamiento, técnicos de campo, respuesta a incidentes. Si detenerse a buscar rompe la tarea, un agente ambiental encaja.',
      },
    ],
    sources: sourcesEs,
  },
}
