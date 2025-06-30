import OpenAI from 'openai'
import { getDatabaseSchema } from '../database/connection'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export interface SQLResponse {
  sql: string
  explanation: string
  chartType?: 'bar' | 'line' | 'pie' | 'table'
  error?: string
}

export async function generateSQL(userQuestion: string): Promise<SQLResponse> {
  try {
    const schema = getDatabaseSchema()
    
    const systemPrompt = `You are an expert SQL analyst for TechFlow Factoring, an invoice factoring startup.

${schema}

RULES:
1. Generate ONLY safe SELECT queries - no INSERT, UPDATE, DELETE, DROP
2. Use proper SQLite syntax
3. Include helpful column aliases
4. Return numeric results formatted appropriately
5. Suggest appropriate chart type for visualization
6. Provide a brief explanation of what the query does

CHART TYPE GUIDELINES:
- bar: comparing categories, monthly data, rankings
- line: trends over time, growth patterns  
- pie: proportions, distributions
- table: detailed lists, multiple columns

RESPONSE FORMAT:
Return a JSON object with:
- sql: the SQLite query
- explanation: brief explanation of results
- chartType: suggested visualization type

Remember: This is a factoring business - we buy invoices from clients at a discount and collect from their customers.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate SQL for: "${userQuestion}"` }
      ],
      temperature: 0.1,
      max_tokens: 800
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(response)
      return {
        sql: parsed.sql,
        explanation: parsed.explanation,
        chartType: parsed.chartType || 'table'
      }
    } catch (parseError) {
      // If JSON parsing fails, try to extract SQL from response
      const sqlMatch = response.match(/```sql\n(.*?)\n```/s)
      if (sqlMatch) {
        return {
          sql: sqlMatch[1],
          explanation: response.replace(/```sql.*?```/s, '').trim(),
          chartType: 'table'
        }
      }
      
      throw new Error('Could not parse AI response')
    }
  } catch (error) {
    console.error('SQL generation error:', error)
    return {
      sql: '',
      explanation: 'Sorry, I encountered an error processing your question.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function generateInsight(data: any[], userQuestion: string, explanation: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a business analyst for TechFlow Factoring. Provide concise, insightful analysis of business data.
          
          Context: TechFlow is an invoice factoring startup founded in Nov 2023. We help small businesses with cash flow by buying their invoices.
          
          Format your response as:
          1. Direct answer to the question
          2. Key insights (1-2 bullet points)
          3. Business implication or trend (if applicable)
          
          Keep it conversational and under 150 words.`
        },
        {
          role: "user",
          content: `Question: "${userQuestion}"
          Query explanation: ${explanation}
          Data results: ${JSON.stringify(data.slice(0, 10))} ${data.length > 10 ? `(showing first 10 of ${data.length} results)` : ''}
          
          Provide business insights:`
        }
      ],
      temperature: 0.3,
      max_tokens: 300
    })

    return completion.choices[0]?.message?.content || 'Analysis generated successfully.'
  } catch (error) {
    console.error('Insight generation error:', error)
    return explanation // Fallback to technical explanation
  }
}

// Validate SQL for security
export function validateSQL(sql: string): boolean {
  const forbidden = [
    'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE', 'TRUNCATE',
    'EXEC', 'EXECUTE', 'UNION', '--', '/*', '*/'
  ]
  
  const upperSQL = sql.toUpperCase()
  return !forbidden.some(keyword => upperSQL.includes(keyword))
}