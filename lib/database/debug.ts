import { getDatabase } from './connection'

export function debugDatabase() {
  const db = getDatabase()
  
  console.log('=== DATABASE DEBUG ===')
  
  const tables = [
    'company_info',
    'employees', 
    'clients',
    'client_customers',
    'invoices',
    'factoring_transactions',
    'customer_payments',
    'monthly_metrics',
    'sales_performance'
  ]
  
  for (const table of tables) {
    try {
      const count = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number }
      console.log(`${table}: ${count.count} rows`)
      
      if (count.count > 0 && count.count <= 5) {
        const sample = db.prepare(`SELECT * FROM ${table} LIMIT 3`).all()
        console.log(`Sample data:`, sample)
      }
    } catch (error) {
      console.log(`${table}: Error - ${error}`)
    }
  }
  
  console.log('=== END DEBUG ===')
}