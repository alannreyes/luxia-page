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
    // Métricas animadas basadas en estudios reales
    metrics: [
      { value: '78%', label: 'de empresas que adoptan IA superan a competidores', suffix: '' },
      { value: '40%', label: 'reducción en costos operativos con IA', suffix: '' },
      { value: '2.6x', label: 'más productividad con herramientas IA', suffix: '' },
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