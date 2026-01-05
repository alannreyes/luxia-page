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
  { slug: 'vps-hardening', titleEs: 'Asegurar VPS: UFW + fail2ban', titleEn: 'Secure VPS: UFW + fail2ban', level: 'chef', icon: '🛡️' },
  { slug: 'ssl-certbot', titleEs: 'SSL con Let\'s Encrypt', titleEn: 'SSL with Let\'s Encrypt', level: 'chef', icon: '🔒' },
  { slug: 'docker-network-lab', titleEs: 'Lab de Redes Docker', titleEn: 'Docker Networks Lab', level: 'chef', icon: '🌐' },
  { slug: 'docker-backup', titleEs: 'Backup de Volúmenes Docker', titleEn: 'Docker Volumes Backup', level: 'chef', icon: '💾' },
  { slug: 'github-actions', titleEs: 'CI/CD con GitHub Actions', titleEn: 'CI/CD with GitHub Actions', level: 'chef', icon: '⚙️' },
  { slug: 'api-testing', titleEs: 'Testing de APIs', titleEn: 'API Testing', level: 'chef', icon: '🧪' },
  { slug: 'mobile-expo', titleEs: 'App Móvil con Expo', titleEn: 'Mobile App with Expo', level: 'chef', icon: '📱' },
  { slug: 'push-notifications', titleEs: 'Push Notifications', titleEn: 'Push Notifications', level: 'chef', icon: '🔔' },
  { slug: 'webhook-receiver', titleEs: 'Receptor de Webhooks', titleEn: 'Webhook Receiver', level: 'chef', icon: '🪝' },
  { slug: 'redis-cache', titleEs: 'Cache con Redis', titleEn: 'Cache with Redis', level: 'chef', icon: '⚡' },
  { slug: 'arduino-sensor', titleEs: 'Arduino + MQTT', titleEn: 'Arduino + MQTT', level: 'chef', icon: '🔌' },
  { slug: 'dashboard-analytics', titleEs: 'Dashboard de Analytics', titleEn: 'Analytics Dashboard', level: 'chef', icon: '📊' },
  { slug: 'monitoring-stack', titleEs: 'Stack de Monitoreo', titleEn: 'Monitoring Stack', level: 'chef', icon: '📈' },
  { slug: 'testing-fullstack', titleEs: 'Testing Fullstack', titleEn: 'Fullstack Testing', level: 'chef', icon: '🧪' },
  { slug: 'security-hardening', titleEs: 'Hardening de Seguridad', titleEn: 'Security Hardening', level: 'chef', icon: '🔐' },
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
## Lo que vas a construir

Vas a crear tu primer chatbot con inteligencia artificial usando la API de Gemini de Google, que es completamente gratis.
Lo interesante: la IA va a escribir el codigo por ti. Tu solo copias, pegas y ejecutas.
Al terminar tendras un chatbot funcionando en tu terminal que responde a cualquier pregunta.
Es el primer paso para entender como funcionan las APIs de IA y crear tus propias aplicaciones inteligentes.

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
## What you'll build

You'll create your first AI chatbot using Google's Gemini API, which is completely free.
The interesting part: the AI will write the code for you. You just copy, paste, and run.
When you're done, you'll have a working chatbot in your terminal that answers any question.
It's the first step to understanding how AI APIs work and creating your own intelligent applications.

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
## Lo que vas a construir

Vas a crear un chatbot usando la API de Claude, de Anthropic, el mismo proceso que con Gemini pero con un proveedor diferente.
Requiere tarjeta de credito para registrarte, pero tienes $5 USD de credito gratis para empezar.
Al terminar tendras otro chatbot funcionando en tu terminal, esta vez conectado a Claude.
Aprenderas a trabajar con multiples proveedores de IA, una habilidad clave para elegir la mejor herramienta segun el proyecto.

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
## What you'll build

You'll create a chatbot using Claude's API from Anthropic, the same process as Gemini but with a different provider.
It requires a credit card to register, but you get $5 USD free credit to start.
When you're done, you'll have another chatbot running in your terminal, this time connected to Claude.
You'll learn to work with multiple AI providers, a key skill for choosing the best tool for each project.

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
## Lo que vas a construir

Vas a completar el trio creando un chatbot con la API de OpenAI, los creadores de ChatGPT.
El proceso es identico a Gemini y Claude: obtener API key, crear el codigo, ejecutar.
Al terminar sabras conectarte a los tres principales proveedores de IA: Gemini, Claude y OpenAI.
Tendras la flexibilidad de elegir cualquier proveedor segun costos, capacidades o preferencias del proyecto.

> ⚠️ **Nota**: OpenAI API requiere agregar creditos. Minimo $5 USD.

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
## What you'll build

You'll complete the trio by creating a chatbot with OpenAI's API, the creators of ChatGPT.
The process is identical to Gemini and Claude: get API key, create the code, run it.
When you're done, you'll know how to connect to the three main AI providers: Gemini, Claude, and OpenAI.
You'll have the flexibility to choose any provider based on costs, capabilities, or project preferences.

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
## Lo que vas a construir

Vas a instalar Claude Code CLI, la herramienta de Anthropic que pone a Claude directamente en tu terminal.
Tendras un asistente de IA que puede leer tus archivos, ejecutar comandos y entender el contexto completo de tu proyecto.
Es como tener un desarrollador senior a tu lado, ayudandote desde la linea de comandos.
Al terminar, podras pedirle a Claude que explique codigo, corrija bugs, cree tests y ejecute comandos por ti.

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
## What you'll build

You'll install Claude Code CLI, Anthropic's tool that puts Claude directly in your terminal.
You'll have an AI assistant that can read your files, execute commands, and understand your entire project context.
It's like having a senior developer by your side, helping you from the command line.
By the end, you'll be able to ask Claude to explain code, fix bugs, create tests, and run commands for you.

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
## Lo que vas a construir

Vas a aprender los comandos basicos de terminal que todo desarrollador necesita.
Navegaras entre carpetas, crearas y editaras archivos, y ejecutaras programas desde la linea de comandos.
Estas son las habilidades fundamentales que usaras todos los dias como programador.
Al terminar, habras perdido el miedo a la pantalla negra y tendras confianza para usar la terminal.

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
## What you'll build

You'll learn the basic terminal commands that every developer needs.
You'll navigate between folders, create and edit files, and run programs from the command line.
These are the foundational skills you'll use every day as a programmer.
By the end, you'll have lost your fear of the black screen and gained confidence using the terminal.

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
## Lo que vas a construir

Vas a crear tu primer repositorio de Git y aprender el flujo basico de control de versiones.
Entenderas los commits como "guardados" de tu codigo que puedes recuperar en cualquier momento.
Subiras tu proyecto a GitHub para que nunca pierdas tu trabajo, incluso si tu computadora falla.
Esta es la base del control de versiones que usan todos los desarrolladores profesionales del mundo.

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
## What you'll build

You'll create your first Git repository and learn the basic version control workflow.
You'll understand commits as "saves" of your code that you can recover at any time.
You'll push your project to GitHub so you never lose your work, even if your computer fails.
This is the foundation of version control that all professional developers around the world use.

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
## Lo que vas a construir

Vas a configurar un ambiente de desarrollo completo y profesional.
Instalaras VS Code con las extensiones esenciales, personalizaras tu terminal y configuraras las herramientas que te haran mas productivo.
Aprenderas a organizar tu espacio de trabajo como lo hacen los desarrolladores profesionales.
Al terminar, tendras todo listo y organizado para empezar a programar de inmediato.

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
## What you'll build

You'll configure a complete and professional development environment.
You'll install VS Code with essential extensions, customize your terminal, and set up the tools that will make you more productive.
You'll learn to organize your workspace like professional developers do.
By the end, you'll have everything ready and organized to start coding right away.

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
## What you'll build

Your own static blog with Astro. You'll be able to write posts in Markdown, have a main page with articles sorted by date, and individual pages for each post. The site will be ultra fast, secure, and free to host on Vercel or GitHub Pages. It's the perfect way to document what you learn and build your online presence.

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
## Lo que vas a construir

Un formulario de registro con validacion profesional usando React, react-hook-form y zod. Tendra campos de nombre, email, contrasena y confirmacion con validacion en tiempo real. Los usuarios veran mensajes de error claros al instante, y el boton de enviar solo se activara cuando todo sea valido. Aprenderas el patron estandar de la industria para manejar formularios.

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
## What you'll build

A registration form with professional validation using React, react-hook-form and zod. It will have name, email, password and confirmation fields with real-time validation. Users will see clear error messages instantly, and the submit button will only activate when everything is valid. You'll learn the industry-standard pattern for handling forms.

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
## Lo que vas a construir

Una aplicacion del clima con React que consume la API de OpenWeatherMap. Podras buscar cualquier ciudad y ver temperatura actual, humedad, condicion climatica e iconos del clima en tiempo real. Aprenderas a trabajar con APIs externas, manejar API keys de forma segura, y mostrar datos dinamicos en una interfaz responsive.

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
## What you'll build

A weather application with React that consumes the OpenWeatherMap API. You'll be able to search any city and see current temperature, humidity, weather condition and weather icons in real-time. You'll learn to work with external APIs, handle API keys securely, and display dynamic data in a responsive interface.

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
## Lo que vas a construir

Una calculadora web funcional con React y TypeScript. Tendra botones numericos del 0-9, operaciones basicas (+, -, *, /), manejo de decimales, y un display que muestra la operacion actual. El diseno imitara una calculadora fisica real. Aprenderas a manejar estado complejo, eventos de click, y logica matematica en una interfaz interactiva.

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
## What you'll build

A functional web calculator with React and TypeScript. It will have numeric buttons 0-9, basic operations (+, -, *, /), decimal handling, and a display showing the current operation. The design will mimic a real physical calculator. You'll learn to handle complex state, click events, and mathematical logic in an interactive interface.

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
## Lo que vas a construir

Un juego de quiz interactivo con React. Tendra preguntas con 4 opciones cada una, feedback visual instantaneo (verde para correcto, rojo para incorrecto), contador de puntaje, y una pantalla de resultados al final. Aprenderas a manejar flujo de juego, estado de seleccion, y logica condicional para crear experiencias interactivas.

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
## What you'll build

An interactive quiz game with React. It will have questions with 4 options each, instant visual feedback (green for correct, red for incorrect), a score counter, and a results screen at the end. You'll learn to handle game flow, selection state, and conditional logic to create interactive experiences.

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
## Lo que vas a construir

Un countdown timer interactivo con React que usa intervalos y la API de notificaciones del navegador. Incluye botones para iniciar, pausar y reiniciar, display en formato MM:SS, y una notificacion del navegador cuando el tiempo termina. Excelente para entender useEffect y el manejo de tiempo en React.

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
## What you'll build

An interactive countdown timer with React that uses intervals and the browser notification API. Includes buttons to start, pause, and reset, display in MM:SS format, and a browser notification when time runs out. Great for understanding useEffect and timing in React.

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
## Lo que vas a construir

Una galeria de imagenes responsive con React. Usa grid layout que se adapta al tamano de pantalla, lazy loading para mejor rendimiento, y un lightbox modal al hacer click en las imagenes. Un componente reutilizable perfecto para portfolios o catalogos de productos.

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
## What you'll build

A responsive image gallery with React. Uses grid layout that adapts to screen size, lazy loading for better performance, and a click-to-open lightbox modal. A reusable component perfect for portfolios or product catalogs.

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
## Lo que vas a construir

Una API moderna con FastAPI en Python. Incluye documentacion automatica, validacion de datos con Pydantic, y soporte para async. FastAPI es el framework mas rapido de Python para APIs, ideal para backends de IA y aplicaciones de alto rendimiento.

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
## What you'll build

A modern API with FastAPI in Python. Includes automatic documentation, data validation with Pydantic, and async support. FastAPI is Python's fastest API framework, ideal for AI backends and high-performance applications.

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
## Lo que vas a construir

Un web scraper con Python que extrae datos de sitios web automaticamente. Usa requests y BeautifulSoup para hacer peticiones HTTP, parsear HTML, y guardar los datos en archivos o JSON. Muy util para investigacion y recoleccion de datos.

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
## What you'll build

A web scraper with Python that extracts data from websites automatically. Uses requests and BeautifulSoup to make HTTP requests, parse HTML, and save data to files or JSON. Very useful for research and data collection.

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
## Lo que vas a construir

Una aplicacion que conecta a una base de datos PostgreSQL real, donde puedes crear, leer, actualizar y eliminar registros.
Usaras Prisma como ORM para definir tus modelos con TypeScript, generar migraciones automaticas y tener autocompletado perfecto en tu editor.
Al terminar, tendras una API funcional con endpoints REST y una interfaz con tabla de datos y formularios que puedes adaptar a cualquier entidad de tu proyecto.

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
## What you'll build

An application that connects to a real PostgreSQL database, where you can create, read, update, and delete records.
You'll use Prisma as an ORM to define your models with TypeScript, generate automatic migrations, and have perfect autocompletion in your editor.
When finished, you'll have a functional API with REST endpoints and an interface with data tables and forms that you can adapt to any entity in your project.

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
## Lo que vas a construir

Una sala de chat donde los mensajes aparecen instantaneamente para todos los usuarios conectados, sin necesidad de refrescar la pagina.
Implementaras conexiones en tiempo real con Firebase Realtime Database, sincronizacion automatica de mensajes entre clientes, indicador de "escribiendo..." y scroll automatico a nuevos mensajes.
Al terminar, tendras un chat funcional que puedes integrar en cualquier aplicacion o usar como base para un sistema de mensajeria mas complejo.

---

## Opciones

| Tecnologia | Ideal para |
|------------|------------|
| **Socket.io** | Control total |
| **Firebase Realtime** | Rapido de implementar |
| **Supabase Realtime** | Con PostgreSQL |

---

## Paso 1: Pidele a una IA el chat

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
## What you'll build

A chat room where messages appear instantly for all connected users, without needing to refresh the page.
You'll implement real-time connections with Firebase Realtime Database, automatic message synchronization between clients, a "typing..." indicator, and automatic scroll to new messages.
When finished, you'll have a functional chat that you can integrate into any application or use as a foundation for a more complex messaging system.

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
## Lo que vas a construir

Un sistema de subida de archivos donde los usuarios pueden arrastrar y soltar imagenes o documentos, ver una barra de progreso y obtener la URL del archivo subido.
Usaras URLs pre-firmadas de AWS S3 para que los archivos vayan directamente al almacenamiento en la nube sin pasar por tu servidor, haciendolo mas rapido y economico.
Al terminar, tendras un componente de upload reutilizable con validacion de tipo y tamano que puedes integrar en cualquier formulario.

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
## What you'll build

A file upload system where users can drag and drop images or documents, see a progress bar, and get the URL of the uploaded file.
You'll use AWS S3 pre-signed URLs so files go directly to cloud storage without passing through your server, making it faster and cheaper.
When finished, you'll have a reusable upload component with type and size validation that you can integrate into any form.

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
## Lo que vas a construir

Una pagina de pago donde tus usuarios pueden comprar productos o suscribirse a tu servicio con tarjeta de credito de forma segura.
Implementaras Stripe Checkout que se encarga de toda la complejidad: formulario de pago, validacion de tarjetas, cumplimiento PCI y webhooks para confirmar pagos.
Al terminar, tendras un flujo de pago completo con paginas de exito y cancelacion, listo para recibir dinero real (empezando en modo test).

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
## What you'll build

A payment page where your users can purchase products or subscribe to your service securely with a credit card.
You'll implement Stripe Checkout which handles all the complexity: payment form, card validation, PCI compliance, and webhooks to confirm payments.
When finished, you'll have a complete payment flow with success and cancellation pages, ready to receive real money (starting in test mode).

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
## Lo que vas a construir

Un sistema de envio de emails automaticos que notifica a tus usuarios cuando se registran, realizan una compra o cualquier evento importante en tu aplicacion.
Usaras Resend (o SendGrid) para enviar emails HTML personalizados con tu marca, incluyendo plantillas creadas con React Email que puedes previsualizar antes de enviar.
Al terminar, tendras funciones reutilizables para enviar diferentes tipos de emails transaccionales desde cualquier parte de tu backend.

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
## What you'll build

An automatic email sending system that notifies your users when they register, make a purchase, or any important event in your application.
You'll use Resend (or SendGrid) to send personalized HTML emails with your brand, including templates created with React Email that you can preview before sending.
When finished, you'll have reusable functions to send different types of transactional emails from anywhere in your backend.

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
## Lo que vas a construir

Un entorno de produccion completo donde tu aplicacion Next.js corre en contenedores Docker junto con PostgreSQL, Redis y Nginx como proxy inverso.
Crearas un Dockerfile multi-stage optimizado, un docker-compose.yml que orquesta todos los servicios, y configuracion de HTTPS automatico con Let's Encrypt.
Al terminar, tendras tu app corriendo en un VPS real (DigitalOcean, Hetzner) con un dominio propio y certificado SSL, lista para recibir usuarios reales.

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
## What you'll build

A complete production environment where your Next.js application runs in Docker containers alongside PostgreSQL, Redis, and Nginx as a reverse proxy.
You'll create an optimized multi-stage Dockerfile, a docker-compose.yml that orchestrates all services, and automatic HTTPS configuration with Let's Encrypt.
When finished, you'll have your app running on a real VPS (DigitalOcean, Hetzner) with your own domain and SSL certificate, ready to receive real users.

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
  'vps-hardening': {
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['VPS con Ubuntu/Debian', 'Acceso SSH root'],
    prerequisitesEn: ['VPS with Ubuntu/Debian', 'SSH root access'],
    contentEs: `
## Lo que vas a construir

Un VPS seguro con firewall UFW configurado, fail2ban protegiendo SSH de ataques de fuerza bruta, y autenticación solo por llaves SSH.

Después de este tutorial, tu servidor:
- Bloqueará todo tráfico excepto SSH, HTTP y HTTPS
- Baneará automáticamente IPs que intenten fuerza bruta
- Solo aceptará login con llave SSH (no passwords)
- Tendrá updates de seguridad automáticos

---

## Paso 1: Conecta a tu VPS

\`\`\`bash
ssh root@TU_IP
\`\`\`

---

## Paso 2: Actualiza el sistema

\`\`\`bash
apt update && apt upgrade -y
\`\`\`

---

## Paso 3: Crea usuario no-root

\`\`\`bash
# Crear usuario
adduser tuusuario

# Darle sudo
usermod -aG sudo tuusuario

# Copiar llaves SSH
mkdir -p /home/tuusuario/.ssh
cp ~/.ssh/authorized_keys /home/tuusuario/.ssh/
chown -R tuusuario:tuusuario /home/tuusuario/.ssh
chmod 700 /home/tuusuario/.ssh
chmod 600 /home/tuusuario/.ssh/authorized_keys
\`\`\`

---

## Paso 4: Configura UFW (Firewall)

\`\`\`bash
# Instalar UFW
apt install ufw -y

# Política default: bloquear todo entrante
ufw default deny incoming
ufw default allow outgoing

# Permitir SSH (¡IMPORTANTE ANTES DE ACTIVAR!)
ufw allow ssh

# Permitir HTTP y HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Activar
ufw enable

# Verificar
ufw status verbose
\`\`\`

Deberías ver:
\`\`\`
Status: active
To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
\`\`\`

---

## Paso 5: Instala fail2ban

\`\`\`bash
apt install fail2ban -y

# Crear config local
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
\`\`\`

Edita \`/etc/fail2ban/jail.local\`:

\`\`\`ini
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
banaction = ufw

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 24h
\`\`\`

\`\`\`bash
# Reiniciar
systemctl restart fail2ban
systemctl enable fail2ban

# Verificar
fail2ban-client status sshd
\`\`\`

---

## Paso 6: Hardening SSH

Edita \`/etc/ssh/sshd_config\`:

\`\`\`bash
# Deshabilitar password
PasswordAuthentication no

# Deshabilitar root login
PermitRootLogin no

# Solo tu usuario
AllowUsers tuusuario

# Límites
MaxAuthTries 3
\`\`\`

\`\`\`bash
# Reiniciar SSH
systemctl restart sshd
\`\`\`

---

## Paso 7: Updates automáticos

\`\`\`bash
apt install unattended-upgrades -y
dpkg-reconfigure -plow unattended-upgrades
\`\`\`

Selecciona "Yes" para habilitar updates automáticos.

---

## Paso 8: Verifica todo

\`\`\`bash
# Firewall activo
ufw status

# fail2ban corriendo
fail2ban-client status sshd

# SSH configurado
grep -E "PasswordAuth|PermitRoot" /etc/ssh/sshd_config

# Probar login desde otra terminal ANTES de cerrar esta
ssh tuusuario@TU_IP
\`\`\`

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| No puedo conectar SSH | Usa consola web del VPS provider |
| Me baneó fail2ban | \`fail2ban-client set sshd unbanip TU_IP\` |
| UFW bloqueó todo | Consola web → \`ufw disable\` |

---

## Checklist final

- [ ] UFW activo con solo 22, 80, 443
- [ ] fail2ban protegiendo SSH
- [ ] Login solo con llave SSH
- [ ] Root login deshabilitado
- [ ] Updates automáticos

---

## Próximo paso

→ [SSL con Let's Encrypt](/es/cooking/ssl-certbot)
    `,
    contentEn: `
## What you'll build

A secure VPS with UFW firewall configured, fail2ban protecting SSH from brute force attacks, and authentication only via SSH keys.

After this tutorial, your server will:
- Block all traffic except SSH, HTTP and HTTPS
- Automatically ban IPs attempting brute force
- Only accept login with SSH key (no passwords)
- Have automatic security updates

---

## Step 1: Connect to your VPS

\`\`\`bash
ssh root@YOUR_IP
\`\`\`

---

## Step 2: Update the system

\`\`\`bash
apt update && apt upgrade -y
\`\`\`

---

## Step 3: Create non-root user

\`\`\`bash
# Create user
adduser youruser

# Give sudo
usermod -aG sudo youruser

# Copy SSH keys
mkdir -p /home/youruser/.ssh
cp ~/.ssh/authorized_keys /home/youruser/.ssh/
chown -R youruser:youruser /home/youruser/.ssh
chmod 700 /home/youruser/.ssh
chmod 600 /home/youruser/.ssh/authorized_keys
\`\`\`

---

## Step 4: Configure UFW (Firewall)

\`\`\`bash
# Install UFW
apt install ufw -y

# Default policy: block all incoming
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (IMPORTANT BEFORE ENABLING!)
ufw allow ssh

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable
ufw enable

# Verify
ufw status verbose
\`\`\`

You should see:
\`\`\`
Status: active
To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
\`\`\`

---

## Step 5: Install fail2ban

\`\`\`bash
apt install fail2ban -y

# Create local config
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
\`\`\`

Edit \`/etc/fail2ban/jail.local\`:

\`\`\`ini
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
banaction = ufw

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 24h
\`\`\`

\`\`\`bash
# Restart
systemctl restart fail2ban
systemctl enable fail2ban

# Verify
fail2ban-client status sshd
\`\`\`

---

## Step 6: SSH Hardening

Edit \`/etc/ssh/sshd_config\`:

\`\`\`bash
# Disable password
PasswordAuthentication no

# Disable root login
PermitRootLogin no

# Only your user
AllowUsers youruser

# Limits
MaxAuthTries 3
\`\`\`

\`\`\`bash
# Restart SSH
systemctl restart sshd
\`\`\`

---

## Step 7: Automatic updates

\`\`\`bash
apt install unattended-upgrades -y
dpkg-reconfigure -plow unattended-upgrades
\`\`\`

Select "Yes" to enable automatic updates.

---

## Step 8: Verify everything

\`\`\`bash
# Firewall active
ufw status

# fail2ban running
fail2ban-client status sshd

# SSH configured
grep -E "PasswordAuth|PermitRoot" /etc/ssh/sshd_config

# Test login from another terminal BEFORE closing this one
ssh youruser@YOUR_IP
\`\`\`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect SSH | Use VPS provider's web console |
| fail2ban banned me | \`fail2ban-client set sshd unbanip YOUR_IP\` |
| UFW blocked everything | Web console → \`ufw disable\` |

---

## Final checklist

- [ ] UFW active with only 22, 80, 443
- [ ] fail2ban protecting SSH
- [ ] Login only with SSH key
- [ ] Root login disabled
- [ ] Automatic updates

---

## Next step

→ [SSL with Let's Encrypt](/en/cooking/ssl-certbot)
    `,
  },
  'ssl-certbot': {
    timeEs: '20 minutos',
    timeEn: '20 minutes',
    prerequisitesEs: ['VPS con dominio apuntando', 'Nginx instalado'],
    prerequisitesEn: ['VPS with domain pointing', 'Nginx installed'],
    contentEs: `
## Lo que vas a construir

Certificado SSL gratuito de Let's Encrypt para tu dominio, con renovación automática cada 90 días.

Tu sitio pasará de http:// a https:// con el candado verde, SEO mejorado, y comunicación encriptada.

---

## Paso 1: Verifica que tu dominio apunta al VPS

\`\`\`bash
# Debe mostrar la IP de tu VPS
dig +short tudominio.com
\`\`\`

---

## Paso 2: Instala Certbot

\`\`\`bash
apt install certbot python3-certbot-nginx -y
\`\`\`

---

## Paso 3: Obtén el certificado

\`\`\`bash
# Con Nginx (recomendado)
certbot --nginx -d tudominio.com -d www.tudominio.com

# Te preguntará:
# - Email (para avisos de expiración)
# - Aceptar términos
# - Redirigir HTTP a HTTPS (elige 2 = Yes)
\`\`\`

---

## Paso 4: Verifica

\`\`\`bash
# Ver certificados instalados
certbot certificates

# Probar renovación
certbot renew --dry-run
\`\`\`

---

## Paso 5: Configurar renovación automática

Certbot ya configura un cron/timer. Verifica:

\`\`\`bash
# Ver timer de systemd
systemctl status certbot.timer

# O ver cron
cat /etc/cron.d/certbot
\`\`\`

---

## Verificar en navegador

1. Abre https://tudominio.com
2. Deberías ver el candado verde
3. Click en candado → "Connection is secure"

---

## Configuración Nginx resultante

Certbot modifica tu config:

\`\`\`nginx
server {
    listen 443 ssl;
    server_name tudominio.com;

    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # tu config...
}

server {
    listen 80;
    server_name tudominio.com;
    return 301 https://$host$request_uri;
}
\`\`\`

---

## Agregar más dominios

\`\`\`bash
certbot --nginx -d nuevodominio.com -d www.nuevodominio.com
\`\`\`

---

## Troubleshooting

| Error | Causa | Solución |
|-------|-------|----------|
| Challenge failed | Puerto 80 bloqueado | \`ufw allow 80\` |
| Domain not pointing | DNS no propagado | Espera 5-30 min |
| Too many requests | Rate limit | Espera 1 hora |

---

## Test de seguridad

Verifica tu config SSL:

\`\`\`
https://www.ssllabs.com/ssltest/analyze.html?d=tudominio.com
\`\`\`

Objetivo: A o A+

---

## Próximo paso

→ [Lab de Redes Docker](/es/cooking/docker-network-lab)
    `,
    contentEn: `
## What you'll build

Free SSL certificate from Let's Encrypt for your domain, with automatic renewal every 90 days.

Your site will go from http:// to https:// with the green padlock, improved SEO, and encrypted communication.

---

## Step 1: Verify your domain points to VPS

\`\`\`bash
# Should show your VPS IP
dig +short yourdomain.com
\`\`\`

---

## Step 2: Install Certbot

\`\`\`bash
apt install certbot python3-certbot-nginx -y
\`\`\`

---

## Step 3: Get the certificate

\`\`\`bash
# With Nginx (recommended)
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# It will ask:
# - Email (for expiration notices)
# - Accept terms
# - Redirect HTTP to HTTPS (choose 2 = Yes)
\`\`\`

---

## Step 4: Verify

\`\`\`bash
# See installed certificates
certbot certificates

# Test renewal
certbot renew --dry-run
\`\`\`

---

## Step 5: Configure automatic renewal

Certbot already configures a cron/timer. Verify:

\`\`\`bash
# See systemd timer
systemctl status certbot.timer

# Or see cron
cat /etc/cron.d/certbot
\`\`\`

---

## Verify in browser

1. Open https://yourdomain.com
2. You should see the green padlock
3. Click padlock → "Connection is secure"

---

## Resulting Nginx configuration

Certbot modifies your config:

\`\`\`nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # your config...
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}
\`\`\`

---

## Add more domains

\`\`\`bash
certbot --nginx -d newdomain.com -d www.newdomain.com
\`\`\`

---

## Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| Challenge failed | Port 80 blocked | \`ufw allow 80\` |
| Domain not pointing | DNS not propagated | Wait 5-30 min |
| Too many requests | Rate limit | Wait 1 hour |

---

## Security test

Verify your SSL config:

\`\`\`
https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
\`\`\`

Goal: A or A+

---

## Next step

→ [Docker Networks Lab](/en/cooking/docker-network-lab)
    `,
  },
  'docker-network-lab': {
    timeEs: '30 minutos',
    timeEn: '30 minutes',
    prerequisitesEs: ['Docker instalado'],
    prerequisitesEn: ['Docker installed'],
    contentEs: `
## Lo que vas a construir

Un lab práctico donde crearás redes Docker y verás cómo los contenedores se comunican entre sí.

Crearás una arquitectura con:
- Red \`frontend\` para Nginx
- Red \`backend\` para API y PostgreSQL
- API conectada a ambas redes

---

## Paso 1: Limpia contenedores existentes

\`\`\`bash
docker stop $(docker ps -aq) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null
\`\`\`

---

## Paso 2: Crea las redes

\`\`\`bash
# Red para el frontend (acceso público)
docker network create frontend

# Red para el backend (interna, sin internet)
docker network create --internal backend

# Verificar
docker network ls
\`\`\`

---

## Paso 3: Crea PostgreSQL (solo backend)

\`\`\`bash
docker run -d \\
  --name db \\
  --network backend \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_DB=app \\
  postgres:16-alpine
\`\`\`

---

## Paso 4: Crea la API (ambas redes)

\`\`\`bash
# Primero en backend
docker run -d \\
  --name api \\
  --network backend \\
  -e DATABASE_URL=postgres://postgres:secret@db:5432/app \\
  -p 3000:3000 \\
  node:20-alpine sleep infinity

# Conectar también a frontend
docker network connect frontend api
\`\`\`

---

## Paso 5: Prueba la comunicación

\`\`\`bash
# La API puede ver a db
docker exec api ping -c 2 db
# ✓ Funciona

# Instala psql en api para probar conexión
docker exec api apk add postgresql-client
docker exec api psql postgres://postgres:secret@db:5432/app -c "SELECT 1"
# ✓ Funciona
\`\`\`

---

## Paso 6: Crea Nginx (solo frontend)

\`\`\`bash
docker run -d \\
  --name nginx \\
  --network frontend \\
  -p 80:80 \\
  nginx:alpine
\`\`\`

---

## Paso 7: Verifica aislamiento

\`\`\`bash
# Nginx NO puede ver a db (redes diferentes)
docker exec nginx ping -c 2 db
# ✗ ping: bad address 'db'

# Nginx SÍ puede ver a api (misma red frontend)
docker exec nginx ping -c 2 api
# ✓ Funciona

# db NO tiene acceso a internet (red --internal)
docker exec db ping -c 2 google.com
# ✗ No funciona (esto es bueno!)
\`\`\`

---

## Diagrama de la arquitectura

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    INTERNET                          │
└───────────────────────┬─────────────────────────────┘
                        │ :80
┌───────────────────────▼─────────────────────────────┐
│              Red: frontend                           │
│  ┌─────────┐         ┌─────────┐                    │
│  │  nginx  │ ──────▶ │   api   │                    │
│  │  :80    │         │  :3000  │                    │
│  └─────────┘         └────┬────┘                    │
└───────────────────────────┼─────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────┐
│              Red: backend (internal)                 │
│                      ┌─────────┐                    │
│  ┌─────────┐ ──────▶ │   db    │                    │
│  │   api   │         │  :5432  │                    │
│  └─────────┘         └─────────┘                    │
│                                                      │
│  ⛔ Sin acceso a internet                           │
└─────────────────────────────────────────────────────┘
\`\`\`

---

## Paso 8: Inspecciona las redes

\`\`\`bash
# Ver contenedores en frontend
docker network inspect frontend --format '{{range .Containers}}{{.Name}} {{end}}'
# nginx api

# Ver contenedores en backend
docker network inspect backend --format '{{range .Containers}}{{.Name}} {{end}}'
# db api

# Ver IPs
docker inspect api --format '{{range .NetworkSettings.Networks}}{{.NetworkID}}: {{.IPAddress}}{{println}}{{end}}'
\`\`\`

---

## Limpieza

\`\`\`bash
docker stop nginx api db
docker rm nginx api db
docker network rm frontend backend
\`\`\`

---

## Próximo paso

→ [Backup de Volúmenes Docker](/es/cooking/docker-backup)
    `,
    contentEn: `
## What you'll build

A practical lab where you'll create Docker networks and see how containers communicate with each other.

You'll create an architecture with:
- \`frontend\` network for Nginx
- \`backend\` network for API and PostgreSQL
- API connected to both networks

---

## Step 1: Clean existing containers

\`\`\`bash
docker stop $(docker ps -aq) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null
\`\`\`

---

## Step 2: Create the networks

\`\`\`bash
# Network for frontend (public access)
docker network create frontend

# Network for backend (internal, no internet)
docker network create --internal backend

# Verify
docker network ls
\`\`\`

---

## Step 3: Create PostgreSQL (backend only)

\`\`\`bash
docker run -d \\
  --name db \\
  --network backend \\
  -e POSTGRES_PASSWORD=secret \\
  -e POSTGRES_DB=app \\
  postgres:16-alpine
\`\`\`

---

## Step 4: Create the API (both networks)

\`\`\`bash
# First on backend
docker run -d \\
  --name api \\
  --network backend \\
  -e DATABASE_URL=postgres://postgres:secret@db:5432/app \\
  -p 3000:3000 \\
  node:20-alpine sleep infinity

# Connect to frontend too
docker network connect frontend api
\`\`\`

---

## Step 5: Test communication

\`\`\`bash
# API can see db
docker exec api ping -c 2 db
# ✓ Works

# Install psql on api to test connection
docker exec api apk add postgresql-client
docker exec api psql postgres://postgres:secret@db:5432/app -c "SELECT 1"
# ✓ Works
\`\`\`

---

## Step 6: Create Nginx (frontend only)

\`\`\`bash
docker run -d \\
  --name nginx \\
  --network frontend \\
  -p 80:80 \\
  nginx:alpine
\`\`\`

---

## Step 7: Verify isolation

\`\`\`bash
# Nginx CANNOT see db (different networks)
docker exec nginx ping -c 2 db
# ✗ ping: bad address 'db'

# Nginx CAN see api (same frontend network)
docker exec nginx ping -c 2 api
# ✓ Works

# db has NO internet access (--internal network)
docker exec db ping -c 2 google.com
# ✗ Doesn't work (this is good!)
\`\`\`

---

## Architecture diagram

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    INTERNET                          │
└───────────────────────┬─────────────────────────────┘
                        │ :80
┌───────────────────────▼─────────────────────────────┐
│              Network: frontend                       │
│  ┌─────────┐         ┌─────────┐                    │
│  │  nginx  │ ──────▶ │   api   │                    │
│  │  :80    │         │  :3000  │                    │
│  └─────────┘         └────┬────┘                    │
└───────────────────────────┼─────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────┐
│              Network: backend (internal)             │
│                      ┌─────────┐                    │
│  ┌─────────┐ ──────▶ │   db    │                    │
│  │   api   │         │  :5432  │                    │
│  └─────────┘         └─────────┘                    │
│                                                      │
│  ⛔ No internet access                              │
└─────────────────────────────────────────────────────┘
\`\`\`

---

## Step 8: Inspect the networks

\`\`\`bash
# See containers in frontend
docker network inspect frontend --format '{{range .Containers}}{{.Name}} {{end}}'
# nginx api

# See containers in backend
docker network inspect backend --format '{{range .Containers}}{{.Name}} {{end}}'
# db api

# See IPs
docker inspect api --format '{{range .NetworkSettings.Networks}}{{.NetworkID}}: {{.IPAddress}}{{println}}{{end}}'
\`\`\`

---

## Cleanup

\`\`\`bash
docker stop nginx api db
docker rm nginx api db
docker network rm frontend backend
\`\`\`

---

## Next step

→ [Docker Volumes Backup](/en/cooking/docker-backup)
    `,
  },
  'docker-backup': {
    timeEs: '25 minutos',
    timeEn: '25 minutes',
    prerequisitesEs: ['Docker con volúmenes'],
    prerequisitesEn: ['Docker with volumes'],
    contentEs: `
## Lo que vas a construir

Scripts para hacer backup y restore de volúmenes Docker. Protegerás tus datos de PostgreSQL, Redis, y cualquier otro servicio.

Al terminar tendrás:
- Script de backup que crea archivos .tar.gz
- Script de restore para recuperar datos
- Backup automático con cron

---

## Paso 1: Crea un volumen de prueba

\`\`\`bash
# Crear volumen
docker volume create test_data

# Crear contenedor con datos
docker run --rm -v test_data:/data alpine sh -c "
  echo 'Datos importantes' > /data/archivo.txt
  echo 'Más datos' > /data/config.json
  mkdir /data/subdir
  echo 'Anidado' > /data/subdir/nested.txt
"

# Verificar contenido
docker run --rm -v test_data:/data alpine ls -la /data
\`\`\`

---

## Paso 2: Backup manual

\`\`\`bash
# Backup a archivo .tar.gz
docker run --rm \\
  -v test_data:/source:ro \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/test_data_backup.tar.gz -C /source .

# Verificar
ls -lh test_data_backup.tar.gz
tar tzf test_data_backup.tar.gz
\`\`\`

---

## Paso 3: Script de backup

Crea \`backup-volume.sh\`:

\`\`\`bash
#!/bin/bash
# backup-volume.sh - Backup de volumen Docker

VOLUME_NAME=\${1:?Uso: ./backup-volume.sh NOMBRE_VOLUMEN}
BACKUP_DIR=\${2:-./backups}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="\${BACKUP_DIR}/\${VOLUME_NAME}_\${TIMESTAMP}.tar.gz"

mkdir -p "\$BACKUP_DIR"

echo "Haciendo backup de '\$VOLUME_NAME' a '\$BACKUP_FILE'..."

docker run --rm \\
  -v "\$VOLUME_NAME":/source:ro \\
  -v "\$BACKUP_DIR":/backup \\
  alpine tar czf "/backup/\${VOLUME_NAME}_\${TIMESTAMP}.tar.gz" -C /source .

if [ \$? -eq 0 ]; then
  echo "✅ Backup completado: \$BACKUP_FILE"
  echo "   Tamaño: $(ls -lh "\$BACKUP_FILE" | awk '{print \$5}')"
else
  echo "❌ Error en backup"
  exit 1
fi
\`\`\`

\`\`\`bash
chmod +x backup-volume.sh
./backup-volume.sh test_data ./backups
\`\`\`

---

## Paso 4: Script de restore

Crea \`restore-volume.sh\`:

\`\`\`bash
#!/bin/bash
# restore-volume.sh - Restaurar volumen Docker

BACKUP_FILE=\${1:?Uso: ./restore-volume.sh ARCHIVO.tar.gz NOMBRE_VOLUMEN}
VOLUME_NAME=\${2:?Uso: ./restore-volume.sh ARCHIVO.tar.gz NOMBRE_VOLUMEN}

if [ ! -f "\$BACKUP_FILE" ]; then
  echo "❌ Archivo no encontrado: \$BACKUP_FILE"
  exit 1
fi

echo "⚠️  Esto sobrescribirá el volumen '\$VOLUME_NAME'"
read -p "¿Continuar? (y/N) " confirm
[ "\$confirm" != "y" ] && exit 0

# Crear volumen si no existe
docker volume create "\$VOLUME_NAME" 2>/dev/null

echo "Restaurando '\$BACKUP_FILE' a '\$VOLUME_NAME'..."

docker run --rm \\
  -v "\$VOLUME_NAME":/target \\
  -v "$(pwd)":/backup \\
  alpine sh -c "rm -rf /target/* && tar xzf /backup/\$(basename \$BACKUP_FILE) -C /target"

if [ \$? -eq 0 ]; then
  echo "✅ Restore completado"
else
  echo "❌ Error en restore"
  exit 1
fi
\`\`\`

---

## Paso 5: Probar restore

\`\`\`bash
# Eliminar volumen original
docker volume rm test_data

# Restaurar desde backup
./restore-volume.sh backups/test_data_*.tar.gz test_data_restored

# Verificar
docker run --rm -v test_data_restored:/data alpine cat /data/archivo.txt
\`\`\`

---

## Paso 6: Backup de PostgreSQL (mejor práctica)

Para bases de datos, usa \`pg_dump\` antes de comprimir:

\`\`\`bash
#!/bin/bash
# backup-postgres.sh

CONTAINER=\${1:-postgres}
BACKUP_DIR=./backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR

docker exec \$CONTAINER pg_dumpall -U postgres | gzip > "\$BACKUP_DIR/postgres_\$TIMESTAMP.sql.gz"

echo "✅ Backup: \$BACKUP_DIR/postgres_\$TIMESTAMP.sql.gz"
\`\`\`

Restore:
\`\`\`bash
gunzip -c backups/postgres_*.sql.gz | docker exec -i postgres psql -U postgres
\`\`\`

---

## Paso 7: Backup automático (cron)

\`\`\`bash
# Editar crontab
crontab -e

# Backup diario a las 3am
0 3 * * * /opt/scripts/backup-volume.sh postgres_data /opt/backups >> /var/log/backup.log 2>&1

# Backup cada 6 horas
0 */6 * * * /opt/scripts/backup-postgres.sh postgres >> /var/log/backup.log 2>&1
\`\`\`

---

## Paso 8: Rotación de backups

Mantén solo los últimos N backups:

\`\`\`bash
# Eliminar backups de más de 7 días
find /opt/backups -name "*.tar.gz" -mtime +7 -delete

# Mantener solo los últimos 5
ls -t /opt/backups/*.tar.gz | tail -n +6 | xargs rm -f
\`\`\`

---

## Script completo con rotación

\`\`\`bash
#!/bin/bash
# backup-with-rotation.sh

VOLUME=\$1
BACKUP_DIR=/opt/backups
KEEP=7

./backup-volume.sh "\$VOLUME" "\$BACKUP_DIR"

# Eliminar viejos
ls -t "\$BACKUP_DIR/\${VOLUME}_"*.tar.gz 2>/dev/null | tail -n +\$((KEEP+1)) | xargs rm -f

echo "Backups actuales:"
ls -lh "\$BACKUP_DIR/\${VOLUME}_"*.tar.gz
\`\`\`

---

## Verificar integridad

\`\`\`bash
# Verificar que el tar es válido
tar tzf backup.tar.gz > /dev/null && echo "✅ Archivo válido" || echo "❌ Corrupto"

# Ver contenido sin extraer
tar tzf backup.tar.gz | head -20
\`\`\`

---

## Próximo paso

→ [CI/CD con GitHub Actions](/es/cooking/github-actions)
    `,
    contentEn: `
## What you'll build

Scripts to backup and restore Docker volumes. You'll protect your PostgreSQL, Redis, and any other service data.

When finished you'll have:
- Backup script that creates .tar.gz files
- Restore script to recover data
- Automatic backup with cron

---

## Step 1: Create a test volume

\`\`\`bash
# Create volume
docker volume create test_data

# Create container with data
docker run --rm -v test_data:/data alpine sh -c "
  echo 'Important data' > /data/file.txt
  echo 'More data' > /data/config.json
  mkdir /data/subdir
  echo 'Nested' > /data/subdir/nested.txt
"

# Verify contents
docker run --rm -v test_data:/data alpine ls -la /data
\`\`\`

---

## Step 2: Manual backup

\`\`\`bash
# Backup to .tar.gz file
docker run --rm \\
  -v test_data:/source:ro \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/test_data_backup.tar.gz -C /source .

# Verify
ls -lh test_data_backup.tar.gz
tar tzf test_data_backup.tar.gz
\`\`\`

---

## Step 3: Backup script

Create \`backup-volume.sh\`:

\`\`\`bash
#!/bin/bash
# backup-volume.sh - Docker volume backup

VOLUME_NAME=\${1:?Usage: ./backup-volume.sh VOLUME_NAME}
BACKUP_DIR=\${2:-./backups}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="\${BACKUP_DIR}/\${VOLUME_NAME}_\${TIMESTAMP}.tar.gz"

mkdir -p "\$BACKUP_DIR"

echo "Backing up '\$VOLUME_NAME' to '\$BACKUP_FILE'..."

docker run --rm \\
  -v "\$VOLUME_NAME":/source:ro \\
  -v "\$BACKUP_DIR":/backup \\
  alpine tar czf "/backup/\${VOLUME_NAME}_\${TIMESTAMP}.tar.gz" -C /source .

if [ \$? -eq 0 ]; then
  echo "✅ Backup completed: \$BACKUP_FILE"
  echo "   Size: $(ls -lh "\$BACKUP_FILE" | awk '{print \$5}')"
else
  echo "❌ Backup error"
  exit 1
fi
\`\`\`

\`\`\`bash
chmod +x backup-volume.sh
./backup-volume.sh test_data ./backups
\`\`\`

---

## Step 4: Restore script

Create \`restore-volume.sh\`:

\`\`\`bash
#!/bin/bash
# restore-volume.sh - Restore Docker volume

BACKUP_FILE=\${1:?Usage: ./restore-volume.sh FILE.tar.gz VOLUME_NAME}
VOLUME_NAME=\${2:?Usage: ./restore-volume.sh FILE.tar.gz VOLUME_NAME}

if [ ! -f "\$BACKUP_FILE" ]; then
  echo "❌ File not found: \$BACKUP_FILE"
  exit 1
fi

echo "⚠️  This will overwrite volume '\$VOLUME_NAME'"
read -p "Continue? (y/N) " confirm
[ "\$confirm" != "y" ] && exit 0

# Create volume if it doesn't exist
docker volume create "\$VOLUME_NAME" 2>/dev/null

echo "Restoring '\$BACKUP_FILE' to '\$VOLUME_NAME'..."

docker run --rm \\
  -v "\$VOLUME_NAME":/target \\
  -v "$(pwd)":/backup \\
  alpine sh -c "rm -rf /target/* && tar xzf /backup/\$(basename \$BACKUP_FILE) -C /target"

if [ \$? -eq 0 ]; then
  echo "✅ Restore completed"
else
  echo "❌ Restore error"
  exit 1
fi
\`\`\`

---

## Step 5: Test restore

\`\`\`bash
# Delete original volume
docker volume rm test_data

# Restore from backup
./restore-volume.sh backups/test_data_*.tar.gz test_data_restored

# Verify
docker run --rm -v test_data_restored:/data alpine cat /data/file.txt
\`\`\`

---

## Step 6: PostgreSQL backup (best practice)

For databases, use \`pg_dump\` before compressing:

\`\`\`bash
#!/bin/bash
# backup-postgres.sh

CONTAINER=\${1:-postgres}
BACKUP_DIR=./backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR

docker exec \$CONTAINER pg_dumpall -U postgres | gzip > "\$BACKUP_DIR/postgres_\$TIMESTAMP.sql.gz"

echo "✅ Backup: \$BACKUP_DIR/postgres_\$TIMESTAMP.sql.gz"
\`\`\`

Restore:
\`\`\`bash
gunzip -c backups/postgres_*.sql.gz | docker exec -i postgres psql -U postgres
\`\`\`

---

## Step 7: Automatic backup (cron)

\`\`\`bash
# Edit crontab
crontab -e

# Daily backup at 3am
0 3 * * * /opt/scripts/backup-volume.sh postgres_data /opt/backups >> /var/log/backup.log 2>&1

# Backup every 6 hours
0 */6 * * * /opt/scripts/backup-postgres.sh postgres >> /var/log/backup.log 2>&1
\`\`\`

---

## Step 8: Backup rotation

Keep only the last N backups:

\`\`\`bash
# Delete backups older than 7 days
find /opt/backups -name "*.tar.gz" -mtime +7 -delete

# Keep only last 5
ls -t /opt/backups/*.tar.gz | tail -n +6 | xargs rm -f
\`\`\`

---

## Complete script with rotation

\`\`\`bash
#!/bin/bash
# backup-with-rotation.sh

VOLUME=\$1
BACKUP_DIR=/opt/backups
KEEP=7

./backup-volume.sh "\$VOLUME" "\$BACKUP_DIR"

# Delete old ones
ls -t "\$BACKUP_DIR/\${VOLUME}_"*.tar.gz 2>/dev/null | tail -n +\$((KEEP+1)) | xargs rm -f

echo "Current backups:"
ls -lh "\$BACKUP_DIR/\${VOLUME}_"*.tar.gz
\`\`\`

---

## Verify integrity

\`\`\`bash
# Verify tar is valid
tar tzf backup.tar.gz > /dev/null && echo "✅ Valid file" || echo "❌ Corrupt"

# View contents without extracting
tar tzf backup.tar.gz | head -20
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
## Lo que vas a construir

Un pipeline de CI/CD que automaticamente ejecuta tus tests y despliega tu aplicacion cada vez que haces push a la rama main.
Configuraras un workflow de GitHub Actions que corre en servidores de GitHub, ejecuta tu suite de tests, construye la imagen Docker y la despliega a tu VPS via SSH.
Al terminar, tendras deploys automaticos y confiables donde solo necesitas hacer git push para ver tus cambios en produccion.

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
## What you'll build

A CI/CD pipeline that automatically runs your tests and deploys your application every time you push to the main branch.
You'll configure a GitHub Actions workflow that runs on GitHub servers, executes your test suite, builds the Docker image, and deploys it to your VPS via SSH.
When finished, you'll have automatic and reliable deploys where you only need to git push to see your changes in production.

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
## Lo que vas a construir

Una suite de tests automatizados que verifica que todos los endpoints de tu API funcionan correctamente antes de cada deploy.
Usaras Vitest y Supertest para escribir tests que simulan peticiones HTTP, verifican respuestas, y mockean la base de datos para tests aislados y rapidos.
Al terminar, tendras tests para operaciones CRUD completas, casos de error, autenticacion, y un reporte de cobertura que te dice que porcentaje de tu codigo esta testeado.

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
## What you'll build

An automated test suite that verifies all your API endpoints work correctly before each deploy.
You'll use Vitest and Supertest to write tests that simulate HTTP requests, verify responses, and mock the database for isolated and fast tests.
When finished, you'll have tests for complete CRUD operations, error cases, authentication, and a coverage report that tells you what percentage of your code is tested.

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
## Lo que vas a construir

Una aplicacion movil nativa para iOS y Android usando React Native y Expo, que puedes probar en tu propio telefono mientras desarrollas.
Implementaras navegacion entre pantallas, consumo de APIs externas, almacenamiento local con AsyncStorage, y estilos consistentes para ambas plataformas.
Al terminar, tendras una app funcional con multiples pantallas que puedes compartir con amigos via Expo Go o publicar en las tiendas de apps.

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
## What you'll build

A native mobile application for iOS and Android using React Native and Expo, which you can test on your own phone while developing.
You'll implement navigation between screens, external API consumption, local storage with AsyncStorage, and consistent styles for both platforms.
When finished, you'll have a functional app with multiple screens that you can share with friends via Expo Go or publish to the app stores.

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
## Lo que vas a construir

Un sistema de notificaciones push que envia alertas al telefono de tus usuarios incluso cuando no estan usando la app.
Implementaras el flujo completo: solicitar permisos al usuario, obtener el token de Expo Push, guardarlo en tu backend y enviar notificaciones personalizadas desde tu servidor.
Al terminar, podras enviar notificaciones con titulo, mensaje y datos extra que abren pantallas especificas de tu app cuando el usuario las toca.

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
## What you'll build

A push notification system that sends alerts to your users' phones even when they're not using the app.
You'll implement the complete flow: request permissions from the user, get the Expo Push token, save it to your backend, and send personalized notifications from your server.
When finished, you'll be able to send notifications with title, message, and extra data that open specific screens of your app when the user taps them.

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
## Lo que vas a construir

Un endpoint que recibe y procesa eventos de servicios externos como Stripe, GitHub o cualquier API que envie webhooks.
Implementaras verificacion de firmas HMAC para asegurar que los eventos son autenticos, logging de eventos recibidos, manejo de errores robusto y procesamiento asincrono.
Al terminar, tendras un receptor de webhooks seguro que puede activar acciones en tu app cuando ocurren eventos externos, como activar una suscripcion cuando Stripe confirma un pago.

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
## What you'll build

An endpoint that receives and processes events from external services like Stripe, GitHub, or any API that sends webhooks.
You'll implement HMAC signature verification to ensure events are authentic, logging of received events, robust error handling, and asynchronous processing.
When finished, you'll have a secure webhook receiver that can trigger actions in your app when external events occur, like activating a subscription when Stripe confirms a payment.

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
## Lo que vas a construir

Una capa de cache con Redis que reduce drasticamente los tiempos de respuesta de tu API guardando datos frecuentemente consultados en memoria.
Implementaras un wrapper de cache generico que funciona con cualquier funcion async, expiracion automatica por tiempo (TTL), invalidacion manual cuando los datos cambian y patrones para cachear responses de API.
Al terminar, tendras respuestas que pasan de segundos a milisegundos, reduciendo la carga en tu base de datos y mejorando la experiencia del usuario.

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
## What you'll build

A cache layer with Redis that drastically reduces your API response times by storing frequently queried data in memory.
You'll implement a generic cache wrapper that works with any async function, automatic time-based expiration (TTL), manual invalidation when data changes, and patterns for caching API responses.
When finished, you'll have responses that go from seconds to milliseconds, reducing the load on your database and improving user experience.

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
    timeEs: '60 minutos',
    timeEn: '60 minutes',
    prerequisitesEs: ['Ninguno - empezamos desde cero'],
    prerequisitesEn: ['None - we start from scratch'],
    contentEs: `
## Lo que vas a construir

Un sensor de temperatura y humedad conectado a internet que envia datos a tu computadora cada 5 segundos.

Al terminar tendras:
- Un ESP32 leyendo temperatura y humedad real de tu habitacion
- Los datos viajando por WiFi a un broker MQTT publico
- Un script en tu computadora mostrando los datos en tiempo real

Este es tu primer proyecto IoT real. Hardware + Software + Internet.

---

## Lista de compras (exacta)

Necesitas estos componentes especificos:

| Componente | Modelo exacto | Precio aprox | Donde comprar |
|------------|---------------|--------------|---------------|
| **Microcontrolador** | ESP32 DevKit V1 (30 pines) | $5-8 USD | Amazon, AliExpress, MercadoLibre |
| **Sensor** | DHT22 (azul) o DHT11 (azul barato) | $2-5 USD | Amazon, AliExpress |
| **Cables** | Jumper wires hembra-hembra (3 cables) | $2 USD | Cualquier tienda electronica |
| **Cable USB** | Micro USB (para programar el ESP32) | $2 USD | Probablemente ya tienes uno |

**Total: ~$12-15 USD**

> **Nota**: El DHT22 es mas preciso que el DHT11. Si puedes, compra el DHT22.

---

## Diagrama de conexiones

Conecta el sensor DHT22 al ESP32 asi:

\`\`\`
    ESP32 DevKit V1                    DHT22
    +--------------+                  +-------+
    |              |                  |       |
    |         3.3V |------ cable -----| VCC   |  (pin 1 - izquierda)
    |              |                  |       |
    |        GPIO4 |------ cable -----| DATA  |  (pin 2)
    |              |                  |       |
    |          GND |------ cable -----| GND   |  (pin 4 - derecha)
    |              |                  |       |
    +--------------+                  +-------+

    Nota: El pin 3 del DHT22 no se usa (dejalo sin conectar)
\`\`\`

**Tabla de conexiones:**

| ESP32 Pin | Cable | DHT22 Pin | Descripcion |
|-----------|-------|-----------|-------------|
| 3.3V | Rojo | Pin 1 (VCC) | Alimentacion del sensor |
| GPIO4 | Amarillo | Pin 2 (DATA) | Datos del sensor |
| GND | Negro | Pin 4 (GND) | Tierra |

> **Importante**: Usa 3.3V, NO 5V. El ESP32 trabaja a 3.3V.

---

## Paso 1: Instalar Arduino IDE

1. Ve a [arduino.cc/en/software](https://www.arduino.cc/en/software)
2. Descarga Arduino IDE 2.x para tu sistema operativo
3. Instala y abre Arduino IDE

---

## Paso 2: Configurar ESP32 en Arduino IDE

El ESP32 no viene preinstalado. Hay que agregarlo:

1. Abre Arduino IDE
2. Ve a **File → Preferences** (o Arduino IDE → Settings en Mac)
3. En "Additional boards manager URLs" agrega:
   \`\`\`
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   \`\`\`
4. Click OK
5. Ve a **Tools → Board → Boards Manager**
6. Busca "esp32"
7. Instala "esp32 by Espressif Systems" (tarda 2-3 minutos)

---

## Paso 3: Instalar librerias

Necesitas 2 librerias:

1. Ve a **Tools → Manage Libraries**
2. Busca "DHT sensor library" por Adafruit → Instalar
3. Busca "PubSubClient" por Nick O'Leary → Instalar

> Si te pregunta por dependencias, acepta instalarlas.

---

## Paso 4: Conectar el ESP32

1. Conecta el ESP32 a tu computadora con el cable USB
2. Ve a **Tools → Board** y selecciona "ESP32 Dev Module"
3. Ve a **Tools → Port** y selecciona el puerto (COM3, COM4 en Windows, o /dev/cu.usbserial en Mac)

> **No aparece el puerto?** Necesitas el driver CP210x:
> - Windows/Mac: [silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)

---

## Paso 5: El codigo completo

Crea un nuevo sketch y pega este codigo:

\`\`\`cpp
// ============================================
// Sensor IoT: ESP32 + DHT22 + MQTT
// luxIA.us - Tutorial completo
// ============================================

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// --- CONFIGURACION: EDITA ESTOS VALORES ---
const char* WIFI_SSID = "TU_NOMBRE_WIFI";      // Nombre de tu WiFi
const char* WIFI_PASS = "TU_PASSWORD_WIFI";    // Password de tu WiFi
const char* MQTT_SERVER = "broker.hivemq.com"; // Broker MQTT publico (gratis)
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC = "luxia/sensor/tuNombre"; // Cambia "tuNombre" por algo unico
// ------------------------------------------

// Configuracion del sensor
#define DHT_PIN 4        // GPIO4 - donde conectaste DATA
#define DHT_TYPE DHT22   // Cambia a DHT11 si usas ese modelo

DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  // Iniciar monitor serial (para ver mensajes en tu computadora)
  Serial.begin(115200);
  Serial.println();
  Serial.println("=== Sensor IoT iniciando ===");

  // Iniciar sensor
  dht.begin();
  Serial.println("Sensor DHT iniciado");

  // Conectar WiFi
  Serial.print("Conectando a WiFi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("WiFi conectado! IP: ");
  Serial.println(WiFi.localIP());

  // Configurar MQTT
  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  Serial.println("MQTT configurado");
}

void conectarMQTT() {
  while (!mqtt.connected()) {
    Serial.print("Conectando a MQTT...");

    // Crear ID unico para este dispositivo
    String clientId = "ESP32-" + String(random(0xffff), HEX);

    if (mqtt.connect(clientId.c_str())) {
      Serial.println(" conectado!");
    } else {
      Serial.print(" fallo, codigo: ");
      Serial.print(mqtt.state());
      Serial.println(" - reintentando en 5 segundos");
      delay(5000);
    }
  }
}

void loop() {
  // Asegurar conexion MQTT
  if (!mqtt.connected()) {
    conectarMQTT();
  }
  mqtt.loop();

  // Leer sensor
  float temperatura = dht.readTemperature();
  float humedad = dht.readHumidity();

  // Verificar lectura valida
  if (isnan(temperatura) || isnan(humedad)) {
    Serial.println("Error leyendo el sensor!");
    delay(2000);
    return;
  }

  // Crear mensaje JSON
  String mensaje = "{\\"temp\\":" + String(temperatura, 1) +
                   ",\\"hum\\":" + String(humedad, 1) + "}";

  // Enviar por MQTT
  mqtt.publish(MQTT_TOPIC, mensaje.c_str());

  // Mostrar en Serial Monitor
  Serial.print("Enviado: ");
  Serial.println(mensaje);

  // Esperar 5 segundos
  delay(5000);
}
\`\`\`

---

## Paso 6: Configurar TU WiFi

En el codigo, cambia estas lineas con tus datos:

\`\`\`cpp
const char* WIFI_SSID = "TU_NOMBRE_WIFI";      // El nombre de tu red WiFi
const char* WIFI_PASS = "TU_PASSWORD_WIFI";    // La contraseña de tu WiFi
const char* MQTT_TOPIC = "luxia/sensor/tuNombre"; // Cambia tuNombre
\`\`\`

---

## Paso 7: Subir el codigo

1. Click en el boton **Upload** (flecha hacia la derecha) en Arduino IDE
2. Espera a que compile (30-60 segundos)
3. Espera a que suba al ESP32 (aparece "Connecting..." y luego porcentajes)
4. Cuando termine, abre **Tools → Serial Monitor**
5. Selecciona **115200 baud** en la esquina inferior derecha

---

## Paso 8: Verificar que funciona

En el Serial Monitor deberias ver:

\`\`\`
=== Sensor IoT iniciando ===
Sensor DHT iniciado
Conectando a WiFi: TU_WIFI
....
WiFi conectado! IP: 192.168.1.105
MQTT configurado
Conectando a MQTT... conectado!
Enviado: {"temp":23.5,"hum":45.2}
Enviado: {"temp":23.6,"hum":45.1}
Enviado: {"temp":23.5,"hum":45.3}
\`\`\`

**Si ves esto, funciona!** Tu sensor esta enviando datos a internet.

---

## Paso 9: Ver los datos desde tu computadora

Ahora vamos a recibir esos datos en tu computadora.

Instala un cliente MQTT:

\`\`\`bash
npm install -g mqtt
\`\`\`

Suscribete a tu topic:

\`\`\`bash
mqtt sub -h broker.hivemq.com -t "luxia/sensor/tuNombre"
\`\`\`

Deberias ver los datos llegando:

\`\`\`
{"temp":23.5,"hum":45.2}
{"temp":23.6,"hum":45.1}
\`\`\`

---

## Troubleshooting

| Problema | Solucion |
|----------|----------|
| No aparece puerto COM | Instala driver CP210x (link arriba) |
| "Error leyendo sensor" | Verifica cables: 3.3V a VCC, GPIO4 a DATA, GND a GND |
| No conecta WiFi | Verifica nombre y password exactos (mayusculas/minusculas) |
| No conecta MQTT | Verifica conexion a internet, prueba reiniciar ESP32 |
| Temperatura incorrecta | Espera 2 minutos para que el sensor se estabilice |

---

## Proximo paso

→ [Dashboard de Analytics](/es/cooking/dashboard-analytics) - Muestra estos datos en graficos

    `,
    contentEn: `
## What you'll build

A temperature and humidity sensor connected to the internet that sends data to your computer every 5 seconds.

When finished you'll have:
- An ESP32 reading real temperature and humidity from your room
- Data traveling over WiFi to a public MQTT broker
- A script on your computer showing real-time data

This is your first real IoT project. Hardware + Software + Internet.

---

## Shopping list (exact)

You need these specific components:

| Component | Exact model | Approx price | Where to buy |
|-----------|-------------|--------------|--------------|
| **Microcontroller** | ESP32 DevKit V1 (30 pins) | $5-8 USD | Amazon, AliExpress |
| **Sensor** | DHT22 (blue) or DHT11 (cheaper blue) | $2-5 USD | Amazon, AliExpress |
| **Cables** | Jumper wires female-female (3 cables) | $2 USD | Any electronics store |
| **USB Cable** | Micro USB (to program ESP32) | $2 USD | You probably have one |

**Total: ~$12-15 USD**

> **Note**: DHT22 is more accurate than DHT11. If you can, buy the DHT22.

---

## Wiring diagram

Connect the DHT22 sensor to the ESP32 like this:

\`\`\`
    ESP32 DevKit V1                    DHT22
    +--------------+                  +-------+
    |              |                  |       |
    |         3.3V |------ wire ------| VCC   |  (pin 1 - left)
    |              |                  |       |
    |        GPIO4 |------ wire ------| DATA  |  (pin 2)
    |              |                  |       |
    |          GND |------ wire ------| GND   |  (pin 4 - right)
    |              |                  |       |
    +--------------+                  +-------+

    Note: DHT22 pin 3 is not used (leave disconnected)
\`\`\`

**Connection table:**

| ESP32 Pin | Wire | DHT22 Pin | Description |
|-----------|------|-----------|-------------|
| 3.3V | Red | Pin 1 (VCC) | Sensor power |
| GPIO4 | Yellow | Pin 2 (DATA) | Sensor data |
| GND | Black | Pin 4 (GND) | Ground |

> **Important**: Use 3.3V, NOT 5V. The ESP32 works at 3.3V.

---

## Step 1: Install Arduino IDE

1. Go to [arduino.cc/en/software](https://www.arduino.cc/en/software)
2. Download Arduino IDE 2.x for your operating system
3. Install and open Arduino IDE

---

## Step 2: Configure ESP32 in Arduino IDE

ESP32 doesn't come pre-installed. We need to add it:

1. Open Arduino IDE
2. Go to **File → Preferences** (or Arduino IDE → Settings on Mac)
3. In "Additional boards manager URLs" add:
   \`\`\`
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   \`\`\`
4. Click OK
5. Go to **Tools → Board → Boards Manager**
6. Search "esp32"
7. Install "esp32 by Espressif Systems" (takes 2-3 minutes)

---

## Step 3: Install libraries

You need 2 libraries:

1. Go to **Tools → Manage Libraries**
2. Search "DHT sensor library" by Adafruit → Install
3. Search "PubSubClient" by Nick O'Leary → Install

> If asked about dependencies, accept to install them.

---

## Step 4: Connect the ESP32

1. Connect ESP32 to your computer with USB cable
2. Go to **Tools → Board** and select "ESP32 Dev Module"
3. Go to **Tools → Port** and select the port (COM3, COM4 on Windows, or /dev/cu.usbserial on Mac)

> **Port not showing?** You need the CP210x driver:
> - Windows/Mac: [silabs.com/developers/usb-to-uart-bridge-vcp-drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)

---

## Step 5: The complete code

Create a new sketch and paste this code:

\`\`\`cpp
// ============================================
// IoT Sensor: ESP32 + DHT22 + MQTT
// luxIA.us - Complete tutorial
// ============================================

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// --- CONFIGURATION: EDIT THESE VALUES ---
const char* WIFI_SSID = "YOUR_WIFI_NAME";      // Your WiFi name
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";  // Your WiFi password
const char* MQTT_SERVER = "broker.hivemq.com"; // Public MQTT broker (free)
const int MQTT_PORT = 1883;
const char* MQTT_TOPIC = "luxia/sensor/yourName"; // Change "yourName" to something unique
// ----------------------------------------

// Sensor configuration
#define DHT_PIN 4        // GPIO4 - where you connected DATA
#define DHT_TYPE DHT22   // Change to DHT11 if using that model

DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  // Start serial monitor (to see messages on your computer)
  Serial.begin(115200);
  Serial.println();
  Serial.println("=== IoT Sensor starting ===");

  // Start sensor
  dht.begin();
  Serial.println("DHT sensor started");

  // Connect WiFi
  Serial.print("Connecting to WiFi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("WiFi connected! IP: ");
  Serial.println(WiFi.localIP());

  // Configure MQTT
  mqtt.setServer(MQTT_SERVER, MQTT_PORT);
  Serial.println("MQTT configured");
}

void connectMQTT() {
  while (!mqtt.connected()) {
    Serial.print("Connecting to MQTT...");

    // Create unique ID for this device
    String clientId = "ESP32-" + String(random(0xffff), HEX);

    if (mqtt.connect(clientId.c_str())) {
      Serial.println(" connected!");
    } else {
      Serial.print(" failed, code: ");
      Serial.print(mqtt.state());
      Serial.println(" - retrying in 5 seconds");
      delay(5000);
    }
  }
}

void loop() {
  // Ensure MQTT connection
  if (!mqtt.connected()) {
    connectMQTT();
  }
  mqtt.loop();

  // Read sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Check valid reading
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Error reading sensor!");
    delay(2000);
    return;
  }

  // Create JSON message
  String message = "{\\"temp\\":" + String(temperature, 1) +
                   ",\\"hum\\":" + String(humidity, 1) + "}";

  // Send via MQTT
  mqtt.publish(MQTT_TOPIC, message.c_str());

  // Show in Serial Monitor
  Serial.print("Sent: ");
  Serial.println(message);

  // Wait 5 seconds
  delay(5000);
}
\`\`\`

---

## Step 6: Configure YOUR WiFi

In the code, change these lines with your data:

\`\`\`cpp
const char* WIFI_SSID = "YOUR_WIFI_NAME";      // Your WiFi network name
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";  // Your WiFi password
const char* MQTT_TOPIC = "luxia/sensor/yourName"; // Change yourName
\`\`\`

---

## Step 7: Upload the code

1. Click the **Upload** button (right arrow) in Arduino IDE
2. Wait for compilation (30-60 seconds)
3. Wait for upload to ESP32 (shows "Connecting..." then percentages)
4. When done, open **Tools → Serial Monitor**
5. Select **115200 baud** in the bottom right corner

---

## Step 8: Verify it works

In Serial Monitor you should see:

\`\`\`
=== IoT Sensor starting ===
DHT sensor started
Connecting to WiFi: YOUR_WIFI
....
WiFi connected! IP: 192.168.1.105
MQTT configured
Connecting to MQTT... connected!
Sent: {"temp":23.5,"hum":45.2}
Sent: {"temp":23.6,"hum":45.1}
Sent: {"temp":23.5,"hum":45.3}
\`\`\`

**If you see this, it works!** Your sensor is sending data to the internet.

---

## Step 9: View data from your computer

Now let's receive that data on your computer.

Install an MQTT client:

\`\`\`bash
npm install -g mqtt
\`\`\`

Subscribe to your topic:

\`\`\`bash
mqtt sub -h broker.hivemq.com -t "luxia/sensor/yourName"
\`\`\`

You should see data arriving:

\`\`\`
{"temp":23.5,"hum":45.2}
{"temp":23.6,"hum":45.1}
\`\`\`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| COM port not showing | Install CP210x driver (link above) |
| "Error reading sensor" | Check wires: 3.3V to VCC, GPIO4 to DATA, GND to GND |
| Won't connect to WiFi | Verify exact name and password (case-sensitive) |
| Won't connect to MQTT | Check internet connection, try restarting ESP32 |
| Wrong temperature | Wait 2 minutes for sensor to stabilize |

---

## Next step

→ [Analytics Dashboard](/en/cooking/dashboard-analytics) - Display this data in charts

    `,
  },
  'dashboard-analytics': {
    timeEs: '35 minutos',
    timeEn: '35 minutes',
    prerequisitesEs: ['React', 'Charts', 'API'],
    prerequisitesEn: ['React', 'Charts', 'API'],
    contentEs: `
## Lo que vas a construir

Un panel de control interactivo que muestra las metricas clave de tu negocio o aplicacion con graficos en tiempo real.
Implementaras graficos de lineas para tendencias temporales, cards con KPIs importantes (usuarios, ventas, conversiones), una tabla con datos recientes y filtros por rango de fechas.
Al terminar, tendras un dashboard responsive con Recharts y Tailwind que puedes personalizar para mostrar cualquier dato de tu base de datos.

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
## What you'll build

An interactive control panel that displays the key metrics of your business or application with real-time charts.
You'll implement line charts for time trends, cards with important KPIs (users, sales, conversions), a table with recent data, and date range filters.
When finished, you'll have a responsive dashboard with Recharts and Tailwind that you can customize to display any data from your database.

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
  'monitoring-stack': {
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['Docker', 'Docker Compose', 'Node.js basico'],
    prerequisitesEn: ['Docker', 'Docker Compose', 'Basic Node.js'],
    contentEs: `
## Lo que vas a construir

Un stack de monitoreo completo con Prometheus para recolectar metricas, Grafana para visualizarlas, y una aplicacion Node.js que expone metricas personalizadas.

Al terminar tendras:
- Una app Node.js con endpoint \`/metrics\` usando prom-client
- Prometheus scrapeando metricas cada 15 segundos
- Grafana con dashboards y alertas configuradas
- Todo corriendo en Docker Compose con un solo comando

---

## Paso 1: Crea el proyecto

\`\`\`bash
mkdir monitoring-stack && cd monitoring-stack
mkdir app prometheus grafana
\`\`\`

---

## Paso 2: Crea la app Node.js con metricas

Crea \`app/package.json\`:

\`\`\`json
{
  "name": "metrics-app",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2",
    "prom-client": "^15.1.0"
  }
}
\`\`\`

Crea \`app/server.js\`:

\`\`\`javascript
const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Crear registro de metricas
const register = new client.Registry();

// Agregar metricas por defecto (memoria, CPU, etc.)
client.collectDefaultMetrics({ register });

// Metrica personalizada: contador de requests
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requests HTTP',
  labelNames: ['method', 'path', 'status'],
  registers: [register]
});

// Metrica personalizada: histograma de latencia
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duracion de requests HTTP en segundos',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register]
});

// Metrica personalizada: gauge de usuarios activos
const activeUsers = new client.Gauge({
  name: 'active_users',
  help: 'Numero de usuarios activos',
  registers: [register]
});

// Simular usuarios activos aleatorios
setInterval(() => {
  activeUsers.set(Math.floor(Math.random() * 100) + 10);
}, 5000);

// Middleware para medir requests
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, path: req.path });
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, path: req.path, status: res.statusCode });
    end();
  });
  next();
});

// Endpoints de la app
app.get('/', (req, res) => {
  res.json({ message: 'Hola! Esta app tiene metricas en /metrics' });
});

app.get('/api/users', (req, res) => {
  // Simular latencia variable
  const delay = Math.random() * 200;
  setTimeout(() => {
    res.json({ users: ['alice', 'bob', 'charlie'] });
  }, delay);
});

app.get('/api/slow', (req, res) => {
  // Endpoint lento para probar alertas
  setTimeout(() => {
    res.json({ message: 'Respuesta lenta' });
  }, 2000);
});

// Endpoint de metricas para Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(\`App corriendo en http://localhost:\${PORT}\`);
  console.log(\`Metricas en http://localhost:\${PORT}/metrics\`);
});
\`\`\`

Crea \`app/Dockerfile\`:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

---

## Paso 3: Configura Prometheus

Crea \`prometheus/prometheus.yml\`:

\`\`\`yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

rule_files: []

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: /metrics
\`\`\`

---

## Paso 4: Configura Grafana

Crea \`grafana/provisioning/datasources/datasources.yml\`:

\`\`\`yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
\`\`\`

Crea \`grafana/provisioning/dashboards/dashboards.yml\`:

\`\`\`yaml
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /etc/grafana/provisioning/dashboards
\`\`\`

Crea \`grafana/provisioning/dashboards/app-dashboard.json\`:

\`\`\`json
{
  "annotations": { "list": [] },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": null,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] }
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 12, "x": 0, "y": 0 },
      "id": 1,
      "options": { "colorMode": "value", "graphMode": "area", "justifyMode": "auto", "orientation": "auto", "reduceOptions": { "calcs": ["lastNotNull"], "fields": "", "values": false }, "textMode": "auto" },
      "pluginVersion": "10.0.0",
      "targets": [{ "expr": "rate(http_requests_total[5m])", "refId": "A" }],
      "title": "Requests por segundo",
      "type": "stat"
    },
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] }
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 12, "x": 12, "y": 0 },
      "id": 2,
      "options": { "colorMode": "value", "graphMode": "area", "justifyMode": "auto", "orientation": "auto", "reduceOptions": { "calcs": ["lastNotNull"], "fields": "", "values": false }, "textMode": "auto" },
      "pluginVersion": "10.0.0",
      "targets": [{ "expr": "active_users", "refId": "A" }],
      "title": "Usuarios Activos",
      "type": "stat"
    },
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "custom": { "axisCenteredZero": false, "axisColorMode": "text", "axisLabel": "", "axisPlacement": "auto", "barAlignment": 0, "drawStyle": "line", "fillOpacity": 10, "gradientMode": "none", "hideFrom": { "legend": false, "tooltip": false, "viz": false }, "lineInterpolation": "linear", "lineWidth": 1, "pointSize": 5, "scaleDistribution": { "type": "linear" }, "showPoints": "auto", "spanNulls": false, "stacking": { "group": "A", "mode": "none" }, "thresholdsStyle": { "mode": "off" } },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] },
          "unit": "s"
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 24, "x": 0, "y": 8 },
      "id": 3,
      "options": { "legend": { "calcs": [], "displayMode": "list", "placement": "bottom", "showLegend": true }, "tooltip": { "mode": "single", "sort": "none" } },
      "targets": [{ "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))", "legendFormat": "p95", "refId": "A" }, { "expr": "histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))", "legendFormat": "p50", "refId": "B" }],
      "title": "Latencia HTTP (p50 y p95)",
      "type": "timeseries"
    },
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "custom": { "axisCenteredZero": false, "axisColorMode": "text", "axisLabel": "", "axisPlacement": "auto", "barAlignment": 0, "drawStyle": "line", "fillOpacity": 10, "gradientMode": "none", "hideFrom": { "legend": false, "tooltip": false, "viz": false }, "lineInterpolation": "linear", "lineWidth": 1, "pointSize": 5, "scaleDistribution": { "type": "linear" }, "showPoints": "auto", "spanNulls": false, "stacking": { "group": "A", "mode": "none" }, "thresholdsStyle": { "mode": "off" } },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] },
          "unit": "bytes"
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 24, "x": 0, "y": 16 },
      "id": 4,
      "options": { "legend": { "calcs": [], "displayMode": "list", "placement": "bottom", "showLegend": true }, "tooltip": { "mode": "single", "sort": "none" } },
      "targets": [{ "expr": "process_resident_memory_bytes", "legendFormat": "Memoria RSS", "refId": "A" }],
      "title": "Uso de Memoria",
      "type": "timeseries"
    }
  ],
  "refresh": "5s",
  "schemaVersion": 38,
  "style": "dark",
  "tags": ["nodejs", "prometheus"],
  "templating": { "list": [] },
  "time": { "from": "now-15m", "to": "now" },
  "timepicker": {},
  "timezone": "",
  "title": "Node.js App Metrics",
  "uid": "nodejs-app-metrics",
  "version": 1,
  "weekStart": ""
}
\`\`\`

---

## Paso 5: Crea el docker-compose.yml

En la raiz del proyecto, crea \`docker-compose.yml\`:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.enable-lifecycle'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    networks:
      - monitoring
    depends_on:
      - prometheus

networks:
  monitoring:
    driver: bridge

volumes:
  prometheus_data:
  grafana_data:
\`\`\`

---

## Paso 6: Levanta todo

\`\`\`bash
# Construir y levantar
docker compose up -d --build

# Verificar que esten corriendo
docker compose ps
\`\`\`

Espera 30 segundos y verifica:

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| App | http://localhost:3000 | - |
| Metricas | http://localhost:3000/metrics | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3001 | admin / admin123 |

---

## Paso 7: Explora Prometheus

1. Abre http://localhost:9090
2. En "Expression", escribe \`http_requests_total\` y da Enter
3. Prueba estas queries:
   - \`rate(http_requests_total[5m])\` - Requests por segundo
   - \`histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))\` - p95 latencia
   - \`active_users\` - Usuarios activos

---

## Paso 8: Configura alertas en Grafana

1. Abre Grafana (http://localhost:3001)
2. Login: admin / admin123
3. Ve a Alerting > Alert rules > New alert rule
4. Configura:
   - Name: "Alta latencia"
   - Query: \`histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 1\`
   - Condition: IS ABOVE 1
5. Guarda

Para probar la alerta:

\`\`\`bash
# Genera requests lentos
for i in {1..20}; do curl http://localhost:3000/api/slow; done
\`\`\`

---

## Paso 9: Genera trafico de prueba

\`\`\`bash
# Script para generar trafico
while true; do
  curl -s http://localhost:3000/ > /dev/null
  curl -s http://localhost:3000/api/users > /dev/null
  sleep 0.5
done
\`\`\`

Deja correr por 2-3 minutos y observa los dashboards.

---

## Estructura final

\`\`\`
monitoring-stack/
  app/
    package.json
    server.js
    Dockerfile
  prometheus/
    prometheus.yml
  grafana/
    provisioning/
      datasources/
        datasources.yml
      dashboards/
        dashboards.yml
        app-dashboard.json
  docker-compose.yml
\`\`\`

---

## Comandos utiles

\`\`\`bash
# Ver logs
docker compose logs -f app
docker compose logs -f prometheus

# Reiniciar prometheus (recarga config)
curl -X POST http://localhost:9090/-/reload

# Detener todo
docker compose down

# Detener y borrar datos
docker compose down -v
\`\`\`

---

## Troubleshooting

| Problema | Solucion |
|----------|----------|
| Prometheus no scrapea | Verifica que \`app:3000\` sea accesible en la red |
| Grafana sin datos | Espera 30s, verifica datasource en Settings |
| Dashboard vacio | El UID del datasource debe coincidir |

---

## Proximo paso

-> [Testing Fullstack](/es/cooking/testing-fullstack)
    `,
    contentEn: `
## What you'll build

A complete monitoring stack with Prometheus to collect metrics, Grafana to visualize them, and a Node.js application that exposes custom metrics.

When finished you'll have:
- A Node.js app with \`/metrics\` endpoint using prom-client
- Prometheus scraping metrics every 15 seconds
- Grafana with dashboards and alerts configured
- Everything running in Docker Compose with a single command

---

## Step 1: Create the project

\`\`\`bash
mkdir monitoring-stack && cd monitoring-stack
mkdir app prometheus grafana
\`\`\`

---

## Step 2: Create the Node.js app with metrics

Create \`app/package.json\`:

\`\`\`json
{
  "name": "metrics-app",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2",
    "prom-client": "^15.1.0"
  }
}
\`\`\`

Create \`app/server.js\`:

\`\`\`javascript
const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Create metrics registry
const register = new client.Registry();

// Add default metrics (memory, CPU, etc.)
client.collectDefaultMetrics({ register });

// Custom metric: request counter
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status'],
  registers: [register]
});

// Custom metric: latency histogram
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [register]
});

// Custom metric: active users gauge
const activeUsers = new client.Gauge({
  name: 'active_users',
  help: 'Number of active users',
  registers: [register]
});

// Simulate random active users
setInterval(() => {
  activeUsers.set(Math.floor(Math.random() * 100) + 10);
}, 5000);

// Middleware to measure requests
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({ method: req.method, path: req.path });
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, path: req.path, status: res.statusCode });
    end();
  });
  next();
});

// App endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Hello! This app has metrics at /metrics' });
});

app.get('/api/users', (req, res) => {
  // Simulate variable latency
  const delay = Math.random() * 200;
  setTimeout(() => {
    res.json({ users: ['alice', 'bob', 'charlie'] });
  }, delay);
});

app.get('/api/slow', (req, res) => {
  // Slow endpoint to test alerts
  setTimeout(() => {
    res.json({ message: 'Slow response' });
  }, 2000);
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(\`App running at http://localhost:\${PORT}\`);
  console.log(\`Metrics at http://localhost:\${PORT}/metrics\`);
});
\`\`\`

Create \`app/Dockerfile\`:

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

---

## Step 3: Configure Prometheus

Create \`prometheus/prometheus.yml\`:

\`\`\`yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: []

rule_files: []

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-app'
    static_configs:
      - targets: ['app:3000']
    metrics_path: /metrics
\`\`\`

---

## Step 4: Configure Grafana

Create \`grafana/provisioning/datasources/datasources.yml\`:

\`\`\`yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false
\`\`\`

Create \`grafana/provisioning/dashboards/dashboards.yml\`:

\`\`\`yaml
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /etc/grafana/provisioning/dashboards
\`\`\`

Create \`grafana/provisioning/dashboards/app-dashboard.json\`:

\`\`\`json
{
  "annotations": { "list": [] },
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": null,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] }
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 12, "x": 0, "y": 0 },
      "id": 1,
      "options": { "colorMode": "value", "graphMode": "area", "justifyMode": "auto", "orientation": "auto", "reduceOptions": { "calcs": ["lastNotNull"], "fields": "", "values": false }, "textMode": "auto" },
      "pluginVersion": "10.0.0",
      "targets": [{ "expr": "rate(http_requests_total[5m])", "refId": "A" }],
      "title": "Requests per second",
      "type": "stat"
    },
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] }
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 12, "x": 12, "y": 0 },
      "id": 2,
      "options": { "colorMode": "value", "graphMode": "area", "justifyMode": "auto", "orientation": "auto", "reduceOptions": { "calcs": ["lastNotNull"], "fields": "", "values": false }, "textMode": "auto" },
      "pluginVersion": "10.0.0",
      "targets": [{ "expr": "active_users", "refId": "A" }],
      "title": "Active Users",
      "type": "stat"
    },
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "custom": { "axisCenteredZero": false, "axisColorMode": "text", "axisLabel": "", "axisPlacement": "auto", "barAlignment": 0, "drawStyle": "line", "fillOpacity": 10, "gradientMode": "none", "hideFrom": { "legend": false, "tooltip": false, "viz": false }, "lineInterpolation": "linear", "lineWidth": 1, "pointSize": 5, "scaleDistribution": { "type": "linear" }, "showPoints": "auto", "spanNulls": false, "stacking": { "group": "A", "mode": "none" }, "thresholdsStyle": { "mode": "off" } },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] },
          "unit": "s"
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 24, "x": 0, "y": 8 },
      "id": 3,
      "options": { "legend": { "calcs": [], "displayMode": "list", "placement": "bottom", "showLegend": true }, "tooltip": { "mode": "single", "sort": "none" } },
      "targets": [{ "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))", "legendFormat": "p95", "refId": "A" }, { "expr": "histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))", "legendFormat": "p50", "refId": "B" }],
      "title": "HTTP Latency (p50 and p95)",
      "type": "timeseries"
    },
    {
      "datasource": { "type": "prometheus", "uid": "PBFA97CFB590B2093" },
      "fieldConfig": {
        "defaults": {
          "color": { "mode": "palette-classic" },
          "custom": { "axisCenteredZero": false, "axisColorMode": "text", "axisLabel": "", "axisPlacement": "auto", "barAlignment": 0, "drawStyle": "line", "fillOpacity": 10, "gradientMode": "none", "hideFrom": { "legend": false, "tooltip": false, "viz": false }, "lineInterpolation": "linear", "lineWidth": 1, "pointSize": 5, "scaleDistribution": { "type": "linear" }, "showPoints": "auto", "spanNulls": false, "stacking": { "group": "A", "mode": "none" }, "thresholdsStyle": { "mode": "off" } },
          "mappings": [],
          "thresholds": { "mode": "absolute", "steps": [{ "color": "green", "value": null }] },
          "unit": "bytes"
        },
        "overrides": []
      },
      "gridPos": { "h": 8, "w": 24, "x": 0, "y": 16 },
      "id": 4,
      "options": { "legend": { "calcs": [], "displayMode": "list", "placement": "bottom", "showLegend": true }, "tooltip": { "mode": "single", "sort": "none" } },
      "targets": [{ "expr": "process_resident_memory_bytes", "legendFormat": "Memory RSS", "refId": "A" }],
      "title": "Memory Usage",
      "type": "timeseries"
    }
  ],
  "refresh": "5s",
  "schemaVersion": 38,
  "style": "dark",
  "tags": ["nodejs", "prometheus"],
  "templating": { "list": [] },
  "time": { "from": "now-15m", "to": "now" },
  "timepicker": {},
  "timezone": "",
  "title": "Node.js App Metrics",
  "uid": "nodejs-app-metrics",
  "version": 1,
  "weekStart": ""
}
\`\`\`

---

## Step 5: Create docker-compose.yml

In the project root, create \`docker-compose.yml\`:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.enable-lifecycle'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    networks:
      - monitoring
    depends_on:
      - prometheus

networks:
  monitoring:
    driver: bridge

volumes:
  prometheus_data:
  grafana_data:
\`\`\`

---

## Step 6: Start everything

\`\`\`bash
# Build and start
docker compose up -d --build

# Verify they're running
docker compose ps
\`\`\`

Wait 30 seconds and verify:

| Service | URL | Credentials |
|---------|-----|-------------|
| App | http://localhost:3000 | - |
| Metrics | http://localhost:3000/metrics | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3001 | admin / admin123 |

---

## Step 7: Explore Prometheus

1. Open http://localhost:9090
2. In "Expression", type \`http_requests_total\` and press Enter
3. Try these queries:
   - \`rate(http_requests_total[5m])\` - Requests per second
   - \`histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))\` - p95 latency
   - \`active_users\` - Active users

---

## Step 8: Configure alerts in Grafana

1. Open Grafana (http://localhost:3001)
2. Login: admin / admin123
3. Go to Alerting > Alert rules > New alert rule
4. Configure:
   - Name: "High latency"
   - Query: \`histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) > 1\`
   - Condition: IS ABOVE 1
5. Save

To test the alert:

\`\`\`bash
# Generate slow requests
for i in {1..20}; do curl http://localhost:3000/api/slow; done
\`\`\`

---

## Step 9: Generate test traffic

\`\`\`bash
# Script to generate traffic
while true; do
  curl -s http://localhost:3000/ > /dev/null
  curl -s http://localhost:3000/api/users > /dev/null
  sleep 0.5
done
\`\`\`

Let it run for 2-3 minutes and observe the dashboards.

---

## Final structure

\`\`\`
monitoring-stack/
  app/
    package.json
    server.js
    Dockerfile
  prometheus/
    prometheus.yml
  grafana/
    provisioning/
      datasources/
        datasources.yml
      dashboards/
        dashboards.yml
        app-dashboard.json
  docker-compose.yml
\`\`\`

---

## Useful commands

\`\`\`bash
# View logs
docker compose logs -f app
docker compose logs -f prometheus

# Restart prometheus (reload config)
curl -X POST http://localhost:9090/-/reload

# Stop everything
docker compose down

# Stop and delete data
docker compose down -v
\`\`\`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Prometheus not scraping | Verify \`app:3000\` is accessible in the network |
| Grafana no data | Wait 30s, verify datasource in Settings |
| Empty dashboard | Datasource UID must match |

---

## Next step

-> [Fullstack Testing](/en/cooking/testing-fullstack)
    `,
  },

  'security-hardening': {
    timeEs: '45 minutos',
    timeEn: '45 minutes',
    prerequisitesEs: ['Node.js instalado', 'Conocimientos basicos de Express.js', 'npm o pnpm'],
    prerequisitesEn: ['Node.js installed', 'Basic Express.js knowledge', 'npm or pnpm'],
    contentEs: `
## Lo que vas a construir

Una API REST segura con Express.js que implementa las mejores practicas de seguridad para aplicaciones web.

Empezaras con una API vulnerable y paso a paso la convertiras en una API hardened con:
- Headers de seguridad con Helmet.js
- Rate limiting para prevenir ataques de fuerza bruta
- Validacion de entrada con Zod
- Prevencion de SQL Injection con queries parametrizadas
- Proteccion XSS
- Configuracion segura de CORS
- Auditoria de dependencias en CI/CD

Al terminar tendras una API lista para produccion con un checklist de seguridad verificable.

---

## Paso 1: Crea el proyecto base

\`\`\`bash
mkdir secure-api && cd secure-api
npm init -y
npm install express
\`\`\`

Crea \`server.js\` con una API basica (vulnerable):

\`\`\`javascript
// server.js - VERSION VULNERABLE (NO USAR EN PRODUCCION)
const express = require('express');
const app = express();

app.use(express.json());

// Base de datos simulada
const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123' }
];

// Endpoint vulnerable a varios ataques
app.get('/api/users', (req, res) => {
  res.json(users); // Expone passwords!
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Sin validacion de entrada
  // Vulnerable a inyeccion
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login exitoso', user }); // Expone todo el objeto
  } else {
    res.status(401).json({ message: 'Credenciales invalidas' });
  }
});

app.listen(3000, () => console.log('Server en http://localhost:3000'));
\`\`\`

---

## Paso 2: Agrega Helmet.js para headers de seguridad

Helmet configura automaticamente headers HTTP que protegen contra vulnerabilidades comunes.

\`\`\`bash
npm install helmet
\`\`\`

**Antes (sin headers de seguridad):**
\`\`\`javascript
const app = express();
// Sin proteccion - headers por defecto de Express
\`\`\`

**Despues (con Helmet):**
\`\`\`javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// Helmet agrega 11+ headers de seguridad automaticamente
app.use(helmet());

// Headers que Helmet configura:
// - Content-Security-Policy: previene XSS
// - X-Content-Type-Options: nosniff
// - X-Frame-Options: DENY (previene clickjacking)
// - Strict-Transport-Security: fuerza HTTPS
// - X-XSS-Protection: filtro XSS del navegador
\`\`\`

Verifica los headers:
\`\`\`bash
curl -I http://localhost:3000/api/users
\`\`\`

---

## Paso 3: Implementa Rate Limiting

Previene ataques de fuerza bruta y DDoS limitando las peticiones por IP.

\`\`\`bash
npm install express-rate-limit
\`\`\`

**Antes (sin limites):**
\`\`\`javascript
// Un atacante puede hacer millones de peticiones
app.post('/api/login', (req, res) => { ... });
\`\`\`

**Despues (con rate limiting):**
\`\`\`javascript
const rateLimit = require('express-rate-limit');

// Limite global: 100 peticiones por 15 minutos
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: { error: 'Demasiadas peticiones. Intenta en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limite estricto para login: 5 intentos por 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiados intentos de login. Cuenta bloqueada temporalmente.' },
  skipSuccessfulRequests: true, // No cuenta logins exitosos
});

app.use(globalLimiter);
app.post('/api/login', loginLimiter, (req, res) => { ... });
\`\`\`

---

## Paso 4: Validacion de entrada con Zod

Nunca confies en datos del usuario. Valida TODO.

\`\`\`bash
npm install zod
\`\`\`

**Antes (sin validacion):**
\`\`\`javascript
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Si email es un objeto o array, puede causar errores
  // Si password es muy largo, puede causar DoS
});
\`\`\`

**Despues (con Zod):**
\`\`\`javascript
const { z } = require('zod');

// Definir esquema de validacion
const loginSchema = z.object({
  email: z.string()
    .email('Email invalido')
    .max(255, 'Email muy largo'),
  password: z.string()
    .min(8, 'Password debe tener al menos 8 caracteres')
    .max(128, 'Password muy largo'),
});

// Middleware de validacion reutilizable
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Datos invalidos',
      details: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }
};

app.post('/api/login', validate(loginSchema), (req, res) => {
  const { email, password } = req.body;
  // Ahora sabemos que email y password son strings validos
});

// Esquema para crear usuario
const userSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\\s]+$/, 'Solo letras'),
  email: z.string().email().max(255),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, 'Debe tener mayuscula')
    .regex(/[0-9]/, 'Debe tener numero')
    .regex(/[^A-Za-z0-9]/, 'Debe tener caracter especial'),
});
\`\`\`

---

## Paso 5: Prevencion de SQL Injection

Si usas base de datos SQL, SIEMPRE usa queries parametrizadas.

**Antes (VULNERABLE):**
\`\`\`javascript
// NUNCA hagas esto - vulnerable a SQL injection
app.get('/api/users/:id', async (req, res) => {
  const query = \\\`SELECT * FROM users WHERE id = \\\${req.params.id}\\\`;
  // Atacante puede enviar: 1; DROP TABLE users; --
  const result = await db.query(query);
  res.json(result);
});
\`\`\`

**Despues (SEGURO) - con pg (PostgreSQL):**
\`\`\`javascript
const { Pool } = require('pg');
const pool = new Pool();

app.get('/api/users/:id', async (req, res) => {
  try {
    // Query parametrizada - el driver escapa automaticamente
    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.params.id]  // Parametro separado
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Para INSERT tambien usa parametros
app.post('/api/users', validate(userSchema), async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );

  res.status(201).json(result.rows[0]);
});
\`\`\`

**Con un ORM (Prisma) - tambien seguro:**
\`\`\`javascript
// Prisma usa queries parametrizadas internamente
const user = await prisma.user.findUnique({
  where: { id: parseInt(req.params.id) },
  select: { id: true, name: true, email: true } // No seleccionar password
});
\`\`\`

---

## Paso 6: Proteccion XSS

Cross-Site Scripting ocurre cuando un atacante inyecta scripts maliciosos.

**Antes (VULNERABLE):**
\`\`\`javascript
app.get('/api/comments', async (req, res) => {
  const comments = await db.getComments();
  res.json(comments);
  // Si un comentario contiene <script>alert('hacked')</script>
  // y el frontend lo renderiza con innerHTML, se ejecuta
});
\`\`\`

**Despues (SEGURO):**
\`\`\`javascript
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Sanitizar al guardar
app.post('/api/comments', validate(commentSchema), async (req, res) => {
  const sanitizedContent = DOMPurify.sanitize(req.body.content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'], // Solo tags seguros
    ALLOWED_ATTR: [] // Sin atributos
  });

  await db.createComment({
    content: sanitizedContent,
    userId: req.user.id
  });

  res.status(201).json({ message: 'Comentario creado' });
});

// Alternativa: escapar HTML en el frontend
// React lo hace automaticamente con JSX
// Vue lo hace con {{ }} (doble llave)
\`\`\`

**Headers adicionales (ya incluidos en Helmet):**
\`\`\`javascript
// Content-Security-Policy estricto
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"], // Solo scripts del mismo origen
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
}));
\`\`\`

---

## Paso 7: Configuracion segura de CORS

CORS controla que dominios pueden acceder a tu API.

\`\`\`bash
npm install cors
\`\`\`

**Antes (INSEGURO):**
\`\`\`javascript
const cors = require('cors');
app.use(cors()); // Permite TODOS los origenes - peligroso!
\`\`\`

**Despues (SEGURO):**
\`\`\`javascript
const cors = require('cors');

const allowedOrigins = [
  'https://miapp.com',
  'https://www.miapp.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permite cookies
  maxAge: 86400 // Cache preflight por 24 horas
}));
\`\`\`

---

## Paso 8: npm audit en CI/CD

Detecta vulnerabilidades en dependencias automaticamente.

Crea \`.github/workflows/security.yml\`:

\`\`\`yaml
name: Security Audit

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 1' # Cada lunes a medianoche

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run security audit
        run: npm audit --audit-level=high
        # Falla si hay vulnerabilidades high o critical

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
        continue-on-error: true # No bloquear, solo alertar

  dependency-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - name: Dependency Review
        uses: actions/dependency-review-action@v3
        with:
          fail-on-severity: high
\`\`\`

**Comandos locales utiles:**
\`\`\`bash
# Ver vulnerabilidades
npm audit

# Arreglar automaticamente
npm audit fix

# Arreglar incluyendo breaking changes
npm audit fix --force

# Ver solo vulnerabilidades criticas
npm audit --audit-level=critical
\`\`\`

---

## Paso 9: Codigo completo seguro

\`\`\`javascript
// server.js - VERSION SEGURA
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const bcrypt = require('bcrypt');

const app = express();

// 1. Security headers
app.use(helmet());

// 2. CORS configurado
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// 3. Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.json({ limit: '10kb' })); // Limitar tamano del body

// 4. Esquemas de validacion
const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128)
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Datos invalidos' });
  }
  next();
};

// 5. Login seguro
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});

app.post('/api/login', loginLimiter, validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario (query parametrizada)
    const user = await db.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (!user.rows[0]) {
      // Tiempo constante para prevenir timing attacks
      await bcrypt.compare(password, '$2b$12$invalidhashtopreventtiming');
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    // Respuesta sin datos sensibles
    res.json({
      user: { id: user.rows[0].id, email: user.rows[0].email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// 6. Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salio mal' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\\\`Servidor seguro en puerto \\\${PORT}\\\`);
});
\`\`\`

---

## Paso 10: Checklist de verificacion

Antes de ir a produccion, verifica cada punto:

| Categoria | Item | Comando/Verificacion |
|-----------|------|---------------------|
| **Headers** | Helmet activo | \`curl -I localhost:3000\` |
| **Headers** | CSP configurado | Verificar Content-Security-Policy |
| **Rate Limit** | Global activo | Hacer 101+ requests |
| **Rate Limit** | Login estricto | Hacer 6+ logins fallidos |
| **Validacion** | Zod en endpoints | Enviar datos invalidos |
| **SQL** | Queries parametrizadas | Revisar codigo |
| **XSS** | Sanitizacion activa | Enviar \`<script>alert(1)</script>\` |
| **CORS** | Solo origenes permitidos | Request desde otro dominio |
| **Deps** | Sin vulnerabilidades | \`npm audit\` |
| **CI/CD** | Audit automatico | Revisar GitHub Actions |
| **Passwords** | Hasheados con bcrypt | Revisar DB |
| **Errores** | Sin stack traces | Forzar error en prod |
| **HTTPS** | Forzado en prod | Verificar redirect |

---

## Troubleshooting

| Problema | Causa | Solucion |
|----------|-------|----------|
| CORS bloqueado | Origen no en lista | Agregar a allowedOrigins |
| Rate limit muy estricto | Pocos requests permitidos | Ajustar max y windowMs |
| Zod rechaza todo | Esquema muy estricto | Revisar validaciones |
| npm audit falla | Dependencia vulnerable | \`npm audit fix\` o actualizar |

---

## Proximo paso

-> [RAG con Documentos PDF](/es/cooking/rag-documents) - Nivel Master
    `,
    contentEn: `
## What you'll build

A secure REST API with Express.js that implements web application security best practices.

You'll start with a vulnerable API and step by step transform it into a hardened API with:
- Security headers with Helmet.js
- Rate limiting to prevent brute force attacks
- Input validation with Zod
- SQL Injection prevention with parameterized queries
- XSS protection
- Secure CORS configuration
- Dependency auditing in CI/CD

When finished, you'll have a production-ready API with a verifiable security checklist.

---

## Step 1: Create the base project

\`\`\`bash
mkdir secure-api && cd secure-api
npm init -y
npm install express
\`\`\`

Create \`server.js\` with a basic (vulnerable) API:

\`\`\`javascript
// server.js - VULNERABLE VERSION (DO NOT USE IN PRODUCTION)
const express = require('express');
const app = express();

app.use(express.json());

// Simulated database
const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123' }
];

// Endpoint vulnerable to various attacks
app.get('/api/users', (req, res) => {
  res.json(users); // Exposes passwords!
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // No input validation
  // Vulnerable to injection
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful', user }); // Exposes entire object
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('Server at http://localhost:3000'));
\`\`\`

---

## Step 2: Add Helmet.js for security headers

Helmet automatically configures HTTP headers that protect against common vulnerabilities.

\`\`\`bash
npm install helmet
\`\`\`

**Before (no security headers):**
\`\`\`javascript
const app = express();
// No protection - Express default headers
\`\`\`

**After (with Helmet):**
\`\`\`javascript
const express = require('express');
const helmet = require('helmet');

const app = express();

// Helmet adds 11+ security headers automatically
app.use(helmet());

// Headers that Helmet configures:
// - Content-Security-Policy: prevents XSS
// - X-Content-Type-Options: nosniff
// - X-Frame-Options: DENY (prevents clickjacking)
// - Strict-Transport-Security: forces HTTPS
// - X-XSS-Protection: browser XSS filter
\`\`\`

Verify the headers:
\`\`\`bash
curl -I http://localhost:3000/api/users
\`\`\`

---

## Step 3: Implement Rate Limiting

Prevents brute force attacks and DDoS by limiting requests per IP.

\`\`\`bash
npm install express-rate-limit
\`\`\`

**Before (no limits):**
\`\`\`javascript
// An attacker can make millions of requests
app.post('/api/login', (req, res) => { ... });
\`\`\`

**After (with rate limiting):**
\`\`\`javascript
const rateLimit = require('express-rate-limit');

// Global limit: 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limit for login: 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Account temporarily locked.' },
  skipSuccessfulRequests: true, // Don't count successful logins
});

app.use(globalLimiter);
app.post('/api/login', loginLimiter, (req, res) => { ... });
\`\`\`

---

## Step 4: Input validation with Zod

Never trust user data. Validate EVERYTHING.

\`\`\`bash
npm install zod
\`\`\`

**Before (no validation):**
\`\`\`javascript
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // If email is an object or array, it can cause errors
  // If password is too long, it can cause DoS
});
\`\`\`

**After (with Zod):**
\`\`\`javascript
const { z } = require('zod');

// Define validation schema
const loginSchema = z.object({
  email: z.string()
    .email('Invalid email')
    .max(255, 'Email too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long'),
});

// Reusable validation middleware
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Invalid data',
      details: error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }
};

app.post('/api/login', validate(loginSchema), (req, res) => {
  const { email, password } = req.body;
  // Now we know email and password are valid strings
});

// Schema for creating user
const userSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\\s]+$/, 'Letters only'),
  email: z.string().email().max(255),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, 'Must have uppercase')
    .regex(/[0-9]/, 'Must have number')
    .regex(/[^A-Za-z0-9]/, 'Must have special character'),
});
\`\`\`

---

## Step 5: SQL Injection Prevention

If you use SQL databases, ALWAYS use parameterized queries.

**Before (VULNERABLE):**
\`\`\`javascript
// NEVER do this - vulnerable to SQL injection
app.get('/api/users/:id', async (req, res) => {
  const query = \\\`SELECT * FROM users WHERE id = \\\${req.params.id}\\\`;
  // Attacker can send: 1; DROP TABLE users; --
  const result = await db.query(query);
  res.json(result);
});
\`\`\`

**After (SECURE) - with pg (PostgreSQL):**
\`\`\`javascript
const { Pool } = require('pg');
const pool = new Pool();

app.get('/api/users/:id', async (req, res) => {
  try {
    // Parameterized query - driver escapes automatically
    const result = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.params.id]  // Separate parameter
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Internal error' });
  }
});

// For INSERT also use parameters
app.post('/api/users', validate(userSchema), async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );

  res.status(201).json(result.rows[0]);
});
\`\`\`

**With an ORM (Prisma) - also secure:**
\`\`\`javascript
// Prisma uses parameterized queries internally
const user = await prisma.user.findUnique({
  where: { id: parseInt(req.params.id) },
  select: { id: true, name: true, email: true } // Don't select password
});
\`\`\`

---

## Step 6: XSS Protection

Cross-Site Scripting occurs when an attacker injects malicious scripts.

**Before (VULNERABLE):**
\`\`\`javascript
app.get('/api/comments', async (req, res) => {
  const comments = await db.getComments();
  res.json(comments);
  // If a comment contains <script>alert('hacked')</script>
  // and the frontend renders it with innerHTML, it executes
});
\`\`\`

**After (SECURE):**
\`\`\`javascript
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Sanitize when saving
app.post('/api/comments', validate(commentSchema), async (req, res) => {
  const sanitizedContent = DOMPurify.sanitize(req.body.content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'], // Only safe tags
    ALLOWED_ATTR: [] // No attributes
  });

  await db.createComment({
    content: sanitizedContent,
    userId: req.user.id
  });

  res.status(201).json({ message: 'Comment created' });
});

// Alternative: escape HTML in frontend
// React does it automatically with JSX
// Vue does it with {{ }} (double braces)
\`\`\`

**Additional headers (already included in Helmet):**
\`\`\`javascript
// Strict Content-Security-Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"], // Only scripts from same origin
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
}));
\`\`\`

---

## Step 7: Secure CORS Configuration

CORS controls which domains can access your API.

\`\`\`bash
npm install cors
\`\`\`

**Before (INSECURE):**
\`\`\`javascript
const cors = require('cors');
app.use(cors()); // Allows ALL origins - dangerous!
\`\`\`

**After (SECURE):**
\`\`\`javascript
const cors = require('cors');

const allowedOrigins = [
  'https://myapp.com',
  'https://www.myapp.com',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without origin (mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allows cookies
  maxAge: 86400 // Cache preflight for 24 hours
}));
\`\`\`

---

## Step 8: npm audit in CI/CD

Automatically detect vulnerabilities in dependencies.

Create \`.github/workflows/security.yml\`:

\`\`\`yaml
name: Security Audit

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 1' # Every Monday at midnight

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run security audit
        run: npm audit --audit-level=high
        # Fails if there are high or critical vulnerabilities

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
        continue-on-error: true # Don't block, just alert

  dependency-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - name: Dependency Review
        uses: actions/dependency-review-action@v3
        with:
          fail-on-severity: high
\`\`\`

**Useful local commands:**
\`\`\`bash
# View vulnerabilities
npm audit

# Auto-fix
npm audit fix

# Fix including breaking changes
npm audit fix --force

# View only critical vulnerabilities
npm audit --audit-level=critical
\`\`\`

---

## Step 9: Complete secure code

\`\`\`javascript
// server.js - SECURE VERSION
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const bcrypt = require('bcrypt');

const app = express();

// 1. Security headers
app.use(helmet());

// 2. CORS configured
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// 3. Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.json({ limit: '10kb' })); // Limit body size

// 4. Validation schemas
const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128)
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  next();
};

// 5. Secure login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true
});

app.post('/api/login', loginLimiter, validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user (parameterized query)
    const user = await db.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (!user.rows[0]) {
      // Constant time to prevent timing attacks
      await bcrypt.compare(password, '$2b$12$invalidhashtopreventtiming');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Response without sensitive data
    res.json({
      user: { id: user.rows[0].id, email: user.rows[0].email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal error' });
  }
});

// 6. Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\\\`Secure server on port \\\${PORT}\\\`);
});
\`\`\`

---

## Step 10: Verification checklist

Before going to production, verify each item:

| Category | Item | Command/Verification |
|----------|------|---------------------|
| **Headers** | Helmet active | \`curl -I localhost:3000\` |
| **Headers** | CSP configured | Check Content-Security-Policy |
| **Rate Limit** | Global active | Make 101+ requests |
| **Rate Limit** | Strict login | Make 6+ failed logins |
| **Validation** | Zod on endpoints | Send invalid data |
| **SQL** | Parameterized queries | Review code |
| **XSS** | Sanitization active | Send \`<script>alert(1)</script>\` |
| **CORS** | Only allowed origins | Request from other domain |
| **Deps** | No vulnerabilities | \`npm audit\` |
| **CI/CD** | Automatic audit | Check GitHub Actions |
| **Passwords** | Hashed with bcrypt | Check DB |
| **Errors** | No stack traces | Force error in prod |
| **HTTPS** | Forced in prod | Verify redirect |

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| CORS blocked | Origin not in list | Add to allowedOrigins |
| Rate limit too strict | Too few requests allowed | Adjust max and windowMs |
| Zod rejects everything | Schema too strict | Review validations |
| npm audit fails | Vulnerable dependency | \`npm audit fix\` or update |

---

## Next step

-> [RAG with PDF Documents](/en/cooking/rag-documents) - Master Level
    `,
  },
  'testing-fullstack': {
    timeEs: '60 minutos',
    timeEn: '60 minutes',
    prerequisitesEs: ['Node.js', 'React basico', 'Entender APIs REST'],
    prerequisitesEn: ['Node.js', 'Basic React', 'Understanding of REST APIs'],
    contentEs: `
## Lo que vas a construir

Una aplicacion fullstack completamente testeada: un API REST con Express y un frontend React, con tests en todos los niveles de la piramide de testing.
Escribiras tests unitarios con Jest para la logica de negocio, tests de integracion con Supertest para los endpoints, tests de base de datos con Testcontainers, tests de componentes React con Testing Library, y tests end-to-end con Playwright.
Al terminar, tendras una suite de tests completa con reporte de cobertura que te da confianza para hacer cambios sin romper nada.

---

## Paso 1: Crear el proyecto

\`\`\`bash
mkdir fullstack-testing && cd fullstack-testing
npm init -y
\`\`\`

Instala las dependencias del backend:

\`\`\`bash
npm install express cors
npm install -D typescript @types/node @types/express ts-node nodemon
\`\`\`

---

## Paso 2: Configurar TypeScript

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
\`\`\`

---

## Paso 3: Crear la logica de negocio

\`\`\`typescript
// src/services/userService.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
}

// Simulamos una base de datos en memoria
const users: Map<string, User> = new Map();

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

export function validateName(name: string): boolean {
  return name.length >= 2 && name.length <= 50;
}

export function createUser(data: CreateUserDTO): User {
  if (!validateEmail(data.email)) {
    throw new Error('Email invalido');
  }
  if (!validateName(data.name)) {
    throw new Error('Nombre debe tener entre 2 y 50 caracteres');
  }

  // Verificar email unico
  for (const user of users.values()) {
    if (user.email === data.email) {
      throw new Error('Email ya existe');
    }
  }

  const user: User = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.toLowerCase(),
    createdAt: new Date()
  };

  users.set(user.id, user);
  return user;
}

export function getUser(id: string): User | undefined {
  return users.get(id);
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}

export function deleteUser(id: string): boolean {
  return users.delete(id);
}

export function clearUsers(): void {
  users.clear();
}
\`\`\`

---

## Paso 4: Crear el API REST

\`\`\`typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import * as userService from './services/userService';

const app = express();

app.use(cors());
app.use(express.json());

// GET /api/users - Listar usuarios
app.get('/api/users', (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
});

// GET /api/users/:id - Obtener usuario
app.get('/api/users/:id', (req, res) => {
  const user = userService.getUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(user);
});

// POST /api/users - Crear usuario
app.post('/api/users', (req, res) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    res.status(400).json({ error: message });
  }
});

// DELETE /api/users/:id - Eliminar usuario
app.delete('/api/users/:id', (req, res) => {
  const deleted = userService.deleteUser(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.status(204).send();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export { app };
\`\`\`

\`\`\`typescript
// src/server.ts
import { app } from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
});
\`\`\`

---

## Paso 5: Tests unitarios con Jest

\`\`\`bash
npm install -D jest @types/jest ts-jest
\`\`\`

\`\`\`javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
\`\`\`

\`\`\`typescript
// src/services/userService.test.ts
import {
  validateEmail,
  validateName,
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  clearUsers
} from './userService';

describe('UserService', () => {
  beforeEach(() => {
    clearUsers();
  });

  describe('validateEmail', () => {
    it('acepta emails validos', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.org')).toBe(true);
    });

    it('rechaza emails invalidos', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('no@domain')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('acepta nombres validos', () => {
      expect(validateName('Juan')).toBe(true);
      expect(validateName('Ana Maria Lopez')).toBe(true);
    });

    it('rechaza nombres muy cortos', () => {
      expect(validateName('A')).toBe(false);
    });

    it('rechaza nombres muy largos', () => {
      expect(validateName('A'.repeat(51))).toBe(false);
    });
  });

  describe('createUser', () => {
    it('crea usuario con datos validos', () => {
      const user = createUser({
        name: 'Juan Perez',
        email: 'juan@example.com'
      });

      expect(user.id).toBeDefined();
      expect(user.name).toBe('Juan Perez');
      expect(user.email).toBe('juan@example.com');
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('normaliza el email a minusculas', () => {
      const user = createUser({
        name: 'Test User',
        email: 'TEST@EXAMPLE.COM'
      });

      expect(user.email).toBe('test@example.com');
    });

    it('lanza error con email invalido', () => {
      expect(() => createUser({
        name: 'Test',
        email: 'invalid'
      })).toThrow('Email invalido');
    });

    it('lanza error con nombre invalido', () => {
      expect(() => createUser({
        name: 'A',
        email: 'test@example.com'
      })).toThrow('Nombre debe tener entre 2 y 50 caracteres');
    });

    it('lanza error si email ya existe', () => {
      createUser({ name: 'User 1', email: 'test@example.com' });

      expect(() => createUser({
        name: 'User 2',
        email: 'test@example.com'
      })).toThrow('Email ya existe');
    });
  });

  describe('getUser', () => {
    it('retorna usuario existente', () => {
      const created = createUser({
        name: 'Test',
        email: 'test@example.com'
      });

      const found = getUser(created.id);
      expect(found).toEqual(created);
    });

    it('retorna undefined para usuario inexistente', () => {
      expect(getUser('nonexistent-id')).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    it('retorna array vacio sin usuarios', () => {
      expect(getAllUsers()).toEqual([]);
    });

    it('retorna todos los usuarios', () => {
      createUser({ name: 'User 1', email: 'user1@example.com' });
      createUser({ name: 'User 2', email: 'user2@example.com' });

      const users = getAllUsers();
      expect(users).toHaveLength(2);
    });
  });

  describe('deleteUser', () => {
    it('elimina usuario existente', () => {
      const user = createUser({
        name: 'Test',
        email: 'test@example.com'
      });

      expect(deleteUser(user.id)).toBe(true);
      expect(getUser(user.id)).toBeUndefined();
    });

    it('retorna false para usuario inexistente', () => {
      expect(deleteUser('nonexistent-id')).toBe(false);
    });
  });
});
\`\`\`

---

## Paso 6: Tests de integracion con Supertest

\`\`\`bash
npm install -D supertest @types/supertest
\`\`\`

\`\`\`typescript
// src/app.test.ts
import request from 'supertest';
import { app } from './app';
import { clearUsers } from './services/userService';

describe('Users API', () => {
  beforeEach(() => {
    clearUsers();
  });

  describe('GET /health', () => {
    it('retorna status ok', async () => {
      const res = await request(app).get('/health');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /api/users', () => {
    it('crea usuario con datos validos', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Juan Perez', email: 'juan@example.com' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        name: 'Juan Perez',
        email: 'juan@example.com'
      });
      expect(res.body.id).toBeDefined();
    });

    it('retorna 400 con email invalido', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Test', email: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email invalido');
    });

    it('retorna 400 si email duplicado', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'User 1', email: 'test@example.com' });

      const res = await request(app)
        .post('/api/users')
        .send({ name: 'User 2', email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email ya existe');
    });
  });

  describe('GET /api/users', () => {
    it('retorna lista vacia inicialmente', async () => {
      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('retorna usuarios creados', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'User 1', email: 'user1@example.com' });
      await request(app)
        .post('/api/users')
        .send({ name: 'User 2', email: 'user2@example.com' });

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /api/users/:id', () => {
    it('retorna usuario existente', async () => {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@example.com' });

      const res = await request(app)
        .get(\`/api/users/\${createRes.body.id}\`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test User');
    });

    it('retorna 404 para usuario inexistente', async () => {
      const res = await request(app)
        .get('/api/users/nonexistent-id');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Usuario no encontrado');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('elimina usuario existente', async () => {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'Test', email: 'test@example.com' });

      const res = await request(app)
        .delete(\`/api/users/\${createRes.body.id}\`);

      expect(res.status).toBe(204);

      // Verificar que fue eliminado
      const getRes = await request(app)
        .get(\`/api/users/\${createRes.body.id}\`);
      expect(getRes.status).toBe(404);
    });

    it('retorna 404 para usuario inexistente', async () => {
      const res = await request(app)
        .delete('/api/users/nonexistent-id');

      expect(res.status).toBe(404);
    });
  });
});
\`\`\`

---

## Paso 7: Tests de base de datos con Testcontainers

\`\`\`bash
npm install -D testcontainers @testcontainers/postgresql pg @types/pg
\`\`\`

\`\`\`typescript
// src/database/db.integration.test.ts
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';

describe('Database Integration', () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;

  beforeAll(async () => {
    // Inicia un contenedor PostgreSQL real
    container = await new PostgreSqlContainer()
      .withDatabase('testdb')
      .withUsername('testuser')
      .withPassword('testpass')
      .start();

    pool = new Pool({
      connectionString: container.getConnectionUri()
    });

    // Crear tabla
    await pool.query(\`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    \`);
  }, 60000); // Timeout de 60s para descargar imagen

  afterAll(async () => {
    await pool.end();
    await container.stop();
  });

  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  it('inserta y recupera usuario', async () => {
    const insertResult = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      ['Juan Perez', 'juan@example.com']
    );

    expect(insertResult.rows[0].name).toBe('Juan Perez');
    expect(insertResult.rows[0].email).toBe('juan@example.com');

    const selectResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      ['juan@example.com']
    );

    expect(selectResult.rows).toHaveLength(1);
  });

  it('rechaza emails duplicados', async () => {
    await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      ['User 1', 'test@example.com']
    );

    await expect(
      pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)',
        ['User 2', 'test@example.com']
      )
    ).rejects.toThrow(/unique constraint/i);
  });

  it('genera UUID automaticamente', async () => {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
      ['Test', 'test@example.com']
    );

    expect(result.rows[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });
});
\`\`\`

---

## Paso 8: Crear componente React

Crea el frontend en una carpeta separada:

\`\`\`bash
mkdir -p client/src
cd client
npm init -y
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
\`\`\`

\`\`\`typescript
// client/src/components/UserForm.tsx
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  onUserCreated: (user: User) => void;
}

export function UserForm({ onUserCreated }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear usuario');
      }

      onUserCreated(data);
      setName('');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
        />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Usuario'}
      </button>
    </form>
  );
}
\`\`\`

---

## Paso 9: Tests de componentes con Testing Library

\`\`\`bash
cd client
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
\`\`\`

\`\`\`typescript
// client/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true
  }
});
\`\`\`

\`\`\`typescript
// client/src/test/setup.ts
import '@testing-library/jest-dom';
\`\`\`

\`\`\`typescript
// client/src/components/UserForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  const mockOnUserCreated = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  it('renderiza el formulario correctamente', () => {
    render(<UserForm onUserCreated={mockOnUserCreated} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear usuario/i })).toBeInTheDocument();
  });

  it('permite escribir en los campos', async () => {
    const user = userEvent.setup();
    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Perez');
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com');

    expect(screen.getByLabelText(/nombre/i)).toHaveValue('Juan Perez');
    expect(screen.getByLabelText(/email/i)).toHaveValue('juan@example.com');
  });

  it('envia formulario y llama callback con usuario creado', async () => {
    const user = userEvent.setup();
    const mockUser = { id: '123', name: 'Juan', email: 'juan@example.com' };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });

    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan');
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com');
    await user.click(screen.getByRole('button', { name: /crear usuario/i }));

    await waitFor(() => {
      expect(mockOnUserCreated).toHaveBeenCalledWith(mockUser);
    });

    // Verifica que los campos se limpiaron
    expect(screen.getByLabelText(/nombre/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
  });

  it('muestra error del servidor', async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email ya existe' })
    });

    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Email ya existe');
    });

    expect(mockOnUserCreated).not.toHaveBeenCalled();
  });

  it('deshabilita boton mientras carga', async () => {
    const user = userEvent.setup();

    let resolvePromise: any;
    (global.fetch as any).mockImplementationOnce(
      () => new Promise((resolve) => { resolvePromise = resolve; })
    );

    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Creando...');

    // Resolver la promesa para limpiar
    resolvePromise({ ok: true, json: async () => ({ id: '1' }) });
  });
});
\`\`\`

---

## Paso 10: Tests E2E con Playwright

\`\`\`bash
npm install -D @playwright/test
npx playwright install
\`\`\`

\`\`\`typescript
// e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('puede crear un nuevo usuario', async ({ page }) => {
    // Llenar formulario
    await page.getByLabel(/nombre/i).fill('Juan Perez');
    await page.getByLabel(/email/i).fill('juan@example.com');

    // Enviar
    await page.getByRole('button', { name: /crear usuario/i }).click();

    // Verificar que aparece en la lista
    await expect(page.getByText('Juan Perez')).toBeVisible();
    await expect(page.getByText('juan@example.com')).toBeVisible();
  });

  test('muestra error con email duplicado', async ({ page }) => {
    // Crear primer usuario
    await page.getByLabel(/nombre/i).fill('User 1');
    await page.getByLabel(/email/i).fill('duplicate@example.com');
    await page.getByRole('button', { name: /crear usuario/i }).click();

    // Esperar que se cree
    await expect(page.getByText('User 1')).toBeVisible();

    // Intentar crear con mismo email
    await page.getByLabel(/nombre/i).fill('User 2');
    await page.getByLabel(/email/i).fill('duplicate@example.com');
    await page.getByRole('button', { name: /crear usuario/i }).click();

    // Verificar error
    await expect(page.getByRole('alert')).toContainText(/ya existe/i);
  });

  test('valida campos requeridos', async ({ page }) => {
    // Intentar enviar sin datos
    await page.getByRole('button', { name: /crear usuario/i }).click();

    // Verificar validacion HTML5
    const nameInput = page.getByLabel(/nombre/i);
    await expect(nameInput).toHaveAttribute('required');
  });

  test('puede eliminar usuario', async ({ page }) => {
    // Crear usuario
    await page.getByLabel(/nombre/i).fill('Delete Me');
    await page.getByLabel(/email/i).fill('delete@example.com');
    await page.getByRole('button', { name: /crear usuario/i }).click();

    await expect(page.getByText('Delete Me')).toBeVisible();

    // Eliminar
    await page.getByRole('button', { name: /eliminar/i }).first().click();

    // Verificar que desaparecio
    await expect(page.getByText('Delete Me')).not.toBeVisible();
  });
});
\`\`\`

\`\`\`typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 2,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run dev:server',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev:client',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
\`\`\`

---

## Paso 11: Configurar scripts de test

\`\`\`json
// package.json
{
  "scripts": {
    "dev:server": "nodemon --exec ts-node src/server.ts",
    "dev:client": "cd client && npm run dev",
    "build": "tsc",

    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",

    "test:integration": "jest --testPathPattern=integration",

    "test:client": "cd client && npm run test",

    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",

    "test:all": "npm run test:coverage && npm run test:client && npm run test:e2e"
  }
}
\`\`\`

---

## Paso 12: Ejecutar y ver cobertura

\`\`\`bash
# Tests unitarios + integracion con cobertura
npm run test:coverage
\`\`\`

Veras un reporte asi:

\`\`\`
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   92.45 |    85.71 |   91.67 |   92.16 |
 services           |         |          |         |         |
  userService.ts    |   95.24 |    90.00 |   100.0 |   95.00 |
 app.ts             |   89.47 |    80.00 |   83.33 |   89.19 |
--------------------|---------|----------|---------|---------|

Test Suites: 3 passed, 3 total
Tests:       24 passed, 24 total
\`\`\`

\`\`\`bash
# Tests E2E
npm run test:e2e
\`\`\`

\`\`\`
Running 4 tests using 2 workers
  4 passed (12.3s)

To open last HTML report run:
  npx playwright show-report
\`\`\`

---

## Piramide de testing

| Nivel | Herramienta | Que prueba | Velocidad |
|-------|-------------|------------|-----------|
| **Unitarios** | Jest | Logica aislada | Rapido |
| **Integracion** | Supertest | Endpoints HTTP | Medio |
| **Base de datos** | Testcontainers | Queries reales | Lento |
| **Componentes** | Testing Library | UI aislada | Rapido |
| **E2E** | Playwright | Flujos completos | Lento |

---

## Siguiente paso

-> [CI/CD con GitHub Actions](/es/cooking/github-actions) para correr tus tests en cada push
    `,
    contentEn: `
## What you'll build

A fully tested fullstack application: a REST API with Express and a React frontend, with tests at every level of the testing pyramid.
You'll write unit tests with Jest for business logic, integration tests with Supertest for endpoints, database tests with Testcontainers, React component tests with Testing Library, and end-to-end tests with Playwright.
When finished, you'll have a complete test suite with coverage reporting that gives you confidence to make changes without breaking anything.

---

## Step 1: Create the project

\`\`\`bash
mkdir fullstack-testing && cd fullstack-testing
npm init -y
\`\`\`

Install backend dependencies:

\`\`\`bash
npm install express cors
npm install -D typescript @types/node @types/express ts-node nodemon
\`\`\`

---

## Step 2: Configure TypeScript

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
\`\`\`

---

## Step 3: Create business logic

\`\`\`typescript
// src/services/userService.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
}

// Simulate an in-memory database
const users: Map<string, User> = new Map();

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

export function validateName(name: string): boolean {
  return name.length >= 2 && name.length <= 50;
}

export function createUser(data: CreateUserDTO): User {
  if (!validateEmail(data.email)) {
    throw new Error('Invalid email');
  }
  if (!validateName(data.name)) {
    throw new Error('Name must be between 2 and 50 characters');
  }

  // Check unique email
  for (const user of users.values()) {
    if (user.email === data.email) {
      throw new Error('Email already exists');
    }
  }

  const user: User = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.toLowerCase(),
    createdAt: new Date()
  };

  users.set(user.id, user);
  return user;
}

export function getUser(id: string): User | undefined {
  return users.get(id);
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}

export function deleteUser(id: string): boolean {
  return users.delete(id);
}

export function clearUsers(): void {
  users.clear();
}
\`\`\`

---

## Step 4: Create the REST API

\`\`\`typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import * as userService from './services/userService';

const app = express();

app.use(cors());
app.use(express.json());

// GET /api/users - List users
app.get('/api/users', (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
});

// GET /api/users/:id - Get user
app.get('/api/users/:id', (req, res) => {
  const user = userService.getUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /api/users - Create user
app.post('/api/users', (req, res) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  const deleted = userService.deleteUser(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export { app };
\`\`\`

\`\`\`typescript
// src/server.ts
import { app } from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
\`\`\`

---

## Step 5: Unit tests with Jest

\`\`\`bash
npm install -D jest @types/jest ts-jest
\`\`\`

\`\`\`javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
\`\`\`

\`\`\`typescript
// src/services/userService.test.ts
import {
  validateEmail,
  validateName,
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  clearUsers
} from './userService';

describe('UserService', () => {
  beforeEach(() => {
    clearUsers();
  });

  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.org')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('no@domain')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('accepts valid names', () => {
      expect(validateName('John')).toBe(true);
      expect(validateName('Jane Mary Smith')).toBe(true);
    });

    it('rejects names too short', () => {
      expect(validateName('A')).toBe(false);
    });

    it('rejects names too long', () => {
      expect(validateName('A'.repeat(51))).toBe(false);
    });
  });

  describe('createUser', () => {
    it('creates user with valid data', () => {
      const user = createUser({
        name: 'John Doe',
        email: 'john@example.com'
      });

      expect(user.id).toBeDefined();
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('normalizes email to lowercase', () => {
      const user = createUser({
        name: 'Test User',
        email: 'TEST@EXAMPLE.COM'
      });

      expect(user.email).toBe('test@example.com');
    });

    it('throws error with invalid email', () => {
      expect(() => createUser({
        name: 'Test',
        email: 'invalid'
      })).toThrow('Invalid email');
    });

    it('throws error with invalid name', () => {
      expect(() => createUser({
        name: 'A',
        email: 'test@example.com'
      })).toThrow('Name must be between 2 and 50 characters');
    });

    it('throws error if email already exists', () => {
      createUser({ name: 'User 1', email: 'test@example.com' });

      expect(() => createUser({
        name: 'User 2',
        email: 'test@example.com'
      })).toThrow('Email already exists');
    });
  });

  describe('getUser', () => {
    it('returns existing user', () => {
      const created = createUser({
        name: 'Test',
        email: 'test@example.com'
      });

      const found = getUser(created.id);
      expect(found).toEqual(created);
    });

    it('returns undefined for non-existent user', () => {
      expect(getUser('nonexistent-id')).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    it('returns empty array without users', () => {
      expect(getAllUsers()).toEqual([]);
    });

    it('returns all users', () => {
      createUser({ name: 'User 1', email: 'user1@example.com' });
      createUser({ name: 'User 2', email: 'user2@example.com' });

      const users = getAllUsers();
      expect(users).toHaveLength(2);
    });
  });

  describe('deleteUser', () => {
    it('deletes existing user', () => {
      const user = createUser({
        name: 'Test',
        email: 'test@example.com'
      });

      expect(deleteUser(user.id)).toBe(true);
      expect(getUser(user.id)).toBeUndefined();
    });

    it('returns false for non-existent user', () => {
      expect(deleteUser('nonexistent-id')).toBe(false);
    });
  });
});
\`\`\`

---

## Step 6: Integration tests with Supertest

\`\`\`bash
npm install -D supertest @types/supertest
\`\`\`

\`\`\`typescript
// src/app.test.ts
import request from 'supertest';
import { app } from './app';
import { clearUsers } from './services/userService';

describe('Users API', () => {
  beforeEach(() => {
    clearUsers();
  });

  describe('GET /health', () => {
    it('returns ok status', async () => {
      const res = await request(app).get('/health');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /api/users', () => {
    it('creates user with valid data', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com'
      });
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 with invalid email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Test', email: 'invalid' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid email');
    });

    it('returns 400 for duplicate email', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'User 1', email: 'test@example.com' });

      const res = await request(app)
        .post('/api/users')
        .send({ name: 'User 2', email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email already exists');
    });
  });

  describe('GET /api/users', () => {
    it('returns empty list initially', async () => {
      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns created users', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'User 1', email: 'user1@example.com' });
      await request(app)
        .post('/api/users')
        .send({ name: 'User 2', email: 'user2@example.com' });

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /api/users/:id', () => {
    it('returns existing user', async () => {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@example.com' });

      const res = await request(app)
        .get(\`/api/users/\${createRes.body.id}\`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test User');
    });

    it('returns 404 for non-existent user', async () => {
      const res = await request(app)
        .get('/api/users/nonexistent-id');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('deletes existing user', async () => {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'Test', email: 'test@example.com' });

      const res = await request(app)
        .delete(\`/api/users/\${createRes.body.id}\`);

      expect(res.status).toBe(204);

      // Verify it was deleted
      const getRes = await request(app)
        .get(\`/api/users/\${createRes.body.id}\`);
      expect(getRes.status).toBe(404);
    });

    it('returns 404 for non-existent user', async () => {
      const res = await request(app)
        .delete('/api/users/nonexistent-id');

      expect(res.status).toBe(404);
    });
  });
});
\`\`\`

---

## Step 7: Database tests with Testcontainers

\`\`\`bash
npm install -D testcontainers @testcontainers/postgresql pg @types/pg
\`\`\`

\`\`\`typescript
// src/database/db.integration.test.ts
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';

describe('Database Integration', () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;

  beforeAll(async () => {
    // Start a real PostgreSQL container
    container = await new PostgreSqlContainer()
      .withDatabase('testdb')
      .withUsername('testuser')
      .withPassword('testpass')
      .start();

    pool = new Pool({
      connectionString: container.getConnectionUri()
    });

    // Create table
    await pool.query(\`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    \`);
  }, 60000); // 60s timeout to download image

  afterAll(async () => {
    await pool.end();
    await container.stop();
  });

  beforeEach(async () => {
    await pool.query('DELETE FROM users');
  });

  it('inserts and retrieves user', async () => {
    const insertResult = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      ['John Doe', 'john@example.com']
    );

    expect(insertResult.rows[0].name).toBe('John Doe');
    expect(insertResult.rows[0].email).toBe('john@example.com');

    const selectResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      ['john@example.com']
    );

    expect(selectResult.rows).toHaveLength(1);
  });

  it('rejects duplicate emails', async () => {
    await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      ['User 1', 'test@example.com']
    );

    await expect(
      pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)',
        ['User 2', 'test@example.com']
      )
    ).rejects.toThrow(/unique constraint/i);
  });

  it('generates UUID automatically', async () => {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
      ['Test', 'test@example.com']
    );

    expect(result.rows[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });
});
\`\`\`

---

## Step 8: Create React component

Create the frontend in a separate folder:

\`\`\`bash
mkdir -p client/src
cd client
npm init -y
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
\`\`\`

\`\`\`typescript
// client/src/components/UserForm.tsx
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  onUserCreated: (user: User) => void;
}

export function UserForm({ onUserCreated }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error creating user');
      }

      onUserCreated(data);
      setName('');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
        />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
\`\`\`

---

## Step 9: Component tests with Testing Library

\`\`\`bash
cd client
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
\`\`\`

\`\`\`typescript
// client/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true
  }
});
\`\`\`

\`\`\`typescript
// client/src/test/setup.ts
import '@testing-library/jest-dom';
\`\`\`

\`\`\`typescript
// client/src/components/UserForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  const mockOnUserCreated = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  it('renders the form correctly', () => {
    render(<UserForm onUserCreated={mockOnUserCreated} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create user/i })).toBeInTheDocument();
  });

  it('allows typing in fields', async () => {
    const user = userEvent.setup();
    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
  });

  it('submits form and calls callback with created user', async () => {
    const user = userEvent.setup();
    const mockUser = { id: '123', name: 'John', email: 'john@example.com' };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    });

    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /create user/i }));

    await waitFor(() => {
      expect(mockOnUserCreated).toHaveBeenCalledWith(mockUser);
    });

    // Verify fields were cleared
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
  });

  it('shows server error', async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email already exists' })
    });

    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/name/i), 'Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Email already exists');
    });

    expect(mockOnUserCreated).not.toHaveBeenCalled();
  });

  it('disables button while loading', async () => {
    const user = userEvent.setup();

    let resolvePromise: any;
    (global.fetch as any).mockImplementationOnce(
      () => new Promise((resolve) => { resolvePromise = resolve; })
    );

    render(<UserForm onUserCreated={mockOnUserCreated} />);

    await user.type(screen.getByLabelText(/name/i), 'Test');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Creating...');

    // Resolve promise to cleanup
    resolvePromise({ ok: true, json: async () => ({ id: '1' }) });
  });
});
\`\`\`

---

## Step 10: E2E tests with Playwright

\`\`\`bash
npm install -D @playwright/test
npx playwright install
\`\`\`

\`\`\`typescript
// e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('can create a new user', async ({ page }) => {
    // Fill form
    await page.getByLabel(/name/i).fill('John Doe');
    await page.getByLabel(/email/i).fill('john@example.com');

    // Submit
    await page.getByRole('button', { name: /create user/i }).click();

    // Verify it appears in the list
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john@example.com')).toBeVisible();
  });

  test('shows error with duplicate email', async ({ page }) => {
    // Create first user
    await page.getByLabel(/name/i).fill('User 1');
    await page.getByLabel(/email/i).fill('duplicate@example.com');
    await page.getByRole('button', { name: /create user/i }).click();

    // Wait for creation
    await expect(page.getByText('User 1')).toBeVisible();

    // Try to create with same email
    await page.getByLabel(/name/i).fill('User 2');
    await page.getByLabel(/email/i).fill('duplicate@example.com');
    await page.getByRole('button', { name: /create user/i }).click();

    // Verify error
    await expect(page.getByRole('alert')).toContainText(/already exists/i);
  });

  test('validates required fields', async ({ page }) => {
    // Try to submit without data
    await page.getByRole('button', { name: /create user/i }).click();

    // Verify HTML5 validation
    const nameInput = page.getByLabel(/name/i);
    await expect(nameInput).toHaveAttribute('required');
  });

  test('can delete user', async ({ page }) => {
    // Create user
    await page.getByLabel(/name/i).fill('Delete Me');
    await page.getByLabel(/email/i).fill('delete@example.com');
    await page.getByRole('button', { name: /create user/i }).click();

    await expect(page.getByText('Delete Me')).toBeVisible();

    // Delete
    await page.getByRole('button', { name: /delete/i }).first().click();

    // Verify it disappeared
    await expect(page.getByText('Delete Me')).not.toBeVisible();
  });
});
\`\`\`

\`\`\`typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 2,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run dev:server',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev:client',
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
\`\`\`

---

## Step 11: Configure test scripts

\`\`\`json
// package.json
{
  "scripts": {
    "dev:server": "nodemon --exec ts-node src/server.ts",
    "dev:client": "cd client && npm run dev",
    "build": "tsc",

    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",

    "test:integration": "jest --testPathPattern=integration",

    "test:client": "cd client && npm run test",

    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",

    "test:all": "npm run test:coverage && npm run test:client && npm run test:e2e"
  }
}
\`\`\`

---

## Step 12: Run and view coverage

\`\`\`bash
# Unit + integration tests with coverage
npm run test:coverage
\`\`\`

You'll see a report like this:

\`\`\`
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   92.45 |    85.71 |   91.67 |   92.16 |
 services           |         |          |         |         |
  userService.ts    |   95.24 |    90.00 |   100.0 |   95.00 |
 app.ts             |   89.47 |    80.00 |   83.33 |   89.19 |
--------------------|---------|----------|---------|---------|

Test Suites: 3 passed, 3 total
Tests:       24 passed, 24 total
\`\`\`

\`\`\`bash
# E2E tests
npm run test:e2e
\`\`\`

\`\`\`
Running 4 tests using 2 workers
  4 passed (12.3s)

To open last HTML report run:
  npx playwright show-report
\`\`\`

---

## Testing pyramid

| Level | Tool | What it tests | Speed |
|-------|------|--------------|-------|
| **Unit** | Jest | Isolated logic | Fast |
| **Integration** | Supertest | HTTP endpoints | Medium |
| **Database** | Testcontainers | Real queries | Slow |
| **Component** | Testing Library | Isolated UI | Fast |
| **E2E** | Playwright | Complete flows | Slow |

---

## Next step

-> [CI/CD with GitHub Actions](/en/cooking/github-actions) to run your tests on every push
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
## What you'll build

Your own MCP (Model Context Protocol) server that gives custom tools to Claude Desktop.

Imagine Claude being able to check the weather, save notes, or access your database. MCP is the standard for extending Claude's capabilities. Your server exposes "tools" that Claude can call during a conversation.

When finished, you'll have an MCP server in TypeScript that works with Claude Desktop. You can add any tool: external APIs, databases, file system, whatever you need.

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
## Lo que vas a construir

Un agente de IA autonomo que razona, decide que herramientas usar, y completa tareas por si mismo.

Le das una tarea como "investiga cuanto cuesta un vuelo a Tokio y guardalo en un archivo", y el agente piensa paso a paso: primero busca en web, luego calcula fechas, finalmente escribe el archivo. Sin que le digas como hacerlo.

Al terminar tendras un agente en Python usando el patron ReAct (Reasoning + Acting) con Gemini. Podras darle herramientas (busqueda web, calculadora, archivos) y pedirle tareas complejas que resuelve de forma autonoma.

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
## What you'll build

An autonomous AI agent that reasons, decides which tools to use, and completes tasks by itself.

You give it a task like "research how much a flight to Tokyo costs and save it to a file", and the agent thinks step by step: first searches the web, then calculates dates, finally writes the file. Without you telling it how to do it.

When finished, you'll have an agent in Python using the ReAct pattern (Reasoning + Acting) with Gemini. You can give it tools (web search, calculator, files) and ask it complex tasks that it solves autonomously.

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
## Lo que vas a construir

Un clasificador de imagenes que analiza fotos y las categoriza automaticamente usando IA multimodal.

Le pasas una imagen (desde archivo o URL) y te dice que es: "gato, 95% confianza, gato atigrado durmiendo en un sofa". Puedes definir tus propias categorias para clasificar productos, documentos, o lo que necesites.

Al terminar tendras un script en Python que usa Gemini Vision para analizar imagenes. Devuelve la categoria, nivel de confianza, y una descripcion. Util para organizar fotos, moderar contenido, o automatizar inventario.

---

## El prompt para empezar

> Crea un clasificador de imagenes en Python que:
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
## What you'll build

An image classifier that analyzes photos and categorizes them automatically using multimodal AI.

You pass it an image (from file or URL) and it tells you what it is: "cat, 95% confidence, tabby cat sleeping on a sofa". You can define your own categories to classify products, documents, or whatever you need.

When finished, you'll have a Python script that uses Gemini Vision to analyze images. It returns the category, confidence level, and a description. Useful for organizing photos, moderating content, or automating inventory.

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
## Lo que vas a construir

Un asistente de voz que escucha lo que dices, entiende tu pregunta, y te responde hablando. Como Alexa o Siri, pero tuyo.

Hablas al microfono: "Que tiempo hace hoy?". El asistente convierte tu voz a texto, lo envia a Gemini para obtener una respuesta inteligente, y te lee la respuesta en voz alta. Todo en un loop continuo de conversacion.

Al terminar tendras un asistente de voz en Python que usa speech_recognition para escuchar, Gemini para pensar, y gTTS para hablar. Personalizable para cualquier caso de uso: domotica, accesibilidad, o productividad.

---

## El prompt para empezar

> Crea un asistente de voz en Python que:
> 1. Escuche del microfono con speech_recognition
> 2. Convierta voz a texto
> 3. Envie a Gemini para procesar
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
## What you'll build

A voice assistant that listens to what you say, understands your question, and responds by speaking. Like Alexa or Siri, but yours.

You speak into the microphone: "What's the weather today?". The assistant converts your voice to text, sends it to Gemini to get an intelligent response, and reads the answer out loud. All in a continuous conversation loop.

When finished, you'll have a voice assistant in Python that uses speech_recognition to listen, Gemini to think, and gTTS to speak. Customizable for any use case: home automation, accessibility, or productivity.

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
## Lo que vas a construir

Una aplicacion web que entiende texto, imagenes, y audio. Todo en una sola interfaz con IA.

Escribes una pregunta, subes una foto, o grabas un audio, y la IA entiende y responde. Puedes preguntarle "que hay en esta imagen?", subir un PDF y pedir un resumen, o grabar tu voz para hacer preguntas.

Al terminar tendras una app con Streamlit que usa Gemini para procesar multiples tipos de entrada. Con historial de conversacion y una interfaz limpia que puedes desplegar en minutos.

---

## El prompt para empezar

> Crea una app Streamlit multimodal que:
> 1. Acepte texto, imagen o audio como input
> 2. Use Gemini para procesar todos los tipos
> 3. Muestre respuesta formateada
> 4. Guarde historial de conversacion

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
## What you'll build

A web application that understands text, images, and audio. All in one interface with AI.

You type a question, upload a photo, or record audio, and the AI understands and responds. You can ask "what's in this image?", upload a PDF and request a summary, or record your voice to ask questions.

When finished, you'll have an app with Streamlit that uses Gemini to process multiple input types. With conversation history and a clean interface you can deploy in minutes.

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
## Lo que vas a construir

Tu propio modelo de IA entrenado con TUS datos para tareas especificas de tu negocio.

Tienes un chatbot de soporte? Entrenalo con las 100 preguntas mas frecuentes y sus respuestas ideales. El modelo aprende tu tono, tu estilo, y responde como si fueras tu. Mismo proceso para clasificacion de tickets, generacion de contenido, o cualquier tarea repetitiva.

Al terminar sabras como preparar un dataset en formato JSONL, subirlo a Google AI Studio, configurar el entrenamiento, y usar tu modelo personalizado. El modelo responde en tu estilo, con tu conocimiento especifico.

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
## What you'll build

Your own AI model trained with YOUR data for specific tasks in your business.

Have a support chatbot? Train it with the 100 most frequent questions and their ideal answers. The model learns your tone, your style, and responds as if it were you. Same process for ticket classification, content generation, or any repetitive task.

When finished, you'll know how to prepare a dataset in JSONL format, upload it to Google AI Studio, configure the training, and use your custom model. The model responds in your style, with your specific knowledge.

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
## Lo que vas a construir

Un sistema de code review automatizado que analiza pull requests y sugiere mejoras usando IA.

Cada vez que alguien hace un PR, la IA revisa el diff completo. Detecta bugs potenciales, vulnerabilidades de seguridad, codigo duplicado, y oportunidades de refactoring. Genera un reporte con score de calidad y comentarios especificos por linea.

Al terminar tendras un script que obtiene el diff de GitHub, lo envia a Gemini para analisis, y genera un reporte detallado. Puedes integrarlo con GitHub Actions para que corra automaticamente en cada PR.

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
## What you'll build

An automated code review system that analyzes pull requests and suggests improvements using AI.

Every time someone makes a PR, the AI reviews the complete diff. It detects potential bugs, security vulnerabilities, duplicate code, and refactoring opportunities. It generates a report with a quality score and specific comments per line.

When finished, you'll have a script that gets the diff from GitHub, sends it to Gemini for analysis, and generates a detailed report. You can integrate it with GitHub Actions to run automatically on each PR.

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
## Lo que vas a construir

Un SaaS completo con todo lo que necesitas para lanzar: autenticacion, pagos con suscripciones, y una feature de IA.

Usuarios se registran con Google, pagan una suscripcion mensual con Stripe, y acceden a funcionalidades de IA (chat, analisis, o generacion de contenido). Base de datos PostgreSQL, cache con Redis, y deploy listo con Docker.

Al terminar tendras la arquitectura completa de un SaaS moderno. Desde el login hasta el cobro mensual, con una funcionalidad de IA que diferencia tu producto. Es el proyecto que integra todo lo que aprendiste en los niveles anteriores.

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
## What you'll build

A complete SaaS with everything you need to launch: authentication, subscription payments, and an AI feature.

Users register with Google, pay a monthly subscription with Stripe, and access AI functionalities (chat, analysis, or content generation). PostgreSQL database, Redis cache, and deploy-ready with Docker.

When finished, you'll have the complete architecture of a modern SaaS. From login to monthly billing, with an AI functionality that differentiates your product. It's the project that integrates everything you learned in the previous levels.

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
