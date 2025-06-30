import type { Locale } from '@/middleware'

// Diccionario base en español (source of truth)
const es = {
  // Navegación
  nav: {
    services: 'Servicios',
    cases: 'Casos',
    insights: 'Insights',
    contact: 'Contacto',
    schedule: 'Agendar Consulta'
  },
  
  // Hero Section
  hero: {
    mainTitle: 'Tu empresa es única.',
    subtitle: 'Tu IA también.',
    description: 'Soluciones de IA personalizadas que funcionan desde el primer día. No más demos genéricos, no más promesas vacías.',
    primaryCTA: 'Ver Demos Reales',
    secondaryCTA: 'Reserva 30 minutos',
    benefits: [
      'Sin compromiso',
      'Demo personalizado',
      'Resultados en 30 días'
    ]
  },

  // Servicios
  services: {
    title: 'Potencia tu empresa con IA a medida',
    subtitle: 'Integración directa con tus sistemas actuales. Sin disrupciones, sin migraciones complejas.',
    erp: {
      title: 'ERP con superpoderes',
      description: 'Tu ERP actual + IA que entiende tu negocio. Automatización inteligente que se adapta a tus procesos únicos.'
    },
    search: {
      title: 'Encuentra cualquier archivo al instante',
      description: 'IA que busca en todos tus documentos, correos y sistemas. Como tener un asistente que conoce cada archivo de tu empresa.'
    },
    assistant: {
      title: 'Asistente multicanal inteligente',
      description: 'Un solo asistente para web, WhatsApp, email y teléfono. Capacitado específicamente en tu empresa y productos.'
    },
    cta: 'Reserva 30 minutos'
  },

  // Casos reales
  cases: {
    title: 'Lo que antes era imposible,',
    subtitle: 'ahora en producción',
    fintech: {
      industry: 'Fintech Internacional',
      challenge: 'Análisis de riesgo crediticio en tiempo real',
      solution: 'Sistema de IA que evalúa 50+ variables en microsegundos',
      badge: 'Imposible sin IA'
    },
    healthcare: {
      industry: 'Healthtech',
      challenge: 'Diagnóstico asistido por IA para radiología',
      solution: 'Detección de anomalías con precisión superior al 95%',
      badge: 'Imposible sin IA'
    },
    ecommerce: {
      industry: 'E-commerce',
      challenge: 'Personalización en tiempo real de 10M+ productos',
      solution: 'Motor de recomendaciones que aumentó ventas 340%',
      badge: 'Imposible sin IA'
    }
  },

  // Insights
  insights: {
    title: 'Insights de IA empresarial',
    subtitle: 'Conocimiento práctico para líderes que buscan implementar IA de manera efectiva.',
    readMore: 'Leer más',
    minutes: 'min de lectura',
    articles: [
      {
        category: 'Guía Técnica',
        title: 'Implementando RAG en Producción: Mejores Prácticas',
        excerpt: 'Cómo escalar sistemas RAG empresariales manteniendo precisión y velocidad...',
        readTime: '8 min de lectura'
      },
      {
        category: 'Caso de Uso',
        title: 'n8n + LLMs: Automatización Inteligente para Fintech',
        excerpt: 'Workflow completo para detección de fraude y análisis predictivo...',
        readTime: '12 min de lectura'
      },
      {
        category: 'Tendencias 2025',
        title: 'El Futuro de los Agentes de IA en Empresas',
        excerpt: 'Por qué 2025 será el año de la adopción masiva de agentes autónomos...',
        readTime: '6 min de lectura'
      }
    ]
  },

  // CTA Final
  cta: {
    title: '¿Listo para ver la IA en acción?',
    subtitle: 'Agenda una demo personalizada y descubre cómo la IA puede transformar tu empresa.',
    primary: 'Agendar Demo',
    secondary: 'Más información',
    benefits: [
      {
        title: 'Consulta de 30 minutos',
        description: 'Tiempo suficiente para entender tu negocio'
      },
      {
        title: 'Sin compromisos',
        description: 'Solo ideas y recomendaciones honestas'
      },
      {
        title: 'Expertos en IA',
        description: 'Habla directamente con nuestro equipo técnico'
      },
      {
        title: 'Resultados inmediatos',
        description: 'Plan de acción personalizado al final de la llamada'
      }
    ]
  },

  // Footer
  footer: {
    tagline: 'Transformación digital inteligente',
    description: 'luxIA es tu partner estratégico en inteligencia artificial. Desarrollamos soluciones de IA a medida que funcionan desde el primer día.',
    quickLinks: 'Enlaces rápidos',
    services: 'Servicios',
    contact: 'Contacto',
    legal: 'Legal',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    rights: 'Todos los derechos reservados'
  },

  // Formularios
  forms: {
    name: 'Nombre completo',
    email: 'Email corporativo',
    company: 'Empresa',
    companySize: 'Tamaño de empresa',
    message: 'Cuéntanos sobre tu proyecto',
    submit: 'Enviar',
    sending: 'Enviando...',
    success: '¡Mensaje enviado! Te contactaremos pronto.',
    error: 'Error al enviar. Inténtalo de nuevo.'
  },

  // Demos Interactivas
  demos: {
    title: 'Experimenta el Poder de la IA',
    subtitle: 'Demos interactivas que muestran cómo la IA puede transformar tu negocio',
    available: 'Demos disponibles próximamente',
    cta: {
      title: '¿Quieres ser el primero en probar nuestras demos?',
      subtitle: 'Agenda una consulta personalizada y te mostraremos estas demos en acción, adaptadas a las necesidades específicas de tu empresa.',
      schedule: 'Agendar Demo Personalizada',
      info: 'Más Información'
    },
    fintech: {
      title: 'Chat Fintech + ERP',
      description: 'Consulta ventas, métricas y análisis de precios con gráficos en tiempo real',
      features: ['Consultas en lenguaje natural', 'Gráficos interactivos', 'Análisis predictivo'],
      placeholder: 'Escribe tu pregunta aquí...',
      initialMessage: '¡Hola! Soy tu asistente de IA para TechFlow Solutions. Puedo ayudarte con análisis de ventas, métricas de rendimiento, proyecciones y más. ¿En qué puedo ayudarte hoy?',
      poweredBy: 'Powered by:',
      latency: 'Latencia: <2s',
      vsManual: 'vs SQL manual: 3-5 min',
      howItWorks: '¿Cómo funciona la magia? 🪄',
      howItWorksSteps: {
        question: {
          title: 'Tu Pregunta',
          description: '"¿Cuáles fueron las ventas de octubre?"'
        },
        processing: {
          title: 'Procesamiento IA',
          description: 'GPT-4o entiende tu intención'
        },
        query: {
          title: 'Query Optimizado',
          description: 'Consulta PostgreSQL automática'
        },
        visualization: {
          title: 'Visualización',
          description: 'Gráficos interactivos instantáneos'
        }
      },
      howItWorksResult: 'Tu equipo obtiene insights empresariales complejos sin necesidad de conocimientos técnicos.',
      suggestions: {
        title: 'Preguntas sugeridas:',
        sales: '¿Cuáles fueron las ventas de octubre?',
        bestSeller: '¿Quién es el mejor vendedor del trimestre?',
        projection: '¿Cuál es la proyección para Q1 2025?',
        payments: 'Muéstrame clientes con pagos pendientes'
      },
      responses: {
        sales: 'Las ventas de octubre fueron de $47.2M, representando un incremento del 2.8% respecto a septiembre y un crecimiento YoY del 10.3% comparado con octubre 2023.',
        bestSeller: 'María Rodriguez lidera el trimestre con $4.25M en ventas, 23 deals cerrados y una tasa de conversión del 68%. Ha mostrado un crecimiento del 15% vs Q3.',
        projection: 'Basado en las tendencias actuales y factores estacionales, proyectamos $142.5M para Q1 2025, un crecimiento del 8.5% YoY. Factores clave: expansión en Brasil (+15%) y nuevos productos SaaS.',
        payments: 'Hay 2 clientes con pagos pendientes por un total de $67,000. FastCommerce Ltd tiene 15 días de retraso ($45K) y Digital Store Corp 8 días ($22K).',
        default: 'Puedo ayudarte con análisis de ventas, información sobre vendedores, pagos pendientes y proyecciones. ¿Podrías ser más específico con tu pregunta?'
      }
    }
  },

  // Meta
  meta: {
    title: 'luxIA - La IA a tu medida',
    description: 'Soluciones de IA personalizadas que funcionan desde el primer día. Optimiza procesos, reduce costos y acelera decisiones. Consulta gratuita de 30 min.',
    keywords: 'IA empresarial, RAG, n8n, automatización, ERP, chatbot, transformación digital, demos IA, consulta gratuita, fintech IA, análisis documentos, superpoder IA'
  }
}

// Diccionario en inglés
const en = {
  // Navigation
  nav: {
    services: 'Services',
    cases: 'Cases',
    insights: 'Insights',
    contact: 'Contact',
    schedule: 'Schedule Consultation'
  },
  
  // Hero Section
  hero: {
    mainTitle: 'Your business is unique.',
    subtitle: 'Your AI should be too.',
    description: 'Custom AI solutions that work from day one. No more generic demos, no more empty promises.',
    primaryCTA: 'See Real Demos',
    secondaryCTA: 'Book 30 minutes',
    benefits: [
      'No commitment',
      'Custom demo',
      'Results in 30 days'
    ]
  },

  // Services
  services: {
    title: 'Supercharge your business with custom AI',
    subtitle: 'Direct integration with your current systems. No disruptions, no complex migrations.',
    erp: {
      title: 'ERP with superpowers',
      description: 'Your current ERP + AI that understands your business. Intelligent automation that adapts to your unique processes.'
    },
    search: {
      title: 'Find any file instantly',
      description: 'AI that searches all your documents, emails, and systems. Like having an assistant who knows every file in your company.'
    },
    assistant: {
      title: 'Intelligent multichannel assistant',
      description: 'One assistant for web, WhatsApp, email, and phone. Specifically trained on your company and products.'
    },
    cta: 'Book 30 minutes'
  },

  // Real cases
  cases: {
    title: 'What was once impossible,',
    subtitle: 'now in production',
    fintech: {
      industry: 'International Fintech',
      challenge: 'Real-time credit risk analysis',
      solution: 'AI system that evaluates 50+ variables in microseconds',
      badge: 'Impossible without AI'
    },
    healthcare: {
      industry: 'Healthtech',
      challenge: 'AI-assisted radiology diagnosis',
      solution: 'Anomaly detection with 95%+ accuracy',
      badge: 'Impossible without AI'
    },
    ecommerce: {
      industry: 'E-commerce',
      challenge: 'Real-time personalization of 10M+ products',
      solution: 'Recommendation engine that increased sales 340%',
      badge: 'Impossible without AI'
    }
  },

  // Insights
  insights: {
    title: 'Enterprise AI insights',
    subtitle: 'Practical knowledge for leaders looking to implement AI effectively.',
    readMore: 'Read more',
    minutes: 'min read',
    articles: [
      {
        category: 'Technical Guide',
        title: 'Implementing RAG in Production: Best Practices',
        excerpt: 'How to scale enterprise RAG systems while maintaining accuracy and speed...',
        readTime: '8 min read'
      },
      {
        category: 'Use Case',
        title: 'n8n + LLMs: Intelligent Automation for Fintech',
        excerpt: 'Complete workflow for fraud detection and predictive analysis...',
        readTime: '12 min read'
      },
      {
        category: '2025 Trends',
        title: 'The Future of AI Agents in Enterprise',
        excerpt: 'Why 2025 will be the year of massive autonomous agent adoption...',
        readTime: '6 min read'
      }
    ]
  },

  // Final CTA
  cta: {
    title: 'Ready to see AI in action?',
    subtitle: 'Schedule a personalized demo and discover how AI can transform your business.',
    primary: 'Schedule Demo',
    secondary: 'More information',
    benefits: [
      {
        title: '30-minute consultation',
        description: 'Enough time to understand your business'
      },
      {
        title: 'No commitments',
        description: 'Just honest ideas and recommendations'
      },
      {
        title: 'AI experts',
        description: 'Speak directly with our technical team'
      },
      {
        title: 'Immediate results',
        description: 'Personalized action plan at the end of the call'
      }
    ]
  },

  // Footer
  footer: {
    tagline: 'Intelligent digital transformation',
    description: 'luxIA is your strategic partner in artificial intelligence. We develop custom AI solutions that work from day one.',
    quickLinks: 'Quick links',
    services: 'Services',
    contact: 'Contact',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: 'All rights reserved'
  },

  // Forms
  forms: {
    name: 'Full name',
    email: 'Corporate email',
    company: 'Company',
    companySize: 'Company size',
    message: 'Tell us about your project',
    submit: 'Submit',
    sending: 'Sending...',
    success: 'Message sent! We\'ll contact you soon.',
    error: 'Error sending. Please try again.'
  },

  // Interactive Demos
  demos: {
    title: 'Experience the Power of AI',
    subtitle: 'Interactive demos that show how AI can transform your business',
    available: 'Demos available soon',
    cta: {
      title: 'Want to be the first to try our demos?',
      subtitle: 'Schedule a personalized consultation and we\'ll show you these demos in action, tailored to your company\'s specific needs.',
      schedule: 'Schedule Personalized Demo',
      info: 'More Information'
    },
    fintech: {
      title: 'Fintech + ERP Chat',
      description: 'Query sales, metrics and price analysis with real-time charts',
      features: ['Natural language queries', 'Interactive charts', 'Predictive analysis'],
      placeholder: 'Type your question here...',
      initialMessage: 'Hi! I\'m your AI assistant for TechFlow Solutions. I can help you with sales analysis, performance metrics, projections and more. How can I help you today?',
      poweredBy: 'Powered by:',
      latency: 'Latency: <2s',
      vsManual: 'vs manual SQL: 3-5 min',
      howItWorks: 'How does the magic work? 🪄',
      howItWorksSteps: {
        question: {
          title: 'Your Question',
          description: '"What were October\'s sales?"'
        },
        processing: {
          title: 'AI Processing',
          description: 'GPT-4o understands your intent'
        },
        query: {
          title: 'Optimized Query',
          description: 'Automatic PostgreSQL query'
        },
        visualization: {
          title: 'Visualization',
          description: 'Instant interactive charts'
        }
      },
      howItWorksResult: 'Your team gets complex business insights without needing technical knowledge.',
      suggestions: {
        title: 'Suggested questions:',
        sales: 'What were October\'s sales?',
        bestSeller: 'Who is the best seller this quarter?',
        projection: 'What\'s the projection for Q1 2025?',
        payments: 'Show me clients with overdue payments'
      },
      responses: {
        sales: 'October sales were $47.2M, representing a 2.8% increase from September and 10.3% YoY growth compared to October 2023.',
        bestSeller: 'Maria Rodriguez leads the quarter with $4.25M in sales, 23 closed deals and a 68% conversion rate. She has shown 15% growth vs Q3.',
        projection: 'Based on current trends and seasonal factors, we project $142.5M for Q1 2025, an 8.5% YoY growth. Key factors: Brazil expansion (+15%) and new SaaS products.',
        payments: 'There are 2 clients with overdue payments totaling $67,000. FastCommerce Ltd is 15 days overdue ($45K) and Digital Store Corp 8 days ($22K).',
        default: 'I can help you with sales analysis, seller information, overdue payments and projections. Could you be more specific with your question?'
      }
    }
  },

  // Meta
  meta: {
    title: 'luxIA - AI Tailored to You',
    description: 'Custom AI solutions that work from day one. Optimize processes, reduce costs, and accelerate decisions. Free 30-min consultation.',
    keywords: 'enterprise AI, RAG, n8n, automation, ERP, chatbot, digital transformation, AI demos, free consultation, fintech AI, document analysis, AI superpowers'
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