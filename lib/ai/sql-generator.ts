import OpenAI from 'openai'
import { getDatabaseSchema } from '../database/connection'
import { checkDataAccess, sanitizeQuery, getCurrentUser, ROLES, DATA_CLASSIFICATIONS } from './access-control'

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
    const currentUser = getCurrentUser()
    const userRole = ROLES[currentUser.role]
    
    console.log(`🔐 User: ${currentUser.name} (${currentUser.role}) asking: "${userQuestion}"`)
    
    // Check for sensitive data requests
    const sensitiveKeywords = {
      'salary': 'employee_salaries',
      'compensation': 'employee_salaries', 
      'pay': 'employee_salaries',
      'address': 'employee_addresses',
      'home': 'employee_addresses',
      'equity': 'equity_information',
      'ownership': 'equity_information',
      'personal': 'employee_addresses'
    }
    
    const lowerQuestion = userQuestion.toLowerCase()
    for (const [keyword, dataType] of Object.entries(sensitiveKeywords)) {
      if (lowerQuestion.includes(keyword)) {
        const access = checkDataAccess(currentUser.role, dataType)
        if (!access.allowed) {
          console.log(`🚫 Access denied for ${dataType}`)
          return {
            sql: '',
            explanation: `Access Denied: ${access.reason}\n\n${access.suggestedAlternative || ''}`,
            error: 'Insufficient permissions'
          }
        }
      }
    }
    
    const systemPrompt = `You are an expert SQL analyst for TechFlow Factoring, an invoice factoring startup.

CURRENT USER: ${currentUser.name} (${currentUser.role} - ${currentUser.level} level)
USER PERMISSIONS: ${userRole.permissions.join(', ')}

${schema}

IMPORTANT SECURITY RULES:
1. Generate ONLY safe SELECT queries - no INSERT, UPDATE, DELETE, DROP
2. Use proper SQLite syntax  
3. Include helpful column aliases
4. Consider user's access level when suggesting queries
5. If user asks for restricted data they can't access, explain the limitation
6. Provide appropriate alternatives based on their role

DATA ACCESS LEVELS:
- Employee level: Basic metrics, client lists, own performance
- Manager level: Team performance, department budgets  
- Director level: Financial statements, salary ranges, expense details
- Executive level: All data including personal info, equity, competitive intelligence

CHART TYPE GUIDELINES:
- bar: comparing categories, monthly data, rankings
- line: trends over time, growth patterns  
- pie: proportions, distributions
- table: detailed lists, multiple columns

RESPONSE FORMAT:
You MUST respond with ONLY a JSON object in this exact format:
{
  "sql": "SELECT query here",
  "explanation": "Brief business explanation here", 
  "chartType": "bar"
}

Do not include any other text, markdown, or formatting. Just the JSON object.

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

    console.log('OpenAI Raw Response:', response) // Debug log

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(response)
      
      // Sanitize SQL based on user permissions
      const { sanitizedSQL, modifications } = sanitizeQuery(parsed.sql, currentUser.role)
      
      let explanation = parsed.explanation
      if (modifications.length > 0) {
        explanation += `\n\n🔒 Security Note: ${modifications.join(', ')}`
      }
      
      console.log(`✅ Query approved for ${currentUser.role}:`, sanitizedSQL.substring(0, 100))
      
      return {
        sql: sanitizedSQL,
        explanation: explanation,
        chartType: parsed.chartType || 'table'
      }
    } catch (parseError) {
      console.log('JSON Parse Error:', parseError) // Debug log
      
      // If JSON parsing fails, try to extract SQL from response
      const sqlMatch = response.match(/```sql\n(.*?)\n```/s)
      if (sqlMatch) {
        return {
          sql: sqlMatch[1],
          explanation: response.replace(/```sql.*?```/s, '').trim(),
          chartType: 'table'
        }
      }
      
      // If no SQL found, try to extract any code block
      const codeMatch = response.match(/```(.*?)\n(.*?)\n```/s)
      if (codeMatch) {
        return {
          sql: codeMatch[2],
          explanation: response.replace(/```.*?```/s, '').trim(),
          chartType: 'table'
        }
      }
      
      // Last resort: return the raw response as explanation
      return {
        sql: '',
        explanation: response,
        error: 'Could not extract SQL from response'
      }
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
    // For simple questions with single/clear answers, return direct response
    const lowerQuestion = userQuestion.toLowerCase()
    const isSimpleQuestion = (
      lowerQuestion.includes('what is') ||
      lowerQuestion.includes('how many') ||
      lowerQuestion.includes('who is') ||
      lowerQuestion.includes('name') ||
      lowerQuestion.includes('called')
    ) && data.length <= 1

    if (isSimpleQuestion && data.length === 1) {
      const result = data[0]
      const keys = Object.keys(result)
      if (keys.length === 1) {
        // Single value response - just return the answer
        return String(result[keys[0]])
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a business analyst for TechFlow Factoring. Provide concise, direct answers.
          
          Response guidelines:
          - For simple factual questions (company name, counts, etc.): Give a direct 1-sentence answer
          - For complex questions: Provide brief analysis with 2-3 bullet points
          - Keep total response under 80 words for simple questions, 150 words for complex ones
          - Be conversational but professional
          
          Context: TechFlow is an invoice factoring startup founded in Nov 2023 in Miami, FL.`
        },
        {
          role: "user",
          content: `Question: "${userQuestion}"
          Data results: ${JSON.stringify(data.slice(0, 5))} ${data.length > 5 ? `(showing first 5 of ${data.length} results)` : ''}
          
          Provide a concise business response:`
        }
      ],
      temperature: 0.2,
      max_tokens: 150
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