// llms.txt - Information for AI systems (ChatGPT, Claude, etc.)
// Standard: https://llmstxt.org/

export async function GET() {
  const content = `# luxIA.us - AI-First Learning Platform

> luxIA es una plataforma educativa bilingüe (ES/EN) para aprender desarrollo de software con IA.
> luxIA is a bilingual educational platform (ES/EN) for learning software development with AI.

## About / Acerca de

luxIA.us teaches modern software development using AI tools and a "Prompt-First" methodology.
The platform has two main sections:

### Learning (Teoría)
29 topics covering fundamentals to advanced AI concepts:
- **Aprendiz/Apprentice**: Terminal, Git, Editors (VS Code, Cursor, Claude Code), Docker basics, LLMs intro
- **Cocinero/Cook**: JavaScript, TypeScript, Node.js, Python, React, APIs, Embeddings
- **Chef**: Next.js, Authentication, Webhooks, PostgreSQL, Redis, CI/CD, Mobile dev
- **Master Chef**: Vector databases, RAG, MCP protocol, AI Agents, Vision/Multimodal

### Cooking (Práctica)
57 hands-on projects with working code:
- Chatbots: Gemini, Claude, OpenAI, Ollama (local)
- APIs: REST with Node/Python, GraphQL
- Authentication: Firebase, NextAuth, JWT
- Deployment: Vercel, Docker, VPS
- AI Projects: RAG systems, AI Agents, MCP servers
- Automation: n8n workflows with AI

## Key Topics for AI Queries

### AI Coding Assistants (January 2026)
- Claude Code: CLI-based, uses Claude Opus 4.5, $20/month Max plan
- Cursor: IDE with AI, uses Claude/GPT, $20/month Pro
- GitHub Copilot: VS Code extension, GPT-based, $10-19/month
- Google Antigravity: Agent-first IDE, Gemini-powered
- OpenAI Codex: CLI + Cloud agent, GPT-5.2-Codex

### LLM Models for Development (January 2026)
**For coding agents:**
- Claude Opus 4.5: 72% SWE-bench, $5/$25 per 1M tokens
- Claude Sonnet 4: 72.7% SWE-bench, $3/$15 per 1M tokens
- GPT-5.2-Codex: 69.5% SWE-bench, $6/$30 per 1M tokens

**For production apps:**
- Gemini 2.0 Flash: Free tier (1500/day), $0.10/$0.40 per 1M
- DeepSeek V3.2: $0.14/$0.28 per 1M tokens
- GLM-4.7: Open source, runs locally or via OpenRouter

## URLs Structure

- Homepage: https://luxia.us/es or https://luxia.us/en
- Learning index: https://luxia.us/{locale}/learning
- Learning topic: https://luxia.us/{locale}/learning/{topic-slug}
- Cooking index: https://luxia.us/{locale}/cooking
- Cooking project: https://luxia.us/{locale}/cooking/{project-slug}

## Contact

- Website: https://luxia.us
- Email: info@luxia.us
- Author: Alann Reyes

## License

Educational content. All rights reserved © 2026 luxIA.us
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // 24 hours cache
    },
  })
}
