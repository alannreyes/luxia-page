// Segundo artículo de /insights. Hermano del video "The Other Side of the Wall" (canal luxIA
// Insights). Mismo criterio data-driven que the-70-percent-wall.ts — bilingüe autocontenido.
// Fecha fija (no Date.now()) para que sitemap/JSON-LD no cambien en cada build.

import type { BlogPost, BlogSource } from './the-70-percent-wall'

const sourcesEn: BlogSource[] = [
  {
    title: 'The GenAI Divide: State of AI in Business 2025',
    publisher: 'MIT · Project NANDA',
    url: 'https://www.forbes.com/sites/jasonsnyder/2025/08/26/mit-finds-95-of-genai-pilots-fail-because-companies-avoid-friction/',
  },
  {
    title: 'Claude Pricing — Pro and Max plans',
    publisher: 'Anthropic',
    url: 'https://www.anthropic.com/pricing',
  },
]

const sourcesEs: BlogSource[] = [
  {
    title: 'The GenAI Divide: State of AI in Business 2025',
    publisher: 'MIT · Project NANDA',
    url: 'https://www.forbes.com/sites/jasonsnyder/2025/08/26/mit-finds-95-of-genai-pilots-fail-because-companies-avoid-friction/',
  },
  {
    title: 'Precios de Claude — planes Pro y Max',
    publisher: 'Anthropic',
    url: 'https://www.anthropic.com/pricing',
  },
]

const bodyEn = `
Somewhere this week, someone with no coding background is going to open Claude, describe an idea they've been carrying around for months, and by dinner have something they can click through on their own laptop. That is not an exaggeration and it is not a sales pitch — it's just what happens now. The distance between "I have an idea" and "I have something that works" has collapsed, and it collapsed for everyone, not just engineers.

We wrote about the other side of this story already. In [*The 70% Wall*](/insights/the-70-percent-wall), we walked through MIT's finding that 95% of corporate AI pilots never deliver a measurable return — not because the technology fails, but because almost nobody survives the unglamorous second half: ownership, maintenance, security, the work that starts *after* the demo gets applause. That piece was written for people already inside a pilot that stalled.

This one is for the moment before that — the first time your own weekend project actually works, and you have to decide what that means.

## The half that genuinely got easier

It's worth being precise about what changed, because both the hype and the skepticism around it tend to blur the details. Two years ago, turning an idea into something clickable took weeks and usually required hiring a developer. Today, a specific tool — Claude Code, unlocked on Anthropic's Pro plan (US$20/month) or Max plan (from US$100/month) — gives that same underlying intelligence the ability to actually build, instead of just answering questions in a chat window.

The free, web version of Claude is genuinely useful, but it's built for conversation, not construction — a genie that can talk to you from inside the bottle but can't reach out and touch anything. Claude Code is the same intelligence, given hands. Practically, that starts with something almost embarrassingly simple: a folder. Every idea gets its own — a single project, one drawer, so nothing from one experiment bleeds into another.

## The sentence that decides everything

There's a single line that separates a good session with Claude Code from a wasted one, and almost nobody says it on the first try: *"Don't start coding yet. Just help me think this through and document it."*

Skip that sentence, and the tool starts filling in every gap you didn't specify with its own best guess — reasonable, coherent, and almost never the choice you would have made. You end up with something that technically runs and still isn't quite your idea. Say it, and the conversation changes shape entirely: Claude asks questions back, reflects your own idea to you in language you can correct, and — the part that catches most people off guard — offers ideas of its own. You keep talking until the description in front of you actually sounds like the thing in your head. Only then does it get written down, not because anyone will read that document like a novel, but because it's what survives if the chat window closes or you forget a detail you mentioned twenty minutes earlier.

From there, the pattern that actually works is small and testable: a plan broken into pieces, each one shown to you before the next one starts. Building a charades app, say, piece one might be nothing more than a category, a word, and a timer — something you click through yourself, correcting it in plain language the moment something feels off. Piece by piece, in what can genuinely be a single afternoon, that becomes a working game.

## What "it works" quietly leaves out

Here is where the two halves of the wall meet. The moment that charades app — or whatever it is you're building — runs correctly on your own laptop, it is extremely tempting to treat the hard part as finished. It isn't. "Works for me" and "works for strangers" are different claims, and the gap between them is exactly the second half of the wall we described in the first article, just standing one step earlier in the process.

| Works for me | Works for strangers |
|---|---|
| Runs on your machine | Checked for security |
| Nobody depends on it | Tested against real, adversarial use |
| One user: you | Survives a hundred people at once |

Before anyone pays you, or hands over anything personal, three things have to happen that a working demo never requires: someone goes through it specifically looking for security holes, someone tests it the way a stranger — or an attacker — actually would, and there's an actual plan for what happens when something breaks, because something eventually will. None of that is optional, none of it is free, and none of it is the same work as the work that got you a working prototype in an afternoon.

## The same discipline, pointed inward

*The 70% Wall* found that the pilots which survived inside companies shared one trait: a specific person was accountable for what happened after launch, watching real usage and folding it back in weekly rather than quarterly. A solo builder needs the identical discipline, just aimed at themselves. There is no team to assign the "not yet" to. You have to be the one who says it — even, maybe especially, when the demo you just built is genuinely impressive.

That's not a technical skill, and it's not something Claude Code can do for you. The tools removed every excuse for not starting. They did not remove the judgment call about when something is actually ready for someone else to depend on — and if anything, that call matters more now, precisely because the fast part got so fast it's easy to mistake it for the whole thing.

## The wall didn't move. The starting line did.

Put the two pieces next to each other and the shape is simple. What used to take weeks and a developer now takes an afternoon and nobody. What still requires the unglamorous, second-half work — security, real-world testing, a genuine owner watching what happens next — hasn't moved an inch. It's the same 30% we described in the first piece. It just shows up one step earlier than it used to, because the first 70% arrives so much faster than it did before.

Build the afternoon version. That part is real, and it's worth doing more of, not less. Just don't ship it the same afternoon.
`.trim()

const bodyEs = `
En algún lugar, esta semana, alguien sin experiencia técnica va a abrir Claude, va a describir una idea que le da vueltas hace meses, y antes de la cena va a tener algo que puede probar con sus propias manos en su laptop. Eso no es una exageración ni un discurso de ventas: es simplemente lo que pasa ahora. La distancia entre "tengo una idea" y "tengo algo que funciona" se derrumbó, y se derrumbó para todos, no solo para quienes programan.

Ya escribimos sobre el otro lado de esta historia. En [*El muro del 70%*](/es/insights/the-70-percent-wall) revisamos el hallazgo de MIT de que el 95% de los pilotos corporativos de IA nunca genera un retorno medible — no porque la tecnología falle, sino porque casi nadie sobrevive la segunda mitad, la poco vistosa: responsabilidad, mantenimiento, seguridad, el trabajo que empieza *después* de que la demo recibe el aplauso. Ese artículo estaba pensado para quien ya está adentro de un piloto que se estancó.

Este es para el momento anterior a eso — la primera vez que tu propio proyecto de fin de semana realmente funciona, y tienes que decidir qué significa eso.

## La mitad que de verdad se volvió más fácil

Vale la pena ser precisos sobre qué cambió, porque tanto el entusiasmo como el escepticismo alrededor del tema tienden a difuminar los detalles. Hace dos años, convertir una idea en algo que se puede probar tomaba semanas y casi siempre requería contratar a un desarrollador. Hoy, una herramienta específica — Claude Code, que se desbloquea con el plan Pro de Anthropic (US$20 al mes) o el plan Max (desde US$100 al mes) — le da a esa misma inteligencia la capacidad de construir de verdad, en vez de solo responder preguntas en una ventana de chat.

La versión web y gratuita de Claude es genuinamente útil, pero está hecha para conversar, no para construir — un genio que puede hablarte desde dentro de la botella, pero que no puede salir a tocar nada. Claude Code es la misma inteligencia, con manos. En la práctica, eso empieza con algo casi vergonzosamente simple: una carpeta. Cada idea tiene la suya — un proyecto, un cajón, para que nada de un experimento se mezcle con otro.

## La frase que lo decide todo

Hay una sola línea que separa una buena sesión con Claude Code de una sesión desperdiciada, y casi nadie la dice a la primera: *"No empieces a programar todavía. Solo ayúdame a pensarlo bien y a documentarlo."*

Si te saltas esa frase, la herramienta empieza a rellenar cada vacío que no especificaste con su propia mejor suposición — razonable, coherente, y casi nunca la que tú habrías elegido. Terminas con algo que técnicamente funciona y que aun así no es del todo tu idea. Si la dices, la conversación cambia de forma por completo: Claude te hace preguntas de vuelta, te refleja tu propia idea en un lenguaje que puedes corregir, y — la parte que sorprende a la mayoría — también ofrece ideas propias. Sigues conversando hasta que lo que tienes enfrente realmente suena a lo que tenías en la cabeza. Recién ahí se pone por escrito, no porque alguien vaya a leer ese documento como una novela, sino porque es lo que sobrevive si se cierra la ventana de chat o se te olvida un detalle que mencionaste veinte minutos antes.

De ahí en adelante, el patrón que realmente funciona es chico y probable: un plan dividido en piezas, cada una mostrada antes de que empiece la siguiente. Construyendo, digamos, un juego de charadas, la primera pieza puede ser solo una categoría, una palabra y un temporizador — algo que pruebas tú mismo, corrigiendo en lenguaje simple en el momento en que algo se siente mal. Pieza por pieza, en lo que puede ser genuinamente una sola tarde, eso se convierte en un juego que funciona.

## Lo que "funciona" calla en silencio

Aquí es donde se juntan las dos mitades del muro. En el momento en que ese juego de charadas — o lo que sea que estés construyendo — corre bien en tu propia laptop, es enormemente tentador dar por terminada la parte difícil. No lo está. "Funciona para mí" y "funciona para desconocidos" son afirmaciones distintas, y la distancia entre ambas es exactamente la segunda mitad del muro que describimos en el primer artículo, solo que un paso antes en el proceso.

| Funciona para mí | Funciona para desconocidos |
|---|---|
| Corre en tu máquina | Revisado por seguridad |
| Nadie depende de ello | Probado como lo haría alguien real (o alguien con malas intenciones) |
| Un solo usuario: tú | Aguanta a cien personas a la vez |

Antes de que alguien te pague, o te entregue algo personal, tienen que pasar tres cosas que una demo que funciona nunca exige: alguien la revisa buscando específicamente huecos de seguridad, alguien la prueba como realmente lo haría un desconocido — o un atacante —, y existe un plan concreto para cuando algo falle, porque en algún momento va a fallar. Nada de eso es opcional, nada es gratis, y nada es el mismo trabajo que te dio un prototipo funcionando en una tarde.

## La misma disciplina, apuntada hacia adentro

*El muro del 70%* encontró que los pilotos que sobrevivían dentro de las empresas compartían un rasgo: una persona específica era responsable de lo que pasaba después del lanzamiento, vigilando el uso real e incorporándolo cada semana, no cada trimestre. Quien construye solo necesita la misma disciplina, apuntada hacia sí mismo. No hay un equipo al que asignarle el "todavía no". Tienes que ser tú quien lo diga — incluso, quizás sobre todo, cuando la demo que acabas de construir es genuinamente impresionante.

Eso no es una habilidad técnica, y no es algo que Claude Code pueda hacer por ti. Las herramientas eliminaron cualquier excusa para no empezar. No eliminaron el criterio para decidir cuándo algo está realmente listo para que alguien más dependa de ello — y si acaso, ese criterio importa más ahora, justamente porque la parte rápida se volvió tan rápida que es fácil confundirla con el todo.

## El muro no se movió. La línea de partida sí.

Puestas una junto a otra, las dos piezas dibujan algo simple. Lo que antes tomaba semanas y un desarrollador, hoy toma una tarde y a nadie más que a ti. Lo que todavía exige el trabajo poco vistoso de la segunda mitad — seguridad, pruebas con el mundo real, un dueño de verdad vigilando lo que pasa después — no se movió ni un centímetro. Es el mismo 30% que describimos en el primer artículo. Solo que aparece un paso antes de lo que solía aparecer, porque el primer 70% llega mucho más rápido que antes.

Construye la versión de una tarde. Esa parte es real, y vale la pena hacerla más seguido, no menos. Solo no la lances la misma tarde.
`.trim()

export const theOtherSideOfTheWall: BlogPost = {
  slug: 'the-other-side-of-the-wall',
  datePublished: '2026-08-09',
  dateModified: '2026-08-09',
  videoId: 'M58VUULWpGM',
  en: {
    title: "The Other Side of the Wall: Why 'It Works' Isn't the Same as 'It's Ready'",
    description:
      "Building a working prototype with AI now takes an afternoon, not weeks. What that speed doesn't buy you — security, real-world testing, real ownership — is the same 30% from our first article, just one step earlier.",
    excerpt:
      "Anyone can build a working app in an afternoon now — that part is real. Here's the exact moment that speed stops being the same thing as being ready.",
    topic: 'AI & Software Engineering',
    readingTime: '7 min read',
    body: bodyEn,
    faq: [
      {
        q: 'Can you really build a working app with AI in one afternoon?',
        a: "Yes, for a working prototype — a narrow, testable first version. Tools like Claude Code (unlocked on Anthropic's Pro or Max plans) can take a clearly described idea from concept to something clickable in hours. That's a working prototype, not production-ready software.",
      },
      {
        q: "What's the difference between Claude and Claude Code?",
        a: "The free, web version of Claude is built for conversation — questions and answers. Claude Code, available on the Pro (US$20/month) and Max (from US$100/month) plans, gives that same intelligence the ability to actually build software with you, inside a real project folder.",
      },
      {
        q: 'What does an app need before real users can pay for it or use it?',
        a: 'At minimum: a security review, testing against real and adversarial use (not just your own clicking-through), and a concrete plan for what happens when something fails. None of that is required to get a working demo — all of it is required before anyone depends on it.',
      },
      {
        q: "Is this the same as the '70% wall' from your last article?",
        a: "It's the same gap, described one step earlier. The 70% Wall covered pilots that already looked finished and still failed in production. This piece is about the moment right before that — when a weekend prototype first works, and the temptation is to skip straight to shipping it.",
      },
    ],
    sources: sourcesEn,
  },
  es: {
    title: "El otro lado del muro: por qué 'funciona' no es lo mismo que 'está listo'",
    description:
      'Construir un prototipo funcional con IA hoy toma una tarde, no semanas. Lo que esa velocidad no incluye —seguridad, pruebas con el mundo real, un dueño de verdad— es el mismo 30% del primer artículo, solo que un paso antes.',
    excerpt:
      'Hoy cualquiera puede construir una app que funcione en una tarde — esa parte es real. Este es el momento exacto en que esa velocidad deja de significar que está lista.',
    topic: 'IA e ingeniería de software',
    readingTime: '7 min de lectura',
    body: bodyEs,
    faq: [
      {
        q: '¿De verdad se puede construir una app funcional con IA en una tarde?',
        a: 'Sí, para un prototipo funcional — una primera versión acotada y probable. Herramientas como Claude Code (que se desbloquea con los planes Pro o Max de Anthropic) pueden llevar una idea bien descrita de concepto a algo que se puede probar en horas. Eso es un prototipo funcional, no software listo para producción.',
      },
      {
        q: '¿Cuál es la diferencia entre Claude y Claude Code?',
        a: 'La versión web y gratuita de Claude está hecha para conversar — preguntas y respuestas. Claude Code, disponible en los planes Pro (US$20 al mes) y Max (desde US$100 al mes), le da a esa misma inteligencia la capacidad de construir software contigo, dentro de una carpeta de proyecto real.',
      },
      {
        q: '¿Qué necesita una app antes de que usuarios reales le paguen o la usen?',
        a: 'Como mínimo: una revisión de seguridad, pruebas contra uso real y adversarial (no solo tú probándola), y un plan concreto para cuando algo falle. Nada de eso hace falta para tener una demo que funcione — todo eso hace falta antes de que alguien dependa de ella.',
      },
      {
        q: '¿Esto es lo mismo que "el muro del 70%" del artículo anterior?',
        a: 'Es la misma brecha, descrita un paso antes. El muro del 70% cubría pilotos que ya se veían terminados y aun así fallaban en producción. Este artículo es sobre el momento justo antes de eso — cuando un prototipo de fin de semana funciona por primera vez, y la tentación es saltar directo a lanzarlo.',
      },
    ],
    sources: sourcesEs,
  },
}
