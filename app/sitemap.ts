import { MetadataRoute } from 'next'

// Learning sections (38 temas)
const learningSections = [
  // Aprendiz
  'terminal', 'git', 'editors', 'homebrew', 'docker-intro', 'llms-intro', 'llms-models',
  // Cocinero
  'javascript', 'nodejs', 'python', 'html-css', 'react', 'apis', 'embeddings',
  // Chef
  'system-design', 'performance', 'networking', 'git-advanced', 'nextjs', 'auth', 'webhooks',
  'nestjs', 'postgresql', 'redis', 'docker-compose', 'docker-networks', 'docker-storage',
  'ssl-certificates', 'server-security', 'security', 'testing', 'observability', 'cicd', 'mobile', 'iot',
  // Master Chef
  'vector-db', 'rag', 'mcp', 'agents', 'vision'
]

// Cooking dishes (60 platillos)
const cookingDishes = [
  // Chatbots
  'chatbot-gemini', 'chatbot-claude', 'chatbot-openai', 'chatbot-ollama',
  // APIs
  'api-rest-node', 'api-rest-python', 'api-graphql',
  // Landing & Portfolio
  'landing-react', 'landing-nextjs', 'portfolio-dev',
  // Scraping & Extraction
  'scraper-basic', 'scraper-puppeteer', 'pdf-extractor',
  // Auth
  'auth-firebase', 'auth-nextauth', 'auth-jwt',
  // Deploy
  'deploy-vercel', 'deploy-docker', 'deploy-vps',
  // Databases
  'db-postgres', 'db-mongodb', 'db-redis',
  // Webhooks
  'webhook-stripe', 'webhook-github', 'webhook-whatsapp',
  // N8N
  'n8n-intro', 'n8n-openai', 'n8n-sheets',
  // RAG
  'rag-basic', 'rag-qdrant', 'rag-pinecone',
  // Agents
  'agent-langchain', 'agent-autogen', 'agent-crewai',
  // Vision
  'vision-ocr', 'vision-classify', 'vision-detect',
  // Voice
  'voice-whisper', 'voice-tts', 'voice-assistant',
  // Embeddings
  'embeddings-basic', 'embeddings-search', 'embeddings-recommendations',
  // Mobile
  'mobile-expo', 'mobile-react-native', 'mobile-pwa',
  // IoT
  'iot-arduino', 'iot-raspberry', 'iot-esp32',
  // MCP
  'mcp-server', 'mcp-tools', 'mcp-integration',
  // AI Tools
  'claude-code-intro', 'cursor-intro', 'copilot-intro',
  // Testing & CI/CD
  'testing-jest', 'testing-playwright', 'cicd-github-actions',
  // Ola 2: Architecture, Performance, Networking
  'architecture-workshop', 'performance-audit', 'network-debugging'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luxia.us'
  const lastModified = new Date()

  const routes: MetadataRoute.Sitemap = [
    // ===== PÁGINAS PRINCIPALES =====
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },

    // ===== SERVICES PAGE =====
    {
      url: `${baseUrl}/es/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== CASES INDEX =====
    {
      url: `${baseUrl}/es/cases`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/cases`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== LEARNING INDEX =====
    {
      url: `${baseUrl}/es/learning`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/learning`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ===== COOKING INDEX =====
    {
      url: `${baseUrl}/es/cooking`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/cooking`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // ===== LEARNING SECTIONS (29 x 2 idiomas = 58 URLs) =====
  learningSections.forEach(section => {
    routes.push({
      url: `${baseUrl}/es/learning/${section}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    routes.push({
      url: `${baseUrl}/en/learning/${section}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // ===== COOKING DISHES (57 x 2 idiomas = 114 URLs) =====
  cookingDishes.forEach(dish => {
    routes.push({
      url: `${baseUrl}/es/cooking/${dish}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    routes.push({
      url: `${baseUrl}/en/cooking/${dish}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return routes
}
