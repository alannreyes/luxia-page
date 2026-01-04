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
  { slug: 'javascript', titleEs: 'JavaScript & TypeScript', titleEn: 'JavaScript & TypeScript', level: 'cocinero', icon: '📗' },
  { slug: 'nodejs', titleEs: 'Node.js & npm/pnpm', titleEn: 'Node.js & npm/pnpm', level: 'cocinero', icon: '📦' },
  { slug: 'python', titleEs: 'Python & uv', titleEn: 'Python & uv', level: 'cocinero', icon: '🐍' },
  { slug: 'html-css', titleEs: 'HTML & CSS', titleEn: 'HTML & CSS', level: 'cocinero', icon: '🎨' },
  { slug: 'react', titleEs: 'React', titleEn: 'React', level: 'cocinero', icon: '⚛️' },
  { slug: 'apis', titleEs: 'APIs REST', titleEn: 'REST APIs', level: 'cocinero', icon: '🔗' },
  { slug: 'embeddings', titleEs: 'Embeddings', titleEn: 'Embeddings', level: 'cocinero', icon: '🧮' },
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
## Tu herramienta más importante

El editor de código es donde pasarás el 90% de tu tiempo programando. Elegir uno bueno y aprenderlo bien te hace más productivo.

---

## Opciones populares

| Editor | Tipo | Ideal para |
|--------|------|------------|
| **VS Code** | Gratuito, extensible | Mayoría de desarrolladores |
| **Cursor** | VS Code + IA | Desarrollo con IA integrada |
| **Zed** | Rápido, Rust | Performance extremo |
| **Neovim** | Terminal | Usuarios avanzados |
| **JetBrains** | IDEs completos | Proyectos grandes, Java |

> 💡 **Recomendación**: VS Code para empezar, Cursor si usas mucho IA.

---

## Instalación

| Sistema | VS Code | Cursor |
|---------|---------|--------|
| **macOS** | \`brew install --cask visual-studio-code\` | \`brew install --cask cursor\` |
| **Windows** | \`winget install Microsoft.VisualStudioCode\` | Descargar de cursor.sh |
| **Linux** | \`sudo snap install code --classic\` | Descargar de cursor.sh |

---

## Extensiones esenciales (VS Code)

| Extensión | Para qué |
|-----------|----------|
| **ESLint** | Errores JavaScript/TypeScript |
| **Prettier** | Formateo automático |
| **GitLens** | Historial Git visual |
| **Auto Close Tag** | HTML/JSX más rápido |
| **Error Lens** | Errores inline |

\`\`\`bash
# Instalar desde terminal
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
\`\`\`

---

## Atajos que debes saber

| Acción | macOS | Windows/Linux |
|--------|-------|---------------|
| Paleta comandos | \`Cmd+Shift+P\` | \`Ctrl+Shift+P\` |
| Buscar archivo | \`Cmd+P\` | \`Ctrl+P\` |
| Buscar en proyecto | \`Cmd+Shift+F\` | \`Ctrl+Shift+F\` |
| Terminal | \`Cmd+J\` | \`Ctrl+J\` |
| Multi-cursor | \`Cmd+D\` | \`Ctrl+D\` |

---

## settings.json recomendado

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.wordWrap": "on"
}
\`\`\`

---

## AI Coding Assistants (Enero 2026)

En la era del "prompt-first", los asistentes de código con IA son tan importantes como el editor mismo. Esta es la guía más completa para elegir tu herramienta.

---

### Categorías de herramientas

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    CATEGORÍAS                                │
├─────────────────────────────────────────────────────────────┤
│  CLI (Terminal)     │ Claude Code, OpenAI Codex CLI, Aider  │
│  Extensiones        │ Copilot, Cody, Continue, Gemini       │
│  Editores con IA    │ Cursor, Windsurf, Antigravity, IDX    │
│  Agentes Cloud      │ OpenAI Codex, Antigravity Manager     │
│  Chat + Código      │ ChatGPT, Claude.ai, Gemini            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Comparativa completa de precios (Enero 2026)

| Herramienta | Empresa | Plan Gratis | Plan Pro | Modelo base |
|-------------|---------|-------------|----------|-------------|
| **Claude Code** | Anthropic | - | ~$3/M tokens (API) | Claude Sonnet 4.5 |
| **GitHub Copilot** | Microsoft | Estudiantes gratis | $10/mes Individual, $19/mes Business | GPT-4o + Claude |
| **Cursor** | Cursor Inc | 2000 completions/mes | $20/mes Pro | GPT-4, Claude 4.5 |
| **Google Antigravity** | Google | **Gratis (preview)** | TBD | Gemini 3 Pro |
| **Windsurf** | Codeium | Gratis limitado | $15/mes Pro | Cascade (propio) |
| **OpenAI Codex** | OpenAI | Codex CLI gratis | API usage | GPT-5.2-Codex |
| **Gemini Code Assist** | Google | 6000 completions/mes | $19/mes Enterprise | Gemini 1.5 Pro |
| **Cody** | Sourcegraph | 500 msgs/mes | $9/mes Pro | Claude 3.5 |
| **Continue** | Continue.dev | Gratis + API | Gratis + API | Cualquiera |
| **Aider** | Open Source | Gratis + API | Gratis + API | Cualquiera |

---

### Benchmark: Capacidades por herramienta

| Capacidad | Claude Code | Antigravity | Codex | Copilot | Cursor | Cody |
|-----------|:-----------:|:-----------:|:-----:|:-------:|:------:|:----:|
| Autocompletado inline | ❌ | ✅ | ❌ | ✅✅ | ✅✅ | ✅ |
| Chat contextual | ✅✅ | ✅✅ | ✅ | ✅ | ✅✅ | ✅✅ |
| Edición multi-archivo | ✅✅ | ✅✅ | ✅✅ | ❌ | ✅✅ | ✅ |
| Ejecutar comandos | ✅✅ | ✅✅ | ✅✅ | ❌ | ✅ | ❌ |
| Contexto proyecto | ✅✅ | ✅✅ | ✅✅ | ⚠️ | ✅✅ | ✅✅ |
| Funciona sin editor | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Modo agente autónomo | ✅✅ | ✅✅ | ✅✅ | ❌ | ✅ | ❌ |
| Multi-agente paralelo | ❌ | ✅✅ | ✅ | ❌ | ❌ | ❌ |

\`\`\`
Leyenda: ✅✅ Excelente | ✅ Bueno | ⚠️ Limitado | ❌ No disponible
\`\`\`

> 🆕 **Google Antigravity** destaca por su "Manager View" que permite múltiples agentes trabajando en paralelo.

---

### Claude Code vs GitHub Copilot vs Cursor

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE (Anthropic)                   │
├─────────────────────────────────────────────────────────────┤
│  ✓ Lee/edita archivos directamente desde terminal           │
│  ✓ Ejecuta comandos (npm, git, docker, etc.)                │
│  ✓ Contexto completo del proyecto (~200K tokens)            │
│  ✓ Modo agente: resuelve tareas complejas solo              │
│  ✓ Funciona con cualquier editor (VS Code, Vim, etc.)       │
│  ✗ Sin autocompletado inline                                │
│  ✗ Requiere API key (pago por uso)                          │
│                                                              │
│  💰 Costo: ~$3/M tokens, $20/mes pro, $100/mes max          │
│  🔗 https://docs.anthropic.com/en/docs/claude-code          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GITHUB COPILOT (Microsoft)                │
├─────────────────────────────────────────────────────────────┤
│  ✓ Autocompletado instantáneo mientras escribes             │
│  ✓ Integrado nativo en VS Code, JetBrains, Neovim           │
│  ✓ Copilot Chat para preguntas                              │
│  ✓ Copilot Workspace (beta): multi-archivo                  │
│  ✗ No ejecuta comandos                                      │
│  ✗ Contexto limitado a archivos abiertos                    │
│  ✗ No tiene modo agente autónomo                            │
│                                                              │
│  💰 Costo: $10/mes individual, $19/mes business             │
│  🔗 https://github.com/features/copilot                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       CURSOR                                 │
├─────────────────────────────────────────────────────────────┤
│  ✓ Editor completo basado en VS Code                        │
│  ✓ Autocompletado + Chat + Composer (multi-archivo)         │
│  ✓ Cmd+K para editar código inline                          │
│  ✓ Usa múltiples modelos (GPT-4, Claude, etc.)              │
│  ✗ Es otro editor que aprender                              │
│  ✗ Suscripción mensual obligatoria para Pro                 │
│  ✗ Menos portable que una CLI                               │
│                                                              │
│  💰 Costo: Gratis limitado, $20/mes Pro                     │
│  🔗 https://cursor.sh                                       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Google Antigravity y OpenAI Codex (Novedades 2025)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            🆕 GOOGLE ANTIGRAVITY (Nov 2025)                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ IDE "agent-first" (fork de VS Code/Windsurf)             │
│  ✓ Manager View: múltiples agentes en PARALELO              │
│  ✓ 76.2% en SWE-bench (casi igual a Claude 4.5)             │
│  ✓ Powered by Gemini 3 Pro/Flash/Deep Think                 │
│  ✓ Soporta Claude y modelos open source también             │
│  ✓ GRATIS durante preview público                           │
│  ✗ Muy nuevo, ecosistema en desarrollo                      │
│                                                              │
│  💰 Gratis (preview) | Pricing TBD                          │
│  🔗 https://antigravityai.org                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            🆕 OPENAI CODEX (Relanzado 2025)                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ Codex CLI: agente local open source (Abril 2025)         │
│  ✓ Codex Cloud: agente autónomo en la nube (Mayo 2025)      │
│  ✓ Powered by codex-1 (o3 optimizado para código)           │
│  ✓ GPT-5.2-Codex: modelo más reciente                       │
│  ✓ Ejecuta tareas, crea PRs, resuelve issues                │
│  ⚠️ codex-mini-latest se depreca 16 Enero 2026              │
│                                                              │
│  💰 CLI gratis + API | Cloud: API usage                     │
│  🔗 https://openai.com/index/introducing-codex              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Otras opciones de Google y OpenAI

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                 GEMINI CODE ASSIST (Google)                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ Extensión para VS Code y JetBrains                       │
│  ✓ 6000 completions gratis al mes                           │
│  ✓ Integración con Google Cloud                             │
│  ✗ Menos contexto que Claude/Cursor                         │
│  ✗ Enterprise enfocado, menos para indie                    │
│                                                              │
│  💰 Gratis: 6000/mes | Enterprise: $19/usuario/mes          │
│  🔗 https://cloud.google.com/gemini/docs/codeassist         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GOOGLE IDX                                │
├─────────────────────────────────────────────────────────────┤
│  ✓ IDE completo en la nube (VS Code-based)                  │
│  ✓ Gemini integrado nativamente                             │
│  ✓ Gratis durante beta                                      │
│  ✓ Templates para Flutter, React, Angular, etc.             │
│  ✗ Requiere internet siempre                                │
│  ✗ En beta, puede cambiar                                   │
│                                                              │
│  💰 Gratis (beta)                                           │
│  🔗 https://idx.dev                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CHATGPT + Code (OpenAI)                   │
├─────────────────────────────────────────────────────────────┤
│  ✓ Code Interpreter: ejecuta Python en sandbox              │
│  ✓ Análisis de archivos subidos                             │
│  ✓ Canvas: edición visual de código                         │
│  ✗ No edita tus archivos locales                            │
│  ✗ No tiene extensión de editor oficial                     │
│  ✗ Contexto limitado a la conversación                      │
│                                                              │
│  💰 Gratis limitado | Plus: $20/mes | Pro: $200/mes         │
│  🔗 https://chat.openai.com                                 │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Open Source: Aider, Continue, Cody

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                       AIDER                                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ 100% Open Source (Apache 2.0)                            │
│  ✓ Usa CUALQUIER modelo (GPT, Claude, Ollama, etc.)         │
│  ✓ Git integrado: auto-commit de cambios                    │
│  ✓ Edita múltiples archivos                                 │
│  ✓ Benchmarks públicos: líder en SWE-bench                  │
│  ✗ Solo terminal, curva de aprendizaje                      │
│                                                              │
│  💰 Gratis + costo de API del modelo que uses               │
│  🔗 https://aider.chat                                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       CONTINUE                               │
├─────────────────────────────────────────────────────────────┤
│  ✓ Extensión Open Source para VS Code/JetBrains             │
│  ✓ Usa cualquier modelo (local o API)                       │
│  ✓ Autocompletado + Chat                                    │
│  ✓ Totalmente personalizable                                │
│  ✗ Requiere configuración inicial                           │
│                                                              │
│  💰 Gratis + costo de API                                   │
│  🔗 https://continue.dev                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       CODY (Sourcegraph)                     │
├─────────────────────────────────────────────────────────────┤
│  ✓ Contexto de codebase ENORME (millones de líneas)         │
│  ✓ Usa Claude 3.5 Sonnet                                    │
│  ✓ Busca en todo tu código, no solo archivos abiertos       │
│  ✓ Plan gratis generoso (500 msgs/mes)                      │
│  ✗ Menos autonomía que Claude Code                          │
│                                                              │
│  💰 Gratis: 500 msgs | Pro: $9/mes | Enterprise: custom     │
│  🔗 https://sourcegraph.com/cody                            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### ¿Cuál elegir? Guía de decisión

| Tu situación | Recomendación | Por qué |
|--------------|---------------|---------|
| **Empezando a programar** | GitHub Copilot Free | Autocompletado ayuda a aprender |
| **Quiero máximo poder** | Claude Code | Modo agente, ejecuta comandos |
| **Multi-agente paralelo** | Google Antigravity | Manager View con 5+ agentes |
| **Ecosistema OpenAI** | Codex CLI + Cloud | Integrado con GPT-5.2 |
| **Todo en un editor** | Cursor | Mejor UX integrada |
| **Presupuesto cero** | Continue + Ollama | 100% local y gratis |
| **Codebase empresarial** | Cody | Mejor contexto de código |
| **Ecosistema Google** | Antigravity o Gemini | Gemini 3 nativo |
| **Máxima flexibilidad** | Aider | Cualquier modelo, open source |

---

### Combinaciones recomendadas

\`\`\`
COMBO 1: Productividad máxima (Premium)
├── Cursor (editor principal)
└── Claude Code (tareas complejas desde terminal)

COMBO 2: Equilibrio costo/beneficio
├── VS Code + GitHub Copilot (autocompletado)
└── Claude Code (cuando necesitas más poder)

COMBO 3: 100% Gratis
├── VS Code + Continue (autocompletado con Ollama)
└── Aider (edición multi-archivo)

COMBO 4: Enterprise
├── VS Code + Cody (contexto masivo)
└── Gemini Code Assist (integración Google Cloud)
\`\`\`

> 💡 **Las herramientas se complementan**: No tienes que elegir solo una.

---

## Practica

→ [Introducción a Claude Code](/es/cooking/claude-code-intro) — Instala y usa Claude Code

---

## Enlaces útiles

**CLIs:**
- 🤖 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Anthropic
- 🔧 [Aider](https://aider.chat) - Open Source
- ⚡ [OpenAI Codex CLI](https://openai.com/index/introducing-codex) - OpenAI

**Extensiones:**
- 🐙 [GitHub Copilot](https://github.com/features/copilot) - Microsoft
- 🔍 [Cody](https://sourcegraph.com/cody) - Sourcegraph
- 🔓 [Continue](https://continue.dev) - Open Source

**Editores con IA:**
- ⌨️ [Cursor](https://cursor.sh) - Cursor Inc
- 🌊 [Windsurf](https://codeium.com/windsurf) - Codeium
- 🚀 [Google Antigravity](https://antigravityai.org) - Google (Nuevo!)

**Google:**
- 💎 [Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist)
- 🌐 [Google IDX](https://idx.dev)

**OpenAI:**
- 💬 [ChatGPT](https://chat.openai.com)
- 🧠 [Codex Cloud](https://openai.com/index/introducing-codex)
    `,
    contentEn: `
## Your most important tool

The code editor is where you'll spend 90% of your programming time. Choosing a good one and learning it well makes you more productive.

---

## Popular options

| Editor | Type | Ideal for |
|--------|------|-----------|
| **VS Code** | Free, extensible | Most developers |
| **Cursor** | VS Code + AI | Development with integrated AI |
| **Zed** | Fast, Rust | Extreme performance |
| **Neovim** | Terminal | Advanced users |
| **JetBrains** | Full IDEs | Large projects, Java |

> 💡 **Recommendation**: VS Code to start, Cursor if you use a lot of AI.

---

## Installation

| System | VS Code | Cursor |
|--------|---------|--------|
| **macOS** | \`brew install --cask visual-studio-code\` | \`brew install --cask cursor\` |
| **Windows** | \`winget install Microsoft.VisualStudioCode\` | Download from cursor.sh |
| **Linux** | \`sudo snap install code --classic\` | Download from cursor.sh |

---

## Essential extensions (VS Code)

| Extension | What for |
|-----------|----------|
| **ESLint** | JavaScript/TypeScript errors |
| **Prettier** | Auto formatting |
| **GitLens** | Visual Git history |
| **Auto Close Tag** | Faster HTML/JSX |
| **Error Lens** | Inline errors |

\`\`\`bash
# Install from terminal
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
\`\`\`

---

## Shortcuts you must know

| Action | macOS | Windows/Linux |
|--------|-------|---------------|
| Command palette | \`Cmd+Shift+P\` | \`Ctrl+Shift+P\` |
| Find file | \`Cmd+P\` | \`Ctrl+P\` |
| Search in project | \`Cmd+Shift+F\` | \`Ctrl+Shift+F\` |
| Terminal | \`Cmd+J\` | \`Ctrl+J\` |
| Multi-cursor | \`Cmd+D\` | \`Ctrl+D\` |

---

## Recommended settings.json

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.wordWrap": "on"
}
\`\`\`

---

## AI Coding Assistants (January 2026)

In the "prompt-first" era, AI code assistants are as important as the editor itself. This is the most complete guide to choosing your tool.

---

### Tool Categories

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    CATEGORIES                                │
├─────────────────────────────────────────────────────────────┤
│  CLI (Terminal)     │ Claude Code, OpenAI Codex CLI, Aider  │
│  Extensions         │ Copilot, Cody, Continue, Gemini       │
│  AI Editors         │ Cursor, Windsurf, Antigravity, IDX    │
│  Cloud Agents       │ OpenAI Codex, Antigravity Manager     │
│  Chat + Code        │ ChatGPT, Claude.ai, Gemini            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Complete Pricing Comparison (January 2026)

| Tool | Company | Free Plan | Pro Plan | Base Model |
|------|---------|-----------|----------|------------|
| **Claude Code** | Anthropic | - | ~$3/M tokens (API) | Claude Sonnet 4.5 |
| **GitHub Copilot** | Microsoft | Students free | $10/mo Individual, $19/mo Business | GPT-4o + Claude |
| **Cursor** | Cursor Inc | 2000 completions/mo | $20/mo Pro | GPT-4, Claude 4.5 |
| **Google Antigravity** | Google | **Free (preview)** | TBD | Gemini 3 Pro |
| **Windsurf** | Codeium | Free limited | $15/mo Pro | Cascade (proprietary) |
| **OpenAI Codex** | OpenAI | Codex CLI free | API usage | GPT-5.2-Codex |
| **Gemini Code Assist** | Google | 6000 completions/mo | $19/mo Enterprise | Gemini 1.5 Pro |
| **Cody** | Sourcegraph | 500 msgs/mo | $9/mo Pro | Claude 3.5 |
| **Continue** | Continue.dev | Free + API | Free + API | Any |
| **Aider** | Open Source | Free + API | Free + API | Any |

---

### Benchmark: Capabilities by Tool

| Capability | Claude Code | Antigravity | Codex | Copilot | Cursor | Cody |
|------------|:-----------:|:-----------:|:-----:|:-------:|:------:|:----:|
| Inline autocomplete | ❌ | ✅ | ❌ | ✅✅ | ✅✅ | ✅ |
| Contextual chat | ✅✅ | ✅✅ | ✅ | ✅ | ✅✅ | ✅✅ |
| Multi-file editing | ✅✅ | ✅✅ | ✅✅ | ❌ | ✅✅ | ✅ |
| Execute commands | ✅✅ | ✅✅ | ✅✅ | ❌ | ✅ | ❌ |
| Full project context | ✅✅ | ✅✅ | ✅✅ | ⚠️ | ✅✅ | ✅✅ |
| Works without editor | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Autonomous agent mode | ✅✅ | ✅✅ | ✅✅ | ❌ | ✅ | ❌ |
| Parallel multi-agent | ❌ | ✅✅ | ✅ | ❌ | ❌ | ❌ |

\`\`\`
Legend: ✅✅ Excellent | ✅ Good | ⚠️ Limited | ❌ Not available
\`\`\`

> 🆕 **Google Antigravity** stands out with its "Manager View" allowing multiple agents working in parallel.

---

### Claude Code vs GitHub Copilot vs Cursor

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE (Anthropic)                   │
├─────────────────────────────────────────────────────────────┤
│  ✓ Reads/edits files directly from terminal                │
│  ✓ Executes commands (npm, git, docker, etc.)              │
│  ✓ Full project context (~200K tokens)                     │
│  ✓ Agent mode: solves complex tasks autonomously           │
│  ✓ Works with any editor (VS Code, Vim, etc.)              │
│  ✗ No inline autocomplete                                  │
│  ✗ Requires API key (pay per use)                          │
│                                                              │
│  💰 Cost: ~$3/M tokens, $20/mes pro, $100/mes max           │
│  🔗 https://docs.anthropic.com/en/docs/claude-code          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GITHUB COPILOT (Microsoft)                │
├─────────────────────────────────────────────────────────────┤
│  ✓ Instant autocomplete as you type                        │
│  ✓ Native integration in VS Code, JetBrains, Neovim        │
│  ✓ Copilot Chat for questions                              │
│  ✓ Copilot Workspace (beta): multi-file                    │
│  ✗ Doesn't execute commands                                │
│  ✗ Limited to open files context                           │
│  ✗ No autonomous agent mode                                │
│                                                              │
│  💰 Cost: $10/mo individual, $19/mo business               │
│  🔗 https://github.com/features/copilot                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       CURSOR                                 │
├─────────────────────────────────────────────────────────────┤
│  ✓ Full editor based on VS Code                            │
│  ✓ Autocomplete + Chat + Composer (multi-file)             │
│  ✓ Cmd+K to edit code inline                               │
│  ✓ Uses multiple models (GPT-4, Claude, etc.)              │
│  ✗ Another editor to learn                                 │
│  ✗ Monthly subscription required for Pro                   │
│  ✗ Less portable than a CLI                                │
│                                                              │
│  💰 Cost: Free limited, $20/mo Pro                         │
│  🔗 https://cursor.sh                                       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Google Antigravity and OpenAI Codex (2025 Releases)

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│            🆕 GOOGLE ANTIGRAVITY (Nov 2025)                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ "Agent-first" IDE (fork of VS Code/Windsurf)            │
│  ✓ Manager View: multiple agents in PARALLEL               │
│  ✓ 76.2% on SWE-bench (almost equals Claude 4.5)           │
│  ✓ Powered by Gemini 3 Pro/Flash/Deep Think                │
│  ✓ Also supports Claude and open source models             │
│  ✓ FREE during public preview                              │
│  ✗ Very new, ecosystem still developing                    │
│                                                              │
│  💰 Free (preview) | Pricing TBD                           │
│  🔗 https://antigravityai.org                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            🆕 OPENAI CODEX (Relaunched 2025)                 │
├─────────────────────────────────────────────────────────────┤
│  ✓ Codex CLI: open source local agent (April 2025)         │
│  ✓ Codex Cloud: autonomous cloud agent (May 2025)          │
│  ✓ Powered by codex-1 (o3 optimized for code)              │
│  ✓ GPT-5.2-Codex: latest model                             │
│  ✓ Executes tasks, creates PRs, resolves issues            │
│  ⚠️ codex-mini-latest deprecated Jan 16, 2026              │
│                                                              │
│  💰 CLI free + API | Cloud: API usage                      │
│  🔗 https://openai.com/index/introducing-codex              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Other Google and OpenAI Options

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                 GEMINI CODE ASSIST (Google)                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ Extension for VS Code and JetBrains                     │
│  ✓ 6000 free completions per month                         │
│  ✓ Google Cloud integration                                │
│  ✗ Less context than Claude/Cursor                         │
│  ✗ Enterprise focused, less for indie devs                 │
│                                                              │
│  💰 Free: 6000/mo | Enterprise: $19/user/mo                │
│  🔗 https://cloud.google.com/gemini/docs/codeassist         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GOOGLE IDX                                │
├─────────────────────────────────────────────────────────────┤
│  ✓ Full cloud IDE (VS Code-based)                          │
│  ✓ Gemini natively integrated                              │
│  ✓ Free during beta                                        │
│  ✓ Templates for Flutter, React, Angular, etc.             │
│  ✗ Requires internet always                                │
│  ✗ In beta, may change                                     │
│                                                              │
│  💰 Free (beta)                                             │
│  🔗 https://idx.dev                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    CHATGPT + Code (OpenAI)                   │
├─────────────────────────────────────────────────────────────┤
│  ✓ Code Interpreter: runs Python in sandbox                │
│  ✓ Uploaded file analysis                                  │
│  ✓ Canvas: visual code editing                             │
│  ✗ Doesn't edit your local files                           │
│  ✗ No official editor extension                            │
│  ✗ Context limited to conversation                         │
│                                                              │
│  💰 Free limited | Plus: $20/mo | Pro: $200/mo             │
│  🔗 https://chat.openai.com                                 │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Open Source: Aider, Continue, Cody

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                       AIDER                                  │
├─────────────────────────────────────────────────────────────┤
│  ✓ 100% Open Source (Apache 2.0)                           │
│  ✓ Uses ANY model (GPT, Claude, Ollama, etc.)              │
│  ✓ Git integrated: auto-commits changes                    │
│  ✓ Edits multiple files                                    │
│  ✓ Public benchmarks: SWE-bench leader                     │
│  ✗ Terminal only, learning curve                           │
│                                                              │
│  💰 Free + API cost for the model you use                  │
│  🔗 https://aider.chat                                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       CONTINUE                               │
├─────────────────────────────────────────────────────────────┤
│  ✓ Open Source extension for VS Code/JetBrains             │
│  ✓ Uses any model (local or API)                           │
│  ✓ Autocomplete + Chat                                     │
│  ✓ Fully customizable                                      │
│  ✗ Requires initial setup                                  │
│                                                              │
│  💰 Free + API cost                                         │
│  🔗 https://continue.dev                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       CODY (Sourcegraph)                     │
├─────────────────────────────────────────────────────────────┤
│  ✓ HUGE codebase context (millions of lines)               │
│  ✓ Uses Claude 3.5 Sonnet                                  │
│  ✓ Searches all your code, not just open files             │
│  ✓ Generous free plan (500 msgs/mo)                        │
│  ✗ Less autonomy than Claude Code                          │
│                                                              │
│  💰 Free: 500 msgs | Pro: $9/mo | Enterprise: custom       │
│  🔗 https://sourcegraph.com/cody                            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

### Which to Choose? Decision Guide

| Your situation | Recommendation | Why |
|----------------|----------------|-----|
| **Just starting to code** | GitHub Copilot Free | Autocomplete helps learn |
| **Maximum power** | Claude Code | Agent mode, runs commands |
| **Parallel multi-agent** | Google Antigravity | Manager View with 5+ agents |
| **OpenAI ecosystem** | Codex CLI + Cloud | Integrated with GPT-5.2 |
| **All in one editor** | Cursor | Best integrated UX |
| **Zero budget** | Continue + Ollama | 100% local and free |
| **Enterprise codebase** | Cody | Best code context |
| **Google ecosystem** | Antigravity or Gemini | Native Gemini 3 |
| **Maximum flexibility** | Aider | Any model, open source |

---

### Recommended Combinations

\`\`\`
COMBO 1: Maximum Productivity (Premium)
├── Cursor (main editor)
└── Claude Code (complex tasks from terminal)

COMBO 2: Cost/Benefit Balance
├── VS Code + GitHub Copilot (autocomplete)
└── Claude Code (when you need more power)

COMBO 3: 100% Free
├── VS Code + Continue (autocomplete with Ollama)
└── Aider (multi-file editing)

COMBO 4: Enterprise
├── VS Code + Cody (massive context)
└── Gemini Code Assist (Google Cloud integration)
\`\`\`

> 💡 **Tools complement each other**: You don't have to choose just one.

---

## Practice

→ [Introduction to Claude Code](/en/cooking/claude-code-intro) — Install and use Claude Code

---

## Useful Links

**CLIs:**
- 🤖 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) - Anthropic
- 🔧 [Aider](https://aider.chat) - Open Source
- ⚡ [OpenAI Codex CLI](https://openai.com/index/introducing-codex) - OpenAI

**Extensions:**
- 🐙 [GitHub Copilot](https://github.com/features/copilot) - Microsoft
- 🔍 [Cody](https://sourcegraph.com/cody) - Sourcegraph
- 🔓 [Continue](https://continue.dev) - Open Source

**AI Editors:**
- ⌨️ [Cursor](https://cursor.sh) - Cursor Inc
- 🌊 [Windsurf](https://codeium.com/windsurf) - Codeium
- 🚀 [Google Antigravity](https://antigravityai.org) - Google (New!)

**Google:**
- 💎 [Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist)
- 🌐 [Google IDX](https://idx.dev)

**OpenAI:**
- 💬 [ChatGPT](https://chat.openai.com)
- 🧠 [Codex Cloud](https://openai.com/index/introducing-codex)
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
  mobile: { es: 'React Native y Expo: desarrollo de apps móviles multiplataforma con JavaScript.', en: 'React Native and Expo: cross-platform mobile app development with JavaScript.' },
  iot: { es: 'IoT con Arduino y ESP32: sensores, actuadores y proyectos de electrónica.', en: 'IoT with Arduino and ESP32: sensors, actuators and electronics projects.' },
  'vector-db': { es: 'Bases de datos vectoriales: Qdrant, pgvector, Pinecone para búsqueda semántica.', en: 'Vector databases: Qdrant, pgvector, Pinecone for semantic search.' },
  rag: { es: 'RAG (Retrieval Augmented Generation): conecta LLMs con tus documentos y datos.', en: 'RAG (Retrieval Augmented Generation): connect LLMs with your documents and data.' },
  mcp: { es: 'MCP (Model Context Protocol): herramientas y extensiones para LLMs de Anthropic.', en: 'MCP (Model Context Protocol): tools and extensions for Anthropic LLMs.' },
  agents: { es: 'Agentes IA autónomos: LangChain, AutoGen, CrewAI. Crea agentes que ejecutan tareas.', en: 'Autonomous AI agents: LangChain, AutoGen, CrewAI. Create agents that execute tasks.' },
  vision: { es: 'Vision y Multimodal: procesamiento de imágenes y video con IA. OCR, clasificación, detección.', en: 'Vision and Multimodal: image and video processing with AI. OCR, classification, detection.' },
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
