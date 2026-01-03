import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MarkdownContent from '@/components/MarkdownContent'

// 52+ platillos organizados por nivel
// Prioridad: APIs cloud (Gemini, Claude, OpenAI) primero, modelos locales al final
const dishes = [
  // ===== APRENDIZ: Empezar con IA en la nube (gratis/fácil) =====
  { slug: 'chatbot-gemini', titleEs: 'Chatbot con Gemini API', titleEn: 'Chatbot with Gemini API', level: 'aprendiz', icon: '✨' },
  { slug: 'chatbot-claude', titleEs: 'Chatbot con Claude API', titleEn: 'Chatbot with Claude API', level: 'aprendiz', icon: '🟠' },
  { slug: 'chatbot-openai', titleEs: 'Chatbot con OpenAI API', titleEn: 'Chatbot with OpenAI API', level: 'aprendiz', icon: '🟢' },
  { slug: 'claude-code-intro', titleEs: 'Introducción a Claude Code', titleEn: 'Introduction to Claude Code', level: 'aprendiz', icon: '⌨️' },
  { slug: 'hello-terminal', titleEs: 'Hola Mundo en Terminal', titleEn: 'Hello World in Terminal', level: 'aprendiz', icon: '🖥️' },
  { slug: 'first-repo', titleEs: 'Mi Primer Repositorio', titleEn: 'My First Repository', level: 'aprendiz', icon: '📚' },
  { slug: 'dotfiles', titleEs: 'Mi Configuración Dotfiles', titleEn: 'My Dotfiles Setup', level: 'aprendiz', icon: '⚙️' },
  { slug: 'static-page', titleEs: 'Página Web Estática', titleEn: 'Static Web Page', level: 'aprendiz', icon: '🌐' },
  { slug: 'dev-environment', titleEs: 'Mi Ambiente de Desarrollo', titleEn: 'My Dev Environment', level: 'aprendiz', icon: '🛠️' },
  { slug: 'first-script', titleEs: 'Mi Primer Script Bash', titleEn: 'My First Bash Script', level: 'aprendiz', icon: '📜' },
  { slug: 'docker-hello', titleEs: 'Docker Hello World', titleEn: 'Docker Hello World', level: 'aprendiz', icon: '🐳' },
  { slug: 'json-api-fetch', titleEs: 'Consumir una API JSON', titleEn: 'Consume a JSON API', level: 'aprendiz', icon: '🔗' },
  { slug: 'markdown-notes', titleEs: 'Sistema de Notas Markdown', titleEn: 'Markdown Notes System', level: 'aprendiz', icon: '📝' },
  { slug: 'git-collaboration', titleEs: 'Colaborar con Git', titleEn: 'Collaborate with Git', level: 'aprendiz', icon: '🤝' },
  { slug: 'chatbot-local', titleEs: 'Chatbot Local con Ollama', titleEn: 'Local Chatbot with Ollama', level: 'aprendiz', icon: '🏠' },
  // ===== COCINERO: Web UI para chatbots + proyectos web =====
  { slug: 'chat-web-ui', titleEs: 'Chat IA con Interfaz Web', titleEn: 'AI Chat with Web UI', level: 'cocinero', icon: '💬' },
  { slug: 'react-todo', titleEs: 'Todo App con React', titleEn: 'Todo App with React', level: 'cocinero', icon: '✅' },
  { slug: 'api-rest-basic', titleEs: 'API REST con Express', titleEn: 'REST API with Express', level: 'cocinero', icon: '🔌' },
  { slug: 'python-cli', titleEs: 'CLI Tool con Python', titleEn: 'CLI Tool with Python', level: 'cocinero', icon: '🐍' },
  { slug: 'landing-page', titleEs: 'Landing Page Responsive', titleEn: 'Responsive Landing Page', level: 'cocinero', icon: '📱' },
  { slug: 'portfolio', titleEs: 'Portfolio Personal', titleEn: 'Personal Portfolio', level: 'cocinero', icon: '💼' },
  { slug: 'blog-static', titleEs: 'Blog Estático', titleEn: 'Static Blog', level: 'cocinero', icon: '📰' },
  { slug: 'form-validation', titleEs: 'Formulario con Validación', titleEn: 'Form with Validation', level: 'cocinero', icon: '📋' },
  { slug: 'weather-app', titleEs: 'App del Clima', titleEn: 'Weather App', level: 'cocinero', icon: '🌤️' },
  { slug: 'calculator', titleEs: 'Calculadora Web', titleEn: 'Web Calculator', level: 'cocinero', icon: '🔢' },
  { slug: 'quiz-game', titleEs: 'Quiz Interactivo', titleEn: 'Interactive Quiz', level: 'cocinero', icon: '🎮' },
  { slug: 'countdown-timer', titleEs: 'Timer con Notificaciones', titleEn: 'Timer with Notifications', level: 'cocinero', icon: '⏰' },
  { slug: 'image-gallery', titleEs: 'Galería de Imágenes', titleEn: 'Image Gallery', level: 'cocinero', icon: '🖼️' },
  { slug: 'api-fastapi', titleEs: 'API con FastAPI', titleEn: 'API with FastAPI', level: 'cocinero', icon: '⚡' },
  { slug: 'scraper-basic', titleEs: 'Web Scraper Básico', titleEn: 'Basic Web Scraper', level: 'cocinero', icon: '🕷️' },
  // ===== CHEF: Despliegue público con auth, HTTPS, memoria =====
  { slug: 'public-ai-chat', titleEs: 'Chat IA Público con Auth', titleEn: 'Public AI Chat with Auth', level: 'chef', icon: '🌐' },
  { slug: 'nextjs-blog', titleEs: 'Blog con Next.js + MDX', titleEn: 'Blog with Next.js + MDX', level: 'chef', icon: '▲' },
  { slug: 'auth-firebase', titleEs: 'Auth con Firebase Google', titleEn: 'Auth with Firebase Google', level: 'chef', icon: '🔐' },
  { slug: 'crud-postgres', titleEs: 'CRUD con PostgreSQL', titleEn: 'CRUD with PostgreSQL', level: 'chef', icon: '🐘' },
  { slug: 'realtime-chat', titleEs: 'Chat en Tiempo Real', titleEn: 'Real-time Chat', level: 'chef', icon: '💬' },
  { slug: 'file-upload', titleEs: 'Subida de Archivos S3', titleEn: 'S3 File Upload', level: 'chef', icon: '📤' },
  { slug: 'payment-stripe', titleEs: 'Pagos con Stripe', titleEn: 'Payments with Stripe', level: 'chef', icon: '💳' },
  { slug: 'email-notifications', titleEs: 'Emails Transaccionales', titleEn: 'Transactional Emails', level: 'chef', icon: '📧' },
  { slug: 'docker-deploy', titleEs: 'Deploy con Docker', titleEn: 'Deploy with Docker', level: 'chef', icon: '🚀' },
  { slug: 'github-actions', titleEs: 'CI/CD con GitHub Actions', titleEn: 'CI/CD with GitHub Actions', level: 'chef', icon: '⚙️' },
  { slug: 'api-testing', titleEs: 'Testing de APIs', titleEn: 'API Testing', level: 'chef', icon: '🧪' },
  { slug: 'mobile-expo', titleEs: 'App Móvil con Expo', titleEn: 'Mobile App with Expo', level: 'chef', icon: '📱' },
  { slug: 'push-notifications', titleEs: 'Push Notifications', titleEn: 'Push Notifications', level: 'chef', icon: '🔔' },
  { slug: 'webhook-receiver', titleEs: 'Receptor de Webhooks', titleEn: 'Webhook Receiver', level: 'chef', icon: '🪝' },
  { slug: 'redis-cache', titleEs: 'Cache con Redis', titleEn: 'Cache with Redis', level: 'chef', icon: '⚡' },
  { slug: 'arduino-sensor', titleEs: 'Arduino + MQTT', titleEn: 'Arduino + MQTT', level: 'chef', icon: '🔌' },
  { slug: 'dashboard-analytics', titleEs: 'Dashboard de Analytics', titleEn: 'Analytics Dashboard', level: 'chef', icon: '📊' },
  // ===== MASTER CHEF: IA avanzada y arquitectura =====
  { slug: 'rag-documents', titleEs: 'RAG con Documentos PDF', titleEn: 'RAG with PDF Documents', level: 'master', icon: '📚' },
  { slug: 'vector-search', titleEs: 'Búsqueda Vectorial', titleEn: 'Vector Search', level: 'master', icon: '🔍' },
  { slug: 'mcp-server', titleEs: 'Servidor MCP Custom', titleEn: 'Custom MCP Server', level: 'master', icon: '🔧' },
  { slug: 'ai-agent', titleEs: 'Agente IA Autónomo', titleEn: 'Autonomous AI Agent', level: 'master', icon: '🤖' },
  { slug: 'image-classifier', titleEs: 'Clasificador de Imágenes', titleEn: 'Image Classifier', level: 'master', icon: '👁️' },
  { slug: 'voice-assistant', titleEs: 'Asistente de Voz', titleEn: 'Voice Assistant', level: 'master', icon: '🎙️' },
  { slug: 'multimodal-app', titleEs: 'App Multimodal', titleEn: 'Multimodal App', level: 'master', icon: '🎨' },
  { slug: 'fine-tuning', titleEs: 'Fine-tuning de Modelo', titleEn: 'Model Fine-tuning', level: 'master', icon: '🎯' },
  { slug: 'ai-code-review', titleEs: 'Code Review con IA', titleEn: 'AI Code Review', level: 'master', icon: '👨‍💻' },
  { slug: 'full-saas', titleEs: 'SaaS Completo con IA', titleEn: 'Full SaaS with AI', level: 'master', icon: '🏆' },
]

const levelLabels = {
  aprendiz: { es: '🧑‍🎓 Aprendiz', en: '🧑‍🎓 Apprentice', color: 'bg-green-100 text-green-800' },
  cocinero: { es: '🧑‍🍳 Cocinero', en: '🧑‍🍳 Cook', color: 'bg-blue-100 text-blue-800' },
  chef: { es: '👨‍🍳 Chef', en: '👨‍🍳 Chef', color: 'bg-purple-100 text-purple-800' },
  master: { es: '👨‍🍳👑 Master Chef', en: '👨‍🍳👑 Master Chef', color: 'bg-amber-100 text-amber-800' },
}

// Contenido real (10% muestra)
const dishesContent: Record<string, {
  timeEs: string
  timeEn: string
  prerequisitesEs: string[]
  prerequisitesEn: string[]
  contentEs: string
  contentEn: string
}> = {
  'chatbot-gemini': {
    timeEs: '10 minutos',
    timeEn: '10 minutes',
    prerequisitesEs: ['Cuenta de Google (Gmail)'],
    prerequisitesEn: ['Google account (Gmail)'],
    contentEs: `
## Tu primer chatbot con IA

Vas a crear un chatbot que corre en tu computadora.

Lo interesante: **no vas a escribir el código**. Se lo vas a pedir a una IA.

---

## Paso 1: Abre Google AI Studio

Ve a [aistudio.google.com](https://aistudio.google.com) e inicia sesión con tu cuenta de Google.

Esto es un chat con Gemini, la IA de Google. Gratis.

---

## Paso 2: Pídele que escriba el código

Copia y pega este prompt:

\`\`\`
Necesito un chatbot simple en Node.js que:
- Use la API de Gemini
- Funcione en la terminal
- Mantenga el historial de la conversación
- La API key la leo de la variable de entorno GEMINI_API_KEY

Dame el código completo y los comandos para instalarlo.
\`\`\`

**Dale Enter y espera.**

Gemini va a escribir todo el código por ti. También te dirá qué comandos ejecutar.

---

## Paso 3: Obtén tu API Key

1. Abre [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click en **"Create API Key"**
3. Copia la key

---

## Paso 4: Configura la key en tu sistema

| Sistema | Comando |
|---------|---------|
| **macOS/Linux** | \`export GEMINI_API_KEY="tu-key-aqui"\` |
| **Windows PowerShell** | \`$env:GEMINI_API_KEY="tu-key-aqui"\` |

> Ejecuta esto en la misma terminal donde vas a correr el chatbot.

---

## Paso 5: Sigue las instrucciones de Gemini

Gemini te dio:
1. **Comandos** para crear el proyecto (mkdir, npm install, etc.)
2. **Código** para pegar en un archivo
3. **El nombre del archivo** (algo como \`chatbot.js\` o \`index.mjs\`)
4. **El comando para ejecutarlo** (algo como \`node chatbot.js\`)

**Sigue sus instrucciones paso a paso.**

> 💡 **¿Cómo creo un archivo?** Abre tu editor de código (VS Code, Cursor, etc.), crea un nuevo archivo, pega el código, y guárdalo con el nombre que Gemini indicó.

---

## ¿Funcionó?

Si ves algo como esto, lo lograste:

\`\`\`
Tú: Hola
Gemini: ¡Hola! ¿En qué puedo ayudarte?
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`API key not valid\` | Key mal copiada o expirada | Verifica en [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| \`Cannot find module\` | Falta la dependencia | Ejecuta \`npm install @google/genai\` |
| \`node: command not found\` | Node.js no instalado | Instala desde [nodejs.org](https://nodejs.org) |
| \`npm: command not found\` | npm no está en PATH | Reinstala Node.js o reinicia la terminal |
| \`GEMINI_API_KEY\` undefined | Variable no configurada | Ejecuta el export en la **misma** terminal |
| \`SyntaxError\` | Código mal copiado | Copia todo el código de nuevo, sin cortar |
| \`429 Too Many Requests\` | Límite de API alcanzado | Espera 1 minuto o usa otro proyecto |
| Gemini da código en Python | No especificaste Node.js | Pide de nuevo: "en Node.js, no Python" |

> 💡 **Tip importante**: Si cerraste la terminal, debes ejecutar el \`export\` de nuevo. La variable solo existe en esa sesión.

---

## ¿Qué acaba de pasar?

1. Le pediste a una IA que escriba código
2. La IA lo escribió
3. Tú lo ejecutaste
4. Funciona

Podrías haberle pedido lo mismo a ChatGPT, Claude, o cualquier otro chat de IA. El resultado sería similar.

---

## Experimenta

Vuelve a Google AI Studio y prueba variaciones:

- *"...que responda como pirata"*
- *"...que me ayude a practicar inglés"*
- *"...que sea un tutor de matemáticas"*

El código cambia. El proceso es el mismo.

---

## Próximo paso

→ [Chatbot con Claude](/es/cooking/chatbot-claude) — Mismo proceso, diferente IA

---

## ¿Quieres entender más?

Si te interesa saber qué es una API, qué es un LLM, o cómo funciona esto por dentro:

→ [¿Qué es un LLM?](/es/learning/llms-intro)
→ [Terminal básico](/es/learning/terminal)
    `,
    contentEn: `
## Your first AI chatbot

You're going to create a chatbot that runs on your computer.

The interesting part: **you won't write the code**. You'll ask an AI to do it.

---

## Step 1: Open Google AI Studio

Go to [aistudio.google.com](https://aistudio.google.com) and sign in with your Google account.

This is a chat with Gemini, Google's AI. Free.

---

## Step 2: Ask it to write the code

Copy and paste this prompt:

\`\`\`
I need a simple Node.js chatbot that:
- Uses the Gemini API
- Works in the terminal
- Maintains conversation history
- Reads the API key from the GEMINI_API_KEY environment variable

Give me the complete code and installation commands.
\`\`\`

**Press Enter and wait.**

Gemini will write all the code for you. It will also tell you what commands to run.

---

## Step 3: Get your API Key

1. Open [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click **"Create API Key"**
3. Copy the key

---

## Step 4: Configure the key in your system

| System | Command |
|--------|---------|
| **macOS/Linux** | \`export GEMINI_API_KEY="your-key-here"\` |
| **Windows PowerShell** | \`$env:GEMINI_API_KEY="your-key-here"\` |

> Run this in the same terminal where you'll run the chatbot.

---

## Step 5: Follow Gemini's instructions

Gemini gave you:
1. **Commands** to create the project (mkdir, npm install, etc.)
2. **Code** to paste into a file
3. **The filename** (something like \`chatbot.js\` or \`index.mjs\`)
4. **The command to run it** (something like \`node chatbot.js\`)

**Follow its instructions step by step.**

> 💡 **How do I create a file?** Open your code editor (VS Code, Cursor, etc.), create a new file, paste the code, and save it with the name Gemini indicated.

---

## Did it work?

If you see something like this, you made it:

\`\`\`
You: Hello
Gemini: Hi! How can I help you?
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`API key not valid\` | Key copied wrong or expired | Check at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| \`Cannot find module\` | Missing dependency | Run \`npm install @google/genai\` |
| \`node: command not found\` | Node.js not installed | Install from [nodejs.org](https://nodejs.org) |
| \`npm: command not found\` | npm not in PATH | Reinstall Node.js or restart terminal |
| \`GEMINI_API_KEY\` undefined | Variable not set | Run export in the **same** terminal |
| \`SyntaxError\` | Code copied incorrectly | Copy all the code again, don't cut |
| \`429 Too Many Requests\` | API limit reached | Wait 1 minute or use another project |
| Gemini gives Python code | Didn't specify Node.js | Ask again: "in Node.js, not Python" |

> 💡 **Important tip**: If you closed the terminal, you need to run the \`export\` again. The variable only exists in that session.

---

## What just happened?

1. You asked an AI to write code
2. The AI wrote it
3. You ran it
4. It works

You could have asked the same thing to ChatGPT, Claude, or any other AI chat. The result would be similar.

---

## Experiment

Go back to Google AI Studio and try variations:

- *"...that responds like a pirate"*
- *"...that helps me practice Spanish"*
- *"...that's a math tutor"*

The code changes. The process is the same.

---

## Next step

→ [Chatbot with Claude](/en/cooking/chatbot-claude) — Same process, different AI

---

## Want to understand more?

If you're interested in learning what an API is, what an LLM is, or how this works under the hood:

→ [What is an LLM?](/en/learning/llms-intro)
→ [Terminal basics](/en/learning/terminal)
    `,
  },
  'chatbot-claude': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Chatbot con Gemini completado', 'Tarjeta de crédito (para API)'],
    prerequisitesEn: ['Chatbot with Gemini completed', 'Credit card (for API)'],
    contentEs: `
## Mismo proceso, diferente IA

Ya sabes cómo funciona: le pides a una IA que escriba el código.

Esta vez usaremos la API de Claude, de Anthropic.

> ⚠️ **Nota**: Claude API requiere agregar una tarjeta de crédito. Hay $5 USD de crédito gratis para empezar.

---

## Paso 1: Obtén tu API Key de Anthropic

1. Ve a [console.anthropic.com](https://console.anthropic.com)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** → **Create Key**
4. Copia la key

---

## Paso 2: Pídele a una IA que escriba el código

Abre [Google AI Studio](https://aistudio.google.com), ChatGPT, o cualquier chat de IA.

Copia y pega este prompt:

\`\`\`
Necesito un chatbot simple en Node.js que:
- Use la API de Claude (Anthropic)
- Funcione en la terminal
- Mantenga el historial de la conversación
- La API key la leo de la variable de entorno ANTHROPIC_API_KEY

Dame el código completo y los comandos para instalarlo.
\`\`\`

**La IA escribirá todo el código por ti.**

---

## Paso 3: Configura la key en tu sistema

| Sistema | Comando |
|---------|---------|
| **macOS/Linux** | \`export ANTHROPIC_API_KEY="tu-key-aqui"\` |
| **Windows PowerShell** | \`$env:ANTHROPIC_API_KEY="tu-key-aqui"\` |

---

## Paso 4: Sigue las instrucciones

La IA te dio:
1. Comandos para crear el proyecto
2. Código para el archivo
3. El comando para ejecutarlo

**Sigue sus instrucciones paso a paso.**

---

## ¿Funcionó?

\`\`\`
Tú: Hola Claude
Claude: ¡Hola! ¿En qué puedo ayudarte hoy?
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`authentication_error\` | API key inválida | Verifica en [console.anthropic.com](https://console.anthropic.com) |
| \`insufficient_quota\` | Sin créditos | Agrega método de pago en la consola |
| \`Cannot find module\` | Falta SDK | Ejecuta \`npm install @anthropic-ai/sdk\` |
| \`rate_limit_error\` | Muchas peticiones | Espera unos segundos |

---

## ¿Qué aprendiste?

El proceso es **idéntico** al de Gemini:
1. Pides código a una IA
2. Configuras la API key
3. Ejecutas

La única diferencia es la API que usas. El flujo de trabajo es el mismo.

---

## Próximo paso

→ [Chatbot con OpenAI](/es/cooking/chatbot-openai) — Completa el trío

---

## ¿Quieres entender más?

→ [¿Qué es un LLM?](/es/learning/llms-intro)
    `,
    contentEn: `
## Same process, different AI

You already know how it works: you ask an AI to write the code.

This time we'll use Claude's API, from Anthropic.

> ⚠️ **Note**: Claude API requires adding a credit card. There's $5 USD free credit to start.

---

## Step 1: Get your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Go to **API Keys** → **Create Key**
4. Copy the key

---

## Step 2: Ask an AI to write the code

Open [Google AI Studio](https://aistudio.google.com), ChatGPT, or any AI chat.

Copy and paste this prompt:

\`\`\`
I need a simple Node.js chatbot that:
- Uses the Claude API (Anthropic)
- Works in the terminal
- Maintains conversation history
- Reads the API key from the ANTHROPIC_API_KEY environment variable

Give me the complete code and installation commands.
\`\`\`

**The AI will write all the code for you.**

---

## Step 3: Configure the key in your system

| System | Command |
|--------|---------|
| **macOS/Linux** | \`export ANTHROPIC_API_KEY="your-key-here"\` |
| **Windows PowerShell** | \`$env:ANTHROPIC_API_KEY="your-key-here"\` |

---

## Step 4: Follow the instructions

The AI gave you:
1. Commands to create the project
2. Code for the file
3. The command to run it

**Follow its instructions step by step.**

---

## Did it work?

\`\`\`
You: Hello Claude
Claude: Hello! How can I help you today?
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`authentication_error\` | Invalid API key | Check at [console.anthropic.com](https://console.anthropic.com) |
| \`insufficient_quota\` | No credits | Add payment method in console |
| \`Cannot find module\` | Missing SDK | Run \`npm install @anthropic-ai/sdk\` |
| \`rate_limit_error\` | Too many requests | Wait a few seconds |

---

## What did you learn?

The process is **identical** to Gemini:
1. You ask an AI for code
2. You configure the API key
3. You run it

The only difference is the API you use. The workflow is the same.

---

## Next step

→ [Chatbot with OpenAI](/en/cooking/chatbot-openai) — Complete the trio

---

## Want to understand more?

→ [What is an LLM?](/en/learning/llms-intro)
    `,
  },
  'chatbot-openai': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Chatbot con Gemini completado', 'Tarjeta de crédito (para API)'],
    prerequisitesEn: ['Chatbot with Gemini completed', 'Credit card (for API)'],
    contentEs: `
## El trío completo

Ya usaste Gemini y Claude. Ahora toca OpenAI, los creadores de ChatGPT.

El proceso es el mismo. Solo cambia la API.

> ⚠️ **Nota**: OpenAI API requiere agregar créditos. Mínimo $5 USD.

---

## Paso 1: Obtén tu API Key de OpenAI

1. Ve a [platform.openai.com](https://platform.openai.com)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** (menú izquierdo)
4. Click en **Create new secret key**
5. Copia la key (solo se muestra una vez)

---

## Paso 2: Agrega créditos

1. Ve a **Settings** → **Billing**
2. Agrega un método de pago
3. Agrega créditos (mínimo $5)

> 💡 $5 USD te alcanzan para miles de mensajes con GPT-4o-mini.

---

## Paso 3: Pídele a una IA que escriba el código

Abre [Google AI Studio](https://aistudio.google.com), ChatGPT, o cualquier chat de IA.

Copia y pega este prompt:

\`\`\`
Necesito un chatbot simple en Node.js que:
- Use la API de OpenAI (GPT-4o-mini)
- Funcione en la terminal
- Mantenga el historial de la conversación
- La API key la leo de la variable de entorno OPENAI_API_KEY

Dame el código completo y los comandos para instalarlo.
\`\`\`

---

## Paso 4: Configura la key en tu sistema

| Sistema | Comando |
|---------|---------|
| **macOS/Linux** | \`export OPENAI_API_KEY="tu-key-aqui"\` |
| **Windows PowerShell** | \`$env:OPENAI_API_KEY="tu-key-aqui"\` |

---

## Paso 5: Sigue las instrucciones

La IA te dio:
1. Comandos para crear el proyecto
2. Código para el archivo
3. El comando para ejecutarlo

**Sigue sus instrucciones paso a paso.**

---

## ¿Funcionó?

\`\`\`
Tú: Hola GPT
GPT: ¡Hola! ¿En qué puedo ayudarte?
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`invalid_api_key\` | Key incorrecta | Verifica en [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| \`insufficient_quota\` | Sin créditos | Agrega créditos en Billing |
| \`Cannot find module\` | Falta SDK | Ejecuta \`npm install openai\` |
| \`rate_limit_exceeded\` | Muchas peticiones | Espera unos segundos |
| \`model_not_found\` | Modelo incorrecto | Usa \`gpt-4o-mini\` o \`gpt-4o\` |

---

## Comparación: ¿Cuál usar?

| API | Costo | Fortaleza | Mejor para |
|-----|-------|-----------|------------|
| **Gemini** | Gratis | Fácil empezar | Aprender, prototipos |
| **Claude** | ~$3/M tokens | Código, razonamiento | Desarrollo serio |
| **OpenAI** | ~$0.15/M tokens | Versátil, ecosistema | Producción, plugins |

> 💡 Para aprender, usa Gemini. Para proyectos serios, prueba los tres y elige.

---

## ¿Qué sigue?

Has completado el trío de APIs cloud. Ahora puedes:

→ [Chatbot Local con Ollama](/es/cooking/chatbot-local) — 100% privado, sin internet
→ [Chat con Interfaz Web](/es/cooking/chat-web-ui) — Dale una cara bonita

---

## ¿Quieres entender más?

→ [¿Qué es un LLM?](/es/learning/llms-intro)
    `,
    contentEn: `
## The complete trio

You already used Gemini and Claude. Now it's OpenAI's turn, the creators of ChatGPT.

The process is the same. Only the API changes.

> ⚠️ **Note**: OpenAI API requires adding credits. Minimum $5 USD.

---

## Step 1: Get your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Go to **API Keys** (left menu)
4. Click **Create new secret key**
5. Copy the key (only shown once)

---

## Step 2: Add credits

1. Go to **Settings** → **Billing**
2. Add a payment method
3. Add credits (minimum $5)

> 💡 $5 USD is enough for thousands of messages with GPT-4o-mini.

---

## Step 3: Ask an AI to write the code

Open [Google AI Studio](https://aistudio.google.com), ChatGPT, or any AI chat.

Copy and paste this prompt:

\`\`\`
I need a simple Node.js chatbot that:
- Uses the OpenAI API (GPT-4o-mini)
- Works in the terminal
- Maintains conversation history
- Reads the API key from the OPENAI_API_KEY environment variable

Give me the complete code and installation commands.
\`\`\`

---

## Step 4: Configure the key in your system

| System | Command |
|--------|---------|
| **macOS/Linux** | \`export OPENAI_API_KEY="your-key-here"\` |
| **Windows PowerShell** | \`$env:OPENAI_API_KEY="your-key-here"\` |

---

## Step 5: Follow the instructions

The AI gave you:
1. Commands to create the project
2. Code for the file
3. The command to run it

**Follow its instructions step by step.**

---

## Did it work?

\`\`\`
You: Hello GPT
GPT: Hello! How can I help you?
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`invalid_api_key\` | Wrong key | Check at [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| \`insufficient_quota\` | No credits | Add credits in Billing |
| \`Cannot find module\` | Missing SDK | Run \`npm install openai\` |
| \`rate_limit_exceeded\` | Too many requests | Wait a few seconds |
| \`model_not_found\` | Wrong model | Use \`gpt-4o-mini\` or \`gpt-4o\` |

---

## Comparison: Which one to use?

| API | Cost | Strength | Best for |
|-----|------|----------|----------|
| **Gemini** | Free | Easy to start | Learning, prototypes |
| **Claude** | ~$3/M tokens | Code, reasoning | Serious development |
| **OpenAI** | ~$0.15/M tokens | Versatile, ecosystem | Production, plugins |

> 💡 For learning, use Gemini. For serious projects, try all three and choose.

---

## What's next?

You've completed the cloud API trio. Now you can:

→ [Local Chatbot with Ollama](/en/cooking/chatbot-local) — 100% private, no internet
→ [Chat with Web UI](/en/cooking/chat-web-ui) — Give it a nice face

---

## Want to understand more?

→ [What is an LLM?](/en/learning/llms-intro)
    `,
  },
  'chatbot-local': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Trío de APIs completado (opcional)', '8GB RAM mínimo'],
    prerequisitesEn: ['API trio completed (optional)', '8GB RAM minimum'],
    contentEs: `
## IA sin internet, sin costos, 100% privada

Ya probaste APIs en la nube. Ahora corre un modelo en tu propia computadora.

**Diferencia clave**: No necesitas API key. El modelo corre local.

---

## ¿Por qué un modelo local?

| Cloud (Gemini, Claude, OpenAI) | Local (Ollama) |
|-------------------------------|----------------|
| Requiere internet | Funciona offline |
| Tus datos van a sus servidores | Tus datos quedan en tu máquina |
| Pago por uso | Gratis (después de descargar) |
| Modelos más potentes | Modelos más pequeños |

> 💡 **Ideal para**: datos sensibles, sin internet, o simplemente aprender cómo funcionan los LLMs por dentro.

---

## Paso 1: Instalar Ollama

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install ollama\` |
| **Linux** | \`curl -fsSL https://ollama.ai/install.sh \\| sh\` |
| **Windows** | Descarga desde [ollama.com/download](https://ollama.com/download) |

Verifica la instalación:

\`\`\`bash
ollama --version
\`\`\`

---

## Paso 2: Descargar un modelo

\`\`\`bash
ollama pull llama3.2
\`\`\`

> ⏳ La primera vez descarga ~2GB. Después es instantáneo.

---

## Paso 3: ¡Chatear!

\`\`\`bash
ollama run llama3.2
\`\`\`

Escribe tu mensaje y presiona Enter. Para salir: \`/bye\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`command not found: ollama\` | No instalado | Reinstala Ollama |
| \`model not found\` | No descargado | Ejecuta \`ollama pull llama3.2\` |
| Muy lento | Poca RAM | Usa modelo más pequeño: \`llama3.2:1b\` |
| Se congela | RAM insuficiente | Cierra otras apps, necesitas 8GB libres |

---

## Bonus: Chatbot programático

¿Quieres usar Ollama desde código (como hiciste con las APIs)?

Pídele a cualquier IA:

\`\`\`
Necesito un chatbot en Node.js que:
- Use Ollama localmente (no API key)
- Funcione en terminal
- Mantenga historial de conversación

Dame el código y comandos.
\`\`\`

Ollama tiene una API REST local en \`http://localhost:11434\`.

---

## ¿Qué aprendiste?

| API Cloud | Modelo Local |
|-----------|--------------|
| API key requerida | Sin API key |
| Internet requerido | Funciona offline |
| Servidor remoto | Tu computadora |

El código es casi igual. Solo cambia el endpoint.

---

## Próximo paso

→ [Chat con Interfaz Web](/es/cooking/chat-web-ui) — Dale una cara bonita a tu chatbot
    `,
    contentEn: `
## AI without internet, without costs, 100% private

You already tried cloud APIs. Now run a model on your own computer.

**Key difference**: No API key needed. The model runs locally.

---

## Why a local model?

| Cloud (Gemini, Claude, OpenAI) | Local (Ollama) |
|-------------------------------|----------------|
| Requires internet | Works offline |
| Your data goes to their servers | Your data stays on your machine |
| Pay per use | Free (after download) |
| More powerful models | Smaller models |

> 💡 **Ideal for**: sensitive data, no internet, or just learning how LLMs work under the hood.

---

## Step 1: Install Ollama

| System | Command |
|--------|---------|
| **macOS** | \`brew install ollama\` |
| **Linux** | \`curl -fsSL https://ollama.ai/install.sh \\| sh\` |
| **Windows** | Download from [ollama.com/download](https://ollama.com/download) |

Verify installation:

\`\`\`bash
ollama --version
\`\`\`

---

## Step 2: Download a model

\`\`\`bash
ollama pull llama3.2
\`\`\`

> ⏳ First time downloads ~2GB. After that it's instant.

---

## Step 3: Chat!

\`\`\`bash
ollama run llama3.2
\`\`\`

Type your message and press Enter. To exit: \`/bye\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`command not found: ollama\` | Not installed | Reinstall Ollama |
| \`model not found\` | Not downloaded | Run \`ollama pull llama3.2\` |
| Very slow | Low RAM | Use smaller model: \`llama3.2:1b\` |
| Freezes | Insufficient RAM | Close other apps, need 8GB free |

---

## Bonus: Programmatic chatbot

Want to use Ollama from code (like you did with APIs)?

Ask any AI:

\`\`\`
I need a Node.js chatbot that:
- Uses Ollama locally (no API key)
- Works in terminal
- Maintains conversation history

Give me the code and commands.
\`\`\`

Ollama has a local REST API at \`http://localhost:11434\`.

---

## What did you learn?

| Cloud API | Local Model |
|-----------|-------------|
| API key required | No API key |
| Internet required | Works offline |
| Remote server | Your computer |

The code is almost the same. Only the endpoint changes.

---

## Next step

→ [Chat with Web UI](/en/cooking/chat-web-ui) — Give your chatbot a nice face
    `,
  },
  'chat-web-ui': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Al menos un chatbot de terminal completado', 'Node.js instalado'],
    prerequisitesEn: ['At least one terminal chatbot completed', 'Node.js installed'],
    contentEs: `
## De la terminal al navegador

Ya tienes un chatbot que funciona en terminal. Ahora le darás una interfaz web bonita.

**El enfoque**: Le pedirás a una IA que genere una app React/Next.js completa.

---

## ¿Por qué una interfaz web?

| Terminal | Web UI |
|----------|--------|
| Solo tú puedes usarlo | Cualquiera con el link |
| Texto plano | Diseño bonito, markdown |
| Una conversación | Múltiples chats |
| Copiar/pegar difícil | Click para copiar |

---

## Paso 1: Elige tu API

Usa la misma API de tu chatbot anterior:

| API | Variable de entorno |
|-----|---------------------|
| Gemini | \`GEMINI_API_KEY\` |
| Claude | \`ANTHROPIC_API_KEY\` |
| OpenAI | \`OPENAI_API_KEY\` |
| Ollama | (ninguna, corre local) |

---

## Paso 2: Pídele a una IA que genere la app

Abre [Google AI Studio](https://aistudio.google.com), ChatGPT, o Claude.

Copia y pega este prompt (cambia la API según tu elección):

\`\`\`
Necesito una aplicación de chat con IA usando Next.js y React que:

- Use la API de Gemini (variable GEMINI_API_KEY)
- Tenga una interfaz moderna con Tailwind CSS
- Muestre el historial de mensajes en burbujas
- Tenga un input fijo en la parte inferior
- Muestre un indicador de "escribiendo..." mientras espera
- Renderice markdown en las respuestas
- Sea responsive (funcione en móvil)

Dame:
1. Los comandos para crear el proyecto
2. El código de cada archivo
3. Cómo ejecutarlo
\`\`\`

> 💡 **Tip**: Si prefieres otra API, cambia "Gemini" por "Claude", "OpenAI", u "Ollama".

---

## Paso 3: Sigue las instrucciones

La IA te dará algo como:

\`\`\`bash
npx create-next-app@latest my-chat --typescript --tailwind
cd my-chat
npm install @google/generative-ai react-markdown
\`\`\`

Luego te dará el código para varios archivos. Créalos en tu editor.

---

## Paso 4: Configura tu API key

\`\`\`bash
# macOS/Linux
export GEMINI_API_KEY="tu-key-aqui"

# Windows PowerShell
$env:GEMINI_API_KEY="tu-key-aqui"
\`\`\`

---

## Paso 5: Ejecuta la app

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000)

---

## ¿Funcionó?

Deberías ver algo así:

- Input para escribir mensajes
- Burbujas de chat (tú vs IA)
- Respuestas con formato markdown

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`Module not found\` | Falta dependencia | Ejecuta \`npm install\` de nuevo |
| \`API key not valid\` | Key mal configurada | Verifica el export en la misma terminal |
| Pantalla en blanco | Error de React | Revisa la consola del navegador (F12) |
| \`CORS error\` | Llamada desde frontend | La API debe estar en una ruta API de Next.js |
| No renderiza markdown | Falta react-markdown | \`npm install react-markdown\` |
| Styles no funcionan | Tailwind mal configurado | Verifica \`tailwind.config.js\` |

---

## Mejoras opcionales

Vuelve a pedirle a la IA:

- *"Agrega un botón para copiar las respuestas"*
- *"Agrega modo oscuro"*
- *"Guarda el historial en localStorage"*
- *"Agrega un selector de modelo"*

Cada mejora es un prompt nuevo. La IA actualiza el código.

---

## Arquitectura básica

\`\`\`
my-chat/
├── app/
│   ├── page.tsx        # UI del chat
│   └── api/
│       └── chat/
│           └── route.ts # Endpoint que habla con la IA
├── components/
│   └── ChatMessage.tsx  # Componente de burbuja
└── package.json
\`\`\`

> 💡 **Importante**: Las llamadas a la API deben hacerse desde el servidor (route.ts), no desde el cliente. Así proteges tu API key.

---

## ¿Qué aprendiste?

| Antes (Terminal) | Ahora (Web) |
|------------------|-------------|
| \`readline\` de Node | Componentes React |
| \`console.log\` | Renderizado de UI |
| Proceso local | Servidor web |

El flujo sigue siendo:
1. Usuario escribe
2. App envía a la API
3. API responde
4. App muestra la respuesta

---

## Próximo paso

→ [Chat IA Público con Auth](/es/cooking/public-ai-chat) — Ponlo en internet con login

---

## ¿Quieres entender más?

→ [¿Qué es un LLM?](/es/learning/llms-intro)
→ [Terminal básico](/es/learning/terminal)
    `,
    contentEn: `
## From terminal to browser

You already have a chatbot that works in terminal. Now you'll give it a nice web interface.

**The approach**: You'll ask an AI to generate a complete React/Next.js app.

---

## Why a web interface?

| Terminal | Web UI |
|----------|--------|
| Only you can use it | Anyone with the link |
| Plain text | Nice design, markdown |
| One conversation | Multiple chats |
| Copy/paste is hard | Click to copy |

---

## Step 1: Choose your API

Use the same API from your previous chatbot:

| API | Environment variable |
|-----|---------------------|
| Gemini | \`GEMINI_API_KEY\` |
| Claude | \`ANTHROPIC_API_KEY\` |
| OpenAI | \`OPENAI_API_KEY\` |
| Ollama | (none, runs local) |

---

## Step 2: Ask an AI to generate the app

Open [Google AI Studio](https://aistudio.google.com), ChatGPT, or Claude.

Copy and paste this prompt (change the API to your choice):

\`\`\`
I need an AI chat application using Next.js and React that:

- Uses the Gemini API (GEMINI_API_KEY variable)
- Has a modern interface with Tailwind CSS
- Shows message history in bubbles
- Has a fixed input at the bottom
- Shows a "typing..." indicator while waiting
- Renders markdown in responses
- Is responsive (works on mobile)

Give me:
1. Commands to create the project
2. Code for each file
3. How to run it
\`\`\`

> 💡 **Tip**: If you prefer another API, change "Gemini" to "Claude", "OpenAI", or "Ollama".

---

## Step 3: Follow the instructions

The AI will give you something like:

\`\`\`bash
npx create-next-app@latest my-chat --typescript --tailwind
cd my-chat
npm install @google/generative-ai react-markdown
\`\`\`

Then it will give you code for several files. Create them in your editor.

---

## Step 4: Configure your API key

\`\`\`bash
# macOS/Linux
export GEMINI_API_KEY="your-key-here"

# Windows PowerShell
$env:GEMINI_API_KEY="your-key-here"
\`\`\`

---

## Step 5: Run the app

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

---

## Did it work?

You should see something like:

- Input to write messages
- Chat bubbles (you vs AI)
- Responses with markdown formatting

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`Module not found\` | Missing dependency | Run \`npm install\` again |
| \`API key not valid\` | Key misconfigured | Check the export in same terminal |
| Blank screen | React error | Check browser console (F12) |
| \`CORS error\` | Calling from frontend | API must be in a Next.js API route |
| Markdown not rendering | Missing react-markdown | \`npm install react-markdown\` |
| Styles not working | Tailwind misconfigured | Check \`tailwind.config.js\` |

---

## Optional improvements

Ask the AI again:

- *"Add a button to copy responses"*
- *"Add dark mode"*
- *"Save history to localStorage"*
- *"Add a model selector"*

Each improvement is a new prompt. The AI updates the code.

---

## Basic architecture

\`\`\`
my-chat/
├── app/
│   ├── page.tsx        # Chat UI
│   └── api/
│       └── chat/
│           └── route.ts # Endpoint that talks to the AI
├── components/
│   └── ChatMessage.tsx  # Bubble component
└── package.json
\`\`\`

> 💡 **Important**: API calls should be made from the server (route.ts), not from the client. This protects your API key.

---

## What did you learn?

| Before (Terminal) | Now (Web) |
|-------------------|-----------|
| Node's \`readline\` | React components |
| \`console.log\` | UI rendering |
| Local process | Web server |

The flow is still:
1. User types
2. App sends to API
3. API responds
4. App shows response

---

## Next step

→ [Public AI Chat with Auth](/en/cooking/public-ai-chat) — Put it on the internet with login

---

## Want to understand more?

→ [What is an LLM?](/en/learning/llms-intro)
→ [Terminal basics](/en/learning/terminal)
    `,
  },
  'claude-code-intro': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Terminal básica', 'Node.js instalado'],
    prerequisitesEn: ['Basic terminal', 'Node.js installed'],
    contentEs: `
## Claude en tu terminal

Claude Code es una herramienta de línea de comandos que te permite hablar con Claude directamente desde tu terminal.

**¿Por qué usarlo?**
- Claude puede **leer y editar tus archivos**
- Puede **ejecutar comandos** por ti
- Entiende el **contexto de tu proyecto**

---

## Paso 1: Instalar Claude Code

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Verifica la instalación:

\`\`\`bash
claude --version
\`\`\`

---

## Paso 2: Configurar tu API Key

| Sistema | Comando |
|---------|---------|
| **macOS/Linux** | \`export ANTHROPIC_API_KEY="tu-key-aqui"\` |
| **Windows PowerShell** | \`$env:ANTHROPIC_API_KEY="tu-key-aqui"\` |

> 💡 Para hacerlo permanente, agrégalo a tu \`.bashrc\` o \`.zshrc\`

---

## Paso 3: Iniciar Claude Code

Navega a tu proyecto y ejecuta:

\`\`\`bash
cd mi-proyecto
claude
\`\`\`

Claude ahora puede ver tus archivos y ayudarte.

---

## ¿Qué puede hacer?

| Pide esto | Claude hace |
|-----------|-------------|
| "Explica este archivo" | Lee y explica el código |
| "Corrige el bug en app.js" | Edita el archivo |
| "Crea un test para esta función" | Crea nuevo archivo |
| "Ejecuta los tests" | Corre \`npm test\` |
| "Instala express" | Corre \`npm install express\` |

---

## Ejemplo práctico

\`\`\`
$ claude
> ¿Qué hace el archivo index.js?

Claude lee el archivo y te explica...

> Agrega un endpoint GET /health que retorne { status: 'ok' }

Claude edita index.js y agrega el endpoint...

> Pruébalo

Claude ejecuta curl localhost:3000/health...
\`\`\`

---

## Comandos útiles dentro de Claude

| Comando | Acción |
|---------|--------|
| \`/help\` | Ver ayuda |
| \`/clear\` | Limpiar conversación |
| \`/compact\` | Modo compacto |
| \`Ctrl+C\` | Salir |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`command not found: claude\` | No instalado | \`npm install -g @anthropic-ai/claude-code\` |
| \`authentication_error\` | API key inválida | Verifica tu ANTHROPIC_API_KEY |
| \`No such file or directory\` | Directorio vacío | Navega a un proyecto con archivos |
| Respuestas lentas | Modelo grande | Normal, Claude piensa... |

---

## ¿Cuándo usar Claude Code vs Chat web?

| Claude Code (CLI) | Claude.ai (Web) |
|-------------------|-----------------|
| Editar código en tu proyecto | Preguntas generales |
| Ejecutar comandos | Conversaciones largas |
| Contexto de archivos local | Subir archivos manualmente |

---

## Próximo paso

→ [Hola Mundo en Terminal](/es/cooking/hello-terminal) — Comandos básicos
→ [Mi Primer Repositorio](/es/cooking/first-repo) — Git básico
    `,
    contentEn: `
## Claude in your terminal

Claude Code is a command-line tool that lets you talk to Claude directly from your terminal.

**Why use it?**
- Claude can **read and edit your files**
- It can **execute commands** for you
- It understands your **project context**

---

## Step 1: Install Claude Code

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Verify installation:

\`\`\`bash
claude --version
\`\`\`

---

## Step 2: Configure your API Key

| System | Command |
|--------|---------|
| **macOS/Linux** | \`export ANTHROPIC_API_KEY="your-key-here"\` |
| **Windows PowerShell** | \`$env:ANTHROPIC_API_KEY="your-key-here"\` |

> 💡 To make it permanent, add it to your \`.bashrc\` or \`.zshrc\`

---

## Step 3: Start Claude Code

Navigate to your project and run:

\`\`\`bash
cd my-project
claude
\`\`\`

Claude can now see your files and help you.

---

## What can it do?

| Ask this | Claude does |
|----------|-------------|
| "Explain this file" | Reads and explains the code |
| "Fix the bug in app.js" | Edits the file |
| "Create a test for this function" | Creates new file |
| "Run the tests" | Runs \`npm test\` |
| "Install express" | Runs \`npm install express\` |

---

## Practical example

\`\`\`
$ claude
> What does index.js do?

Claude reads the file and explains...

> Add a GET /health endpoint that returns { status: 'ok' }

Claude edits index.js and adds the endpoint...

> Test it

Claude runs curl localhost:3000/health...
\`\`\`

---

## Useful commands inside Claude

| Command | Action |
|---------|--------|
| \`/help\` | Show help |
| \`/clear\` | Clear conversation |
| \`/compact\` | Compact mode |
| \`Ctrl+C\` | Exit |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`command not found: claude\` | Not installed | \`npm install -g @anthropic-ai/claude-code\` |
| \`authentication_error\` | Invalid API key | Check your ANTHROPIC_API_KEY |
| \`No such file or directory\` | Empty directory | Navigate to a project with files |
| Slow responses | Large model | Normal, Claude is thinking... |

---

## When to use Claude Code vs Web Chat?

| Claude Code (CLI) | Claude.ai (Web) |
|-------------------|-----------------|
| Edit code in your project | General questions |
| Execute commands | Long conversations |
| Local file context | Upload files manually |

---

## Next step

→ [Hello World in Terminal](/en/cooking/hello-terminal) — Basic commands
→ [My First Repository](/en/cooking/first-repo) — Git basics
    `,
  },
  'hello-terminal': {
    timeEs: '10 minutos',
    timeEn: '10 minutes',
    prerequisitesEs: ['Ninguno'],
    prerequisitesEn: ['None'],
    contentEs: `
## Tu primera vez en la terminal

La terminal es donde los desarrolladores trabajan. Es texto, no botones.

No te asustes. Son solo comandos.

---

## Paso 1: Abre la terminal

| Sistema | Cómo abrir |
|---------|------------|
| **macOS** | Cmd + Espacio → escribe "Terminal" |
| **Windows** | Win + X → "Terminal" o "PowerShell" |
| **Linux** | Ctrl + Alt + T |

---

## Paso 2: Tu primer comando

Escribe esto y presiona Enter:

\`\`\`bash
echo "Hola Mundo"
\`\`\`

Deberías ver:
\`\`\`
Hola Mundo
\`\`\`

Eso es todo. Ejecutaste un comando.

---

## Comandos esenciales

| Comando | Qué hace | Ejemplo |
|---------|----------|---------|
| \`pwd\` | Muestra dónde estás | \`pwd\` → /Users/tu-nombre |
| \`ls\` | Lista archivos | \`ls\` → Documents Downloads ... |
| \`cd\` | Cambia de carpeta | \`cd Documents\` |
| \`mkdir\` | Crea carpeta | \`mkdir mi-proyecto\` |
| \`touch\` | Crea archivo vacío | \`touch hola.txt\` |
| \`cat\` | Muestra contenido | \`cat hola.txt\` |
| \`clear\` | Limpia pantalla | \`clear\` |

---

## Practica: Crea tu primera carpeta

\`\`\`bash
# Crea una carpeta
mkdir mi-primer-proyecto

# Entra a la carpeta
cd mi-primer-proyecto

# Crea un archivo
echo "¡Hola desde la terminal!" > saludo.txt

# Mira el contenido
cat saludo.txt
\`\`\`

---

## Navegación de carpetas

| Comando | Qué hace |
|---------|----------|
| \`cd carpeta\` | Entrar a carpeta |
| \`cd ..\` | Subir un nivel |
| \`cd ~\` | Ir a tu home |
| \`cd -\` | Volver a la anterior |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`command not found\` | Comando mal escrito | Revisa la ortografía |
| \`No such file or directory\` | Carpeta no existe | Usa \`ls\` para ver qué hay |
| \`Permission denied\` | Sin permisos | Usa \`sudo\` (con cuidado) |

---

## Tips

- Usa **Tab** para autocompletar nombres
- Usa **flecha arriba** para repetir comandos anteriores
- Usa **Ctrl+C** para cancelar un comando

---

## ¿Qué aprendiste?

La terminal no es magia. Son comandos de texto:
1. Escribes un comando
2. Presionas Enter
3. Ves el resultado

---

## Próximo paso

→ [Mi Primer Repositorio](/es/cooking/first-repo) — Guarda tu código con Git
    `,
    contentEn: `
## Your first time in the terminal

The terminal is where developers work. It's text, not buttons.

Don't be scared. They're just commands.

---

## Step 1: Open the terminal

| System | How to open |
|--------|-------------|
| **macOS** | Cmd + Space → type "Terminal" |
| **Windows** | Win + X → "Terminal" or "PowerShell" |
| **Linux** | Ctrl + Alt + T |

---

## Step 2: Your first command

Type this and press Enter:

\`\`\`bash
echo "Hello World"
\`\`\`

You should see:
\`\`\`
Hello World
\`\`\`

That's it. You ran a command.

---

## Essential commands

| Command | What it does | Example |
|---------|--------------|---------|
| \`pwd\` | Shows where you are | \`pwd\` → /Users/your-name |
| \`ls\` | Lists files | \`ls\` → Documents Downloads ... |
| \`cd\` | Changes folder | \`cd Documents\` |
| \`mkdir\` | Creates folder | \`mkdir my-project\` |
| \`touch\` | Creates empty file | \`touch hello.txt\` |
| \`cat\` | Shows content | \`cat hello.txt\` |
| \`clear\` | Clears screen | \`clear\` |

---

## Practice: Create your first folder

\`\`\`bash
# Create a folder
mkdir my-first-project

# Enter the folder
cd my-first-project

# Create a file
echo "Hello from the terminal!" > greeting.txt

# See the content
cat greeting.txt
\`\`\`

---

## Folder navigation

| Command | What it does |
|---------|--------------|
| \`cd folder\` | Enter folder |
| \`cd ..\` | Go up one level |
| \`cd ~\` | Go to your home |
| \`cd -\` | Go to previous |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`command not found\` | Misspelled command | Check spelling |
| \`No such file or directory\` | Folder doesn't exist | Use \`ls\` to see what's there |
| \`Permission denied\` | No permissions | Use \`sudo\` (carefully) |

---

## Tips

- Use **Tab** to autocomplete names
- Use **up arrow** to repeat previous commands
- Use **Ctrl+C** to cancel a command

---

## What did you learn?

The terminal isn't magic. They're text commands:
1. You type a command
2. You press Enter
3. You see the result

---

## Next step

→ [My First Repository](/en/cooking/first-repo) — Save your code with Git
    `,
  },
  'first-repo': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Hola Mundo en Terminal completado', 'Cuenta de GitHub'],
    prerequisitesEn: ['Hello World in Terminal completed', 'GitHub account'],
    contentEs: `
## Guarda tu código para siempre

Git es como un "guardado" de videojuego para tu código. Cada vez que haces un commit, guardas el estado de tu proyecto.

GitHub es donde subes esos guardados para no perderlos.

---

## Paso 1: Instalar Git

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install git\` o viene preinstalado |
| **Windows** | Descarga de [git-scm.com](https://git-scm.com) |
| **Linux** | \`sudo apt install git\` |

Verifica:

\`\`\`bash
git --version
\`\`\`

---

## Paso 2: Configurar tu identidad

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
\`\`\`

---

## Paso 3: Crear un repositorio local

\`\`\`bash
# Crea una carpeta para tu proyecto
mkdir mi-proyecto
cd mi-proyecto

# Inicializa Git
git init

# Crea un archivo
echo "# Mi Proyecto" > README.md
\`\`\`

---

## Paso 4: Tu primer commit

\`\`\`bash
# Añade los archivos al "staging"
git add .

# Guarda el estado (commit)
git commit -m "Primer commit"
\`\`\`

¡Guardaste tu primer estado!

---

## Paso 5: Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: \`mi-proyecto\`
3. Déjalo público o privado
4. **NO** marques "Initialize with README"
5. Click en **Create repository**

---

## Paso 6: Conectar y subir

GitHub te mostrará comandos. Copia y ejecuta:

\`\`\`bash
git remote add origin https://github.com/TU-USUARIO/mi-proyecto.git
git branch -M main
git push -u origin main
\`\`\`

---

## ¿Funcionó?

Recarga la página de GitHub. Deberías ver tu README.md

---

## Flujo básico de Git

\`\`\`bash
# 1. Haces cambios en tus archivos
# 2. Añades los cambios
git add .

# 3. Guardas el estado
git commit -m "Descripción del cambio"

# 4. Subes a GitHub
git push
\`\`\`

---

## Comandos útiles

| Comando | Qué hace |
|---------|----------|
| \`git status\` | Ver qué cambió |
| \`git log\` | Ver historial de commits |
| \`git diff\` | Ver diferencias |
| \`git pull\` | Descargar cambios de GitHub |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`not a git repository\` | No hay .git | Ejecuta \`git init\` |
| \`Authentication failed\` | Credenciales incorrectas | Usa token personal de GitHub |
| \`rejected non-fast-forward\` | Hay cambios remotos | \`git pull\` primero |

---

## Próximo paso

→ [Mi Configuración Dotfiles](/es/cooking/dotfiles) — Personaliza tu entorno
    `,
    contentEn: `
## Save your code forever

Git is like a video game "save" for your code. Every time you make a commit, you save the state of your project.

GitHub is where you upload those saves so you don't lose them.

---

## Step 1: Install Git

| System | Command |
|--------|---------|
| **macOS** | \`brew install git\` or comes preinstalled |
| **Windows** | Download from [git-scm.com](https://git-scm.com) |
| **Linux** | \`sudo apt install git\` |

Verify:

\`\`\`bash
git --version
\`\`\`

---

## Step 2: Configure your identity

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
\`\`\`

---

## Step 3: Create a local repository

\`\`\`bash
# Create a folder for your project
mkdir my-project
cd my-project

# Initialize Git
git init

# Create a file
echo "# My Project" > README.md
\`\`\`

---

## Step 4: Your first commit

\`\`\`bash
# Add files to "staging"
git add .

# Save the state (commit)
git commit -m "First commit"
\`\`\`

You saved your first state!

---

## Step 5: Create repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Name: \`my-project\`
3. Leave it public or private
4. **DON'T** check "Initialize with README"
5. Click **Create repository**

---

## Step 6: Connect and push

GitHub will show you commands. Copy and run:

\`\`\`bash
git remote add origin https://github.com/YOUR-USERNAME/my-project.git
git branch -M main
git push -u origin main
\`\`\`

---

## Did it work?

Refresh the GitHub page. You should see your README.md

---

## Basic Git flow

\`\`\`bash
# 1. You make changes to your files
# 2. You add the changes
git add .

# 3. You save the state
git commit -m "Description of change"

# 4. You push to GitHub
git push
\`\`\`

---

## Useful commands

| Command | What it does |
|---------|--------------|
| \`git status\` | See what changed |
| \`git log\` | See commit history |
| \`git diff\` | See differences |
| \`git pull\` | Download changes from GitHub |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`not a git repository\` | No .git | Run \`git init\` |
| \`Authentication failed\` | Wrong credentials | Use GitHub personal token |
| \`rejected non-fast-forward\` | Remote changes exist | \`git pull\` first |

---

## Next step

→ [My Dotfiles Setup](/en/cooking/dotfiles) — Customize your environment
    `,
  },
  'dotfiles': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Mi Primer Repositorio completado'],
    prerequisitesEn: ['My First Repository completed'],
    contentEs: `
## Tu configuración personal

Los dotfiles son archivos de configuración que empiezan con punto: \`.bashrc\`, \`.zshrc\`, \`.gitconfig\`.

Guardarlos en GitHub significa que puedes configurar cualquier computadora nueva en minutos.

---

## ¿Qué son los dotfiles?

| Archivo | Para qué sirve |
|---------|----------------|
| \`.bashrc\` / \`.zshrc\` | Configuración de terminal |
| \`.gitconfig\` | Tu nombre, email, aliases de Git |
| \`.vimrc\` | Configuración de Vim |
| \`.ssh/config\` | Atajos para conexiones SSH |

---

## Paso 1: Crea un repositorio para dotfiles

\`\`\`bash
mkdir ~/dotfiles
cd ~/dotfiles
git init
\`\`\`

---

## Paso 2: Copia tus archivos de configuración

\`\`\`bash
# Copia tu configuración de shell
cp ~/.zshrc ~/dotfiles/  # o .bashrc si usas bash

# Copia configuración de Git
cp ~/.gitconfig ~/dotfiles/
\`\`\`

---

## Paso 3: Crea un script de instalación

Crea \`install.sh\`:

\`\`\`bash
#!/bin/bash
# Crea enlaces simbólicos a los dotfiles

DOTFILES_DIR="$HOME/dotfiles"

ln -sf "$DOTFILES_DIR/.zshrc" "$HOME/.zshrc"
ln -sf "$DOTFILES_DIR/.gitconfig" "$HOME/.gitconfig"

echo "Dotfiles instalados!"
\`\`\`

Hazlo ejecutable:

\`\`\`bash
chmod +x install.sh
\`\`\`

---

## Paso 4: Sube a GitHub

\`\`\`bash
git add .
git commit -m "Mi configuración personal"
git push origin main
\`\`\`

---

## En una computadora nueva

\`\`\`bash
git clone https://github.com/TU-USUARIO/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
\`\`\`

¡Listo! Tu configuración está aplicada.

---

## Configuraciones útiles para .zshrc

\`\`\`bash
# Aliases útiles
alias ll="ls -la"
alias gs="git status"
alias gc="git commit"
alias gp="git push"

# Exportar API keys
export GEMINI_API_KEY="tu-key"
export ANTHROPIC_API_KEY="tu-key"
\`\`\`

---

## Próximo paso

→ [Página Web Estática](/es/cooking/static-page) — Tu primera página web
    `,
    contentEn: `
## Your personal configuration

Dotfiles are configuration files that start with a dot: \`.bashrc\`, \`.zshrc\`, \`.gitconfig\`.

Saving them to GitHub means you can configure any new computer in minutes.

---

## What are dotfiles?

| File | What it's for |
|------|---------------|
| \`.bashrc\` / \`.zshrc\` | Terminal configuration |
| \`.gitconfig\` | Your name, email, Git aliases |
| \`.vimrc\` | Vim configuration |
| \`.ssh/config\` | SSH connection shortcuts |

---

## Step 1: Create a dotfiles repository

\`\`\`bash
mkdir ~/dotfiles
cd ~/dotfiles
git init
\`\`\`

---

## Step 2: Copy your config files

\`\`\`bash
# Copy your shell config
cp ~/.zshrc ~/dotfiles/  # or .bashrc if using bash

# Copy Git config
cp ~/.gitconfig ~/dotfiles/
\`\`\`

---

## Step 3: Create an install script

Create \`install.sh\`:

\`\`\`bash
#!/bin/bash
# Create symlinks to dotfiles

DOTFILES_DIR="$HOME/dotfiles"

ln -sf "$DOTFILES_DIR/.zshrc" "$HOME/.zshrc"
ln -sf "$DOTFILES_DIR/.gitconfig" "$HOME/.gitconfig"

echo "Dotfiles installed!"
\`\`\`

Make it executable:

\`\`\`bash
chmod +x install.sh
\`\`\`

---

## Step 4: Push to GitHub

\`\`\`bash
git add .
git commit -m "My personal configuration"
git push origin main
\`\`\`

---

## On a new computer

\`\`\`bash
git clone https://github.com/YOUR-USERNAME/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
\`\`\`

Done! Your configuration is applied.

---

## Useful .zshrc configurations

\`\`\`bash
# Useful aliases
alias ll="ls -la"
alias gs="git status"
alias gc="git commit"
alias gp="git push"

# Export API keys
export GEMINI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-key"
\`\`\`

---

## Next step

→ [Static Web Page](/en/cooking/static-page) — Your first web page
    `,
  },
  'static-page': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Terminal básica'],
    prerequisitesEn: ['Basic terminal'],
    contentEs: `
## Tu primera página web

Una página web estática es solo HTML, CSS, y opcionalmente JavaScript. No necesita servidor.

---

## Paso 1: Crea la estructura

\`\`\`bash
mkdir mi-pagina
cd mi-pagina
\`\`\`

---

## Paso 2: Pídele a una IA que genere el código

Abre [Google AI Studio](https://aistudio.google.com) o cualquier chat de IA.

\`\`\`
Crea una página web simple con:
- Un título "Mi Primera Página"
- Una descripción de mí
- Estilos modernos con CSS
- Colores agradables

Dame el código HTML completo en un solo archivo.
\`\`\`

---

## Paso 3: Crea el archivo

Copia el código que te dio la IA y guárdalo como \`index.html\`

---

## Paso 4: Ábrelo en el navegador

| Sistema | Comando |
|---------|---------|
| **macOS** | \`open index.html\` |
| **Windows** | \`start index.html\` |
| **Linux** | \`xdg-open index.html\` |

O simplemente arrastra el archivo a tu navegador.

---

## Estructura básica de HTML

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página</title>
    <style>
        body { font-family: sans-serif; }
    </style>
</head>
<body>
    <h1>Hola Mundo</h1>
    <p>Mi primera página web.</p>
</body>
</html>
\`\`\`

---

## Mejoras opcionales

Pídele a la IA:

- *"Agrega un modo oscuro"*
- *"Hazla responsive para móvil"*
- *"Agrega animaciones sutiles"*
- *"Agrega una sección de proyectos"*

---

## Publicar gratis

Para que otros la vean, súbela a GitHub Pages:

1. Crea repositorio en GitHub
2. Sube tu \`index.html\`
3. Ve a Settings → Pages
4. Selecciona "main" branch
5. Tu página estará en \`tu-usuario.github.io/repo-name\`

---

## Próximo paso

→ [Mi Ambiente de Desarrollo](/es/cooking/dev-environment) — Configura VS Code
    `,
    contentEn: `
## Your first web page

A static web page is just HTML, CSS, and optionally JavaScript. No server needed.

---

## Step 1: Create the structure

\`\`\`bash
mkdir my-page
cd my-page
\`\`\`

---

## Step 2: Ask an AI to generate the code

Open [Google AI Studio](https://aistudio.google.com) or any AI chat.

\`\`\`
Create a simple web page with:
- A title "My First Page"
- A description about me
- Modern CSS styles
- Nice colors

Give me the complete HTML code in a single file.
\`\`\`

---

## Step 3: Create the file

Copy the code the AI gave you and save it as \`index.html\`

---

## Step 4: Open it in the browser

| System | Command |
|--------|---------|
| **macOS** | \`open index.html\` |
| **Windows** | \`start index.html\` |
| **Linux** | \`xdg-open index.html\` |

Or just drag the file to your browser.

---

## Basic HTML structure

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <style>
        body { font-family: sans-serif; }
    </style>
</head>
<body>
    <h1>Hello World</h1>
    <p>My first web page.</p>
</body>
</html>
\`\`\`

---

## Optional improvements

Ask the AI:

- *"Add dark mode"*
- *"Make it responsive for mobile"*
- *"Add subtle animations"*
- *"Add a projects section"*

---

## Publish for free

For others to see it, upload to GitHub Pages:

1. Create repository on GitHub
2. Upload your \`index.html\`
3. Go to Settings → Pages
4. Select "main" branch
5. Your page will be at \`your-username.github.io/repo-name\`

---

## Next step

→ [My Dev Environment](/en/cooking/dev-environment) — Configure VS Code
    `,
  },
  'dev-environment': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Terminal básica'],
    prerequisitesEn: ['Basic terminal'],
    contentEs: `
## Tu ambiente de desarrollo

Un buen ambiente de desarrollo te hace más productivo. Configurémoslo.

---

## Herramientas esenciales

| Herramienta | Para qué |
|-------------|----------|
| **VS Code** o **Cursor** | Editor de código |
| **Node.js** | JavaScript/TypeScript |
| **Git** | Control de versiones |
| **Terminal** | Comandos |

---

## Paso 1: Instalar VS Code (o Cursor)

- VS Code: [code.visualstudio.com](https://code.visualstudio.com)
- Cursor (con IA integrada): [cursor.com](https://cursor.com)

---

## Paso 2: Instalar Node.js

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install node\` |
| **Windows** | Descarga de [nodejs.org](https://nodejs.org) |
| **Linux** | \`sudo apt install nodejs npm\` |

Verifica:

\`\`\`bash
node --version
npm --version
\`\`\`

---

## Paso 3: Extensiones de VS Code

Abre VS Code y instala estas extensiones (Cmd/Ctrl + Shift + X):

| Extensión | Para qué |
|-----------|----------|
| **ESLint** | Detecta errores de código |
| **Prettier** | Formatea tu código |
| **GitLens** | Mejor integración con Git |
| **GitHub Copilot** | IA que te ayuda a programar |

---

## Paso 4: Configurar terminal integrada

En VS Code, abre la terminal: \`Ctrl + \`\` (backtick)

Configura tu shell favorito:
1. Abre Settings (Cmd/Ctrl + ,)
2. Busca "terminal default"
3. Selecciona zsh, bash, o PowerShell

---

## Atajos útiles

| Atajo | Acción |
|-------|--------|
| \`Cmd/Ctrl + P\` | Buscar archivos |
| \`Cmd/Ctrl + Shift + P\` | Paleta de comandos |
| \`Cmd/Ctrl + B\` | Toggle sidebar |
| \`Cmd/Ctrl + \`\` | Toggle terminal |
| \`Cmd/Ctrl + /\` | Comentar línea |

---

## Estructura típica de proyecto

\`\`\`
mi-proyecto/
├── src/           # Código fuente
├── tests/         # Tests
├── node_modules/  # Dependencias (ignorar)
├── package.json   # Configuración npm
├── .gitignore     # Archivos a ignorar
└── README.md      # Documentación
\`\`\`

---

## .gitignore básico

Crea un archivo \`.gitignore\`:

\`\`\`
node_modules/
.env
.DS_Store
*.log
\`\`\`

---

## Próximo paso

→ [Mi Primer Script Bash](/es/cooking/first-script) — Automatiza tareas
    `,
    contentEn: `
## Your development environment

A good dev environment makes you more productive. Let's set it up.

---

## Essential tools

| Tool | What for |
|------|----------|
| **VS Code** or **Cursor** | Code editor |
| **Node.js** | JavaScript/TypeScript |
| **Git** | Version control |
| **Terminal** | Commands |

---

## Step 1: Install VS Code (or Cursor)

- VS Code: [code.visualstudio.com](https://code.visualstudio.com)
- Cursor (with integrated AI): [cursor.com](https://cursor.com)

---

## Step 2: Install Node.js

| System | Command |
|--------|---------|
| **macOS** | \`brew install node\` |
| **Windows** | Download from [nodejs.org](https://nodejs.org) |
| **Linux** | \`sudo apt install nodejs npm\` |

Verify:

\`\`\`bash
node --version
npm --version
\`\`\`

---

## Step 3: VS Code Extensions

Open VS Code and install these extensions (Cmd/Ctrl + Shift + X):

| Extension | What for |
|-----------|----------|
| **ESLint** | Detects code errors |
| **Prettier** | Formats your code |
| **GitLens** | Better Git integration |
| **GitHub Copilot** | AI that helps you code |

---

## Step 4: Configure integrated terminal

In VS Code, open terminal: \`Ctrl + \`\` (backtick)

Configure your favorite shell:
1. Open Settings (Cmd/Ctrl + ,)
2. Search "terminal default"
3. Select zsh, bash, or PowerShell

---

## Useful shortcuts

| Shortcut | Action |
|----------|--------|
| \`Cmd/Ctrl + P\` | Find files |
| \`Cmd/Ctrl + Shift + P\` | Command palette |
| \`Cmd/Ctrl + B\` | Toggle sidebar |
| \`Cmd/Ctrl + \`\` | Toggle terminal |
| \`Cmd/Ctrl + /\` | Comment line |

---

## Typical project structure

\`\`\`
my-project/
├── src/           # Source code
├── tests/         # Tests
├── node_modules/  # Dependencies (ignore)
├── package.json   # npm config
├── .gitignore     # Files to ignore
└── README.md      # Documentation
\`\`\`

---

## Basic .gitignore

Create a \`.gitignore\` file:

\`\`\`
node_modules/
.env
.DS_Store
*.log
\`\`\`

---

## Next step

→ [My First Bash Script](/en/cooking/first-script) — Automate tasks
    `,
  },
  'first-script': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Terminal básica'],
    prerequisitesEn: ['Basic terminal'],
    contentEs: `
## Automatiza tareas repetitivas

Un script bash es una lista de comandos que se ejecutan uno tras otro. Perfecto para automatizar.

---

## Paso 1: Crea tu primer script

\`\`\`bash
# Crea el archivo
touch mi-script.sh

# Ábrelo en tu editor
code mi-script.sh  # o nano, vim, etc.
\`\`\`

---

## Paso 2: Escribe el script

\`\`\`bash
#!/bin/bash
# Mi primer script

echo "Hola, empezando tareas..."
echo "Fecha actual: $(date)"
echo "Estás en: $(pwd)"
echo "Archivos aquí:"
ls -la
echo "¡Listo!"
\`\`\`

---

## Paso 3: Hazlo ejecutable y córrelo

\`\`\`bash
chmod +x mi-script.sh
./mi-script.sh
\`\`\`

---

## Ejemplo práctico: Setup de proyecto

\`\`\`bash
#!/bin/bash
# setup-proyecto.sh

PROJECT_NAME=$1  # Primer argumento

if [ -z "$PROJECT_NAME" ]; then
    echo "Uso: ./setup-proyecto.sh nombre-proyecto"
    exit 1
fi

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"
git init
echo "# $PROJECT_NAME" > README.md
echo "node_modules/" > .gitignore
npm init -y

echo "Proyecto $PROJECT_NAME creado!"
\`\`\`

Uso: \`./setup-proyecto.sh mi-app\`

---

## Variables y condicionales

\`\`\`bash
#!/bin/bash

NOMBRE="Usuario"

if [ -f "config.json" ]; then
    echo "Config encontrada"
else
    echo "Config no existe, creando..."
    echo "{}" > config.json
fi
\`\`\`

---

## Loops

\`\`\`bash
#!/bin/bash

# Loop sobre archivos
for file in *.txt; do
    echo "Procesando: $file"
done

# Loop con contador
for i in {1..5}; do
    echo "Iteración $i"
done
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`Permission denied\` | No es ejecutable | \`chmod +x script.sh\` |
| \`command not found\` | Primera línea mal | Agrega \`#!/bin/bash\` |
| \`syntax error\` | Error de sintaxis | Revisa espacios en \`if [ ]\` |

---

## Próximo paso

→ [Docker Hello World](/es/cooking/docker-hello) — Contenedores básicos
    `,
    contentEn: `
## Automate repetitive tasks

A bash script is a list of commands that run one after another. Perfect for automation.

---

## Step 1: Create your first script

\`\`\`bash
# Create the file
touch my-script.sh

# Open in your editor
code my-script.sh  # or nano, vim, etc.
\`\`\`

---

## Step 2: Write the script

\`\`\`bash
#!/bin/bash
# My first script

echo "Hello, starting tasks..."
echo "Current date: $(date)"
echo "You are in: $(pwd)"
echo "Files here:"
ls -la
echo "Done!"
\`\`\`

---

## Step 3: Make it executable and run it

\`\`\`bash
chmod +x my-script.sh
./my-script.sh
\`\`\`

---

## Practical example: Project setup

\`\`\`bash
#!/bin/bash
# setup-project.sh

PROJECT_NAME=$1  # First argument

if [ -z "$PROJECT_NAME" ]; then
    echo "Usage: ./setup-project.sh project-name"
    exit 1
fi

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"
git init
echo "# $PROJECT_NAME" > README.md
echo "node_modules/" > .gitignore
npm init -y

echo "Project $PROJECT_NAME created!"
\`\`\`

Usage: \`./setup-project.sh my-app\`

---

## Variables and conditionals

\`\`\`bash
#!/bin/bash

NAME="User"

if [ -f "config.json" ]; then
    echo "Config found"
else
    echo "Config doesn't exist, creating..."
    echo "{}" > config.json
fi
\`\`\`

---

## Loops

\`\`\`bash
#!/bin/bash

# Loop over files
for file in *.txt; do
    echo "Processing: $file"
done

# Loop with counter
for i in {1..5}; do
    echo "Iteration $i"
done
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`Permission denied\` | Not executable | \`chmod +x script.sh\` |
| \`command not found\` | First line wrong | Add \`#!/bin/bash\` |
| \`syntax error\` | Syntax error | Check spaces in \`if [ ]\` |

---

## Next step

→ [Docker Hello World](/en/cooking/docker-hello) — Basic containers
    `,
  },
  'docker-hello': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Terminal básica'],
    prerequisitesEn: ['Basic terminal'],
    contentEs: `
## Contenedores: Tu código empaquetado

Docker empaqueta tu aplicación con todo lo que necesita para correr. Funciona igual en tu máquina y en producción.

---

## Paso 1: Instalar Docker

| Sistema | Instalación |
|---------|-------------|
| **macOS** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Windows** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Linux** | \`sudo apt install docker.io\` |

Verifica:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

---

## Paso 2: Tu primer contenedor

\`\`\`bash
# Corre un contenedor de Ubuntu
docker run -it ubuntu bash

# Ahora estás DENTRO del contenedor
cat /etc/os-release
exit
\`\`\`

---

## Paso 3: Crea tu propia imagen

Crea \`Dockerfile\`:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

Crea \`index.js\`:

\`\`\`javascript
console.log("¡Hola desde Docker!");
\`\`\`

Crea \`package.json\`:

\`\`\`json
{ "name": "docker-hello", "version": "1.0.0" }
\`\`\`

---

## Paso 4: Construye y corre

\`\`\`bash
docker build -t mi-app .
docker run mi-app
\`\`\`

Deberías ver: "¡Hola desde Docker!"

---

## Comandos esenciales

| Comando | Qué hace |
|---------|----------|
| \`docker build -t nombre .\` | Construye imagen |
| \`docker run nombre\` | Corre contenedor |
| \`docker ps\` | Lista contenedores activos |
| \`docker images\` | Lista imágenes |
| \`docker stop ID\` | Detiene contenedor |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`daemon not running\` | Docker no está corriendo | Abre Docker Desktop |
| \`permission denied\` | Sin permisos | Usa \`sudo\` o agrega usuario al grupo docker |
| \`no such file\` | Dockerfile mal ubicado | Corre desde la carpeta del Dockerfile |

---

## Próximo paso

→ [Consumir una API JSON](/es/cooking/json-api-fetch) — Datos del mundo real
    `,
    contentEn: `
## Containers: Your packaged code

Docker packages your application with everything it needs to run. Works the same on your machine and in production.

---

## Step 1: Install Docker

| System | Installation |
|--------|--------------|
| **macOS** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Windows** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Linux** | \`sudo apt install docker.io\` |

Verify:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

---

## Step 2: Your first container

\`\`\`bash
# Run an Ubuntu container
docker run -it ubuntu bash

# Now you're INSIDE the container
cat /etc/os-release
exit
\`\`\`

---

## Step 3: Create your own image

Create \`Dockerfile\`:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

Create \`index.js\`:

\`\`\`javascript
console.log("Hello from Docker!");
\`\`\`

Create \`package.json\`:

\`\`\`json
{ "name": "docker-hello", "version": "1.0.0" }
\`\`\`

---

## Step 4: Build and run

\`\`\`bash
docker build -t my-app .
docker run my-app
\`\`\`

You should see: "Hello from Docker!"

---

## Essential commands

| Command | What it does |
|---------|--------------|
| \`docker build -t name .\` | Build image |
| \`docker run name\` | Run container |
| \`docker ps\` | List active containers |
| \`docker images\` | List images |
| \`docker stop ID\` | Stop container |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`daemon not running\` | Docker not running | Open Docker Desktop |
| \`permission denied\` | No permissions | Use \`sudo\` or add user to docker group |
| \`no such file\` | Dockerfile misplaced | Run from Dockerfile folder |

---

## Next step

→ [Consume a JSON API](/en/cooking/json-api-fetch) — Real world data
    `,
  },
  'json-api-fetch': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Node.js instalado'],
    prerequisitesEn: ['Node.js installed'],
    contentEs: `
## Datos del mundo real

Las APIs devuelven datos en formato JSON. Vamos a consumir una.

---

## Paso 1: Una API pública gratuita

Usaremos [JSONPlaceholder](https://jsonplaceholder.typicode.com), una API de prueba.

\`\`\`bash
# Prueba desde terminal
curl https://jsonplaceholder.typicode.com/users/1
\`\`\`

---

## Paso 2: Pídele a una IA el código

\`\`\`
Necesito un script en Node.js que:
- Haga fetch a https://jsonplaceholder.typicode.com/users
- Muestre el nombre y email de cada usuario
- Use async/await
\`\`\`

---

## Paso 3: Código típico

La IA te dará algo como:

\`\`\`javascript
async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

  users.forEach(user => {
    console.log(\`\${user.name} - \${user.email}\`);
  });
}

getUsers();
\`\`\`

---

## Paso 4: Ejecuta

\`\`\`bash
node fetch-users.js
\`\`\`

Verás una lista de usuarios con sus emails.

---

## Otras APIs públicas

| API | URL | Datos |
|-----|-----|-------|
| JSONPlaceholder | jsonplaceholder.typicode.com | Usuarios, posts, comentarios |
| OpenWeather | openweathermap.org/api | Clima (requiere API key) |
| PokeAPI | pokeapi.co | Pokémon |
| RandomUser | randomuser.me | Usuarios aleatorios |

---

## Manejo de errores

\`\`\`javascript
async function getUsers() {
  try {
    const response = await fetch('https://api.ejemplo.com/users');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`fetch is not defined\` | Node.js < 18 | Actualiza Node.js o usa \`node-fetch\` |
| \`ECONNREFUSED\` | API caída | Verifica la URL |
| \`SyntaxError: JSON\` | Respuesta no es JSON | Revisa \`response.text()\` primero |

---

## Próximo paso

→ [Sistema de Notas Markdown](/es/cooking/markdown-notes) — Organiza tu conocimiento
    `,
    contentEn: `
## Real world data

APIs return data in JSON format. Let's consume one.

---

## Step 1: A free public API

We'll use [JSONPlaceholder](https://jsonplaceholder.typicode.com), a test API.

\`\`\`bash
# Test from terminal
curl https://jsonplaceholder.typicode.com/users/1
\`\`\`

---

## Step 2: Ask an AI for the code

\`\`\`
I need a Node.js script that:
- Fetches https://jsonplaceholder.typicode.com/users
- Shows the name and email of each user
- Uses async/await
\`\`\`

---

## Step 3: Typical code

The AI will give you something like:

\`\`\`javascript
async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

  users.forEach(user => {
    console.log(\`\${user.name} - \${user.email}\`);
  });
}

getUsers();
\`\`\`

---

## Step 4: Run it

\`\`\`bash
node fetch-users.js
\`\`\`

You'll see a list of users with their emails.

---

## Other public APIs

| API | URL | Data |
|-----|-----|------|
| JSONPlaceholder | jsonplaceholder.typicode.com | Users, posts, comments |
| OpenWeather | openweathermap.org/api | Weather (requires API key) |
| PokeAPI | pokeapi.co | Pokémon |
| RandomUser | randomuser.me | Random users |

---

## Error handling

\`\`\`javascript
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`fetch is not defined\` | Node.js < 18 | Update Node.js or use \`node-fetch\` |
| \`ECONNREFUSED\` | API down | Check the URL |
| \`SyntaxError: JSON\` | Response is not JSON | Check \`response.text()\` first |

---

## Next step

→ [Markdown Notes System](/en/cooking/markdown-notes) — Organize your knowledge
    `,
  },
  'markdown-notes': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Terminal básica', 'Git básico'],
    prerequisitesEn: ['Basic terminal', 'Basic Git'],
    contentEs: `
## Organiza tu conocimiento

Markdown es texto plano con formato. Perfecto para documentar y aprender.

---

## Sintaxis básica

\`\`\`markdown
# Título
## Subtítulo

**Negrita** y *cursiva*

- Lista
- De items

1. Lista
2. Numerada

\`código inline\`

\`\`\`javascript
// Bloque de código
const x = 1;
\`\`\`

[Link](https://ejemplo.com)

> Cita o nota importante
\`\`\`

---

## Estructura de notas

\`\`\`
notas/
├── aprendizaje/
│   ├── javascript.md
│   ├── git.md
│   └── docker.md
├── proyectos/
│   ├── proyecto-1.md
│   └── ideas.md
└── diario/
    ├── 2024-01-01.md
    └── 2024-01-02.md
\`\`\`

---

## Template para aprendizaje

\`\`\`markdown
# Tema: [Nombre]

## ¿Qué es?
[Explicación simple]

## ¿Por qué importa?
[Razón práctica]

## Ejemplo
\`\`\`
[código]
\`\`\`

## Errores comunes
- Error 1: Solución 1
- Error 2: Solución 2

## Links útiles
- [Recurso 1](url)
\`\`\`

---

## Herramientas

| Herramienta | Para qué |
|-------------|----------|
| **Obsidian** | App local con links |
| **Notion** | Todo-en-uno en la nube |
| **VS Code** | Preview integrado |
| **GitHub** | Renderiza markdown |

---

## Sincronizar con Git

\`\`\`bash
cd notas
git init
git add .
git commit -m "Mis notas"
# Sube a GitHub para respaldo
\`\`\`

---

## Próximo paso

→ [Colaborar con Git](/es/cooking/git-collaboration) — Trabaja en equipo
    `,
    contentEn: `
## Organize your knowledge

Markdown is plain text with formatting. Perfect for documenting and learning.

---

## Basic syntax

\`\`\`markdown
# Title
## Subtitle

**Bold** and *italic*

- List
- Of items

1. Numbered
2. List

\`inline code\`

\`\`\`javascript
// Code block
const x = 1;
\`\`\`

[Link](https://example.com)

> Quote or important note
\`\`\`

---

## Notes structure

\`\`\`
notes/
├── learning/
│   ├── javascript.md
│   ├── git.md
│   └── docker.md
├── projects/
│   ├── project-1.md
│   └── ideas.md
└── journal/
    ├── 2024-01-01.md
    └── 2024-01-02.md
\`\`\`

---

## Learning template

\`\`\`markdown
# Topic: [Name]

## What is it?
[Simple explanation]

## Why does it matter?
[Practical reason]

## Example
\`\`\`
[code]
\`\`\`

## Common errors
- Error 1: Solution 1
- Error 2: Solution 2

## Useful links
- [Resource 1](url)
\`\`\`

---

## Tools

| Tool | What for |
|------|----------|
| **Obsidian** | Local app with links |
| **Notion** | All-in-one in the cloud |
| **VS Code** | Integrated preview |
| **GitHub** | Renders markdown |

---

## Sync with Git

\`\`\`bash
cd notes
git init
git add .
git commit -m "My notes"
# Push to GitHub for backup
\`\`\`

---

## Next step

→ [Collaborate with Git](/en/cooking/git-collaboration) — Work as a team
    `,
  },
  'git-collaboration': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Mi Primer Repositorio completado'],
    prerequisitesEn: ['My First Repository completed'],
    contentEs: `
## Trabaja en equipo con Git

Git permite que múltiples personas trabajen en el mismo código sin pisarse.

---

## Flujo básico de colaboración

1. Clonas el repo
2. Creas una rama
3. Haces cambios
4. Abres un Pull Request
5. Alguien revisa
6. Se hace merge

---

## Paso 1: Clonar un repositorio

\`\`\`bash
git clone https://github.com/usuario/proyecto.git
cd proyecto
\`\`\`

---

## Paso 2: Crear una rama

\`\`\`bash
git checkout -b mi-feature
\`\`\`

Ahora tus cambios están aislados.

---

## Paso 3: Hacer cambios y commit

\`\`\`bash
# Edita archivos...
git add .
git commit -m "Agrega nueva feature"
\`\`\`

---

## Paso 4: Subir la rama

\`\`\`bash
git push -u origin mi-feature
\`\`\`

---

## Paso 5: Abrir Pull Request

1. Ve a GitHub
2. Verás un botón "Compare & pull request"
3. Describe tus cambios
4. Asigna reviewers

---

## Comandos de ramas

| Comando | Qué hace |
|---------|----------|
| \`git branch\` | Lista ramas |
| \`git checkout rama\` | Cambia a rama |
| \`git checkout -b nueva\` | Crea y cambia |
| \`git merge rama\` | Fusiona rama |
| \`git branch -d rama\` | Elimina rama |

---

## Resolver conflictos

Cuando dos personas editan lo mismo:

\`\`\`
<<<<<<< HEAD
Tu código
=======
Código del otro
>>>>>>> otra-rama
\`\`\`

1. Elige qué código mantener
2. Elimina los marcadores \`<<<\`, \`===\`, \`>>>\`
3. \`git add .\` y \`git commit\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`CONFLICT\` | Mismas líneas editadas | Resuelve manualmente |
| \`not a git repository\` | Fuera del repo | \`cd\` al directorio correcto |
| \`rejected\` | Cambios remotos | \`git pull\` primero |

---

## ¡Nivel Aprendiz completado!

Has terminado el nivel Aprendiz. Ahora tienes las bases para:
- Usar la terminal
- Control de versiones con Git
- Consumir APIs
- Crear scripts
- Usar Docker

→ [Chat con Interfaz Web](/es/cooking/chat-web-ui) — Empieza nivel Cocinero
    `,
    contentEn: `
## Work as a team with Git

Git allows multiple people to work on the same code without stepping on each other.

---

## Basic collaboration flow

1. Clone the repo
2. Create a branch
3. Make changes
4. Open a Pull Request
5. Someone reviews
6. Merge happens

---

## Step 1: Clone a repository

\`\`\`bash
git clone https://github.com/user/project.git
cd project
\`\`\`

---

## Step 2: Create a branch

\`\`\`bash
git checkout -b my-feature
\`\`\`

Now your changes are isolated.

---

## Step 3: Make changes and commit

\`\`\`bash
# Edit files...
git add .
git commit -m "Add new feature"
\`\`\`

---

## Step 4: Push the branch

\`\`\`bash
git push -u origin my-feature
\`\`\`

---

## Step 5: Open Pull Request

1. Go to GitHub
2. You'll see a "Compare & pull request" button
3. Describe your changes
4. Assign reviewers

---

## Branch commands

| Command | What it does |
|---------|--------------|
| \`git branch\` | List branches |
| \`git checkout branch\` | Switch to branch |
| \`git checkout -b new\` | Create and switch |
| \`git merge branch\` | Merge branch |
| \`git branch -d branch\` | Delete branch |

---

## Resolve conflicts

When two people edit the same thing:

\`\`\`
<<<<<<< HEAD
Your code
=======
Other's code
>>>>>>> other-branch
\`\`\`

1. Choose which code to keep
2. Remove the markers \`<<<\`, \`===\`, \`>>>\`
3. \`git add .\` and \`git commit\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`CONFLICT\` | Same lines edited | Resolve manually |
| \`not a git repository\` | Outside repo | \`cd\` to correct directory |
| \`rejected\` | Remote changes | \`git pull\` first |

---

## Apprentice level complete!

You've finished the Apprentice level. Now you have the basics for:
- Using the terminal
- Version control with Git
- Consuming APIs
- Creating scripts
- Using Docker

→ [Chat with Web UI](/en/cooking/chat-web-ui) — Start Cook level
    `,
  },
}

const dishOrder = dishes.map(d => d.slug)

export async function generateMetadata({ params }: { params: Promise<{ locale: string; dish: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const dishData = dishes.find(d => d.slug === resolvedParams.dish)

  if (!dishData) return { title: 'Not Found' }

  const title = locale === 'es' ? dishData.titleEs : dishData.titleEn

  return {
    title: `${title} - Cooking | luxIA`,
  }
}

export async function generateStaticParams() {
  return dishOrder.flatMap(dish => [
    { locale: 'es', dish },
    { locale: 'en', dish }
  ])
}

interface PageProps {
  params: Promise<{ locale: string; dish: string }>
}

export default async function DishPage({ params }: PageProps) {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const dishSlug = resolvedParams.dish
  const isSpanish = locale === 'es'

  const dishData = dishes.find(d => d.slug === dishSlug)

  if (!dishData) {
    notFound()
  }

  const content = dishesContent[dishSlug]
  const hasContent = !!content

  const currentIndex = dishOrder.indexOf(dishSlug)
  const prevDish = currentIndex > 0 ? dishes[currentIndex - 1] : null
  const nextDish = currentIndex < dishOrder.length - 1 ? dishes[currentIndex + 1] : null

  const title = isSpanish ? dishData.titleEs : dishData.titleEn
  const levelInfo = levelLabels[dishData.level as keyof typeof levelLabels]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-slate-500">
          <li>
            <Link href={`/${locale}/cooking`} className="hover:text-orange-600">
              Cooking
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium">{title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{dishData.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${levelInfo.color}`}>
                {levelInfo[isSpanish ? 'es' : 'en']}
              </span>
              {hasContent && (
                <span className="text-sm text-slate-500">
                  ⏱️ {isSpanish ? content.timeEs : content.timeEn}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {hasContent && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <h3 className="text-sm font-semibold text-orange-800 mb-2">
              {isSpanish ? '📋 Prerequisitos sugeridos' : '📋 Suggested prerequisites'}
            </h3>
            <ul className="text-sm text-orange-700 space-y-1">
              {(isSpanish ? content.prerequisitesEs : content.prerequisitesEn).map((prereq, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-orange-400">•</span>
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Content */}
      {hasContent ? (
        <article className="prose-custom">
          <MarkdownContent content={isSpanish ? content.contentEs : content.contentEn} />
        </article>
      ) : (
        /* Coming Soon */
        <div className="text-center py-16">
          <div className="text-6xl mb-6">👨‍🍳</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            {isSpanish ? 'Receta en preparación' : 'Recipe in preparation'}
          </h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            {isSpanish
              ? 'Estamos cocinando esta receta con el mejor contenido. ¡Vuelve pronto!'
              : 'We are cooking this recipe with the best content. Check back soon!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/cooking`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              ← {isSpanish ? 'Ver todos los platillos' : 'View all dishes'}
            </Link>
            <Link
              href={`/${locale}/learning`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition"
            >
              📖 {isSpanish ? 'Ir a Learning' : 'Go to Learning'}
            </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-12 pt-8 border-t border-orange-200 flex justify-between">
        {prevDish ? (
          <Link
            href={`/${locale}/cooking/${prevDish.slug}`}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition group"
          >
            <span className="group-hover:-translate-x-1 transition">←</span>
            <span className="hidden sm:inline">{isSpanish ? prevDish.titleEs : prevDish.titleEn}</span>
            <span className="sm:hidden">{isSpanish ? 'Anterior' : 'Previous'}</span>
          </Link>
        ) : <div />}

        {nextDish ? (
          <Link
            href={`/${locale}/cooking/${nextDish.slug}`}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition group"
          >
            <span className="hidden sm:inline">{isSpanish ? nextDish.titleEs : nextDish.titleEn}</span>
            <span className="sm:hidden">{isSpanish ? 'Siguiente' : 'Next'}</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        ) : (
          <Link
            href={`/${locale}/cooking`}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition"
          >
            <span>{isSpanish ? 'Volver al menú' : 'Back to menu'}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
