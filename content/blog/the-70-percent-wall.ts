// Primer artículo de /insights. Contenido bilingüe autocontenido (título, cuerpo Markdown,
// FAQ y fuentes) — mismo criterio de datos-no-código que capabilities/cases en services/cases.
// Fecha fija (no Date.now()) para que sitemap/JSON-LD no cambien en cada build.

export interface BlogFaqItem {
  q: string
  a: string
}

export interface BlogSource {
  title: string
  publisher: string
  url: string
}

export interface BlogLocaleContent {
  title: string
  description: string
  excerpt: string
  topic: string
  readingTime: string
  body: string
  faq: BlogFaqItem[]
  sources: BlogSource[]
}

export interface BlogPost {
  slug: string
  datePublished: string
  dateModified: string
  /** ID del video de YouTube del canal luxIA Insights (ej. "E7Q5uhcck8Q"), si existe uno para
   * este artículo. Mismo video para es/en — no cambia por idioma. Omitir mientras el video
   * siga en Privado (el embed no carga hasta que esté al menos como No listado). */
  videoId?: string
  /** Ruta absoluta en /public para la tarjeta de vista previa (Open Graph / Twitter / LinkedIn).
   * Mismo criterio de marca que las miniaturas de YouTube del episodio hermano — reusar esas
   * imágenes en vez de generar una nueva. 1200×630 o cercano (16:9 también funciona bien). */
  ogImage?: string
  es: BlogLocaleContent
  en: BlogLocaleContent
}

const sourcesEn: BlogSource[] = [
  {
    title: 'The GenAI Divide: State of AI in Business 2025',
    publisher: 'MIT · Project NANDA',
    url: 'https://www.forbes.com/sites/jasonsnyder/2025/08/26/mit-finds-95-of-genai-pilots-fail-because-companies-avoid-friction/',
  },
  {
    title: 'AI Copilot Code Quality 2025 Research',
    publisher: 'GitClear',
    url: 'https://www.gitclear.com/ai_assistant_code_quality_2025_research',
  },
  {
    title: 'Do Users Write More Insecure Code with AI Assistants?',
    publisher: 'Stanford University · ACM CCS ’23',
    url: 'https://arxiv.org/pdf/2211.03622',
  },
  {
    title: 'Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity',
    publisher: 'METR',
    url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
  },
]

const sourcesEs: BlogSource[] = [
  {
    title: 'The GenAI Divide: State of AI in Business 2025',
    publisher: 'MIT · Project NANDA',
    url: 'https://www.forbes.com/sites/jasonsnyder/2025/08/26/mit-finds-95-of-genai-pilots-fail-because-companies-avoid-friction/',
  },
  {
    title: 'AI Copilot Code Quality 2025 Research',
    publisher: 'GitClear',
    url: 'https://www.gitclear.com/ai_assistant_code_quality_2025_research',
  },
  {
    title: '¿Los usuarios escriben código más inseguro con asistentes de IA?',
    publisher: 'Universidad de Stanford · ACM CCS ’23',
    url: 'https://arxiv.org/pdf/2211.03622',
  },
  {
    title: 'Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity',
    publisher: 'METR',
    url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
  },
]

const bodyEn = `
Ninety-five percent of corporate generative AI pilots produce no measurable return. That is not a skeptic's guess — it is the headline finding of a 2025 MIT study that examined 300 public AI deployments and interviewed 150 executives. Somewhere between the demo that got everyone excited and the system that was supposed to run the business, the vast majority of these projects simply stop.

Anyone who has tried to build something with AI in the last two years has felt the other half of this story: it has never been easier to get something *working*. A chatbot, a dashboard, a tool that reads documents and produces an answer — a single afternoon with the right prompt can now produce what used to take a small team weeks. That feeling is real. It is also, according to the data, almost completely disconnected from whether the thing ever becomes software a business can depend on.

> 95% of corporate generative AI pilots deliver no measurable business return. — MIT, *The GenAI Divide: State of AI in Business 2025*

This is the paradox worth sitting with: the distance between "idea" and "working demo" has collapsed, while the distance between "working demo" and "production system" hasn't moved — and by some measures has gotten wider. Four independent studies, from MIT, Stanford, GitClear and METR, describe the same wall from four different angles. None of them mention each other. None were written to make a point about AI hype. Read together, they explain with unusual precision why so many promising projects die at almost the exact same point.

## What MIT actually found

The MIT report is not a takedown of artificial intelligence. Its authors are explicit that the 95% failure rate has almost nothing to do with which model was used, or how good that model is. GPT, Claude, Gemini — the pilots that stalled and the rare ones that scaled were often built on the same underlying technology.

What separated them was what happened *after* the first version worked. The failed pilots were treated as finished the moment they produced a good demo. Nobody owned the unglamorous job of watching how real people actually used the thing, fixing what broke in the first week of real use, and folding that feedback back into the product weekly — not quarterly. The tools that made it past the pilot stage were embedded into somebody's actual job, with a real owner accountable for whether it kept working, rather than left running on their own as a side project. MIT calls this the "learning gap": most AI tools — and most of the teams around them — simply aren't set up to retain feedback and improve over time.

In other words, the hard part was never getting a model to produce one good answer. It was building the unglamorous machinery — ownership, feedback loops, maintenance — that keeps it producing good answers in month three, under conditions nobody designed for on day one. That machinery never shows up in a demo. It only shows up once something is actually running.

## Why the code itself starts to rot

Part of that machinery is the code, and here the data gets more specific — and more uncomfortable for anyone who has watched an AI assistant write in seconds what used to take an hour.

GitClear, a company that analyzes code history across hundreds of millions of lines of commits, tracked what actually happened to codebases as AI coding assistants became common. The pattern is consistent, and it isn't subtle.

| Metric | 2020 | 2024–25 |
|---|---|---|
| Code meaningfully refactored | 24.1% | 9.5% |
| Copy-pasted / duplicated code | 8.3%* | 12.3%* |
| Duplicate code blocks | baseline | 8x increase in 2024 alone |
| Code rewritten within 2 weeks ("churn") | ~3.3% | 7.1% |

*duplicated-code share measured 2021–2024.

None of this shows up on day one. A feature built with an AI assistant can look — and function — exactly like a feature built by hand, for a while. What accumulates is debt: more duplicated logic, less restructuring, more code that has to be touched again almost immediately. It's the software equivalent of a building going up fast because nobody is checking the wiring behind the walls. It stands. It works, for a while. And then it becomes expensive to change anything without breaking something else — which is precisely the moment most "AI pilots" are supposed to graduate into systems outside customers depend on.

## The confidence that isn't earned

The second uncomfortable data point is about security, from a Stanford study that has held up well since researchers Neil Perry, Megha Srivastava, Deepak Kumar and Dan Boneh presented it at the ACM Conference on Computer and Communications Security in 2023. They ran a controlled study asking developers to write code for security-sensitive tasks — the kind involved in almost anything that touches user data, payments or logins — with and without an AI coding assistant.

The developers using an assistant wrote code with meaningfully more vulnerabilities, particularly around SQL injection and encryption — two of the most common ways real systems get breached. That alone would be a fair trade-off if people knew to double-check the output. They didn't: the same developers who wrote less secure code were also *more* confident their code was secure. The assistant didn't just introduce more risk; it quietly removed the instinct to go looking for it.

This matters more than a lone academic finding because it maps almost exactly onto where non-technical builders get stuck. Authentication, encryption, payments and access control are rarely visible in a demo — nobody asks to see your SQL-injection defenses before saying "this looks great." They become visible the moment real money, real customers or real regulators are involved — exactly the moment a project is trying to cross from pilot into production.

## The speed that isn't real

The most counterintuitive study is also the most recent. In July 2025, the nonprofit research group METR ran a randomized controlled trial with experienced open-source developers — people with an average of five years on the specific codebases they worked in — completing real tasks on mature, real-world projects, half the time with AI coding tools and half without.

The developers were, on average, 19% *slower* when using AI tools. Not faster — slower. Before the study, these same developers predicted AI would speed them up by 24%. After finishing the tasks — after directly living the slowdown — they still believed AI had made them about 20% faster. The gap between what actually happened and what people were sure had happened was almost total.

This isn't a claim that AI coding tools are useless — the same tools can be a genuine speedup on short, greenfield, low-context tasks, which is exactly what most demos are. The METR result is specific to something else: mature, real, already-running systems — the kind every successful pilot eventually has to become. Getting an AI assistant to produce an impressive first version and integrating that output into something that has to keep running are not the same skill. The second one is invisible until you're already past the point where turning back is expensive.

## What this looks like if you're not the one writing the code

None of the studies above require reading code to understand their consequence. If you're the person with the idea and the budget, not the one at the keyboard, this is what the wall usually feels like from the outside: the first version arrives fast and looks close to done. Then every small request after that — "just add a login," "just connect it to payments," "just make it handle more users" — starts taking longer than the last one, instead of shorter. Something that worked yesterday breaks when a new feature ships. Nobody can quite explain why a "simple change" took three weeks.

That isn't bad luck, and it usually isn't a bad developer either. It's the debt from the last section becoming due, on a system nobody was watching the way MIT's successful 5% watch theirs. The frustrating part is that it's invisible right up until the moment it isn't — which is exactly why so many capable, well-funded people conclude, wrongly, that the *idea* was the problem.

## What the other 5% do differently

None of this means the 5% MIT found extracting real value got lucky, or simply hired better engineers. Across the successful cases, a consistent pattern shows up: the tool was placed inside an existing workflow with a specific, accountable owner, instead of dropped in as a generic assistant everyone was expected to figure out alone. It shipped in a narrow, well-scoped version first, not an ambitious one. And it kept changing — weekly, not quarterly — based on what actually happened when real people used it, not on what a demo audience applauded.

That's a description of a discipline, not a technology choice. It is also, not coincidentally, a description of exactly the unglamorous second-half work a demo never has to do — the ownership, the iteration, the hardening, the parts that don't compress into a five-minute video.

## The wall isn't technology. It's everything after the demo.

Put these four studies next to each other and a single shape emerges. AI made the first 70% of building something dramatically easier and faster than it has ever been. It did nothing — arguably made things slightly harder — for the remaining 30%: the part where code has to stay maintainable, security has to hold up under real use, speed gains have to survive contact with a real system, and someone has to own what happens after the applause for the demo dies down.

That last 30% was never the exciting part. It was never going to fit in a launch tweet. But by every measure in this data, it's the entire difference between a demo that impresses a room and software a business can actually run on.
`.trim()

const bodyEs = `
El 95% de los pilotos corporativos de IA generativa no genera ningún retorno medible. No es la opinión de un escéptico: es el hallazgo central de un estudio de MIT de 2025 que analizó 300 despliegues públicos de IA y entrevistó a 150 ejecutivos. En algún punto entre la demo que entusiasmó a todos y el sistema que debía operar el negocio, la gran mayoría de estos proyectos simplemente se detiene.

Cualquiera que haya intentado construir algo con IA en los últimos dos años conoce la otra mitad de esta historia: nunca fue tan fácil lograr que algo *funcione*. Un chatbot, un tablero, una herramienta que lee documentos y da una respuesta — una tarde con el prompt correcto hoy produce lo que antes le tomaba semanas a un equipo pequeño. Esa sensación es real. También está, según los datos, casi completamente desconectada de si eso llega a convertirse en software del que un negocio pueda depender.

> El 95% de los pilotos corporativos de IA generativa no genera retorno de negocio medible. — MIT, *The GenAI Divide: State of AI in Business 2025*

Esta es la paradoja que vale la pena mirar de cerca: la distancia entre "tengo una idea" y "tengo una demo que funciona" se redujo casi a cero, mientras que la distancia entre "demo que funciona" y "sistema en producción" no se movió — y según algunas medidas, se hizo más grande. Cuatro estudios independientes, de MIT, Stanford, GitClear y METR, describen el mismo muro desde ángulos distintos. Ninguno se cita entre sí. Ninguno se escribió para hacer un punto sobre el hype de la IA. Leídos juntos, explican con precisión inusual por qué tantos proyectos prometedores mueren casi en el mismo punto exacto.

## Lo que realmente encontró MIT

El informe de MIT no es un ataque a la inteligencia artificial. Sus autores son explícitos: la tasa de fracaso del 95% casi no tiene relación con qué modelo se usó ni con qué tan bueno era. GPT, Claude, Gemini — los pilotos que se estancaron y los pocos que escalaron muchas veces corrían sobre la misma tecnología de base.

Lo que los separó fue lo que pasó *después* de que la primera versión funcionara. Los pilotos que fracasaron se dieron por terminados en el momento en que produjeron una buena demo. Nadie se hizo cargo del trabajo poco glamoroso de observar cómo la gente real usaba la herramienta, corregir lo que fallaba en la primera semana de uso real, e incorporar ese aprendizaje al producto cada semana — no cada trimestre. Las herramientas que sí pasaron de piloto a producción quedaron integradas al trabajo diario de alguien, con un dueño real responsable de que siguiera funcionando, en vez de quedar corriendo sola como proyecto paralelo. MIT llama a esto la "brecha de aprendizaje": la mayoría de las herramientas de IA — y la mayoría de los equipos alrededor de ellas — simplemente no están armadas para retener el aprendizaje y mejorar con el tiempo.

En otras palabras, lo difícil nunca fue lograr que un modelo diera una buena respuesta una vez. Fue construir la maquinaria poco vistosa — responsabilidad, ciclos de retroalimentación, mantenimiento — que la sigue dando buena en el tercer mes, bajo condiciones que nadie diseñó el primer día. Esa maquinaria nunca aparece en una demo. Solo se hace visible cuando algo ya está corriendo de verdad.

## Por qué el código mismo empieza a pudrirse

Parte de esa maquinaria es el código, y aquí el dato se vuelve más específico — y más incómodo para cualquiera que haya visto a un asistente de IA escribir en segundos lo que antes tomaba una hora.

GitClear, una empresa que analiza el historial de código de cientos de millones de líneas de commits, rastreó qué pasó realmente con las bases de código a medida que los asistentes de IA se volvieron comunes. El patrón es consistente, y no es sutil.

| Métrica | 2020 | 2024–25 |
|---|---|---|
| Código refactorizado en serio | 24.1% | 9.5% |
| Código copiado/duplicado | 8.3%* | 12.3%* |
| Bloques de código duplicado | línea base | 8x más solo en 2024 |
| Código reescrito antes de 2 semanas ("churn") | ~3.3% | 7.1% |

*porcentaje de código duplicado medido entre 2021 y 2024.

Nada de esto se nota el primer día. Una función construida con un asistente de IA puede verse — y funcionar — exactamente igual que una escrita a mano, por un tiempo. Lo que se acumula es deuda: más lógica duplicada, menos reestructuración, más código que hay que volver a tocar casi de inmediato. Es el equivalente en software a levantar un edificio rápido porque nadie revisa el cableado detrás de las paredes. Se mantiene en pie. Funciona, por un tiempo. Y después se vuelve caro cambiar cualquier cosa sin romper otra — justo en el momento en que la mayoría de los "pilotos de IA" deberían graduarse a sistemas de los que dependen clientes reales.

## La confianza que no se ganó

El segundo dato incómodo es sobre seguridad, y viene de un estudio de Stanford que se sostiene bien desde que los investigadores Neil Perry, Megha Srivastava, Deepak Kumar y Dan Boneh lo presentaron en la conferencia ACM sobre Seguridad Informática y de Comunicaciones en 2023. Hicieron un estudio controlado pidiendo a desarrolladores escribir código para tareas sensibles en seguridad — del tipo que interviene en casi todo lo que toca datos de usuarios, pagos o inicios de sesión — con y sin un asistente de IA.

Los desarrolladores que usaron el asistente escribieron código con notablemente más vulnerabilidades, sobre todo en inyección SQL y cifrado — dos de las formas más comunes en que los sistemas reales son vulnerados. Eso solo sería un costo aceptable si la gente supiera que debe revisar el resultado dos veces. No lo sabían: los mismos desarrolladores que escribieron código menos seguro estaban también *más* convencidos de que su código era seguro. El asistente no solo introdujo más riesgo; también apagó en silencio el instinto de ir a buscarlo.

Esto importa más que un hallazgo académico aislado porque coincide casi exactamente con el punto donde se atascan quienes no son técnicos. Autenticación, cifrado, pagos y control de acceso casi nunca son visibles en una demo — nadie pide ver tus defensas contra inyección SQL antes de decir "esto se ve muy bien". Se vuelven visibles en el momento en que hay dinero real, clientes reales o reguladores reales de por medio — justo el momento en que un proyecto intenta cruzar de piloto a producción.

## La velocidad que no es real

El estudio más contraintuitivo es también el más reciente. En julio de 2025, el grupo de investigación sin fines de lucro METR hizo un ensayo controlado y aleatorizado con desarrolladores experimentados de código abierto — personas con un promedio de cinco años trabajando en los proyectos específicos que usaron — completando tareas reales sobre proyectos maduros y reales, la mitad del tiempo con herramientas de IA y la otra mitad sin ellas.

Los desarrolladores fueron, en promedio, 19% *más lentos* al usar herramientas de IA. No más rápidos: más lentos. Antes del estudio, esos mismos desarrolladores habían predicho que la IA los haría un 24% más rápidos. Después de terminar las tareas — después de vivir en carne propia la lentitud —, seguían creyendo que la IA los había hecho casi un 20% más rápidos. La distancia entre lo que realmente pasó y lo que la gente estaba segura que había pasado fue casi total.

Esto no significa que las herramientas de IA para programar sean inútiles — las mismas herramientas sí aceleran tareas cortas, nuevas y de poco contexto, que es exactamente lo que es la mayoría de las demos. El resultado de METR es específico de otra cosa: sistemas maduros, reales, que ya están corriendo — el tipo de sistema en el que todo piloto exitoso eventualmente se tiene que convertir. Lograr que un asistente de IA produzca una primera versión impresionante e integrar ese resultado en algo que tiene que seguir funcionando no son la misma habilidad. La segunda es invisible hasta que ya pasaste el punto en el que dar marcha atrás sale caro.

## Cómo se ve esto si tú no eres quien escribe el código

Ninguno de los estudios anteriores requiere saber leer código para entender su consecuencia. Si eres la persona con la idea y el presupuesto, no quien está frente al teclado, así se suele sentir el muro desde afuera: la primera versión llega rápido y se ve casi terminada. Después, cada pedido pequeño — "solo agrega un login", "solo conéctalo a pagos", "solo hazlo aguantar más usuarios" — empieza a tomar más tiempo que el anterior, no menos. Algo que ayer funcionaba se rompe cuando sale una función nueva. Nadie logra explicar bien por qué un "cambio simple" tomó tres semanas.

Eso no es mala suerte, y casi nunca es un mal desarrollador tampoco. Es la deuda de la sección anterior venciendo, sobre un sistema que nadie vigilaba como el 5% exitoso de MIT vigila el suyo. Lo frustrante es que es invisible hasta el momento exacto en que deja de serlo — y por eso tanta gente capaz, con buen capital, concluye equivocadamente que el problema fue *la idea*.

## Qué hace distinto el otro 5%

Nada de esto significa que el 5% que MIT encontró extrayendo valor real tuvo suerte, o simplemente contrató mejores ingenieros. En los casos exitosos aparece un patrón consistente: la herramienta se colocó dentro de un flujo de trabajo ya existente, con un dueño específico y responsable, en vez de soltarla como un asistente genérico que cada quien debía descubrir por su cuenta. Salió primero en una versión acotada y bien definida, no ambiciosa. Y siguió cambiando — cada semana, no cada trimestre — según lo que realmente pasaba cuando gente real la usaba, no según lo que aplaudía una audiencia de demo.

Eso describe una disciplina, no una elección de tecnología. Y no por casualidad, describe exactamente el trabajo poco vistoso de la segunda mitad que una demo nunca tiene que hacer: la responsabilidad, la iteración, el endurecimiento, las partes que no caben en un video de cinco minutos.

## El muro no es la tecnología. Es todo lo que viene después de la demo.

Puestos uno al lado del otro, estos cuatro estudios dibujan una sola forma. La IA hizo el primer 70% de construir algo dramáticamente más fácil y rápido de lo que fue jamás. No hizo nada — podría decirse que complicó un poco las cosas — con el 30% restante: la parte donde el código tiene que seguir siendo mantenible, la seguridad tiene que aguantar el uso real, las ganancias de velocidad tienen que sobrevivir al contacto con un sistema real, y alguien tiene que hacerse cargo de lo que pasa después de que el aplauso por la demo se apaga.

Ese último 30% nunca fue la parte emocionante. Nunca iba a caber en un tuit de lanzamiento. Pero, según cada medida de estos datos, es toda la diferencia entre una demo que impresiona a una sala y un software del que un negocio realmente puede depender.
`.trim()

export const the70PercentWall: BlogPost = {
  slug: 'the-70-percent-wall',
  datePublished: '2026-08-08',
  dateModified: '2026-08-08',
  videoId: 'nbcaH1kCGyk',
  ogImage: '/insights/the-70-percent-wall-og.jpg',
  en: {
    title: 'The 70% Wall: Why Most AI-Built Software Never Reaches Production',
    description:
      'MIT, Stanford, GitClear and METR data on why AI pilots stall right where the real work begins — and what the rare successes do differently.',
    excerpt:
      "95% of corporate AI pilots never deliver a return, per MIT. Four independent studies explain exactly where they stall — and it isn't the model.",
    topic: 'AI & Software Engineering',
    readingTime: '10 min read',
    body: bodyEn,
    faq: [
      {
        q: 'Why do most AI pilots fail, according to MIT?',
        a: "MIT's 2025 Project NANDA study found the 95% failure rate has almost nothing to do with model quality. It comes from a “learning gap”: most pilots are treated as finished once the demo works, with no owner responsible for iterating weekly on real feedback after launch.",
      },
      {
        q: 'Does AI-generated code have more security vulnerabilities?',
        a: 'A Stanford study (Perry, Srivastava, Kumar, Boneh, ACM CCS ’23) found developers using AI assistants wrote code with meaningfully more vulnerabilities, especially SQL injection and encryption issues — and were also more confident, incorrectly, that their code was secure.',
      },
      {
        q: 'Does AI actually make experienced developers faster?',
        a: 'Not always. A 2025 randomized controlled trial by METR found experienced developers were 19% slower using AI tools on mature, real-world codebases, despite believing afterward that AI had sped them up by about 20%.',
      },
      {
        q: 'What do the AI projects that succeed do differently?',
        a: "According to MIT's research, the 5% of pilots that scale share a pattern: the tool has a specific accountable owner, ships in a narrow well-scoped version first, and is updated weekly based on real usage — not left to run unattended after a good demo.",
      },
    ],
    sources: sourcesEn,
  },
  es: {
    title: 'El muro del 70%: por qué la mayoría del software hecho con IA nunca llega a producción',
    description:
      'Datos de MIT, Stanford, GitClear y METR sobre por qué los pilotos de IA se estancan justo donde empieza el trabajo real — y qué hacen distinto los pocos que lo logran.',
    excerpt:
      'El 95% de los pilotos corporativos de IA nunca genera retorno, según MIT. Cuatro estudios independientes explican exactamente dónde se atascan — y no es el modelo.',
    topic: 'IA e ingeniería de software',
    readingTime: '10 min de lectura',
    body: bodyEs,
    faq: [
      {
        q: '¿Por qué fallan la mayoría de los pilotos de IA, según MIT?',
        a: 'El estudio 2025 de Project NANDA (MIT) encontró que el 95% de fracaso casi no depende de la calidad del modelo. Viene de una "brecha de aprendizaje": la mayoría de los pilotos se dan por terminados cuando la demo funciona, sin un dueño responsable de iterar cada semana sobre el uso real después del lanzamiento.',
      },
      {
        q: '¿El código generado con IA tiene más vulnerabilidades de seguridad?',
        a: 'Un estudio de Stanford (Perry, Srivastava, Kumar, Boneh, ACM CCS ’23) encontró que los desarrolladores que usaban asistentes de IA escribían código con notablemente más vulnerabilidades, sobre todo en inyección SQL y cifrado — y además estaban más convencidos, incorrectamente, de que su código era seguro.',
      },
      {
        q: '¿La IA realmente hace más rápidos a los desarrolladores experimentados?',
        a: 'No siempre. Un ensayo controlado y aleatorizado de METR (2025) encontró que desarrolladores experimentados fueron 19% más lentos usando herramientas de IA sobre código real y maduro, a pesar de creer después que la IA los había hecho casi 20% más rápidos.',
      },
      {
        q: '¿Qué hacen distinto los proyectos de IA que sí funcionan?',
        a: 'Según la investigación de MIT, el 5% de pilotos que escala comparte un patrón: la herramienta tiene un dueño específico y responsable, sale primero en una versión acotada y bien definida, y se actualiza cada semana según el uso real — no queda corriendo sola después de una buena demo.',
      },
    ],
    sources: sourcesEs,
  },
}
