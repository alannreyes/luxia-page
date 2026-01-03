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
  { slug: 'chat-web-ui', titleEs: 'Chat IA con Interfaz Web', titleEn: 'AI Chat with Web UI', level: 'cocinero', icon: '💬' },
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
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Terminal básico', '8GB RAM mínimo'],
    prerequisitesEn: ['Basic Terminal', '8GB RAM minimum'],
    contentEs: `
## El plato final

Un chatbot corriendo 100% en tu computadora, sin internet, completamente privado. Ideal para datos sensibles.

---

## Por qué un modelo local

| Ventaja | Detalle |
|---------|---------|
| **Privacidad total** | Tus datos nunca salen de tu máquina |
| **Sin costos** | Gratis después de descargarlo |
| **Offline** | Funciona sin internet |
| **Aprendizaje** | Entiende cómo funcionan los LLMs |

---

## Ingredientes

- macOS, Linux o Windows con WSL
- 8GB de RAM mínimo (16GB recomendado)
- 5GB de espacio en disco

---

## Paso 1: Instalar Ollama

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install ollama\` |
| **Linux** | \`curl -fsSL https://ollama.ai/install.sh \\| sh\` |
| **Windows** | \`winget install Ollama.Ollama\` |

---

## Paso 2: Descargar un modelo

\`\`\`bash
# Modelo pequeño (3B parámetros, ~2GB)
ollama pull llama3.2

# O modelo más capaz (8B parámetros, ~5GB)
ollama pull llama3.2:8b
\`\`\`

> 💡 **Tip**: Empieza con el modelo pequeño. Siempre puedes descargar uno más grande después.

---

## Paso 3: ¡Chatear!

\`\`\`bash
ollama run llama3.2
\`\`\`

Escribe tu mensaje y presiona Enter. Para salir escribe \`/bye\`.

---

## Verificación final

- [ ] Ollama instalado (\`ollama --version\`)
- [ ] Modelo descargado (\`ollama list\`)
- [ ] Chat funcionando

---

## Próximos pasos

→ [RAG con Documentos](/es/cooking/rag-documents) - Agrega tus propios archivos al contexto
    `,
    contentEn: `
## The final dish

A chatbot running 100% on your computer, without internet, completely private. Ideal for sensitive data.

---

## Why a local model

| Advantage | Detail |
|-----------|--------|
| **Total privacy** | Your data never leaves your machine |
| **No costs** | Free after downloading |
| **Offline** | Works without internet |
| **Learning** | Understand how LLMs work |

---

## Ingredients

- macOS, Linux or Windows with WSL
- 8GB RAM minimum (16GB recommended)
- 5GB disk space

---

## Step 1: Install Ollama

| System | Command |
|--------|---------|
| **macOS** | \`brew install ollama\` |
| **Linux** | \`curl -fsSL https://ollama.ai/install.sh \\| sh\` |
| **Windows** | \`winget install Ollama.Ollama\` |

---

## Step 2: Download a model

\`\`\`bash
# Small model (3B parameters, ~2GB)
ollama pull llama3.2

# Or more capable model (8B parameters, ~5GB)
ollama pull llama3.2:8b
\`\`\`

> 💡 **Tip**: Start with the small model. You can always download a bigger one later.

---

## Step 3: Chat!

\`\`\`bash
ollama run llama3.2
\`\`\`

Type your message and press Enter. To exit type \`/bye\`.

---

## Final verification

- [ ] Ollama installed (\`ollama --version\`)
- [ ] Model downloaded (\`ollama list\`)
- [ ] Chat working

---

## Next steps

→ [RAG with Documents](/en/cooking/rag-documents) - Add your own files to the context
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
