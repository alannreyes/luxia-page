import { NextRequest, NextResponse } from 'next/server'
import { getDatabase, executeQuery } from '@/lib/database/connection'

export async function GET() {
  try {
    const db = getDatabase()
    
    // First insert a test employee directly
    try {
      db.prepare(`
        INSERT INTO employees (employee_id, first_name, last_name, email, role, department, hire_date, salary, commission_rate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run('TEST001', 'Test', 'User', 'test@test.com', 'CEO', 'Executive', '2023-11-15', 150000, 0)
      
      console.log('Test employee inserted')
    } catch (error) {
      console.log('Insert error:', error)
    }
    
    // Check counts
    const employees = db.prepare('SELECT COUNT(*) as count FROM employees').get() as { count: number }
    const clients = db.prepare('SELECT COUNT(*) as count FROM clients').get() as { count: number }
    const transactions = db.prepare('SELECT COUNT(*) as count FROM factoring_transactions').get() as { count: number }
    
    return NextResponse.json({
      employees: employees.count,
      clients: clients.count,
      transactions: transactions.count,
      message: 'Debug info retrieved'
    })
    
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}