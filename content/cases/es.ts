import type { CaseDoc } from './types'

// 9 casos reales en producción, anonimizados (capacidad + sector, nunca la marca).
// Cada título apunta a una búsqueda comercial concreta (plan GEO ago-2026).

export const casesEs: CaseDoc[] = [
  // ============================================================
  // 1 · BUSCADOR SEMÁNTICO
  // ============================================================
  {
    slug: 'semantic-search-retail',
    industry: 'Retail · Industrial',
    tagline: 'Búsqueda que entiende contexto, no solo palabras',
    cardProblem:
      'Catálogos con +200,000 SKUs donde la búsqueda por palabras exactas no encuentra lo que el usuario realmente necesita.',
    cardResult:
      'El producto correcto es el primer resultado en el 65% de las búsquedas y está entre los tres primeros en el 90% — aunque el usuario use otro término u otro idioma.',
    techTerms: ['Embeddings', 'Qdrant', 'pgvector', 'PostgreSQL'],
    infraTerms: ['Sincronización diaria', 'Escalabilidad'],

    kicker: 'Búsqueda semántica · Retail e industria',
    title: 'Buscador semántico para catálogos industriales: +200,000 SKUs que se encuentran por significado',
    seoTitle: 'Buscador semántico para catálogos industriales: caso real de +200K SKUs',
    seoDescription:
      'Cómo construimos un buscador semántico para un catálogo industrial de más de 200,000 SKUs: embeddings, búsqueda híbrida, curación de datos y validación. Caso real en producción, explicado paso a paso.',
    lede:
      'Un distribuidor industrial con más de 200,000 SKUs tenía el problema que todo el sector conoce: el buscador solo encontraba lo que se escribía exactamente igual que en el maestro de productos. Construimos un buscador que entiende lo que el usuario quiere decir — y lo pusimos en producción: hoy el producto correcto aparece como primer resultado en el 65% de las búsquedas, y entre los tres primeros en el 90%, aunque el cliente use otro término, otro idioma o solo describa para qué sirve.',
    context: [
      'En un catálogo industrial las descripciones no las escribe marketing: las escribe quien registra el producto. Abreviaturas, códigos de fabricante, tallas pegadas al texto, jerga de rubro. El resultado es que una búsqueda de "guantes para químicos" no encuentra el "GUANTE NITRILO VERDE T-9", aunque sea exactamente lo que el cliente necesita.',
      'El costo de eso es silencioso pero enorme: búsquedas que terminan en "sin resultados", clientes que dependen del vendedor veterano que se sabe el catálogo de memoria, y ventas que se pierden porque el producto sí existía — pero nadie lo encontró. Con más de 200,000 SKUs, ningún ser humano puede ser el índice.',
    ],
    solutionIntro: [
      'La solución fue dejar de buscar palabras y empezar a buscar significado. Cada producto del catálogo se convierte en un vector — un embedding — que captura de qué trata: material, uso, categoría, sinónimos técnicos. La consulta del usuario se convierte en otro vector, y el sistema encuentra los productos más cercanos en significado, aunque no compartan ni una sola palabra. Y cuando el producto exacto no existe en el catálogo, ese mismo espacio de significado propone los sustitutos más cercanos — la otra mitad del trabajo real de un mostrador.',
      'Pero el embedding no se calcula sobre la descripción cruda. Antes se limpia y se enriquece: se normalizan abreviaturas, se expande la jerga, se estructura marca, categoría y atributos. Esa curación del texto resultó tan determinante como el modelo de embeddings elegido — la mitad del proyecto fue ingeniería de datos, no IA.',
    ],
    decisions: [
      {
        title: 'Búsqueda híbrida, no solo vectores',
        body: 'El vector encuentra por significado, pero un código de parte exacto lo encuentra mejor la búsqueda tradicional. Combinamos ambas: keywords para lo literal (códigos, marcas, medidas) y semántica para la intención. El ranking final mezcla las dos señales.',
      },
      {
        title: 'Curar el texto antes de embeber',
        body: 'Normalizamos abreviaturas ("T-9" → "talla 9"), expandimos jerga del rubro y estructuramos los atributos. Un embedding calculado sobre texto sucio devuelve resultados sucios: la calidad del buscador se decide antes de tocar el modelo.',
      },
      {
        title: 'El catálogo cambia todos los días',
        body: 'Altas, bajas y cambios de precio se sincronizan de forma automática, y el índice vectorial se actualiza sin ventanas de mantenimiento. Un buscador que muestra productos descontinuados destruye en una semana la confianza que ganó en meses.',
      },
    ],
    stack: [
      { name: 'Embeddings multilingües', role: 'Convierten productos y consultas en vectores de significado' },
      { name: 'Qdrant / pgvector', role: 'Índice vectorial para búsqueda por similitud a escala' },
      { name: 'PostgreSQL', role: 'Maestro de productos y atributos estructurados' },
      { name: 'Pipeline de curación', role: 'Normaliza abreviaturas y jerga antes de embeber' },
      { name: 'API de búsqueda híbrida', role: 'Mezcla señal semántica y literal en un solo ranking' },
      { name: 'Docker sobre Linux', role: 'Despliegue reproducible, respaldos automáticos' },
    ],
    businessIntro:
      'El beneficio de fondo no es "un buscador mejor": es que el conocimiento del vendedor experto deja de ser el único camino al catálogo. Cualquier persona — cliente nuevo, vendedor junior, área de compras — encuentra lo que necesita describiéndolo con sus propias palabras.',
    outcomes: [
      '65% de las búsquedas con el producto exacto como primer resultado, y 90% dentro de los tres primeros — medido con búsquedas reales.',
      'Menos búsquedas "sin resultados": si el producto exacto no está, el sistema propone los sustitutos más cercanos.',
      'El catálogo completo se vuelve vendible, no solo la parte que el equipo se sabe de memoria.',
      'La misma base semántica queda lista para cotizadores y agentes de IA sobre el catálogo.',
    ],
    applications: [
      { sector: 'Distribuidores industriales', use: 'Catálogos técnicos con decenas de miles de SKUs y descripciones crípticas.' },
      { sector: 'E-commerce B2B', use: 'Búsqueda que convierte: el cliente describe, el sistema encuentra.' },
      { sector: 'Repuestos y autopartes', use: 'Encontrar la pieza por función y equipo, no solo por código.' },
      { sector: 'Farmacéutico y laboratorio', use: 'Insumos con nomenclatura técnica y múltiples sinónimos.' },
    ],
    faq: [
      {
        q: '¿Necesito cambiar mi ERP o mi tienda online para tener búsqueda semántica?',
        a: 'No. El buscador se integra como una API: tu plataforma envía la consulta y recibe los resultados ordenados. El maestro de productos sigue viviendo donde vive hoy; el sistema se sincroniza con él.',
      },
      {
        q: '¿Funciona con descripciones en español, con abreviaturas y jerga?',
        a: 'Sí — ese fue exactamente este caso: descripciones crípticas, tallas pegadas al texto y jerga de rubro. Parte del trabajo es construir el diccionario de normalización específico de tu catálogo.',
      },
      {
        q: '¿Cuánto toma poner un buscador semántico en producción?',
        a: 'Depende del estado de los datos, pero el patrón ya está probado: una primera versión útil se pone en producción en semanas, y se afina con las búsquedas reales de tus usuarios.',
      },
      {
        q: '¿Qué pasa con los productos nuevos o descontinuados?',
        a: 'La sincronización es automática: altas, bajas y cambios de precio fluyen al índice todos los días sin intervención manual.',
      },
    ],
    related: ['ai-quoting-engine', 'realtime-sales-copilot'],
  },

  // ============================================================
  // 2 · VALIDACIÓN DOCUMENTAL INSURTECH
  // ============================================================
  {
    slug: 'document-validation-insurtech',
    industry: 'Insurtech · Legal (EE.UU.)',
    tagline: 'Análisis automatizado de documentos complejos, con citas verificables',
    cardProblem:
      'Los profesionales de claims y legales pasan horas revisando documentos extensos para extraer información crítica y evaluar riesgos.',
    cardResult:
      'La IA hace la primera lectura con citas verificables: 98% de coincidencia con los analistas humanos, medido en dos semanas de evaluación en paralelo.',
    techTerms: ['Claude', 'GPT', 'OCR', 'Prompt engineering'],
    infraTerms: ['Encriptación', 'Failover de modelos'],

    kicker: 'IA generativa · Insurtech y legal',
    title: 'Validación documental con IA generativa para equipos de claims y legales',
    seoTitle: 'IA generativa para validación documental en seguros: caso insurtech',
    seoDescription:
      'Cómo automatizamos el análisis de documentos complejos para una insurtech en EE.UU.: extracción con citas verificables, doble modelo con failover y seguridad de datos. Caso real en producción.',
    lede:
      'Los equipos de claims y legales de una insurtech en Estados Unidos pasaban horas leyendo documentos extensos para extraer datos críticos y evaluar riesgos. Construimos un sistema que hace la primera lectura por ellos — con citas verificables al documento original, no con resúmenes que hay que creer por fe.',
    context: [
      'Pólizas, endosos, cartas de reclamo, reportes periciales: documentos largos, con formatos inconsistentes y muchas veces escaneados. La información crítica — coberturas, exclusiones, fechas, montos — está ahí, pero enterrada. Y quien la busca es un profesional cuyo tiempo cuesta caro.',
      'El riesgo no es solo el costo de esas horas: es lo que se escapa. Una exclusión no vista o una fecha mal leída puede cambiar el resultado de un caso completo. El proceso manual no solo era lento — era difícil de auditar.',
    ],
    solutionIntro: [
      'El sistema recibe el documento, lo digitaliza si hace falta (OCR) y lo pasa por modelos de lenguaje con instrucciones especializadas por tipo de documento. La salida no es un resumen: es una extracción estructurada — cada campo con su valor y, esto es lo importante, con la referencia exacta al pasaje del documento donde lo dice.',
      'Lo difícil en este tipo de sistema no es resumir: es no inventar. Toda la arquitectura está diseñada alrededor de la verificabilidad — la IA propone, señala dónde lo leyó, y el profesional confirma en un clic. La primera lectura la hace la máquina; la firma la pone el humano. Y la prueba final no fue una demo: el sistema corrió dos semanas en paralelo con los analistas, respondiendo los mismos casos, y alcanzó un 98% de coincidencia con las respuestas humanas antes de asumir el trabajo.',
    ],
    decisions: [
      {
        title: 'Citas, no confianza ciega',
        body: 'Cada dato extraído apunta al pasaje original del documento. El profesional no tiene que releer todo para confiar: verifica exactamente lo señalado. Esa trazabilidad convierte a la IA en una herramienta auditable, no en una caja negra.',
      },
      {
        title: 'Más de un modelo, con failover',
        body: 'Usamos Claude y GPT según la tarea, con respaldo automático si un proveedor falla o degrada. Un sistema de producción que procesa casos reales no puede depender de la disponibilidad de un solo vendor.',
      },
      {
        title: 'Seguridad antes que velocidad',
        body: 'Documentos legales y de seguros son datos sensibles: encriptación en tránsito y en reposo, controles de acceso por rol, y una regla dura — los datos del cliente jamás se usan para entrenar modelos.',
      },
    ],
    stack: [
      { name: 'Claude y GPT vía API', role: 'Lectura y extracción, cada uno donde rinde mejor' },
      { name: 'OCR', role: 'Digitaliza documentos escaneados y fotos' },
      { name: 'Prompts por tipo de documento', role: 'Instrucciones especializadas: una póliza no se lee como una carta' },
      { name: 'Extracción estructurada', role: 'Salida en campos verificables, no prosa' },
      { name: 'Encriptación extremo a extremo', role: 'Datos sensibles protegidos en tránsito y reposo' },
      { name: 'Reportes automáticos', role: 'El resultado llega listo para decisión' },
    ],
    businessIntro:
      'El cambio operativo es directo: el experto deja de leer documentos completos y pasa a validar hallazgos señalados. Su criterio — lo que de verdad es caro — se concentra donde importa.',
    outcomes: [
      '98% de coincidencia con las respuestas de los analistas humanos — dos semanas de evaluación en paralelo antes de entrar a producción.',
      'Reducción drástica del tiempo de análisis por documento: de horas a minutos.',
      'Menos riesgo de omisión: la máquina no se cansa en la página 40.',
      'Escala en picos de volumen sin contratar ni sacrificar calidad.',
      'Cada dato queda trazado a su fuente: el proceso completo es auditable.',
    ],
    applications: [
      { sector: 'Seguros', use: 'Claims, underwriting y análisis de pólizas y endosos.' },
      { sector: 'Legal', use: 'Revisión de contratos, due diligence, discovery documental.' },
      { sector: 'Banca', use: 'KYC, análisis de expedientes crediticios y garantías.' },
      { sector: 'Auditoría y compliance', use: 'Verificación documental masiva con trazabilidad.' },
    ],
    faq: [
      {
        q: '¿Cómo evitan que la IA invente datos que no están en el documento?',
        a: 'Cada campo extraído viene con la cita al pasaje original, y el flujo exige validación humana antes de cualquier decisión. Si el modelo no encuentra un dato, el sistema lo dice — no lo rellena.',
      },
      {
        q: '¿Funciona con documentos escaneados o fotos?',
        a: 'Sí. El pipeline incluye OCR para digitalizar escaneos y fotografías antes del análisis. La calidad del original influye, pero el sistema está diseñado para el mundo real, no para PDFs perfectos.',
      },
      {
        q: '¿Qué pasa con la confidencialidad de los documentos?',
        a: 'Encriptación en tránsito y en reposo, acceso por roles, y los datos jamás se usan para entrenar modelos. El sistema se diseñó para una industria regulada de EE.UU. desde el primer día.',
      },
      {
        q: '¿Sirve para documentos en español?',
        a: 'Sí. Los modelos de lenguaje actuales trabajan igual de bien en español e inglés; las instrucciones por tipo de documento se adaptan a la jurisdicción y al formato local.',
      },
    ],
    related: ['lead-generation-insurtech', 'ai-recruiting-ats'],
  },

  // ============================================================
  // 3 · LEADS CON IA + CLIMA
  // ============================================================
  {
    slug: 'lead-generation-insurtech',
    industry: 'Insurtech (EE.UU.)',
    tagline: 'Oportunidades de negocio detectadas por eventos climáticos reales',
    cardProblem:
      'Identificar propiedades con potencial daño por clima, a mano, llega tarde: cuando el equipo comercial reacciona, la oportunidad pasó.',
    cardResult:
      'Leads generados en tiempo real cruzando eventos climáticos con datos geoespaciales de propiedades. Hoy cubre tres estados de EE.UU.',
    techTerms: ['LLMs', 'APIs meteorológicas', 'PostGIS', 'Firebase'],
    infraTerms: ['Multi-tenant', 'Alta disponibilidad'],

    kicker: 'IA + datos climáticos · Insurtech (EE.UU.)',
    title: 'Generación de leads para aseguradoras con IA y datos climáticos en tiempo real',
    seoTitle: 'Leads con IA y datos climáticos para aseguradoras: caso real',
    seoDescription:
      'Plataforma que cruza eventos climáticos (granizo, viento, tormentas) con datos geoespaciales de propiedades para generar leads en tiempo real. Multi-tenant, en producción en EE.UU.',
    lede:
      'Cuando una tormenta golpea una zona, hay propietarios que acaban de convertirse en clientes potenciales — y una ventana corta para llegar primero. Construimos una plataforma que cruza eventos climáticos reales con datos geoespaciales de propiedades para identificar esas oportunidades mientras siguen siendo oportunidades.',
    context: [
      'En el negocio de seguros y servicios a la propiedad, el momento lo es todo: un lead vale más en las horas posteriores al evento que una semana después. El proceso manual — mirar el clima, adivinar zonas, llamar en frío — llega sistemáticamente tarde y desperdicia al equipo comercial en zonas donde no pasó nada.',
      'El dato existía: los servicios meteorológicos reportan granizo, viento y tormentas severas con precisión de zona. Lo que faltaba era el cruce automático entre "dónde golpeó" y "qué propiedades hay ahí" — y convertir ese cruce en trabajo accionable para un vendedor.',
    ],
    solutionIntro: [
      'La plataforma monitorea el 100% de las estaciones meteorológicas de su territorio — hoy, tres estados de Estados Unidos — y, cuando detecta un evento severo, ejecuta el cruce geoespacial: qué propiedades del territorio del cliente caen dentro del área afectada. Ahí entra la capa de IA: priorizar, filtrar y redactar el contexto de cada oportunidad para que el equipo comercial reciba un lead trabajable, no una coordenada.',
      'Todo el sistema es multi-tenant y autoservicio, con pasarela de pago integrada: cada empresa se suscribe, define su territorio y ve solo sus datos, sobre la misma infraestructura. Y como el valor decae por hora, la arquitectura está pensada para latencia baja de punta a punta — del evento climático al lead en pantalla.',
    ],
    decisions: [
      {
        title: 'Geoespacial primero, IA después',
        body: 'El cruce espacial (PostGIS) hace el trabajo pesado de filtrar: es exacto, barato y rápido. El modelo de lenguaje entra después, donde aporta: priorizar oportunidades y redactar el contexto. Usar IA para lo que una consulta espacial resuelve mejor sería pagar de más por menos precisión.',
      },
      {
        title: 'Multi-tenant desde el día uno',
        body: 'La plataforma sirve a varias empresas con aislamiento estricto de datos por tenant. Diseñarlo después es una migración dolorosa; diseñarlo antes es una decisión de arquitectura.',
      },
      {
        title: 'Tiempo real de verdad',
        body: 'Un lead de tormenta vale por horas, no por días. El pipeline completo — ingesta del evento, cruce, priorización, notificación — está medido y optimizado para que el equipo comercial actúe el mismo día.',
      },
    ],
    stack: [
      { name: 'APIs meteorológicas', role: 'Eventos severos (granizo, viento, tormenta) en tiempo real' },
      { name: 'PostGIS', role: 'Cruce geoespacial entre evento y propiedades' },
      { name: 'LLMs', role: 'Priorización y redacción del contexto de cada lead' },
      { name: 'Firebase', role: 'Autenticación y datos en tiempo real hacia el frontend' },
      { name: 'Arquitectura multi-tenant', role: 'Varias empresas, datos estrictamente aislados' },
      { name: 'Alta disponibilidad', role: 'El clima no avisa: la plataforma no puede dormir' },
    ],
    businessIntro:
      'El equipo comercial deja de perseguir listas frías y empieza el día con oportunidades calificadas por un evento real: sabe dónde, sabe por qué, y llega antes que la competencia.',
    outcomes: [
      'Leads proactivos basados en eventos reales, no en listas compradas.',
      'El territorio se trabaja cuando vale: horas después del evento.',
      'Menos desgaste comercial en zonas sin siniestro.',
      'Multi-tenant con pasarela de pago integrada: cada empresa se suscribe y opera su territorio con datos aislados.',
    ],
    applications: [
      { sector: 'Aseguradoras y brokers', use: 'Contacto proactivo post-evento en su cartera y territorio.' },
      { sector: 'Restauración de propiedades', use: 'Llegar primero donde el daño acaba de ocurrir.' },
      { sector: 'Energía y telecomunicaciones', use: 'Priorizar inspección de infraestructura tras eventos severos.' },
      { sector: 'Agro', use: 'Alertar pólizas paramétricas y evaluar daño por zona.' },
    ],
    faq: [
      {
        q: '¿De dónde salen los datos climáticos?',
        a: 'De servicios meteorológicos profesionales con cobertura del territorio del cliente, consumidos por API en tiempo real. La plataforma es agnóstica del proveedor: se elige el mejor dato disponible para cada geografía.',
      },
      {
        q: '¿Esto respeta la privacidad de los propietarios?',
        a: 'La plataforma trabaja con datos de propiedades de fuentes públicas y datos propios del cliente, dentro del marco legal de su territorio. No rastrea personas: cruza eventos climáticos con ubicaciones.',
      },
      {
        q: '¿Se integra con nuestro CRM?',
        a: 'Sí. Los leads se entregan por API o integración directa, con el contexto del evento incluido, para que entren a tu flujo comercial existente.',
      },
      {
        q: '¿Funciona fuera de Estados Unidos?',
        a: 'La arquitectura sí; la cobertura depende de la calidad del dato meteorológico y de propiedades disponible en cada país. Es la primera pregunta que evaluamos en un nuevo territorio.',
      },
    ],
    related: ['document-validation-insurtech', 'industrial-alerts-iot'],
  },

  // ============================================================
  // 4 · GEO-MARKETING
  // ============================================================
  {
    slug: 'geo-marketing-retail',
    stage: 'pilot',
    industry: 'Retail · Comercio',
    tagline: 'Marketing que llega solo a quien está cerca',
    cardProblem:
      'Los comercios desperdician presupuesto en publicidad masiva que llega a personas fuera de su área real de servicio.',
    cardResult:
      'Campañas por cercanía con ROI medible: solo pagas por alcance real, basado en ubicación.',
    techTerms: ['APIs de ubicación', 'Next.js', 'Socket.io', 'TypeScript'],
    infraTerms: ['Prometheus', 'Grafana', 'Observabilidad'],

    kicker: 'IA + geolocalización · Retail',
    title: 'Marketing geolocalizado: publicidad que solo llega a quien está cerca de tu negocio',
    seoTitle: 'Marketing geolocalizado con IA para comercios: caso real',
    seoDescription:
      'Plataforma de marketing por cercanía en tiempo real: campañas que llegan solo a personas dentro del área de servicio del comercio, con ROI medible y observabilidad completa. Caso en producción.',
    lede:
      'Para un restaurante, una farmacia o una tienda de barrio, un anuncio visto a veinte kilómetros es dinero tirado. Construimos una plataforma de marketing por cercanía: las campañas llegan únicamente a personas dentro del área real de servicio del comercio, en el momento en que están cerca.',
    context: [
      'La publicidad digital masiva se vende por impresiones, y para un negocio local la mayoría de esas impresiones no puede convertirse en venta: la persona está demasiado lejos. El comercio pequeño termina subsidiando alcance que no le sirve.',
      'La alternativa obvia — segmentar por ciudad o distrito — sigue siendo gruesa: el área de servicio real de un comercio es un radio de cuadras, no un distrito completo. Y el momento importa: la persona cerca hoy a la hora del almuerzo vale más que la misma persona un domingo en otra parte de la ciudad.',
    ],
    solutionIntro: [
      'La plataforma gestiona campañas por radio de cercanía en tiempo real: el comercio define su oferta y su zona, y el sistema entrega el mensaje solo a usuarios dentro de esa área, con comunicación bidireccional en vivo (WebSockets) para que la oferta aparezca y expire en el momento correcto.',
      'La otra mitad del sistema es la medición honesta: cada campaña reporta alcance real por ubicación, no impresiones abstractas. El comercio ve exactamente cuántas personas dentro de su zona recibieron la oferta, y la infraestructura completa está instrumentada para detectar problemas antes que el usuario.',
    ],
    decisions: [
      {
        title: 'Pagar por alcance real, no por impresiones',
        body: 'El modelo se diseñó al revés de la publicidad masiva: la unidad de valor es la persona dentro del área de servicio. Eso alinea el incentivo de la plataforma con el del comercio — y hace el ROI medible sin actos de fe.',
      },
      {
        title: 'Tiempo real con WebSockets',
        body: 'Una oferta de cercanía es perecedera: vale mientras la persona está cerca. La entrega usa Socket.io para comunicación bidireccional en vivo, en lugar de notificaciones diferidas que llegan cuando el momento pasó.',
      },
      {
        title: 'Observabilidad desde el diseño',
        body: 'Prometheus y Grafana instrumentan la plataforma desde el primer despliegue: latencia de entrega, campañas activas, salud de cada servicio. En un sistema de tiempo real, enterarse de los problemas por el cliente es llegar tarde dos veces.',
      },
    ],
    stack: [
      { name: 'APIs de ubicación', role: 'Determinan cercanía al área de servicio, con consentimiento del usuario' },
      { name: 'Socket.io', role: 'Entrega bidireccional en tiempo real' },
      { name: 'Next.js + TypeScript', role: 'Aplicación web rápida y tipada de punta a punta' },
      { name: 'Prometheus', role: 'Métricas de toda la plataforma' },
      { name: 'Grafana', role: 'Tableros de salud y de negocio en vivo' },
    ],
    businessIntro:
      'Para el comercio local, el presupuesto de marketing deja de comprar humo: cada sol invertido compra alcance dentro de la zona donde una venta es físicamente posible.',
    outcomes: [
      'Cero gasto en audiencias fuera del área de servicio.',
      'ROI medible por campaña: alcance real, en la zona real.',
      'Ofertas que llegan en el momento oportuno, no horas después.',
      'Plataforma instrumentada: los problemas se detectan antes que el usuario.',
    ],
    applications: [
      { sector: 'Restaurantes y cafeterías', use: 'Ofertas de hora valle a quien está a cuadras.' },
      { sector: 'Cadenas con locales', use: 'Campañas por tienda, cada una con su radio real.' },
      { sector: 'Delivery y dark stores', use: 'Demanda dirigida dentro de la zona de reparto.' },
      { sector: 'Eventos y entretenimiento', use: 'Llenar aforo con audiencia que puede llegar hoy.' },
    ],
    faq: [
      {
        q: '¿Cómo se maneja la privacidad de la ubicación de los usuarios?',
        a: 'La ubicación se usa con consentimiento explícito y únicamente para decidir si una oferta aplica; no se construyen historiales de movimiento. La cercanía se evalúa en el momento, no se vigila a la persona.',
      },
      {
        q: '¿Qué diferencia esto de la publicidad segmentada de las redes sociales?',
        a: 'La granularidad y el modelo de cobro: aquí la zona es el radio real de tu negocio — cuadras, no distritos — y pagas por alcance dentro de esa zona, no por impresiones donde sea.',
      },
      {
        q: '¿Un negocio pequeño puede usarlo o es solo para cadenas?',
        a: 'Se diseñó justamente para que un comercio individual defina su oferta y su radio en minutos. Las cadenas lo usan igual, con un radio por local.',
      },
      {
        q: '¿Cómo sé que la campaña funcionó?',
        a: 'Cada campaña reporta alcance real por ubicación y momento. El tablero muestra cuántas personas dentro de tu zona recibieron la oferta — sin métricas infladas por alcance inútil.',
      },
    ],
    related: ['industrial-alerts-iot', 'semantic-search-retail'],
  },

  // ============================================================
  // 5 · DIMENSIONAMIENTO LOGÍSTICO
  // ============================================================
  {
    slug: 'logistics-dimensioning',
    stage: 'pilot',
    industry: 'Logística · Courier',
    tagline: 'Cotización instantánea comparando múltiples carriers',
    cardProblem:
      'Calcular peso volumétrico a mano es lento y propenso a errores — y cada carrier usa un factor dimensional distinto.',
    cardResult:
      'Dimensiones por visión artificial y cotización instantánea comparando carriers nacionales e internacionales.',
    techTerms: ['Vision AI', 'APIs de carriers', 'Next.js', 'Python'],
    infraTerms: ['Integración ERP', 'CI/CD'],

    kicker: 'Visión por computadora · Logística',
    title: 'Dimensionamiento volumétrico con visión por computadora para courier y logística',
    seoTitle: 'Peso volumétrico con visión artificial: cotización multi-carrier',
    seoDescription:
      'Cómo automatizamos el cálculo de peso volumétrico con visión por computadora y un motor de tarifas multi-carrier: de la foto del paquete a la cotización comparada en segundos. Caso en producción.',
    lede:
      'En courier, el error de medición se paga dos veces: si declaras de menos, el carrier te recobra; si declaras de más, pierdes al cliente por precio. Construimos un sistema que estima las dimensiones del paquete con visión por computadora y cotiza al instante contra múltiples carriers — cada uno con su propio factor volumétrico.',
    context: [
      'El peso volumétrico — esa fórmula que convierte el tamaño de la caja en kilos facturables — gobierna el precio de todo envío no denso. Medirlo a mano con wincha es lento, interrumpe la operación y produce errores que cuestan dinero en ambas direcciones.',
      'Para complicarlo, cada carrier usa su propio factor dimensional y sus propias reglas de redondeo. Comparar precios entre tres o cuatro carriers para cada paquete es un trabajo que nadie hace bien a mano — así que la mayoría de operaciones cotiza con un solo carrier por inercia y deja plata en la mesa.',
    ],
    solutionIntro: [
      'El flujo empieza en la cámara: el operador captura el paquete y la visión artificial estima sus dimensiones. Con las medidas y el peso real, el motor de tarifas aplica el factor dimensional y las reglas de cada carrier configurado — nacionales e internacionales — y devuelve la comparación de precios al instante.',
      'La segunda mitad del valor está en la integración: el resultado no vive en una app aparte, sino que fluye al sistema de gestión de la operación (ERP), de modo que cotizar bien no agregue un paso al proceso — lo reemplace.',
    ],
    decisions: [
      {
        title: 'La cámara como instrumento de medición',
        body: 'La visión por computadora convierte un teléfono o una cámara fija en un dimensionador. No alcanza la precisión de un escáner industrial de miles de dólares, pero elimina el error grueso y la fricción del proceso manual — que es donde se pierde el dinero.',
      },
      {
        title: 'Un motor de reglas por carrier, no una fórmula',
        body: 'Cada carrier tiene su factor, sus redondeos y sus excepciones. Modelamos las reglas como configuración por carrier en lugar de programarlas al centro del sistema: agregar un carrier nuevo es alta de configuración, no un desarrollo.',
      },
      {
        title: 'Integrado al flujo, no otra pantalla más',
        body: 'La cotización se inyecta al sistema que la operación ya usa. Una herramienta que exige cambiar de aplicación en plena operación de despacho termina sin usarse, por buena que sea.',
      },
    ],
    stack: [
      { name: 'Visión por computadora', role: 'Estima dimensiones del paquete desde la imagen' },
      { name: 'Motor de tarifas multi-carrier', role: 'Factor dimensional y reglas por carrier, configurables' },
      { name: 'APIs de carriers', role: 'Tarifas y servicios nacionales e internacionales' },
      { name: 'Next.js', role: 'Interfaz de operación rápida' },
      { name: 'Python', role: 'Procesamiento de imagen y lógica de cálculo' },
      { name: 'Integración con ERP', role: 'El resultado fluye al sistema de gestión existente' },
    ],
    businessIntro:
      'La operación gana en las dos puntas: deja de regalar kilos por medir mal, y deja de perder clientes por cotizar caro con el carrier equivocado.',
    outcomes: [
      'Cotización comparada entre carriers en segundos, no llamadas ni tablas de Excel.',
      'Menos recobros del carrier por dimensiones mal declaradas.',
      'El mejor precio disponible para cada paquete, no el del carrier por defecto.',
      'El proceso de despacho se acelera: medir deja de ser un cuello de botella.',
    ],
    applications: [
      { sector: 'Couriers y última milla', use: 'Dimensionar y cotizar en el punto de recepción.' },
      { sector: 'E-commerce', use: 'Costo de envío exacto antes de comprometer el precio al cliente.' },
      { sector: 'Almacenes y fulfillment', use: 'Verificación volumétrica en el flujo de salida.' },
      { sector: 'Exportadores', use: 'Comparar carriers internacionales con reglas distintas por destino.' },
    ],
    faq: [
      {
        q: '¿Qué precisión tiene la medición por cámara?',
        a: 'Suficiente para eliminar el error grueso del proceso manual, que es donde se pierde dinero. Para cargas donde el centímetro cambia la tarifa, el sistema permite ajustar la medida antes de cotizar — la visión propone, el operador confirma.',
      },
      {
        q: '¿Cuántos carriers se pueden comparar?',
        a: 'Los que la operación necesite: las reglas de cada carrier son configuración, no código. Agregar uno nuevo no requiere un proyecto de desarrollo.',
      },
      {
        q: '¿Se integra con nuestro sistema de gestión?',
        a: 'Sí — ese es el diseño: la cotización fluye a tu ERP o sistema operativo por API, para que el equipo no cambie de pantalla en plena operación.',
      },
      {
        q: '¿Necesito hardware especial?',
        a: 'No para empezar: la visión trabaja con cámaras estándar. Un escáner dimensional industrial solo se justifica en volúmenes donde el centímetro es dinero — y el sistema puede convivir con él.',
      },
    ],
    related: ['ai-quoting-engine', 'semantic-search-retail'],
  },

  // ============================================================
  // 6 · ALERTAS GEOLOCALIZADAS IOT
  // ============================================================
  {
    slug: 'industrial-alerts-iot',
    stage: 'pilot',
    industry: 'Industrial · Minería · Oil & Gas',
    tagline: 'Saber cuándo ponerse a buen recaudo',
    cardProblem:
      'El personal en operaciones críticas no sabe si un evento de riesgo — tormenta eléctrica, incidente — realmente lo afecta a él.',
    cardResult:
      'Alertas por zona que suenan con la app cerrada y el celular bloqueado. Diseñadas para privacidad.',
    techTerms: ['IoT', 'APIs meteorológicas', 'Failover de modelos'],
    infraTerms: ['Alta disponibilidad', '24/7', 'Docker', 'Linux'],

    kicker: 'IoT + geolocalización · Minería e industria',
    title: 'Alertas geolocalizadas para operaciones críticas: avisos que llegan con el celular bloqueado',
    seoTitle: 'Alertas geolocalizadas IoT para minería e industria: caso real',
    seoDescription:
      'Sistema de alerta temprana por zonas para operaciones críticas: eventos meteorológicos e IoT, notificaciones que atraviesan el modo silencio, y privacidad por diseño. En producción 24/7.',
    lede:
      'En una operación minera o de hidrocarburos, un evento de riesgo — una tormenta eléctrica, un incidente — afecta a una zona, no a toda la operación. La pregunta que salva vidas es individual: ¿me toca a mí ponerme a buen recaudo? Construimos un sistema de alertas que responde esa pregunta y llega aunque el celular esté bloqueado.',
    context: [
      'Los canales normales — chat grupal, correo, radio — tienen dos fallas para la emergencia: no distinguen a quién le toca (todos reciben todo, y el exceso de avisos entrena a ignorarlos) y no atraviesan un teléfono en silencio dentro de un bolsillo.',
      'Además, la solución obvia — rastrear la ubicación de cada trabajador — choca con algo legítimo: nadie quiere ser vigilado. El sistema tenía que resolver la tensión entre alertar por ubicación y no convertirse en una herramienta de vigilancia.',
    ],
    solutionIntro: [
      'La plataforma recibe eventos de fuentes meteorológicas profesionales y de sensores IoT en campo, decide qué zonas están en riesgo, y dispara notificaciones críticas — del tipo que suena con la app cerrada y el teléfono bloqueado o en silencio — solo a las personas cuya zona está afectada.',
      'La privacidad es de diseño, no de política: la ubicación sirve únicamente para decidir si la alerta te corresponde, y no se construyen historiales de movimiento. El sistema sabe a quién alertar sin convertirse en un rastreador.',
    ],
    decisions: [
      {
        title: 'Alertas críticas, no notificaciones más',
        body: 'Usamos los canales de alerta crítica del sistema operativo del teléfono — los mismos que usan las alertas de emergencia — para que el aviso suene con el equipo bloqueado o en silencio. Una alerta de seguridad que depende de que el usuario tenga la app abierta no es una alerta.',
      },
      {
        title: 'Privacidad como requisito de ingeniería',
        body: 'La ubicación decide la alerta y nada más: sin historiales, sin vigilancia. Esa decisión no es solo ética — es lo que hace que los trabajadores acepten llevar el sistema encima, y sin adopción no hay seguridad.',
      },
      {
        title: 'Failover en todo lo que puede fallar',
        body: 'Fuentes de datos redundantes, respaldo automático entre modelos de IA y una infraestructura pensada para operar 24/7. Un sistema de seguridad tiene un contrato distinto al de cualquier otra aplicación: no puede tener un mal día.',
      },
    ],
    stack: [
      { name: 'APIs meteorológicas profesionales', role: 'Eventos severos con precisión de zona' },
      { name: 'Sensores IoT en campo', role: 'Señal local que el satélite no ve' },
      { name: 'Motor de zonas de riesgo', role: 'Decide a quién alertar, y a quién no' },
      { name: 'Notificaciones críticas', role: 'Atraviesan el modo silencio y el teléfono bloqueado' },
      { name: 'Failover entre modelos', role: 'Ningún proveedor de IA es punto único de falla' },
      { name: 'Docker sobre Linux, 24/7', role: 'Operación continua con respaldos y monitoreo' },
    ],
    businessIntro:
      'Para una operación con personal en campo, esto convierte la seguridad reactiva en anticipación: la persona correcta recibe el aviso correcto con minutos de ventaja — y los que no están en riesgo no reciben ruido que los entrene a ignorar la próxima alerta.',
    outcomes: [
      'El aviso llega aunque el teléfono esté bloqueado, en silencio o con la app cerrada.',
      'Solo alerta a quien está en la zona afectada: cero fatiga de alarmas.',
      'Privacidad por diseño: alerta por ubicación sin vigilar a las personas.',
      'Operación continua 24/7 con redundancia en datos, modelos e infraestructura.',
    ],
    applications: [
      { sector: 'Minería', use: 'Tormentas eléctricas, tránsito de equipo pesado, evacuaciones por zona.' },
      { sector: 'Oil & Gas', use: 'Incidentes en instalaciones con personal distribuido.' },
      { sector: 'Construcción', use: 'Riesgos meteorológicos en obras extensas.' },
      { sector: 'Agroindustria', use: 'Personal de campo ante eventos climáticos severos.' },
    ],
    faq: [
      {
        q: '¿La alerta de verdad suena con el celular en silencio?',
        a: 'Sí — se usan los canales de notificación crítica del sistema operativo, los mismos de las alertas de emergencia. Ese fue un requisito de diseño desde el día uno: la app cerrada y el teléfono bloqueado son el caso normal, no la excepción.',
      },
      {
        q: '¿El sistema rastrea a los trabajadores?',
        a: 'No. La ubicación se usa únicamente para decidir si la alerta corresponde, y no se guardan historiales de movimiento. El diseño separa "saber a quién alertar" de "saber dónde estuvo cada uno" — solo hace lo primero.',
      },
      {
        q: '¿Qué pasa si falla la fuente de datos o el proveedor de IA?',
        a: 'Hay redundancia en las tres capas: fuentes de datos alternativas, failover automático entre modelos y una infraestructura monitoreada 24/7. Un sistema de seguridad se diseña asumiendo que sus piezas van a fallar.',
      },
      {
        q: '¿Sirve para operaciones sin cobertura celular completa?',
        a: 'El sistema combina canales: donde hay datos llega al teléfono, y puede integrarse con los medios locales de la operación (sirenas, radio) para zonas sin cobertura. La arquitectura de zonas es la misma.',
      },
    ],
    related: ['lead-generation-insurtech', 'realtime-sales-copilot'],
  },

  // ============================================================
  // 7 · COPILOTO COMERCIAL (NUEVO)
  // ============================================================
  {
    slug: 'realtime-sales-copilot',
    stage: 'pilot',
    industry: 'Ventas B2B · Agente ambiental',
    tagline: 'IA que asiste al vendedor durante la videollamada, en vivo',
    cardProblem:
      'El vendedor técnico necesita specs, precios e historia de la cuenta mientras conversa — y buscarlos en vivo rompe la conversación.',
    cardResult:
      'Un copiloto que escucha la llamada y sopla en pantalla el dato o la pregunta correcta, solo visible para el vendedor.',
    techTerms: ['STT streaming', 'LLMs en dos niveles', 'Base vectorial propia'],
    infraTerms: ['App nativa', 'Overlay invisible', 'Audio dual'],

    kicker: 'Agente ambiental · Ventas B2B',
    title: 'Copiloto comercial en tiempo real: IA que asiste al vendedor durante la videollamada',
    seoTitle: 'Copiloto de ventas con IA en tiempo real: cómo lo construimos',
    seoDescription:
      'Un asistente de ventas con IA que escucha la videollamada y muestra al vendedor — solo a él — el dato o la pregunta correcta en el momento exacto, desde una base de conocimiento propia. Así lo construimos.',
    lede:
      'Nuestro sistema más reciente: un copiloto que escucha la videollamada del vendedor y le muestra en pantalla — solo a él — el dato, la cifra o la pregunta correcta en el momento exacto. No dicta guiones: sopla ayudas de un vistazo, alimentadas por el conocimiento de la propia empresa.',
    context: [
      'En una venta técnica, el vendedor conversa mientras hace malabares con la memoria: especificaciones, precios, historia de la cuenta, la objeción que este cliente puso hace tres meses. Detenerse a buscar rompe el ritmo de la conversación; no buscar significa responder a medias y quedar en "te lo confirmo después".',
      'El conocimiento que hace ganar esas conversaciones existe — está en fichas de producto, en comparativas contra la competencia, en la historia de cada cuenta — pero vive repartido en documentos y, sobre todo, en la cabeza de los dos o tres expertos que no pueden estar en todas las llamadas.',
    ],
    solutionIntro: [
      'El copiloto captura el audio en dos canales — el micrófono es el vendedor, el audio del sistema es el interlocutor — y transcribe en streaming mientras la conversación fluye. Sobre esa transcripción, un juez de dos niveles decide en cada momento una de tres cosas: buscar, sugerir o callar. Cuando actúa, el resultado aparece como una tarjeta de un vistazo — verbo y unas pocas palabras — en un overlay que el interlocutor nunca ve, ni siquiera cuando se comparte pantalla.',
      'La diferencia frente a un asistente genérico está en de dónde salen las respuestas: antes de tocar la web, el copiloto consulta tres cajones de conocimiento propio — los hechos vivos del dominio, las fichas y comparativas de producto, y la ficha de la cuenta con su historia. La web solo complementa. Un copiloto que responde con lo mismo que cualquiera puede googlear no es una ventaja competitiva.',
    ],
    decisions: [
      {
        title: 'Intenciones, no guiones',
        body: 'El copiloto sugiere "→ pregunta por las pérdidas de la última campaña", nunca la frase textual para leer. Un vendedor leyendo suena a robot; un vendedor al que le recordaron el punto correcto suena a experto. La regla salió de probar ambas: los guiones se notan.',
      },
      {
        title: 'Dos niveles de modelo, latencia de conversación',
        body: 'Un modelo rápido actúa de portero — ¿vale la pena intervenir ahora? — y solo cuando la respuesta es sí, un modelo más capaz redacta la ayuda. Así el sistema opera al ritmo de una conversación humana, no al de un chatbot que piensa cinco segundos.',
      },
      {
        title: 'Callar es una función, no una falla',
        body: 'El peor copiloto es el que interrumpe todo el tiempo. El éxito se mide en precisión del disparo — la tarjeta correcta, a tiempo, sin spam — y el vendedor entrena al sistema con un clic: útil, dame otra, o quitar. Ese feedback afina cuándo hablar y cuándo no.',
      },
      {
        title: 'Invisible en la pantalla compartida',
        body: 'El overlay está excluido de la captura de pantalla a nivel del sistema operativo: el vendedor puede compartir su pantalla completa y el copiloto sigue siendo solo suyo. Sin eso, la herramienta moriría en la primera demo con cliente.',
      },
    ],
    stack: [
      { name: 'Transcripción streaming (STT)', role: 'Texto en vivo con latencia de conversación' },
      { name: 'Captura de audio dual', role: 'Micrófono = vendedor, sistema = interlocutor: roles sin adivinar' },
      { name: 'LLMs en dos niveles', role: 'Portero rápido + redactor capaz, vía API' },
      { name: 'Base de conocimiento vectorial', role: 'Tres cajones propios: dominio, producto, cuenta' },
      { name: 'App nativa de escritorio', role: 'Overlay excluido de la captura de pantalla' },
      { name: 'Minuta automática', role: 'Acta con compromisos al colgar, sin trabajo posterior' },
    ],
    businessIntro:
      'Cada vendedor entra a la llamada con la memoria de toda la empresa: las specs, la historia de la cuenta y los argumentos del mejor vendedor de la casa, disponibles en el segundo en que se necesitan.',
    outcomes: [
      'El soplo llega en ~3 segundos cuando el dato vive en la base de conocimiento propia — velocidad de conversación, no de chatbot.',
      'El vendedor responde en el momento, sin "te lo confirmo después".',
      'El conocimiento del experto escala a todo el equipo comercial.',
      'El onboarding comercial se acorta: el copiloto acompaña desde la primera llamada.',
      'La minuta y los compromisos quedan listos al colgar, con audio incluido.',
    ],
    applications: [
      { sector: 'Ventas técnicas B2B', use: 'Productos con especificaciones, normativa y comparativas complejas.' },
      { sector: 'Corredores y asesores', use: 'Seguros y finanzas: datos precisos con el cliente en línea.' },
      { sector: 'Atención al cliente', use: 'Soporte que responde con la base de conocimiento en el oído.' },
      { sector: 'Reclutamiento', use: 'Entrevistas con la ficha del candidato y las preguntas correctas a la vista.' },
    ],
    faq: [
      {
        q: '¿El cliente se da cuenta de que el vendedor usa un copiloto?',
        a: 'No. El overlay es invisible en la pantalla compartida — está excluido de la captura a nivel del sistema operativo — y las ayudas son tan breves que se leen de un vistazo, sin desviar la mirada ni el ritmo de la conversación.',
      },
      {
        q: '¿Esto graba las llamadas?',
        a: 'El copiloto transcribe para asistir en vivo y para generar la minuta al final. Qué se conserva y por cuánto tiempo lo define la política de cada empresa, incluyendo el consentimiento que su marco legal exija.',
      },
      {
        q: '¿De dónde saca las respuestas?',
        a: 'Primero de tu propio conocimiento — fichas de producto, comparativas, historia de la cuenta — cargado en una base vectorial privada. La web solo complementa. Esa es la diferencia con un asistente genérico: responde con lo que solo tu empresa sabe.',
      },
      {
        q: '¿Funciona en español?',
        a: 'Sí — nació en español, con vocabulario técnico del rubro incluido. El motor de transcripción y los modelos manejan también inglés y conversaciones mezcladas.',
      },
    ],
    related: ['semantic-search-retail', 'ai-recruiting-ats'],
  },

  // ============================================================
  // 8 · ATS CON IA (NUEVO)
  // ============================================================
  {
    slug: 'ai-recruiting-ats',
    stage: 'pilot',
    industry: 'RR.HH. · Reclutamiento',
    tagline: 'Leer todos los CVs y rankear con criterio, no con keywords',
    cardProblem:
      'Cientos de CVs por vacante: los filtros por palabra clave descartan buenos candidatos que describieron lo mismo con otras palabras.',
    cardResult:
      'Cada CV leído y estructurado por IA, y un ranking explicado: por qué cada candidato está donde está.',
    techTerms: ['LLMs', 'Extracción estructurada', 'Embeddings'],
    infraTerms: ['Ranking explicable', 'Multi-formato'],

    kicker: 'IA generativa · Recursos Humanos',
    title: 'ATS con IA: leer todos los CVs y rankear candidatos con criterio, no con keywords',
    seoTitle: 'ATS con IA: lectura de CVs y ranking explicable de candidatos',
    seoDescription:
      'Sistema de reclutamiento con IA que lee CVs en cualquier formato, extrae el perfil real y rankea candidatos contra el puesto con explicaciones auditables. Caso en producción.',
    lede:
      'Una vacante atractiva recibe cientos de CVs, y el filtro clásico por palabras clave descarta gente valiosa por un detalle de redacción. Construimos un sistema de reclutamiento donde la IA lee cada CV completo, entiende la experiencia aunque esté descrita con otras palabras, y entrega un ranking con las razones a la vista.',
    context: [
      'El embudo tradicional de reclutamiento tiene un defecto conocido: nadie puede leer quinientos CVs, así que se filtra por keywords — y el candidato que escribió "construí interfaces con React" pasa, mientras el que escribió "desarrollé el frontend de la plataforma" se pierde, aunque sea mejor.',
      'El resultado son dos costos invisibles: buenos candidatos descartados por redacción, y horas de reclutadores leyendo CVs que un filtro mejor habría ordenado. En mercados donde el talento escasea, el primer costo es el caro.',
    ],
    solutionIntro: [
      'El sistema recibe CVs en cualquier formato — PDF, Word, escaneados — y los convierte en perfiles estructurados: experiencia real, tecnologías, logros, trayectoria. No busca palabras: entiende descripciones. La experiencia con una tecnología cuenta aunque el CV nunca use su nombre exacto.',
      'Contra la descripción del puesto, el motor combina la comprensión semántica con los requisitos explícitos y produce un ranking donde cada posición viene argumentada: qué tiene este candidato, qué le falta, dónde lo dice su CV. El reclutador no recibe una nota — recibe un caso.',
    ],
    decisions: [
      {
        title: 'Ranking explicado, no caja negra',
        body: 'Cada puntaje viene con sus razones, citando el CV. En una decisión que afecta personas, un número sin argumento no es aceptable — ni para el candidato, ni para el reclutador que tiene que defender su shortlist.',
      },
      {
        title: 'Semántica por encima de keywords',
        body: 'La experiencia descrita con otras palabras vale igual. El matching combina embeddings — cercanía de significado — con los requisitos duros del puesto, en lugar de contar coincidencias literales.',
      },
      {
        title: 'La IA ordena; el humano decide',
        body: 'El sistema no descarta a nadie por sí solo: prioriza y argumenta. La decisión de avanzar o no con un candidato es del reclutador — con mejor información y en una fracción del tiempo.',
      },
    ],
    stack: [
      { name: 'LLMs', role: 'Lectura y comprensión de cada CV completo' },
      { name: 'Extracción estructurada', role: 'Del documento libre al perfil comparable' },
      { name: 'Embeddings', role: 'Matching semántico entre experiencia y puesto' },
      { name: 'Motor de ranking', role: 'Combina semántica y requisitos duros, con explicación' },
      { name: 'Aplicación web', role: 'El flujo completo del reclutador en un solo lugar' },
    ],
    businessIntro:
      'El cambio no es solo velocidad: es que la shortlist se vuelve defendible. Cada candidato que avanza — y cada uno que no — tiene sus razones documentadas.',
    outcomes: [
      'De cientos de CVs a una shortlist argumentada en minutos.',
      'Menos falsos descartes: la redacción deja de eliminar candidatos buenos.',
      'Proceso auditable: cada decisión tiene sus razones por escrito.',
      'Los reclutadores dedican su tiempo a entrevistar, no a filtrar.',
    ],
    applications: [
      { sector: 'RR.HH. corporativo', use: 'Vacantes masivas con cientos de postulantes.' },
      { sector: 'Headhunters y staffing', use: 'Más búsquedas simultáneas con el mismo equipo.' },
      { sector: 'Tecnología', use: 'Perfiles técnicos donde la keyword engaña más.' },
      { sector: 'Universidades y programas', use: 'Selección de becas y admisiones con criterios trazables.' },
    ],
    faq: [
      {
        q: '¿Cómo manejan el riesgo de sesgo en la selección?',
        a: 'Tres salvaguardas: los criterios del puesto son explícitos y configurables, cada puntaje viene con explicación auditable citando el CV, y el sistema nunca descarta solo — la decisión final es siempre humana.',
      },
      {
        q: '¿Qué formatos de CV acepta?',
        a: 'PDF, Word, texto y documentos escaneados. El pipeline incluye OCR y el modelo entiende estructuras diversas: el candidato no tiene que adaptar su CV al sistema.',
      },
      {
        q: '¿Reemplaza a nuestro ATS actual o lo complementa?',
        a: 'Ambos caminos funcionan: puede operar como sistema completo o integrarse a tu flujo actual aportando la capa de lectura y ranking. Depende de cuánto quieras cambiar de una vez.',
      },
      {
        q: '¿Funciona con CVs en español e inglés?',
        a: 'Sí, y con carpetas mixtas — común en búsquedas técnicas en Latinoamérica donde los CVs llegan en ambos idiomas.',
      },
    ],
    related: ['document-validation-insurtech', 'realtime-sales-copilot'],
  },

  // ============================================================
  // 9 · COTIZADOR INTELIGENTE (NUEVO)
  // ============================================================
  {
    slug: 'ai-quoting-engine',
    industry: 'Compras B2B · Distribución',
    tagline: 'De una lista pegada en texto libre a una cotización formal',
    cardProblem:
      'Cotizar una lista de compra toma horas: interpretar lo que el cliente escribió, buscar cada ítem, comparar precios y armar el documento.',
    cardResult:
      'El cliente pega su lista en lenguaje natural y recibe una cotización formal con precios de mercado en segundos.',
    techTerms: ['LLMs', 'Qdrant', 'Next.js', 'PostgreSQL', 'Redis'],
    infraTerms: ['Validación LLM', 'Documento formal'],

    kicker: 'IA + búsqueda semántica · Compras B2B',
    title: 'Cotizador inteligente: de una lista pegada en texto libre a una cotización formal en segundos',
    seoTitle: 'Cotizador inteligente con IA: de texto libre a cotización formal',
    seoDescription:
      'Cómo construimos un cotizador con IA: parseo de pedidos en lenguaje natural, matching semántico contra cientos de miles de productos, validación con LLM y documento formal de salida. Caso real.',
    lede:
      '"2 taladros percutores de 1/2, cinta aislante x10 y un casco blanco talla M" — así escribe un cliente real, y así lo recibe este sistema: pega la lista en texto libre y sale una cotización formal con precios reales de mercado. Sin plantillas, sin códigos, sin horas de un vendedor buscando ítem por ítem.',
    context: [
      'En la distribución B2B, cotizar es el cuello de botella silencioso: el pedido llega por correo o chat, escrito en el lenguaje del cliente — cantidades en palabras, marcas a medias, tamaños aproximados — y alguien tiene que interpretarlo, buscar cada producto, comparar precios y armar un documento presentable. Horas por cotización, y el cliente comparando con quien respondió primero.',
      'Lo difícil no es buscar un producto: es entender un pedido. "Escritorio y silla con ruedas" significa una silla de oficina, no una silla de ruedas. Esa clase de ambigüedad, obvia para un humano, es donde los buscadores tradicionales fallan.',
    ],
    solutionIntro: [
      'El flujo tiene tres etapas de IA. Primero, un modelo de lenguaje parsea el pedido completo — separa ítems, interpreta cantidades escritas en palabras, conserva marca y tamaño, y usa el contexto del pedido entero para resolver ambigüedades. Segundo, cada ítem se busca por significado contra un índice semántico de cientos de miles de productos con precios de mercado.',
      'Tercero — y esta etapa es la que separa un demo de un sistema confiable — otro modelo valida cada coincidencia: ¿esto ES el producto pedido? El aceite de cocina no se confunde con aceite de motor ni con una freidora. Si hay un solo candidato válido, se elige automático al mejor precio; si hay productos genuinamente distintos, el sistema pregunta con opciones simples; y si no encontró algo, lo dice — no mete un sustituto a escondidas. La salida es un documento de cotización formal: tabla, impuestos, condiciones, listo para imprimir o enviar.',
    ],
    decisions: [
      {
        title: 'Preguntar solo ante ambigüedad real',
        body: 'El mismo producto en varias tiendas no es ambigüedad — se elige el mejor precio y punto. El sistema solo interrumpe cuando hay productos genuinamente distintos en juego (marca, gama, tipo). Cada pregunta innecesaria es fricción que devuelve al cliente al Excel.',
      },
      {
        title: 'Salidas honestas',
        body: 'Si un ítem no tiene coincidencia confiable, la cotización lo dice y ofrece reescribirlo o quitarlo. Un cotizador que rellena con sustitutos parecidos genera devoluciones y desconfianza — el costo aparece después, multiplicado.',
      },
      {
        title: 'El LLM valida lo que los embeddings acercan',
        body: 'La búsqueda semántica trae candidatos cercanos en significado; un modelo de lenguaje confirma cuáles son realmente el producto pedido, con regla de categoría estricta y de tamaño flexible: si no hay presentación de 1 litro, la de 900 ml es respuesta válida — una freidora nunca lo es.',
      },
    ],
    stack: [
      { name: 'LLMs para parseo', role: 'Entienden el pedido en lenguaje natural, con contexto completo' },
      { name: 'Embeddings + Qdrant', role: 'Búsqueda por significado sobre cientos de miles de productos' },
      { name: 'LLM validador', role: 'Confirma que cada match es el producto correcto' },
      { name: 'Next.js', role: 'Interfaz del cotizador y documento final' },
      { name: 'PostgreSQL + Redis', role: 'Registro de cotizaciones y velocidad de consulta' },
      { name: 'Pipeline de precios', role: 'Índice de mercado actualizado por fuente' },
    ],
    businessIntro:
      'Es un canal de ventas nuevo, no una mejora del existente. En el e-commerce tradicional el cliente navega los pasillos virtuales; aquí entrega la lista completa de su mandado y el sistema identifica en el stock exactamente lo que quiere, con su propia jerga: "esa cinta blanca para unir con rosca", "ese líquido para limpiar el óxido". La cotización deja de ser un trabajo y se vuelve una respuesta.',
    outcomes: [
      'De horas por cotización a segundos, con el documento formal incluido.',
      'Responder primero: la ventaja comercial más barata que existe.',
      'Cada cotización queda registrada: histórico y trazabilidad de precios.',
      'El equipo comercial cotiza volumen sin crecer en personas.',
    ],
    applications: [
      { sector: 'Distribuidores y mayoristas', use: 'Listas de compra de clientes convertidas en cotización al instante.' },
      { sector: 'Centrales de compras', use: 'Comparar el mercado por cada ítem del requerimiento.' },
      { sector: 'Ferreterías industriales', use: 'Pedidos escritos "como habla el maestro de obra".' },
      { sector: 'Áreas de compras corporativas', use: 'Presupuestar requerimientos internos sin cadena de correos.' },
    ],
    faq: [
      {
        q: '¿De dónde salen los precios?',
        a: 'De un índice de mercado que se construye según el rubro: catálogos públicos, listas propias del negocio o ambos. El índice se actualiza de forma continua y cada precio conserva su fuente.',
      },
      {
        q: '¿Qué pasa si el cliente escribe con errores o de forma ambigua?',
        a: 'El parser está hecho para el lenguaje real: cantidades en palabras, marcas a medias, errores de tipeo. Y cuando la ambigüedad es genuina — productos distintos que encajan — el sistema pregunta con opciones simples en lugar de adivinar.',
      },
      {
        q: '¿La cotización sale en formato presentable?',
        a: 'Sí: documento formal con tabla de ítems, impuestos, totales y condiciones, listo para imprimir, guardar como PDF o enviar. Y cada cotización queda registrada para seguimiento.',
      },
      {
        q: '¿Puede cotizar contra nuestro propio catálogo en lugar del mercado?',
        a: 'Sí — el índice semántico se construye de las fuentes que definas: tu catálogo, el mercado, o ambos comparados. Es el mismo motor del buscador semántico, apuntado a la fuente que te sirva.',
      },
    ],
    related: ['semantic-search-retail', 'logistics-dimensioning'],
  },
]
