import type { Locale } from '@/middleware'

// Diccionario base en español (source of truth)
const es = {
  // Navegación
  nav: {
    services: 'Soluciones',
    about: 'Fundador',
    cases: 'Industrias',
    contact: 'Contacto',
    schedule: 'Agendar Consulta'
  },

  // Hero Section
  hero: {
    badge: 'Boutique de IA para industrias reguladas',
    mainTitle: 'IA que entiende',
    mainTitleHighlight: 'tu industria',
    subtitle: 'Soluciones de Inteligencia Artificial para Fintech, Insurtech y operaciones industriales. 30 años de experiencia en banca y tecnología.',
    primaryCTA: 'Ver Soluciones',
    secondaryCTA: 'Agendar Consulta',
    stats: [
      { value: '30+', label: 'Años de experiencia' },
      { value: 'IBM', label: 'BankBoston, Citibank, BCI' },
      { value: 'ISO 27001', label: 'Lead Auditor' },
      { value: 'Google Cloud', label: 'Gen AI Leader' }
    ]
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
        title: 'EFC Alerta',
        tagline: 'Sistema de alertas meteorológicas',
        description: 'Alertas en tiempo real powered by Vaisala Xweather. Protege operaciones mineras, petroleras y de gas con notificaciones push instantáneas de tormentas eléctricas.',
        features: ['Alertas push nativas', 'Integración Xweather', 'Multi-zona', 'Privacidad total'],
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
      }
    ],
    cta: 'Explorar solución'
  },

  // Credenciales del Fundador
  founder: {
    title: 'Respaldado por experiencia real',
    subtitle: 'No solo teoría. Décadas construyendo y liderando tecnología en las instituciones más exigentes.',
    name: 'Alann Reyes',
    role: 'Fundador & CEO',
    bio: 'Technology Innovation Manager en EFC. Ex-Head of IT en Banco BCI donde lideré el lanzamiento del primer banco 100% cloud de Perú. 17 años en IBM sirviendo a los principales bancos y operaciones mineras del país.',
    credentials: [
      { icon: 'Award', title: 'Google Cloud', subtitle: 'Generative AI Leader' },
      { icon: 'Shield', title: 'ISO 27001', subtitle: 'Lead Auditor' },
      { icon: 'Building', title: 'IBM', subtitle: '17 años' },
      { icon: 'Landmark', title: 'Banco BCI', subtitle: 'Head of IT' }
    ],
    experience: [
      { company: 'EFC', role: 'Technology Innovation Manager', years: '19 años' },
      { company: 'Banco BCI', role: 'Head of IT', years: 'Primer banco cloud de Perú' },
      { company: 'IBM', role: 'Business Continuity Leader', years: '17 años' },
      { company: 'BankBoston', role: 'IT Supervisor', years: '7 años' },
      { company: 'Citibank', role: 'Server Administration', years: '2 años' }
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
    title: '¿Listo para implementar IA en tu organización?',
    subtitle: 'Agenda una consulta gratuita de 30 minutos. Sin compromisos, solo ideas concretas.',
    primary: 'Agendar Consulta',
    secondary: 'Enviar mensaje',
    form: {
      name: 'Nombre',
      email: 'Email corporativo',
      company: 'Empresa',
      message: 'Cuéntanos tu desafío',
      submit: 'Enviar',
      sending: 'Enviando...',
      success: 'Mensaje enviado. Te contactaré pronto.',
      error: 'Error al enviar. Intenta de nuevo.'
    }
  },

  // Footer
  footer: {
    tagline: 'IA para industrias reguladas',
    description: 'LuxIA es una boutique de inteligencia artificial fundada por Alann Reyes. Soluciones enterprise con el cuidado de un artesano.',
    location: 'Florida, USA | Lima, Perú',
    quickLinks: 'Enlaces',
    contact: 'Contacto',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    rights: 'Todos los derechos reservados',
    linkedin: 'LinkedIn',
    email: 'alann@luxia.us'
  },

  // Meta
  meta: {
    title: 'LuxIA - IA para Fintech, Insurtech e Industria',
    description: 'Boutique de Inteligencia Artificial para industrias reguladas. UWIA para seguros, búsqueda semántica, alertas industriales. 30 años de experiencia en banca y tecnología.',
    keywords: 'IA empresarial, fintech, insurtech, underwriting automation, UWIA, búsqueda semántica, RAG, bases de datos vectoriales, EFC Alerta, Vaisala, IBM, consultoría IA, Alann Reyes'
  }
}

// Diccionario en inglés
const en = {
  // Navigation
  nav: {
    services: 'Solutions',
    about: 'Founder',
    cases: 'Industries',
    contact: 'Contact',
    schedule: 'Schedule Call'
  },

  // Hero Section
  hero: {
    badge: 'AI boutique for regulated industries',
    mainTitle: 'AI that understands',
    mainTitleHighlight: 'your industry',
    subtitle: 'Artificial Intelligence solutions for Fintech, Insurtech and industrial operations. 30 years of experience in banking and technology.',
    primaryCTA: 'See Solutions',
    secondaryCTA: 'Schedule Call',
    stats: [
      { value: '30+', label: 'Years of experience' },
      { value: 'IBM', label: 'BankBoston, Citibank, BCI' },
      { value: 'ISO 27001', label: 'Lead Auditor' },
      { value: 'Google Cloud', label: 'Gen AI Leader' }
    ]
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
        title: 'EFC Alerta',
        tagline: 'Weather alert system',
        description: 'Real-time alerts powered by Vaisala Xweather. Protect mining, oil and gas operations with instant push notifications for lightning storms.',
        features: ['Native push alerts', 'Xweather integration', 'Multi-zone', 'Total privacy'],
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
      }
    ],
    cta: 'Explore solution'
  },

  // Founder Credentials
  founder: {
    title: 'Backed by real experience',
    subtitle: 'Not just theory. Decades building and leading technology at the most demanding institutions.',
    name: 'Alann Reyes',
    role: 'Founder & CEO',
    bio: 'Technology Innovation Manager at EFC. Former Head of IT at Banco BCI where I led the launch of Peru\'s first 100% cloud-native bank. 17 years at IBM serving the country\'s top banks and mining operations.',
    credentials: [
      { icon: 'Award', title: 'Google Cloud', subtitle: 'Generative AI Leader' },
      { icon: 'Shield', title: 'ISO 27001', subtitle: 'Lead Auditor' },
      { icon: 'Building', title: 'IBM', subtitle: '17 years' },
      { icon: 'Landmark', title: 'Banco BCI', subtitle: 'Head of IT' }
    ],
    experience: [
      { company: 'EFC', role: 'Technology Innovation Manager', years: '19 years' },
      { company: 'Banco BCI', role: 'Head of IT', years: 'Peru\'s first cloud bank' },
      { company: 'IBM', role: 'Business Continuity Leader', years: '17 years' },
      { company: 'BankBoston', role: 'IT Supervisor', years: '7 years' },
      { company: 'Citibank', role: 'Server Administration', years: '2 years' }
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
    title: 'Ready to implement AI in your organization?',
    subtitle: 'Schedule a free 30-minute consultation. No commitments, just concrete ideas.',
    primary: 'Schedule Call',
    secondary: 'Send message',
    form: {
      name: 'Name',
      email: 'Corporate email',
      company: 'Company',
      message: 'Tell us your challenge',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Message sent. I\'ll contact you soon.',
      error: 'Error sending. Please try again.'
    }
  },

  // Footer
  footer: {
    tagline: 'AI for regulated industries',
    description: 'LuxIA is an artificial intelligence boutique founded by Alann Reyes. Enterprise solutions with artisan care.',
    location: 'Florida, USA | Lima, Peru',
    quickLinks: 'Links',
    contact: 'Contact',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved',
    linkedin: 'LinkedIn',
    email: 'alann@luxia.us'
  },

  // Meta
  meta: {
    title: 'LuxIA - AI for Fintech, Insurtech & Industry',
    description: 'Artificial Intelligence boutique for regulated industries. UWIA for insurance, semantic search, industrial alerts. 30 years of banking and technology experience.',
    keywords: 'enterprise AI, fintech, insurtech, underwriting automation, UWIA, semantic search, RAG, vector databases, EFC Alerta, Vaisala, IBM, AI consulting, Alann Reyes'
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
