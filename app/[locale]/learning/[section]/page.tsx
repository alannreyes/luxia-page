import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// 28 temas organizados por nivel
const sections = [
  { slug: 'terminal', titleEs: 'Terminal & Shell', titleEn: 'Terminal & Shell', level: 'aprendiz', icon: '🖥️' },
  { slug: 'git', titleEs: 'Git & GitHub', titleEn: 'Git & GitHub', level: 'aprendiz', icon: '📚' },
  { slug: 'editors', titleEs: 'Editores de Código', titleEn: 'Code Editors', level: 'aprendiz', icon: '⌨️' },
  { slug: 'homebrew', titleEs: 'Homebrew & Gestores', titleEn: 'Homebrew & Package Managers', level: 'aprendiz', icon: '📦' },
  { slug: 'docker-intro', titleEs: 'Docker Básico', titleEn: 'Docker Basics', level: 'aprendiz', icon: '🐳' },
  { slug: 'llms-intro', titleEs: 'Intro a LLMs', titleEn: 'Intro to LLMs', level: 'aprendiz', icon: '🤖' },
  { slug: 'javascript', titleEs: 'JavaScript & TypeScript', titleEn: 'JavaScript & TypeScript', level: 'cocinero', icon: '📗' },
  { slug: 'nodejs', titleEs: 'Node.js & npm/pnpm', titleEn: 'Node.js & npm/pnpm', level: 'cocinero', icon: '📦' },
  { slug: 'python', titleEs: 'Python & uv', titleEn: 'Python & uv', level: 'cocinero', icon: '🐍' },
  { slug: 'html-css', titleEs: 'HTML & CSS', titleEn: 'HTML & CSS', level: 'cocinero', icon: '🎨' },
  { slug: 'react', titleEs: 'React', titleEn: 'React', level: 'cocinero', icon: '⚛️' },
  { slug: 'apis', titleEs: 'APIs REST', titleEn: 'REST APIs', level: 'cocinero', icon: '🔗' },
  { slug: 'embeddings', titleEs: 'Embeddings', titleEn: 'Embeddings', level: 'cocinero', icon: '🧮' },
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
  { slug: 'vector-db', titleEs: 'Bases de Datos Vectoriales', titleEn: 'Vector Databases', level: 'master', icon: '🗄️' },
  { slug: 'rag', titleEs: 'RAG', titleEn: 'RAG', level: 'master', icon: '📚' },
  { slug: 'mcp', titleEs: 'MCP (Model Context Protocol)', titleEn: 'MCP (Model Context Protocol)', level: 'master', icon: '🔧' },
  { slug: 'agents', titleEs: 'Agentes IA', titleEn: 'AI Agents', level: 'master', icon: '🤖' },
  { slug: 'vision', titleEs: 'Vision & Multimodal', titleEn: 'Vision & Multimodal', level: 'master', icon: '👁️' },
]

const levelLabels = {
  aprendiz: { es: '🧑‍🎓 Aprendiz', en: '🧑‍🎓 Apprentice', color: 'bg-green-100 text-green-800' },
  cocinero: { es: '🧑‍🍳 Cocinero', en: '🧑‍🍳 Cook', color: 'bg-blue-100 text-blue-800' },
  chef: { es: '👨‍🍳 Chef', en: '👨‍🍳 Chef', color: 'bg-purple-100 text-purple-800' },
  master: { es: '👨‍🍳👑 Master Chef', en: '👨‍🍳👑 Master Chef', color: 'bg-amber-100 text-amber-800' },
}

// Contenido real (10% - muestra de calidad)
// Los demás mostrarán "Coming Soon"
const sectionsContent: Record<string, {
  contentEs: string
  contentEn: string
}> = {
  terminal: {
    contentEs: `
## Antes de escribir código, necesitas entender tu taller

Imagina que eres un carpintero. Antes de construir un mueble, necesitas conocer tu taller: dónde están las herramientas, cómo funcionan, y por qué usas un serrucho en vez de un martillo para cortar madera.

El desarrollo de software es igual. Tu computadora es el taller. La Terminal es tu mesa de trabajo principal. Y las herramientas que instalaremos son tus instrumentos de precisión.

> **La diferencia entre un desarrollador junior y uno senior no es solo el código que escriben, sino qué tan bien conocen sus herramientas.**

---

## La Terminal: Tu centro de comando

La Terminal es una ventana que te permite hablar directamente con tu computadora usando texto. En vez de clicks y ventanas, usas comandos escritos.

### ¿Cómo abrir la terminal?

| Sistema | Cómo abrirla | Nombre |
|---------|--------------|--------|
| **macOS** | Cmd + Espacio → "Terminal" | Terminal.app o iTerm2 |
| **Linux** | Ctrl + Alt + T | GNOME Terminal, Konsole |
| **Windows** | Win + X → Terminal | Windows Terminal, PowerShell |

> 💡 **Windows**: Recomendamos instalar [Windows Terminal](https://aka.ms/terminal) desde la Microsoft Store. Es moderno y soporta tabs.

### Tu primer comando

Abre Terminal y escribe:

\`\`\`bash
echo "Hola, soy desarrollador"
\`\`\`

Acabas de darle una instrucción a tu computadora. \`echo\` significa "repite lo que te digo".

### Comandos esenciales

\`\`\`bash
# ¿Dónde estoy?
pwd

# ¿Qué hay aquí?
ls

# Ir a otra carpeta
cd Documents

# Volver atrás
cd ..

# Ir a home
cd ~
\`\`\`

> 💡 **Tip**: Presiona Tab para autocompletar nombres de archivos.

---

## El Shell: El intérprete

Cuando escribes en la Terminal, hay un programa que interpreta lo que escribes. Ese programa se llama **Shell**.

| Sistema | Shell por defecto | Alternativa |
|---------|-------------------|-------------|
| **macOS** | zsh | bash, fish |
| **Linux** | bash | zsh, fish |
| **Windows** | PowerShell | Git Bash, WSL |

### Tu archivo de configuración

| Sistema | Shell | Archivo |
|---------|-------|---------|
| **macOS** | zsh | \`~/.zshrc\` |
| **Linux** | bash | \`~/.bashrc\` |
| **Windows** | PowerShell | \`$PROFILE\` |

---

## El PATH: El mapa de herramientas

Cuando escribes \`git\`, ¿cómo sabe tu computadora dónde está?

**PATH** es una lista de carpetas donde el sistema busca programas.

\`\`\`bash
# Ver tu PATH
echo $PATH
\`\`\`

> ⚠️ Si instalas algo y dice "command not found", probablemente necesitas agregar su carpeta al PATH.

---

## Enlaces útiles

- 📖 [Documentación oficial de zsh](https://zsh.sourceforge.io/Doc/)
- 🎓 [Tutorial interactivo de Terminal](https://www.terminaltutor.com/)
    `,
    contentEn: `
## Before writing code, you need to understand your workshop

Imagine you're a carpenter. Before building furniture, you need to know your workshop: where the tools are, how they work, and why you use a saw instead of a hammer to cut wood.

Software development is the same. Your computer is the workshop. The Terminal is your main workbench. And the tools we'll install are your precision instruments.

> **The difference between a junior and senior developer isn't just the code they write, but how well they know their tools.**

---

## The Terminal: Your command center

The Terminal is a window that lets you talk directly to your computer using text. Instead of clicks and windows, you use written commands.

### How to open the terminal?

| System | How to open | Name |
|--------|-------------|------|
| **macOS** | Cmd + Space → "Terminal" | Terminal.app or iTerm2 |
| **Linux** | Ctrl + Alt + T | GNOME Terminal, Konsole |
| **Windows** | Win + X → Terminal | Windows Terminal, PowerShell |

> 💡 **Windows**: We recommend installing [Windows Terminal](https://aka.ms/terminal) from the Microsoft Store. It's modern and supports tabs.

### Your first command

Open Terminal and type:

\`\`\`bash
echo "Hello, I am a developer"
\`\`\`

You just gave your computer an instruction. \`echo\` means "repeat what I tell you".

### Essential commands

\`\`\`bash
# Where am I?
pwd

# What's here?
ls

# Go to another folder
cd Documents

# Go back
cd ..

# Go home
cd ~
\`\`\`

> 💡 **Tip**: Press Tab to autocomplete file names.

---

## The Shell: The interpreter

When you type in Terminal, there's a program that interprets what you write. That program is called the **Shell**.

| System | Default shell | Alternative |
|--------|---------------|-------------|
| **macOS** | zsh | bash, fish |
| **Linux** | bash | zsh, fish |
| **Windows** | PowerShell | Git Bash, WSL |

### Your configuration file

| System | Shell | File |
|--------|-------|------|
| **macOS** | zsh | \`~/.zshrc\` |
| **Linux** | bash | \`~/.bashrc\` |
| **Windows** | PowerShell | \`$PROFILE\` |

---

## PATH: The tools map

When you type \`git\`, how does your computer know where it is?

**PATH** is a list of folders where the system looks for programs.

\`\`\`bash
# View your PATH
echo $PATH
\`\`\`

> ⚠️ If you install something and it says "command not found", you probably need to add its folder to PATH.

---

## Useful links

- 📖 [Official zsh documentation](https://zsh.sourceforge.io/Doc/)
- 🎓 [Interactive Terminal tutorial](https://www.terminaltutor.com/)
    `,
  },
  git: {
    contentEs: `
## Control de versiones: El "Ctrl+Z" profesional

Imagina escribir un documento de 100 páginas sin poder deshacer cambios. Así era programar antes de Git.

**Git** es un sistema de control de versiones que guarda el historial de todos los cambios en tu código.

---

## Instalación

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install git\` |
| **Linux** | \`sudo apt install git\` |
| **Windows** | \`winget install Git.Git\` |

## Configuración inicial

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
\`\`\`

---

## Conceptos clave

| Concepto | Qué es | Analogía |
|----------|--------|----------|
| **Repository** | Carpeta con historial Git | Álbum de fotos |
| **Commit** | Foto del estado actual | Foto en el álbum |
| **Branch** | Línea alternativa de desarrollo | Universo paralelo |
| **Merge** | Unir dos branches | Fusionar universos |

---

## Flujo básico

\`\`\`bash
# 1. Ver estado
git status

# 2. Agregar cambios
git add .

# 3. Guardar con mensaje
git commit -m "Agrega nueva funcionalidad"

# 4. Subir a remoto
git push origin main
\`\`\`

---

## GitHub CLI

\`\`\`bash
# Instalar
brew install gh

# Autenticar
gh auth login

# Crear PR
gh pr create --fill
\`\`\`

---

## Enlaces útiles

- 📖 [Git - Documentación oficial](https://git-scm.com/doc)
- 🎓 [Learn Git Branching](https://learngitbranching.js.org/)
    `,
    contentEn: `
## Version control: The professional "Ctrl+Z"

Imagine writing a 100-page document without being able to undo changes. That's what programming was like before Git.

**Git** is a version control system that saves the history of all changes in your code.

---

## Installation

| System | Command |
|--------|---------|
| **macOS** | \`brew install git\` |
| **Linux** | \`sudo apt install git\` |
| **Windows** | \`winget install Git.Git\` |

## Initial setup

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
\`\`\`

---

## Key concepts

| Concept | What it is | Analogy |
|---------|------------|---------|
| **Repository** | Folder with Git history | Photo album |
| **Commit** | Snapshot of current state | Photo in album |
| **Branch** | Alternative line of development | Parallel universe |
| **Merge** | Join two branches | Merge universes |

---

## Basic workflow

\`\`\`bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Save with message
git commit -m "Add new feature"

# 4. Push to remote
git push origin main
\`\`\`

---

## GitHub CLI

\`\`\`bash
# Install
brew install gh

# Authenticate
gh auth login

# Create PR
gh pr create --fill
\`\`\`

---

## Useful links

- 📖 [Git - Official documentation](https://git-scm.com/doc)
- 🎓 [Learn Git Branching](https://learngitbranching.js.org/)
    `,
  },
  llms_intro: {
    contentEs: `
## ¿Qué es un LLM?

**LLM** = Large Language Model (Modelo de Lenguaje Grande)

Es un programa entrenado con millones de textos que puede entender y generar lenguaje humano.

> **Analogía**: Un LLM es como un asistente que ha leído todo internet y puede responder preguntas basándose en ese conocimiento.

---

## Los principales LLMs (2026)

| Modelo | Empresa | Fortaleza |
|--------|---------|-----------|
| **Claude** | Anthropic | Razonamiento, código, seguro |
| **GPT-4** | OpenAI | Versátil, amplio conocimiento |
| **Gemini** | Google | Multimodal, integración Google |
| **Llama** | Meta | Open source, local |

---

## Tu primer chatbot local

Con Ollama puedes correr modelos en tu computadora:

\`\`\`bash
# Instalar Ollama
brew install ollama

# Descargar un modelo
ollama pull llama3.2

# Chatear
ollama run llama3.2
\`\`\`

> 💡 **Tip**: Modelos pequeños como \`llama3.2:3b\` corren en laptops normales.

---

## APIs de LLMs

\`\`\`typescript
// Ejemplo con Anthropic SDK
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hola Claude!' }
  ]
})
\`\`\`

---

## Conceptos clave

| Concepto | Qué es |
|----------|--------|
| **Prompt** | La instrucción que le das al modelo |
| **Token** | Unidad de texto (~4 caracteres) |
| **Context Window** | Memoria del modelo (cuánto puede "recordar") |
| **Temperature** | Creatividad (0=determinista, 1=creativo) |

---

## Enlaces útiles

- 📖 [Anthropic API Docs](https://docs.anthropic.com/)
- 📖 [Ollama](https://ollama.ai/)
- 🎓 [Prompt Engineering Guide](https://www.promptingguide.ai/)
    `,
    contentEn: `
## What is an LLM?

**LLM** = Large Language Model

It's a program trained on millions of texts that can understand and generate human language.

> **Analogy**: An LLM is like an assistant that has read the entire internet and can answer questions based on that knowledge.

---

## Main LLMs (2026)

| Model | Company | Strength |
|-------|---------|----------|
| **Claude** | Anthropic | Reasoning, code, safety |
| **GPT-4** | OpenAI | Versatile, broad knowledge |
| **Gemini** | Google | Multimodal, Google integration |
| **Llama** | Meta | Open source, local |

---

## Your first local chatbot

With Ollama you can run models on your computer:

\`\`\`bash
# Install Ollama
brew install ollama

# Download a model
ollama pull llama3.2

# Chat
ollama run llama3.2
\`\`\`

> 💡 **Tip**: Small models like \`llama3.2:3b\` run on normal laptops.

---

## LLM APIs

\`\`\`typescript
// Example with Anthropic SDK
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello Claude!' }
  ]
})
\`\`\`

---

## Key concepts

| Concept | What it is |
|---------|------------|
| **Prompt** | The instruction you give the model |
| **Token** | Unit of text (~4 characters) |
| **Context Window** | Model's memory (how much it can "remember") |
| **Temperature** | Creativity (0=deterministic, 1=creative) |

---

## Useful links

- 📖 [Anthropic API Docs](https://docs.anthropic.com/)
- 📖 [Ollama](https://ollama.ai/)
- 🎓 [Prompt Engineering Guide](https://www.promptingguide.ai/)
    `,
  },
}

// Mapear slugs alternativos
const slugAliases: Record<string, string> = {
  'llms-intro': 'llms_intro',
}

const sectionOrder = sections.map(s => s.slug)

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const sectionData = sections.find(s => s.slug === resolvedParams.section)

  if (!sectionData) return { title: 'Not Found' }

  const title = locale === 'es' ? sectionData.titleEs : sectionData.titleEn

  return {
    title: `${title} - Learning | luxIA`,
  }
}

export async function generateStaticParams() {
  return sectionOrder.flatMap(section => [
    { locale: 'es', section },
    { locale: 'en', section }
  ])
}

interface PageProps {
  params: Promise<{ locale: string; section: string }>
}

export default async function SectionPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const sectionSlug = resolvedParams.section
  const isSpanish = locale === 'es'

  // Buscar el section en la lista
  const sectionData = sections.find(s => s.slug === sectionSlug)

  if (!sectionData) {
    notFound()
  }

  // Buscar contenido (con alias si aplica)
  const contentKey = slugAliases[sectionSlug] || sectionSlug
  const content = sectionsContent[contentKey]
  const hasContent = !!content

  const currentIndex = sectionOrder.indexOf(sectionSlug)
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null
  const nextSection = currentIndex < sectionOrder.length - 1 ? sections[currentIndex + 1] : null

  const title = isSpanish ? sectionData.titleEs : sectionData.titleEn
  const levelInfo = levelLabels[sectionData.level as keyof typeof levelLabels]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-slate-500">
          <li>
            <Link href={`/${locale}/learning`} className="hover:text-blue-600">
              Learning
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium">{title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{sectionData.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${levelInfo.color}`}>
              {levelInfo[isSpanish ? 'es' : 'en']}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {hasContent ? (
        <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-900 prose-pre:text-slate-100">
          <div dangerouslySetInnerHTML={{ __html: parseMarkdown(isSpanish ? content.contentEs : content.contentEn) }} />
        </article>
      ) : (
        /* Coming Soon */
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {isSpanish ? 'Próximamente' : 'Coming Soon'}
          </h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            {isSpanish
              ? 'Estamos preparando contenido de alta calidad para este tema. ¡Vuelve pronto!'
              : 'We are preparing high-quality content for this topic. Check back soon!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/learning`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              ← {isSpanish ? 'Ver todos los temas' : 'View all topics'}
            </Link>
            <Link
              href={`/${locale}/cooking`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition"
            >
              👨‍🍳 {isSpanish ? 'Ir a Cooking' : 'Go to Cooking'}
            </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-12 pt-8 border-t border-slate-200 flex justify-between">
        {prevSection ? (
          <Link
            href={`/${locale}/learning/${prevSection.slug}`}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition group"
          >
            <span className="group-hover:-translate-x-1 transition">←</span>
            <span className="hidden sm:inline">{isSpanish ? prevSection.titleEs : prevSection.titleEn}</span>
            <span className="sm:hidden">{isSpanish ? 'Anterior' : 'Previous'}</span>
          </Link>
        ) : <div />}

        {nextSection ? (
          <Link
            href={`/${locale}/learning/${nextSection.slug}`}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition group"
          >
            <span className="hidden sm:inline">{isSpanish ? nextSection.titleEs : nextSection.titleEn}</span>
            <span className="sm:hidden">{isSpanish ? 'Siguiente' : 'Next'}</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        ) : (
          <Link
            href={`/${locale}/learning`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <span>{isSpanish ? 'Volver al índice' : 'Back to index'}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}

// Simple markdown parser
function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^\|(.+)\|$/gm, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim())
      const isHeader = cells.some((cell: string) => cell.match(/^-+$/))
      if (isHeader) return ''
      const tag = match.includes('---') ? 'th' : 'td'
      return `<tr>${cells.map((cell: string) => `<${tag}>${cell}</${tag}>`).join('')}</tr>`
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, '<table class="w-full">$1</table>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/---/g, '<hr />')
}
