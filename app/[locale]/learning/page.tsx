import Link from 'next/link'
import type { Metadata } from 'next'

// Cooking Analogy Component
function CookingAnalogy({ isSpanish }: { isSpanish: boolean }) {
  return (
    <div className="mb-12 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        {isSpanish ? '👨‍🍳 Aprendes a cocinar, cocinando' : '👨‍🍳 You learn to cook by cooking'}
      </h2>

      <p className="text-slate-700 mb-6">
        {isSpanish
          ? 'Imagina que quieres ser chef. Antes de crear platos memorables, necesitas conocer tus ingredientes (su calidad, cómo prepararlos), dominar tu cocina (dónde está cada cosa, cómo funciona), y elegir la herramienta correcta (un cuchillo de chef para picar, no una cuchara).'
          : 'Imagine you want to become a chef. Before creating memorable dishes, you need to know your ingredients (their quality, how to prepare them), master your kitchen (where everything is, how it works), and choose the right tool (a chef\'s knife to chop, not a spoon).'}
      </p>

      <p className="text-slate-700 mb-6 font-medium">
        {isSpanish ? 'El desarrollo de software funciona igual.' : 'Software development works the same way.'}
      </p>

      {/* Kitchen to Code Mapping */}
      <div className="bg-white/70 rounded-xl p-4 mb-6 font-mono text-sm">
        <div className="text-slate-500 mb-2">{isSpanish ? 'COCINA → DESARROLLO' : 'KITCHEN → DEVELOPMENT'}</div>
        <div className="grid gap-2 text-slate-700">
          <div className="flex items-center gap-3">
            <span>🏠 {isSpanish ? 'Tu cocina' : 'Your kitchen'}</span>
            <span className="text-slate-400">→</span>
            <span>💻 {isSpanish ? 'Tu computadora' : 'Your computer'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>🔥 {isSpanish ? 'Estación de trabajo' : 'Workstation'}</span>
            <span className="text-slate-400">→</span>
            <span>⬛ {isSpanish ? 'La Terminal' : 'The Terminal'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>🥬 {isSpanish ? 'Ingredientes' : 'Ingredients'}</span>
            <span className="text-slate-400">→</span>
            <span>📝 {isSpanish ? 'Código, APIs, Datos' : 'Code, APIs, Data'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>🔪 {isSpanish ? 'Utensilios' : 'Utensils'}</span>
            <span className="text-slate-400">→</span>
            <span>🛠️ Git, Docker, Cursor</span>
          </div>
          <div className="flex items-center gap-3">
            <span>📖 {isSpanish ? 'Recetas' : 'Recipes'}</span>
            <span className="text-slate-400">→</span>
            <span>📚 {isSpanish ? 'Documentación, Prompts' : 'Documentation, Prompts'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>🍽️ {isSpanish ? 'El plato final' : 'The final dish'}</span>
            <span className="text-slate-400">→</span>
            <span>🚀 {isSpanish ? 'Tu app en producción' : 'Your app in production'}</span>
          </div>
        </div>
      </div>

      {/* Novice vs Chef Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-orange-200">
              <th className="text-left py-2 pr-4"></th>
              <th className="text-left py-2 px-2">👶 {isSpanish ? 'Novato' : 'Novice'}</th>
              <th className="text-left py-2 pl-2">👨‍🍳 {isSpanish ? 'Chef' : 'Chef'}</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            <tr className="border-b border-orange-100">
              <td className="py-2 pr-4 font-medium">{isSpanish ? 'Recetas' : 'Recipes'}</td>
              <td className="py-2 px-2">{isSpanish ? 'Sigue al pie de la letra' : 'Follows to the letter'}</td>
              <td className="py-2 pl-2">{isSpanish ? 'Entiende por qué cada paso existe' : 'Understands why each step exists'}</td>
            </tr>
            <tr className="border-b border-orange-100">
              <td className="py-2 pr-4 font-medium">{isSpanish ? 'Problemas' : 'Problems'}</td>
              <td className="py-2 px-2">{isSpanish ? 'Se frustra cuando algo falla' : 'Gets frustrated when something fails'}</td>
              <td className="py-2 pl-2">{isSpanish ? 'Improvisa y adapta' : 'Improvises and adapts'}</td>
            </tr>
            <tr className="border-b border-orange-100">
              <td className="py-2 pr-4 font-medium">{isSpanish ? 'Herramientas' : 'Tools'}</td>
              <td className="py-2 px-2">{isSpanish ? 'Usa lo que encuentra' : 'Uses whatever is available'}</td>
              <td className="py-2 pl-2">{isSpanish ? 'Sabe exactamente cuál elegir' : 'Knows exactly which to choose'}</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium">{isSpanish ? 'Resultado' : 'Result'}</td>
              <td className="py-2 px-2">{isSpanish ? 'A veces sale bien' : 'Sometimes turns out well'}</td>
              <td className="py-2 pl-2">{isSpanish ? 'Consistentemente excelente' : 'Consistently excellent'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Philosophy */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
        <p className="font-semibold text-blue-900 mb-1">💡 {isSpanish ? 'Nuestra filosofía' : 'Our philosophy'}</p>
        <p className="text-blue-800">
          {isSpanish
            ? 'No te enseñaremos a seguir recetas. Te enseñaremos a pensar como chef: entender tu cocina, dominar tus herramientas, y crear platos que ni tú sabías que podías hacer.'
            : "We won't teach you to follow recipes. We'll teach you to think like a chef: understand your kitchen, master your tools, and create dishes you didn't know you could make."}
        </p>
      </div>

      {/* What's coming */}
      <div className="bg-white/70 rounded-xl p-4 font-mono text-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-slate-500 text-xs mb-1">{isSpanish ? 'PRIMERO' : 'FIRST'}</div>
            <div className="text-2xl mb-1">🏠</div>
            <div className="text-slate-700 font-medium">{isSpanish ? 'Preparar tu cocina' : 'Set up your kitchen'}</div>
            <div className="text-xs text-slate-500">Terminal, Git, Docker, Cursor</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">{isSpanish ? 'DESPUÉS' : 'THEN'}</div>
            <div className="text-2xl mb-1">🍳</div>
            <div className="text-slate-700 font-medium">{isSpanish ? 'Cocinar tus platos' : 'Cook your dishes'}</div>
            <div className="text-xs text-slate-500">{isSpanish ? 'Tu Asistente IA funcionando' : 'Your AI Assistant working'}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs mb-1">{isSpanish ? 'RESULTADO' : 'RESULT'}</div>
            <div className="text-2xl mb-1">🍽️</div>
            <div className="text-slate-700 font-medium">{isSpanish ? 'Servir al mundo' : 'Serve the world'}</div>
            <div className="text-xs text-slate-500">{isSpanish ? 'App en producción' : 'App in production'}</div>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-600 mt-6 font-medium">
        {isSpanish
          ? 'En las próximas misiones, tu cocina estará lista. Después, a cocinar. 🔥'
          : "In the upcoming missions, your kitchen will be ready. Then, let's cook. 🔥"}
      </p>
    </div>
  )
}

// 34 temas organizados por nivel (sincronizado con layout.tsx)
const sections = [
  // APRENDIZ (Fundamentos)
  { slug: 'terminal', titleEs: 'Terminal & Shell', titleEn: 'Terminal & Shell', level: 'aprendiz', icon: '🖥️', descEs: 'Tu centro de comando para desarrollo', descEn: 'Your command center for development' },
  { slug: 'git', titleEs: 'Git & GitHub', titleEn: 'Git & GitHub', level: 'aprendiz', icon: '📚', descEs: 'Control de versiones y colaboración', descEn: 'Version control and collaboration' },
  { slug: 'editors', titleEs: 'Editores de Código', titleEn: 'Code Editors', level: 'aprendiz', icon: '⌨️', descEs: 'VS Code, Cursor y configuración', descEn: 'VS Code, Cursor and configuration' },
  { slug: 'homebrew', titleEs: 'Homebrew & Gestores', titleEn: 'Homebrew & Package Managers', level: 'aprendiz', icon: '📦', descEs: 'Instalación de herramientas', descEn: 'Installing development tools' },
  { slug: 'docker-intro', titleEs: 'Docker Básico', titleEn: 'Docker Basics', level: 'aprendiz', icon: '🐳', descEs: 'Contenedores para principiantes', descEn: 'Containers for beginners' },
  { slug: 'llms-intro', titleEs: 'Intro a LLMs', titleEn: 'Intro to LLMs', level: 'aprendiz', icon: '🤖', descEs: 'Chatbots y modelos de lenguaje', descEn: 'Chatbots and language models' },
  { slug: 'llms-models', titleEs: 'Modelos LLM: Guía 2026', titleEn: 'LLM Models: 2026 Guide', level: 'aprendiz', icon: '🧠', descEs: 'Elige el modelo correcto para cada caso', descEn: 'Choose the right model for each use case' },
  { slug: 'generative-ai', titleEs: '¿Qué es la IA Generativa?', titleEn: 'What is Generative AI?', level: 'aprendiz', icon: '✨', descEs: 'De la ciencia ficción a tu día a día', descEn: 'From science fiction to your daily life' },

  // COCINERO (Lenguajes y Web)
  { slug: 'javascript', titleEs: 'JavaScript & TypeScript', titleEn: 'JavaScript & TypeScript', level: 'cocinero', icon: '📗', descEs: 'El lenguaje de la web', descEn: 'The language of the web' },
  { slug: 'nodejs', titleEs: 'Node.js & npm/pnpm', titleEn: 'Node.js & npm/pnpm', level: 'cocinero', icon: '📦', descEs: 'Runtime y gestores de paquetes', descEn: 'Runtime and package managers' },
  { slug: 'python', titleEs: 'Python & uv', titleEn: 'Python & uv', level: 'cocinero', icon: '🐍', descEs: 'Python moderno con uv', descEn: 'Modern Python with uv' },
  { slug: 'html-css', titleEs: 'HTML & CSS', titleEn: 'HTML & CSS', level: 'cocinero', icon: '🎨', descEs: 'Estructura y estilos web', descEn: 'Web structure and styles' },
  { slug: 'react', titleEs: 'React', titleEn: 'React', level: 'cocinero', icon: '⚛️', descEs: 'Componentes y estado', descEn: 'Components and state' },
  { slug: 'apis', titleEs: 'APIs REST', titleEn: 'REST APIs', level: 'cocinero', icon: '🔗', descEs: 'Comunicación entre servicios', descEn: 'Service communication' },
  { slug: 'embeddings', titleEs: 'Embeddings', titleEn: 'Embeddings', level: 'cocinero', icon: '🧮', descEs: 'Vectores y similitud semántica', descEn: 'Vectors and semantic similarity' },
  { slug: 'prompt-engineering', titleEs: 'Prompt Engineering', titleEn: 'Prompt Engineering', level: 'cocinero', icon: '📝', descEs: 'El arte de hablar con IAs', descEn: 'The art of talking to AIs' },

  // CHEF (Fullstack)
  { slug: 'git-advanced', titleEs: 'Git Avanzado & Colaboración', titleEn: 'Advanced Git & Collaboration', level: 'chef', icon: '🔀', descEs: 'PRs, merge conflicts, rebases, equipos', descEn: 'PRs, merge conflicts, rebases, teams' },
  { slug: 'nextjs', titleEs: 'Next.js', titleEn: 'Next.js', level: 'chef', icon: '▲', descEs: 'Framework fullstack React', descEn: 'Fullstack React framework' },
  { slug: 'auth', titleEs: 'Autenticación', titleEn: 'Authentication', level: 'chef', icon: '🔐', descEs: 'Firebase, JWT, OAuth', descEn: 'Firebase, JWT, OAuth' },
  { slug: 'webhooks', titleEs: 'Webhooks', titleEn: 'Webhooks', level: 'chef', icon: '🪝', descEs: 'Eventos en tiempo real', descEn: 'Real-time events' },
  { slug: 'nestjs', titleEs: 'NestJS / FastAPI', titleEn: 'NestJS / FastAPI', level: 'chef', icon: '🏗️', descEs: 'Backends estructurados', descEn: 'Structured backends' },
  { slug: 'postgresql', titleEs: 'PostgreSQL', titleEn: 'PostgreSQL', level: 'chef', icon: '🐘', descEs: 'Base de datos relacional', descEn: 'Relational database' },
  { slug: 'redis', titleEs: 'Redis & Cache', titleEn: 'Redis & Cache', level: 'chef', icon: '⚡', descEs: 'Cache y sesiones', descEn: 'Cache and sessions' },
  { slug: 'docker-compose', titleEs: 'Docker Compose', titleEn: 'Docker Compose', level: 'chef', icon: '🐳', descEs: 'Orquestación de contenedores', descEn: 'Container orchestration' },
  { slug: 'cicd', titleEs: 'CI/CD', titleEn: 'CI/CD', level: 'chef', icon: '🚀', descEs: 'GitHub Actions y deploy', descEn: 'GitHub Actions and deploy' },
  { slug: 'mobile', titleEs: 'React Native & Expo', titleEn: 'React Native & Expo', level: 'chef', icon: '📱', descEs: 'Apps móviles multiplataforma', descEn: 'Cross-platform mobile apps' },
  { slug: 'iot', titleEs: 'IoT & Arduino', titleEn: 'IoT & Arduino', level: 'chef', icon: '🔌', descEs: 'Hardware y sensores', descEn: 'Hardware and sensors' },
  { slug: 'agentic-ai', titleEs: 'IA Agéntica', titleEn: 'Agentic AI', level: 'chef', icon: '🤖', descEs: 'IAs que actúan por sí solas', descEn: 'AIs that act on their own' },
  { slug: 'geo', titleEs: 'GEO: Generative Engine Optimization', titleEn: 'GEO: Generative Engine Optimization', level: 'chef', icon: '🔍', descEs: 'SEO para la era de la IA', descEn: 'SEO for the AI era' },

  // MASTER CHEF (IA Avanzada)
  { slug: 'vector-db', titleEs: 'Bases de Datos Vectoriales', titleEn: 'Vector Databases', level: 'master', icon: '🗄️', descEs: 'Qdrant, pgvector, Pinecone', descEn: 'Qdrant, pgvector, Pinecone' },
  { slug: 'rag', titleEs: 'RAG', titleEn: 'RAG', level: 'master', icon: '📚', descEs: 'Retrieval Augmented Generation', descEn: 'Retrieval Augmented Generation' },
  { slug: 'mcp', titleEs: 'MCP (Model Context Protocol)', titleEn: 'MCP (Model Context Protocol)', level: 'master', icon: '🔧', descEs: 'Herramientas para LLMs', descEn: 'Tools for LLMs' },
  { slug: 'agents', titleEs: 'Agentes IA', titleEn: 'AI Agents', level: 'master', icon: '🤖', descEs: 'Agentes autónomos', descEn: 'Autonomous agents' },
  { slug: 'vision', titleEs: 'Vision & Multimodal', titleEn: 'Vision & Multimodal', level: 'master', icon: '👁️', descEs: 'Imágenes y video con IA', descEn: 'Images and video with AI' },
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
    title: isSpanish ? 'Learning - Teoría y Conceptos | luxIA' : 'Learning - Theory & Concepts | luxIA',
    description: isSpanish
      ? 'Aprende los fundamentos del desarrollo de software moderno con IA'
      : 'Learn the fundamentals of modern software development with AI',
  }
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function LearningPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const isSpanish = locale === 'es'

  const groupedSections = {
    aprendiz: sections.filter(s => s.level === 'aprendiz'),
    cocinero: sections.filter(s => s.level === 'cocinero'),
    chef: sections.filter(s => s.level === 'chef'),
    master: sections.filter(s => s.level === 'master'),
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📖</span>
          <h1 className="text-4xl font-bold text-slate-900">
            {isSpanish ? 'Learning' : 'Learning'}
          </h1>
        </div>
        <p className="text-xl text-slate-600 mb-4">
          {isSpanish
            ? 'Teoría, conceptos y fundamentos. Entiende el "por qué" antes del "cómo".'
            : 'Theory, concepts and fundamentals. Understand the "why" before the "how".'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {isSpanish ? '34 temas' : '34 topics'}
          </span>
          <span>•</span>
          <span>{isSpanish ? '4 niveles de dificultad' : '4 difficulty levels'}</span>
          <span>•</span>
          <span className="text-blue-600 font-medium">{isSpanish ? '100% Gratis' : '100% Free'}</span>
        </div>
      </div>

      {/* Cooking Analogy */}
      <CookingAnalogy isSpanish={isSpanish} />

      {/* Link to Cooking */}
      <div className="mb-10 p-4 bg-orange-50 border border-orange-200 rounded-xl">
        <p className="text-sm text-orange-800">
          <span className="font-semibold">👨‍🍳 {isSpanish ? '¿Prefieres aprender haciendo?' : 'Prefer learning by doing?'}</span>
          {' '}
          {isSpanish
            ? 'Visita Cooking para proyectos prácticos que siempre terminan en algo funcional.'
            : 'Visit Cooking for hands-on projects that always result in something functional.'}
          {' '}
          <Link href={`/${locale}/cooking`} className="font-medium underline hover:no-underline">
            {isSpanish ? 'Ir a Cooking →' : 'Go to Cooking →'}
          </Link>
        </p>
      </div>

      {/* Sections by Level */}
      {Object.entries(groupedSections).map(([level, items]) => (
        <div key={level} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelLabels[level as keyof typeof levelLabels].color}`}>
              {levelLabels[level as keyof typeof levelLabels][isSpanish ? 'es' : 'en']}
            </span>
            <span className="text-sm text-slate-400">
              {items.length} {isSpanish ? 'temas' : 'topics'}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {items.map((section) => (
              <Link
                key={section.slug}
                href={`/${locale}/learning/${section.slug}`}
                className="group block bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition truncate">
                      {isSpanish ? section.titleEs : section.titleEn}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {isSpanish ? section.descEs : section.descEn}
                    </p>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Footer note */}
      <div className="mt-12 pt-8 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          {isSpanish ? 'Contenido creado por' : 'Content created by'}{' '}
          <span className="font-medium text-slate-700">Alann Reyes</span>
          {' '}{isSpanish ? 'para' : 'for'}{' '}
          <span className="font-medium text-blue-600">luxIA.us</span>
        </p>
        <p className="text-xs text-slate-400 mt-2">
          {isSpanish ? 'Actualizado Enero 2026' : 'Updated January 2026'}
        </p>
      </div>
    </div>
  )
}
