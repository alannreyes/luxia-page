import { getDatabase } from './connection'

export function seedCompleteDatabase() {
  const db = getDatabase()
  
  console.log('🚀 Starting COMPLETE TechFlow Factoring seeding...')
  
  const transaction = db.transaction(() => {
    
    // 1. ORGANIZATION STRUCTURE
    console.log('📋 Seeding organizational structure...')
    
    // Departments (already in schema)
    const deptIds: { [key: string]: string } = {}
    const depts = db.prepare('SELECT * FROM departments').all() as any[]
    depts.forEach(dept => {
      deptIds[dept.name] = dept.id
    })
    
    // Positions
    const positionInsert = db.prepare(`
      INSERT INTO positions (title, department_id, level, min_salary, max_salary)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    const positions = [
      ['CEO', deptIds['Executive'], 'c-level', 180000, 250000],
      ['COO', deptIds['Executive'], 'c-level', 160000, 220000],
      ['Head of Sales', deptIds['Sales'], 'director', 120000, 150000],
      ['Senior Sales Rep', deptIds['Sales'], 'senior', 70000, 90000],
      ['Sales Rep', deptIds['Sales'], 'mid', 55000, 70000],
      ['Operations Manager', deptIds['Operations'], 'director', 100000, 125000],
      ['Operations Specialist', deptIds['Operations'], 'mid', 50000, 65000],
      ['Sr. Credit Analyst', deptIds['Underwriting'], 'senior', 80000, 95000],
      ['Credit Analyst', deptIds['Underwriting'], 'mid', 60000, 75000],
      ['Customer Success Manager', deptIds['Customer Success'], 'senior', 75000, 90000]
    ]
    
    for (const pos of positions) {
      positionInsert.run(...pos)
    }
    
    // Complete Employee Data
    const empInsert = db.prepare(`
      INSERT INTO employees_complete (
        employee_id, first_name, last_name, email, phone, department_id, 
        hire_date, salary, commission_rate, equity_percentage, performance_rating,
        address, city, state, zip_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    const employees = [
      // Founders & Leadership
      ['EMP001', 'Michael', 'Chen', 'michael@techflowfactoring.com', '305-555-0001', deptIds['Executive'], '2023-11-15', 180000, 0, 0.4, 4.8, '1200 Brickell Ave', 'Miami', 'FL', '33131'],
      ['EMP002', 'Sarah', 'Rodriguez', 'sarah@techflowfactoring.com', '305-555-0002', deptIds['Executive'], '2023-11-15', 160000, 0, 0.25, 4.7, '900 Biscayne Blvd', 'Miami', 'FL', '33132'],
      ['EMP003', 'David', 'Johnson', 'david@techflowfactoring.com', '305-555-0003', deptIds['Sales'], '2023-11-15', 120000, 0.02, 0.08, 4.5, '2500 Coral Way', 'Miami', 'FL', '33145'],
      
      // Early Hires (Dec 2023 - Feb 2024)
      ['EMP004', 'Jennifer', 'Liu', 'jennifer@techflowfactoring.com', '305-555-0004', deptIds['Underwriting'], '2023-12-01', 80000, 0, 0.015, 4.3, '1500 Bay Rd', 'Miami Beach', 'FL', '33139'],
      ['EMP005', 'Carlos', 'Martinez', 'carlos@techflowfactoring.com', '305-555-0005', deptIds['Sales'], '2024-01-15', 65000, 0.015, 0.01, 4.1, '8900 SW 72nd St', 'Miami', 'FL', '33173'],
      ['EMP006', 'Emily', 'Davis', 'emily@techflowfactoring.com', '305-555-0006', deptIds['Operations'], '2024-02-01', 55000, 0, 0.008, 4.0, '3400 NE 2nd Ave', 'Miami', 'FL', '33137'],
      
      // Growth Hires (Mar 2024 onwards)
      ['EMP007', 'Robert', 'Williams', 'robert@techflowfactoring.com', '305-555-0007', deptIds['Sales'], '2024-03-15', 75000, 0.018, 0.005, 4.4, '12000 SW 8th St', 'Miami', 'FL', '33184'],
      ['EMP008', 'Lisa', 'Thompson', 'lisa@techflowfactoring.com', '305-555-0008', deptIds['Customer Success'], '2024-06-01', 60000, 0, 0.003, 3.9, '500 NE 26th St', 'Miami', 'FL', '33137'],
      ['EMP009', 'Alex', 'Kim', 'alex@techflowfactoring.com', '305-555-0009', deptIds['Underwriting'], '2024-09-01', 65000, 0, 0.002, 3.8, '2020 NW 7th Ave', 'Miami', 'FL', '33127'],
      ['EMP010', 'Maria', 'Garcia', 'maria@techflowfactoring.com', '305-555-0010', deptIds['Sales'], '2025-01-15', 68000, 0.015, 0.001, 4.2, '7500 SW 104th St', 'Miami', 'FL', '33156']
    ]
    
    for (const emp of employees) {
      empInsert.run(...emp)
    }
    
    // 2. SALES PIPELINE & PROSPECTS
    console.log('💼 Seeding sales pipeline...')
    
    const prospectInsert = db.prepare(`
      INSERT INTO prospects (
        prospect_id, company_name, contact_person, title, email, phone, industry,
        company_size, annual_revenue, lead_source_id, assigned_rep_id, stage,
        probability, estimated_value, estimated_close_date, pain_points
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    const leadSources = db.prepare('SELECT * FROM lead_sources').all() as any[]
    const salesReps = ['EMP003', 'EMP005', 'EMP007', 'EMP010']
    
    const prospects = [
      // Hot prospects
      ['PROS001', 'Miami Construction Corp', 'John Martinez', 'CFO', 'john@miamicc.com', '305-888-0001', 'Construction', 'medium', 5000000, leadSources[3].id, 'EMP003', 'proposal', 75, 180000, '2025-07-15', 'Cash flow gaps during project cycles'],
      ['PROS002', 'Florida Food Distributors', 'Ana Gutierrez', 'Controller', 'ana@flfood.com', '954-888-0002', 'Food Distribution', 'medium', 8000000, leadSources[1].id, 'EMP007', 'negotiation', 80, 250000, '2025-07-20', 'Net 60 payment terms from retailers'],
      ['PROS003', 'Tech Startup Miami', 'Kevin Park', 'Founder', 'kevin@techmia.com', '786-888-0003', 'Technology Services', 'small', 2000000, leadSources[0].id, 'EMP010', 'qualified', 60, 120000, '2025-08-01', 'B2B clients pay slowly'],
      
      // Warm prospects
      ['PROS004', 'Coastal Logistics LLC', 'Maria Santos', 'Finance Director', 'maria@coastallog.com', '305-888-0004', 'Transportation', 'medium', 6000000, leadSources[2].id, 'EMP005', 'qualified', 45, 200000, '2025-08-15', 'Seasonal cash flow challenges'],
      ['PROS005', 'Palm Beach Services', 'Robert Taylor', 'Owner', 'robert@pbservices.com', '561-888-0005', 'Professional Services', 'small', 1500000, leadSources[4].id, 'EMP003', 'proposal', 65, 90000, '2025-07-30', 'Client payment delays'],
      
      // Cold prospects
      ['PROS006', 'Orlando Manufacturing', 'Lisa Chen', 'VP Finance', 'lisa@orlmfg.com', '407-888-0006', 'Manufacturing', 'medium', 12000000, leadSources[5].id, 'EMP007', 'new', 20, 350000, '2025-09-01', 'Large orders tie up working capital'],
      ['PROS007', 'Tampa Bay Consulting', 'Mike Johnson', 'Partner', 'mike@tbconsult.com', '813-888-0007', 'Business Consulting', 'small', 3000000, leadSources[0].id, 'EMP010', 'new', 25, 150000, '2025-08-30', 'Project-based revenue cycles']
    ]
    
    for (const prospect of prospects) {
      prospectInsert.run(...prospect)
    }
    
    // Sales Activities
    const activityInsert = db.prepare(`
      INSERT INTO sales_activities (
        prospect_id, employee_id, activity_type, subject, description, outcome, activity_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    
    const prospectIds = db.prepare('SELECT id FROM prospects LIMIT 3').all() as any[]
    const activities = [
      [prospectIds[0].id, 'EMP003', 'call', 'Discovery Call', 'Discussed factoring needs and cash flow challenges', 'positive', '2025-06-15'],
      [prospectIds[0].id, 'EMP003', 'meeting', 'In-person Demo', 'Showed platform and discussed rates', 'positive', '2025-06-20'],
      [prospectIds[1].id, 'EMP007', 'email', 'Follow-up Email', 'Sent proposal and pricing information', 'neutral', '2025-06-18'],
      [prospectIds[2].id, 'EMP010', 'call', 'Cold Outreach', 'Initial introduction call', 'positive', '2025-06-22']
    ]
    
    for (const activity of activities) {
      activityInsert.run(...activity)
    }
    
    // 3. EXPENSES & FINANCIAL DATA
    console.log('💰 Seeding financial data...')
    
    const expenseInsert = db.prepare(`
      INSERT INTO expenses (
        expense_id, category_id, employee_id, vendor_name, description, amount,
        expense_date, payment_method, status, department_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    const expenseCategories = db.prepare('SELECT * FROM expense_categories').all() as any[]
    
    const expenses = [
      // May 2025 expenses
      ['EXP001', expenseCategories[0].id, 'EMP001', 'ADP', 'Payroll processing - May 2025', 85000, '2025-05-31', 'wire', 'paid', deptIds['Executive']],
      ['EXP002', expenseCategories[1].id, 'EMP002', 'Brickell Properties', 'Office rent - May 2025', 8500, '2025-05-01', 'wire', 'paid', deptIds['Executive']],
      ['EXP003', expenseCategories[2].id, 'EMP006', 'Salesforce', 'CRM subscription', 450, '2025-05-15', 'corporate-card', 'paid', deptIds['Sales']],
      ['EXP004', expenseCategories[3].id, 'EMP003', 'Google Ads', 'Lead generation campaign', 2800, '2025-05-20', 'corporate-card', 'paid', deptIds['Marketing']],
      ['EXP005', expenseCategories[4].id, 'EMP001', 'Miami Law Group', 'Legal consultation - compliance', 1200, '2025-05-25', 'check', 'paid', deptIds['Executive']],
      
      // June 2025 expenses
      ['EXP006', expenseCategories[0].id, 'EMP001', 'ADP', 'Payroll processing - June 2025', 87500, '2025-06-30', 'wire', 'pending', deptIds['Executive']],
      ['EXP007', expenseCategories[2].id, 'EMP008', 'Zendesk', 'Customer support platform', 289, '2025-06-10', 'corporate-card', 'paid', deptIds['Customer Success']],
      ['EXP008', expenseCategories[3].id, 'EMP007', 'LinkedIn Premium', 'Sales Navigator licenses', 159, '2025-06-05', 'corporate-card', 'paid', deptIds['Sales']]
    ]
    
    for (const expense of expenses) {
      const empId = db.prepare('SELECT id FROM employees_complete WHERE employee_id = ?').get(expense[2]) as any
      const updatedExpense = [...expense]
      updatedExpense[2] = empId?.id
      expenseInsert.run(...updatedExpense)
    }
    
    // 4. CUSTOMER SUCCESS & SUPPORT
    console.log('🎯 Seeding customer success data...')
    
    const ticketInsert = db.prepare(`
      INSERT INTO support_tickets (
        ticket_id, client_id, assigned_to, priority, category, subject, description,
        status, first_response_time_hours, satisfaction_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    const clientIds = db.prepare('SELECT id FROM clients LIMIT 3').all() as any[]
    const csRep = db.prepare('SELECT id FROM employees_complete WHERE employee_id = ?').get('EMP008') as any
    
    const tickets = [
      ['TKT001', clientIds[0]?.id, csRep.id, 'medium', 'billing', 'Invoice discrepancy', 'Client questions factoring fee calculation', 'resolved', 2, 5],
      ['TKT002', clientIds[1]?.id, csRep.id, 'high', 'technical', 'Portal access issue', 'Cannot log into client portal', 'resolved', 1, 4],
      ['TKT003', clientIds[2]?.id, csRep.id, 'low', 'onboarding', 'Document upload help', 'Needs assistance uploading bank statements', 'open', 4, null]
    ]
    
    for (const ticket of tickets) {
      ticketInsert.run(...ticket)
    }
    
    // 5. DAILY OPERATIONS METRICS
    console.log('📊 Seeding operational metrics...')
    
    const dailyOpsInsert = db.prepare(`
      INSERT INTO daily_operations (
        date, applications_received, applications_approved, applications_rejected,
        average_approval_time_hours, volume_factored, fees_collected, new_clients_onboarded,
        support_tickets_opened, support_tickets_closed, website_visitors, leads_generated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    // Last 30 days of operations
    const dailyOps = [
      ['2025-06-01', 8, 6, 2, 4.5, 125000, 4375, 1, 2, 1, 245, 8],
      ['2025-06-02', 12, 9, 3, 3.8, 180000, 6300, 0, 3, 2, 289, 12],
      ['2025-06-03', 6, 5, 1, 5.2, 95000, 3325, 0, 1, 3, 198, 6],
      ['2025-06-04', 15, 11, 4, 4.1, 220000, 7700, 2, 4, 1, 356, 15],
      ['2025-06-05', 9, 7, 2, 4.8, 165000, 5775, 1, 2, 4, 267, 9]
    ]
    
    for (const ops of dailyOps) {
      dailyOpsInsert.run(...ops)
    }
    
    console.log('✅ Complete TechFlow Factoring database seeded successfully!')
    console.log('📈 Includes: Org structure, sales pipeline, financials, support, operations')
  })
  
  transaction()
}