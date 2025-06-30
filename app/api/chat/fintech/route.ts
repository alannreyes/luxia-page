import { NextRequest, NextResponse } from 'next/server'
import { generateSQL, generateInsight, validateSQL } from '@/lib/ai/sql-generator'
import { executeQuery } from '@/lib/database/connection'
import { seedDatabase } from '@/lib/database/seed-data'
import { debugDatabase } from '@/lib/database/debug'

export async function POST(request: NextRequest) {
  try {
    const { message, locale = 'es' } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' }, 
        { status: 400 }
      )
    }

    // Ensure database is seeded
    try {
      seedDatabase()
      debugDatabase() // Debug what's in the DB
    } catch (error) {
      console.log('Database seeding skipped (already exists)')
    }

    // Generate SQL using AI
    const sqlResponse = await generateSQL(message)
    
    if (sqlResponse.error) {
      return NextResponse.json({
        response: sqlResponse.explanation,
        error: sqlResponse.error
      })
    }

    // Validate SQL for security
    if (!validateSQL(sqlResponse.sql)) {
      return NextResponse.json({
        response: "Sorry, I can only help with data queries, not database modifications.",
        error: "Invalid SQL operation"
      })
    }

    // Execute the SQL query
    let queryResults: any[] = []
    try {
      queryResults = executeQuery(sqlResponse.sql) as any[]
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return NextResponse.json({
        response: "Sorry, I encountered an error executing the database query. Please try rephrasing your question.",
        error: "Database execution error"
      })
    }

    // Generate business insights
    const insights = await generateInsight(queryResults, message, sqlResponse.explanation)

    // Format response based on data
    let metrics: any[] = []
    let chartData: any[] = []
    
    if (queryResults.length > 0) {
      // Convert query results to metrics cards
      const firstRow = queryResults[0]
      const keys = Object.keys(firstRow)
      
      // Create metrics from first row if it's summary data
      if (queryResults.length === 1) {
        metrics = keys.map(key => ({
          label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          value: formatValue(firstRow[key]),
          change: null
        }))
      }
      
      // Prepare chart data if appropriate
      if (queryResults.length > 1 && sqlResponse.chartType !== 'table') {
        chartData = queryResults.map(row => {
          const formattedRow: any = {}
          for (const [key, value] of Object.entries(row)) {
            formattedRow[key] = value
          }
          return formattedRow
        })
      }
    }

    return NextResponse.json({
      response: insights,
      sql: sqlResponse.sql, // For debugging (remove in production)
      explanation: sqlResponse.explanation,
      chartType: sqlResponse.chartType,
      metrics,
      chartData: chartData.length > 0 ? chartData : null,
      showChart: chartData.length > 0 && sqlResponse.chartType !== 'table'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        response: "I'm experiencing technical difficulties. Please try again in a moment.",
        error: "Internal server error"
      },
      { status: 500 }
    )
  }
}

function formatValue(value: any): string {
  if (typeof value === 'number') {
    if (value > 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value > 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    } else if (value % 1 === 0) {
      return value.toString()
    } else {
      return `$${value.toFixed(2)}`
    }
  }
  return String(value)
}