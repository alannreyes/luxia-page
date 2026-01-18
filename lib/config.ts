// Configuración centralizada de Luxia Web
export const siteConfig = {
  // Información de contacto y redes sociales
  contact: {
    email: 'alann@luxia.us',
    phone: '+51 993131883',
    linkedinUrl: 'https://www.linkedin.com/in/alannreyes/',
  },

  // Configuración del Hero
  hero: {
    mainTitle: 'Tu empresa es única. Tu IA también',
    subtitle: 'IA personalizada que funciona desde el día 1',
    description: '', // Eliminado como solicitado
    callToAction: '', // Eliminado como solicitado
    primaryCTA: 'Ver Demo en Vivo',
    secondaryCTA: 'Solicitar Consulta',
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
      icon: '🔌',
      title: 'Tu ERP con superpoderes',
      subtitle: 'Integración directa con tus sistemas actuales',
      description: 'Tu ERP/CRM sigue igual, pero ahora entiende lenguaje natural. Pregunta "¿Cuánto vendimos en Lima este mes?" y obtén respuestas al instante.',
      results: [
        'Integración por API y Webhooks',
        'Sin cambiar tu sistema actual',
        'Incorpora todo el poder de ChatGPT'
      ]
    },
    {
      icon: '🔍',
      title: 'Busca en todos tus archivos',
      subtitle: 'Integración directa con tus sistemas actuales',
      description: 'Busca en español, inglés o spanglish. La IA entiende conceptos: busca "contratos de arriendo" y encuentra "lease agreements" también.',
      results: [
        'PDFs, Excel, Word, emails',
        'Entiende sinónimos y contexto',
        'Respuestas con la fuente exacta'
      ]
    },
    {
      icon: '💬',
      title: 'Asistente multicanal 24/7',
      subtitle: 'Integración directa con tus sistemas actuales',
      description: 'La misma IA responde en WhatsApp, web, email. Conoce inventario, precios, políticas. Escala a humano cuando es necesario.',
      results: [
        'Configuración sin código',
        'Respuestas consistentes',
        'Métricas en tiempo real'
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
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID || 'G-ZJ96G3V5QH', // Google Analytics ID
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