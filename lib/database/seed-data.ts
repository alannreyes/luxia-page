import { getDatabase } from './connection'

// Realistic data for TechFlow Factoring startup
export function seedDatabase() {
  const db = getDatabase()
  
  console.log('Starting database seeding...')
  
  // Check if data already exists
  const existingEmployees = db.prepare('SELECT COUNT(*) as count FROM employees').get() as { count: number }
  if (existingEmployees.count > 0) {
    console.log('Database already seeded')
    return
  }
  
  // Start transaction
  const transaction = db.transaction(() => {
    // 1. Insert employees (startup team)
    const employees = [
      // Founders (Nov 2023)
      ['EMP001', 'Michael', 'Chen', 'michael@techflowfactoring.com', 'CEO', 'Executive', '2023-11-15', 150000, 0],
      ['EMP002', 'Sarah', 'Rodriguez', 'sarah@techflowfactoring.com', 'COO', 'Operations', '2023-11-15', 130000, 0],
      ['EMP003', 'David', 'Johnson', 'david@techflowfactoring.com', 'Head of Sales', 'Sales', '2023-11-15', 120000, 0.02],
      
      // Early hires (Dec 2023 - Feb 2024)
      ['EMP004', 'Jennifer', 'Liu', 'jennifer@techflowfactoring.com', 'Credit Analyst', 'Underwriting', '2023-12-01', 75000, 0],
      ['EMP005', 'Carlos', 'Martinez', 'carlos@techflowfactoring.com', 'Sales Rep', 'Sales', '2024-01-15', 65000, 0.015],
      ['EMP006', 'Emily', 'Davis', 'emily@techflowfactoring.com', 'Operations Specialist', 'Operations', '2024-02-01', 55000, 0],
      
      // Growth hires (Mar 2024 - Jan 2025)
      ['EMP007', 'Robert', 'Williams', 'robert@techflowfactoring.com', 'Senior Sales Rep', 'Sales', '2024-03-15', 70000, 0.018],
      ['EMP008', 'Lisa', 'Thompson', 'lisa@techflowfactoring.com', 'Customer Success', 'Operations', '2024-06-01', 60000, 0],
      ['EMP009', 'Alex', 'Kim', 'alex@techflowfactoring.com', 'Jr. Credit Analyst', 'Underwriting', '2024-09-01', 55000, 0],
      ['EMP010', 'Maria', 'Garcia', 'maria@techflowfactoring.com', 'Sales Rep', 'Sales', '2025-01-15', 65000, 0.015]
    ]
    
    const insertEmployee = db.prepare(`
      INSERT INTO employees (employee_id, first_name, last_name, email, role, department, hire_date, salary, commission_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    for (const emp of employees) {
      insertEmployee.run(...emp)
    }
    
    // 2. Insert clients (small businesses)
    const clients = [
      // Early clients (Nov-Dec 2023)
      ['CL001', 'Miami Tech Solutions', 'Technology', 'john@miamitech.com', '786-555-0101', '2023-11-20', 0.035, 'active'],
      ['CL002', 'Sunshine Logistics', 'Transportation', 'maria@sunshinelogistics.com', '305-555-0102', '2023-12-01', 0.042, 'active'],
      ['CL003', 'Florida Fresh Produce', 'Agriculture', 'carlos@flfresh.com', '561-555-0103', '2023-12-15', 0.038, 'active'],
      
      // Q1 2024 clients
      ['CL004', 'Atlantic Construction', 'Construction', 'bob@atlanticbuild.com', '954-555-0104', '2024-01-10', 0.045, 'active'],
      ['CL005', 'Bay Area Consulting', 'Professional Services', 'sarah@bayareaconsult.com', '305-555-0105', '2024-01-25', 0.032, 'active'],
      ['CL006', 'Coastal Manufacturing', 'Manufacturing', 'mike@coastalmfg.com', '239-555-0106', '2024-02-05', 0.041, 'active'],
      ['CL007', 'Digital Marketing Plus', 'Marketing', 'lisa@digitalplus.com', '305-555-0107', '2024-02-20', 0.029, 'active'],
      ['CL008', 'Orlando Equipment Rental', 'Equipment Rental', 'dave@orlandoequip.com', '407-555-0108', '2024-03-01', 0.047, 'active'],
      
      // Q2 2024 clients
      ['CL009', 'Tampa Bay Services', 'Professional Services', 'nancy@tampabay.com', '813-555-0109', '2024-04-15', 0.034, 'active'],
      ['CL010', 'Southeast Staffing', 'Staffing', 'robert@sestaffing.com', '305-555-0110', '2024-04-30', 0.039, 'active'],
      ['CL011', 'Florida Healthcare Supply', 'Healthcare', 'jennifer@flhealthcare.com', '954-555-0111', '2024-05-10', 0.033, 'active'],
      ['CL012', 'Miami Food Distributors', 'Food Distribution', 'alex@miamifood.com', '305-555-0112', '2024-05-25', 0.044, 'active'],
      ['CL013', 'Broward Tech Systems', 'Technology', 'emily@browardtech.com', '954-555-0113', '2024-06-08', 0.031, 'active'],
      
      // Continue with more clients through May 2025...
      ['CL014', 'Keys Marine Services', 'Marine Services', 'captain@keysmarine.com', '305-555-0114', '2024-07-01', 0.046, 'active'],
      ['CL015', 'Jacksonville Logistics', 'Transportation', 'tom@jaxlogistics.com', '904-555-0115', '2024-07-15', 0.040, 'active'],
      ['CL016', 'Palm Beach Consulting', 'Consulting', 'anna@palmbeach.com', '561-555-0116', '2024-08-01', 0.035, 'active'],
      ['CL017', 'Everglades Equipment', 'Construction', 'jim@evergladesquip.com', '239-555-0117', '2024-08-20', 0.043, 'active'],
      ['CL018', 'Space Coast Tech', 'Technology', 'rocket@spacetech.com', '321-555-0118', '2024-09-05', 0.030, 'active'],
      ['CL019', 'Gulf Coast Supplies', 'Distribution', 'gulf@coastsupplies.com', '239-555-0119', '2024-09-20', 0.041, 'active'],
      ['CL020', 'Treasure Coast Services', 'Services', 'treasure@coastservices.com', '772-555-0120', '2024-10-01', 0.037, 'active']
    ]
    
    const insertClient = db.prepare(`
      INSERT INTO clients (client_id, company_name, industry, email, phone, onboarded_date, factoring_rate, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    for (const client of clients) {
      insertClient.run(...client)
    }
    
    // 3. Add monthly metrics (showing startup growth)
    const monthlyMetrics = [
      // 2023 (startup month)
      [11, 2023, 125000, 4375, 3, 3, 8, 0.035, 1.0],
      [12, 2023, 240000, 9000, 6, 3, 15, 0.0375, 0.93],
      
      // 2024 - growth year
      [1, 2024, 285000, 11400, 8, 2, 18, 0.040, 0.95],
      [2, 2024, 320000, 12160, 10, 2, 21, 0.038, 0.90],
      [3, 2024, 410000, 16400, 12, 2, 27, 0.040, 0.96],
      [4, 2024, 485000, 18525, 14, 2, 32, 0.0382, 0.94],
      [5, 2024, 520000, 20800, 16, 2, 35, 0.040, 0.97],
      [6, 2024, 575000, 22425, 18, 2, 38, 0.039, 0.95],
      [7, 2024, 630000, 25830, 20, 2, 42, 0.041, 0.93],
      [8, 2024, 680000, 26520, 22, 2, 45, 0.039, 0.96],
      [9, 2024, 720000, 28800, 24, 2, 48, 0.040, 0.94],
      [10, 2024, 785000, 31400, 26, 2, 52, 0.040, 0.98],
      [11, 2024, 850000, 34000, 28, 2, 56, 0.040, 0.95],
      [12, 2024, 920000, 37720, 30, 2, 61, 0.041, 0.97],
      
      // 2025 - scaling up
      [1, 2025, 980000, 39200, 32, 2, 65, 0.040, 0.96],
      [2, 2025, 1050000, 42000, 34, 2, 70, 0.040, 0.94],
      [3, 2025, 1120000, 44800, 36, 2, 74, 0.040, 0.97],
      [4, 2025, 1200000, 48000, 38, 2, 79, 0.040, 0.95],
      [5, 2025, 1285000, 51400, 40, 2, 85, 0.040, 0.98]
    ]
    
    const insertMetrics = db.prepare(`
      INSERT INTO monthly_metrics (month, year, total_volume, total_fees, active_clients, new_clients, transactions_count, average_factoring_rate, collection_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    for (const metric of monthlyMetrics) {
      insertMetrics.run(...metric)
    }
    
    console.log('Database seeded successfully!')
    console.log(`- ${employees.length} employees`)
    console.log(`- ${clients.length} clients`)
    console.log(`- ${monthlyMetrics.length} months of metrics`)
  })
  
  transaction()
}

// Function to get sample data for testing
export function getSampleQueries() {
  return [
    "What were our total fees in May 2025?",
    "How many clients do we have?",
    "Who are our top performing sales reps?",
    "What's our average factoring rate?",
    "Show me our monthly growth trend",
    "Which months had the highest volume?",
    "How many new clients did we onboard in Q1 2024?",
    "What's our collection rate trend?"
  ]
}