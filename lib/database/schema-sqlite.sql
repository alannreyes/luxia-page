-- TechFlow Factoring Database Schema (SQLite)
-- Startup factoring company founded Nov 2023

-- Company information
CREATE TABLE company_info (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL DEFAULT 'TechFlow Factoring',
    founded_date DATE NOT NULL DEFAULT '2023-11-15',
    headquarters TEXT DEFAULT 'Miami, FL',
    business_type TEXT DEFAULT 'Invoice Factoring',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Employees (started with 3, now 10)
CREATE TABLE employees (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    employee_id TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    commission_rate DECIMAL(5,4) DEFAULT 0,
    active BOOLEAN DEFAULT 1,
    manager_id TEXT REFERENCES employees(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Clients (SMBs that sell invoices to us)
CREATE TABLE clients (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    client_id TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'USA',
    credit_limit DECIMAL(12,2) DEFAULT 0,
    factoring_rate DECIMAL(5,4) NOT NULL, -- Our fee rate (1-5%)
    onboarded_date DATE NOT NULL,
    status TEXT DEFAULT 'active', -- active, inactive, suspended
    assigned_rep TEXT REFERENCES employees(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Their customers (who owe money on the invoices)
CREATE TABLE client_customers (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    customer_id TEXT UNIQUE NOT NULL,
    client_id TEXT REFERENCES clients(id),
    company_name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    credit_rating TEXT, -- AAA, AA, A, BBB, BB, B, CCC
    industry TEXT,
    payment_terms INTEGER DEFAULT 30, -- days
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Original invoices that clients want to factor
CREATE TABLE invoices (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    invoice_number TEXT NOT NULL,
    client_id TEXT REFERENCES clients(id),
    customer_id TEXT REFERENCES client_customers(id),
    invoice_amount DECIMAL(12,2) NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected, factored
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Our factoring transactions (when we buy invoices)
CREATE TABLE factoring_transactions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    transaction_id TEXT UNIQUE NOT NULL,
    invoice_id TEXT REFERENCES invoices(id),
    client_id TEXT REFERENCES clients(id),
    advance_amount DECIMAL(12,2) NOT NULL, -- Amount we pay upfront (80-90% of invoice)
    factoring_fee DECIMAL(10,2) NOT NULL, -- Our fee
    factoring_rate DECIMAL(5,4) NOT NULL, -- Rate used
    net_amount DECIMAL(12,2) NOT NULL, -- What client receives
    transaction_date DATE NOT NULL,
    expected_payment_date DATE NOT NULL,
    actual_payment_date DATE, -- When customer actually pays
    status TEXT DEFAULT 'active', -- active, collected, defaulted
    processed_by TEXT REFERENCES employees(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Payments from the end customers
CREATE TABLE customer_payments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    payment_id TEXT UNIQUE NOT NULL,
    factoring_transaction_id TEXT REFERENCES factoring_transactions(id),
    customer_id TEXT REFERENCES client_customers(id),
    payment_amount DECIMAL(12,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method TEXT, -- wire, ach, check
    reference_number TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Monthly performance metrics
CREATE TABLE monthly_metrics (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    total_volume DECIMAL(15,2) DEFAULT 0, -- Total invoice volume factored
    total_fees DECIMAL(12,2) DEFAULT 0, -- Our revenue
    active_clients INTEGER DEFAULT 0,
    new_clients INTEGER DEFAULT 0,
    transactions_count INTEGER DEFAULT 0,
    average_factoring_rate DECIMAL(5,4) DEFAULT 0,
    collection_rate DECIMAL(5,4) DEFAULT 0, -- % of invoices collected on time
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(month, year)
);

-- Sales targets and achievements
CREATE TABLE sales_performance (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    employee_id TEXT REFERENCES employees(id),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    target_volume DECIMAL(12,2) DEFAULT 0,
    actual_volume DECIMAL(12,2) DEFAULT 0,
    target_clients INTEGER DEFAULT 0,
    actual_clients INTEGER DEFAULT 0,
    commission_earned DECIMAL(10,2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(employee_id, month, year)
);

-- Create indexes for better performance
CREATE INDEX idx_employees_role ON employees(role);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_onboarded_date ON clients(onboarded_date);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_date ON invoices(invoice_date);
CREATE INDEX idx_factoring_transactions_date ON factoring_transactions(transaction_date);
CREATE INDEX idx_factoring_transactions_status ON factoring_transactions(status);
CREATE INDEX idx_monthly_metrics_date ON monthly_metrics(year, month);
CREATE INDEX idx_sales_performance_date ON sales_performance(year, month);

-- Insert company info
INSERT INTO company_info (name, founded_date, headquarters, business_type) 
VALUES ('TechFlow Factoring', '2023-11-15', 'Miami, FL', 'Invoice Factoring');