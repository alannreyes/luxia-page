import { getDatabase } from './connection'

export function simpleSeed() {
  const db = getDatabase()
  
  console.log('=== SIMPLE SEED START ===')
  
  try {
    // Clear existing data
    db.prepare('DELETE FROM sales_performance').run()
    db.prepare('DELETE FROM customer_payments').run()
    db.prepare('DELETE FROM factoring_transactions').run()
    db.prepare('DELETE FROM invoices').run()
    db.prepare('DELETE FROM client_customers').run()
    db.prepare('DELETE FROM clients').run()
    db.prepare('DELETE FROM employees').run()
    db.prepare('DELETE FROM monthly_metrics').run()
    
    console.log('Cleared existing data')
    
    // Insert 3 employees
    const empInsert = db.prepare(`
      INSERT INTO employees (employee_id, first_name, last_name, email, role, department, hire_date, salary, commission_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    empInsert.run('EMP001', 'Michael', 'Chen', 'michael@techflowfactoring.com', 'CEO', 'Executive', '2023-11-15', 150000, 0)
    empInsert.run('EMP002', 'Sarah', 'Rodriguez', 'sarah@techflowfactoring.com', 'COO', 'Operations', '2023-11-15', 130000, 0)
    empInsert.run('EMP003', 'David', 'Johnson', 'david@techflowfactoring.com', 'Head of Sales', 'Sales', '2023-11-15', 120000, 0.02)
    
    console.log('Inserted 3 employees')
    
    // Insert 5 clients
    const clientInsert = db.prepare(`
      INSERT INTO clients (client_id, company_name, industry, email, phone, onboarded_date, factoring_rate, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    clientInsert.run('CL001', 'Miami Tech Solutions', 'Technology', 'john@miamitech.com', '786-555-0101', '2023-11-20', 0.035, 'active')
    clientInsert.run('CL002', 'Sunshine Logistics', 'Transportation', 'maria@sunshinelogistics.com', '305-555-0102', '2023-12-01', 0.042, 'active')
    clientInsert.run('CL003', 'Florida Fresh Produce', 'Agriculture', 'carlos@flfresh.com', '561-555-0103', '2023-12-15', 0.038, 'active')
    clientInsert.run('CL004', 'Atlantic Construction', 'Construction', 'bob@atlanticbuild.com', '954-555-0104', '2024-01-10', 0.045, 'active')
    clientInsert.run('CL005', 'Bay Area Consulting', 'Professional Services', 'sarah@bayareaconsult.com', '305-555-0105', '2024-01-25', 0.032, 'active')
    
    console.log('Inserted 5 clients')
    
    // Insert some metrics
    const metricsInsert = db.prepare(`
      INSERT INTO monthly_metrics (month, year, total_volume, total_fees, active_clients, new_clients, transactions_count, average_factoring_rate, collection_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    metricsInsert.run(5, 2025, 285000, 11400, 5, 0, 15, 0.040, 0.95)
    metricsInsert.run(4, 2025, 250000, 10000, 5, 0, 12, 0.040, 0.92)
    metricsInsert.run(3, 2025, 220000, 8800, 4, 1, 10, 0.040, 0.90)
    
    console.log('Inserted 3 monthly metrics')
    
    // Verify counts
    const empCount = db.prepare('SELECT COUNT(*) as count FROM employees').get() as { count: number }
    const clientCount = db.prepare('SELECT COUNT(*) as count FROM clients').get() as { count: number }
    const metricsCount = db.prepare('SELECT COUNT(*) as count FROM monthly_metrics').get() as { count: number }
    
    console.log(`Final counts: ${empCount.count} employees, ${clientCount.count} clients, ${metricsCount.count} metrics`)
    console.log('=== SIMPLE SEED COMPLETE ===')
    
    return {
      employees: empCount.count,
      clients: clientCount.count,
      metrics: metricsCount.count
    }
    
  } catch (error) {
    console.error('Seeding error:', error)
    throw error
  }
}