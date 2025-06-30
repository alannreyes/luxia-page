import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = path.join(process.cwd(), 'database', 'techflow.db')
const SCHEMA_PATH = path.join(process.cwd(), 'lib', 'database', 'schema-sqlite.sql')

let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (!db) {
    // Ensure database directory exists
    const dbDir = path.dirname(DB_PATH)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    // Create or open database
    db = new Database(DB_PATH)
    
    // Enable foreign key constraints
    db.pragma('foreign_keys = ON')
    
    // Initialize schema if tables don't exist
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
    if (tables.length === 0) {
      console.log('Initializing database schema...')
      const schema = fs.readFileSync(SCHEMA_PATH, 'utf8')
      db.exec(schema)
      console.log('Database schema initialized successfully')
    }
  }
  
  return db
}

export function closeDatabase() {
  if (db) {
    db.close()
    db = null
  }
}

// Helper function to execute queries safely
export function executeQuery(query: string, params: any[] = []) {
  const database = getDatabase()
  try {
    if (query.trim().toLowerCase().startsWith('select')) {
      return database.prepare(query).all(...params)
    } else {
      return database.prepare(query).run(...params)
    }
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Get database schema information for AI
export function getDatabaseSchema(): string {
  const database = getDatabase()
  
  const tables = database.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name
  `).all() as { name: string }[]

  let schema = 'TechFlow Factoring Database Schema:\n\n'
  
  for (const table of tables) {
    const columns = database.prepare(`PRAGMA table_info(${table.name})`).all()
    schema += `Table: ${table.name}\n`
    schema += 'Columns:\n'
    
    for (const col of columns as any[]) {
      schema += `  - ${col.name} (${col.type}${col.notnull ? ' NOT NULL' : ''}${col.pk ? ' PRIMARY KEY' : ''})\n`
    }
    schema += '\n'
  }
  
  schema += `
Business Context:
- TechFlow Factoring is an invoice factoring startup founded in November 2023
- We buy invoices from SMBs at a discount (factoring_rate 1-5%) and collect from their customers
- Started with 3 employees, now have 10
- Process invoices for ~45 clients
- Based in Miami, FL
- Data ranges from November 2023 to May 2025

Key Business Metrics:
- Total volume factored (sum of advance_amount from factoring_transactions)
- Monthly fees earned (sum of factoring_fee from factoring_transactions)  
- Collection rate (% of transactions with actual_payment_date)
- Active clients count
- Employee performance (sales volume per rep)
`

  return schema
}