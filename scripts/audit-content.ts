#!/usr/bin/env npx tsx

// Script para auditar el contenido de Learning y Cooking
// Ejecutar: npx tsx scripts/audit-content.ts

import * as fs from 'fs'
import * as path from 'path'

const basePath = path.join(__dirname, '..')

// Leer archivos
const learningFile = fs.readFileSync(
  path.join(basePath, 'app/[locale]/learning/[section]/page.tsx'),
  'utf-8'
)
const cookingFile = fs.readFileSync(
  path.join(basePath, 'app/[locale]/cooking/[dish]/page.tsx'),
  'utf-8'
)

// Extraer slugs definidos en sections/dishes arrays
function extractSlugsFromArray(content: string, arrayName: string): { slug: string; level: string }[] {
  const regex = new RegExp(`slug:\\s*'([^']+)'.*?level:\\s*'([^']+)'`, 'gs')
  const matches: { slug: string; level: string }[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    matches.push({ slug: match[1], level: match[2] })
  }
  return matches
}

// Extraer slugs que tienen contenido (están en sectionsContent/dishesContent)
function extractContentKeys(content: string): Set<string> {
  const keys = new Set<string>()
  // Match patterns like 'slug-name': { or "slug-name": {
  const regex = /^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/gm
  let match
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[1])
  }
  // Also handle object pattern matching
  const contentRegex = /contentEs:\s*`/g
  const lines = content.split('\n')
  let currentSlug = ''
  for (const line of lines) {
    const slugMatch = line.match(/^\s*['"]([a-z0-9-]+)['"]\s*:\s*\{/)
    if (slugMatch) {
      currentSlug = slugMatch[1]
    }
    if (line.includes('contentEs:') && currentSlug) {
      keys.add(currentSlug)
    }
  }
  return keys
}

// Alias mapping for slug variations
const slugAliases: Record<string, string> = {
  'llms-intro': 'llms_intro',
}

// Check if slug has content - handles both quoted and unquoted keys
function hasContent(content: string, slug: string): boolean {
  const checkSlug = slugAliases[slug] || slug

  // Pattern 1: quoted key like 'slug': { ... contentEs:
  const quotedPattern = new RegExp(`['"]${checkSlug}['"]\\s*:\\s*\\{`, 's')
  // Pattern 2: unquoted key like slug: { ... contentEs:
  const unquotedPattern = new RegExp(`^\\s+${checkSlug}:\\s*\\{`, 'm')

  // Check if key exists and has contentEs
  if (quotedPattern.test(content) || unquotedPattern.test(content)) {
    // Find the position and check for contentEs within 500 chars
    const quotedMatch = content.match(new RegExp(`['"]${checkSlug}['"]\\s*:\\s*\\{`))
    const unquotedMatch = content.match(new RegExp(`^\\s+${checkSlug}:\\s*\\{`, 'm'))
    const match = quotedMatch || unquotedMatch
    if (match && match.index !== undefined) {
      const slice = content.slice(match.index, match.index + 500)
      return slice.includes('contentEs:')
    }
  }
  return false
}

console.log('=' .repeat(60))
console.log('AUDITORIA DE CONTENIDO - luxIA.us')
console.log('=' .repeat(60))

// Learning sections
const learningSections = extractSlugsFromArray(learningFile, 'sections')
console.log('\n📖 LEARNING SECTIONS:')
console.log('-'.repeat(40))

const levelCounts = { aprendiz: { total: 0, ready: 0 }, cocinero: { total: 0, ready: 0 }, chef: { total: 0, ready: 0 }, master: { total: 0, ready: 0 } }

for (const section of learningSections) {
  const hasContentFlag = hasContent(learningFile, section.slug)
  const status = hasContentFlag ? '✅' : '❌'
  const level = section.level as keyof typeof levelCounts
  if (levelCounts[level]) {
    levelCounts[level].total++
    if (hasContentFlag) levelCounts[level].ready++
  }
  console.log(`${status} [${section.level.padEnd(8)}] ${section.slug}`)
}

console.log('\n📊 RESUMEN LEARNING:')
for (const [level, counts] of Object.entries(levelCounts)) {
  console.log(`  ${level.padEnd(10)}: ${counts.ready}/${counts.total} (${Math.round(counts.ready/counts.total*100)}%)`)
}

// Cooking dishes
console.log('\n👨‍🍳 COOKING DISHES:')
console.log('-'.repeat(40))

const cookingDishes = extractSlugsFromArray(cookingFile, 'dishes')
const cookingLevelCounts = { aprendiz: { total: 0, ready: 0 }, cocinero: { total: 0, ready: 0 }, chef: { total: 0, ready: 0 }, master: { total: 0, ready: 0 } }

for (const dish of cookingDishes) {
  const hasContentFlag = hasContent(cookingFile, dish.slug)
  const status = hasContentFlag ? '✅' : '❌'
  const level = dish.level as keyof typeof cookingLevelCounts
  if (cookingLevelCounts[level]) {
    cookingLevelCounts[level].total++
    if (hasContentFlag) cookingLevelCounts[level].ready++
  }
  console.log(`${status} [${dish.level.padEnd(8)}] ${dish.slug}`)
}

console.log('\n📊 RESUMEN COOKING:')
for (const [level, counts] of Object.entries(cookingLevelCounts)) {
  console.log(`  ${level.padEnd(10)}: ${counts.ready}/${counts.total} (${Math.round(counts.ready/counts.total*100)}%)`)
}

// Total
console.log('\n' + '='.repeat(60))
console.log('TOTAL GENERAL:')
const totalLearning = Object.values(levelCounts).reduce((a, b) => ({ total: a.total + b.total, ready: a.ready + b.ready }), { total: 0, ready: 0 })
const totalCooking = Object.values(cookingLevelCounts).reduce((a, b) => ({ total: a.total + b.total, ready: a.ready + b.ready }), { total: 0, ready: 0 })
console.log(`  Learning: ${totalLearning.ready}/${totalLearning.total} (${Math.round(totalLearning.ready/totalLearning.total*100)}%)`)
console.log(`  Cooking:  ${totalCooking.ready}/${totalCooking.total} (${Math.round(totalCooking.ready/totalCooking.total*100)}%)`)
console.log(`  TOTAL:    ${totalLearning.ready + totalCooking.ready}/${totalLearning.total + totalCooking.total} (${Math.round((totalLearning.ready + totalCooking.ready)/(totalLearning.total + totalCooking.total)*100)}%)`)
console.log('='.repeat(60))
