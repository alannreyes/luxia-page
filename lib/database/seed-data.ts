import { getDatabase } from './connection'

// Realistic data for TechFlow Factoring startup
export function seedDatabase() {
  const db = getDatabase()
  
  console.log('Starting database seeding...')
  
  // Check if data already exists
  const existingEmployees = db.prepare('SELECT COUNT(*) as count FROM employees').get() as { count: number }
  if (existingEmployees.count > 0) {
    console.log('Database already seeded with', existingEmployees.count, 'employees')
    return
  }
  
  console.log('Starting fresh seed...')
  
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

    // 4. Add some key client customers (who owe money on invoices)
    const clientCustomers = [
      ['CUST001', 'CL001', 'RetailCorp Miami', 'John Smith', 'john@retailcorp.com', 'A', 'Retail', 30],
      ['CUST002', 'CL001', 'TechStartup Inc', 'Sarah Lee', 'sarah@techstartup.com', 'AA', 'Technology', 30],
      ['CUST003', 'CL002', 'Miami Restaurants Group', 'Carlos Ruiz', 'carlos@miamirest.com', 'BBB', 'Food Service', 45],
      ['CUST004', 'CL003', 'Supermarket Chain FL', 'Maria Garcia', 'maria@superfl.com', 'A', 'Retail', 30],
      ['CUST005', 'CL004', 'Downtown Office Complex', 'Robert Wilson', 'robert@downtown.com', 'AA', 'Real Estate', 30]
    ]

    const insertCustomer = db.prepare(`
      INSERT INTO client_customers (customer_id, client_id, company_name, contact_person, email, credit_rating, industry, payment_terms)
      VALUES (?, (SELECT id FROM clients WHERE client_id = ?), ?, ?, ?, ?, ?, ?)
    `)

    for (const customer of clientCustomers) {
      insertCustomer.run(...customer)
    }

    // 5. Add realistic factoring transactions (showing business growth)
    const transactions = [
      // November 2023 (early transactions)
      ['TXN001', 'CL001', 'CUST001', 25000, 875, 0.035, 24125, '2023-11-25', '2023-12-25', '2023-12-20', 'collected', 'EMP003'],
      ['TXN002', 'CL002', 'CUST003', 18000, 756, 0.042, 17244, '2023-11-28', '2023-12-28', '2023-12-22', 'collected', 'EMP003'],
      
      // December 2023
      ['TXN003', 'CL001', 'CUST002', 32000, 1120, 0.035, 30880, '2023-12-05', '2024-01-05', '2024-01-02', 'collected', 'EMP003'],
      ['TXN004', 'CL003', 'CUST004', 45000, 1710, 0.038, 43290, '2023-12-15', '2024-01-15', '2024-01-12', 'collected', 'EMP003'],
      ['TXN005', 'CL002', 'CUST003', 22000, 924, 0.042, 21076, '2023-12-20', '2024-01-20', null, 'active', 'EMP003'],
      
      // January 2024
      ['TXN006', 'CL004', 'CUST005', 55000, 2475, 0.045, 52525, '2024-01-10', '2024-02-10', '2024-02-08', 'collected', 'EMP005'],
      ['TXN007', 'CL001', 'CUST001', 28000, 980, 0.035, 27020, '2024-01-15', '2024-02-15', '2024-02-12', 'collected', 'EMP005'],
      ['TXN008', 'CL005', 'CUST005', 38000, 1216, 0.032, 36784, '2024-01-25', '2024-02-25', '2024-02-20', 'collected', 'EMP003'],
      
      // Continue with more recent transactions...
      // May 2025 (most recent)
      ['TXN080', 'CL015', 'CUST001', 75000, 3000, 0.040, 72000, '2025-05-05', '2025-06-05', null, 'active', 'EMP007'],
      ['TXN081', 'CL012', 'CUST004', 65000, 2860, 0.044, 62140, '2025-05-10', '2025-06-10', '2025-06-08', 'collected', 'EMP010'],
      ['TXN082', 'CL018', 'CUST002', 85000, 2550, 0.030, 82450, '2025-05-15', '2025-06-15', null, 'active', 'EMP007'],
      ['TXN083', 'CL020', 'CUST005', 55000, 2035, 0.037, 52965, '2025-05-20', '2025-06-20', null, 'active', 'EMP010'],
      ['TXN084', 'CL013', 'CUST002', 42000, 1302, 0.031, 40698, '2025-05-25', '2025-06-25', null, 'active', 'EMP005']
    ]

    const insertTransaction = db.prepare(`
      INSERT INTO factoring_transactions (
        transaction_id, client_id, customer_id, advance_amount, factoring_fee, 
        factoring_rate, net_amount, transaction_date, expected_payment_date, 
        actual_payment_date, status, processed_by
      ) VALUES (
        ?, (SELECT id FROM clients WHERE client_id = ?), 
        (SELECT id FROM client_customers WHERE customer_id = ?),
        ?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM employees WHERE employee_id = ?)
      )
    `)

    for (const txn of transactions) {
      insertTransaction.run(...txn)
    }

    // 6. Add sales performance data for key reps
    const salesPerformance = [
      // David Johnson (Head of Sales) - EMP003
      ['EMP003', 11, 2023, 150000, 125000, 4, 3, 2500],
      ['EMP003', 12, 2023, 200000, 240000, 6, 6, 4800],
      ['EMP003', 1, 2024, 250000, 285000, 8, 8, 5700],
      ['EMP003', 5, 2025, 300000, 285000, 10, 9, 5700],
      
      // Carlos Martinez - EMP005
      ['EMP005', 1, 2024, 180000, 155000, 5, 4, 3100],
      ['EMP005', 5, 2025, 250000, 242000, 8, 7, 4840],
      
      // Robert Williams - EMP007
      ['EMP007', 3, 2024, 200000, 0, 6, 0, 0], // Just started
      ['EMP007', 5, 2025, 280000, 320000, 9, 10, 6400],
      
      // Maria Garcia - EMP010
      ['EMP010', 1, 2025, 150000, 0, 4, 0, 0], // Just started
      ['EMP010', 5, 2025, 200000, 168000, 6, 5, 3360]
    ]

    const insertSalesPerformance = db.prepare(`
      INSERT INTO sales_performance (employee_id, month, year, target_volume, actual_volume, target_clients, actual_clients, commission_earned)
      VALUES ((SELECT id FROM employees WHERE employee_id = ?), ?, ?, ?, ?, ?, ?, ?)
    `)

    for (const performance of salesPerformance) {
      insertSalesPerformance.run(...performance)
    }
    
    console.log('Database seeded successfully!')
    console.log(`- ${employees.length} employees`)
    console.log(`- ${clients.length} clients`)
    console.log(`- ${clientCustomers.length} client customers`)
    console.log(`- ${transactions.length} factoring transactions`)
    console.log(`- ${monthlyMetrics.length} months of metrics`)
    console.log(`- ${salesPerformance.length} sales performance records`)
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