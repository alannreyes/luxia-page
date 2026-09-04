// Quinto artículo de /insights. Comentario de practitioner sobre el marco de los
// 3 vectores de Pep Martorell (Arpa Talks, ago-2026) + el paper de Mother (Pareras,
// Invivo Partners) + la ventana de los 6 meses — con recibos de producción propios.
// Fuentes primarias verificadas: entrevista YouTube, PDF en invivo.partners, Gartner PR.

import type { BlogPost, BlogSource } from './the-70-percent-wall'

const sourcesEn: BlogSource[] = [
  {
    title: 'Pep Martorell — El futuro de la IA (interview, in Spanish)',
    publisher: 'Arpa Talks · YouTube',
    url: 'https://www.youtube.com/watch?v=IWB53Wv_Yrk',
  },
  {
    title: 'A Timeline for the Future of Venture Capital: From Hiring Biotech PhDs to Hiring Coding Engineers',
    publisher: 'Luis Pareras MD PhD · Invivo Partners',
    url: 'https://invivo.partners/wp-content/uploads/2026/05/mother_timeline.pdf',
  },
  {
    title: 'Mother in conversation: a morning debrief (video)',
    publisher: 'Invivo Partners · YouTube',
    url: 'https://www.youtube.com/watch?v=6V0KBMe8bkM',
  },
  {
    title: 'Gartner Predicts Over 40 Percent of Agentic AI Projects Will Be Canceled by End of 2027',
    publisher: 'Gartner (press release, June 2025)',
    url: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027',
  },
]

const sourcesEs: BlogSource[] = [
  {
    title: 'Pep Martorell — El futuro de la IA (entrevista)',
    publisher: 'Arpa Talks · YouTube',
    url: 'https://www.youtube.com/watch?v=IWB53Wv_Yrk',
  },
  {
    title: 'A Timeline for the Future of Venture Capital (el paper de Mother)',
    publisher: 'Luis Pareras MD PhD · Invivo Partners',
    url: 'https://invivo.partners/wp-content/uploads/2026/05/mother_timeline.pdf',
  },
  {
    title: 'Mother en conversación: un debrief matutino (video)',
    publisher: 'Invivo Partners · YouTube',
    url: 'https://www.youtube.com/watch?v=6V0KBMe8bkM',
  },
  {
    title: 'Gartner predice que más del 40% de los proyectos de IA agéntica serán cancelados antes de fin de 2027',
    publisher: 'Gartner (nota de prensa, junio 2025)',
    url: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027',
  },
]

const bodyEs = `
Imagina que la IA acaba de liberar el 40% del tiempo de tu equipo. Felicitaciones — y ahora viene la decisión que define todo lo demás. En una entrevista reciente en Arpa Talks, Pep Martorell — inversor deep-tech, socio de InvivoAI y profesor de Esade — la plantea sin anestesia: *"Puedes hacer básicamente dos cosas. Una: si me liberan el 40% del tiempo, echo al 40% de la gente. Es fácil y capturo el valor porque tengo menos gasto. Y aquí me quedo. La otra, más sofisticada y compleja: convertir esa liberación de tiempo en más negocio, más clientes, más producto. En lugar de reducir por abajo, incrementar por arriba."*

Lo contraintuitivo es lo que está pasando de verdad: Martorell cita empresas que revirtieron despidos "porque los costes de la IA quizá no eran los que parecían", y estudios recientes que correlacionan intensidad de IA con **aumento** de personal. Es la paradoja de los radiólogos: los algoritmos leen placas hace años, y sin embargo hay más radiólogos que nunca — porque automatizar la tarea multiplicó la demanda de diagnósticos. El economista Jevons lo describió en 1865 con el carbón: cuando algo se vuelve más eficiente, se consume más, no menos.

Pero el 40% es solo la puerta de entrada. Lo más útil de la entrevista es el mapa que Martorell dibuja para explicarse — *"son tres cosas distintas que, si las mezclamos, nos vamos a marear"*, le advierte al entrevistador, y las recorre una por una: la IA está cambiando las empresas por **tres vectores distintos**. (Guardemos ese "por separado" para más adelante, porque ahí hay una objeción que vale la pena hacer.)

## Vector 1: automatización de procesos

*"Es lo que toda la vida hemos intentado hacer con cada tecnología nueva"*, dice. Y suelta el matiz que casi nadie admite: *"hay mucha gente hablando y luego implementando menos, porque esto es muy complicado."*

Aquí van nuestros recibos, porque este vector es nuestro pan de cada día. Cuando automatizamos la validación documental para una insurtech de EE.UU., el sistema corrió dos semanas en paralelo con los analistas humanos hasta alcanzar 98% de coincidencia con sus respuestas — y el resultado no fue despedir analistas: fue que el experto dejó de leer documentos completos y pasó a validar hallazgos señalados. Su criterio, lo verdaderamente caro, se concentró donde importa. Lo mismo con el cotizador que convierte una lista pegada en texto libre en una cotización formal: el equipo comercial no se achicó — pasó a responder el mismo día y a atender un volumen que antes era imposible. Capturar el valor "por arriba", como dice Martorell.

## Vector 2: la agentización del puesto de trabajo

Aquí la entrevista se pone seria. Un agente, en la definición de Martorell, es una IA que *"no responde solo a tus preguntas, sino que tiene voluntad propia para hacer cosas"*. Y el cambio de mentalidad que exige: *"dejar de ser un ejecutor de tareas secuenciales para pasar a ser **orquestadores de agentes**. Aparte de tener equipo humano, empezarás a tener equipo agéntico que trabaja 24x7."*

Su firma lo vive: en Invivo Partners responden que su equipo es "15 + 1" — quince personas y Mother, su colega agéntica. Y aquí está la joya documental: Luis Pareras, el managing partner, publicó el paper técnico más honesto que hemos leído sobre un colega agéntico en producción (el enlace está en las fuentes). Cuenta la arquitectura completa: un bucle actor–crítico–jefe corriendo sobre **tres modelos de laboratorios distintos**, porque *"un modelo no puede criticarse a sí mismo eficazmente: comparte sus propios sesgos y puntos ciegos"*. Cuenta el fine-tuning en dos pasadas — primero el corpus del sector, después *el gusto del socio* ("AIA prefiere las empresas que yo preferiría, antes de que yo lea el deck"). Cuenta que Mother tiene un archivo constitucional con sus metas, y que una vez le respondió "no" cuando él quiso apurar un documento — y tenía razón.

Nosotros llegamos a las mismas conclusiones por el camino de la práctica: nuestro copiloto comercial escucha la videollamada y sopla ayudas en ~3 segundos desde una base de conocimiento propia — y su regla más importante no es qué decir, sino **cuándo callar**. Y usamos paneles de consenso entre modelos de familias distintas para las decisiones difíciles, por la misma razón que Pareras: los errores de modelos distintos no se superponen. Cuando dos practitioners que no se conocen convergen en la misma arquitectura, suele ser señal de que ahí hay algo real.

## Vector 3: disrupción

El más exigente: *"no es hacer cosas más rápido que antes; es hacer cosas que antes no podía hacer."* Martorell es honesto — hoy esto solo se ve con claridad en la ciencia, y llegará a la empresa después. Su escala de dificultad ordena todo el mapa: automatizar (décadas haciéndolo) < agentizar (va a costar) < disrumpir (todavía más complicado).

## Una objeción necesaria: los vectores solo se separan en la pizarra

Martorell los explica por separado para no marear a nadie — es un recurso expositivo, y como taxonomía para ordenar decisiones funciona: automatizar es un proyecto con ROI, agentizar es un cambio de mentalidad, disrumpir es una apuesta estratégica. Pero conviene decir en voz alta lo que la separación esconde: **en la realidad, los tres vectores ocurren juntos y se alimentan entre sí**.

Nuestro propio trabajo lo demuestra. ¿En qué vector cae un copiloto comercial que escucha la videollamada en vivo? Automatiza la minuta y la búsqueda de datos (vector 1), es un colega agéntico que decide cuándo hablar y cuándo callar (vector 2), y le da a un vendedor la memoria completa de su empresa en tiempo real — algo que antes no existía a ningún precio (vector 3). Un solo sistema, los tres vectores a la vez. Mother, la colega agéntica de Invivo, igual: hace triage de decks, es la "+1" del equipo, y cambia la economía del análisis de inversiones hasta el punto de que Pareras argumenta que alterará la estructura misma del venture capital. Los vectores no son tres cajas: son un gradiente donde cada uno habilita al siguiente — la automatización genera los datos y la confianza que hacen posible al agente; el agente operando 24x7 acumula capacidades que terminan siendo disrupción.

Y hay algo más incómodo: **los vectores no piden permiso**. No son algo que tu empresa "hace o no hace" — son algo que le está pasando a tu mercado. Si tú no automatizas, tu competidor multiplica su capacidad y la demanda se enruta hacia él: la paradoja de los radiólogos también funciona a nivel de industria. La ventana de los 6 meses corta en ambos sentidos — si no la abres tú, alguien la está abriendo sobre ti. No adoptar no es un estado neutro; es ocupar una posición en el cronograma de otro. Pareras lo dice de sus propios pares: *"la mayoría no ha metabolizado la llegada de la IA todavía; están a punto de ser forzados a hacerlo."* Forzados — no invitados.

## La ventana de los 6 meses — y la trampa del eterno piloto

Queda la pregunta del gerente pragmático: ¿para qué construir hoy lo que un proveedor venderá empaquetado en un año? Martorell da la respuesta más completa que hemos escuchado. Primero: *"el coste de fallar es prácticamente nulo... y desarrollar pilotos te lleva a un proceso de maduración y pensamiento sobre el negocio que no tiene precio. El solo hecho de hacerlo te plantea preguntas sobre el negocio que nunca te habías planteado."* Segundo: *"en ciertos negocios, 6 o 12 meses de ventaja respecto a la competencia es brutal. Todo lo que he hecho en este tiempo no me lo quita nadie."* Pareras lo dice aún más crudo en su paper: los primeros tres meses de su sistema fueron vergonzosos, al mes seis igualaba a sus analistas y al mes ocho los superaba — *"la mediocridad temprana es el precio de admisión, y la mayoría de tus competidores se va a negar a pagarlo. **Esa es tu ventana**."*

Pero la ventana tiene una condición, y Martorell la nombra sin rodeos: *"Lo que no puedes hacer es convertirte en un **eterno innovador de pilotos y nunca bajar a producción**."* Y para mostrar dónde está la trampa usa un caso que se hizo famoso: el CTO de una gran cadena de retail contó públicamente que dos personas de su equipo construyeron, en un fin de semana, un buscador con IA para su tienda online — y funcionaba mejor que el del proveedor que tenían contratado. Espectacular. ¿Entonces cancelas el contrato con el proveedor? Ahí empieza el verdadero debate, advierte Martorell: para reemplazarlo de verdad necesitas un plan B si falla, alguien que firme términos y condiciones, un equipo que lo mantenga, ciberseguridad, y actualizaciones al ritmo que un proveedor garantiza. El fin de semana produce la demo; nada de eso viene incluido. Gartner le puso número a la trampa: más del 40% de los proyectos de IA agéntica serían cancelados por valor de negocio difuso o controles de riesgo insuficientes.

La síntesis que nos llevamos — y que venimos defendiendo caso por caso: **la ventaja de los 6 meses solo se cobra si el experimento baja a producción**. Experimenta barato, madura con el feedback de tu equipo experto en el negocio. Y luego escala: incorpora un dueño, la seguridad y todos los requisitos que exige la producción.

Una nota práctica para cerrar: esa segunda mitad no tiene por qué ocupar a las mismas personas del piloto. Cuando un experimento demuestra que merece vivir, apoyarte en expertos es lo más sensato — es el camino más corto para cobrar la ventana sin pagar completo el aprendizaje. Ese es, caso por caso, [el trabajo que documentamos](/es/cases).
`.trim()

const bodyEn = `
Imagine AI just freed up 40% of your team's time. Congratulations — now comes the decision that defines everything else. In a recent interview on Arpa Talks (in Spanish), Pep Martorell — deep-tech investor, partner at InvivoAI and Esade faculty — puts it without anesthesia: *"You can basically do two things. One: if 40% of the time is freed, I cut 40% of the people. It's easy, and I capture the value through lower costs. And that's where it ends. The other, more sophisticated and complex: turn that freed time into more business, more clients, more product. Instead of reducing from below, grow from above."*

The counterintuitive part is what is actually happening: Martorell cites companies that reversed layoffs "because AI costs were perhaps not what they seemed," and recent studies correlating AI intensity with headcount **growth**. It's the radiologist paradox: algorithms have read scans well for years, and yet there are more radiologists than ever — because automating the task multiplied the demand for diagnostics. The economist Jevons described it in 1865 with coal: when something becomes more efficient, we consume more of it, not less.

But the 40% is just the entrance. The most useful part of the interview is the map Martorell draws to explain himself — *"they are three different things, and if we mix them up we'll get dizzy,"* he warns the interviewer, walking through them one at a time: AI is changing companies along **three distinct vectors**. (Hold on to that "one at a time" — there's an objection worth raising later.)

## Vector 1: process automation

*"It's what we've always tried to do with every new technology,"* he says — adding the nuance almost nobody admits: *"there are a lot of people talking, and then implementing less, because this is genuinely hard."*

Here are our receipts, because this vector is our daily bread. When we automated document validation for a US insurtech, the system ran side-by-side with human analysts for two weeks until it reached 98% agreement with their answers — and the outcome wasn't firing analysts: the expert stopped reading entire documents and started validating flagged findings. Their judgment — the truly expensive part — concentrated where it matters. Same with the quoting engine that turns a pasted free-text list into a formal quotation: the sales team didn't shrink — it started answering the same day and handling volume that used to be impossible. Capturing value "from above," as Martorell puts it.

## Vector 2: the agentification of work

Here the interview gets serious. An agent, in Martorell's definition, is an AI that *"doesn't just answer your questions — it has a will of its own to do things."* And the mindset shift it demands: *"stop being an executor of sequential tasks and become an **orchestrator of agents**. Besides your human team, you will start to have an agentic team working 24x7."*

His firm lives it: at Invivo Partners, the answer to "how many are you?" is "15 + 1" — fifteen people and Mother, their agentic colleague. And here is the documentary gem: Luis Pareras, the managing partner, published the most honest technical paper we have read about an agentic colleague in production (link in the sources). It details the full architecture: an actor–critic–boss loop running on **three models from different labs**, because *"a single model cannot effectively criticize itself: it shares its own priors and blind spots."* It details the two-pass fine-tuning — first the sector corpus, then *the partner's taste* ("AIA likes the companies I would like, before I have read the deck"). It reveals that Mother has a constitutional file with her goals — and that she once answered "no" when he tried to rush a document. She was right.

We reached the same conclusions through practice: our sales copilot listens to the video call and whispers cues in ~3 seconds from a private knowledge base — and its most important rule is not what to say but **when to stay quiet**. And we use consensus panels across models from different families for hard decisions, for the same reason as Pareras: different models' errors don't overlap. When two practitioners who have never met converge on the same architecture, it usually means something real lives there.

## Vector 3: disruption

The most demanding one: *"it's not doing things faster than before; it's doing things you couldn't do before."* Martorell is honest — today this is only clearly visible in science, and it will reach business later. His difficulty scale orders the whole map: automating (we've done it for decades) < agentifying (it will take effort) < disrupting (harder still).

## A necessary objection: the vectors only separate on the whiteboard

Martorell explains them separately so nobody gets dizzy — it's an expository device, and as a taxonomy for organizing decisions it works: automating is a project with an ROI, agentifying is a mindset change, disrupting is a strategic bet. But it's worth saying out loud what the separation hides: **in reality, the three vectors happen together and feed each other**.

Our own work proves it. Which vector does a sales copilot that listens to live video calls fall into? It automates the meeting minutes and the data lookups (vector 1), it is an agentic colleague that decides when to speak and when to stay quiet (vector 2), and it gives a salesperson their company's complete memory in real time — something that previously didn't exist at any price (vector 3). One system, all three vectors at once. Mother, Invivo's agentic colleague, likewise: she triages decks, she is the team's "+1", and she changes the economics of investment analysis to the point where Pareras argues it will alter the structure of venture capital itself. The vectors aren't three boxes: they are a gradient where each one enables the next — automation generates the data and the confidence that make the agent possible; the agent running 24x7 accumulates capabilities that end up being disruption.

And there is something more uncomfortable: **the vectors don't ask for permission**. They are not something your company "does or doesn't do" — they are something happening to your market. If you don't automate, your competitor multiplies capacity and demand routes toward them: the radiologist paradox also works at the industry level. The six-month window cuts both ways — if you don't open it, someone is opening it over you. Not adopting isn't a neutral state; it's occupying a position on someone else's timeline. Pareras says it about his own peers: *"most have not metabolized the arrival of AI yet; they are about to be forced to."* Forced — not invited.

## The six-month window — and the eternal-pilot trap

The pragmatic manager's question remains: why build today what a vendor will sell packaged a year from now? Martorell gives the most complete answer we've heard. First: *"the cost of failing is practically zero... and building pilots takes you through a process of maturing your thinking about the business that is priceless. The mere act of doing it raises questions about your business you had never asked."* Second: *"in certain businesses, being 6 or 12 months ahead of the competition is brutal. Everything I've done in that time, nobody can take away from me."* Pareras says it even more bluntly in his paper: his system's first three months were embarrassing, by month six it matched his analysts, by month eight it exceeded them — *"the early mediocrity is the price of admission, and most of your competitors are going to refuse to pay it. **That is your window**."*

But the window has one condition, and Martorell names it plainly: *"What you cannot do is become an **eternal innovator of pilots that never ships to production**."* To show where the trap lives, he uses a case that became famous: the CTO of a major retail chain publicly shared that two people on his team built, in one weekend, an AI search engine for their online store — and it worked better than the one from their contracted vendor. Spectacular. So do you cancel the vendor's contract? That's where the real debate begins, Martorell warns: to actually replace it you need a plan B if it fails, someone who signs terms and conditions, a team to maintain it, cybersecurity, and updates at the pace a vendor guarantees. The weekend produces the demo; none of that comes included. Gartner put a number on the trap: over 40% of agentic AI projects would be canceled over unclear business value or insufficient risk controls.

The synthesis we take home — and that we defend case by case: **the six-month advantage is only cashed in if the experiment ships to production**. Experiment cheaply, mature it with feedback from the people who know your business best. Then scale: bring in an owner, the security, and everything production demands.

One practical closing note: that second half doesn't have to be done by the same people who built the pilot. When an experiment proves it deserves to live, leaning on experts is simply sensible — it's the shortest path to cashing the window without paying the full learning curve. That is, case by case, [the work we document](/en/cases).
`.trim()

export const threeVectorsOfAi: BlogPost = {
  slug: 'three-vectors-of-ai',
  datePublished: '2026-08-16',
  dateModified: '2026-08-16',
  videoId: 'GsmVB0swYso',
  ogImage: '/insights/three-vectors-of-ai-og.jpg',
  es: {
    title: '¿Despedir al 40% o crecer 40%? Los tres vectores de la IA — notas desde producción',
    description:
      'Pep Martorell propone tres vectores para entender la IA en la empresa: automatización, agentización y disrupción. Los comentamos con recibos de producción, el paper de Mother (Invivo Partners) y la ventana de los 6 meses.',
    excerpt:
      'La IA liberó el 40% del tiempo de tu equipo. Lo que decidas ahora — reducir por abajo o crecer por arriba — define todo lo demás.',
    topic: 'IA en la empresa',
    readingTime: '8 min de lectura',
    body: bodyEs,
    faq: [
      {
        q: '¿Cuáles son los tres vectores de la IA según Pep Martorell?',
        a: 'Automatización de procesos (hacer más barato y rápido lo que ya hacías), agentización del puesto de trabajo (incorporar agentes con iniciativa propia y pasar de ejecutor de tareas a orquestador de agentes) y disrupción (hacer cosas que antes no eran posibles). Martorell los explica por separado como recurso didáctico; en la práctica ocurren juntos y se alimentan entre sí — un mismo sistema puede vivir en los tres vectores a la vez.',
      },
      {
        q: '¿La IA reduce puestos de trabajo en las empresas que la adoptan?',
        a: 'La evidencia reciente apunta a lo contrario de la intuición: hay empresas que revirtieron despidos al descubrir los costos reales de la IA, y estudios que correlacionan intensidad de IA con aumento de personal. Es la paradoja de los radiólogos (efecto Jevons): automatizar una tarea puede multiplicar la demanda del servicio completo. La captura de valor sostenible suele venir por crecer, no por recortar.',
      },
      {
        q: '¿Qué es un "orquestador de agentes"?',
        a: 'El nuevo rol del trabajador cuando su equipo incluye agentes de IA que trabajan 24x7 con iniciativa propia: en lugar de ejecutar tareas secuenciales, delega, supervisa e integra el trabajo de colegas agénticos — igual que hoy coordina colegas humanos. El caso documentado más completo es Mother, de Invivo Partners, cuyo paper técnico es público.',
      },
      {
        q: '¿Vale la pena construir con IA hoy si pronto habrá productos empaquetados?',
        a: 'Sí, con una condición. Experimentar es casi gratis, madura las preguntas de tu negocio y otorga 6-12 meses de ventaja que nadie te quita — pero la ventana solo se cobra si el experimento baja a producción con seguridad, evaluación y mantenimiento. Gartner predijo que más del 40% de los proyectos agénticos sería cancelado, justamente por saltarse esa disciplina.',
      },
    ],
    sources: sourcesEs,
  },
  en: {
    title: 'Fire 40% or Grow 40%? The Three Vectors of AI — Notes from Production',
    description:
      "Pep Martorell proposes three vectors to understand AI in business: automation, agentification and disruption. We comment on them with production receipts, the Mother paper (Invivo Partners) and the six-month window.",
    excerpt:
      'AI just freed 40% of your team’s time. What you decide next — cut from below or grow from above — defines everything else.',
    topic: 'AI in Business',
    readingTime: '8 min read',
    body: bodyEn,
    faq: [
      {
        q: 'What are the three vectors of AI according to Pep Martorell?',
        a: "Process automation (doing what you already did, cheaper and faster), agentification of work (incorporating agents with their own initiative and shifting from task executor to orchestrator of agents), and disruption (doing things that weren't possible before). Martorell explains them separately as a teaching device; in practice they happen together and feed each other — a single system can live in all three vectors at once.",
      },
      {
        q: 'Does AI reduce headcount in companies that adopt it?',
        a: "Recent evidence points against intuition: some companies reversed layoffs after discovering AI's real costs, and studies correlate AI intensity with headcount growth. It's the radiologist paradox (Jevons effect): automating a task can multiply demand for the full service. Sustainable value capture usually comes from growing, not cutting.",
      },
      {
        q: 'What is an "orchestrator of agents"?',
        a: 'The worker’s new role when the team includes AI agents working 24x7 with their own initiative: instead of executing sequential tasks, you delegate, supervise and integrate the work of agentic colleagues — the way you coordinate human colleagues today. The most complete documented case is Mother, at Invivo Partners, whose technical paper is public.',
      },
      {
        q: 'Is it worth building with AI today if packaged products are coming?',
        a: "Yes, with one condition. Experimenting is nearly free, matures your business questions and grants a 6-12 month advantage nobody can take from you — but the window is only cashed in if the experiment ships to production with security, evaluation and maintenance. Gartner predicted that over 40% of agentic projects would be canceled, precisely for skipping that discipline.",
      },
    ],
    sources: sourcesEn,
  },
}
