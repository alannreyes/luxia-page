// Cuarto artículo de /insights. El patrón transversal a tres casos en producción
// (cotizador, validación documental, ATS): usar un LLM para VALIDAR, no solo generar.
// Bilingüe autocontenido, fecha fija.

import type { BlogPost, BlogSource } from './the-70-percent-wall'

const sourcesEn: BlogSource[] = [
  {
    title: 'Case: intelligent quoting engine',
    publisher: 'LuxIA',
    url: 'https://luxia.us/en/cases/ai-quoting-engine',
  },
  {
    title: 'Case: document validation for claims & legal teams',
    publisher: 'LuxIA',
    url: 'https://luxia.us/en/cases/document-validation-insurtech',
  },
  {
    title: 'Case: AI-powered ATS with explainable ranking',
    publisher: 'LuxIA',
    url: 'https://luxia.us/en/cases/ai-recruiting-ats',
  },
]

const sourcesEs: BlogSource[] = [
  {
    title: 'Caso: cotizador inteligente',
    publisher: 'LuxIA',
    url: 'https://luxia.us/es/cases/ai-quoting-engine',
  },
  {
    title: 'Caso: validación documental para claims y legales',
    publisher: 'LuxIA',
    url: 'https://luxia.us/es/cases/document-validation-insurtech',
  },
  {
    title: 'Caso: ATS con IA y ranking explicable',
    publisher: 'LuxIA',
    url: 'https://luxia.us/es/cases/ai-recruiting-ats',
  },
]

const bodyEn = `
Ask anyone what large language models do and they will say: generate. Text, code, answers, summaries. Generation is the demo, the headline, the thing that makes people gasp the first time they see it. But after shipping several AI systems to production, we have come to a conclusion that sounds almost backwards: **the most valuable LLM in a serious system is usually not the one generating — it is the one checking.**

We call the pattern *the LLM as validator*, and once you see it, you find it everywhere real money and real decisions are involved.

## The demo failure everyone has seen

Here is a real example from a quoting engine we built. A customer types "cooking oil, 1 liter." Semantic search — embeddings, vector database, all the modern machinery — retrieves the closest products by meaning. And near the top of the results: motor oil. And a deep fryer.

Nothing malfunctioned. Embeddings measure *closeness of meaning*, and in vector space, a deep fryer genuinely lives near cooking oil. Retrieval did its job. The problem is that "close in meaning" and "is the thing the customer asked for" are different questions — and the second one is the only one the business cares about.

The fix was not better embeddings. It was adding a second model whose only job is to look at the candidates and answer: *is this actually the requested product?* With a strict rule for category (motor oil is never cooking oil) and a flexible rule for size (if there is no 1-liter bottle, 900 ml is a valid answer; a fryer never is). That validator is the difference between a demo that impresses and a system a distributor can put in front of customers.

## The same pattern, three very different systems

Once we noticed it, the validator turned out to be the load-bearing wall in three systems that share nothing else.

In the **quoting engine**, the validator confirms every match before it reaches the quotation — and when nothing passes, the system says "not found" instead of quietly substituting something similar. An honest gap costs a follow-up question; a confident wrong answer costs a return, a complaint, and trust.

In **document analysis** for insurance and legal teams, the validation is citations: every extracted field points to the exact passage of the original document where it appears. The professional does not have to trust the extraction — they verify it in one click. The generating model does the reading; the verification design does the convincing.

In the **recruiting system**, validation takes the form of explanations: every candidate's ranking comes with its reasons, citing the CV. A score without an argument is not acceptable in a decision that affects people — and, less obviously, it is also not *improvable*, because nobody can tell you where it went wrong.

Three systems, one principle: **generation proposes, validation disposes.**

## Why this works: the asymmetry nobody prices in

The economics underneath are simple and almost always ignored. In business systems, a wrong answer usually costs far more than no answer. A missing product in a quote triggers a question; a wrong product in a quote triggers a return. An unextracted date sends a human to read one page; a wrong date can lose a case. The demo optimizes for answering everything; production optimizes for never answering wrong. Those are different objective functions, and they lead to different architectures.

The validator is also cheap insurance in exactly the place where LLMs are strongest. Asking a model to *generate* the right answer from scratch is the hard direction. Asking it to *judge* whether a specific candidate matches a specific request — with both in front of it — is a far easier task, and models are correspondingly much more reliable at it. You are spending a small model call to convert "probably right" into "checked."

## How to add one to your system

The recipe is less glamorous than the principle, which is a good sign. Give the validator a narrow question with the evidence in front of it — never "is this good?", always "is this candidate the product requested, yes or no, and why?". Write the asymmetric rules explicitly: which mistakes are fatal (category), which are tolerable (size). Design the honest exit: what the system says when nothing passes, because "I did not find it" must be a first-class answer, not a failure state. And log every validation with its reason — those logs are where the system's future improvements come from.

None of this shows well in a demo. All of it is why a system still has users a year later.
`.trim()

const bodyEs = `
Pregúntale a cualquiera qué hacen los modelos de lenguaje y te dirá: generar. Texto, código, respuestas, resúmenes. La generación es la demo, el titular, lo que hace que la gente se asombre la primera vez que lo ve. Pero después de poner varios sistemas de IA en producción, llegamos a una conclusión que suena casi al revés: **el LLM más valioso de un sistema serio no suele ser el que genera — es el que revisa.**

Al patrón lo llamamos *el LLM como validador*, y una vez que lo ves, lo encuentras en todas partes donde hay dinero real y decisiones reales de por medio.

## La falla de demo que todos hemos visto

Un ejemplo real de un cotizador que construimos. Un cliente escribe "aceite de cocina, 1 litro". La búsqueda semántica — embeddings, base vectorial, toda la maquinaria moderna — recupera los productos más cercanos por significado. Y cerca del tope de los resultados: aceite de motor. Y una freidora.

Nada funcionó mal. Los embeddings miden *cercanía de significado*, y en el espacio vectorial una freidora vive genuinamente cerca del aceite de cocina. La búsqueda hizo su trabajo. El problema es que "cercano en significado" y "es lo que el cliente pidió" son preguntas distintas — y la segunda es la única que le importa al negocio.

El arreglo no fue mejorar los embeddings. Fue agregar un segundo modelo cuyo único trabajo es mirar los candidatos y responder: *¿esto ES el producto pedido?* Con regla estricta de categoría (el aceite de motor nunca es aceite de cocina) y regla flexible de tamaño (si no hay presentación de 1 litro, la de 900 ml es respuesta válida; una freidora nunca lo es). Ese validador es la diferencia entre una demo que impresiona y un sistema que un distribuidor puede poner frente a sus clientes.

## El mismo patrón, tres sistemas muy distintos

Una vez que lo notamos, el validador resultó ser el muro de carga de tres sistemas que no comparten nada más.

En el **cotizador**, el validador confirma cada coincidencia antes de que llegue a la cotización — y cuando ninguna pasa, el sistema dice "no lo encontré" en vez de meter en silencio algo parecido. Un vacío honesto cuesta una pregunta de vuelta; una respuesta segura pero equivocada cuesta una devolución, un reclamo y la confianza.

En el **análisis documental** para equipos de seguros y legales, la validación son las citas: cada dato extraído apunta al pasaje exacto del documento original donde aparece. El profesional no tiene que confiar en la extracción — la verifica en un clic. El modelo que genera hace la lectura; el diseño de verificación hace el convencimiento.

En el **sistema de reclutamiento**, la validación toma forma de explicaciones: el ranking de cada candidato viene con sus razones, citando el CV. Un puntaje sin argumento no es aceptable en una decisión que afecta personas — y, menos obvio, tampoco es *mejorable*, porque nadie puede decirte dónde se equivocó.

Tres sistemas, un principio: **la generación propone, la validación dispone.**

## Por qué funciona: la asimetría que nadie pone en precio

La economía de fondo es simple y casi siempre se ignora. En los sistemas de negocio, una respuesta equivocada suele costar mucho más que ninguna respuesta. Un producto faltante en una cotización provoca una pregunta; un producto equivocado provoca una devolución. Una fecha sin extraer manda a un humano a leer una página; una fecha equivocada puede perder un caso. La demo optimiza responder todo; producción optimiza no responder mal. Son funciones objetivo distintas, y llevan a arquitecturas distintas.

El validador es además un seguro barato justo donde los LLMs son más fuertes. Pedirle a un modelo que *genere* la respuesta correcta desde cero es la dirección difícil. Pedirle que *juzgue* si un candidato específico corresponde a un pedido específico — con ambos enfrente — es una tarea mucho más fácil, y los modelos son proporcionalmente más confiables en ella. Estás gastando una llamada chica de modelo para convertir "probablemente correcto" en "verificado".

## Cómo agregar uno a tu sistema

La receta es menos glamorosa que el principio, lo cual es buena señal. Dale al validador una pregunta angosta con la evidencia enfrente — nunca "¿esto está bien?", siempre "¿este candidato es el producto pedido, sí o no, y por qué?". Escribe las reglas asimétricas de forma explícita: qué errores son fatales (la categoría), cuáles son tolerables (el tamaño). Diseña la salida honesta: qué dice el sistema cuando nada pasa la validación, porque "no lo encontré" debe ser una respuesta de primera clase, no un estado de falla. Y registra cada validación con su razón — de esos registros salen las mejoras futuras del sistema.

Nada de esto luce bien en una demo. Todo esto es la razón por la que un sistema sigue teniendo usuarios un año después.
`.trim()

export const llmAsValidator: BlogPost = {
  slug: 'llm-as-validator',
  datePublished: '2026-08-15',
  dateModified: '2026-08-15',
  en: {
    title: 'The LLM as Validator: What Separates a Demo From a System You Can Trust',
    description:
      'The most valuable language model in a production system is usually not the one generating — it is the one checking. The pattern behind three very different systems we shipped: a quoting engine, document analysis, and a recruiting ATS.',
    excerpt:
      'Generation proposes, validation disposes. The unglamorous pattern that keeps AI systems trustworthy after the demo applause fades.',
    topic: 'AI Engineering',
    readingTime: '6 min read',
    body: bodyEn,
    faq: [
      {
        q: 'What does "the LLM as validator" mean?',
        a: 'Using a language model not to generate the answer but to check it: judging whether a retrieved product matches the request, whether an extracted field really appears in the document, whether a ranking has defensible reasons. Generation proposes; a second, narrowly-tasked model validates before anything reaches the user.',
      },
      {
        q: 'Why not just improve the embeddings or the main model instead?',
        a: 'Because retrieval and generation answer "what is close or plausible," while the business needs "is this correct." Judging a specific candidate against a specific request — with both in view — is a much easier task than generating from scratch, so a small validator call reliably converts "probably right" into "checked."',
      },
      {
        q: 'Does a validation layer make the system slower or more expensive?',
        a: 'It adds one narrow, cheap model call per candidate — small compared with the cost of wrong answers: returns, complaints, lost cases, lost trust. In business systems a wrong answer usually costs far more than no answer, and the validator exists precisely to enforce that asymmetry.',
      },
      {
        q: 'How do I add a validator to an existing AI system?',
        a: 'Give it a narrow question with the evidence in front of it, write asymmetric rules (which mistakes are fatal, which are tolerable), design an honest "not found" path as a first-class answer, and log every validation with its reason so the system can improve from real cases.',
      },
    ],
    sources: sourcesEn,
  },
  es: {
    title: 'El LLM como validador: lo que separa una demo de un sistema confiable',
    description:
      'El modelo de lenguaje más valioso de un sistema en producción no suele ser el que genera — es el que revisa. El patrón detrás de tres sistemas muy distintos que entregamos: un cotizador, análisis documental y un ATS de reclutamiento.',
    excerpt:
      'La generación propone, la validación dispone. El patrón poco glamoroso que mantiene confiables a los sistemas de IA cuando se apaga el aplauso de la demo.',
    topic: 'Ingeniería de IA',
    readingTime: '6 min de lectura',
    body: bodyEs,
    faq: [
      {
        q: '¿Qué significa "el LLM como validador"?',
        a: 'Usar un modelo de lenguaje no para generar la respuesta sino para revisarla: juzgar si un producto recuperado corresponde al pedido, si un dato extraído de verdad aparece en el documento, si un ranking tiene razones defendibles. La generación propone; un segundo modelo, con una tarea angosta, valida antes de que algo llegue al usuario.',
      },
      {
        q: '¿Por qué no mejorar los embeddings o el modelo principal en vez de validar?',
        a: 'Porque la búsqueda y la generación responden "qué es cercano o plausible", y el negocio necesita "qué es correcto". Juzgar un candidato específico contra un pedido específico — con ambos a la vista — es una tarea mucho más fácil que generar desde cero, así que una llamada chica de validación convierte de forma confiable "probablemente correcto" en "verificado".',
      },
      {
        q: '¿La capa de validación no hace el sistema más lento o más caro?',
        a: 'Agrega una llamada angosta y barata por candidato — poco comparado con el costo de responder mal: devoluciones, reclamos, casos perdidos, confianza perdida. En sistemas de negocio una respuesta equivocada suele costar mucho más que ninguna respuesta, y el validador existe justamente para imponer esa asimetría.',
      },
      {
        q: '¿Cómo agrego un validador a un sistema de IA existente?',
        a: 'Dale una pregunta angosta con la evidencia enfrente, escribe reglas asimétricas (qué errores son fatales y cuáles tolerables), diseña la salida honesta de "no encontrado" como respuesta de primera clase, y registra cada validación con su razón para que el sistema mejore con casos reales.',
      },
    ],
    sources: sourcesEs,
  },
}
