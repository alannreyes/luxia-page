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

## 💼 Caso Real: Chatbot para Fintech

Si quieres adaptar este chatbot para servicios financieros, hay consideraciones importantes de seguridad y compliance.

### System Prompt Seguro

Agrega restricciones claras al comportamiento del bot:

\`\`\`javascript
const systemPrompt = \`Eres un asistente financiero. Reglas estrictas:
- NUNCA des consejos de inversión específicos ("compra X acción")
- NUNCA solicites datos sensibles (números de tarjeta, contraseñas, CVV)
- Siempre recomienda consultar con un asesor financiero certificado
- Si detectas intención de fraude o phishing, responde: "No puedo ayudar con eso"
- Incluye disclaimer: "Esto es información general, no asesoría financiera"\`;

// Usar en la llamada a la API
const response = await ai.generateContent({
  systemInstruction: systemPrompt,
  contents: [{ role: "user", parts: [{ text: userMessage }] }]
});
\`\`\`

### Consideraciones de Compliance

| Requisito | Por qué | Cómo implementarlo |
|-----------|---------|-------------------|
| **Logging** | Auditoría regulatoria | Guarda todas las conversaciones con timestamp |
| **Rate limiting** | Prevenir abuso | Máx 10 mensajes/minuto por usuario |
| **Disclaimer visible** | Protección legal | Footer: "No es asesoría financiera" |
| **No guardar datos sensibles** | PCI DSS / GDPR | Filtrar antes de guardar en logs |

### Ejemplo de Logging para Auditoría

\`\`\`javascript
const logConversation = async (userId, message, response) => {
  await db.insert('chat_logs', {
    user_id: userId,
    timestamp: new Date().toISOString(),
    user_message: sanitize(message), // Remover datos sensibles
    bot_response: response,
    session_id: sessionId
  });
};
\`\`\`

> 📖 Aprende más sobre seguridad en [Autenticación](/es/learning/auth) y [APIs Seguras](/es/learning/apis)

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

## 💼 Real Case: Fintech Chatbot

If you want to adapt this chatbot for financial services, there are important security and compliance considerations.

### Secure System Prompt

Add clear restrictions to the bot's behavior:

\`\`\`javascript
const systemPrompt = \`You are a financial assistant. Strict rules:
- NEVER give specific investment advice ("buy X stock")
- NEVER request sensitive data (card numbers, passwords, CVV)
- Always recommend consulting with a certified financial advisor
- If you detect fraud or phishing intent, respond: "I cannot help with that"
- Include disclaimer: "This is general information, not financial advice"\`;

// Use in the API call
const response = await ai.generateContent({
  systemInstruction: systemPrompt,
  contents: [{ role: "user", parts: [{ text: userMessage }] }]
});
\`\`\`

### Compliance Considerations

| Requirement | Why | How to implement |
|-------------|-----|------------------|
| **Logging** | Regulatory audit | Save all conversations with timestamp |
| **Rate limiting** | Prevent abuse | Max 10 messages/minute per user |
| **Visible disclaimer** | Legal protection | Footer: "Not financial advice" |
| **Don't store sensitive data** | PCI DSS / GDPR | Filter before saving to logs |

### Audit Logging Example

\`\`\`javascript
const logConversation = async (userId, message, response) => {
  await db.insert('chat_logs', {
    user_id: userId,
    timestamp: new Date().toISOString(),
    user_message: sanitize(message), // Remove sensitive data
    bot_response: response,
    session_id: sessionId
  });
};
\`\`\`

> 📖 Learn more about security in [Authentication](/en/learning/auth) and [Secure APIs](/en/learning/apis)

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
## Lo que vas a construir

Vas a instalar Ollama y correr un modelo de IA directamente en tu computadora, sin internet y sin API keys.
Descargarás un modelo como Llama 3.2, lo ejecutarás en tu terminal, y podrás chatear con él.
Al terminar, tendrás tu propio chatbot local que funciona offline, es completamente privado, y no tiene costos por uso.
Ideal para datos sensibles, aprender cómo funcionan los LLMs, o simplemente tener IA siempre disponible.

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
## What you'll build

You'll install Ollama and run an AI model directly on your computer, without internet and without API keys.
You'll download a model like Llama 3.2, run it in your terminal, and chat with it.
When you're done, you'll have your own local chatbot that works offline, is completely private, and has no usage costs.
Ideal for sensitive data, learning how LLMs work, or simply having AI always available.

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
## Lo que vas a construir

Una aplicación web de chat con inteligencia artificial, completa y funcional. Tendrás una interfaz moderna con burbujas de conversación, un input para escribir mensajes, indicador de "escribiendo...", y respuestas renderizadas en Markdown. Tu chatbot de terminal se convertirá en algo que cualquiera puede usar desde el navegador.

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
## What you'll build

A complete and functional web chat application with artificial intelligence. You'll have a modern interface with conversation bubbles, a message input field, a "typing..." indicator, and responses rendered in Markdown. Your terminal chatbot will transform into something anyone can use from their browser.

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

## Aprende más

→ [Editores y AI Assistants](/es/learning/editors) — Comparativa completa: Claude Code vs Copilot vs Cursor vs Aider

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

## Learn more

→ [Editors & AI Assistants](/en/learning/editors) — Full comparison: Claude Code vs Copilot vs Cursor vs Aider

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

## Paso 4: Crear .gitignore (¡CRÍTICO!)

> ⚠️ **SIEMPRE** crea \`.gitignore\` ANTES del primer commit

\`\`\`bash
# Crea el archivo .gitignore
cat > .gitignore << 'EOF'
# Secretos - NUNCA subir
.env
.env.local
*.env
credentials.json
*.pem
*.key

# Dependencias
node_modules/
venv/

# Build
dist/
build/

# Sistema
.DS_Store
EOF
\`\`\`

### ¿Por qué es tan importante?

| Sin .gitignore | Con .gitignore |
|----------------|----------------|
| Subes \`.env\` con API keys | Protegido automáticamente |
| La IA puede commitear secretos | Git los ignora siempre |
| Tus credenciales en GitHub público | Seguras en tu máquina |

---

## Paso 5: Tu primer commit

\`\`\`bash
# Añade los archivos al "staging"
git add .

# Guarda el estado (commit)
git commit -m "Primer commit con .gitignore"
\`\`\`

¡Guardaste tu primer estado!

---

## Paso 6: Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: \`mi-proyecto\`
3. Déjalo público o privado
4. **NO** marques "Initialize with README"
5. Click en **Create repository**

---

## Paso 7: Conectar y subir

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

## 🤖 Tip: Checkpoints antes de usar IA

Si usas Cursor, Claude Code u otro asistente de IA:

\`\`\`bash
# ANTES de pedirle algo a la IA
git add . && git commit -m "Checkpoint antes de cambios con IA"

# Si la IA rompe algo, vuelves fácil
git reset --hard HEAD
\`\`\`

> La IA es poderosa pero a veces malinterpreta. Git es tu red de seguridad.

---

## Próximo paso

→ [Mi Configuración Dotfiles](/es/cooking/dotfiles) — Personaliza tu entorno

---

## 📖 Quiero aprender más

→ [Git & GitHub (Teoría completa)](/es/learning/git) — Conceptos, branches, .gitignore y más
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

## Step 4: Create .gitignore (CRITICAL!)

> ⚠️ **ALWAYS** create \`.gitignore\` BEFORE the first commit

\`\`\`bash
# Create the .gitignore file
cat > .gitignore << 'EOF'
# Secrets - NEVER upload
.env
.env.local
*.env
credentials.json
*.pem
*.key

# Dependencies
node_modules/
venv/

# Build
dist/
build/

# System
.DS_Store
EOF
\`\`\`

### Why is it so important?

| Without .gitignore | With .gitignore |
|--------------------|-----------------|
| Upload \`.env\` with API keys | Automatically protected |
| AI can commit secrets | Git always ignores them |
| Your credentials on public GitHub | Safe on your machine |

---

## Step 5: Your first commit

\`\`\`bash
# Add files to "staging"
git add .

# Save the state (commit)
git commit -m "First commit with .gitignore"
\`\`\`

You saved your first state!

---

## Step 6: Create repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Name: \`my-project\`
3. Leave it public or private
4. **DON'T** check "Initialize with README"
5. Click **Create repository**

---

## Step 7: Connect and push

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

## 🤖 Tip: Checkpoints before using AI

If you use Cursor, Claude Code or another AI assistant:

\`\`\`bash
# BEFORE asking the AI for something
git add . && git commit -m "Checkpoint before AI changes"

# If the AI breaks something, you can easily revert
git reset --hard HEAD
\`\`\`

> AI is powerful but sometimes misunderstands. Git is your safety net.

---

## Next step

→ [My Dotfiles Setup](/en/cooking/dotfiles) — Customize your environment

---

## 📖 I want to learn more

→ [Git & GitHub (Full Theory)](/en/learning/git) — Concepts, branches, .gitignore and more
    `,
  },
  'dotfiles': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Mi Primer Repositorio completado'],
    prerequisitesEn: ['My First Repository completed'],
    contentEs: `
## Lo que vas a construir

Vas a crear tu propio repositorio de dotfiles: un lugar en GitHub donde guardarás todos tus archivos de configuración (.zshrc, .gitconfig, etc.).
Copiarás tus configuraciones actuales, crearás un script de instalación automática, y subirás todo a GitHub.
Al terminar, tendrás un sistema que te permite configurar cualquier computadora nueva con un solo comando.
Cada vez que mejores una configuración, la actualizas en el repo y queda sincronizada para siempre.

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
## What you'll build

You'll create your own dotfiles repository: a place on GitHub where you'll store all your configuration files (.zshrc, .gitconfig, etc.).
You'll copy your current configurations, create an automatic installation script, and push everything to GitHub.
When you're done, you'll have a system that lets you configure any new computer with a single command.
Every time you improve a configuration, you update the repo and it stays synced forever.

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
## Lo que vas a construir

Vas a crear tu primera página web personal usando HTML y CSS, con ayuda de una IA para generar el código.
Crearás una carpeta, pedirás a una IA que genere una página con tu información, y la abrirás en el navegador.
Al terminar, tendrás un archivo index.html funcionando que puedes personalizar, mejorar, y eventualmente publicar.
Es el primer paso para crear portfolios, landing pages, o cualquier sitio web estático.

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
## What you'll build

You'll create your first personal web page using HTML and CSS, with AI help to generate the code.
You'll create a folder, ask an AI to generate a page with your information, and open it in the browser.
When you're done, you'll have a working index.html file that you can customize, improve, and eventually publish.
It's the first step to creating portfolios, landing pages, or any static website.

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
## Lo que vas a construir

Vas a crear tu primer script de Bash: un archivo que ejecuta múltiples comandos automáticamente.
Escribirás un script simple que muestra información del sistema, y luego uno más útil que crea proyectos con estructura lista.
Al terminar, tendrás scripts reutilizables que puedes ejecutar con un solo comando para automatizar tareas repetitivas.
Es la base para crear herramientas propias, automatizar backups, deployments, y cualquier tarea de terminal.

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
## What you'll build

You'll create your first Bash script: a file that executes multiple commands automatically.
You'll write a simple script that shows system information, and then a more useful one that creates projects with ready structure.
When you're done, you'll have reusable scripts you can run with a single command to automate repetitive tasks.
It's the foundation for creating your own tools, automating backups, deployments, and any terminal task.

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
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['Terminal básica', '4GB RAM mínimo'],
    prerequisitesEn: ['Basic terminal', '4GB RAM minimum'],
    contentEs: `
## Lo que vas a construir

Vas a instalar Docker y crear tu primer contenedor: una app Node.js empaquetada que funciona igual en cualquier computadora.
Aprenderás a correr contenedores de Ubuntu, bases de datos como PostgreSQL, y a usar volúmenes para no perder datos.
Al terminar, tendrás una app Dockerizada con su Dockerfile, docker-compose.yml, y la capacidad de levantar servicios con un comando.
Es la base para trabajar en equipos donde "en mi máquina funciona" ya no será un problema.

---

## Paso 1: Instalar Docker

| Sistema | Instalación |
|---------|-------------|
| **macOS** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Windows** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Linux** | \`curl -fsSL https://get.docker.com | sh\` |

Verifica:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

> ⚠️ **Windows**: Necesitas WSL2 habilitado. Docker Desktop te guía en la instalación.

---

## Paso 2: Tu primer contenedor

\`\`\`bash
# Descarga y corre Ubuntu en segundos
docker run -it ubuntu bash

# Ahora estás DENTRO del contenedor
cat /etc/os-release   # Verás "Ubuntu"
apt update            # Funciona como Linux real
exit                  # Sales del contenedor
\`\`\`

**¿Qué pasó?** Docker descargó una imagen de Ubuntu (~30MB, no 4GB) y la ejecutó **aislada** de tu sistema.

---

## Paso 3: Corre servicios útiles

Docker brilla cuando necesitas bases de datos o servicios sin instalar nada permanente:

\`\`\`bash
# PostgreSQL listo en 10 segundos
docker run -d --name mi-postgres \\
  -e POSTGRES_PASSWORD=secreto \\
  -p 5432:5432 \\
  postgres:16-alpine

# Redis para caché
docker run -d --name mi-redis -p 6379:6379 redis:alpine

# Adminer (interfaz web para bases de datos)
docker run -d --name adminer -p 8080:8080 adminer
\`\`\`

Abre http://localhost:8080 para ver Adminer funcionando.

**⚠️ PROBLEMA:** Si haces \`docker rm mi-postgres\`, pierdes TODOS los datos. Sigue leyendo para solucionarlo.

---

## Paso 4: Volúmenes (Datos Persistentes)

**El problema más común de principiantes:** Crean una base de datos, guardan datos, eliminan el contenedor... y pierden todo.

### ¿Por qué pasa esto?

\`\`\`
SIN VOLUMEN:
┌─────────────────────────┐
│     Contenedor          │
│  ┌─────────────────┐    │
│  │   Base de datos │    │  ← Los datos viven DENTRO
│  │   (tus datos)   │    │     del contenedor
│  └─────────────────┘    │
└─────────────────────────┘
        ↓
   docker rm postgres
        ↓
   💀 DATOS PERDIDOS

CON VOLUMEN:
┌─────────────────────────┐      ┌─────────────────┐
│     Contenedor          │      │    Volumen      │
│  ┌─────────────────┐    │ ──── │  (tu disco)     │
│  │   Base de datos │────│──────│   tus datos     │
│  └─────────────────┘    │      └─────────────────┘
└─────────────────────────┘              ↓
        ↓                         Los datos están
   docker rm postgres             FUERA del contenedor
        ↓                                ↓
   Contenedor eliminado           ✅ DATOS SEGUROS
\`\`\`

### Crear PostgreSQL con volumen persistente

\`\`\`bash
# Crea un volumen con nombre
docker volume create postgres_data

# Corre PostgreSQL usando ese volumen
docker run -d --name mi-postgres \\
  -e POSTGRES_PASSWORD=secreto \\
  -e POSTGRES_USER=dev \\
  -e POSTGRES_DB=miapp \\
  -p 5432:5432 \\
  -v postgres_data:/var/lib/postgresql/data \\
  postgres:16-alpine
\`\`\`

**La magia está en \`-v postgres_data:/var/lib/postgresql/data\`**:
- \`postgres_data\` = nombre del volumen en tu máquina
- \`/var/lib/postgresql/data\` = donde Postgres guarda datos dentro del contenedor

### Prueba que funciona

\`\`\`bash
# Conecta y crea una tabla
docker exec -it mi-postgres psql -U dev -d miapp -c "CREATE TABLE test (id INT);"
docker exec -it mi-postgres psql -U dev -d miapp -c "INSERT INTO test VALUES (1), (2), (3);"

# Elimina el contenedor
docker stop mi-postgres && docker rm mi-postgres

# Crea uno nuevo con el MISMO volumen
docker run -d --name mi-postgres \\
  -e POSTGRES_PASSWORD=secreto \\
  -e POSTGRES_USER=dev \\
  -e POSTGRES_DB=miapp \\
  -p 5432:5432 \\
  -v postgres_data:/var/lib/postgresql/data \\
  postgres:16-alpine

# Verifica que los datos siguen ahí
docker exec -it mi-postgres psql -U dev -d miapp -c "SELECT * FROM test;"
# Resultado: 1, 2, 3 ✅
\`\`\`

### Comandos de volúmenes

| Comando | Qué hace |
|---------|----------|
| \`docker volume create nombre\` | Crea un volumen |
| \`docker volume ls\` | Lista todos los volúmenes |
| \`docker volume inspect nombre\` | Ver detalles (ubicación real) |
| \`docker volume rm nombre\` | Elimina volumen (¡y sus datos!) |
| \`docker volume prune\` | Elimina volúmenes no usados |

### Tipos de montaje

| Tipo | Sintaxis | Uso |
|------|----------|-----|
| **Named Volume** | \`-v mi_volumen:/data\` | Producción, bases de datos |
| **Bind Mount** | \`-v ./local:/data\` | Desarrollo, ver cambios en vivo |
| **Anonymous** | \`-v /data\` | Temporal, no recomendado |

**Ejemplo de Bind Mount para desarrollo:**

\`\`\`bash
# Tu código local se sincroniza con el contenedor
docker run -d --name mi-app \\
  -v $(pwd):/app \\
  -p 3000:3000 \\
  node:20-alpine npm start
\`\`\`

Cambias un archivo → el contenedor lo ve inmediatamente.

---

## Paso 5: Crea tu propia imagen

Ahora que entiendes contenedores y volúmenes, crea tu propia imagen.

Crea una carpeta \`docker-hello\` con estos 3 archivos:

**Dockerfile:**

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

**index.js:**

\`\`\`javascript
console.log("¡Hola desde Docker! 🐳");
console.log("Fecha:", new Date().toISOString());
console.log("Node version:", process.version);
\`\`\`

**package.json:**

\`\`\`json
{ "name": "docker-hello", "version": "1.0.0" }
\`\`\`

Construye y ejecuta:

\`\`\`bash
docker build -t mi-app .
docker run mi-app
\`\`\`

---

## Paso 6: Instala Portainer (Gestión Visual)

**Portainer** es una interfaz web para Docker. Perfecto para principiantes:

\`\`\`bash
# Crea un volumen para persistir datos
docker volume create portainer_data

# Instala Portainer
docker run -d -p 9000:9000 \\
  --name portainer \\
  --restart=always \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v portainer_data:/data \\
  portainer/portainer-ce:latest
\`\`\`

Abre **http://localhost:9000** y crea tu usuario admin.

**¿Qué puedes hacer con Portainer?**
- Ver todos tus contenedores en una tabla
- Iniciar/detener/eliminar con un click
- Ver logs en tiempo real
- Crear contenedores sin comandos
- Gestionar imágenes, volúmenes, redes

> 💡 **Tip**: Deja Portainer corriendo siempre. Es como el "Finder" o "Explorer" pero para Docker.

---

## 🛠️ Herramientas de gestión

| Herramienta | Tipo | Ideal para |
|-------------|------|------------|
| [Portainer](https://portainer.io) | UI local/servidor | Gestionar Docker visualmente |
| [Docker Desktop](https://docker.com/products/docker-desktop) | App desktop | Mac/Windows, incluye UI básica |
| [Lazydocker](https://github.com/jesseduffield/lazydocker) | TUI terminal | Fans de la terminal |

### Para deploy en producción

| Herramienta | Descripción | Costo |
|-------------|-------------|-------|
| [EasyPanel](https://easypanel.io) | Deploy como Heroku, pero en tu VPS | Gratis self-hosted |
| [Coolify](https://coolify.io) | Open source, muy completo | Gratis self-hosted |
| [Dokku](https://dokku.com) | Mini-Heroku en tu servidor | Gratis |
| [CapRover](https://caprover.com) | PaaS simple con Let's Encrypt | Gratis |

> 🎯 **Recomendación para principiantes**: Usa **Portainer** para aprender, luego **EasyPanel** o **Coolify** cuando quieras deploy fácil.

---

## Comandos esenciales

| Comando | Qué hace |
|---------|----------|
| \`docker run -d nombre\` | Corre en background |
| \`docker ps\` | Lista contenedores activos |
| \`docker ps -a\` | Lista TODOS (incluso detenidos) |
| \`docker logs nombre\` | Ver logs |
| \`docker logs -f nombre\` | Logs en tiempo real |
| \`docker stop nombre\` | Detener contenedor |
| \`docker rm nombre\` | Eliminar contenedor |
| \`docker images\` | Lista imágenes descargadas |
| \`docker rmi nombre\` | Eliminar imagen |
| \`docker system prune\` | Limpia todo lo no usado |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`daemon not running\` | Docker no está corriendo | Abre Docker Desktop |
| \`permission denied\` | Sin permisos | Linux: \`sudo usermod -aG docker $USER\` y reinicia sesión |
| \`port already in use\` | Puerto ocupado | Cambia el puerto: \`-p 9001:9000\` |
| \`no space left\` | Disco lleno de imágenes | \`docker system prune -a\` |
| \`cannot connect\` a localhost | Contenedor no expone puerto | Agrega \`-p puerto:puerto\` |

---

## Lo que aprendiste

✅ Instalar Docker y verificar que funcione
✅ Correr contenedores pre-hechos (Ubuntu, Postgres, Redis)
✅ **Usar volúmenes para no perder datos** (el error #1 de principiantes)
✅ Crear tu propia imagen con Dockerfile
✅ Usar Portainer para gestión visual
✅ Comandos esenciales para el día a día

---

## Próximos pasos

→ [Consumir una API JSON](/es/cooking/json-api-fetch) — Conecta tu app con datos reales
→ [Deploy con Docker](/es/cooking/docker-deploy) — Lleva tu contenedor a producción
→ [Docker Básico (teoría)](/es/learning/docker-intro) — Entiende containers vs VMs
    `,
    contentEn: `
## What you'll build

You'll install Docker and create your first container: a Node.js app packaged to work identically on any computer.
You'll learn to run Ubuntu containers, databases like PostgreSQL, and use volumes to avoid losing data.
When you're done, you'll have a Dockerized app with its Dockerfile, docker-compose.yml, and the ability to spin up services with one command.
It's the foundation for working in teams where "it works on my machine" will no longer be a problem.

---

## Step 1: Install Docker

| System | Installation |
|--------|--------------|
| **macOS** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Windows** | [Docker Desktop](https://docker.com/products/docker-desktop) |
| **Linux** | \`curl -fsSL https://get.docker.com | sh\` |

Verify:

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

> ⚠️ **Windows**: You need WSL2 enabled. Docker Desktop guides you through installation.

---

## Step 2: Your first container

\`\`\`bash
# Download and run Ubuntu in seconds
docker run -it ubuntu bash

# Now you're INSIDE the container
cat /etc/os-release   # You'll see "Ubuntu"
apt update            # Works like real Linux
exit                  # Exit the container
\`\`\`

**What happened?** Docker downloaded an Ubuntu image (~30MB, not 4GB) and ran it **isolated** from your system.

---

## Step 3: Run useful services

Docker shines when you need databases or services without permanent installation:

\`\`\`bash
# PostgreSQL ready in 10 seconds
docker run -d --name my-postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -p 5432:5432 \\
  postgres:16-alpine

# Redis for caching
docker run -d --name my-redis -p 6379:6379 redis:alpine

# Adminer (web interface for databases)
docker run -d --name adminer -p 8080:8080 adminer
\`\`\`

Open http://localhost:8080 to see Adminer running.

**⚠️ PROBLEM:** If you run \`docker rm my-postgres\`, you lose ALL the data. Keep reading to fix this.

---

## Step 4: Volumes (Persistent Data)

**The most common beginner mistake:** They create a database, save data, remove the container... and lose everything.

### Why does this happen?

\`\`\`
WITHOUT VOLUME:
┌─────────────────────────┐
│      Container          │
│  ┌─────────────────┐    │
│  │    Database     │    │  ← Data lives INSIDE
│  │   (your data)   │    │     the container
│  └─────────────────┘    │
└─────────────────────────┘
        ↓
   docker rm postgres
        ↓
   💀 DATA LOST

WITH VOLUME:
┌─────────────────────────┐      ┌─────────────────┐
│      Container          │      │     Volume      │
│  ┌─────────────────┐    │ ──── │  (your disk)    │
│  │    Database     │────│──────│   your data     │
│  └─────────────────┘    │      └─────────────────┘
└─────────────────────────┘              ↓
        ↓                         Data is stored
   docker rm postgres             OUTSIDE container
        ↓                                ↓
   Container removed              ✅ DATA SAFE
\`\`\`

### Create PostgreSQL with persistent volume

\`\`\`bash
# Create a named volume
docker volume create postgres_data

# Run PostgreSQL using that volume
docker run -d --name my-postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_USER=dev \\
  -e POSTGRES_DB=myapp \\
  -p 5432:5432 \\
  -v postgres_data:/var/lib/postgresql/data \\
  postgres:16-alpine
\`\`\`

**The magic is in \`-v postgres_data:/var/lib/postgresql/data\`**:
- \`postgres_data\` = volume name on your machine
- \`/var/lib/postgresql/data\` = where Postgres stores data inside the container

### Test that it works

\`\`\`bash
# Connect and create a table
docker exec -it my-postgres psql -U dev -d myapp -c "CREATE TABLE test (id INT);"
docker exec -it my-postgres psql -U dev -d myapp -c "INSERT INTO test VALUES (1), (2), (3);"

# Remove the container
docker stop my-postgres && docker rm my-postgres

# Create a new one with the SAME volume
docker run -d --name my-postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_USER=dev \\
  -e POSTGRES_DB=myapp \\
  -p 5432:5432 \\
  -v postgres_data:/var/lib/postgresql/data \\
  postgres:16-alpine

# Verify the data is still there
docker exec -it my-postgres psql -U dev -d myapp -c "SELECT * FROM test;"
# Result: 1, 2, 3 ✅
\`\`\`

### Volume commands

| Command | What it does |
|---------|--------------|
| \`docker volume create name\` | Create a volume |
| \`docker volume ls\` | List all volumes |
| \`docker volume inspect name\` | See details (real location) |
| \`docker volume rm name\` | Delete volume (and its data!) |
| \`docker volume prune\` | Delete unused volumes |

### Mount types

| Type | Syntax | Use case |
|------|--------|----------|
| **Named Volume** | \`-v my_volume:/data\` | Production, databases |
| **Bind Mount** | \`-v ./local:/data\` | Development, live reload |
| **Anonymous** | \`-v /data\` | Temporary, not recommended |

**Bind Mount example for development:**

\`\`\`bash
# Your local code syncs with the container
docker run -d --name my-app \\
  -v $(pwd):/app \\
  -p 3000:3000 \\
  node:20-alpine npm start
\`\`\`

Change a file → the container sees it immediately.

---

## Step 5: Create your own image

Now that you understand containers and volumes, create your own image.

Create a \`docker-hello\` folder with these 3 files:

**Dockerfile:**

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
\`\`\`

**index.js:**

\`\`\`javascript
console.log("Hello from Docker! 🐳");
console.log("Date:", new Date().toISOString());
console.log("Node version:", process.version);
\`\`\`

**package.json:**

\`\`\`json
{ "name": "docker-hello", "version": "1.0.0" }
\`\`\`

Build and run:

\`\`\`bash
docker build -t my-app .
docker run my-app
\`\`\`

---

## Step 6: Install Portainer (Visual Management)

**Portainer** is a web interface for Docker. Perfect for beginners:

\`\`\`bash
# Create a volume to persist data
docker volume create portainer_data

# Install Portainer
docker run -d -p 9000:9000 \\
  --name portainer \\
  --restart=always \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v portainer_data:/data \\
  portainer/portainer-ce:latest
\`\`\`

Open **http://localhost:9000** and create your admin user.

**What can you do with Portainer?**
- See all your containers in a table
- Start/stop/remove with one click
- View logs in real-time
- Create containers without commands
- Manage images, volumes, networks

> 💡 **Tip**: Keep Portainer running always. It's like "Finder" or "Explorer" but for Docker.

---

## 🛠️ Management tools

| Tool | Type | Ideal for |
|------|------|-----------|
| [Portainer](https://portainer.io) | Local/server UI | Visual Docker management |
| [Docker Desktop](https://docker.com/products/docker-desktop) | Desktop app | Mac/Windows, includes basic UI |
| [Lazydocker](https://github.com/jesseduffield/lazydocker) | Terminal TUI | Terminal fans |

### For production deployment

| Tool | Description | Cost |
|------|-------------|------|
| [EasyPanel](https://easypanel.io) | Deploy like Heroku, but on your VPS | Free self-hosted |
| [Coolify](https://coolify.io) | Open source, very complete | Free self-hosted |
| [Dokku](https://dokku.com) | Mini-Heroku on your server | Free |
| [CapRover](https://caprover.com) | Simple PaaS with Let's Encrypt | Free |

> 🎯 **Recommendation for beginners**: Use **Portainer** to learn, then **EasyPanel** or **Coolify** when you want easy deployment.

---

## Essential commands

| Command | What it does |
|---------|--------------|
| \`docker run -d name\` | Run in background |
| \`docker ps\` | List active containers |
| \`docker ps -a\` | List ALL (even stopped) |
| \`docker logs name\` | View logs |
| \`docker logs -f name\` | Real-time logs |
| \`docker stop name\` | Stop container |
| \`docker rm name\` | Remove container |
| \`docker images\` | List downloaded images |
| \`docker rmi name\` | Remove image |
| \`docker system prune\` | Clean all unused |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`daemon not running\` | Docker not running | Open Docker Desktop |
| \`permission denied\` | No permissions | Linux: \`sudo usermod -aG docker $USER\` and restart session |
| \`port already in use\` | Port occupied | Change port: \`-p 9001:9000\` |
| \`no space left\` | Disk full of images | \`docker system prune -a\` |
| \`cannot connect\` to localhost | Container not exposing port | Add \`-p port:port\` |

---

## What you learned

✅ Install Docker and verify it works
✅ Run pre-made containers (Ubuntu, Postgres, Redis)
✅ **Use volumes to not lose data** (beginner's #1 mistake)
✅ Create your own image with Dockerfile
✅ Use Portainer for visual management
✅ Essential commands for daily use

---

## Next steps

→ [Consume a JSON API](/en/cooking/json-api-fetch) — Connect your app with real data
→ [Deploy with Docker](/en/cooking/docker-deploy) — Take your container to production
→ [Docker Basics (theory)](/en/learning/docker-intro) — Understand containers vs VMs
    `,
  },
  'json-api-fetch': {
    timeEs: '15 minutos',
    timeEn: '15 minutes',
    prerequisitesEs: ['Node.js instalado'],
    prerequisitesEn: ['Node.js installed'],
    contentEs: `
## Lo que vas a construir

En este proyecto vas a aprender a obtener datos de internet usando APIs.

Crearás un script que se conecta a una API pública, descarga información de usuarios, y la muestra formateada en tu terminal. Esta es la base de cualquier aplicación moderna: obtener datos externos y procesarlos.

Al terminar entenderás cómo funcionan las APIs REST y podrás conectarte a cualquier servicio que ofrezca una.

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
## What you'll build

In this project you'll learn how to fetch data from the internet using APIs.

You'll create a script that connects to a public API, downloads user information, and displays it formatted in your terminal. This is the foundation of any modern application: getting external data and processing it.

When finished, you'll understand how REST APIs work and be able to connect to any service that offers one.

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
## Lo que vas a construir

Vas a crear tu propio sistema de notas en Markdown: una estructura de carpetas organizada para documentar todo lo que aprendes.
Aprenderás la sintaxis de Markdown, crearás templates para diferentes tipos de notas, y organizarás todo en carpetas temáticas.
Al terminar, tendrás un sistema personal de conocimiento con notas de aprendizaje, proyectos, y un diario de progreso.
Puedes versionarlo con Git, sincronizarlo en la nube, o usarlo con apps como Obsidian para tener tu segundo cerebro.

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
## What you'll build

You'll create your own Markdown notes system: an organized folder structure to document everything you learn.
You'll learn Markdown syntax, create templates for different types of notes, and organize everything in thematic folders.
When you're done, you'll have a personal knowledge system with learning notes, projects, and a progress journal.
You can version it with Git, sync it to the cloud, or use it with apps like Obsidian to have your second brain.

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
## Lo que vas a construir

Vas a aprender el flujo completo de colaboración en Git: clonar repos, crear ramas, hacer commits, y abrir Pull Requests.
Practicarás el ciclo de trabajo en equipo simulando contribuciones a un proyecto, resolviendo conflictos, y haciendo merge.
Al terminar, sabrás trabajar en cualquier proyecto open source o equipo de desarrollo usando el flujo estándar de Git.
Es la habilidad que te permite contribuir a proyectos reales y trabajar profesionalmente con otros desarrolladores.

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
## What you'll build

You'll learn the complete Git collaboration workflow: clone repos, create branches, make commits, and open Pull Requests.
You'll practice the team workflow by simulating contributions to a project, resolving conflicts, and merging.
When you're done, you'll know how to work on any open source project or development team using the standard Git flow.
It's the skill that allows you to contribute to real projects and work professionally with other developers.

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
  'react-todo': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Terminal básica', 'Node.js instalado'],
    prerequisitesEn: ['Basic terminal', 'Node.js installed'],
    contentEs: `
## Lo que vas a construir

Una aplicación de tareas completa con React. Podrás agregar nuevas tareas, marcarlas como completadas con un click, eliminarlas, y filtrarlas por estado (todas, activas, completadas). Las tareas se guardarán en localStorage para que persistan aunque cierres el navegador. Es el proyecto perfecto para aprender los fundamentos de React: componentes, estado, y eventos.

---

## Paso 1: Pídele a una IA el proyecto completo

\`\`\`
Necesito una Todo App con React que:
- Use Vite como bundler
- Tenga TypeScript
- Use Tailwind CSS para estilos
- Guarde las tareas en localStorage
- Tenga filtros (todas/activas/completadas)

Dame los comandos para crear el proyecto y el código de cada archivo.
\`\`\`

---

## Paso 2: Sigue las instrucciones

La IA te dará algo como:

\`\`\`bash
npm create vite@latest todo-app -- --template react-ts
cd todo-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Luego te dará el código para:
- \`src/App.tsx\` - Componente principal
- \`src/components/TodoItem.tsx\` - Cada tarea
- \`tailwind.config.js\` - Configuración

---

## Paso 3: Ejecuta

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:5173](http://localhost:5173)

---

## Conceptos clave de React

| Concepto | Qué es |
|----------|--------|
| \`useState\` | Estado local del componente |
| \`props\` | Datos que pasan de padre a hijo |
| \`map()\` | Renderizar listas |
| \`key\` | Identificador único para listas |

---

## Ejemplo de código

\`\`\`tsx
const [todos, setTodos] = useState<Todo[]>([])

const addTodo = (text: string) => {
  setTodos([...todos, { id: Date.now(), text, completed: false }])
}

const toggleTodo = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`Module not found\` | Falta dependencia | \`npm install\` |
| Tailwind no funciona | Config incorrecta | Verifica \`tailwind.config.js\` |
| No guarda en localStorage | Key incorrecta | Verifica \`localStorage.setItem\` |

---

## Próximo paso

→ [API REST con Express](/es/cooking/api-rest-basic) — Tu primer backend
    `,
    contentEn: `
## What you'll build

A complete task management application with React. You'll be able to add new tasks, mark them as completed with a click, delete them, and filter by status (all, active, completed). Tasks will be saved in localStorage so they persist even after closing the browser. It's the perfect project to learn React fundamentals: components, state, and events.

---

## Step 1: Ask an AI for the complete project

\`\`\`
I need a Todo App with React that:
- Uses Vite as bundler
- Has TypeScript
- Uses Tailwind CSS for styles
- Saves tasks in localStorage
- Has filters (all/active/completed)

Give me the commands to create the project and the code for each file.
\`\`\`

---

## Step 2: Follow the instructions

The AI will give you something like:

\`\`\`bash
npm create vite@latest todo-app -- --template react-ts
cd todo-app
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Then it will give you code for:
- \`src/App.tsx\` - Main component
- \`src/components/TodoItem.tsx\` - Each task
- \`tailwind.config.js\` - Configuration

---

## Step 3: Run it

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

---

## Key React concepts

| Concept | What it is |
|---------|------------|
| \`useState\` | Local component state |
| \`props\` | Data passed from parent to child |
| \`map()\` | Render lists |
| \`key\` | Unique identifier for lists |

---

## Code example

\`\`\`tsx
const [todos, setTodos] = useState<Todo[]>([])

const addTodo = (text: string) => {
  setTodos([...todos, { id: Date.now(), text, completed: false }])
}

const toggleTodo = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`Module not found\` | Missing dependency | \`npm install\` |
| Tailwind not working | Wrong config | Check \`tailwind.config.js\` |
| Not saving to localStorage | Wrong key | Check \`localStorage.setItem\` |

---

## Next step

→ [REST API with Express](/en/cooking/api-rest-basic) — Your first backend
    `,
  },
  'api-rest-basic': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Node.js instalado', 'JSON API Fetch completado'],
    prerequisitesEn: ['Node.js installed', 'JSON API Fetch completed'],
    contentEs: `
## Lo que vas a construir

Tu primer servidor backend con Node.js y Express. Crearás una API REST completa con endpoints para listar, crear, actualizar y eliminar tareas (CRUD). Aprenderás cómo funcionan las peticiones HTTP (GET, POST, PUT, DELETE) y cómo el frontend se comunica con el backend. Al terminar, tendrás un servidor corriendo en tu computadora que responde a peticiones como una API real.

---

## Paso 1: Pídele a una IA el código

\`\`\`
Necesito una API REST con Express y Node.js que:
- Tenga endpoints CRUD para tareas (todos)
- Use JSON para requests y responses
- Guarde en memoria (array)
- Tenga CORS habilitado
- Puerto 3001

Dame el código completo.
\`\`\`

---

## Paso 2: Crea el proyecto

\`\`\`bash
mkdir todo-api
cd todo-api
npm init -y
npm install express cors
\`\`\`

Pega el código que te dio la IA en \`server.js\`

---

## Paso 3: Ejecuta

\`\`\`bash
node server.js
\`\`\`

---

## Paso 4: Prueba con curl

\`\`\`bash
# Listar todos
curl http://localhost:3001/todos

# Crear uno
curl -X POST http://localhost:3001/todos \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Mi primera tarea"}'

# Actualizar
curl -X PUT http://localhost:3001/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{"completed": true}'

# Eliminar
curl -X DELETE http://localhost:3001/todos/1
\`\`\`

---

## Código típico

\`\`\`javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let todos = []
let nextId = 1

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const todo = { id: nextId++, ...req.body, completed: false }
  todos.push(todo)
  res.status(201).json(todo)
})

app.listen(3001, () => console.log('API en puerto 3001'))
\`\`\`

---

## Métodos HTTP

| Método | Uso |
|--------|-----|
| GET | Leer datos |
| POST | Crear nuevo |
| PUT | Actualizar existente |
| DELETE | Eliminar |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`EADDRINUSE\` | Puerto ocupado | Cambia el puerto |
| \`Cannot find module\` | Falta dependencia | \`npm install\` |
| CORS error | CORS no habilitado | Agrega \`app.use(cors())\` |

---

## Próximo paso

→ [CLI Tool con Python](/es/cooking/python-cli) — Automatiza con Python
    `,
    contentEn: `
## What you'll build

Your first backend server with Node.js and Express. You'll create a complete REST API with endpoints to list, create, update, and delete tasks (CRUD). You'll learn how HTTP requests work (GET, POST, PUT, DELETE) and how the frontend communicates with the backend. By the end, you'll have a server running on your computer that responds to requests like a real API.

---

## Step 1: Ask an AI for the code

\`\`\`
I need a REST API with Express and Node.js that:
- Has CRUD endpoints for tasks (todos)
- Uses JSON for requests and responses
- Saves in memory (array)
- Has CORS enabled
- Port 3001

Give me the complete code.
\`\`\`

---

## Step 2: Create the project

\`\`\`bash
mkdir todo-api
cd todo-api
npm init -y
npm install express cors
\`\`\`

Paste the code the AI gave you in \`server.js\`

---

## Step 3: Run it

\`\`\`bash
node server.js
\`\`\`

---

## Step 4: Test with curl

\`\`\`bash
# List all
curl http://localhost:3001/todos

# Create one
curl -X POST http://localhost:3001/todos \\
  -H "Content-Type: application/json" \\
  -d '{"text": "My first task"}'

# Update
curl -X PUT http://localhost:3001/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{"completed": true}'

# Delete
curl -X DELETE http://localhost:3001/todos/1
\`\`\`

---

## Typical code

\`\`\`javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let todos = []
let nextId = 1

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  const todo = { id: nextId++, ...req.body, completed: false }
  todos.push(todo)
  res.status(201).json(todo)
})

app.listen(3001, () => console.log('API on port 3001'))
\`\`\`

---

## HTTP Methods

| Method | Usage |
|--------|-------|
| GET | Read data |
| POST | Create new |
| PUT | Update existing |
| DELETE | Delete |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`EADDRINUSE\` | Port in use | Change the port |
| \`Cannot find module\` | Missing dependency | \`npm install\` |
| CORS error | CORS not enabled | Add \`app.use(cors())\` |

---

## Next step

→ [CLI Tool with Python](/en/cooking/python-cli) — Automate with Python
    `,
  },
  'python-cli': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['Terminal básica'],
    prerequisitesEn: ['Basic terminal'],
    contentEs: `
## Lo que vas a construir

Una herramienta de linea de comandos (CLI) en Python para gestionar tareas. Podrás escribir comandos como \`./tasks.py add "Comprar leche"\` o \`./tasks.py list\` directamente en tu terminal. Las tareas se guardarán en un archivo JSON. Es el primer paso para automatizar cualquier tarea repetitiva con scripts propios.

---

## Paso 1: Verifica Python

\`\`\`bash
python3 --version
# o
python --version
\`\`\`

Si no lo tienes:
- macOS: \`brew install python\`
- Windows: [python.org](https://python.org)

---

## Paso 2: Pídele a una IA un CLI

\`\`\`
Necesito un CLI en Python que:
- Use argparse para los comandos
- Tenga comandos: add, list, done, delete
- Guarde tareas en un archivo JSON
- Muestre colores en la salida

Dame el código completo.
\`\`\`

---

## Ejemplo de CLI básico

\`\`\`python
#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

TASKS_FILE = Path.home() / ".tasks.json"

def load_tasks():
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text())
    return []

def save_tasks(tasks):
    TASKS_FILE.write_text(json.dumps(tasks, indent=2))

def add_task(text):
    tasks = load_tasks()
    tasks.append({"text": text, "done": False})
    save_tasks(tasks)
    print(f"✓ Tarea agregada: {text}")

def list_tasks():
    tasks = load_tasks()
    for i, task in enumerate(tasks, 1):
        status = "✓" if task["done"] else "○"
        print(f"{i}. [{status}] {task['text']}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gestor de tareas")
    parser.add_argument("command", choices=["add", "list"])
    parser.add_argument("text", nargs="?")

    args = parser.parse_args()

    if args.command == "add":
        add_task(args.text)
    elif args.command == "list":
        list_tasks()
\`\`\`

---

## Paso 3: Hazlo ejecutable

\`\`\`bash
chmod +x tasks.py
./tasks.py add "Comprar leche"
./tasks.py list
\`\`\`

---

## Librerías útiles

| Librería | Para qué |
|----------|----------|
| \`argparse\` | Parsear argumentos (incluido) |
| \`click\` | CLI más elegante |
| \`rich\` | Colores y tablas bonitas |
| \`requests\` | Hacer HTTP requests |

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`python: command not found\` | No instalado | Instala Python |
| \`ModuleNotFoundError\` | Falta librería | \`pip install librería\` |
| \`Permission denied\` | No ejecutable | \`chmod +x script.py\` |

---

## Próximo paso

→ [Landing Page Responsive](/es/cooking/landing-page) — Diseño web moderno
    `,
    contentEn: `
## What you'll build

A command-line tool (CLI) in Python for managing tasks. You'll be able to type commands like \`./tasks.py add "Buy milk"\` or \`./tasks.py list\` directly in your terminal. Tasks will be saved in a JSON file. It's the first step to automating any repetitive task with your own scripts.

---

## Step 1: Verify Python

\`\`\`bash
python3 --version
# or
python --version
\`\`\`

If you don't have it:
- macOS: \`brew install python\`
- Windows: [python.org](https://python.org)

---

## Step 2: Ask an AI for a CLI

\`\`\`
I need a CLI in Python that:
- Uses argparse for commands
- Has commands: add, list, done, delete
- Saves tasks in a JSON file
- Shows colors in output

Give me the complete code.
\`\`\`

---

## Basic CLI example

\`\`\`python
#!/usr/bin/env python3
import argparse
import json
from pathlib import Path

TASKS_FILE = Path.home() / ".tasks.json"

def load_tasks():
    if TASKS_FILE.exists():
        return json.loads(TASKS_FILE.read_text())
    return []

def save_tasks(tasks):
    TASKS_FILE.write_text(json.dumps(tasks, indent=2))

def add_task(text):
    tasks = load_tasks()
    tasks.append({"text": text, "done": False})
    save_tasks(tasks)
    print(f"✓ Task added: {text}")

def list_tasks():
    tasks = load_tasks()
    for i, task in enumerate(tasks, 1):
        status = "✓" if task["done"] else "○"
        print(f"{i}. [{status}] {task['text']}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Task manager")
    parser.add_argument("command", choices=["add", "list"])
    parser.add_argument("text", nargs="?")

    args = parser.parse_args()

    if args.command == "add":
        add_task(args.text)
    elif args.command == "list":
        list_tasks()
\`\`\`

---

## Step 3: Make it executable

\`\`\`bash
chmod +x tasks.py
./tasks.py add "Buy milk"
./tasks.py list
\`\`\`

---

## Useful libraries

| Library | What for |
|---------|----------|
| \`argparse\` | Parse arguments (included) |
| \`click\` | More elegant CLI |
| \`rich\` | Nice colors and tables |
| \`requests\` | Make HTTP requests |

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`python: command not found\` | Not installed | Install Python |
| \`ModuleNotFoundError\` | Missing library | \`pip install library\` |
| \`Permission denied\` | Not executable | \`chmod +x script.py\` |

---

## Next step

→ [Responsive Landing Page](/en/cooking/landing-page) — Modern web design
    `,
  },
  'landing-page': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['HTML/CSS básico', 'Página Web Estática completada'],
    prerequisitesEn: ['Basic HTML/CSS', 'Static Web Page completed'],
    contentEs: `
## Lo que vas a construir

Una landing page profesional y responsive que funciona en cualquier dispositivo. Tendra un hero section con gradiente llamativo, secciones de beneficios con iconos, testimonios de clientes, y un boton de llamada a accion (CTA). Usaras HTML y Tailwind CSS para crear un diseno moderno que puedes publicar gratis en GitHub Pages o Vercel.

---

## Estructura tipica

1. **Hero** - Titulo grande + llamada a accion
2. **Beneficios** - Por que elegirte
3. **Como funciona** - Pasos simples
4. **Testimonios** - Prueba social
5. **CTA final** - Boton de accion

---

## Paso 1: Pídele a una IA el diseño

\`\`\`
Necesito una landing page moderna con:
- Hero con gradiente de fondo
- Sección de 3 beneficios con iconos
- Sección "Cómo funciona" con 3 pasos
- Testimonios con avatares
- Footer con links
- HTML + Tailwind CSS
- Responsive (móvil primero)

Dame el código completo.
\`\`\`

---

## Paso 2: Crea el proyecto

\`\`\`bash
mkdir mi-landing
cd mi-landing
\`\`\`

Pega el HTML en \`index.html\`

---

## Paso 3: Ábrelo

\`\`\`bash
open index.html  # macOS
\`\`\`

---

## Tips de diseño

| Elemento | Tip |
|----------|-----|
| **Título** | Claro, beneficio directo |
| **CTA** | Color contrastante, verbo de acción |
| **Imágenes** | Optimizadas, relevantes |
| **Espaciado** | Abundante espacio en blanco |

---

## Publicar

Sube a GitHub Pages o Vercel:

\`\`\`bash
git init
git add .
git commit -m "Landing page"
# Sube a GitHub y activa Pages
\`\`\`

---

## Próximo paso

→ [Portfolio Personal](/es/cooking/portfolio) — Muestra tu trabajo
    `,
    contentEn: `
## What you'll build

A professional, responsive landing page that works on any device. It will have a hero section with an eye-catching gradient, benefits sections with icons, customer testimonials, and a call-to-action (CTA) button. You'll use HTML and Tailwind CSS to create a modern design that you can publish for free on GitHub Pages or Vercel.

---

## Typical structure

1. **Hero** - Big title + call to action
2. **Benefits** - Why choose you
3. **How it works** - Simple steps
4. **Testimonials** - Social proof
5. **Final CTA** - Action button

---

## Step 1: Ask an AI for the design

\`\`\`
I need a modern landing page with:
- Hero with gradient background
- Section with 3 benefits with icons
- "How it works" section with 3 steps
- Testimonials with avatars
- Footer with links
- HTML + Tailwind CSS
- Responsive (mobile first)

Give me the complete code.
\`\`\`

---

## Step 2: Create the project

\`\`\`bash
mkdir my-landing
cd my-landing
\`\`\`

Paste the HTML in \`index.html\`

---

## Step 3: Open it

\`\`\`bash
open index.html  # macOS
\`\`\`

---

## Design tips

| Element | Tip |
|---------|-----|
| **Title** | Clear, direct benefit |
| **CTA** | Contrasting color, action verb |
| **Images** | Optimized, relevant |
| **Spacing** | Plenty of white space |

---

## Publish

Upload to GitHub Pages or Vercel:

\`\`\`bash
git init
git add .
git commit -m "Landing page"
# Push to GitHub and enable Pages
\`\`\`

---

## Next step

→ [Personal Portfolio](/en/cooking/portfolio) — Show your work
    `,
  },
  'portfolio': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Landing Page completada'],
    prerequisitesEn: ['Landing Page completed'],
    contentEs: `
## Lo que vas a construir

Tu sitio web portfolio personal con Next.js y Tailwind CSS. Tendra una seccion "Sobre mi", galeria de proyectos con cards interactivas, lista de tecnologias que dominas, formulario de contacto, y toggle de modo oscuro. Al terminar tendras un sitio profesional listo para mostrar a reclutadores o clientes, que puedes publicar en Vercel con un click.

---

## Secciones esenciales

1. **Sobre mí** - Quién eres, qué haces
2. **Proyectos** - Tu mejor trabajo
3. **Skills** - Tecnologías que dominas
4. **Contacto** - Cómo contactarte

---

## Paso 1: Pídele a una IA el diseño

\`\`\`
Necesito un portfolio personal con:
- Header con navegación sticky
- Hero con mi nombre y rol
- Sección de proyectos con cards (imagen, título, link)
- Skills con iconos de tecnologías
- Formulario de contacto
- Modo oscuro toggle
- Next.js + Tailwind CSS
- Animaciones sutiles

Dame los comandos y código.
\`\`\`

---

## Paso 2: Sigue las instrucciones

La IA te dará:

\`\`\`bash
npx create-next-app@latest portfolio --typescript --tailwind
cd portfolio
npm run dev
\`\`\`

Y el código para los componentes.

---

## Qué incluir en proyectos

Para cada proyecto:
- Screenshot o gif
- Título claro
- Descripción breve (1-2 líneas)
- Tecnologías usadas
- Links: Demo + GitHub

---

## Tips

| Tip | Por qué |
|-----|---------|
| Menos es más | 3-5 proyectos buenos > 10 mediocres |
| Actualízalo | Proyectos recientes primero |
| Hazlo tuyo | Personalidad en el diseño |
| Optimiza | Carga rápida = buena impresión |

---

## Próximo paso

→ [Blog Estático](/es/cooking/blog-static) — Comparte tu conocimiento
    `,
    contentEn: `
## What you'll build

Your personal portfolio website with Next.js and Tailwind CSS. It will have an "About me" section, a project gallery with interactive cards, a list of technologies you master, a contact form, and a dark mode toggle. By the end, you'll have a professional site ready to show recruiters or clients, that you can publish to Vercel with one click.

---

## Essential sections

1. **About me** - Who you are, what you do
2. **Projects** - Your best work
3. **Skills** - Technologies you master
4. **Contact** - How to reach you

---

## Step 1: Ask an AI for the design

\`\`\`
I need a personal portfolio with:
- Header with sticky navigation
- Hero with my name and role
- Projects section with cards (image, title, link)
- Skills with technology icons
- Contact form
- Dark mode toggle
- Next.js + Tailwind CSS
- Subtle animations

Give me the commands and code.
\`\`\`

---

## Step 2: Follow the instructions

The AI will give you:

\`\`\`bash
npx create-next-app@latest portfolio --typescript --tailwind
cd portfolio
npm run dev
\`\`\`

And the code for the components.

---

## What to include in projects

For each project:
- Screenshot or gif
- Clear title
- Brief description (1-2 lines)
- Technologies used
- Links: Demo + GitHub

---

## Tips

| Tip | Why |
|-----|-----|
| Less is more | 3-5 good projects > 10 mediocre |
| Keep it updated | Recent projects first |
| Make it yours | Personality in design |
| Optimize | Fast load = good impression |

---

## Next step

→ [Static Blog](/en/cooking/blog-static) — Share your knowledge
    `,
  },
  'blog-static': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Markdown básico', 'Git básico'],
    prerequisitesEn: ['Basic Markdown', 'Basic Git'],
    contentEs: `
## Lo que vas a construir

Tu propio blog estatico con Astro. Podras escribir posts en Markdown, tendras una pagina principal con lista de articulos ordenados por fecha, y paginas individuales para cada post. El sitio sera ultra rapido, seguro, y gratis de hostear en Vercel o GitHub Pages. Es la forma perfecta de documentar lo que aprendes y construir tu presencia online.

---

## Opciones populares

| Herramienta | Lenguaje | Ideal para |
|-------------|----------|------------|
| **Astro** | JS | Contenido + componentes |
| **Hugo** | Go | Velocidad extrema |
| **Jekyll** | Ruby | GitHub Pages nativo |
| **11ty** | JS | Simplicidad |

---

## Paso 1: Pídele a una IA el setup

\`\`\`
Necesito un blog estático con Astro que:
- Tenga posts en Markdown
- Muestre lista de posts con fecha
- Tenga página individual por post
- Use Tailwind CSS
- Tenga modo oscuro
- Sea deployable en Vercel

Dame los comandos y estructura.
\`\`\`

---

## Paso 2: Crea el proyecto

\`\`\`bash
npm create astro@latest my-blog
cd my-blog
npm run dev
\`\`\`

---

## Estructura típica

\`\`\`
my-blog/
├── src/
│   ├── content/
│   │   └── posts/
│   │       ├── primer-post.md
│   │       └── segundo-post.md
│   ├── layouts/
│   │   └── PostLayout.astro
│   └── pages/
│       ├── index.astro
│       └── posts/[slug].astro
└── astro.config.mjs
\`\`\`

---

## Formato de post

\`\`\`markdown
---
title: "Mi primer post"
date: 2024-01-15
description: "Qué aprendí hoy"
tags: ["javascript", "aprendizaje"]
---

# Mi primer post

Contenido en **Markdown**...
\`\`\`

---

## Publicar

\`\`\`bash
# Vercel (automático desde GitHub)
npm run build
# Sube a GitHub, conecta con Vercel
\`\`\`

---

## Próximo paso

→ [Formulario con Validación](/es/cooking/form-validation) — Inputs seguros
    `,
    contentEn: `
## Share what you learn

A static blog is fast, secure, and free to host. You write in Markdown, HTML is generated.

---

## Popular options

| Tool | Language | Ideal for |
|------|----------|-----------|
| **Astro** | JS | Content + components |
| **Hugo** | Go | Extreme speed |
| **Jekyll** | Ruby | Native GitHub Pages |
| **11ty** | JS | Simplicity |

---

## Step 1: Ask an AI for the setup

\`\`\`
I need a static blog with Astro that:
- Has posts in Markdown
- Shows list of posts with date
- Has individual page per post
- Uses Tailwind CSS
- Has dark mode
- Is deployable on Vercel

Give me the commands and structure.
\`\`\`

---

## Step 2: Create the project

\`\`\`bash
npm create astro@latest my-blog
cd my-blog
npm run dev
\`\`\`

---

## Typical structure

\`\`\`
my-blog/
├── src/
│   ├── content/
│   │   └── posts/
│   │       ├── first-post.md
│   │       └── second-post.md
│   ├── layouts/
│   │   └── PostLayout.astro
│   └── pages/
│       ├── index.astro
│       └── posts/[slug].astro
└── astro.config.mjs
\`\`\`

---

## Post format

\`\`\`markdown
---
title: "My first post"
date: 2024-01-15
description: "What I learned today"
tags: ["javascript", "learning"]
---

# My first post

Content in **Markdown**...
\`\`\`

---

## Publish

\`\`\`bash
# Vercel (automatic from GitHub)
npm run build
# Push to GitHub, connect with Vercel
\`\`\`

---

## Next step

→ [Form with Validation](/en/cooking/form-validation) — Secure inputs
    `,
  },
  'form-validation': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['React básico'],
    prerequisitesEn: ['Basic React'],
    contentEs: `
## Inputs que no mienten

La validación previene errores y mejora la experiencia del usuario.

---

## Tipos de validación

| Tipo | Cuándo |
|------|--------|
| **Cliente** | Feedback inmediato |
| **Servidor** | Seguridad real |

> Siempre valida en el servidor. El cliente es solo UX.

---

## Paso 1: Pídele a una IA el formulario

\`\`\`
Necesito un formulario de registro en React con:
- Campos: nombre, email, contraseña, confirmar contraseña
- Validación en tiempo real
- Mensajes de error claros
- Botón deshabilitado hasta que sea válido
- Estilo con Tailwind CSS
- Use react-hook-form y zod

Dame el código completo.
\`\`\`

---

## Librerías recomendadas

| Librería | Para qué |
|----------|----------|
| \`react-hook-form\` | Manejo de formularios |
| \`zod\` | Esquemas de validación |
| \`yup\` | Alternativa a zod |

---

## Ejemplo con zod

\`\`\`typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
})
\`\`\`

---

## Validaciones comunes

| Campo | Validación |
|-------|------------|
| Email | Formato válido |
| Contraseña | Mín 8 chars, mayúscula, número |
| Teléfono | Solo números, longitud |
| URL | Formato https:// |

---

## Próximo paso

→ [App del Clima](/es/cooking/weather-app) — APIs externas
    `,
    contentEn: `
## Inputs that don't lie

Validation prevents errors and improves user experience.

---

## Types of validation

| Type | When |
|------|------|
| **Client** | Immediate feedback |
| **Server** | Real security |

> Always validate on server. Client is just UX.

---

## Step 1: Ask an AI for the form

\`\`\`
I need a registration form in React with:
- Fields: name, email, password, confirm password
- Real-time validation
- Clear error messages
- Button disabled until valid
- Tailwind CSS styling
- Use react-hook-form and zod

Give me the complete code.
\`\`\`

---

## Recommended libraries

| Library | What for |
|---------|----------|
| \`react-hook-form\` | Form handling |
| \`zod\` | Validation schemas |
| \`yup\` | Alternative to zod |

---

## Example with zod

\`\`\`typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})
\`\`\`

---

## Common validations

| Field | Validation |
|-------|------------|
| Email | Valid format |
| Password | Min 8 chars, uppercase, number |
| Phone | Numbers only, length |
| URL | https:// format |

---

## Next step

→ [Weather App](/en/cooking/weather-app) — External APIs
    `,
  },
  'weather-app': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['JSON API Fetch completado', 'React básico'],
    prerequisitesEn: ['JSON API Fetch completed', 'Basic React'],
    contentEs: `
## Datos del mundo real

Una app del clima conecta con APIs externas y muestra datos en tiempo real.

---

## API recomendada

[OpenWeatherMap](https://openweathermap.org/api) - Gratis hasta 1000 llamadas/día

---

## Paso 1: Obtén API Key

1. Crea cuenta en openweathermap.org
2. Ve a API Keys
3. Copia tu key

---

## Paso 2: Pídele a una IA la app

\`\`\`
Necesito una app del clima en React que:
- Busque ciudad por nombre
- Muestre temperatura, humedad, condición
- Use la API de OpenWeatherMap
- Tenga iconos del clima
- Sea responsive
- Use Tailwind CSS

La API key viene de VITE_WEATHER_API_KEY.

Dame el código completo.
\`\`\`

---

## Paso 3: Configura la key

Crea \`.env\`:

\`\`\`
VITE_WEATHER_API_KEY=tu-api-key
\`\`\`

---

## Código típico

\`\`\`typescript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

async function getWeather(city: string) {
  const res = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
  )
  return res.json()
}
\`\`\`

---

## Si algo falló

| Error | Causa | Solución |
|-------|-------|----------|
| \`401\` | API key inválida | Verifica la key |
| \`404\` | Ciudad no encontrada | Verifica el nombre |
| CORS | Llamada directa | Usa proxy o backend |

---

## Próximo paso

→ [Calculadora Web](/es/cooking/calculator) — Lógica de UI
    `,
    contentEn: `
## Real world data

A weather app connects to external APIs and shows real-time data.

---

## Recommended API

[OpenWeatherMap](https://openweathermap.org/api) - Free up to 1000 calls/day

---

## Step 1: Get API Key

1. Create account at openweathermap.org
2. Go to API Keys
3. Copy your key

---

## Step 2: Ask an AI for the app

\`\`\`
I need a weather app in React that:
- Searches city by name
- Shows temperature, humidity, condition
- Uses OpenWeatherMap API
- Has weather icons
- Is responsive
- Uses Tailwind CSS

The API key comes from VITE_WEATHER_API_KEY.

Give me the complete code.
\`\`\`

---

## Step 3: Configure the key

Create \`.env\`:

\`\`\`
VITE_WEATHER_API_KEY=your-api-key
\`\`\`

---

## Typical code

\`\`\`typescript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

async function getWeather(city: string) {
  const res = await fetch(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
  )
  return res.json()
}
\`\`\`

---

## If something failed

| Error | Cause | Solution |
|-------|-------|----------|
| \`401\` | Invalid API key | Check the key |
| \`404\` | City not found | Check the name |
| CORS | Direct call | Use proxy or backend |

---

## Next step

→ [Web Calculator](/en/cooking/calculator) — UI logic
    `,
  },
  'calculator': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['JavaScript básico', 'HTML/CSS'],
    prerequisitesEn: ['Basic JavaScript', 'HTML/CSS'],
    contentEs: `
## Lógica de interfaz

Una calculadora combina estado, eventos y lógica matemática.

---

## Paso 1: Pídele a una IA la calculadora

\`\`\`
Necesito una calculadora web con:
- Operaciones: +, -, *, /
- Botones numéricos 0-9
- Botón de igual y clear
- Display que muestre la operación
- Manejo de decimales
- React con TypeScript
- Tailwind CSS para estilos
- Diseño tipo calculadora física

Dame el código completo.
\`\`\`

---

## Conceptos clave

| Concepto | Implementación |
|----------|----------------|
| Estado | Número actual, operación pendiente |
| Eventos | onClick en cada botón |
| Lógica | Función que evalúa la expresión |

---

## Código típico

\`\`\`tsx
const [display, setDisplay] = useState('0')
const [prevValue, setPrevValue] = useState<number | null>(null)
const [operator, setOperator] = useState<string | null>(null)

const handleNumber = (num: string) => {
  setDisplay(display === '0' ? num : display + num)
}

const handleOperator = (op: string) => {
  setPrevValue(parseFloat(display))
  setOperator(op)
  setDisplay('0')
}

const calculate = () => {
  if (prevValue !== null && operator) {
    const current = parseFloat(display)
    let result: number
    switch (operator) {
      case '+': result = prevValue + current; break
      case '-': result = prevValue - current; break
      case '*': result = prevValue * current; break
      case '/': result = prevValue / current; break
      default: return
    }
    setDisplay(String(result))
  }
}
\`\`\`

---

## Mejoras posibles

- Historial de operaciones
- Funciones científicas (%, √)
- Teclado numérico
- Modo oscuro

---

## Próximo paso

→ [Quiz Interactivo](/es/cooking/quiz-game) — Lógica de juegos
    `,
    contentEn: `
## Interface logic

A calculator combines state, events, and mathematical logic.

---

## Step 1: Ask an AI for the calculator

\`\`\`
I need a web calculator with:
- Operations: +, -, *, /
- Numeric buttons 0-9
- Equals and clear button
- Display showing the operation
- Decimal handling
- React with TypeScript
- Tailwind CSS for styles
- Physical calculator design

Give me the complete code.
\`\`\`

---

## Key concepts

| Concept | Implementation |
|---------|----------------|
| State | Current number, pending operation |
| Events | onClick on each button |
| Logic | Function that evaluates expression |

---

## Typical code

\`\`\`tsx
const [display, setDisplay] = useState('0')
const [prevValue, setPrevValue] = useState<number | null>(null)
const [operator, setOperator] = useState<string | null>(null)

const handleNumber = (num: string) => {
  setDisplay(display === '0' ? num : display + num)
}

const handleOperator = (op: string) => {
  setPrevValue(parseFloat(display))
  setOperator(op)
  setDisplay('0')
}

const calculate = () => {
  if (prevValue !== null && operator) {
    const current = parseFloat(display)
    let result: number
    switch (operator) {
      case '+': result = prevValue + current; break
      case '-': result = prevValue - current; break
      case '*': result = prevValue * current; break
      case '/': result = prevValue / current; break
      default: return
    }
    setDisplay(String(result))
  }
}
\`\`\`

---

## Possible improvements

- Operation history
- Scientific functions (%, √)
- Numeric keyboard
- Dark mode

---

## Next step

→ [Interactive Quiz](/en/cooking/quiz-game) — Game logic
    `,
  },
  'quiz-game': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['React básico', 'useState'],
    prerequisitesEn: ['Basic React', 'useState'],
    contentEs: `
## Lógica de juegos

Un quiz interactivo maneja preguntas, respuestas y puntaje.

---

## Paso 1: Pídele a una IA el quiz

\`\`\`
Necesito un quiz interactivo en React con:
- Array de preguntas con 4 opciones cada una
- Solo una respuesta correcta por pregunta
- Feedback visual (verde correcto, rojo incorrecto)
- Contador de puntaje
- Botón siguiente pregunta
- Pantalla de resultados al final
- TypeScript y Tailwind CSS

Dame el código completo con 5 preguntas de ejemplo.
\`\`\`

---

## Estructura de datos

\`\`\`typescript
interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es la capital de Francia?",
    options: ["Londres", "París", "Madrid", "Roma"],
    correctIndex: 1
  },
  // más preguntas...
]
\`\`\`

---

## Estado del quiz

\`\`\`tsx
const [currentIndex, setCurrentIndex] = useState(0)
const [score, setScore] = useState(0)
const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
const [showResult, setShowResult] = useState(false)

const currentQuestion = questions[currentIndex]

const handleAnswer = (index: number) => {
  setSelectedAnswer(index)
  if (index === currentQuestion.correctIndex) {
    setScore(score + 1)
  }
}

const nextQuestion = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1)
    setSelectedAnswer(null)
  } else {
    setShowResult(true)
  }
}
\`\`\`

---

## Feedback visual

\`\`\`tsx
<button
  className={\`p-3 rounded-lg \${
    selectedAnswer === index
      ? index === currentQuestion.correctIndex
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white'
      : 'bg-gray-100 hover:bg-gray-200'
  }\`}
  onClick={() => handleAnswer(index)}
  disabled={selectedAnswer !== null}
>
  {option}
</button>
\`\`\`

---

## Próximo paso

→ [Timer con Notificaciones](/es/cooking/countdown-timer)
    `,
    contentEn: `
## Game logic

An interactive quiz handles questions, answers, and scoring.

---

## Step 1: Ask an AI for the quiz

\`\`\`
I need an interactive quiz in React with:
- Array of questions with 4 options each
- Only one correct answer per question
- Visual feedback (green correct, red incorrect)
- Score counter
- Next question button
- Results screen at the end
- TypeScript and Tailwind CSS

Give me the complete code with 5 example questions.
\`\`\`

---

## Data structure

\`\`\`typescript
interface Question {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Madrid", "Rome"],
    correctIndex: 1
  },
  // more questions...
]
\`\`\`

---

## Quiz state

\`\`\`tsx
const [currentIndex, setCurrentIndex] = useState(0)
const [score, setScore] = useState(0)
const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
const [showResult, setShowResult] = useState(false)

const currentQuestion = questions[currentIndex]

const handleAnswer = (index: number) => {
  setSelectedAnswer(index)
  if (index === currentQuestion.correctIndex) {
    setScore(score + 1)
  }
}

const nextQuestion = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex(currentIndex + 1)
    setSelectedAnswer(null)
  } else {
    setShowResult(true)
  }
}
\`\`\`

---

## Visual feedback

\`\`\`tsx
<button
  className={\`p-3 rounded-lg \${
    selectedAnswer === index
      ? index === currentQuestion.correctIndex
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white'
      : 'bg-gray-100 hover:bg-gray-200'
  }\`}
  onClick={() => handleAnswer(index)}
  disabled={selectedAnswer !== null}
>
  {option}
</button>
\`\`\`

---

## Next step

→ [Timer with Notifications](/en/cooking/countdown-timer)
    `,
  },
  'countdown-timer': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['React', 'useEffect'],
    prerequisitesEn: ['React', 'useEffect'],
    contentEs: `
## Tiempo y notificaciones

Un timer usa intervalos y la API de notificaciones del navegador.

---

## Paso 1: Pídele a una IA el timer

\`\`\`
Necesito un countdown timer en React con:
- Input para minutos y segundos
- Botones: Iniciar, Pausar, Reiniciar
- Display formato MM:SS
- Notificación del navegador cuando llegue a 0
- Sonido de alerta
- useEffect para el intervalo
- TypeScript y Tailwind CSS

Dame el código completo.
\`\`\`

---

## Lógica del timer

\`\`\`tsx
const [timeLeft, setTimeLeft] = useState(0)
const [isRunning, setIsRunning] = useState(false)

useEffect(() => {
  if (!isRunning || timeLeft <= 0) return

  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        setIsRunning(false)
        notify()
        return 0
      }
      return prev - 1
    })
  }, 1000)

  return () => clearInterval(interval)
}, [isRunning, timeLeft])
\`\`\`

---

## Notificaciones

\`\`\`typescript
const requestPermission = async () => {
  if ('Notification' in window) {
    await Notification.requestPermission()
  }
}

const notify = () => {
  if (Notification.permission === 'granted') {
    new Notification('¡Tiempo terminado!', {
      body: 'Tu timer ha llegado a cero',
      icon: '/timer-icon.png'
    })
  }
}
\`\`\`

---

## Formato de tiempo

\`\`\`typescript
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`
}
\`\`\`

---

## Próximo paso

→ [Galería de Imágenes](/es/cooking/image-gallery)
    `,
    contentEn: `
## Time and notifications

A timer uses intervals and the browser notification API.

---

## Step 1: Ask an AI for the timer

\`\`\`
I need a countdown timer in React with:
- Input for minutes and seconds
- Buttons: Start, Pause, Reset
- Display format MM:SS
- Browser notification when it reaches 0
- Alert sound
- useEffect for the interval
- TypeScript and Tailwind CSS

Give me the complete code.
\`\`\`

---

## Timer logic

\`\`\`tsx
const [timeLeft, setTimeLeft] = useState(0)
const [isRunning, setIsRunning] = useState(false)

useEffect(() => {
  if (!isRunning || timeLeft <= 0) return

  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        setIsRunning(false)
        notify()
        return 0
      }
      return prev - 1
    })
  }, 1000)

  return () => clearInterval(interval)
}, [isRunning, timeLeft])
\`\`\`

---

## Notifications

\`\`\`typescript
const requestPermission = async () => {
  if ('Notification' in window) {
    await Notification.requestPermission()
  }
}

const notify = () => {
  if (Notification.permission === 'granted') {
    new Notification('Time is up!', {
      body: 'Your timer has reached zero',
      icon: '/timer-icon.png'
    })
  }
}
\`\`\`

---

## Time format

\`\`\`typescript
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`
}
\`\`\`

---

## Next step

→ [Image Gallery](/en/cooking/image-gallery)
    `,
  },
  'image-gallery': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['React', 'CSS Grid/Flexbox'],
    prerequisitesEn: ['React', 'CSS Grid/Flexbox'],
    contentEs: `
## Imágenes con estilo

Una galería combina grid layout, lazy loading y lightbox.

---

## Paso 1: Pídele a una IA la galería

\`\`\`
Necesito una galería de imágenes en React con:
- Grid responsive (1, 2 o 3 columnas según pantalla)
- Lazy loading de imágenes
- Click para abrir lightbox/modal
- Navegación anterior/siguiente en modal
- Cerrar con X o click fuera
- Animaciones suaves
- TypeScript y Tailwind CSS

Usa imágenes de placeholder de Unsplash.
\`\`\`

---

## Grid responsive

\`\`\`tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {images.map((image, index) => (
    <div
      key={image.id}
      className="aspect-square overflow-hidden rounded-lg cursor-pointer"
      onClick={() => openLightbox(index)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover hover:scale-105 transition"
      />
    </div>
  ))}
</div>
\`\`\`

---

## Lightbox

\`\`\`tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

const openLightbox = (index: number) => setLightboxIndex(index)
const closeLightbox = () => setLightboxIndex(null)

const next = () => {
  if (lightboxIndex !== null) {
    setLightboxIndex((lightboxIndex + 1) % images.length)
  }
}

const prev = () => {
  if (lightboxIndex !== null) {
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
  }
}
\`\`\`

---

## Imágenes de prueba

\`\`\`typescript
const images = [
  { id: 1, src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { id: 2, src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
  // más...
]
\`\`\`

---

## Próximo paso

→ [API con FastAPI](/es/cooking/api-fastapi)
    `,
    contentEn: `
## Images with style

A gallery combines grid layout, lazy loading, and lightbox.

---

## Step 1: Ask an AI for the gallery

\`\`\`
I need an image gallery in React with:
- Responsive grid (1, 2 or 3 columns based on screen)
- Lazy loading images
- Click to open lightbox/modal
- Previous/next navigation in modal
- Close with X or click outside
- Smooth animations
- TypeScript and Tailwind CSS

Use Unsplash placeholder images.
\`\`\`

---

## Responsive grid

\`\`\`tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {images.map((image, index) => (
    <div
      key={image.id}
      className="aspect-square overflow-hidden rounded-lg cursor-pointer"
      onClick={() => openLightbox(index)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-full object-cover hover:scale-105 transition"
      />
    </div>
  ))}
</div>
\`\`\`

---

## Lightbox

\`\`\`tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

const openLightbox = (index: number) => setLightboxIndex(index)
const closeLightbox = () => setLightboxIndex(null)

const next = () => {
  if (lightboxIndex !== null) {
    setLightboxIndex((lightboxIndex + 1) % images.length)
  }
}

const prev = () => {
  if (lightboxIndex !== null) {
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
  }
}
\`\`\`

---

## Test images

\`\`\`typescript
const images = [
  { id: 1, src: 'https://picsum.photos/800/600?random=1', alt: 'Image 1' },
  { id: 2, src: 'https://picsum.photos/800/600?random=2', alt: 'Image 2' },
  // more...
]
\`\`\`

---

## Next step

→ [API with FastAPI](/en/cooking/api-fastapi)
    `,
  },
  'api-fastapi': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Python básico', 'APIs REST'],
    prerequisitesEn: ['Basic Python', 'REST APIs'],
    contentEs: `
## APIs rápidas con Python

FastAPI es el framework moderno para crear APIs en Python.

---

## Instalación

\`\`\`bash
# Con uv
uv init mi-api
cd mi-api
uv add fastapi uvicorn

# O con pip
pip install fastapi uvicorn
\`\`\`

---

## Paso 1: Pídele a una IA la API

\`\`\`
Necesito una API REST con FastAPI que:
- CRUD completo de items (crear, leer, actualizar, eliminar)
- Validación con Pydantic
- Documentación automática en /docs
- Almacenamiento en memoria (lista)
- Manejo de errores 404
- Tipado completo

Dame el código completo en main.py.
\`\`\`

---

## Código típico

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str
    price: float

items: list[Item] = []

@app.get("/items")
def get_items():
    return items

@app.post("/items")
def create_item(item: Item):
    items.append(item)
    return item

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i, item in enumerate(items):
        if item.id == item_id:
            return items.pop(i)
    raise HTTPException(status_code=404, detail="Item not found")
\`\`\`

---

## Ejecutar

\`\`\`bash
uvicorn main:app --reload
\`\`\`

Abre http://localhost:8000/docs para ver la documentación interactiva.

---

## Próximo paso

→ [Web Scraper Básico](/es/cooking/scraper-basic)
    `,
    contentEn: `
## Fast APIs with Python

FastAPI is the modern framework for creating APIs in Python.

---

## Installation

\`\`\`bash
# With uv
uv init my-api
cd my-api
uv add fastapi uvicorn

# Or with pip
pip install fastapi uvicorn
\`\`\`

---

## Step 1: Ask an AI for the API

\`\`\`
I need a REST API with FastAPI that:
- Full CRUD of items (create, read, update, delete)
- Validation with Pydantic
- Automatic documentation at /docs
- In-memory storage (list)
- 404 error handling
- Full typing

Give me the complete code in main.py.
\`\`\`

---

## Typical code

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str
    price: float

items: list[Item] = []

@app.get("/items")
def get_items():
    return items

@app.post("/items")
def create_item(item: Item):
    items.append(item)
    return item

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i, item in enumerate(items):
        if item.id == item_id:
            return items.pop(i)
    raise HTTPException(status_code=404, detail="Item not found")
\`\`\`

---

## Run

\`\`\`bash
uvicorn main:app --reload
\`\`\`

Open http://localhost:8000/docs to see interactive documentation.

---

## Next step

→ [Basic Web Scraper](/en/cooking/scraper-basic)
    `,
  },
  'scraper-basic': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Python básico', 'HTML básico'],
    prerequisitesEn: ['Basic Python', 'Basic HTML'],
    contentEs: `
## Extracción de datos web

Un scraper extrae información de páginas web de forma automatizada.

---

## Instalación

\`\`\`bash
uv add requests beautifulsoup4
# o
pip install requests beautifulsoup4
\`\`\`

---

## Paso 1: Pídele a una IA el scraper

\`\`\`
Necesito un web scraper en Python que:
- Use requests y BeautifulSoup
- Extraiga títulos y enlaces de una página
- Maneje errores de conexión
- Guarde resultados en JSON
- Tenga delay entre requests (ser respetuoso)
- Incluya user-agent apropiado

Dame el código completo.
\`\`\`

---

## Código típico

\`\`\`python
import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_page(url: str) -> list[dict]:
    headers = {
        'User-Agent': 'Mozilla/5.0 (educational scraper)'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')

    results = []
    for link in soup.find_all('a', href=True):
        results.append({
            'text': link.get_text(strip=True),
            'href': link['href']
        })

    return results

# Uso
data = scrape_page('https://example.com')
with open('results.json', 'w') as f:
    json.dump(data, f, indent=2)
\`\`\`

---

## Buenas prácticas

| Práctica | Por qué |
|----------|---------|
| Delay entre requests | No sobrecargar el servidor |
| User-Agent | Identificarte |
| robots.txt | Respetar las reglas del sitio |
| Error handling | Manejar timeouts y errores |

---

## Ética del scraping

> ⚠️ Siempre verifica los términos de servicio del sitio. Algunos prohíben el scraping.

---

## Siguiente nivel

→ [Chat IA Público con Auth](/es/cooking/public-ai-chat) — Nivel Chef
    `,
    contentEn: `
## Web data extraction

A scraper extracts information from web pages automatically.

---

## Installation

\`\`\`bash
uv add requests beautifulsoup4
# or
pip install requests beautifulsoup4
\`\`\`

---

## Step 1: Ask an AI for the scraper

\`\`\`
I need a web scraper in Python that:
- Uses requests and BeautifulSoup
- Extracts titles and links from a page
- Handles connection errors
- Saves results to JSON
- Has delay between requests (be respectful)
- Includes appropriate user-agent

Give me the complete code.
\`\`\`

---

## Typical code

\`\`\`python
import requests
from bs4 import BeautifulSoup
import json
import time

def scrape_page(url: str) -> list[dict]:
    headers = {
        'User-Agent': 'Mozilla/5.0 (educational scraper)'
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')

    results = []
    for link in soup.find_all('a', href=True):
        results.append({
            'text': link.get_text(strip=True),
            'href': link['href']
        })

    return results

# Usage
data = scrape_page('https://example.com')
with open('results.json', 'w') as f:
    json.dump(data, f, indent=2)
\`\`\`

---

## Best practices

| Practice | Why |
|----------|-----|
| Delay between requests | Don't overload server |
| User-Agent | Identify yourself |
| robots.txt | Respect site rules |
| Error handling | Handle timeouts and errors |

---

## Scraping ethics

> ⚠️ Always check the site's terms of service. Some prohibit scraping.

---

## Next level

→ [Public AI Chat with Auth](/en/cooking/public-ai-chat) — Chef Level
    `,
  },
  // ===== CHEF LEVEL =====
  'public-ai-chat': {
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['Chat IA con interfaz web', 'Firebase Auth'],
    prerequisitesEn: ['AI Chat with web interface', 'Firebase Auth'],
    contentEs: `
## Lo que vas a construir

Un asistente de inteligencia artificial accesible desde internet, donde cualquier persona puede crear una cuenta con Google, chatear con la IA y ver su historial de conversaciones.
Implementaras autenticacion con Firebase, limites de uso diario por usuario (10 mensajes gratis), persistencia de conversaciones en Firestore y una interfaz tipo ChatGPT.
Al terminar, tendras una app desplegada en Vercel que puedes compartir con amigos o usar como base para tu propio producto SaaS.

---

## Arquitectura

\`\`\`
Usuario → Firebase Auth → Tu app Next.js
                              ↓
                         API de IA (Gemini/Claude)
                              ↓
                         Historial en DB
\`\`\`

---

## Paso 1: Pídele a una IA la app completa

\`\`\`
Necesito una app de chat IA pública con:
- Next.js App Router
- Firebase Auth (Google login)
- Límite de 10 mensajes/día para usuarios free
- Historial de conversaciones en Firestore
- UI tipo ChatGPT
- API route que llame a Gemini
- TypeScript y Tailwind CSS

Dame la estructura de archivos y código completo.
\`\`\`

---

## Componentes clave

| Archivo | Función |
|---------|---------|
| \`app/api/chat/route.ts\` | Llama a la API de IA |
| \`lib/firebase.ts\` | Config Firebase |
| \`components/ChatUI.tsx\` | Interfaz del chat |
| \`hooks/useAuth.ts\` | Hook de autenticación |

---

## Rate limiting

\`\`\`typescript
async function checkRateLimit(userId: string): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0]
  const ref = doc(db, 'usage', \`\${userId}_\${today}\`)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    await setDoc(ref, { count: 1 })
    return true
  }

  const { count } = snap.data()
  if (count >= 10) return false

  await updateDoc(ref, { count: count + 1 })
  return true
}
\`\`\`

---

## Deploy

Vercel + Firebase = gratis para empezar.

---

## Próximo paso

→ [Blog con Next.js + MDX](/es/cooking/nextjs-blog)
    `,
    contentEn: `
## What you'll build

An AI assistant accessible from the internet, where anyone can create an account with Google, chat with the AI, and view their conversation history.
You'll implement authentication with Firebase, daily usage limits per user (10 free messages), conversation persistence in Firestore, and a ChatGPT-style interface.
When finished, you'll have an app deployed on Vercel that you can share with friends or use as a foundation for your own SaaS product.

---

## Architecture

\`\`\`
User → Firebase Auth → Your Next.js app
                            ↓
                       AI API (Gemini/Claude)
                            ↓
                       History in DB
\`\`\`

---

## Step 1: Ask an AI for the complete app

\`\`\`
I need a public AI chat app with:
- Next.js App Router
- Firebase Auth (Google login)
- Limit of 10 messages/day for free users
- Conversation history in Firestore
- ChatGPT-like UI
- API route calling Gemini
- TypeScript and Tailwind CSS

Give me the file structure and complete code.
\`\`\`

---

## Key components

| File | Function |
|------|----------|
| \`app/api/chat/route.ts\` | Calls AI API |
| \`lib/firebase.ts\` | Firebase config |
| \`components/ChatUI.tsx\` | Chat interface |
| \`hooks/useAuth.ts\` | Auth hook |

---

## Rate limiting

\`\`\`typescript
async function checkRateLimit(userId: string): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0]
  const ref = doc(db, 'usage', \`\${userId}_\${today}\`)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    await setDoc(ref, { count: 1 })
    return true
  }

  const { count } = snap.data()
  if (count >= 10) return false

  await updateDoc(ref, { count: count + 1 })
  return true
}
\`\`\`

---

## Deploy

Vercel + Firebase = free to start.

---

## Next step

→ [Blog with Next.js + MDX](/en/cooking/nextjs-blog)
    `,
  },
  'nextjs-blog': {
    timeEs: '40 minutos',
    timeEn: '40 minutes',
    prerequisitesEs: ['Next.js básico', 'Markdown'],
    prerequisitesEn: ['Basic Next.js', 'Markdown'],
    contentEs: `
## Lo que vas a construir

Un blog personal con Next.js donde escribes posts en archivos Markdown y automaticamente se generan paginas estaticas con URLs amigables.
Tendras una pagina principal listando todos tus posts con titulo, fecha y tags, cada post con syntax highlighting para codigo y la posibilidad de usar componentes React dentro del Markdown.
El sitio sera ultra-rapido porque se genera estaticamente (SSG) y puedes desplegarlo gratis en Vercel.

---

## Paso 1: Pidele a una IA el blog

\`\`\`
Necesito un blog con Next.js que:
- Use MDX para los posts
- Tenga una página listando todos los posts
- Cada post tenga metadata (título, fecha, tags)
- Sintaxis highlighting para código
- Genere rutas estáticas (SSG)
- TypeScript y Tailwind CSS

Dame la estructura completa con 2 posts de ejemplo.
\`\`\`

---

## Estructura

\`\`\`
app/
├── blog/
│   ├── page.tsx          # Lista de posts
│   └── [slug]/
│       └── page.tsx      # Post individual
content/
├── posts/
│   ├── hello-world.mdx
│   └── segundo-post.mdx
\`\`\`

---

## MDX ejemplo

\`\`\`mdx
---
title: "Mi Primer Post"
date: "2026-01-01"
tags: ["nextjs", "tutorial"]
---

# Bienvenido

Este es mi primer post con **MDX**.

<CustomComponent prop="valor" />

\\\`\\\`\\\`typescript
const greeting = "Hola mundo!"
\\\`\\\`\\\`
\`\`\`

---

## Librerías útiles

| Librería | Para qué |
|----------|----------|
| \`@next/mdx\` | MDX en Next.js |
| \`gray-matter\` | Parsear frontmatter |
| \`rehype-highlight\` | Syntax highlighting |

---

## Próximo paso

→ [Auth con Firebase Google](/es/cooking/auth-firebase)
    `,
    contentEn: `
## What you'll build

A personal blog with Next.js where you write posts in Markdown files and static pages are automatically generated with friendly URLs.
You'll have a main page listing all your posts with title, date, and tags, each post with syntax highlighting for code and the ability to use React components inside Markdown.
The site will be ultra-fast because it's statically generated (SSG) and you can deploy it for free on Vercel.

---

## Step 1: Ask an AI for the blog

\`\`\`
I need a blog with Next.js that:
- Uses MDX for posts
- Has a page listing all posts
- Each post has metadata (title, date, tags)
- Syntax highlighting for code
- Generates static routes (SSG)
- TypeScript and Tailwind CSS

Give me the complete structure with 2 example posts.
\`\`\`

---

## Structure

\`\`\`
app/
├── blog/
│   ├── page.tsx          # Post list
│   └── [slug]/
│       └── page.tsx      # Individual post
content/
├── posts/
│   ├── hello-world.mdx
│   └── second-post.mdx
\`\`\`

---

## MDX example

\`\`\`mdx
---
title: "My First Post"
date: "2026-01-01"
tags: ["nextjs", "tutorial"]
---

# Welcome

This is my first post with **MDX**.

<CustomComponent prop="value" />

\\\`\\\`\\\`typescript
const greeting = "Hello world!"
\\\`\\\`\\\`
\`\`\`

---

## Useful libraries

| Library | What for |
|---------|----------|
| \`@next/mdx\` | MDX in Next.js |
| \`gray-matter\` | Parse frontmatter |
| \`rehype-highlight\` | Syntax highlighting |

---

## Next step

→ [Auth with Firebase Google](/en/cooking/auth-firebase)
    `,
  },
  'auth-firebase': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['React básico', 'Firebase console'],
    prerequisitesEn: ['Basic React', 'Firebase console'],
    contentEs: `
## Lo que vas a construir

Un sistema de autenticacion completo donde tus usuarios inician sesion con su cuenta de Google en un solo clic.
Implementaras un hook personalizado useAuth que maneja todo el estado de autenticacion, un boton de login/logout, proteccion de rutas para contenido privado y persistencia de la sesion.
Al terminar, tendras una base solida de autenticacion que puedes reutilizar en cualquier proyecto React o Next.js.

---

## Setup Firebase

1. Ir a [console.firebase.google.com](https://console.firebase.google.com)
2. Crear proyecto
3. Authentication → Sign-in method → Google → Enable
4. Copiar config

---

## Paso 1: Pídele a una IA la integración

\`\`\`
Necesito integrar Firebase Auth con Google en React:
- Hook personalizado useAuth
- Botón de login/logout
- Mostrar info del usuario
- Proteger rutas
- TypeScript

Config Firebase: (pegar tu config)

Dame el código completo.
\`\`\`

---

## Código típico

\`\`\`typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const app = initializeApp({ /* tu config */ })
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
\`\`\`

\`\`\`typescript
// hooks/useAuth.ts
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  const login = () => signInWithPopup(auth, googleProvider)
  const logout = () => signOut(auth)

  return { user, login, logout }
}
\`\`\`

---

## Proteger rutas

\`\`\`tsx
function ProtectedPage() {
  const { user, login } = useAuth()

  if (!user) {
    return <button onClick={login}>Login con Google</button>
  }

  return <div>Bienvenido, {user.displayName}</div>
}
\`\`\`

---

## Próximo paso

→ [CRUD con PostgreSQL](/es/cooking/crud-postgres)
    `,
    contentEn: `
## What you'll build

A complete authentication system where your users sign in with their Google account in a single click.
You'll implement a custom useAuth hook that handles all authentication state, a login/logout button, route protection for private content, and session persistence.
When finished, you'll have a solid authentication foundation that you can reuse in any React or Next.js project.

---

## Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project
3. Authentication → Sign-in method → Google → Enable
4. Copy config

---

## Step 1: Ask an AI for the integration

\`\`\`
I need to integrate Firebase Auth with Google in React:
- Custom useAuth hook
- Login/logout button
- Show user info
- Protect routes
- TypeScript

Firebase config: (paste your config)

Give me the complete code.
\`\`\`

---

## Typical code

\`\`\`typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const app = initializeApp({ /* your config */ })
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
\`\`\`

\`\`\`typescript
// hooks/useAuth.ts
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  const login = () => signInWithPopup(auth, googleProvider)
  const logout = () => signOut(auth)

  return { user, login, logout }
}
\`\`\`

---

## Protect routes

\`\`\`tsx
function ProtectedPage() {
  const { user, login } = useAuth()

  if (!user) {
    return <button onClick={login}>Login with Google</button>
  }

  return <div>Welcome, {user.displayName}</div>
}
\`\`\`

---

## Next step

→ [CRUD with PostgreSQL](/en/cooking/crud-postgres)
    `,
  },
  'crud-postgres': {
    timeEs: '35 minutos',
    timeEn: '35 minutes',
    prerequisitesEs: ['PostgreSQL', 'Next.js API Routes'],
    prerequisitesEn: ['PostgreSQL', 'Next.js API Routes'],
    contentEs: `
## Base de datos real

Un CRUD completo con PostgreSQL usando Prisma.

---

## Setup

\`\`\`bash
pnpm add prisma @prisma/client
npx prisma init
\`\`\`

---

## Paso 1: Pídele a una IA el CRUD

\`\`\`
Necesito un CRUD completo en Next.js con:
- PostgreSQL + Prisma
- Modelo: User (id, email, name, createdAt)
- API routes para CRUD
- Página con tabla de usuarios
- Formulario para crear/editar
- Validación con Zod
- TypeScript

Dame el schema de Prisma y código completo.
\`\`\`

---

## Schema Prisma

\`\`\`prisma
// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
\`\`\`

\`\`\`bash
npx prisma migrate dev --name init
npx prisma generate
\`\`\`

---

## API Route

\`\`\`typescript
// app/api/users/route.ts
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await prisma.user.create({ data: body })
  return Response.json(user)
}
\`\`\`

---

## Próximo paso

→ [Chat en Tiempo Real](/es/cooking/realtime-chat)
    `,
    contentEn: `
## Real database

A complete CRUD with PostgreSQL using Prisma.

---

## Setup

\`\`\`bash
pnpm add prisma @prisma/client
npx prisma init
\`\`\`

---

## Step 1: Ask an AI for the CRUD

\`\`\`
I need a complete CRUD in Next.js with:
- PostgreSQL + Prisma
- Model: User (id, email, name, createdAt)
- API routes for CRUD
- Page with users table
- Form to create/edit
- Validation with Zod
- TypeScript

Give me the Prisma schema and complete code.
\`\`\`

---

## Prisma Schema

\`\`\`prisma
// prisma/schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
\`\`\`

\`\`\`bash
npx prisma migrate dev --name init
npx prisma generate
\`\`\`

---

## API Route

\`\`\`typescript
// app/api/users/route.ts
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return Response.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await prisma.user.create({ data: body })
  return Response.json(user)
}
\`\`\`

---

## Next step

→ [Real-time Chat](/en/cooking/realtime-chat)
    `,
  },
  'realtime-chat': {
    timeEs: '40 minutos',
    timeEn: '40 minutes',
    prerequisitesEs: ['WebSockets', 'React'],
    prerequisitesEn: ['WebSockets', 'React'],
    contentEs: `
## Mensajes instantáneos

Un chat en tiempo real con WebSockets o Firebase.

---

## Opciones

| Tecnología | Ideal para |
|------------|------------|
| **Socket.io** | Control total |
| **Firebase Realtime** | Rápido de implementar |
| **Supabase Realtime** | Con PostgreSQL |

---

## Paso 1: Pídele a una IA el chat

\`\`\`
Necesito un chat en tiempo real con:
- Firebase Realtime Database
- Múltiples usuarios
- Mensajes con timestamp
- Scroll automático al nuevo mensaje
- Indicador de "escribiendo..."
- React + TypeScript

Dame el código completo.
\`\`\`

---

## Código típico (Firebase)

\`\`\`typescript
import { ref, push, onValue } from 'firebase/database'

// Enviar mensaje
const sendMessage = (text: string) => {
  push(ref(db, 'messages'), {
    text,
    userId: user.uid,
    userName: user.displayName,
    timestamp: Date.now()
  })
}

// Escuchar mensajes
useEffect(() => {
  const messagesRef = ref(db, 'messages')
  return onValue(messagesRef, (snapshot) => {
    const data = snapshot.val()
    setMessages(Object.values(data || {}))
  })
}, [])
\`\`\`

---

## Próximo paso

→ [Subida de Archivos S3](/es/cooking/file-upload)
    `,
    contentEn: `
## Instant messages

A real-time chat with WebSockets or Firebase.

---

## Options

| Technology | Ideal for |
|------------|-----------|
| **Socket.io** | Full control |
| **Firebase Realtime** | Quick to implement |
| **Supabase Realtime** | With PostgreSQL |

---

## Step 1: Ask an AI for the chat

\`\`\`
I need a real-time chat with:
- Firebase Realtime Database
- Multiple users
- Messages with timestamp
- Auto scroll to new message
- "Typing..." indicator
- React + TypeScript

Give me the complete code.
\`\`\`

---

## Typical code (Firebase)

\`\`\`typescript
import { ref, push, onValue } from 'firebase/database'

// Send message
const sendMessage = (text: string) => {
  push(ref(db, 'messages'), {
    text,
    userId: user.uid,
    userName: user.displayName,
    timestamp: Date.now()
  })
}

// Listen to messages
useEffect(() => {
  const messagesRef = ref(db, 'messages')
  return onValue(messagesRef, (snapshot) => {
    const data = snapshot.val()
    setMessages(Object.values(data || {}))
  })
}, [])
\`\`\`

---

## Next step

→ [S3 File Upload](/en/cooking/file-upload)
    `,
  },
  'file-upload': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['AWS S3', 'Next.js API'],
    prerequisitesEn: ['AWS S3', 'Next.js API'],
    contentEs: `
## Subida segura de archivos

Sube archivos a S3 usando URLs pre-firmadas.

---

## Por qué pre-signed URLs

- El archivo va directo a S3 (no pasa por tu servidor)
- Más rápido y económico
- Tu servidor solo genera la URL

---

## Paso 1: Pídele a una IA la implementación

\`\`\`
Necesito subida de archivos a S3 con:
- URLs pre-firmadas
- API route que genere la URL
- Componente de upload con drag & drop
- Barra de progreso
- Validación de tipo y tamaño
- TypeScript

Dame el código completo.
\`\`\`

---

## API Route

\`\`\`typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({ region: 'us-east-1' })

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: \`uploads/\${Date.now()}-\${filename}\`,
    ContentType: contentType
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return Response.json({ url })
}
\`\`\`

---

## Cliente

\`\`\`typescript
async function uploadFile(file: File) {
  // 1. Obtener URL pre-firmada
  const { url } = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, contentType: file.type })
  }).then(r => r.json())

  // 2. Subir directo a S3
  await fetch(url, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type }
  })
}
\`\`\`

---

## Próximo paso

→ [Pagos con Stripe](/es/cooking/payment-stripe)
    `,
    contentEn: `
## Secure file upload

Upload files to S3 using pre-signed URLs.

---

## Why pre-signed URLs

- File goes directly to S3 (doesn't pass through your server)
- Faster and cheaper
- Your server only generates the URL

---

## Step 1: Ask an AI for the implementation

\`\`\`
I need file upload to S3 with:
- Pre-signed URLs
- API route that generates the URL
- Upload component with drag & drop
- Progress bar
- Type and size validation
- TypeScript

Give me the complete code.
\`\`\`

---

## API Route

\`\`\`typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({ region: 'us-east-1' })

export async function POST(request: Request) {
  const { filename, contentType } = await request.json()

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: \`uploads/\${Date.now()}-\${filename}\`,
    ContentType: contentType
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return Response.json({ url })
}
\`\`\`

---

## Client

\`\`\`typescript
async function uploadFile(file: File) {
  // 1. Get pre-signed URL
  const { url } = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ filename: file.name, contentType: file.type })
  }).then(r => r.json())

  // 2. Upload directly to S3
  await fetch(url, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type }
  })
}
\`\`\`

---

## Next step

→ [Payments with Stripe](/en/cooking/payment-stripe)
    `,
  },
  'payment-stripe': {
    timeEs: '35 minutos',
    timeEn: '35 minutes',
    prerequisitesEs: ['Stripe account', 'Next.js API'],
    prerequisitesEn: ['Stripe account', 'Next.js API'],
    contentEs: `
## Pagos seguros

Stripe maneja tarjetas, suscripciones y cumplimiento por ti.

---

## Setup

1. Crear cuenta en [stripe.com](https://stripe.com)
2. Copiar API keys (test mode)
3. \`pnpm add stripe @stripe/stripe-js\`

---

## Paso 1: Pídele a una IA la integración

\`\`\`
Necesito integrar pagos con Stripe:
- Checkout Session para pago único
- Webhook para confirmar pago
- Página de éxito/cancelación
- Next.js App Router
- TypeScript

Dame el código completo.
\`\`\`

---

## API Route

\`\`\`typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { priceId } = await request.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.URL}/success\`,
    cancel_url: \`\${process.env.URL}/cancel\`
  })

  return Response.json({ url: session.url })
}
\`\`\`

---

## Botón de pago

\`\`\`tsx
const handleCheckout = async () => {
  const { url } = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId: 'price_xxx' })
  }).then(r => r.json())

  window.location.href = url
}
\`\`\`

---

## Próximo paso

→ [Emails Transaccionales](/es/cooking/email-notifications)
    `,
    contentEn: `
## Secure payments

Stripe handles cards, subscriptions, and compliance for you.

---

## Setup

1. Create account at [stripe.com](https://stripe.com)
2. Copy API keys (test mode)
3. \`pnpm add stripe @stripe/stripe-js\`

---

## Step 1: Ask an AI for the integration

\`\`\`
I need to integrate payments with Stripe:
- Checkout Session for one-time payment
- Webhook to confirm payment
- Success/cancel page
- Next.js App Router
- TypeScript

Give me the complete code.
\`\`\`

---

## API Route

\`\`\`typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { priceId } = await request.json()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: \`\${process.env.URL}/success\`,
    cancel_url: \`\${process.env.URL}/cancel\`
  })

  return Response.json({ url: session.url })
}
\`\`\`

---

## Payment button

\`\`\`tsx
const handleCheckout = async () => {
  const { url } = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId: 'price_xxx' })
  }).then(r => r.json())

  window.location.href = url
}
\`\`\`

---

## Next step

→ [Transactional Emails](/en/cooking/email-notifications)
    `,
  },
  'email-notifications': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Node.js', 'API REST'],
    prerequisitesEn: ['Node.js', 'REST API'],
    contentEs: `
## Emails que llegan

Envía emails transaccionales con Resend o SendGrid.

---

## Servicios recomendados

| Servicio | Gratis | Ideal para |
|----------|--------|------------|
| **Resend** | 3000/mes | Developers |
| **SendGrid** | 100/día | Enterprise |
| **Postmark** | 100/mes | Transaccional |

---

## Setup Resend

\`\`\`bash
pnpm add resend
\`\`\`

---

## Código

\`\`\`typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'Tu App <noreply@tudominio.com>',
    to,
    subject: 'Bienvenido!',
    html: \`
      <h1>Hola \${name}!</h1>
      <p>Gracias por registrarte.</p>
    \`
  })
}
\`\`\`

---

## Con React Email

\`\`\`tsx
import { render } from '@react-email/render'
import WelcomeEmail from './emails/Welcome'

const html = render(<WelcomeEmail name={name} />)
await resend.emails.send({ ..., html })
\`\`\`

---

## Próximo paso

→ [Deploy con Docker](/es/cooking/docker-deploy)
    `,
    contentEn: `
## Emails that arrive

Send transactional emails with Resend or SendGrid.

---

## Recommended services

| Service | Free | Ideal for |
|---------|------|-----------|
| **Resend** | 3000/month | Developers |
| **SendGrid** | 100/day | Enterprise |
| **Postmark** | 100/month | Transactional |

---

## Resend Setup

\`\`\`bash
pnpm add resend
\`\`\`

---

## Code

\`\`\`typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to,
    subject: 'Welcome!',
    html: \`
      <h1>Hello \${name}!</h1>
      <p>Thanks for signing up.</p>
    \`
  })
}
\`\`\`

---

## With React Email

\`\`\`tsx
import { render } from '@react-email/render'
import WelcomeEmail from './emails/Welcome'

const html = render(<WelcomeEmail name={name} />)
await resend.emails.send({ ..., html })
\`\`\`

---

## Next step

→ [Deploy with Docker](/en/cooking/docker-deploy)
    `,
  },
  'docker-deploy': {
    timeEs: '40 minutos',
    timeEn: '40 minutes',
    prerequisitesEs: ['Docker Compose', 'VPS básico'],
    prerequisitesEn: ['Docker Compose', 'Basic VPS'],
    contentEs: `
## Tu app en producción

Despliega tu aplicación con Docker en un VPS.

---

## Requisitos

- VPS (DigitalOcean, Hetzner, etc.)
- Docker instalado en el VPS
- Dominio (opcional pero recomendado)

---

## Paso 1: Pídele a una IA el setup

\`\`\`
Necesito desplegar una app Next.js con:
- Dockerfile optimizado (multi-stage)
- docker-compose.yml con:
  - App Next.js
  - PostgreSQL
  - Redis
  - Nginx como reverse proxy
- HTTPS con Let's Encrypt
- Scripts de deploy

Dame todos los archivos necesarios.
\`\`\`

---

## Dockerfile

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
CMD ["node", "server.js"]
\`\`\`

---

## Deploy

\`\`\`bash
ssh user@server "cd /app && git pull && docker compose up -d --build"
\`\`\`

---

## Próximo paso

→ [CI/CD con GitHub Actions](/es/cooking/github-actions)
    `,
    contentEn: `
## Your app in production

Deploy your application with Docker on a VPS.

---

## Requirements

- VPS (DigitalOcean, Hetzner, etc.)
- Docker installed on VPS
- Domain (optional but recommended)

---

## Step 1: Ask an AI for the setup

\`\`\`
I need to deploy a Next.js app with:
- Optimized Dockerfile (multi-stage)
- docker-compose.yml with:
  - Next.js App
  - PostgreSQL
  - Redis
  - Nginx as reverse proxy
- HTTPS with Let's Encrypt
- Deploy scripts

Give me all necessary files.
\`\`\`

---

## Dockerfile

\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
CMD ["node", "server.js"]
\`\`\`

---

## Deploy

\`\`\`bash
ssh user@server "cd /app && git pull && docker compose up -d --build"
\`\`\`

---

## Next step

→ [CI/CD with GitHub Actions](/en/cooking/github-actions)
    `,
  },
  'github-actions': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['GitHub repo', 'Docker deploy'],
    prerequisitesEn: ['GitHub repo', 'Docker deploy'],
    contentEs: `
## Deploy automático

GitHub Actions ejecuta tests y despliega cuando haces push.

---

## Paso 1: Pídele a una IA el workflow

\`\`\`
Necesito un workflow de GitHub Actions que:
- Corra en push a main
- Ejecute tests
- Build de Docker
- Deploy a VPS via SSH
- Notifique en Slack si falla

Dame el archivo .yml completo.
\`\`\`

---

## Workflow

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
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.HOST }}
          username: \${{ secrets.USER }}
          key: \${{ secrets.SSH_KEY }}
          script: |
            cd /app
            git pull
            docker compose up -d --build
\`\`\`

---

## Secretos necesarios

- \`HOST\`: IP del servidor
- \`USER\`: Usuario SSH
- \`SSH_KEY\`: Llave privada

---

## Próximo paso

→ [Testing de APIs](/es/cooking/api-testing)
    `,
    contentEn: `
## Automatic deploy

GitHub Actions runs tests and deploys when you push.

---

## Step 1: Ask an AI for the workflow

\`\`\`
I need a GitHub Actions workflow that:
- Runs on push to main
- Runs tests
- Docker build
- Deploy to VPS via SSH
- Notify on Slack if fails

Give me the complete .yml file.
\`\`\`

---

## Workflow

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
      - run: npm ci && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.HOST }}
          username: \${{ secrets.USER }}
          key: \${{ secrets.SSH_KEY }}
          script: |
            cd /app
            git pull
            docker compose up -d --build
\`\`\`

---

## Required secrets

- \`HOST\`: Server IP
- \`USER\`: SSH user
- \`SSH_KEY\`: Private key

---

## Next step

→ [API Testing](/en/cooking/api-testing)
    `,
  },
  'api-testing': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['API REST', 'Jest o Vitest'],
    prerequisitesEn: ['REST API', 'Jest or Vitest'],
    contentEs: `
## Tests que previenen bugs

Testea tus APIs automáticamente con cada cambio.

---

## Paso 1: Pídele a una IA los tests

\`\`\`
Necesito tests para una API REST con:
- Vitest + supertest
- Tests para cada endpoint (GET, POST, PUT, DELETE)
- Mock de base de datos
- Tests de autenticación
- Coverage report

Dame los tests completos para un CRUD de users.
\`\`\`

---

## Setup

\`\`\`bash
pnpm add -D vitest supertest @types/supertest
\`\`\`

---

## Test ejemplo

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('Users API', () => {
  it('GET /api/users returns users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/users creates user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com', name: 'Test' })

    expect(res.status).toBe(201)
    expect(res.body.email).toBe('test@test.com')
  })
})
\`\`\`

---

## Próximo paso

→ [App Móvil con Expo](/es/cooking/mobile-expo)
    `,
    contentEn: `
## Tests that prevent bugs

Test your APIs automatically with each change.

---

## Step 1: Ask an AI for the tests

\`\`\`
I need tests for a REST API with:
- Vitest + supertest
- Tests for each endpoint (GET, POST, PUT, DELETE)
- Database mock
- Authentication tests
- Coverage report

Give me complete tests for a users CRUD.
\`\`\`

---

## Setup

\`\`\`bash
pnpm add -D vitest supertest @types/supertest
\`\`\`

---

## Test example

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('Users API', () => {
  it('GET /api/users returns users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/users creates user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com', name: 'Test' })

    expect(res.status).toBe(201)
    expect(res.body.email).toBe('test@test.com')
  })
})
\`\`\`

---

## Next step

→ [Mobile App with Expo](/en/cooking/mobile-expo)
    `,
  },
  'mobile-expo': {
    timeEs: '35 minutos',
    timeEn: '35 minutes',
    prerequisitesEs: ['React Native', 'Expo'],
    prerequisitesEn: ['React Native', 'Expo'],
    contentEs: `
## Tu primera app móvil

Crea una app iOS/Android con React y Expo.

---

## Paso 1: Pídele a una IA la app

\`\`\`
Necesito una app móvil con Expo que:
- Tenga 3 pantallas (Home, Lista, Perfil)
- Use React Navigation
- Fetch de API externa
- Almacenamiento local (AsyncStorage)
- Estilos consistentes
- TypeScript

Dame la estructura y código completo.
\`\`\`

---

## Setup

\`\`\`bash
npx create-expo-app@latest mi-app --template blank-typescript
cd mi-app
npx expo install @react-navigation/native @react-navigation/stack
npx expo start
\`\`\`

---

## Navegación

\`\`\`tsx
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
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

## Próximo paso

→ [Push Notifications](/es/cooking/push-notifications)
    `,
    contentEn: `
## Your first mobile app

Create an iOS/Android app with React and Expo.

---

## Step 1: Ask an AI for the app

\`\`\`
I need a mobile app with Expo that:
- Has 3 screens (Home, List, Profile)
- Uses React Navigation
- Fetches from external API
- Local storage (AsyncStorage)
- Consistent styles
- TypeScript

Give me the structure and complete code.
\`\`\`

---

## Setup

\`\`\`bash
npx create-expo-app@latest my-app --template blank-typescript
cd my-app
npx expo install @react-navigation/native @react-navigation/stack
npx expo start
\`\`\`

---

## Navigation

\`\`\`tsx
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
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

## Next step

→ [Push Notifications](/en/cooking/push-notifications)
    `,
  },
  'push-notifications': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Expo app', 'Backend'],
    prerequisitesEn: ['Expo app', 'Backend'],
    contentEs: `
## Notificaciones que enganchen

Envía push notifications a tus usuarios.

---

## Con Expo Push

\`\`\`bash
npx expo install expo-notifications expo-device
\`\`\`

---

## Obtener token

\`\`\`typescript
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

async function registerForPush() {
  if (!Device.isDevice) return

  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') return

  const token = await Notifications.getExpoPushTokenAsync()
  // Guardar token en tu backend
  return token.data
}
\`\`\`

---

## Enviar desde backend

\`\`\`typescript
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'ExponentPushToken[xxx]',
    title: 'Nuevo mensaje',
    body: 'Tienes un mensaje nuevo',
    data: { screen: 'Chat' }
  })
})
\`\`\`

---

## Próximo paso

→ [Receptor de Webhooks](/es/cooking/webhook-receiver)
    `,
    contentEn: `
## Notifications that engage

Send push notifications to your users.

---

## With Expo Push

\`\`\`bash
npx expo install expo-notifications expo-device
\`\`\`

---

## Get token

\`\`\`typescript
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

async function registerForPush() {
  if (!Device.isDevice) return

  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') return

  const token = await Notifications.getExpoPushTokenAsync()
  // Save token to your backend
  return token.data
}
\`\`\`

---

## Send from backend

\`\`\`typescript
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'ExponentPushToken[xxx]',
    title: 'New message',
    body: 'You have a new message',
    data: { screen: 'Chat' }
  })
})
\`\`\`

---

## Next step

→ [Webhook Receiver](/en/cooking/webhook-receiver)
    `,
  },
  'webhook-receiver': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Next.js API', 'Webhooks'],
    prerequisitesEn: ['Next.js API', 'Webhooks'],
    contentEs: `
## Recibe eventos externos

Procesa webhooks de Stripe, GitHub, etc.

---

## Paso 1: Pídele a una IA el receptor

\`\`\`
Necesito un receptor de webhooks con:
- Verificación de firma HMAC
- Logging de eventos
- Manejo de errores
- Retry logic
- Guardado en base de datos
- Next.js App Router

Dame el código para webhooks de Stripe.
\`\`\`

---

## Código

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new Response('Invalid signature', { status: 400 })
  }

  // Procesar evento
  switch (event.type) {
    case 'checkout.session.completed':
      // Activar suscripción
      break
  }

  return new Response('OK')
}
\`\`\`

---

## Próximo paso

→ [Cache con Redis](/es/cooking/redis-cache)
    `,
    contentEn: `
## Receive external events

Process webhooks from Stripe, GitHub, etc.

---

## Step 1: Ask an AI for the receiver

\`\`\`
I need a webhook receiver with:
- HMAC signature verification
- Event logging
- Error handling
- Retry logic
- Save to database
- Next.js App Router

Give me the code for Stripe webhooks.
\`\`\`

---

## Code

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new Response('Invalid signature', { status: 400 })
  }

  // Process event
  switch (event.type) {
    case 'checkout.session.completed':
      // Activate subscription
      break
  }

  return new Response('OK')
}
\`\`\`

---

## Next step

→ [Cache with Redis](/en/cooking/redis-cache)
    `,
  },
  'redis-cache': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Redis', 'API REST'],
    prerequisitesEn: ['Redis', 'REST API'],
    contentEs: `
## Respuestas instantáneas

Usa Redis para cachear datos y acelerar tu app.

---

## Paso 1: Pídele a una IA la implementación

\`\`\`
Necesito implementar cache con Redis:
- Wrapper para fetch con cache
- Invalidación por tiempo (TTL)
- Invalidación manual
- Pattern para API routes
- TypeScript + ioredis

Dame el código completo.
\`\`\`

---

## Código

\`\`\`typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600
): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}

// Uso
const users = await cached(
  'users:all',
  () => prisma.user.findMany(),
  300 // 5 minutos
)
\`\`\`

---

## Invalidar

\`\`\`typescript
// Invalidar una key
await redis.del('users:all')

// Invalidar por patrón
const keys = await redis.keys('users:*')
if (keys.length) await redis.del(...keys)
\`\`\`

---

## Próximo paso

→ [Arduino + MQTT](/es/cooking/arduino-sensor)
    `,
    contentEn: `
## Instant responses

Use Redis to cache data and speed up your app.

---

## Step 1: Ask an AI for the implementation

\`\`\`
I need to implement cache with Redis:
- Fetch wrapper with cache
- Time-based invalidation (TTL)
- Manual invalidation
- Pattern for API routes
- TypeScript + ioredis

Give me the complete code.
\`\`\`

---

## Code

\`\`\`typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600
): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const data = await fetcher()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}

// Usage
const users = await cached(
  'users:all',
  () => prisma.user.findMany(),
  300 // 5 minutes
)
\`\`\`

---

## Invalidate

\`\`\`typescript
// Invalidate one key
await redis.del('users:all')

// Invalidate by pattern
const keys = await redis.keys('users:*')
if (keys.length) await redis.del(...keys)
\`\`\`

---

## Next step

→ [Arduino + MQTT](/en/cooking/arduino-sensor)
    `,
  },
  'arduino-sensor': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Arduino/ESP32', 'MQTT'],
    prerequisitesEn: ['Arduino/ESP32', 'MQTT'],
    contentEs: `
## Lo que vas a construir

En este proyecto vas a conectar el mundo físico con tu aplicación web.

Usarás un ESP32 (o Arduino con WiFi) para leer datos de un sensor de temperatura y humedad. Esos datos viajarán por WiFi usando el protocolo MQTT hasta un servidor Node.js que los guardará en una base de datos.

Al terminar tendrás un sistema IoT completo: hardware que mide, servidor que procesa, y datos listos para mostrar en un dashboard.

---

## Materiales

- ESP32 o Arduino + WiFi
- Sensor (temperatura, humedad, etc.)
- Cables

---

## Paso 1: Pídele a una IA el código

\`\`\`
Necesito código Arduino/ESP32 que:
- Lea sensor DHT22 (temp y humedad)
- Envíe datos por MQTT cada 5 segundos
- Use WiFi
- Reconecte automáticamente

Y código Node.js que:
- Reciba datos MQTT
- Guarde en PostgreSQL
- Exponga API para el dashboard

Dame todo el código.
\`\`\`

---

## Código ESP32

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

DHT dht(4, DHT22);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  WiFi.begin("SSID", "password");
  client.setServer("broker.hivemq.com", 1883);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  String payload = String(temp) + "," + String(hum);
  client.publish("home/sensor", payload.c_str());

  delay(5000);
}
\`\`\`

---

## Próximo paso

→ [Dashboard de Analytics](/es/cooking/dashboard-analytics)
    `,
    contentEn: `
## What you'll build

In this project you'll connect the physical world with your web application.

You'll use an ESP32 (or Arduino with WiFi) to read data from a temperature and humidity sensor. That data will travel over WiFi using the MQTT protocol to a Node.js server that will save it to a database.

When finished, you'll have a complete IoT system: hardware that measures, a server that processes, and data ready to display on a dashboard.

---

## Materials

- ESP32 or Arduino + WiFi
- Sensor (temperature, humidity, etc.)
- Cables

---

## Step 1: Ask an AI for the code

\`\`\`
I need Arduino/ESP32 code that:
- Reads DHT22 sensor (temp and humidity)
- Sends data via MQTT every 5 seconds
- Uses WiFi
- Auto reconnects

And Node.js code that:
- Receives MQTT data
- Saves to PostgreSQL
- Exposes API for dashboard

Give me all the code.
\`\`\`

---

## ESP32 Code

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

DHT dht(4, DHT22);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  WiFi.begin("SSID", "password");
  client.setServer("broker.hivemq.com", 1883);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();

  String payload = String(temp) + "," + String(hum);
  client.publish("home/sensor", payload.c_str());

  delay(5000);
}
\`\`\`

---

## Next step

→ [Analytics Dashboard](/en/cooking/dashboard-analytics)
    `,
  },
  'dashboard-analytics': {
    timeEs: '35 minutos',
    timeEn: '35 minutes',
    prerequisitesEs: ['React', 'Charts', 'API'],
    prerequisitesEn: ['React', 'Charts', 'API'],
    contentEs: `
## Visualiza tus datos

Crea un dashboard con gráficos y métricas.

---

## Paso 1: Pídele a una IA el dashboard

\`\`\`
Necesito un dashboard de analytics con:
- Gráfico de líneas (últimos 7 días)
- Cards con métricas (usuarios, ventas, etc.)
- Tabla con datos recientes
- Filtros por fecha
- Responsive
- React + Recharts + Tailwind

Dame el código completo.
\`\`\`

---

## Librerías

\`\`\`bash
pnpm add recharts
\`\`\`

---

## Gráfico

\`\`\`tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { date: '01/01', users: 400 },
  { date: '02/01', users: 300 },
  { date: '03/01', users: 500 },
]

function Chart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#3b82f6" />
    </LineChart>
  )
}
\`\`\`

---

## Siguiente nivel

→ [RAG con Documentos PDF](/es/cooking/rag-documents) — Nivel Master
    `,
    contentEn: `
## Visualize your data

Create a dashboard with charts and metrics.

---

## Step 1: Ask an AI for the dashboard

\`\`\`
I need an analytics dashboard with:
- Line chart (last 7 days)
- Cards with metrics (users, sales, etc.)
- Table with recent data
- Date filters
- Responsive
- React + Recharts + Tailwind

Give me the complete code.
\`\`\`

---

## Libraries

\`\`\`bash
pnpm add recharts
\`\`\`

---

## Chart

\`\`\`tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { date: '01/01', users: 400 },
  { date: '02/01', users: 300 },
  { date: '03/01', users: 500 },
]

function Chart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#3b82f6" />
    </LineChart>
  )
}
\`\`\`

---

## Next level

→ [RAG with PDF Documents](/en/cooking/rag-documents) — Master Level
    `,
  },

  // =============================================
  // MASTER CHEF - IA Avanzada (10 platillos)
  // =============================================

  'rag-documents': {
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['Python', 'API de LLM (Gemini)'],
    prerequisitesEn: ['Python', 'LLM API (Gemini)'],
    contentEs: `
## Lo que vas a construir

Un sistema RAG (Retrieval-Augmented Generation) que responde preguntas sobre tus propios documentos PDF.

Cargas tus PDFs (contratos, manuales, documentacion), y puedes preguntarle cosas como "Cual es la politica de devolucion?" o "Que dice el articulo 5?". El sistema busca en tus documentos, encuentra la informacion relevante, y genera una respuesta precisa usando IA.

Al terminar tendras un script en Python que procesa PDFs, crea embeddings con Gemini, los guarda en ChromaDB, y responde preguntas basandose en el contenido real de tus documentos.

---

## El prompt para empezar

> Crea un sistema RAG en Python que:
> 1. Cargue PDFs de una carpeta
> 2. Los divida en chunks de 500 caracteres
> 3. Cree embeddings con Gemini
> 4. Guarde en ChromaDB
> 5. Permita hacer preguntas y obtenga contexto relevante
> 6. Use Gemini para responder basándose en el contexto

---

## Lo que la IA creará

\`\`\`python
from PyPDF2 import PdfReader
import chromadb
from chromadb.utils import embedding_functions
import google.generativeai as genai
import os

# Configurar
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

# ChromaDB con embeddings de Gemini
client = chromadb.Client()
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
    api_key=os.environ["GEMINI_API_KEY"]
)
collection = client.create_collection("docs", embedding_function=gemini_ef)

def load_pdfs(folder: str) -> list[str]:
    """Cargar todos los PDFs de una carpeta"""
    chunks = []
    for file in os.listdir(folder):
        if file.endswith(".pdf"):
            reader = PdfReader(os.path.join(folder, file))
            text = "".join(page.extract_text() for page in reader.pages)
            # Dividir en chunks
            for i in range(0, len(text), 500):
                chunks.append(text[i:i+500])
    return chunks

def index_documents(folder: str):
    """Indexar documentos en ChromaDB"""
    chunks = load_pdfs(folder)
    collection.add(
        documents=chunks,
        ids=[f"chunk_{i}" for i in range(len(chunks))]
    )
    print(f"Indexados {len(chunks)} chunks")

def ask(question: str) -> str:
    """Preguntar al RAG"""
    # Buscar contexto relevante
    results = collection.query(
        query_texts=[question],
        n_results=3
    )
    context = "\\n---\\n".join(results["documents"][0])

    # Generar respuesta con contexto
    prompt = f"""Responde usando SOLO la información del contexto.
Si no está en el contexto, di "No tengo esa información".

CONTEXTO:
{context}

PREGUNTA: {question}"""

    response = model.generate_content(prompt)
    return response.text

# Uso
index_documents("./mis_documentos")
respuesta = ask("¿Cuál es el proceso de onboarding?")
print(respuesta)
\`\`\`

---

## Instalación

\`\`\`bash
pip install PyPDF2 chromadb google-generativeai
\`\`\`

---

## Mejoras sugeridas

| Mejora | Descripción |
|--------|-------------|
| **Chunks semánticos** | Dividir por párrafos |
| **Metadata** | Guardar nombre de archivo |
| **Reranking** | Reordenar resultados |
| **Streaming** | Respuesta en tiempo real |

---

## Siguiente nivel

→ [Búsqueda Vectorial](/es/cooking/vector-search)
    `,
    contentEn: `
## What you'll build

A RAG (Retrieval-Augmented Generation) system that answers questions about your own PDF documents.

You load your PDFs (contracts, manuals, documentation), and you can ask things like "What's the return policy?" or "What does article 5 say?". The system searches your documents, finds the relevant information, and generates a precise answer using AI.

When finished, you'll have a Python script that processes PDFs, creates embeddings with Gemini, stores them in ChromaDB, and answers questions based on the actual content of your documents.

---

## The prompt to start

> Create a RAG system in Python that:
> 1. Loads PDFs from a folder
> 2. Splits them into 500-character chunks
> 3. Creates embeddings with Gemini
> 4. Stores in ChromaDB
> 5. Allows asking questions and gets relevant context
> 6. Uses Gemini to answer based on context

---

## What the AI will create

\`\`\`python
from PyPDF2 import PdfReader
import chromadb
from chromadb.utils import embedding_functions
import google.generativeai as genai
import os

# Configure
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

# ChromaDB with Gemini embeddings
client = chromadb.Client()
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
    api_key=os.environ["GEMINI_API_KEY"]
)
collection = client.create_collection("docs", embedding_function=gemini_ef)

def load_pdfs(folder: str) -> list[str]:
    """Load all PDFs from a folder"""
    chunks = []
    for file in os.listdir(folder):
        if file.endswith(".pdf"):
            reader = PdfReader(os.path.join(folder, file))
            text = "".join(page.extract_text() for page in reader.pages)
            # Split into chunks
            for i in range(0, len(text), 500):
                chunks.append(text[i:i+500])
    return chunks

def index_documents(folder: str):
    """Index documents in ChromaDB"""
    chunks = load_pdfs(folder)
    collection.add(
        documents=chunks,
        ids=[f"chunk_{i}" for i in range(len(chunks))]
    )
    print(f"Indexed {len(chunks)} chunks")

def ask(question: str) -> str:
    """Ask the RAG"""
    # Search relevant context
    results = collection.query(
        query_texts=[question],
        n_results=3
    )
    context = "\\n---\\n".join(results["documents"][0])

    # Generate response with context
    prompt = f"""Answer using ONLY information from the context.
If not in context, say "I don't have that information".

CONTEXT:
{context}

QUESTION: {question}"""

    response = model.generate_content(prompt)
    return response.text

# Usage
index_documents("./my_documents")
answer = ask("What is the onboarding process?")
print(answer)
\`\`\`

---

## Installation

\`\`\`bash
pip install PyPDF2 chromadb google-generativeai
\`\`\`

---

## Suggested improvements

| Improvement | Description |
|-------------|-------------|
| **Semantic chunks** | Split by paragraphs |
| **Metadata** | Store filename |
| **Reranking** | Reorder results |
| **Streaming** | Real-time response |

---

## Next level

→ [Vector Search](/en/cooking/vector-search)
    `,
  },

  'vector-search': {
    timeEs: '40 minutos',
    timeEn: '40 minutes',
    prerequisitesEs: ['Python básico', 'ChromaDB'],
    prerequisitesEn: ['Basic Python', 'ChromaDB'],
    contentEs: `
## Lo que vas a construir

Un motor de busqueda semantica que entiende el SIGNIFICADO de lo que buscas, no solo palabras clave.

Imagina buscar "animal domestico descansando" y que encuentre documentos sobre "el gato duerme en el sofa". Eso es busqueda vectorial: convierte texto en vectores matematicos y encuentra similitudes conceptuales.

Al terminar tendras un sistema en Python con ChromaDB que indexa documentos, crea embeddings con Gemini, y permite buscar por significado. Ideal para buscar en FAQs, articulos, o cualquier coleccion de texto.

---

## El prompt para empezar

> Crea un sistema de busqueda vectorial en Python con:
> 1. ChromaDB como base de datos vectorial
> 2. Embeddings de Gemini (gratis)
> 3. Función para agregar documentos
> 4. Función para buscar similares
> 5. Mostrar score de similitud

---

## Lo que la IA creará

\`\`\`python
import chromadb
from chromadb.utils import embedding_functions
import os

# Configurar embeddings con Gemini
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
    api_key=os.environ["GEMINI_API_KEY"],
    model_name="models/embedding-001"
)

# Crear cliente y colección
client = chromadb.PersistentClient(path="./vector_db")
collection = client.get_or_create_collection(
    name="documentos",
    embedding_function=gemini_ef,
    metadata={"hnsw:space": "cosine"}
)

def add_documents(docs: list[dict]):
    """Agregar documentos con metadata"""
    collection.add(
        documents=[d["text"] for d in docs],
        metadatas=[{"source": d.get("source", "unknown")} for d in docs],
        ids=[f"doc_{i}" for i in range(len(docs))]
    )

def search(query: str, n_results: int = 5):
    """Buscar documentos similares"""
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        include=["documents", "distances", "metadatas"]
    )

    for i, (doc, dist, meta) in enumerate(zip(
        results["documents"][0],
        results["distances"][0],
        results["metadatas"][0]
    )):
        similarity = 1 - dist  # Convertir distancia a similitud
        print(f"{i+1}. [{similarity:.2%}] {doc[:100]}...")
        print(f"   Fuente: {meta['source']}")

# Ejemplo
docs = [
    {"text": "El gato duerme en el sofá", "source": "mascotas.txt"},
    {"text": "Python es un lenguaje de programación", "source": "tech.txt"},
    {"text": "Mi perro corre en el parque", "source": "mascotas.txt"},
    {"text": "JavaScript se usa para web", "source": "tech.txt"},
]

add_documents(docs)
search("animal doméstico descansando")
# → Encuentra "El gato duerme en el sofá" con alta similitud
\`\`\`

---

## Comparación SQL vs Vectorial

| SQL tradicional | Búsqueda vectorial |
|-----------------|-------------------|
| \`LIKE '%gato%'\` | Busca "gato" literal |
| Solo coincidencias exactas | Entiende sinónimos |
| No entiende contexto | "mascota" → "gato", "perro" |

---

## Siguiente nivel

→ [Servidor MCP Custom](/es/cooking/mcp-server)
    `,
    contentEn: `
## What you'll build

A semantic search engine that understands the MEANING of what you're looking for, not just keywords.

Imagine searching for "domestic animal resting" and finding documents about "the cat sleeps on the sofa". That's vector search: it converts text into mathematical vectors and finds conceptual similarities.

When finished, you'll have a Python system with ChromaDB that indexes documents, creates embeddings with Gemini, and allows searching by meaning. Perfect for searching FAQs, articles, or any text collection.

---

## The prompt to start

> Create a vector search system in Python with:
> 1. ChromaDB as vector database
> 2. Gemini embeddings (free)
> 3. Function to add documents
> 4. Function to search similar
> 5. Show similarity score

---

## What the AI will create

\`\`\`python
import chromadb
from chromadb.utils import embedding_functions
import os

# Configure embeddings with Gemini
gemini_ef = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
    api_key=os.environ["GEMINI_API_KEY"],
    model_name="models/embedding-001"
)

# Create client and collection
client = chromadb.PersistentClient(path="./vector_db")
collection = client.get_or_create_collection(
    name="documents",
    embedding_function=gemini_ef,
    metadata={"hnsw:space": "cosine"}
)

def add_documents(docs: list[dict]):
    """Add documents with metadata"""
    collection.add(
        documents=[d["text"] for d in docs],
        metadatas=[{"source": d.get("source", "unknown")} for d in docs],
        ids=[f"doc_{i}" for i in range(len(docs))]
    )

def search(query: str, n_results: int = 5):
    """Search similar documents"""
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        include=["documents", "distances", "metadatas"]
    )

    for i, (doc, dist, meta) in enumerate(zip(
        results["documents"][0],
        results["distances"][0],
        results["metadatas"][0]
    )):
        similarity = 1 - dist  # Convert distance to similarity
        print(f"{i+1}. [{similarity:.2%}] {doc[:100]}...")
        print(f"   Source: {meta['source']}")

# Example
docs = [
    {"text": "The cat sleeps on the sofa", "source": "pets.txt"},
    {"text": "Python is a programming language", "source": "tech.txt"},
    {"text": "My dog runs in the park", "source": "pets.txt"},
    {"text": "JavaScript is used for web", "source": "tech.txt"},
]

add_documents(docs)
search("domestic animal resting")
# → Finds "The cat sleeps on the sofa" with high similarity
\`\`\`

---

## SQL vs Vector comparison

| Traditional SQL | Vector search |
|-----------------|---------------|
| \`LIKE '%cat%'\` | Searches literal "cat" |
| Only exact matches | Understands synonyms |
| No context | "pet" → "cat", "dog" |

---

## Next level

→ [Custom MCP Server](/en/cooking/mcp-server)
    `,
  },

  'mcp-server': {
    timeEs: '50 minutos',
    timeEn: '50 minutes',
    prerequisitesEs: ['TypeScript', 'Node.js'],
    prerequisitesEn: ['TypeScript', 'Node.js'],
    contentEs: `
## Lo que vas a construir

Tu propio servidor MCP (Model Context Protocol) que le da herramientas personalizadas a Claude Desktop.

Imagina que Claude pueda consultar el clima, guardar notas, o acceder a tu base de datos. MCP es el estandar para extender las capacidades de Claude. Tu servidor expone "herramientas" que Claude puede llamar durante una conversacion.

Al terminar tendras un servidor MCP en TypeScript que funciona con Claude Desktop. Podras agregar cualquier herramienta: APIs externas, bases de datos, sistema de archivos, lo que necesites.

---

## El prompt para empezar

> Crea un servidor MCP en TypeScript que:
> 1. Tenga una herramienta "clima" que reciba ciudad
> 2. Tenga una herramienta "notas" para guardar/leer notas
> 3. Use el SDK oficial de MCP
> 4. Funcione con Claude Desktop

---

## Lo que la IA creará

\`\`\`typescript
// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "mi-servidor-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Base de datos simple para notas
const notas: Record<string, string> = {};

// Definir herramientas disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "clima",
      description: "Obtiene el clima de una ciudad",
      inputSchema: {
        type: "object",
        properties: {
          ciudad: { type: "string", description: "Nombre de la ciudad" }
        },
        required: ["ciudad"]
      }
    },
    {
      name: "guardar_nota",
      description: "Guarda una nota",
      inputSchema: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          contenido: { type: "string" }
        },
        required: ["titulo", "contenido"]
      }
    },
    {
      name: "leer_notas",
      description: "Lee todas las notas guardadas",
      inputSchema: { type: "object", properties: {} }
    }
  ]
}));

// Implementar herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "clima": {
      // Simular API de clima
      const ciudad = args?.ciudad as string;
      const temp = Math.floor(Math.random() * 30) + 5;
      return {
        content: [{
          type: "text",
          text: \`El clima en \${ciudad}: \${temp}°C, parcialmente nublado\`
        }]
      };
    }

    case "guardar_nota": {
      const { titulo, contenido } = args as { titulo: string; contenido: string };
      notas[titulo] = contenido;
      return {
        content: [{ type: "text", text: \`Nota "\${titulo}" guardada\` }]
      };
    }

    case "leer_notas": {
      const lista = Object.entries(notas)
        .map(([t, c]) => \`- \${t}: \${c}\`)
        .join("\\n");
      return {
        content: [{ type: "text", text: lista || "No hay notas" }]
      };
    }

    default:
      throw new Error(\`Herramienta desconocida: \${name}\`);
  }
});

// Iniciar servidor
const transport = new StdioServerTransport();
server.connect(transport);
console.error("Servidor MCP iniciado");
\`\`\`

---

## Configurar Claude Desktop

\`\`\`json
{
  "mcpServers": {
    "mi-servidor": {
      "command": "node",
      "args": ["/ruta/a/dist/index.js"]
    }
  }
}
\`\`\`

---

## Siguiente nivel

→ [Agente IA Autónomo](/es/cooking/ai-agent)
    `,
    contentEn: `
## Custom MCP Server

Create your own MCP server to give tools to Claude.

---

## The prompt to start

> Create an MCP server in TypeScript that:
> 1. Has a "weather" tool that receives city
> 2. Has a "notes" tool to save/read notes
> 3. Uses the official MCP SDK
> 4. Works with Claude Desktop

---

## What the AI will create

\`\`\`typescript
// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "my-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Simple database for notes
const notes: Record<string, string> = {};

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "weather",
      description: "Gets the weather for a city",
      inputSchema: {
        type: "object",
        properties: {
          city: { type: "string", description: "City name" }
        },
        required: ["city"]
      }
    },
    {
      name: "save_note",
      description: "Saves a note",
      inputSchema: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" }
        },
        required: ["title", "content"]
      }
    },
    {
      name: "read_notes",
      description: "Reads all saved notes",
      inputSchema: { type: "object", properties: {} }
    }
  ]
}));

// Implement tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "weather": {
      // Simulate weather API
      const city = args?.city as string;
      const temp = Math.floor(Math.random() * 30) + 5;
      return {
        content: [{
          type: "text",
          text: \`Weather in \${city}: \${temp}°C, partly cloudy\`
        }]
      };
    }

    case "save_note": {
      const { title, content } = args as { title: string; content: string };
      notes[title] = content;
      return {
        content: [{ type: "text", text: \`Note "\${title}" saved\` }]
      };
    }

    case "read_notes": {
      const list = Object.entries(notes)
        .map(([t, c]) => \`- \${t}: \${c}\`)
        .join("\\n");
      return {
        content: [{ type: "text", text: list || "No notes" }]
      };
    }

    default:
      throw new Error(\`Unknown tool: \${name}\`);
  }
});

// Start server
const transport = new StdioServerTransport();
server.connect(transport);
console.error("MCP server started");
\`\`\`

---

## Configure Claude Desktop

\`\`\`json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
\`\`\`

---

## Next level

→ [Autonomous AI Agent](/en/cooking/ai-agent)
    `,
  },

  'ai-agent': {
    timeEs: '60 minutos',
    timeEn: '60 minutes',
    prerequisitesEs: ['Python', 'API de LLM (Gemini)'],
    prerequisitesEn: ['Python', 'LLM API (Gemini)'],
    contentEs: `
## Agente IA Autónomo

Crea un agente que razona, usa herramientas y completa tareas por sí mismo.

---

## El prompt para empezar

> Crea un agente IA en Python con:
> 1. Patrón ReAct (Reasoning + Acting)
> 2. Herramientas: búsqueda web, calculadora, leer archivos
> 3. Loop que ejecute hasta completar la tarea
> 4. Usa Gemini como LLM

---

## Lo que la IA creará

\`\`\`python
import google.generativeai as genai
import os
import json

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

# Definir herramientas
def search_web(query: str) -> str:
    """Simula búsqueda web"""
    return f"Resultados para '{query}': Info relevante encontrada..."

def calculate(expression: str) -> str:
    """Evalúa expresiones matemáticas"""
    try:
        return str(eval(expression))
    except:
        return "Error en cálculo"

def read_file(path: str) -> str:
    """Lee contenido de archivo"""
    try:
        with open(path) as f:
            return f.read()[:1000]
    except:
        return f"No se pudo leer {path}"

TOOLS = {
    "search_web": search_web,
    "calculate": calculate,
    "read_file": read_file,
}

SYSTEM_PROMPT = """Eres un agente que resuelve tareas paso a paso.

Para cada paso, responde en formato JSON:
{
  "thought": "Tu razonamiento",
  "action": "nombre_herramienta",
  "action_input": "parámetro"
}

O si terminaste:
{
  "thought": "Razonamiento final",
  "final_answer": "Tu respuesta"
}

Herramientas disponibles:
- search_web(query): Busca en internet
- calculate(expression): Calcula expresiones
- read_file(path): Lee archivos
"""

def run_agent(task: str, max_steps: int = 10):
    """Ejecutar agente hasta completar tarea"""
    messages = [
        {"role": "user", "parts": [SYSTEM_PROMPT + f"\\n\\nTarea: {task}"]}
    ]

    for step in range(max_steps):
        response = model.generate_content(messages)
        text = response.text

        # Parsear respuesta JSON
        try:
            data = json.loads(text.strip().strip("\`\`\`json").strip("\`\`\`"))
        except:
            print(f"Error parseando: {text}")
            continue

        print(f"\\n--- Paso {step + 1} ---")
        print(f"Pensamiento: {data.get('thought')}")

        # ¿Terminó?
        if "final_answer" in data:
            print(f"\\n✅ Respuesta: {data['final_answer']}")
            return data["final_answer"]

        # Ejecutar herramienta
        action = data.get("action")
        action_input = data.get("action_input")

        if action in TOOLS:
            result = TOOLS[action](action_input)
            print(f"Acción: {action}({action_input})")
            print(f"Resultado: {result}")

            messages.append({"role": "model", "parts": [text]})
            messages.append({"role": "user", "parts": [f"Observación: {result}"]})

    return "Máximo de pasos alcanzado"

# Uso
run_agent("¿Cuál es el resultado de 45 * 23 + 100?")
\`\`\`

---

## Siguiente nivel

→ [Clasificador de Imágenes](/es/cooking/image-classifier)
    `,
    contentEn: `
## Autonomous AI Agent

Create an agent that reasons, uses tools, and completes tasks by itself.

---

## The prompt to start

> Create an AI agent in Python with:
> 1. ReAct pattern (Reasoning + Acting)
> 2. Tools: web search, calculator, read files
> 3. Loop that executes until task completion
> 4. Uses Gemini as LLM

---

## What the AI will create

\`\`\`python
import google.generativeai as genai
import os
import json

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

# Define tools
def search_web(query: str) -> str:
    """Simulates web search"""
    return f"Results for '{query}': Relevant info found..."

def calculate(expression: str) -> str:
    """Evaluates math expressions"""
    try:
        return str(eval(expression))
    except:
        return "Calculation error"

def read_file(path: str) -> str:
    """Reads file content"""
    try:
        with open(path) as f:
            return f.read()[:1000]
    except:
        return f"Could not read {path}"

TOOLS = {
    "search_web": search_web,
    "calculate": calculate,
    "read_file": read_file,
}

SYSTEM_PROMPT = """You are an agent that solves tasks step by step.

For each step, respond in JSON format:
{
  "thought": "Your reasoning",
  "action": "tool_name",
  "action_input": "parameter"
}

Or if finished:
{
  "thought": "Final reasoning",
  "final_answer": "Your answer"
}

Available tools:
- search_web(query): Search the internet
- calculate(expression): Calculate expressions
- read_file(path): Read files
"""

def run_agent(task: str, max_steps: int = 10):
    """Run agent until task completion"""
    messages = [
        {"role": "user", "parts": [SYSTEM_PROMPT + f"\\n\\nTask: {task}"]}
    ]

    for step in range(max_steps):
        response = model.generate_content(messages)
        text = response.text

        # Parse JSON response
        try:
            data = json.loads(text.strip().strip("\`\`\`json").strip("\`\`\`"))
        except:
            print(f"Error parsing: {text}")
            continue

        print(f"\\n--- Step {step + 1} ---")
        print(f"Thought: {data.get('thought')}")

        # Finished?
        if "final_answer" in data:
            print(f"\\n✅ Answer: {data['final_answer']}")
            return data["final_answer"]

        # Execute tool
        action = data.get("action")
        action_input = data.get("action_input")

        if action in TOOLS:
            result = TOOLS[action](action_input)
            print(f"Action: {action}({action_input})")
            print(f"Result: {result}")

            messages.append({"role": "model", "parts": [text]})
            messages.append({"role": "user", "parts": [f"Observation: {result}"]})

    return "Max steps reached"

# Usage
run_agent("What is the result of 45 * 23 + 100?")
\`\`\`

---

## Next level

→ [Image Classifier](/en/cooking/image-classifier)
    `,
  },

  'image-classifier': {
    timeEs: '35 minutos',
    timeEn: '35 minutes',
    prerequisitesEs: ['Python', 'API multimodal (Gemini Vision)'],
    prerequisitesEn: ['Python', 'Multimodal API (Gemini Vision)'],
    contentEs: `
## Clasificador de Imágenes

Clasifica imágenes usando modelos multimodales de IA.

---

## El prompt para empezar

> Crea un clasificador de imágenes en Python que:
> 1. Reciba una imagen (path o URL)
> 2. Use Gemini Vision para analizarla
> 3. Devuelva: categoría, confianza, descripción
> 4. Soporte categorías personalizadas

---

## Lo que la IA creará

\`\`\`python
import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO
import os
import json

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

def load_image(source: str) -> Image.Image:
    """Cargar imagen desde path o URL"""
    if source.startswith("http"):
        response = requests.get(source)
        return Image.open(BytesIO(response.content))
    return Image.open(source)

def classify(
    image_source: str,
    categories: list[str] = None
) -> dict:
    """Clasificar imagen"""
    image = load_image(image_source)

    if categories:
        cat_list = ", ".join(categories)
        prompt = f"""Analiza esta imagen y clasifícala en UNA de estas categorías: {cat_list}

Responde en JSON:
{{
  "category": "categoría elegida",
  "confidence": 0.0 a 1.0,
  "description": "descripción breve",
  "objects": ["objetos detectados"]
}}"""
    else:
        prompt = """Analiza esta imagen.

Responde en JSON:
{
  "category": "categoría general",
  "confidence": 0.0 a 1.0,
  "description": "descripción breve",
  "objects": ["objetos detectados"]
}"""

    response = model.generate_content([prompt, image])
    text = response.text.strip().strip("\`\`\`json").strip("\`\`\`")
    return json.loads(text)

# Ejemplos de uso
result = classify("gato.jpg")
print(f"Categoría: {result['category']}")
print(f"Confianza: {result['confidence']:.0%}")
print(f"Descripción: {result['description']}")

# Con categorías personalizadas
result = classify(
    "foto.jpg",
    categories=["comida", "paisaje", "persona", "animal", "objeto"]
)
\`\`\`

---

## Variante: Clasificación batch

\`\`\`python
def classify_batch(images: list[str], categories: list[str]) -> list[dict]:
    """Clasificar múltiples imágenes"""
    results = []
    for img in images:
        try:
            result = classify(img, categories)
            result["source"] = img
            results.append(result)
        except Exception as e:
            results.append({"source": img, "error": str(e)})
    return results
\`\`\`

---

## Siguiente nivel

→ [Asistente de Voz](/es/cooking/voice-assistant)
    `,
    contentEn: `
## Image Classifier

Classify images using multimodal AI models.

---

## The prompt to start

> Create an image classifier in Python that:
> 1. Receives an image (path or URL)
> 2. Uses Gemini Vision to analyze it
> 3. Returns: category, confidence, description
> 4. Supports custom categories

---

## What the AI will create

\`\`\`python
import google.generativeai as genai
from PIL import Image
import requests
from io import BytesIO
import os
import json

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

def load_image(source: str) -> Image.Image:
    """Load image from path or URL"""
    if source.startswith("http"):
        response = requests.get(source)
        return Image.open(BytesIO(response.content))
    return Image.open(source)

def classify(
    image_source: str,
    categories: list[str] = None
) -> dict:
    """Classify image"""
    image = load_image(image_source)

    if categories:
        cat_list = ", ".join(categories)
        prompt = f"""Analyze this image and classify it in ONE of these categories: {cat_list}

Respond in JSON:
{{
  "category": "chosen category",
  "confidence": 0.0 to 1.0,
  "description": "brief description",
  "objects": ["detected objects"]
}}"""
    else:
        prompt = """Analyze this image.

Respond in JSON:
{
  "category": "general category",
  "confidence": 0.0 to 1.0,
  "description": "brief description",
  "objects": ["detected objects"]
}"""

    response = model.generate_content([prompt, image])
    text = response.text.strip().strip("\`\`\`json").strip("\`\`\`")
    return json.loads(text)

# Usage examples
result = classify("cat.jpg")
print(f"Category: {result['category']}")
print(f"Confidence: {result['confidence']:.0%}")
print(f"Description: {result['description']}")

# With custom categories
result = classify(
    "photo.jpg",
    categories=["food", "landscape", "person", "animal", "object"]
)
\`\`\`

---

## Variant: Batch classification

\`\`\`python
def classify_batch(images: list[str], categories: list[str]) -> list[dict]:
    """Classify multiple images"""
    results = []
    for img in images:
        try:
            result = classify(img, categories)
            result["source"] = img
            results.append(result)
        except Exception as e:
            results.append({"source": img, "error": str(e)})
    return results
\`\`\`

---

## Next level

→ [Voice Assistant](/en/cooking/voice-assistant)
    `,
  },

  'voice-assistant': {
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['Python', 'Micrófono'],
    prerequisitesEn: ['Python', 'Microphone'],
    contentEs: `
## Asistente de Voz

Crea un asistente que escucha, entiende y responde con voz.

---

## El prompt para empezar

> Crea un asistente de voz en Python que:
> 1. Escuche del micrófono con speech_recognition
> 2. Convierta voz a texto
> 3. Envíe a Gemini para procesar
> 4. Convierta respuesta a voz con gTTS
> 5. Loop continuo de escucha

---

## Lo que la IA creará

\`\`\`python
import speech_recognition as sr
from gtts import gTTS
import google.generativeai as genai
import os
import tempfile
from playsound import playsound

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

# Inicializar reconocedor
recognizer = sr.Recognizer()
mic = sr.Microphone()

def listen() -> str:
    """Escuchar del micrófono"""
    with mic as source:
        print("🎤 Escuchando...")
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        audio = recognizer.listen(source, timeout=5)

    try:
        text = recognizer.recognize_google(audio, language="es-ES")
        print(f"Escuché: {text}")
        return text
    except sr.UnknownValueError:
        return ""
    except sr.RequestError as e:
        print(f"Error: {e}")
        return ""

def think(text: str) -> str:
    """Procesar con Gemini"""
    response = model.generate_content(
        f"Eres un asistente amigable. Responde brevemente: {text}"
    )
    return response.text

def speak(text: str):
    """Convertir texto a voz"""
    tts = gTTS(text=text, lang="es")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as f:
        tts.save(f.name)
        playsound(f.name)
        os.unlink(f.name)

def run_assistant():
    """Loop principal del asistente"""
    print("🤖 Asistente iniciado. Di 'salir' para terminar.")

    while True:
        text = listen()

        if not text:
            continue

        if "salir" in text.lower():
            speak("¡Hasta luego!")
            break

        response = think(text)
        print(f"🤖: {response}")
        speak(response)

# Ejecutar
run_assistant()
\`\`\`

---

## Instalación

\`\`\`bash
pip install SpeechRecognition gTTS playsound pyaudio google-generativeai
\`\`\`

---

## Siguiente nivel

→ [App Multimodal](/es/cooking/multimodal-app)
    `,
    contentEn: `
## Voice Assistant

Create an assistant that listens, understands, and responds with voice.

---

## The prompt to start

> Create a voice assistant in Python that:
> 1. Listens from microphone with speech_recognition
> 2. Converts voice to text
> 3. Sends to Gemini for processing
> 4. Converts response to speech with gTTS
> 5. Continuous listening loop

---

## What the AI will create

\`\`\`python
import speech_recognition as sr
from gtts import gTTS
import google.generativeai as genai
import os
import tempfile
from playsound import playsound

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize recognizer
recognizer = sr.Recognizer()
mic = sr.Microphone()

def listen() -> str:
    """Listen from microphone"""
    with mic as source:
        print("🎤 Listening...")
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        audio = recognizer.listen(source, timeout=5)

    try:
        text = recognizer.recognize_google(audio, language="en-US")
        print(f"I heard: {text}")
        return text
    except sr.UnknownValueError:
        return ""
    except sr.RequestError as e:
        print(f"Error: {e}")
        return ""

def think(text: str) -> str:
    """Process with Gemini"""
    response = model.generate_content(
        f"You are a friendly assistant. Respond briefly: {text}"
    )
    return response.text

def speak(text: str):
    """Convert text to speech"""
    tts = gTTS(text=text, lang="en")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as f:
        tts.save(f.name)
        playsound(f.name)
        os.unlink(f.name)

def run_assistant():
    """Main assistant loop"""
    print("🤖 Assistant started. Say 'exit' to quit.")

    while True:
        text = listen()

        if not text:
            continue

        if "exit" in text.lower():
            speak("Goodbye!")
            break

        response = think(text)
        print(f"🤖: {response}")
        speak(response)

# Run
run_assistant()
\`\`\`

---

## Installation

\`\`\`bash
pip install SpeechRecognition gTTS playsound pyaudio google-generativeai
\`\`\`

---

## Next level

→ [Multimodal App](/en/cooking/multimodal-app)
    `,
  },

  'multimodal-app': {
    timeEs: '50 minutos',
    timeEn: '50 minutes',
    prerequisitesEs: ['Python', 'Streamlit'],
    prerequisitesEn: ['Python', 'Streamlit'],
    contentEs: `
## App Multimodal

Crea una app web que procese texto, imágenes y audio.

---

## El prompt para empezar

> Crea una app Streamlit multimodal que:
> 1. Acepte texto, imagen o audio como input
> 2. Use Gemini para procesar todos los tipos
> 3. Muestre respuesta formateada
> 4. Guarde historial de conversación

---

## Lo que la IA creará

\`\`\`python
import streamlit as st
import google.generativeai as genai
from PIL import Image
import io
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

st.set_page_config(page_title="App Multimodal", page_icon="🎨")
st.title("🎨 App Multimodal con IA")

# Historial en session state
if "messages" not in st.session_state:
    st.session_state.messages = []

# Mostrar historial
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])
        if msg.get("image"):
            st.image(msg["image"], width=300)

# Tabs para diferentes inputs
tab1, tab2, tab3 = st.tabs(["💬 Texto", "🖼️ Imagen", "🎤 Audio"])

with tab1:
    text_input = st.text_area("Escribe tu mensaje:")
    if st.button("Enviar texto"):
        if text_input:
            st.session_state.messages.append({
                "role": "user",
                "content": text_input
            })
            response = model.generate_content(text_input)
            st.session_state.messages.append({
                "role": "assistant",
                "content": response.text
            })
            st.rerun()

with tab2:
    uploaded_image = st.file_uploader(
        "Sube una imagen:",
        type=["png", "jpg", "jpeg"]
    )
    image_prompt = st.text_input("¿Qué quieres saber de la imagen?")

    if st.button("Analizar imagen"):
        if uploaded_image and image_prompt:
            image = Image.open(uploaded_image)
            st.session_state.messages.append({
                "role": "user",
                "content": image_prompt,
                "image": image
            })

            response = model.generate_content([image_prompt, image])
            st.session_state.messages.append({
                "role": "assistant",
                "content": response.text
            })
            st.rerun()

with tab3:
    audio_file = st.file_uploader(
        "Sube un audio:",
        type=["mp3", "wav", "m4a"]
    )
    if st.button("Transcribir"):
        if audio_file:
            st.info("Transcripción con Whisper/Gemini próximamente")

# Botón limpiar
if st.button("🗑️ Limpiar historial"):
    st.session_state.messages = []
    st.rerun()
\`\`\`

---

## Ejecutar

\`\`\`bash
pip install streamlit google-generativeai pillow
streamlit run app.py
\`\`\`

---

## Siguiente nivel

→ [Fine-tuning de Modelo](/es/cooking/fine-tuning)
    `,
    contentEn: `
## Multimodal App

Create a web app that processes text, images, and audio.

---

## The prompt to start

> Create a multimodal Streamlit app that:
> 1. Accepts text, image, or audio as input
> 2. Uses Gemini to process all types
> 3. Shows formatted response
> 4. Saves conversation history

---

## What the AI will create

\`\`\`python
import streamlit as st
import google.generativeai as genai
from PIL import Image
import io
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

st.set_page_config(page_title="Multimodal App", page_icon="🎨")
st.title("🎨 Multimodal AI App")

# History in session state
if "messages" not in st.session_state:
    st.session_state.messages = []

# Show history
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.write(msg["content"])
        if msg.get("image"):
            st.image(msg["image"], width=300)

# Tabs for different inputs
tab1, tab2, tab3 = st.tabs(["💬 Text", "🖼️ Image", "🎤 Audio"])

with tab1:
    text_input = st.text_area("Write your message:")
    if st.button("Send text"):
        if text_input:
            st.session_state.messages.append({
                "role": "user",
                "content": text_input
            })
            response = model.generate_content(text_input)
            st.session_state.messages.append({
                "role": "assistant",
                "content": response.text
            })
            st.rerun()

with tab2:
    uploaded_image = st.file_uploader(
        "Upload an image:",
        type=["png", "jpg", "jpeg"]
    )
    image_prompt = st.text_input("What do you want to know about the image?")

    if st.button("Analyze image"):
        if uploaded_image and image_prompt:
            image = Image.open(uploaded_image)
            st.session_state.messages.append({
                "role": "user",
                "content": image_prompt,
                "image": image
            })

            response = model.generate_content([image_prompt, image])
            st.session_state.messages.append({
                "role": "assistant",
                "content": response.text
            })
            st.rerun()

with tab3:
    audio_file = st.file_uploader(
        "Upload audio:",
        type=["mp3", "wav", "m4a"]
    )
    if st.button("Transcribe"):
        if audio_file:
            st.info("Transcription with Whisper/Gemini coming soon")

# Clear button
if st.button("🗑️ Clear history"):
    st.session_state.messages = []
    st.rerun()
\`\`\`

---

## Run

\`\`\`bash
pip install streamlit google-generativeai pillow
streamlit run app.py
\`\`\`

---

## Next level

→ [Model Fine-tuning](/en/cooking/fine-tuning)
    `,
  },

  'fine-tuning': {
    timeEs: '60 minutos',
    timeEn: '60 minutes',
    prerequisitesEs: ['Python', 'Dataset propio (100+ ejemplos)'],
    prerequisitesEn: ['Python', 'Own dataset (100+ examples)'],
    contentEs: `
## Fine-tuning de Modelo

Entrena un modelo con TUS datos para tareas específicas.

---

## El prompt para empezar

> Explica cómo hacer fine-tuning de Gemini:
> 1. Preparar dataset en formato correcto
> 2. Subir a Google AI Studio
> 3. Configurar entrenamiento
> 4. Usar modelo tuneado

---

## Preparar dataset

\`\`\`python
# Formato JSONL para fine-tuning
import json

ejemplos = [
    {
        "text_input": "¿Cómo reseteo mi contraseña?",
        "output": "Para resetear tu contraseña: 1) Ve a login 2) Click 'Olvidé contraseña' 3) Ingresa email 4) Revisa tu correo"
    },
    {
        "text_input": "No puedo iniciar sesión",
        "output": "Verifica: 1) Caps Lock desactivado 2) Email correcto 3) Prueba resetear contraseña si persiste"
    },
    # Mínimo 100 ejemplos recomendado
]

with open("training_data.jsonl", "w") as f:
    for ej in ejemplos:
        f.write(json.dumps(ej, ensure_ascii=False) + "\\n")
\`\`\`

---

## Subir a AI Studio

1. Ve a https://aistudio.google.com
2. Click "Tune a model"
3. Sube tu archivo JSONL
4. Configura epochs (2-5 recomendado)
5. Inicia entrenamiento

---

## Usar modelo tuneado

\`\`\`python
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Usar tu modelo tuneado
model = genai.GenerativeModel(
    model_name="tunedModels/mi-modelo-soporte-xxx"
)

response = model.generate_content(
    "¿Cómo cambio mi foto de perfil?"
)
print(response.text)
# → Respuesta en el estilo de tus datos de entrenamiento
\`\`\`

---

## Alternativa: OpenAI Fine-tuning

\`\`\`python
from openai import OpenAI
client = OpenAI()

# Subir archivo
file = client.files.create(
    file=open("training_data.jsonl", "rb"),
    purpose="fine-tune"
)

# Crear fine-tune job
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18"
)

# Usar modelo tuneado
response = client.chat.completions.create(
    model="ft:gpt-4o-mini:mi-org::xxx",
    messages=[{"role": "user", "content": "¿Cómo reseteo?"}]
)
\`\`\`

---

## Siguiente nivel

→ [Code Review con IA](/es/cooking/ai-code-review)
    `,
    contentEn: `
## Model Fine-tuning

Train a model with YOUR data for specific tasks.

---

## The prompt to start

> Explain how to fine-tune Gemini:
> 1. Prepare dataset in correct format
> 2. Upload to Google AI Studio
> 3. Configure training
> 4. Use tuned model

---

## Prepare dataset

\`\`\`python
# JSONL format for fine-tuning
import json

examples = [
    {
        "text_input": "How do I reset my password?",
        "output": "To reset your password: 1) Go to login 2) Click 'Forgot password' 3) Enter email 4) Check your inbox"
    },
    {
        "text_input": "I can't log in",
        "output": "Check: 1) Caps Lock off 2) Correct email 3) Try resetting password if persists"
    },
    # Minimum 100 examples recommended
]

with open("training_data.jsonl", "w") as f:
    for ex in examples:
        f.write(json.dumps(ex) + "\\n")
\`\`\`

---

## Upload to AI Studio

1. Go to https://aistudio.google.com
2. Click "Tune a model"
3. Upload your JSONL file
4. Configure epochs (2-5 recommended)
5. Start training

---

## Use tuned model

\`\`\`python
import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Use your tuned model
model = genai.GenerativeModel(
    model_name="tunedModels/my-support-model-xxx"
)

response = model.generate_content(
    "How do I change my profile picture?"
)
print(response.text)
# → Response in your training data style
\`\`\`

---

## Alternative: OpenAI Fine-tuning

\`\`\`python
from openai import OpenAI
client = OpenAI()

# Upload file
file = client.files.create(
    file=open("training_data.jsonl", "rb"),
    purpose="fine-tune"
)

# Create fine-tune job
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18"
)

# Use tuned model
response = client.chat.completions.create(
    model="ft:gpt-4o-mini:my-org::xxx",
    messages=[{"role": "user", "content": "How do I reset?"}]
)
\`\`\`

---

## Next level

→ [AI Code Review](/en/cooking/ai-code-review)
    `,
  },

  'ai-code-review': {
    timeEs: '40 minutos',
    timeEn: '40 minutes',
    prerequisitesEs: ['Python o Node.js', 'Git'],
    prerequisitesEn: ['Python or Node.js', 'Git'],
    contentEs: `
## Code Review con IA

Automatiza revisiones de código usando IA.

---

## El prompt para empezar

> Crea un script que:
> 1. Obtenga diff de un PR de GitHub
> 2. Envíe a Gemini para análisis
> 3. Genere comentarios de review
> 4. (Opcional) Postee en GitHub

---

## Lo que la IA creará

\`\`\`python
import google.generativeai as genai
import subprocess
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

def get_diff(base: str = "main") -> str:
    """Obtener diff del branch actual vs base"""
    result = subprocess.run(
        ["git", "diff", base],
        capture_output=True,
        text=True
    )
    return result.stdout

def review_code(diff: str) -> str:
    """Revisar código con IA"""
    prompt = f"""Eres un senior developer haciendo code review.

Analiza este diff y proporciona:
1. **Resumen**: Qué hace este cambio
2. **Bugs potenciales**: Errores que podrían ocurrir
3. **Seguridad**: Vulnerabilidades detectadas
4. **Mejoras**: Sugerencias de refactoring
5. **Score**: 1-10 de calidad

DIFF:
\`\`\`diff
{diff[:10000]}
\`\`\`

Responde en español, sé constructivo y específico."""

    response = model.generate_content(prompt)
    return response.text

def main():
    print("🔍 Obteniendo diff...")
    diff = get_diff()

    if not diff:
        print("No hay cambios para revisar")
        return

    print(f"📝 Analizando {len(diff)} caracteres de diff...")
    review = review_code(diff)

    print("\\n" + "=" * 50)
    print("📋 CODE REVIEW")
    print("=" * 50)
    print(review)

if __name__ == "__main__":
    main()
\`\`\`

---

## Integración con GitHub Actions

\`\`\`yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get diff
        run: |
          git diff origin/main > diff.txt

      - name: AI Review
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
        run: |
          python review.py diff.txt > review.md

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: review
            });
\`\`\`

---

## Siguiente nivel

→ [SaaS Completo con IA](/es/cooking/full-saas)
    `,
    contentEn: `
## AI Code Review

Automate code reviews using AI.

---

## The prompt to start

> Create a script that:
> 1. Gets diff from a GitHub PR
> 2. Sends to Gemini for analysis
> 3. Generates review comments
> 4. (Optional) Posts on GitHub

---

## What the AI will create

\`\`\`python
import google.generativeai as genai
import subprocess
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

def get_diff(base: str = "main") -> str:
    """Get diff from current branch vs base"""
    result = subprocess.run(
        ["git", "diff", base],
        capture_output=True,
        text=True
    )
    return result.stdout

def review_code(diff: str) -> str:
    """Review code with AI"""
    prompt = f"""You are a senior developer doing code review.

Analyze this diff and provide:
1. **Summary**: What this change does
2. **Potential bugs**: Errors that could occur
3. **Security**: Detected vulnerabilities
4. **Improvements**: Refactoring suggestions
5. **Score**: 1-10 quality

DIFF:
\`\`\`diff
{diff[:10000]}
\`\`\`

Be constructive and specific."""

    response = model.generate_content(prompt)
    return response.text

def main():
    print("🔍 Getting diff...")
    diff = get_diff()

    if not diff:
        print("No changes to review")
        return

    print(f"📝 Analyzing {len(diff)} characters of diff...")
    review = review_code(diff)

    print("\\n" + "=" * 50)
    print("📋 CODE REVIEW")
    print("=" * 50)
    print(review)

if __name__ == "__main__":
    main()
\`\`\`

---

## GitHub Actions integration

\`\`\`yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Get diff
        run: |
          git diff origin/main > diff.txt

      - name: AI Review
        env:
          GEMINI_API_KEY: \${{ secrets.GEMINI_API_KEY }}
        run: |
          python review.py diff.txt > review.md

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: review
            });
\`\`\`

---

## Next level

→ [Full SaaS with AI](/en/cooking/full-saas)
    `,
  },

  'full-saas': {
    timeEs: '120+ minutos',
    timeEn: '120+ minutes',
    prerequisitesEs: ['Todos los niveles anteriores'],
    prerequisitesEn: ['All previous levels'],
    contentEs: `
## SaaS Completo con IA

El proyecto final: un SaaS completo con autenticación, pagos e IA.

---

## El prompt para empezar

> Diseña la arquitectura de un SaaS con:
> 1. Auth con Google (Firebase)
> 2. Pagos con Stripe (suscripciones)
> 3. Feature de IA (elige: chat, análisis, generación)
> 4. Base de datos PostgreSQL
> 5. Deploy en Docker

---

## Arquitectura sugerida

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│                  (Next.js 15)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │  Auth   │  │ Billing │  │   AI    │             │
│  │  Page   │  │  Page   │  │  Chat   │             │
│  └────┬────┘  └────┬────┘  └────┬────┘             │
└───────┼────────────┼────────────┼───────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────┐
│                     API                              │
│                 (Next.js API)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │Firebase │  │ Stripe  │  │ Gemini  │             │
│  │  Auth   │  │Webhooks │  │   API   │             │
│  └────┬────┘  └────┬────┘  └────┬────┘             │
└───────┼────────────┼────────────┼───────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────┐
│                   STORAGE                            │
│  ┌─────────────┐  ┌─────────────┐                   │
│  │ PostgreSQL  │  │    Redis    │                   │
│  │   (users,   │  │   (cache,   │                   │
│  │   chats)    │  │  sessions)  │                   │
│  └─────────────┘  └─────────────┘                   │
└─────────────────────────────────────────────────────┘
\`\`\`

---

## Componentes clave

### 1. Auth
\`\`\`typescript
// Usa lo aprendido en auth-firebase
import { signInWithGoogle } from './firebase'
\`\`\`

### 2. Pagos
\`\`\`typescript
// Usa lo aprendido en payment-stripe
import { createCheckoutSession } from './stripe'
\`\`\`

### 3. IA
\`\`\`typescript
// Usa lo aprendido en chatbot-gemini
import { generateResponse } from './gemini'
\`\`\`

### 4. Database
\`\`\`typescript
// Usa lo aprendido en crud-postgres
import { prisma } from './db'
\`\`\`

---

## Modelo de datos

\`\`\`prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  plan          Plan     @default(FREE)
  stripeId      String?
  chats         Chat[]
  tokensUsed    Int      @default(0)
  createdAt     DateTime @default(now())
}

model Chat {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
  createdAt DateTime  @default(now())
}

model Message {
  id        String   @id @default(cuid())
  chatId    String
  chat      Chat     @relation(fields: [chatId], references: [id])
  role      String   // user | assistant
  content   String
  createdAt DateTime @default(now())
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}
\`\`\`

---

## Límites por plan

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Mensajes/mes | 100 | 10,000 | Ilimitado |
| Modelos | Gemini Flash | Gemini Pro | Todos |
| Historial | 7 días | 1 año | Ilimitado |
| Soporte | Comunidad | Email | Dedicado |

---

## Docker Compose

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - GEMINI_API_KEY=...
      - STRIPE_SECRET_KEY=...
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
\`\`\`

---

## Felicitaciones

Has completado todos los niveles de luxIA Cooking.

Ahora tienes las habilidades para construir productos reales con IA.

→ [Volver al inicio](/es/cooking)
    `,
    contentEn: `
## Full SaaS with AI

The final project: a complete SaaS with auth, payments, and AI.

---

## The prompt to start

> Design the architecture of a SaaS with:
> 1. Auth with Google (Firebase)
> 2. Payments with Stripe (subscriptions)
> 3. AI feature (choose: chat, analysis, generation)
> 4. PostgreSQL database
> 5. Docker deploy

---

## Suggested architecture

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│                  (Next.js 15)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │  Auth   │  │ Billing │  │   AI    │             │
│  │  Page   │  │  Page   │  │  Chat   │             │
│  └────┬────┘  └────┬────┘  └────┬────┘             │
└───────┼────────────┼────────────┼───────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────┐
│                     API                              │
│                 (Next.js API)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │Firebase │  │ Stripe  │  │ Gemini  │             │
│  │  Auth   │  │Webhooks │  │   API   │             │
│  └────┬────┘  └────┬────┘  └────┬────┘             │
└───────┼────────────┼────────────┼───────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────┐
│                   STORAGE                            │
│  ┌─────────────┐  ┌─────────────┐                   │
│  │ PostgreSQL  │  │    Redis    │                   │
│  │   (users,   │  │   (cache,   │                   │
│  │   chats)    │  │  sessions)  │                   │
│  └─────────────┘  └─────────────┘                   │
└─────────────────────────────────────────────────────┘
\`\`\`

---

## Key components

### 1. Auth
\`\`\`typescript
// Use what you learned in auth-firebase
import { signInWithGoogle } from './firebase'
\`\`\`

### 2. Payments
\`\`\`typescript
// Use what you learned in payment-stripe
import { createCheckoutSession } from './stripe'
\`\`\`

### 3. AI
\`\`\`typescript
// Use what you learned in chatbot-gemini
import { generateResponse } from './gemini'
\`\`\`

### 4. Database
\`\`\`typescript
// Use what you learned in crud-postgres
import { prisma } from './db'
\`\`\`

---

## Data model

\`\`\`prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  plan          Plan     @default(FREE)
  stripeId      String?
  chats         Chat[]
  tokensUsed    Int      @default(0)
  createdAt     DateTime @default(now())
}

model Chat {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
  createdAt DateTime  @default(now())
}

model Message {
  id        String   @id @default(cuid())
  chatId    String
  chat      Chat     @relation(fields: [chatId], references: [id])
  role      String   // user | assistant
  content   String
  createdAt DateTime @default(now())
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}
\`\`\`

---

## Limits by plan

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Messages/month | 100 | 10,000 | Unlimited |
| Models | Gemini Flash | Gemini Pro | All |
| History | 7 days | 1 year | Unlimited |
| Support | Community | Email | Dedicated |

---

## Docker Compose

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - GEMINI_API_KEY=...
      - STRIPE_SECRET_KEY=...
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pgdata:
\`\`\`

---

## Congratulations

You've completed all levels of luxIA Cooking.

You now have the skills to build real products with AI.

→ [Back to start](/en/cooking)
    `,
  },
}

const dishOrder = dishes.map(d => d.slug)

// SEO descriptions for cooking dishes
const dishDescriptions: Record<string, { es: string; en: string }> = {
  'chatbot-gemini': { es: 'Crea un chatbot con Gemini API gratis. Tutorial paso a paso con código funcional.', en: 'Create a chatbot with free Gemini API. Step by step tutorial with working code.' },
  'chatbot-claude': { es: 'Construye un chatbot con Claude API de Anthropic. Integración y mejores prácticas.', en: 'Build a chatbot with Anthropic Claude API. Integration and best practices.' },
  'chatbot-openai': { es: 'Desarrolla un chatbot con OpenAI GPT. Streaming, funciones y más.', en: 'Develop a chatbot with OpenAI GPT. Streaming, functions and more.' },
  'chatbot-ollama': { es: 'Crea un chatbot local con Ollama. Sin API keys, privacidad total.', en: 'Create a local chatbot with Ollama. No API keys, total privacy.' },
  'api-rest-node': { es: 'Crea una API REST con Node.js y Express. Endpoints, middleware y deploy.', en: 'Create a REST API with Node.js and Express. Endpoints, middleware and deploy.' },
  'api-rest-python': { es: 'Construye una API REST con Python y FastAPI. Async, validación y docs.', en: 'Build a REST API with Python and FastAPI. Async, validation and docs.' },
  'api-graphql': { es: 'Implementa una API GraphQL desde cero. Queries, mutations y resolvers.', en: 'Implement a GraphQL API from scratch. Queries, mutations and resolvers.' },
  'landing-react': { es: 'Crea una landing page moderna con React. Componentes, estilos y animaciones.', en: 'Create a modern landing page with React. Components, styles and animations.' },
  'landing-nextjs': { es: 'Desarrolla una landing con Next.js. SEO, SSG y optimización.', en: 'Develop a landing with Next.js. SEO, SSG and optimization.' },
  'portfolio-dev': { es: 'Construye tu portfolio de desarrollador. Diseño, proyectos y deploy.', en: 'Build your developer portfolio. Design, projects and deploy.' },
  'auth-firebase': { es: 'Implementa autenticación con Firebase. Google, email y gestión de usuarios.', en: 'Implement authentication with Firebase. Google, email and user management.' },
  'auth-nextauth': { es: 'Agrega login a Next.js con NextAuth. OAuth, sesiones y providers.', en: 'Add login to Next.js with NextAuth. OAuth, sessions and providers.' },
  'auth-jwt': { es: 'Autenticación con JWT desde cero. Tokens, refresh y seguridad.', en: 'JWT authentication from scratch. Tokens, refresh and security.' },
  'deploy-vercel': { es: 'Despliega tu app en Vercel. CI/CD automático y configuración.', en: 'Deploy your app on Vercel. Automatic CI/CD and configuration.' },
  'deploy-docker': { es: 'Dockeriza y despliega tu aplicación. Dockerfile, compose y producción.', en: 'Dockerize and deploy your application. Dockerfile, compose and production.' },
  'deploy-vps': { es: 'Deploy en VPS con Docker y Nginx. SSL, dominio y automatización.', en: 'Deploy on VPS with Docker and Nginx. SSL, domain and automation.' },
  'rag-basic': { es: 'Construye un sistema RAG básico. Embeddings, búsqueda y respuestas.', en: 'Build a basic RAG system. Embeddings, search and responses.' },
  'rag-qdrant': { es: 'RAG con Qdrant vector database. Búsqueda semántica avanzada.', en: 'RAG with Qdrant vector database. Advanced semantic search.' },
  'n8n-intro': { es: 'Automatiza flujos con n8n. Instalación, nodos básicos y triggers.', en: 'Automate workflows with n8n. Installation, basic nodes and triggers.' },
  'n8n-openai': { es: 'Conecta n8n con OpenAI. Automatiza tareas con IA.', en: 'Connect n8n with OpenAI. Automate tasks with AI.' },
  'claude-code-intro': { es: 'Aprende a usar Claude Code CLI. Tu copiloto de programación en terminal.', en: 'Learn to use Claude Code CLI. Your programming copilot in terminal.' },
  'cursor-intro': { es: 'Domina Cursor IDE con IA. Atajos, comandos y flujo de trabajo.', en: 'Master Cursor AI IDE. Shortcuts, commands and workflow.' },
  'mcp-server': { es: 'Crea un servidor MCP para Claude. Herramientas personalizadas.', en: 'Create an MCP server for Claude. Custom tools.' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; dish: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams.locale as 'es' | 'en'
  const dishData = dishes.find(d => d.slug === resolvedParams.dish)

  if (!dishData) return { title: 'Not Found' }

  const title = locale === 'es' ? dishData.titleEs : dishData.titleEn
  const description = dishDescriptions[resolvedParams.dish]?.[locale] ||
    (locale === 'es' ? `Tutorial práctico: ${title}. Código funcional paso a paso.` : `Hands-on tutorial: ${title}. Step by step working code.`)

  const fullTitle = `${title} - Cooking | luxIA`
  const url = `https://luxia.us/${locale}/cooking/${resolvedParams.dish}`

  return {
    title: fullTitle,
    description,
    keywords: `${title}, tutorial, proyecto, ${locale === 'es' ? 'código' : 'code'}, práctica, IA, luxIA`,
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
        'es-ES': `https://luxia.us/es/cooking/${resolvedParams.dish}`,
        'en-US': `https://luxia.us/en/cooking/${resolvedParams.dish}`,
      },
    },
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
