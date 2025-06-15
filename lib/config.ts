// Configuración centralizada de Luxia Web
export const siteConfig = {
  // Información de contacto
  contact: {
    email: 'alann@luxiabrands.com',
    phone: '+1 (555) 123-4567', // Actualizar con tu número real
    calendlyUrl: '', // Se usará el sistema custom
  },

  // Configuración del Hero
  hero: {
    mainTitle: 'Tu empresa es única. Tu IA también',
    subtitle: 'En luxIA construimos soluciones a medida, justo donde las necesitas.',
    description: 'Lleva tus ideas ambiciosas a la realidad con IA diseñada específicamente para ti. Sin plantillas, sin soluciones que no encajan. Solo herramientas inteligentes que multiplican tu fuerza.',
    callToAction: '¿Listo para transformar tu visión en resultados?',
    primaryCTA: 'Ver Demos en Vivo',
    secondaryCTA: 'Agendar Consulta Gratuita',
    // Métricas animadas basadas en estudios reales
    metrics: [
      { value: '78%', label: 'de empresas que adoptan IA superan a competidores', suffix: '' },
      { value: '40%', label: 'reducción en costos operativos con IA', suffix: '' },
      { value: '2.6x', label: 'más productividad con herramientas IA', suffix: '' },
    ],
  },

  // Servicios con enfoque humano
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

  // Diferencial humano
  humanDifferential: {
    quote: 'Tu equipo trabajando EN el negocio, no PARA el negocio. Más tiempo para pensar, conectar y crear el futuro.',
    emphasis: 'El diferencial humano:'
  },

  // Trust Indicators mejorados con estadísticas reales
  trustIndicators: [
    { value: '71%', label: 'Empresas usan IA generativa regularmente' }, // McKinsey 2024
    { value: '6-10%', label: 'Aumento de ingresos con IA' }, // Estudios industria
    { value: '66%', label: 'Mejora en rendimiento empleados' }, // ChatGPT studies
    { value: '50%', label: 'Empresas adoptaron IA en 2024' }, // McKinsey Global Survey
    { value: '37.7%', label: 'Crecimiento anual mercado IA' }, // Grand View Research
    { value: '24/7', label: 'Disponibilidad sistemas IA' },
  ],

  // Configuración de citas
  appointment: {
    duration: 30, // minutos
    timeSlots: [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ],
    timezone: 'America/Mexico_City',
    workingDays: [1, 2, 3, 4, 5], // Lunes a Viernes
    formFields: [
      {
        name: 'fullName',
        label: 'Nombre Completo',
        type: 'text',
        required: true,
        placeholder: 'Juan Pérez'
      },
      {
        name: 'email',
        label: 'Email Corporativo',
        type: 'email',
        required: true,
        placeholder: 'juan@empresa.com'
      },
      {
        name: 'company',
        label: 'Empresa',
        type: 'text',
        required: true,
        placeholder: 'TechCorp Solutions'
      },
      {
        name: 'companySize',
        label: 'Tamaño de Empresa',
        type: 'select',
        required: true,
        options: [
          { value: 'startup', label: 'Startup (1-10 empleados)' },
          { value: 'small', label: 'Pequeña (11-50 empleados)' },
          { value: 'medium', label: 'Mediana (51-200 empleados)' },
          { value: 'large', label: 'Grande (201-1000 empleados)' },
          { value: 'enterprise', label: 'Empresa (1000+ empleados)' }
        ]
      },
      {
        name: 'problem',
        label: 'Problema o Necesidad Específica',
        type: 'textarea',
        required: true,
        placeholder: 'Describe el desafío que quieres resolver con IA...'
      },
      {
        name: 'budget',
        label: 'Presupuesto Estimado (Opcional)',
        type: 'select',
        required: false,
        options: [
          { value: 'under-10k', label: 'Menos de $10,000 USD' },
          { value: '10k-50k', label: '$10,000 - $50,000 USD' },
          { value: '50k-100k', label: '$50,000 - $100,000 USD' },
          { value: 'over-100k', label: 'Más de $100,000 USD' },
          { value: 'not-sure', label: 'No estoy seguro' }
        ]
      }
    ]
  },

  // Tecnologías y partnerships
  technologies: [
    { name: 'OpenAI', logo: '/logos/openai.svg' },
    { name: 'AWS', logo: '/logos/aws.svg' },
    { name: 'Microsoft Azure', logo: '/logos/azure.svg' },
    { name: 'Google Cloud', logo: '/logos/gcp.svg' },
    { name: 'n8n', logo: '/logos/n8n.svg' },
    { name: 'Docker', logo: '/logos/docker.svg' },
  ],

  // Configuración de tracking
  tracking: {
    googleAnalytics: '', // Agregar GA4 ID
    hotjar: '', // Agregar Hotjar ID
    events: {
      heroCtaClick: 'hero_cta_click',
      appointmentBooked: 'appointment_booked',
      demoViewed: 'demo_viewed',
      contactFormSubmit: 'contact_form_submit'
    }
  },

  // URLs y navegación
  navigation: {
    logo: 'luxIA',
    links: [
      { href: '#servicios', label: 'Servicios' },
      { href: '#casos', label: 'Casos' },
      { href: '#insights', label: 'Insights' },
    ]
  }
}

// Tipos TypeScript para mejor desarrollo
export type SiteConfig = typeof siteConfig
export type AppointmentFormField = typeof siteConfig.appointment.formFields[0]
export type TrustIndicator = typeof siteConfig.trustIndicators[0]
export type HeroMetric = typeof siteConfig.hero.metrics[0] 