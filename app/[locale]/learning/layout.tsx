import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

// 30 temas organizados por nivel
const sections = [
  // APRENDIZ (Fundamentos)
  { slug: 'terminal', titleEs: 'Terminal & Shell', titleEn: 'Terminal & Shell', level: 'aprendiz', icon: '🖥️' },
  { slug: 'git', titleEs: 'Git & GitHub', titleEn: 'Git & GitHub', level: 'aprendiz', icon: '📚' },
  { slug: 'editors', titleEs: 'Editores de Código', titleEn: 'Code Editors', level: 'aprendiz', icon: '⌨️' },
  { slug: 'homebrew', titleEs: 'Homebrew & Gestores', titleEn: 'Homebrew & Package Managers', level: 'aprendiz', icon: '📦' },
  { slug: 'docker-intro', titleEs: 'Docker Básico', titleEn: 'Docker Basics', level: 'aprendiz', icon: '🐳' },
  { slug: 'llms-intro', titleEs: 'Intro a LLMs', titleEn: 'Intro to LLMs', level: 'aprendiz', icon: '🤖' },
  { slug: 'llms-models', titleEs: 'Modelos LLM: Guía 2026', titleEn: 'LLM Models: 2026 Guide', level: 'aprendiz', icon: '🧠' },

  // COCINERO (Lenguajes y Web)
  { slug: 'javascript', titleEs: 'JavaScript & TypeScript', titleEn: 'JavaScript & TypeScript', level: 'cocinero', icon: '📗' },
  { slug: 'nodejs', titleEs: 'Node.js & npm/pnpm', titleEn: 'Node.js & npm/pnpm', level: 'cocinero', icon: '📦' },
  { slug: 'python', titleEs: 'Python & uv', titleEn: 'Python & uv', level: 'cocinero', icon: '🐍' },
  { slug: 'html-css', titleEs: 'HTML & CSS', titleEn: 'HTML & CSS', level: 'cocinero', icon: '🎨' },
  { slug: 'react', titleEs: 'React', titleEn: 'React', level: 'cocinero', icon: '⚛️' },
  { slug: 'apis', titleEs: 'APIs REST', titleEn: 'REST APIs', level: 'cocinero', icon: '🔗' },
  { slug: 'embeddings', titleEs: 'Embeddings', titleEn: 'Embeddings', level: 'cocinero', icon: '🧮' },

  // CHEF (Fullstack)
  { slug: 'git-advanced', titleEs: 'Git Avanzado & Colaboración', titleEn: 'Advanced Git & Collaboration', level: 'chef', icon: '🔀' },
  { slug: 'nextjs', titleEs: 'Next.js', titleEn: 'Next.js', level: 'chef', icon: '▲' },
  { slug: 'auth', titleEs: 'Autenticación', titleEn: 'Authentication', level: 'chef', icon: '🔐' },
  { slug: 'webhooks', titleEs: 'Webhooks', titleEn: 'Webhooks', level: 'chef', icon: '🪝' },
  { slug: 'nestjs', titleEs: 'NestJS / FastAPI', titleEn: 'NestJS / FastAPI', level: 'chef', icon: '🏗️' },
  { slug: 'postgresql', titleEs: 'PostgreSQL', titleEn: 'PostgreSQL', level: 'chef', icon: '🐘' },
  { slug: 'redis', titleEs: 'Redis & Cache', titleEn: 'Redis & Cache', level: 'chef', icon: '⚡' },
  { slug: 'docker-compose', titleEs: 'Docker Compose', titleEn: 'Docker Compose', level: 'chef', icon: '🐳' },
  { slug: 'cicd', titleEs: 'CI/CD', titleEn: 'CI/CD', level: 'chef', icon: '🚀' },
  { slug: 'mobile', titleEs: 'React Native & Expo', titleEn: 'React Native & Expo', level: 'chef', icon: '📱' },
  { slug: 'iot', titleEs: 'IoT & Arduino', titleEn: 'IoT & Arduino', level: 'chef', icon: '🔌' },

  // MASTER CHEF (IA Avanzada)
  { slug: 'vector-db', titleEs: 'Bases de Datos Vectoriales', titleEn: 'Vector Databases', level: 'master', icon: '🗄️' },
  { slug: 'rag', titleEs: 'RAG', titleEn: 'RAG', level: 'master', icon: '📚' },
  { slug: 'mcp', titleEs: 'MCP (Model Context Protocol)', titleEn: 'MCP (Model Context Protocol)', level: 'master', icon: '🔧' },
  { slug: 'agents', titleEs: 'Agentes IA', titleEn: 'AI Agents', level: 'master', icon: '🤖' },
  { slug: 'vision', titleEs: 'Vision & Multimodal', titleEn: 'Vision & Multimodal', level: 'master', icon: '👁️' },
]

const levelLabels = {
  aprendiz: { es: '🧑‍🎓 Aprendiz', en: '🧑‍🎓 Apprentice' },
  cocinero: { es: '🧑‍🍳 Cocinero', en: '🧑‍🍳 Cook' },
  chef: { es: '👨‍🍳 Chef', en: '👨‍🍳 Chef' },
  master: { es: '👨‍🍳👑 Master Chef', en: '👨‍🍳👑 Master Chef' },
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LearningLayout({ children, params }: LayoutProps) {
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold">luxIA</span>
            <span className="text-slate-400">/</span>
            <span className="text-blue-400 flex items-center gap-1">
              📖 {isSpanish ? 'aprendiendo' : 'learning'}
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href={`/${locale}/cooking`}
              className="text-sm text-orange-400 hover:text-orange-300 transition flex items-center gap-1"
            >
              👨‍🍳 {isSpanish ? 'Ir a Cooking' : 'Go to Cooking'}
            </Link>
            <Link
              href={isSpanish ? '/en/learning' : '/es/learning'}
              className="text-sm text-slate-300 hover:text-white transition"
            >
              {isSpanish ? 'English' : 'Español'}
            </Link>
            <AuthButton locale={locale} variant="dark" />
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] sticky top-16 hidden lg:block overflow-y-auto">
          <nav className="p-4">
            {Object.entries(groupedSections).map(([level, items]) => (
              <div key={level} className="mb-6">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                  {levelLabels[level as keyof typeof levelLabels][isSpanish ? 'es' : 'en']}
                </h2>
                <ul className="space-y-1">
                  {items.map((section) => (
                    <li key={section.slug}>
                      <Link
                        href={`/${locale}/learning/${section.slug}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        <span>{section.icon}</span>
                        <span className="truncate">{isSpanish ? section.titleEs : section.titleEn}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>© 2026 luxIA.us - {isSpanish ? 'Todos los derechos reservados' : 'All rights reserved'}</p>
          <p className="mt-2">
            {isSpanish ? 'Creado por' : 'Created by'} Alann Reyes
          </p>
        </div>
      </footer>
    </div>
  )
}
