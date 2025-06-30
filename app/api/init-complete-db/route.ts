import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database/connection'
import { seedCompleteDatabase } from '@/lib/database/complete-seed'
import fs from 'fs'
import path from 'path'

export async function POST() {
  try {
    console.log('🚀 Initializing complete TechFlow database...')
    
    // Delete existing database
    const DB_PATH = path.join(process.cwd(), 'database', 'techflow.db')
    if (fs.existsSync(DB_PATH)) {
      fs.unlinkSync(DB_PATH)
      console.log('🗑️ Deleted existing database')
    }
    
    // Create new database with complete schema
    const db = getDatabase()
    
    // Load and execute complete schema
    const schemaPath = path.join(process.cwd(), 'lib', 'database', 'complete-schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    db.exec(schema)
    console.log('📋 Complete schema created')
    
    // Seed with realistic data
    seedCompleteDatabase()
    
    // Get summary stats
    const stats = {
      departments: db.prepare('SELECT COUNT(*) as count FROM departments').get() as { count: number },
      employees: db.prepare('SELECT COUNT(*) as count FROM employees_complete').get() as { count: number },
      prospects: db.prepare('SELECT COUNT(*) as count FROM prospects').get() as { count: number },
      expenses: db.prepare('SELECT COUNT(*) as count FROM expenses').get() as { count: number },
      activities: db.prepare('SELECT COUNT(*) as count FROM sales_activities').get() as { count: number },
      tickets: db.prepare('SELECT COUNT(*) as count FROM support_tickets').get() as { count: number },
      dailyOps: db.prepare('SELECT COUNT(*) as count FROM daily_operations').get() as { count: number }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Complete TechFlow database initialized successfully! 🎉',
      stats: {
        departments: stats.departments.count,
        employees: stats.employees.count,
        prospects: stats.prospects.count,
        expenses: stats.expenses.count,
        sales_activities: stats.activities.count,
        support_tickets: stats.tickets.count,
        daily_operations: stats.dailyOps.count
      }
    })
    
  } catch (error) {
    console.error('Complete database initialization error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}