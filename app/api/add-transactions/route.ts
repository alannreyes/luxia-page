import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/database/connection'

export async function POST() {
  try {
    const db = getDatabase()
    
    // First add some client customers
    const customerInsert = db.prepare(`
      INSERT OR IGNORE INTO client_customers (customer_id, client_id, company_name, contact_person, email, credit_rating, industry, payment_terms)
      VALUES (?, (SELECT id FROM clients WHERE client_id = ?), ?, ?, ?, ?, ?, ?)
    `)
    
    customerInsert.run('CUST001', 'CL001', 'RetailCorp Miami', 'John Smith', 'john@retailcorp.com', 'A', 'Retail', 30)
    customerInsert.run('CUST002', 'CL002', 'Miami Restaurants Group', 'Carlos Ruiz', 'carlos@miamirest.com', 'BBB', 'Food Service', 45)
    customerInsert.run('CUST003', 'CL003', 'Supermarket Chain FL', 'Maria Garcia', 'maria@superfl.com', 'A', 'Retail', 30)
    
    // Add some factoring transactions
    const txnInsert = db.prepare(`
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
    
    // May 2025 transactions
    txnInsert.run('TXN001', 'CL001', 'CUST001', 75000, 2625, 0.035, 72375, '2025-05-05', '2025-06-05', null, 'active', 'EMP003')
    txnInsert.run('TXN002', 'CL002', 'CUST002', 65000, 2730, 0.042, 62270, '2025-05-10', '2025-06-10', '2025-06-08', 'collected', 'EMP003')
    txnInsert.run('TXN003', 'CL003', 'CUST003', 85000, 3230, 0.038, 81770, '2025-05-15', '2025-06-15', null, 'active', 'EMP003')
    txnInsert.run('TXN004', 'CL001', 'CUST001', 55000, 1925, 0.035, 53075, '2025-05-20', '2025-06-20', null, 'active', 'EMP003')
    txnInsert.run('TXN005', 'CL004', 'CUST003', 42000, 1890, 0.045, 40110, '2025-05-25', '2025-06-25', null, 'active', 'EMP003')
    
    // April 2025 transactions
    txnInsert.run('TXN006', 'CL002', 'CUST002', 38000, 1596, 0.042, 36404, '2025-04-10', '2025-05-10', '2025-05-08', 'collected', 'EMP003')
    txnInsert.run('TXN007', 'CL005', 'CUST001', 62000, 1984, 0.032, 60016, '2025-04-15', '2025-05-15', '2025-05-12', 'collected', 'EMP003')
    
    const txnCount = db.prepare('SELECT COUNT(*) as count FROM factoring_transactions').get() as { count: number }
    const customerCount = db.prepare('SELECT COUNT(*) as count FROM client_customers').get() as { count: number }
    
    return NextResponse.json({
      success: true,
      message: 'Transactions added successfully',
      transactions: txnCount.count,
      customers: customerCount.count
    })
    
  } catch (error) {
    console.error('Transaction seeding error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}