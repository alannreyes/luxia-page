import { the70PercentWall, type BlogPost } from './the-70-percent-wall'
import { theOtherSideOfTheWall } from './the-other-side-of-the-wall'
import { ambientAgents } from './ambient-agents'
import { llmAsValidator } from './llm-as-validator'

// Registro de artículos de /insights. Agregar un post nuevo = importarlo aquí y
// sumarlo al array (mismo criterio data-driven que `cases`/`capabilities`).
// Orden: más reciente primero.
export const posts: BlogPost[] = [ambientAgents, llmAsValidator, theOtherSideOfTheWall, the70PercentWall]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}

export type { BlogPost, BlogLocaleContent, BlogFaqItem, BlogSource } from './the-70-percent-wall'
