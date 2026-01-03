import { MetadataRoute } from 'next'

// Learning sections (29 temas)
const learningSections = [
  'terminal', 'git', 'editors', 'homebrew', 'docker-intro', 'llms-intro', 'llms-models',
  'javascript', 'nodejs', 'python', 'html-css', 'react', 'apis', 'embeddings',
  'nextjs', 'auth', 'webhooks', 'nestjs', 'postgresql', 'redis', 'docker-compose', 'cicd', 'mobile', 'iot',
  'vector-db', 'rag', 'mcp', 'agents', 'vision'
]

// Cooking dishes (57 platillos)
const cookingDishes = [
  'chatbot-gemini', 'chatbot-claude', 'chatbot-openai', 'chatbot-ollama',
  'api-rest-node', 'api-rest-python', 'api-graphql',
  'landing-react', 'landing-nextjs', 'portfolio-dev',
  'scraper-basic', 'scraper-puppeteer', 'pdf-extractor',
  'auth-firebase', 'auth-nextauth', 'auth-jwt',
  'deploy-vercel', 'deploy-docker', 'deploy-vps',
  'db-postgres', 'db-mongodb', 'db-redis',
  'webhook-stripe', 'webhook-github', 'webhook-whatsapp',
  'n8n-intro', 'n8n-openai', 'n8n-sheets',
  'rag-basic', 'rag-qdrant', 'rag-pinecone',
  'agent-langchain', 'agent-autogen', 'agent-crewai',
  'vision-ocr', 'vision-classify', 'vision-detect',
  'voice-whisper', 'voice-tts', 'voice-assistant',
  'embeddings-basic', 'embeddings-search', 'embeddings-recommendations',
  'mobile-expo', 'mobile-react-native', 'mobile-pwa',
  'iot-arduino', 'iot-raspberry', 'iot-esp32',
  'mcp-server', 'mcp-tools', 'mcp-integration',
  'claude-code-intro', 'cursor-intro', 'copilot-intro',
  'testing-jest', 'testing-playwright', 'cicd-github-actions'
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
