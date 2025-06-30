-- TechFlow Factoring Database Schema
-- Startup factoring company founded Nov 2023

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Company information
CREATE TABLE company_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL DEFAULT 'TechFlow Factoring',
    founded_date DATE NOT NULL DEFAULT '2023-11-15',
    headquarters VARCHAR(255) DEFAULT 'Miami, FL',
    business_type VARCHAR(100) DEFAULT 'Invoice Factoring',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees (started with 3, now 10)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    commission_rate DECIMAL(5,4) DEFAULT 0,
    active BOOLEAN DEFAULT true,
    manager_id UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients (SMBs that sell invoices to us)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id VARCHAR(20) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(100) DEFAULT 'USA',
    credit_limit DECIMAL(12,2) DEFAULT 0,
    factoring_rate DECIMAL(5,4) NOT NULL, -- Our fee rate (1-5%)
    onboarded_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
    assigned_rep UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Their customers (who owe money on the invoices)
CREATE TABLE client_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id VARCHAR(20) UNIQUE NOT NULL,
    client_id UUID REFERENCES clients(id),
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    credit_rating VARCHAR(10), -- AAA, AA, A, BBB, BB, B, CCC
    industry VARCHAR(100),
    payment_terms INTEGER DEFAULT 30, -- days
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Original invoices that clients want to factor
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) NOT NULL,
    client_id UUID REFERENCES clients(id),
    customer_id UUID REFERENCES client_customers(id),
    invoice_amount DECIMAL(12,2) NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, factored
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Our factoring transactions (when we buy invoices)
CREATE TABLE factoring_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id VARCHAR(30) UNIQUE NOT NULL,
    invoice_id UUID REFERENCES invoices(id),
    client_id UUID REFERENCES clients(id),
    advance_amount DECIMAL(12,2) NOT NULL, -- Amount we pay upfront (80-90% of invoice)
    factoring_fee DECIMAL(10,2) NOT NULL, -- Our fee
    factoring_rate DECIMAL(5,4) NOT NULL, -- Rate used
    net_amount DECIMAL(12,2) NOT NULL, -- What client receives
    transaction_date DATE NOT NULL,
    expected_payment_date DATE NOT NULL,
    actual_payment_date DATE, -- When customer actually pays
    status VARCHAR(50) DEFAULT 'active', -- active, collected, defaulted
    processed_by UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments from the end customers
CREATE TABLE customer_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id VARCHAR(30) UNIQUE NOT NULL,
    factoring_transaction_id UUID REFERENCES factoring_transactions(id),
    customer_id UUID REFERENCES client_customers(id),
    payment_amount DECIMAL(12,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50), -- wire, ach, check
    reference_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Monthly performance metrics
CREATE TABLE monthly_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    total_volume DECIMAL(15,2) DEFAULT 0, -- Total invoice volume factored
    total_fees DECIMAL(12,2) DEFAULT 0, -- Our revenue
    active_clients INTEGER DEFAULT 0,
    new_clients INTEGER DEFAULT 0,
    transactions_count INTEGER DEFAULT 0,
    average_factoring_rate DECIMAL(5,4) DEFAULT 0,
    collection_rate DECIMAL(5,4) DEFAULT 0, -- % of invoices collected on time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(month, year)
);

-- Sales targets and achievements
CREATE TABLE sales_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    target_volume DECIMAL(12,2) DEFAULT 0,
    actual_volume DECIMAL(12,2) DEFAULT 0,
    target_clients INTEGER DEFAULT 0,
    actual_clients INTEGER DEFAULT 0,
    commission_earned DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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