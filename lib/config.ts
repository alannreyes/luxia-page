// Configuración centralizada de Luxia Web
export const siteConfig = {
  // Información de contacto y redes sociales
  contact: {
    email: 'alann@luxiabrands.com',
    phone: '+51 993131883', // Tu número de teléfono
    calcomUrl: 'https://cal.luxiabrands.com/alann-luxiabrands.com/30min', // URL de Cal.com validada
    linkedinUrl: 'https://www.linkedin.com/company/luxiabrands/',
  },

  // Configuración del Hero
  hero: {
    mainTitle: 'Tu empresa es única. Tu IA también',
    subtitle: 'IA personalizada que funciona desde el día 1',
    description: '', // Eliminado como solicitado
    callToAction: '', // Eliminado como solicitado
    primaryCTA: 'Ver Demo en Vivo',
    secondaryCTA: 'Agenda 30 min gratis',
    // Métricas animadas basadas en estudios reales - Rotación dinámica
    metrics: [
      { 
        value: '72%', 
        label: 'de organizaciones ya implementaron IA en al menos una función', 
        suffix: '', 
        source: 'McKinsey State of AI 2024',
        description: 'Incremento significativo del 50% registrado en años anteriores, mostrando aceleración masiva en adopción empresarial'
      },
      { 
        value: '42%', 
        label: 'de CEOs están implementando software de IA', 
        suffix: '', 
        source: 'Deloitte 2024',
        description: 'Los directores ejecutivos reconocen la IA como prioridad estratégica para mantener ventaja competitiva'
      },
      { 
        value: '40%', 
        label: 'incremento en productividad con herramientas IA', 
        suffix: '', 
        source: 'MIT Study 2024',
        description: 'Mejoras documentadas en velocidad de escritura, codificación y análisis de datos con IA generativa'
      },
      { 
        value: '56%', 
        label: 'reducción en tiempo de programación con IA', 
        suffix: '', 
        source: 'MIT Sloan & GitHub 2024',
        description: 'Desarrolladores completan tareas de código significativamente más rápido usando herramientas como Copilot'
      },
      { 
        value: '94%', 
        label: 'de líderes consideran IA crítica para el éxito', 
        suffix: '', 
        source: 'Deloitte Enterprise Survey 2024',
        description: 'Consenso ejecutivo sobre importancia vital de IA para resultados empresariales a 5 años'
      },
      { 
        value: '79%', 
        label: 'esperan transformación organizacional con IA en 3 años', 
        suffix: '', 
        source: 'Deloitte Gen AI Report 2024',
        description: 'Expectativas de cambio fundamental en procesos y modelos de negocio impulsados por IA'
      },
      { 
        value: '78%', 
        label: 'de organizaciones usaron IA en 2024', 
        suffix: '', 
        source: 'Global Business Research 2024',
        description: 'Aumento del 55% del año anterior, reflejando adopción acelerada post-ChatGPT'
      },
      { 
        value: '$109B', 
        label: 'inversión privada en IA solo en EE.UU.', 
        suffix: '', 
        source: 'Stanford AI Index 2025',
        description: '12 veces mayor que China ($9.3B), mostrando liderazgo estadounidense en financiamiento IA'
      },
      { 
        value: '30%', 
        label: 'mejora en precisión de toma de decisiones', 
        suffix: '', 
        source: 'Harvard Business Review 2024',
        description: 'IA ayuda a ejecutivos procesar datos complejos y reducir sesgos en decisiones estratégicas'
      },
      { 
        value: '280x', 
        label: 'reducción en costos de inferencia IA', 
        suffix: '', 
        source: 'Stanford AI Index 2025',
        description: 'Modelos que antes costaban miles, ahora cuestan centavos, democratizando acceso a IA avanzada'
      },
      { 
        value: '54%', 
        label: 'de firmas contables creen que cerrarían sin IA', 
        suffix: '', 
        source: 'Thomson Reuters 2024',
        description: 'Profesionales ven IA como esencial para supervivencia, no solo como ventaja competitiva'
      },
      { 
        value: '83%', 
        label: 'optimismo sobre IA en mercados emergentes', 
        suffix: '', 
        source: 'Stanford Global Survey 2024',
        description: 'Países como China e Indonesia ven IA más positivamente que mercados desarrollados (39% en EE.UU.)'
      },
    ],
    // Beneficios con checkmarks
    benefits: [
      'Consulta gratis 30 min',
      'Propuesta completa en 24h',
      'Sin compromisos'
    ],
  },

  // Servicios
  services: [
    {
      icon: '💬',
      title: 'Más Ventas, Menos Fricción',
      subtitle: 'Convierte cada conversación en una oportunidad',
      description: 'Tu equipo vendiendo ideas estratégicas mientras la IA maneja consultas rutinarias 24/7. Sin códigos, sin esperas. Clientes atendidos al instante, equipo enfocado en cerrar deals importantes.',
      results: [
        'más satisfacción del cliente',
        'Respuestas instantáneas = más conversiones',
        'Tu equipo cerrando, no explicando'
      ]
    },
    {
      icon: '🔍',
      title: 'Decisiones que Generan Ingresos',
      subtitle: 'De datos perdidos a oportunidades encontradas',
      description: 'Cada insight escondido es dinero no ganado. Encuentra patrones de compra, predicciones de demanda, oportunidades ocultas. Tu equipo tomando decisiones con información que antes tardaba semanas en procesar.',
      results: [
        'Decisiones más rápidas',
        'Oportunidades detectadas automáticamente',
        'Equipos actuando, no buscando'
      ]
    },
    {
      icon: '⚡',
      title: 'Escala sin Quemar a tu Equipo',
      subtitle: 'Crece sin contratar a más personas',
      description: 'La IA elimina lo tedioso para que tu gente haga lo que aman: innovar, conectar, crear. Sin burnout, sin rotación, solo crecimiento sostenible.',
      results: [
        'Mejora en productividad',
        'Equipos más felices = mejor retención',
        'Crecimiento sin límites operativos'
      ]
    }
  ],

  // Diferencial
  humanDifferential: {
    quote: 'Tu equipo trabajando EN el negocio, no PARA el negocio. Más tiempo para pensar, conectar y crear el futuro.',
    emphasis: 'El diferencial humano:'
  },

  // Indicadores de Confianza
  trustIndicators: [
    { value: '71%', label: 'Empresas usan IA generativa regularmente' },
    { value: '6-10%', label: 'Aumento de ingresos con IA' },
    { value: '66%', label: 'Mejora en rendimiento empleados' },
    { value: '50%', label: 'Empresas adoptaron IA en 2024' },
    { value: '37.7%', label: 'Crecimiento anual mercado IA' },
    { value: '24/7', label: 'Disponibilidad sistemas IA' },
  ],

  // Tecnologías
  technologies: [
    { name: 'OpenAI', logo: '/logos/openai.svg' },
    { name: 'AWS', logo: '/logos/aws.svg' },
    { name: 'Microsoft Azure', logo: '/logos/azure.svg' },
    { name: 'Google Cloud', logo: '/logos/gcp.svg' },
    { name: 'n8n', logo: '/logos/n8n.svg' },
    { name: 'Docker', logo: '/logos/docker.svg' },
  ],

  // Configuración de tracking (opcional pero recomendado para MVP)
  tracking: {
    googleAnalytics: '', // Añadir tu ID de GA4 aquí
    hotjar: '', // Añadir tu ID de Hotjar aquí
    events: {
      heroCtaClick: 'hero_cta_click',
      appointmentBooked: 'appointment_booked',
      demoViewed: 'demo_viewed',
      contactFormSubmit: 'contact_form_submit'
    }
  },

  // Navegación
  navigation: {
    logo: 'luxIA',
    links: [
      { href: '#servicios', label: 'Servicios' },
      { href: '#casos', label: 'Casos' },
      { href: '#insights', label: 'Insights' },
    ]
  }
}

// Tipos TypeScript
export type SiteConfig = typeof siteConfig
export type TrustIndicator = typeof siteConfig.trustIndicators[0]
export type HeroMetric = typeof siteConfig.hero.metrics[0]