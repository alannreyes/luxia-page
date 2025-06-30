import { getDatabase } from './connection'
import fs from 'fs'
import path from 'path'

export function forceReseed() {
  // Delete database file
  const DB_PATH = path.join(process.cwd(), 'database', 'techflow.db')
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH)
    console.log('Database file deleted')
  }
  
  // This will trigger recreation
  const db = getDatabase()
  console.log('Database recreated')
}