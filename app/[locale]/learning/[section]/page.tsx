import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MarkdownContent from '@/components/MarkdownContent'

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

## Enlaces útiles

- 📖 [VS Code Docs](https://code.visualstudio.com/docs)
- 🎓 [VS Code Tips & Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
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

## Useful links

- 📖 [VS Code Docs](https://code.visualstudio.com/docs)
- 🎓 [VS Code Tips & Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
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
## Contenedores: Tu app empaquetada

Docker empaqueta tu aplicación con todo lo que necesita para funcionar. "Funciona en mi máquina" ya no es excusa.

---

## Conceptos clave

| Concepto | Qué es | Analogía |
|----------|--------|----------|
| **Imagen** | Receta/plantilla | Receta de cocina |
| **Contenedor** | Imagen ejecutándose | Platillo preparado |
| **Dockerfile** | Instrucciones para crear imagen | Pasos de la receta |
| **Docker Hub** | Repositorio de imágenes | Libro de recetas público |

---

## Instalación

| Sistema | Instalación |
|---------|-------------|
| **macOS** | \`brew install --cask docker\` |
| **Windows** | Docker Desktop desde docker.com |
| **Linux** | Ver docs.docker.com/engine/install |

Después de instalar, abre Docker Desktop y espera a que inicie.

---

## Tu primer contenedor

\`\`\`bash
# Ejecutar contenedor de prueba
docker run hello-world

# Si ves "Hello from Docker!" funcionó
\`\`\`

---

## Comandos esenciales

\`\`\`bash
# Ver contenedores corriendo
docker ps

# Ver todos los contenedores
docker ps -a

# Ver imágenes descargadas
docker images

# Ejecutar con shell interactivo
docker run -it ubuntu bash

# Parar contenedor
docker stop <container_id>

# Eliminar contenedor
docker rm <container_id>
\`\`\`

---

## Ejemplo práctico: Node.js

\`\`\`bash
# Correr Node.js 20
docker run -it node:20 node

# Ahora puedes escribir JavaScript
> console.log("Hola desde Docker!")
\`\`\`

---

## Tu primer Dockerfile

\`\`\`dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Construir imagen
docker build -t mi-app .

# Ejecutar
docker run -p 3000:3000 mi-app
\`\`\`

---

## Practica

→ [Docker Hello World](/es/cooking/docker-hello) — Tu primer contenedor

---

## Enlaces útiles

- 📖 [Docker Docs](https://docs.docker.com/)
- 🎓 [Docker Getting Started](https://docs.docker.com/get-started/)
    `,
    contentEn: `
## Containers: Your app packaged

Docker packages your application with everything it needs to run. "Works on my machine" is no longer an excuse.

---

## Key concepts

| Concept | What it is | Analogy |
|---------|------------|---------|
| **Image** | Recipe/template | Cooking recipe |
| **Container** | Image running | Prepared dish |
| **Dockerfile** | Instructions to create image | Recipe steps |
| **Docker Hub** | Image repository | Public cookbook |

---

## Installation

| System | Installation |
|--------|--------------|
| **macOS** | \`brew install --cask docker\` |
| **Windows** | Docker Desktop from docker.com |
| **Linux** | See docs.docker.com/engine/install |

After installing, open Docker Desktop and wait for it to start.

---

## Your first container

\`\`\`bash
# Run test container
docker run hello-world

# If you see "Hello from Docker!" it worked
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

## Practica

→ [API REST con Express](/es/cooking/api-rest-basic)

---

## Enlaces útiles

- 📖 [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- 📖 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
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

## Practice

→ [REST API with Express](/en/cooking/api-rest-basic)

---

## Useful links

- 📖 [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- 📖 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
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

## Practice

→ [Vector Search](/en/cooking/vector-search)

---

## Useful links

- 📖 [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- 📖 [Pinecone Docs](https://docs.pinecone.io/)
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
