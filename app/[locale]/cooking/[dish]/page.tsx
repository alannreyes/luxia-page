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
    timeEs: '15-20 minutos',
    timeEn: '15-20 minutes',
    prerequisitesEs: ['Cuenta de Google (Gmail)', 'Node.js 20+ instalado'],
    prerequisitesEn: ['Google account (Gmail)', 'Node.js 20+ installed'],
    contentEs: `
## 🎯 Lo que vas a construir

En 15 minutos tendrás tu propio chatbot con IA corriendo en tu terminal. Podrás hacerle preguntas, mantener conversaciones, y todo **100% gratis**.

> **¿Por qué Gemini primero?** Es gratis, no pide tarjeta de crédito, y con tu cuenta de Google ya tienes acceso. Perfecto para tu primera experiencia con IA.

---

## ✅ Antes de empezar

Verifica que tienes todo listo:

| Requisito | ¿Cómo verificar? | ¿No lo tienes? |
|-----------|------------------|----------------|
| **Cuenta Google** | ¿Puedes entrar a Gmail? | [Crear cuenta](https://accounts.google.com) |
| **Node.js 20+** | Ejecuta \`node --version\` en terminal | Ver tabla abajo |

### Instalar Node.js (si no lo tienes)

| Sistema | Comando |
|---------|---------|
| **macOS** | \`brew install node\` |
| **Linux (Ubuntu/Debian)** | \`curl -fsSL https://deb.nodesource.com/setup_22.x \\| sudo -E bash - && sudo apt-get install -y nodejs\` |
| **Windows** | Descarga de [nodejs.org](https://nodejs.org) o usa \`winget install OpenJS.NodeJS\` |

> 💡 **Verificación**: Ejecuta \`node --version\` — debes ver \`v20.x.x\` o superior.

---

## 🔑 Paso 1: Obtener tu API Key (3 min)

1. Abre [Google AI Studio](https://aistudio.google.com/apikey)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Create API Key"**
4. Copia la key (empieza con \`AIza...\`)

> ⚠️ **Importante**: Guarda tu API key en un lugar seguro. No la compartas ni la subas a GitHub.

### ¿Cuánto puedo usar gratis?

| Modelo | Requests/día | Ideal para |
|--------|--------------|------------|
| **Gemini 2.5 Flash** | 1,000 | Respuestas rápidas |
| **Gemini 2.5 Pro** | 50 | Razonamiento complejo |

Más que suficiente para aprender y experimentar.

---

## 📁 Paso 2: Crear el proyecto (2 min)

Abre tu terminal y ejecuta estos comandos:

\`\`\`bash
mkdir mi-chatbot-gemini
cd mi-chatbot-gemini
npm init -y
npm install @google/genai
\`\`\`

> ✓ **Si ves "added X packages"** — vas bien.

---

## 🔐 Paso 3: Configurar la API Key (2 min)

Necesitas guardar tu API key como variable de entorno.

| Sistema | Archivo a editar | Comando para agregar |
|---------|------------------|---------------------|
| **macOS (zsh)** | \`~/.zshrc\` | \`echo 'export GEMINI_API_KEY="tu-key-aqui"' >> ~/.zshrc && source ~/.zshrc\` |
| **macOS (bash)** | \`~/.bash_profile\` | \`echo 'export GEMINI_API_KEY="tu-key-aqui"' >> ~/.bash_profile && source ~/.bash_profile\` |
| **Linux** | \`~/.bashrc\` | \`echo 'export GEMINI_API_KEY="tu-key-aqui"' >> ~/.bashrc && source ~/.bashrc\` |
| **Windows (PowerShell)** | Variable de sistema | \`[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "tu-key-aqui", "User")\` |

> 💡 **Verificación**: Ejecuta \`echo $GEMINI_API_KEY\` (macOS/Linux) o \`echo %GEMINI_API_KEY%\` (Windows CMD) — debes ver tu key.

---

## 💻 Paso 4: Escribir el chatbot (5 min)

Crea un archivo llamado \`chatbot.mjs\` con este contenido:

\`\`\`javascript
import { GoogleGenAI } from "@google/genai";
import * as readline from "readline";

// Conectar con Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Crear interfaz de chat
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Historial de conversación
const historial = [];

console.log("╔════════════════════════════════════════╗");
console.log("║  ✨ Chatbot con Gemini API             ║");
console.log("║  Escribe 'salir' para terminar         ║");
console.log("╚════════════════════════════════════════╝\\n");

async function chat(mensaje) {
  historial.push({ role: "user", parts: [{ text: mensaje }] });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: historial,
  });

  const respuesta = response.text;
  historial.push({ role: "model", parts: [{ text: respuesta }] });

  return respuesta;
}

function preguntar() {
  rl.question("Tú: ", async (input) => {
    if (input.toLowerCase() === "salir") {
      console.log("\\n👋 ¡Hasta pronto!");
      rl.close();
      return;
    }

    try {
      const respuesta = await chat(input);
      console.log(\`\\n🤖 Gemini: \${respuesta}\\n\`);
    } catch (error) {
      console.log(\`\\n❌ Error: \${error.message}\\n\`);
    }

    preguntar();
  });
}

preguntar();
\`\`\`

> 📝 **Nota**: Usamos \`.mjs\` para habilitar ES modules (import/export).

---

## 🚀 Paso 5: ¡Ejecutar! (1 min)

\`\`\`bash
node chatbot.mjs
\`\`\`

Deberías ver:
\`\`\`
╔════════════════════════════════════════╗
║  ✨ Chatbot con Gemini API             ║
║  Escribe 'salir' para terminar         ║
╚════════════════════════════════════════╝

Tú:
\`\`\`

**¡Pruébalo!** Escribe "Hola, ¿cómo estás?" y presiona Enter.

---

## 🔧 Solución de problemas

| Error | Causa | Solución |
|-------|-------|----------|
| \`API key not valid\` | Key incorrecta o no configurada | Verifica que \`echo $GEMINI_API_KEY\` muestre tu key |
| \`Cannot find module\` | Falta instalar dependencia | Ejecuta \`npm install @google/genai\` |
| \`ENOTFOUND\` | Sin conexión a internet | Verifica tu conexión |
| \`429 Too Many Requests\` | Excediste el límite | Espera 1 minuto o usa otro modelo |

---

## ✅ Lista de verificación final

- [ ] Node.js instalado y funcionando
- [ ] API key obtenida de Google AI Studio
- [ ] Variable de entorno configurada
- [ ] Proyecto creado con npm
- [ ] Archivo chatbot.mjs creado
- [ ] **¡Chatbot respondiendo!** 🎉

---

## 🎓 ¿Qué aprendiste?

| Concepto | Qué significa |
|----------|---------------|
| **API Key** | Tu "contraseña" para usar el servicio de Google |
| **Variable de entorno** | Forma segura de guardar secretos |
| **SDK** | Librería que facilita usar la API |
| **Historial** | Memoria de la conversación para contexto |

---

## ⏭️ Próximos pasos

Ahora que tienes tu primer chatbot, puedes:

→ [Chatbot con Claude API](/es/cooking/chatbot-claude) — Compara con el modelo de Anthropic
→ [Chatbot con OpenAI](/es/cooking/chatbot-openai) — Prueba GPT-4
→ [Chat con Interfaz Web](/es/cooking/chat-web-ui) — Dale una interfaz bonita

---

## 📚 Referencias

- [Documentación oficial de Gemini API](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://aistudio.google.com)
- [Precios y límites](https://ai.google.dev/gemini-api/docs/pricing)
    `,
    contentEn: `
## 🎯 What you'll build

In 15 minutes you'll have your own AI chatbot running in your terminal. You can ask it questions, have conversations, and it's **100% free**.

> **Why Gemini first?** It's free, doesn't require a credit card, and you already have access with your Google account. Perfect for your first AI experience.

---

## ✅ Before you start

Verify you have everything ready:

| Requirement | How to verify? | Don't have it? |
|-------------|----------------|----------------|
| **Google Account** | Can you log into Gmail? | [Create account](https://accounts.google.com) |
| **Node.js 20+** | Run \`node --version\` in terminal | See table below |

### Install Node.js (if you don't have it)

| System | Command |
|--------|---------|
| **macOS** | \`brew install node\` |
| **Linux (Ubuntu/Debian)** | \`curl -fsSL https://deb.nodesource.com/setup_22.x \\| sudo -E bash - && sudo apt-get install -y nodejs\` |
| **Windows** | Download from [nodejs.org](https://nodejs.org) or use \`winget install OpenJS.NodeJS\` |

> 💡 **Verification**: Run \`node --version\` — you should see \`v20.x.x\` or higher.

---

## 🔑 Step 1: Get your API Key (3 min)

1. Open [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with \`AIza...\`)

> ⚠️ **Important**: Save your API key somewhere safe. Don't share it or upload it to GitHub.

### How much can I use for free?

| Model | Requests/day | Ideal for |
|-------|--------------|-----------|
| **Gemini 2.5 Flash** | 1,000 | Fast responses |
| **Gemini 2.5 Pro** | 50 | Complex reasoning |

More than enough for learning and experimenting.

---

## 📁 Step 2: Create the project (2 min)

Open your terminal and run these commands:

\`\`\`bash
mkdir my-gemini-chatbot
cd my-gemini-chatbot
npm init -y
npm install @google/genai
\`\`\`

> ✓ **If you see "added X packages"** — you're on track.

---

## 🔐 Step 3: Configure the API Key (2 min)

You need to save your API key as an environment variable.

| System | File to edit | Command to add |
|--------|--------------|----------------|
| **macOS (zsh)** | \`~/.zshrc\` | \`echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.zshrc && source ~/.zshrc\` |
| **macOS (bash)** | \`~/.bash_profile\` | \`echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.bash_profile && source ~/.bash_profile\` |
| **Linux** | \`~/.bashrc\` | \`echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.bashrc && source ~/.bashrc\` |
| **Windows (PowerShell)** | System variable | \`[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-key-here", "User")\` |

> 💡 **Verification**: Run \`echo $GEMINI_API_KEY\` (macOS/Linux) or \`echo %GEMINI_API_KEY%\` (Windows CMD) — you should see your key.

---

## 💻 Step 4: Write the chatbot (5 min)

Create a file called \`chatbot.mjs\` with this content:

\`\`\`javascript
import { GoogleGenAI } from "@google/genai";
import * as readline from "readline";

// Connect to Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Create chat interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Conversation history
const history = [];

console.log("╔════════════════════════════════════════╗");
console.log("║  ✨ Chatbot with Gemini API            ║");
console.log("║  Type 'exit' to quit                   ║");
console.log("╚════════════════════════════════════════╝\\n");

async function chat(message) {
  history.push({ role: "user", parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: history,
  });

  const reply = response.text;
  history.push({ role: "model", parts: [{ text: reply }] });

  return reply;
}

function ask() {
  rl.question("You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("\\n👋 Goodbye!");
      rl.close();
      return;
    }

    try {
      const reply = await chat(input);
      console.log(\`\\n🤖 Gemini: \${reply}\\n\`);
    } catch (error) {
      console.log(\`\\n❌ Error: \${error.message}\\n\`);
    }

    ask();
  });
}

ask();
\`\`\`

> 📝 **Note**: We use \`.mjs\` to enable ES modules (import/export).

---

## 🚀 Step 5: Run it! (1 min)

\`\`\`bash
node chatbot.mjs
\`\`\`

You should see:
\`\`\`
╔════════════════════════════════════════╗
║  ✨ Chatbot with Gemini API            ║
║  Type 'exit' to quit                   ║
╚════════════════════════════════════════╝

You:
\`\`\`

**Try it!** Type "Hello, how are you?" and press Enter.

---

## 🔧 Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| \`API key not valid\` | Wrong or missing key | Verify \`echo $GEMINI_API_KEY\` shows your key |
| \`Cannot find module\` | Missing dependency | Run \`npm install @google/genai\` |
| \`ENOTFOUND\` | No internet connection | Check your connection |
| \`429 Too Many Requests\` | Rate limit exceeded | Wait 1 minute or use another model |

---

## ✅ Final checklist

- [ ] Node.js installed and working
- [ ] API key obtained from Google AI Studio
- [ ] Environment variable configured
- [ ] Project created with npm
- [ ] chatbot.mjs file created
- [ ] **Chatbot responding!** 🎉

---

## 🎓 What you learned

| Concept | What it means |
|---------|---------------|
| **API Key** | Your "password" to use Google's service |
| **Environment variable** | Secure way to store secrets |
| **SDK** | Library that makes using the API easier |
| **History** | Conversation memory for context |

---

## ⏭️ Next steps

Now that you have your first chatbot, you can:

→ [Chatbot with Claude API](/en/cooking/chatbot-claude) — Compare with Anthropic's model
→ [Chatbot with OpenAI](/en/cooking/chatbot-openai) — Try GPT-4
→ [Chat with Web UI](/en/cooking/chat-web-ui) — Give it a nice interface

---

## 📚 References

- [Official Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://aistudio.google.com)
- [Pricing and Limits](https://ai.google.dev/gemini-api/docs/pricing)
    `,
  },
  'chatbot-claude': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Node.js instalado', 'Cuenta en Anthropic'],
    prerequisitesEn: ['Node.js installed', 'Anthropic account'],
    contentEs: `
## El plato final

Un chatbot que usa Claude API, el modelo más avanzado de Anthropic, desde tu terminal.

---

## Ingredientes

- Node.js 22+
- API Key de Anthropic (console.anthropic.com)
- Editor de código

---

## Paso 1: Crear proyecto

\`\`\`bash
mkdir mi-chatbot && cd mi-chatbot
npm init -y
npm install @anthropic-ai/sdk readline
\`\`\`

---

## Paso 2: Configurar API Key

\`\`\`bash
# Agregar a tu ~/.zprofile o ~/.bashrc
export ANTHROPIC_API_KEY="tu-api-key-aqui"
source ~/.zprofile
\`\`\`

---

## Paso 3: Crear el chatbot

Crea \`chatbot.js\`:

\`\`\`javascript
import Anthropic from '@anthropic-ai/sdk';
import * as readline from 'readline';

const client = new Anthropic();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const messages = [];

async function chat(userMessage) {
  messages.push({ role: 'user', content: userMessage });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: messages
  });

  const assistantMessage = response.content[0].text;
  messages.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}

console.log('🤖 Chatbot con Claude API');
console.log('Escribe tu mensaje (o "salir" para terminar)\\n');

function prompt() {
  rl.question('Tú: ', async (input) => {
    if (input.toLowerCase() === 'salir') {
      console.log('👋 ¡Hasta luego!');
      rl.close();
      return;
    }

    const response = await chat(input);
    console.log(\`\\nClaude: \${response}\\n\`);
    prompt();
  });
}

prompt();
\`\`\`

---

## Paso 4: Ejecutar

\`\`\`bash
node chatbot.js
\`\`\`

---

## Verificación final

- [ ] API Key configurada
- [ ] Proyecto creado
- [ ] Chatbot respondiendo
- [ ] Conversación con contexto

---

## Próximos pasos

→ [RAG con Documentos](/es/cooking/rag-documents) - Chatea con tus propios archivos
    `,
    contentEn: `
## The final dish

A chatbot that uses Claude API, Anthropic's most advanced model, from your terminal.

---

## Ingredients

- Node.js 22+
- Anthropic API Key (console.anthropic.com)
- Code editor

---

## Step 1: Create project

\`\`\`bash
mkdir my-chatbot && cd my-chatbot
npm init -y
npm install @anthropic-ai/sdk readline
\`\`\`

---

## Step 2: Configure API Key

\`\`\`bash
# Add to your ~/.zprofile or ~/.bashrc
export ANTHROPIC_API_KEY="your-api-key-here"
source ~/.zprofile
\`\`\`

---

## Step 3: Create the chatbot

Create \`chatbot.js\`:

\`\`\`javascript
import Anthropic from '@anthropic-ai/sdk';
import * as readline from 'readline';

const client = new Anthropic();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const messages = [];

async function chat(userMessage) {
  messages.push({ role: 'user', content: userMessage });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: messages
  });

  const assistantMessage = response.content[0].text;
  messages.push({ role: 'assistant', content: assistantMessage });

  return assistantMessage;
}

console.log('🤖 Chatbot with Claude API');
console.log('Type your message (or "exit" to quit)\\n');

function prompt() {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('👋 Goodbye!');
      rl.close();
      return;
    }

    const response = await chat(input);
    console.log(\`\\nClaude: \${response}\\n\`);
    prompt();
  });
}

prompt();
\`\`\`

---

## Step 4: Run

\`\`\`bash
node chatbot.js
\`\`\`

---

## Final verification

- [ ] API Key configured
- [ ] Project created
- [ ] Chatbot responding
- [ ] Conversation with context

---

## Next steps

→ [RAG with Documents](/en/cooking/rag-documents) - Chat with your own files
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
