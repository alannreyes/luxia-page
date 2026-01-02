import Link from 'next/link'
import type { Metadata } from 'next'

// 52 platillos organizados por nivel
const dishes = [
  // APRENDIZ (Primeros pasos - 12 platillos)
  { slug: 'chatbot-local', titleEs: 'Chatbot Local con Ollama', titleEn: 'Local Chatbot with Ollama', level: 'aprendiz', icon: '🤖', descEs: 'Tu primer chatbot corriendo en tu máquina', descEn: 'Your first chatbot running locally' },
  { slug: 'chatbot-api', titleEs: 'Chatbot con Claude API', titleEn: 'Chatbot with Claude API', level: 'aprendiz', icon: '💬', descEs: 'Conecta con la API de Anthropic', descEn: 'Connect with Anthropic API' },
  { slug: 'hello-terminal', titleEs: 'Hola Mundo en Terminal', titleEn: 'Hello World in Terminal', level: 'aprendiz', icon: '🖥️', descEs: 'Primeros comandos y scripts', descEn: 'First commands and scripts' },
  { slug: 'first-repo', titleEs: 'Mi Primer Repositorio', titleEn: 'My First Repository', level: 'aprendiz', icon: '📚', descEs: 'Crea y sube tu primer repo a GitHub', descEn: 'Create and push your first repo' },
  { slug: 'dotfiles', titleEs: 'Mi Configuración Dotfiles', titleEn: 'My Dotfiles Setup', level: 'aprendiz', icon: '⚙️', descEs: 'Configura tu ambiente de desarrollo', descEn: 'Configure your dev environment' },
  { slug: 'static-page', titleEs: 'Página Web Estática', titleEn: 'Static Web Page', level: 'aprendiz', icon: '🌐', descEs: 'HTML + CSS básico funcional', descEn: 'Basic functional HTML + CSS' },
  { slug: 'dev-environment', titleEs: 'Mi Ambiente de Desarrollo', titleEn: 'My Dev Environment', level: 'aprendiz', icon: '🛠️', descEs: 'Instala todo lo necesario', descEn: 'Install everything you need' },
  { slug: 'first-script', titleEs: 'Mi Primer Script Bash', titleEn: 'My First Bash Script', level: 'aprendiz', icon: '📜', descEs: 'Automatiza tareas repetitivas', descEn: 'Automate repetitive tasks' },
  { slug: 'docker-hello', titleEs: 'Docker Hello World', titleEn: 'Docker Hello World', level: 'aprendiz', icon: '🐳', descEs: 'Tu primer contenedor', descEn: 'Your first container' },
  { slug: 'json-api-fetch', titleEs: 'Consumir una API JSON', titleEn: 'Consume a JSON API', level: 'aprendiz', icon: '🔗', descEs: 'Fetch de datos de una API pública', descEn: 'Fetch data from a public API' },
  { slug: 'markdown-notes', titleEs: 'Sistema de Notas Markdown', titleEn: 'Markdown Notes System', level: 'aprendiz', icon: '📝', descEs: 'Organiza tus notas en markdown', descEn: 'Organize your markdown notes' },
  { slug: 'git-collaboration', titleEs: 'Colaborar con Git', titleEn: 'Collaborate with Git', level: 'aprendiz', icon: '🤝', descEs: 'Pull requests y code review', descEn: 'Pull requests and code review' },

  // COCINERO (Web Básico - 14 platillos)
  { slug: 'react-todo', titleEs: 'Todo App con React', titleEn: 'Todo App with React', level: 'cocinero', icon: '✅', descEs: 'Tu primera app con React', descEn: 'Your first React app' },
  { slug: 'api-rest-basic', titleEs: 'API REST con Express', titleEn: 'REST API with Express', level: 'cocinero', icon: '🔌', descEs: 'Backend básico con Node.js', descEn: 'Basic backend with Node.js' },
  { slug: 'python-cli', titleEs: 'CLI Tool con Python', titleEn: 'CLI Tool with Python', level: 'cocinero', icon: '🐍', descEs: 'Herramienta de línea de comandos', descEn: 'Command line tool' },
  { slug: 'landing-page', titleEs: 'Landing Page Responsive', titleEn: 'Responsive Landing Page', level: 'cocinero', icon: '📱', descEs: 'Diseño adaptable a móviles', descEn: 'Mobile-friendly design' },
  { slug: 'portfolio', titleEs: 'Portfolio Personal', titleEn: 'Personal Portfolio', level: 'cocinero', icon: '💼', descEs: 'Muestra tu trabajo profesional', descEn: 'Showcase your work' },
  { slug: 'blog-static', titleEs: 'Blog Estático', titleEn: 'Static Blog', level: 'cocinero', icon: '📰', descEs: 'Blog sin base de datos', descEn: 'Blog without database' },
  { slug: 'form-validation', titleEs: 'Formulario con Validación', titleEn: 'Form with Validation', level: 'cocinero', icon: '📋', descEs: 'Validación en frontend y backend', descEn: 'Frontend and backend validation' },
  { slug: 'weather-app', titleEs: 'App del Clima', titleEn: 'Weather App', level: 'cocinero', icon: '🌤️', descEs: 'Consume API del clima', descEn: 'Consume weather API' },
  { slug: 'calculator', titleEs: 'Calculadora Web', titleEn: 'Web Calculator', level: 'cocinero', icon: '🔢', descEs: 'Lógica y UI interactiva', descEn: 'Logic and interactive UI' },
  { slug: 'quiz-game', titleEs: 'Quiz Interactivo', titleEn: 'Interactive Quiz', level: 'cocinero', icon: '🎮', descEs: 'Juego de preguntas y respuestas', descEn: 'Question and answer game' },
  { slug: 'countdown-timer', titleEs: 'Timer con Notificaciones', titleEn: 'Timer with Notifications', level: 'cocinero', icon: '⏰', descEs: 'Temporizador con alertas', descEn: 'Timer with alerts' },
  { slug: 'image-gallery', titleEs: 'Galería de Imágenes', titleEn: 'Image Gallery', level: 'cocinero', icon: '🖼️', descEs: 'Grid responsive con lightbox', descEn: 'Responsive grid with lightbox' },
  { slug: 'api-fastapi', titleEs: 'API con FastAPI', titleEn: 'API with FastAPI', level: 'cocinero', icon: '⚡', descEs: 'API moderna con Python', descEn: 'Modern API with Python' },
  { slug: 'scraper-basic', titleEs: 'Web Scraper Básico', titleEn: 'Basic Web Scraper', level: 'cocinero', icon: '🕷️', descEs: 'Extrae datos de sitios web', descEn: 'Extract data from websites' },

  // CHEF (Fullstack - 16 platillos)
  { slug: 'nextjs-blog', titleEs: 'Blog con Next.js + MDX', titleEn: 'Blog with Next.js + MDX', level: 'chef', icon: '▲', descEs: 'Blog fullstack con SSR', descEn: 'Fullstack blog with SSR' },
  { slug: 'auth-firebase', titleEs: 'Auth con Firebase Google', titleEn: 'Auth with Firebase Google', level: 'chef', icon: '🔐', descEs: 'Login social completo', descEn: 'Complete social login' },
  { slug: 'crud-postgres', titleEs: 'CRUD con PostgreSQL', titleEn: 'CRUD with PostgreSQL', level: 'chef', icon: '🐘', descEs: 'Operaciones de base de datos', descEn: 'Database operations' },
  { slug: 'realtime-chat', titleEs: 'Chat en Tiempo Real', titleEn: 'Real-time Chat', level: 'chef', icon: '💬', descEs: 'WebSockets y mensajes', descEn: 'WebSockets and messages' },
  { slug: 'file-upload', titleEs: 'Subida de Archivos S3', titleEn: 'S3 File Upload', level: 'chef', icon: '📤', descEs: 'Almacenamiento en la nube', descEn: 'Cloud storage' },
  { slug: 'payment-stripe', titleEs: 'Pagos con Stripe', titleEn: 'Payments with Stripe', level: 'chef', icon: '💳', descEs: 'Integración de pagos', descEn: 'Payment integration' },
  { slug: 'email-notifications', titleEs: 'Emails Transaccionales', titleEn: 'Transactional Emails', level: 'chef', icon: '📧', descEs: 'Envío automático de emails', descEn: 'Automatic email sending' },
  { slug: 'docker-deploy', titleEs: 'Deploy con Docker', titleEn: 'Deploy with Docker', level: 'chef', icon: '🚀', descEs: 'Tu app en producción', descEn: 'Your app in production' },
  { slug: 'github-actions', titleEs: 'CI/CD con GitHub Actions', titleEn: 'CI/CD with GitHub Actions', level: 'chef', icon: '⚙️', descEs: 'Automatización de deploys', descEn: 'Deploy automation' },
  { slug: 'api-testing', titleEs: 'Testing de APIs', titleEn: 'API Testing', level: 'chef', icon: '🧪', descEs: 'Tests automatizados', descEn: 'Automated tests' },
  { slug: 'mobile-expo', titleEs: 'App Móvil con Expo', titleEn: 'Mobile App with Expo', level: 'chef', icon: '📱', descEs: 'Tu primera app móvil', descEn: 'Your first mobile app' },
  { slug: 'push-notifications', titleEs: 'Push Notifications', titleEn: 'Push Notifications', level: 'chef', icon: '🔔', descEs: 'Notificaciones en móvil', descEn: 'Mobile notifications' },
  { slug: 'webhook-receiver', titleEs: 'Receptor de Webhooks', titleEn: 'Webhook Receiver', level: 'chef', icon: '🪝', descEs: 'Recibe eventos externos', descEn: 'Receive external events' },
  { slug: 'redis-cache', titleEs: 'Cache con Redis', titleEn: 'Cache with Redis', level: 'chef', icon: '⚡', descEs: 'Mejora el rendimiento', descEn: 'Improve performance' },
  { slug: 'arduino-sensor', titleEs: 'Arduino + MQTT', titleEn: 'Arduino + MQTT', level: 'chef', icon: '🔌', descEs: 'IoT básico', descEn: 'Basic IoT' },
  { slug: 'dashboard-analytics', titleEs: 'Dashboard de Analytics', titleEn: 'Analytics Dashboard', level: 'chef', icon: '📊', descEs: 'Visualización de datos', descEn: 'Data visualization' },

  // MASTER CHEF (IA y Avanzado - 10 platillos)
  { slug: 'rag-documents', titleEs: 'RAG con Documentos PDF', titleEn: 'RAG with PDF Documents', level: 'master', icon: '📚', descEs: 'Chatbot con tus documentos', descEn: 'Chatbot with your documents' },
  { slug: 'vector-search', titleEs: 'Búsqueda Vectorial', titleEn: 'Vector Search', level: 'master', icon: '🔍', descEs: 'Búsqueda semántica', descEn: 'Semantic search' },
  { slug: 'mcp-server', titleEs: 'Servidor MCP Custom', titleEn: 'Custom MCP Server', level: 'master', icon: '🔧', descEs: 'Extiende Claude con herramientas', descEn: 'Extend Claude with tools' },
  { slug: 'ai-agent', titleEs: 'Agente IA Autónomo', titleEn: 'Autonomous AI Agent', level: 'master', icon: '🤖', descEs: 'IA que toma decisiones', descEn: 'AI that makes decisions' },
  { slug: 'image-classifier', titleEs: 'Clasificador de Imágenes', titleEn: 'Image Classifier', level: 'master', icon: '👁️', descEs: 'Vision AI en acción', descEn: 'Vision AI in action' },
  { slug: 'voice-assistant', titleEs: 'Asistente de Voz', titleEn: 'Voice Assistant', level: 'master', icon: '🎙️', descEs: 'Speech-to-text y text-to-speech', descEn: 'Speech-to-text and text-to-speech' },
  { slug: 'multimodal-app', titleEs: 'App Multimodal', titleEn: 'Multimodal App', level: 'master', icon: '🎨', descEs: 'Imágenes, audio y texto', descEn: 'Images, audio and text' },
  { slug: 'fine-tuning', titleEs: 'Fine-tuning de Modelo', titleEn: 'Model Fine-tuning', level: 'master', icon: '🎯', descEs: 'Personaliza un modelo', descEn: 'Customize a model' },
  { slug: 'ai-code-review', titleEs: 'Code Review con IA', titleEn: 'AI Code Review', level: 'master', icon: '👨‍💻', descEs: 'Revisión automática de código', descEn: 'Automatic code review' },
  { slug: 'full-saas', titleEs: 'SaaS Completo con IA', titleEn: 'Full SaaS with AI', level: 'master', icon: '🏆', descEs: 'El proyecto final', descEn: 'The final project' },
]

const levelLabels = {
  aprendiz: { es: '🧑‍🎓 Aprendiz', en: '🧑‍🎓 Apprentice', color: 'bg-green-100 text-green-800 border-green-200' },
  cocinero: { es: '🧑‍🍳 Cocinero', en: '🧑‍🍳 Cook', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  chef: { es: '👨‍🍳 Chef', en: '👨‍🍳 Chef', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  master: { es: '👨‍🍳👑 Master Chef', en: '👨‍🍳👑 Master Chef', color: 'bg-amber-100 text-amber-800 border-amber-200' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  return {
    title: isSpanish ? 'Cooking - Proyectos Prácticos | luxIA' : 'Cooking - Hands-on Projects | luxIA',
    description: isSpanish
      ? 'Aprende haciendo: proyectos prácticos que siempre terminan en algo funcional'
      : 'Learn by doing: hands-on projects that always result in something functional',
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function CookingPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  const groupedDishes = {
    aprendiz: dishes.filter(d => d.level === 'aprendiz'),
    cocinero: dishes.filter(d => d.level === 'cocinero'),
    chef: dishes.filter(d => d.level === 'chef'),
    master: dishes.filter(d => d.level === 'master'),
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">👨‍🍳</span>
          <h1 className="text-4xl font-bold text-slate-900">
            Cooking
          </h1>
        </div>
        <p className="text-xl text-slate-600 mb-4">
          {isSpanish
            ? 'Aprende haciendo. Cada proyecto termina con algo funcional que puedes usar.'
            : 'Learn by doing. Every project ends with something functional you can use.'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {isSpanish ? '52 proyectos' : '52 projects'}
          </span>
          <span>•</span>
          <span>{isSpanish ? '4 niveles de dificultad' : '4 difficulty levels'}</span>
          <span>•</span>
          <span className="text-orange-600 font-medium">{isSpanish ? '100% Gratis' : '100% Free'}</span>
        </div>

        {/* Link to Learning */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">📖 {isSpanish ? '¿Necesitas teoría primero?' : 'Need theory first?'}</span>
            {' '}
            {isSpanish
              ? 'Visita Learning para conceptos y fundamentos antes de cocinar.'
              : 'Visit Learning for concepts and fundamentals before cooking.'}
            {' '}
            <Link href={`/${locale}/learning`} className="font-medium underline hover:no-underline">
              {isSpanish ? 'Ir a Learning →' : 'Go to Learning →'}
            </Link>
          </p>
        </div>
      </div>

      {/* Dishes by Level */}
      {Object.entries(groupedDishes).map(([level, items]) => (
        <div key={level} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelLabels[level as keyof typeof levelLabels].color}`}>
              {levelLabels[level as keyof typeof levelLabels][isSpanish ? 'es' : 'en']}
            </span>
            <span className="text-sm text-slate-400">
              {items.length} {isSpanish ? 'platillos' : 'dishes'}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {items.map((dish) => (
              <Link
                key={dish.slug}
                href={`/${locale}/cooking/${dish.slug}`}
                className="group block bg-white border border-orange-200 rounded-xl p-4 hover:border-orange-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{dish.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition truncate">
                      {isSpanish ? dish.titleEs : dish.titleEn}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {isSpanish ? dish.descEs : dish.descEn}
                    </p>
                  </div>
                  <span className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Footer note */}
      <div className="mt-12 pt-8 border-t border-orange-200 text-center">
        <p className="text-sm text-slate-500">
          {isSpanish ? 'Proyectos creados por' : 'Projects created by'}{' '}
          <span className="font-medium text-slate-700">Alann Reyes</span>
          {' '}{isSpanish ? 'para' : 'for'}{' '}
          <span className="font-medium text-orange-600">luxIA.us</span>
        </p>
        <p className="text-xs text-slate-400 mt-2">
          {isSpanish ? 'Actualizado Enero 2026' : 'Updated January 2026'}
        </p>
      </div>
    </div>
  )
}
