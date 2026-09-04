import type { Locale } from '@/middleware'

// Diccionario base en español (source of truth)
const es = {
  // Navegación
  nav: {
    services: 'Servicios',
    about: 'Fundador',
    cases: 'Casos',
    insights: 'Insights',
    contact: 'Contacto',
    learning: 'Learning',
    cooking: 'Cooking',
    schedule: 'Contactar'
  },

  // Hero Section
  hero: {
    badge: 'Estudio de software · AI-native',
    mainTitle: 'Tu software en producción,',
    mainTitleHighlight: 'en días',
    subtitle: 'Tú traes la idea; en LuxIA la construimos y la ponemos a funcionar de verdad —en días, no en meses. No necesitas ser técnico ni saber de código: nos encargamos de todo. No demos: software que opera 24/7.',
    primaryCTA: 'Ver Servicios',
    secondaryCTA: 'Contactar',
    stats: [
      { value: '30+', label: 'Años de experiencia' },
      { value: 'CCA-P', label: 'Claude Certified Architect' },
      { value: 'ISO 27001', label: 'Lead Auditor' },
      { value: 'IBM', label: '17 años · banca y minería' }
    ]
  },

  // Target Audience
  targetAudience: {
    eyebrow: 'Dos formas de trabajar juntos',
    title: '¿Qué necesitas?',
    doorA: {
      tag: 'Lo más pedido',
      title: 'Construye o acelera tu software',
      description: 'Una POC sólida en horas; la escalamos en días; en pocas semanas está en producción —con seguridad, autenticación y pasarela de pagos.',
      points: ['POC sólida en horas', 'Escala en días', 'Producción en semanas', 'Seguridad, auth y pagos, todo'],
      cta: 'Empecemos tu piloto'
    },
    doorB: {
      title: '¿Necesitas IA para una tarea?',
      description: 'Si ya sabes que quieres IA para algo concreto:',
      tasks: ['Análisis de documentos', 'Traducción', 'Underwriting', 'Reconocimiento de imágenes', 'Búsqueda semántica'],
      cta: 'Ver soluciones de IA'
    }
  },

  // Built Gallery (landing) · lo que ya construimos
  builtGallery: {
    eyebrow: 'Real · sin trucos',
    title: 'Lo que ya construimos',
    subtitle: 'Cada una resolvió el problema de alguien de verdad y hoy opera en producción. Míralas — la tuya puede ser la próxima.',
    items: [
      { id: 'uwia', icon: 'FileSearch', title: 'UWIA', tag: 'Seguros y legal', line: 'Lee montañas de documentos y te entrega lo que importa en segundos: pólizas, contratos, expedientes.' },
      { id: 'wincha', icon: 'Ruler', title: 'Wincha', tag: 'Logística', line: 'Mide y pesa un paquete con la cámara del celular. Sin regla, sin balanza.' },
      { id: 'alerta', icon: 'BellRing', title: 'Alerta temprana', tag: 'Seguridad en campo', line: 'Avisa al celular cuando el peligro se acerca, aunque esté bloqueado y con la app cerrada.' },
      { id: 'semantic', icon: 'Search', title: 'Búsqueda que entiende', tag: 'Retail e industria', line: 'Encuentra lo correcto aunque no sepas la palabra exacta, entre cientos de miles de opciones.' }
    ],
    live: 'Y las dos de arriba corren en vivo, ahora mismo, con datos por satélite.',
    cta: 'Ver cómo trabajamos'
  },

  // Owners Section (landing) · para dueños con una idea
  ownersSection: {
    eyebrow: '¿Esto te suena?',
    title: 'Tienes la idea y los recursos. Falta quien la construya de verdad — y que lo veas pasar.',
    subtitle: 'No necesitas volverte técnico. Necesitas un equipo que traduzca tu idea, la construya rápido y te muestre avances que puedas ver y tocar.',
    rows: [
      { wound: '"Ya lo intenté antes y quedó a medias."', answer: 'No eras tú — era la ejecución. Esta vez ves el software funcionar, no tienes que creerlo a ciegas.' },
      { wound: '"Con la IA parece posible, pero yo no puedo."', answer: 'Para eso está LuxIA. La IA lo hace parecer posible; nosotros lo hacemos real, en días.' },
      { wound: '"Tengo el capital y las ganas de apostar."', answer: 'Te ayudamos a atinar la idea y a construirla — como un socio técnico, no un proveedor más.' }
    ],
    closer: 'No trabajamos con todos. Cuéntanos tu idea y, si encaja con lo que hacemos, la ponemos en marcha.',
    cta: 'Hablemos de tu idea'
  },

  // Services Summary (landing)
  servicesSummary: {
    title: 'Lo que hacemos',
    subtitle: 'Soluciones de IA Generativa con infraestructura enterprise-grade',
    items: [
      { title: 'Documentos + IA', description: 'Análisis automatizado de documentos complejos. Extracción inteligente y evaluación de riesgos.' },
      { title: 'Geolocalización + IA', description: 'Plataformas geoespaciales que cruzan datos de viento, tormenta y clima con propiedades y activos para decidir en tiempo real.' },
      { title: 'Alertas + IA', description: 'Sistemas de alerta que funcionan 24/7, con celular bloqueado y app cerrada.' }
    ],
    cta: 'Ver todos los servicios'
  },

  // Soluciones/Servicios
  services: {
    title: 'Soluciones de IA',
    subtitle: 'Tecnología probada en producción, diseñada para industrias reguladas',
    items: [
      {
        id: 'uwia',
        icon: 'FileSearch',
        title: 'UWIA',
        tagline: 'Underwriting Intelligence Automation',
        description: 'Análisis automatizado de documentos de seguros. Extracción inteligente de datos, evaluación de riesgos y generación de reportes para profesionales legales y de claims.',
        features: ['Análisis de pólizas', 'Extracción de entidades', 'Evaluación de cobertura', 'Reportes automáticos'],
        badge: 'Insurtech'
      },
      {
        id: 'semantic',
        icon: 'Search',
        title: 'Búsqueda Semántica',
        tagline: 'Bases de datos vectoriales + RAG',
        description: 'Motores de búsqueda que entienden el contexto, no solo palabras clave. Ideal para catálogos industriales, documentación técnica y knowledge bases empresariales.',
        features: ['Embeddings personalizados', 'RAG empresarial', 'Integración con ERPs', 'Búsqueda multimodal'],
        badge: 'Enterprise'
      },
      {
        id: 'alerta',
        icon: 'CloudLightning',
        title: 'Alerta Temprana Móvil',
        tagline: 'Alertas que salvan vidas',
        description: 'Sistema de alertas push que funciona con el celular bloqueado y la app cerrada. Privacidad total: la ubicación nunca sale del dispositivo. Ideal para proteger personal en operaciones mineras, petroleras y de gas.',
        features: ['Funciona con app cerrada', 'Celular bloqueado', 'Privacidad total', 'Multi-idioma'],
        badge: 'Industrial'
      },
      {
        id: 'consulting',
        icon: 'Brain',
        title: 'Consultoría IA',
        tagline: 'Estrategia e implementación',
        description: 'Evaluación, diseño e implementación de soluciones de IA Generativa para industrias reguladas. Desde POCs de 4 semanas hasta despliegues enterprise.',
        features: ['Assessment IA', 'POCs rápidos', 'Arquitectura cloud', 'Compliance regulatorio'],
        badge: 'Strategy'
      },
      {
        id: 'wincha',
        icon: 'Ruler',
        title: 'Wincha',
        tagline: 'Mide con tu celular. Sin hardware costoso.',
        description: 'Dimensionador logístico con IA para Android. Captura dimensiones y peso de paquetes usando la cámara + inteligencia artificial. Ideal para logística, almacenes, courier y e-commerce.',
        features: ['Dimensiones con IA', 'Peso por voz', 'Balanza Bluetooth', 'Integración ERP'],
        badge: 'Logistics'
      }
    ],
    cta: 'Explorar solución'
  },

  // Credenciales del Fundador
  founder: {
    title: 'Respaldado por experiencia real',
    subtitle: 'No solo teoría. Décadas construyendo y liderando tecnología en las instituciones más exigentes.',
    name: 'Alann Reyes',
    role: 'Fundador',
    bio: 'Fundador de LuxIA y Gerente de Innovación Tecnológica en EFC. Llevo IA a producción en industrias reguladas y construyo tecnología que anticipa el riesgo climático en minería, industria y agro. Lideré el primer banco 100% en la nube del Perú (Banco BCI) y la primera conexión SWIFT en la nube de Latinoamérica. 17 años en IBM con triple certificación ISO. Auditor Líder ISO 27001.',
    credentials: [
      { icon: 'Award', title: 'Google Cloud', subtitle: 'Generative AI Leader' },
      { icon: 'Shield', title: 'ISO 27001', subtitle: 'Lead Auditor' },
      { icon: 'Building', title: 'IBM', subtitle: '17 años · banca y minería' },
      { icon: 'Landmark', title: 'Banco BCI', subtitle: 'Head of IT' }
    ],
    experience: [
      { company: 'LuxIA', role: 'Fundador y Principal AI Engineer', highlight: 'IA a producción para clientes en EE.UU. y México — underwriting, seguridad multi-agente', years: '2024–presente' },
      { company: 'EFC', role: 'Gerente de Innovación Tecnológica', highlight: 'IA a producción, búsqueda semántica y alerta temprana de riesgo climático', years: '2007–presente' },
      { company: 'Banco BCI', role: 'Head of IT', highlight: 'Primer banco 100% en la nube del Perú · primer SWIFT en la nube de Latinoamérica', years: '2020–2023' },
      { company: 'IBM', role: 'Liderazgo en continuidad, seguridad y proyectos', highlight: 'Triple certificación ISO (9001 · 27001 · 20000) en IBM Perú · proyectos en minería · core bancario para microfinanzas', years: '17 años' },
      { company: 'BankBoston', role: 'Supervisor de TI', highlight: 'Creó el área de sistemas de sucursal en Perú; producción del core y seguridad', years: '7 años' },
      { company: 'Citibank', role: 'Infraestructura y servidores', highlight: 'Pionero en internet y en la migración de servicios a TCP/IP', years: '2 años' }
    ],
    certifications: [
      {
        badgeId: 'd4f30538-390f-430d-a1c1-e2cba04b18e4',
        name: 'Claude Certified Architect – Professional',
        issuer: 'Anthropic',
        summary: 'Certificación de Anthropic para arquitectos de soluciones: diseñar y liderar despliegues de Claude a escala empresarial, arquitectar integraciones, optimizar sistemas y aplicar gobernanza y prácticas de IA responsable.',
      },
      {
        badgeId: '3a804c9d-1420-4479-9d03-e8d6751b43f4',
        name: 'Generative AI Leader',
        issuer: 'Google Cloud',
        summary: 'Certificación de Google Cloud en IA generativa a nivel de negocio: identificar oportunidades por función e industria y liderar una adopción de IA innovadora y responsable con la plataforma de Google Cloud.',
      },
    ],
    cta: 'Ver LinkedIn'
  },

  // Industrias
  industries: {
    title: 'Industrias que servimos',
    subtitle: 'Experiencia comprobada en los sectores más regulados y exigentes',
    items: [
      {
        icon: 'Banknote',
        title: 'Fintech',
        description: 'Automatización de análisis crediticio, detección de fraude, y workflows de compliance.',
        clients: 'Bancos, fintechs, microfinancieras'
      },
      {
        icon: 'Shield',
        title: 'Insurtech',
        description: 'UWIA para underwriting automatizado, análisis de claims, y extracción de datos de pólizas.',
        clients: 'Aseguradoras, brokers, ajustadores'
      },
      {
        icon: 'HardHat',
        title: 'Minería',
        description: 'Sistemas de alerta temprana, IoT industrial, y búsqueda semántica de catálogos técnicos.',
        clients: 'Mineras, operaciones de gas y petróleo'
      },
      {
        icon: 'Factory',
        title: 'Industrial',
        description: 'Distribución just-in-time, búsqueda de +200K SKUs, integración con ERPs legacy.',
        clients: 'Distribuidores, manufactura, logística'
      }
    ]
  },

  // CTA Final
  cta: {
    title: 'Cuéntanos tu idea. Vemos si encaja.',
    subtitle: 'Una conversación honesta, sin costo ni compromiso. Si lo que quieres encaja con lo que hacemos, lo ponemos en marcha; si no, te lo decimos de frente y te orientamos igual.',
    trust: {
      line: 'Hablas directo con el estudio que construye — sin intermediarios ni juniors de relleno.',
      creds: 'IA en producción · industrias reguladas · seguridad nivel enterprise'
    },
    primary: 'Enviar Mensaje',
    secondary: 'Enviar mensaje',
    form: {
      name: 'Nombre',
      email: 'Tu email',
      company: 'Empresa (opcional)',
      message: 'Cuéntame tu idea',
      submit: 'Enviar',
      sending: 'Enviando...',
      success: 'Recibido. Te escribimos pronto para conversar tu idea.',
      error: 'Error al enviar. Intenta de nuevo.'
    }
  },

  // Footer
  footer: {
    tagline: 'De la idea a producción, en días',
    description: 'LuxIA, estudio de software AI-native. Convertimos tu idea en software real —seguro y en producción— en días.',
    location: 'Florida, USA | Lima, Perú',
    quickLinks: 'Enlaces',
    contact: 'Contacto',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    rights: 'Todos los derechos reservados',
    linkedin: 'LinkedIn',
    contactForm: 'Enviar mensaje'
  },

  // Meta
  meta: {
    title: 'LuxIA - IA para Fintech, Insurtech e Industria',
    description: 'Convertimos tu idea en software real —seguro y en producción— en días, sin que tengas que ser técnico. LuxIA, estudio de software AI-native.',
    keywords: 'software a medida, MVP, estudio AI-native, IA a producción, dueño con una idea, fintech, insurtech, UWIA, búsqueda semántica, RAG, alertas, Wincha, consultoría IA, Alann Reyes'
  }
}

// Diccionario en inglés
const en = {
  // Navigation
  nav: {
    services: 'Services',
    about: 'Founder',
    cases: 'Cases',
    insights: 'Insights',
    contact: 'Contact',
    learning: 'Learning',
    cooking: 'Cooking',
    schedule: 'Contact'
  },

  // Hero Section
  hero: {
    badge: 'Software studio · AI-native',
    mainTitle: 'Your software in production,',
    mainTitleHighlight: 'in days',
    subtitle: "You bring the idea; at LuxIA we build it and make it actually work —in days, not months. You don't need to be technical or know how to code: we handle all of it. Not demos: software that runs 24/7.",
    primaryCTA: 'See Services',
    secondaryCTA: 'Contact',
    stats: [
      { value: '30+', label: 'Years of experience' },
      { value: 'CCA-P', label: 'Claude Certified Architect' },
      { value: 'ISO 27001', label: 'Lead Auditor' },
      { value: 'IBM', label: '17 years · banking & mining' }
    ]
  },

  // Target Audience
  targetAudience: {
    eyebrow: 'Two ways to work together',
    title: 'What do you need?',
    doorA: {
      tag: 'Most requested',
      title: 'Build or accelerate your software',
      description: "A solid POC in hours; we scale it in days; in a few weeks it's in production —with security, authentication and payments.",
      points: ['Solid POC in hours', 'Scales in days', 'Production in weeks', 'Security, auth & payments'],
      cta: "Let's start your pilot"
    },
    doorB: {
      title: 'Need AI for a specific task?',
      description: 'If you already know you want AI for something concrete:',
      tasks: ['Document analysis', 'Translation', 'Underwriting', 'Image recognition', 'Semantic search'],
      cta: 'See AI solutions'
    }
  },

  // Built Gallery (landing) · what we've already built
  builtGallery: {
    eyebrow: 'Real · no tricks',
    title: "What we've already built",
    subtitle: 'Each one solved a real problem for someone and runs in production today. Take a look — yours could be next.',
    items: [
      { id: 'uwia', icon: 'FileSearch', title: 'UWIA', tag: 'Insurance & legal', line: 'Reads mountains of documents and hands you what matters in seconds: policies, contracts, files.' },
      { id: 'wincha', icon: 'Ruler', title: 'Wincha', tag: 'Logistics', line: 'Measures and weighs a package with your phone camera. No tape, no scale.' },
      { id: 'alerta', icon: 'BellRing', title: 'Early alerting', tag: 'Field safety', line: 'Alerts your phone when danger is near, even locked and with the app closed.' },
      { id: 'semantic', icon: 'Search', title: 'Search that understands', tag: 'Retail & industry', line: "Finds the right thing even when you don't know the exact word, across hundreds of thousands of options." }
    ],
    live: 'And the two above run live, right now, on satellite data.',
    cta: 'See how we work'
  },

  // Owners Section (landing) · for owners with an idea
  ownersSection: {
    eyebrow: 'Sound familiar?',
    title: "You have the idea and the resources. What's missing is someone to actually build it — and let you watch it happen.",
    subtitle: "You don't need to become technical. You need a team to translate your idea, build it fast, and show you progress you can see and touch.",
    rows: [
      { wound: '"I already tried, and it stalled halfway."', answer: "It wasn't you — it was the execution. This time you watch the software work, you don't have to take it on faith." },
      { wound: '"With AI it seems possible, but I can\'t do it myself."', answer: "That's what LuxIA is for. AI makes it seem possible; we make it real, in days." },
      { wound: '"I have the capital and the appetite to bet."', answer: 'We help you land the idea and build it — as a technical partner, not one more vendor.' }
    ],
    closer: "We don't work with everyone. Tell us your idea, and if it fits what we do, we put it in motion.",
    cta: "Let's talk about your idea"
  },

  // Services Summary (landing)
  servicesSummary: {
    title: 'What we do',
    subtitle: 'Generative AI solutions with enterprise-grade infrastructure',
    items: [
      { title: 'Documents + AI', description: 'Automated analysis of complex documents. Intelligent extraction and risk assessment.' },
      { title: 'Geolocation + AI', description: 'Geospatial platforms that cross wind, storm and climate data with properties and assets for real-time decisions.' },
      { title: 'Alerts + AI', description: 'Alert systems that work 24/7, with phone locked and app closed.' }
    ],
    cta: 'See all services'
  },

  // Solutions/Services
  services: {
    title: 'AI Solutions',
    subtitle: 'Battle-tested technology, designed for regulated industries',
    items: [
      {
        id: 'uwia',
        icon: 'FileSearch',
        title: 'UWIA',
        tagline: 'Underwriting Intelligence Automation',
        description: 'Automated insurance document analysis. Intelligent data extraction, risk assessment and report generation for legal and claims professionals.',
        features: ['Policy analysis', 'Entity extraction', 'Coverage evaluation', 'Auto-generated reports'],
        badge: 'Insurtech'
      },
      {
        id: 'semantic',
        icon: 'Search',
        title: 'Semantic Search',
        tagline: 'Vector databases + RAG',
        description: 'Search engines that understand context, not just keywords. Ideal for industrial catalogs, technical documentation and enterprise knowledge bases.',
        features: ['Custom embeddings', 'Enterprise RAG', 'ERP integration', 'Multimodal search'],
        badge: 'Enterprise'
      },
      {
        id: 'alerta',
        icon: 'CloudLightning',
        title: 'Mobile Early Warning',
        tagline: 'Alerts that save lives',
        description: 'Push alert system that works with phone locked and app closed. Total privacy: location never leaves the device. Ideal for protecting personnel in mining, oil and gas operations.',
        features: ['Works with app closed', 'Phone locked', 'Total privacy', 'Multi-language'],
        badge: 'Industrial'
      },
      {
        id: 'consulting',
        icon: 'Brain',
        title: 'AI Consulting',
        tagline: 'Strategy & implementation',
        description: 'Assessment, design and implementation of Generative AI solutions for regulated industries. From 4-week POCs to enterprise deployments.',
        features: ['AI assessment', 'Rapid POCs', 'Cloud architecture', 'Regulatory compliance'],
        badge: 'Strategy'
      },
      {
        id: 'wincha',
        icon: 'Ruler',
        title: 'Wincha',
        tagline: 'Measure with your phone. No costly hardware.',
        description: 'AI-powered logistics dimensioner for Android. Capture package dimensions and weight using camera + artificial intelligence. Ideal for logistics, warehouses, courier and e-commerce.',
        features: ['AI dimensions', 'Voice weight', 'Bluetooth scale', 'ERP integration'],
        badge: 'Logistics'
      }
    ],
    cta: 'Explore solution'
  },

  // Founder Credentials
  founder: {
    title: 'Backed by real experience',
    subtitle: 'Not just theory. Decades building and leading technology at the most demanding institutions.',
    name: 'Alann Reyes',
    role: 'Founder',
    bio: 'Founder of LuxIA and Technology Innovation Manager at EFC. I ship production AI in regulated industries and build technology that anticipates climate risk across mining, industry and agriculture. I led Peru\'s first 100% cloud-native bank (Banco BCI) and Latin America\'s first cloud SWIFT connection. 17 years at IBM with triple ISO certification. ISO 27001 Lead Auditor.',
    credentials: [
      { icon: 'Award', title: 'Google Cloud', subtitle: 'Generative AI Leader' },
      { icon: 'Shield', title: 'ISO 27001', subtitle: 'Lead Auditor' },
      { icon: 'Building', title: 'IBM', subtitle: '17 years · banking & mining' },
      { icon: 'Landmark', title: 'Banco BCI', subtitle: 'Head of IT' }
    ],
    experience: [
      { company: 'LuxIA', role: 'Founder & Principal AI Engineer', highlight: 'Production AI for clients in the U.S. and Mexico — underwriting, multi-agent security', years: '2024–present' },
      { company: 'EFC', role: 'Technology Innovation Manager', highlight: 'Production AI, semantic search and early-warning for climate risk', years: '2007–present' },
      { company: 'Banco BCI', role: 'Head of IT', highlight: 'Peru\'s first 100% cloud-native bank · Latin America\'s first cloud SWIFT connection', years: '2020–2023' },
      { company: 'IBM', role: 'Business continuity, security & project leadership', highlight: 'Triple ISO certification (9001 · 27001 · 20000) at IBM Peru · mining projects · microfinance core banking', years: '17 years' },
      { company: 'BankBoston', role: 'IT Supervisor', highlight: 'Built Peru\'s branch-systems area; core production and security', years: '7 years' },
      { company: 'Citibank', role: 'Servers & infrastructure', highlight: 'Pioneered internet adoption and the TCP/IP services migration', years: '2 years' }
    ],
    certifications: [
      {
        badgeId: 'd4f30538-390f-430d-a1c1-e2cba04b18e4',
        name: 'Claude Certified Architect – Professional',
        issuer: 'Anthropic',
        summary: 'Anthropic credential for solution architects: designing and leading enterprise-scale Claude deployments, architecting integrations, optimizing systems at scale, and applying governance and responsible-AI practices.',
      },
      {
        badgeId: '3a804c9d-1420-4479-9d03-e8d6751b43f4',
        name: 'Generative AI Leader',
        issuer: 'Google Cloud',
        summary: "Google Cloud certification in business-level generative AI: identifying opportunities across functions and industries and leading innovative, responsible AI adoption on Google Cloud's platform.",
      },
    ],
    cta: 'View LinkedIn'
  },

  // Industries
  industries: {
    title: 'Industries we serve',
    subtitle: 'Proven experience in the most regulated and demanding sectors',
    items: [
      {
        icon: 'Banknote',
        title: 'Fintech',
        description: 'Credit analysis automation, fraud detection, and compliance workflows.',
        clients: 'Banks, fintechs, microfinance'
      },
      {
        icon: 'Shield',
        title: 'Insurtech',
        description: 'UWIA for automated underwriting, claims analysis, and policy data extraction.',
        clients: 'Insurers, brokers, adjusters'
      },
      {
        icon: 'HardHat',
        title: 'Mining',
        description: 'Early warning systems, industrial IoT, and semantic search for technical catalogs.',
        clients: 'Mining companies, oil & gas operations'
      },
      {
        icon: 'Factory',
        title: 'Industrial',
        description: 'Just-in-time distribution, 200K+ SKU search, legacy ERP integration.',
        clients: 'Distributors, manufacturing, logistics'
      }
    ]
  },

  // Final CTA
  cta: {
    title: "Tell us your idea. Let's see if it fits.",
    subtitle: "An honest conversation, no cost or commitment. If what you want fits what we do, we get started; if not, we'll tell you straight and point you the right way.",
    trust: {
      line: 'You talk directly with the studio that builds — no middlemen, no filler juniors.',
      creds: 'AI in production · regulated industries · enterprise-grade security'
    },
    primary: 'Send Message',
    secondary: 'Send message',
    form: {
      name: 'Name',
      email: 'Your email',
      company: 'Company (optional)',
      message: 'Tell me your idea',
      submit: 'Send',
      sending: 'Sending...',
      success: "Got it. We'll write soon to talk through your idea.",
      error: 'Error sending. Please try again.'
    }
  },

  // Footer
  footer: {
    tagline: 'From idea to production, in days',
    description: 'LuxIA, an AI-native software studio. We turn your idea into real software —secure and in production— in days.',
    location: 'Florida, USA | Lima, Peru',
    quickLinks: 'Links',
    contact: 'Contact',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved',
    linkedin: 'LinkedIn',
    contactForm: 'Send message'
  },

  // Meta
  meta: {
    title: 'LuxIA - AI for Fintech, Insurtech & Industry',
    description: "We turn your idea into real software —secure and in production— in days, without you having to be technical. LuxIA, an AI-native software studio.",
    keywords: 'custom software, MVP, AI-native studio, AI in production, owner with an idea, fintech, insurtech, UWIA, semantic search, RAG, alerting, Wincha, AI consulting, Alann Reyes'
  }
}

// Diccionarios disponibles
const dictionaries = { es, en } as const

// Función para obtener diccionario
export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries.es
}

// Tipo dinámico para diccionarios
export type Dictionary = typeof dictionaries.es

export default dictionaries
