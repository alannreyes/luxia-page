-- COMPLETE TechFlow Factoring Database Schema
-- Realistic invoice factoring startup with comprehensive business data

-- 1. ORGANIZATION STRUCTURE
CREATE TABLE departments (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    description TEXT,
    head_employee_id TEXT,
    budget_annual DECIMAL(12,2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE positions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    title TEXT NOT NULL,
    department_id TEXT REFERENCES departments(id),
    level TEXT, -- entry, mid, senior, director, vp, c-level
    min_salary DECIMAL(10,2),
    max_salary DECIMAL(10,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced employees table
CREATE TABLE employees_complete (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    employee_id TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    position_id TEXT REFERENCES positions(id),
    department_id TEXT REFERENCES departments(id),
    manager_id TEXT REFERENCES employees_complete(id),
    hire_date DATE NOT NULL,
    termination_date DATE,
    salary DECIMAL(10,2),
    commission_rate DECIMAL(5,4) DEFAULT 0,
    equity_percentage DECIMAL(5,4) DEFAULT 0,
    performance_rating DECIMAL(3,2), -- 1.0 to 5.0
    active BOOLEAN DEFAULT 1,
    address TEXT,
    city TEXT,
    state TEXT DEFAULT 'FL',
    zip_code TEXT,
    emergency_contact TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. SALES PIPELINE & PROSPECTS
CREATE TABLE lead_sources (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL, -- 'Website', 'Referral', 'Cold Outreach', 'LinkedIn', 'Trade Show'
    cost_per_lead DECIMAL(8,2) DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    active BOOLEAN DEFAULT 1
);

CREATE TABLE prospects (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    prospect_id TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    contact_person TEXT,
    title TEXT,
    email TEXT,
    phone TEXT,
    industry TEXT,
    company_size TEXT, -- 'micro', 'small', 'medium'
    annual_revenue DECIMAL(12,2),
    lead_source_id TEXT REFERENCES lead_sources(id),
    assigned_rep_id TEXT REFERENCES employees_complete(id),
    stage TEXT DEFAULT 'new', -- new, qualified, proposal, negotiation, closed-won, closed-lost
    probability INTEGER DEFAULT 20, -- 0-100
    estimated_value DECIMAL(10,2),
    estimated_close_date DATE,
    last_contact_date DATE,
    next_follow_up_date DATE,
    pain_points TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Track all sales activities
CREATE TABLE sales_activities (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    prospect_id TEXT REFERENCES prospects(id),
    client_id TEXT REFERENCES clients(id),
    employee_id TEXT REFERENCES employees_complete(id),
    activity_type TEXT NOT NULL, -- 'call', 'email', 'meeting', 'demo', 'proposal'
    subject TEXT,
    description TEXT,
    outcome TEXT, -- 'positive', 'neutral', 'negative', 'no-contact'
    next_action TEXT,
    activity_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. FINANCIAL MANAGEMENT
CREATE TABLE expense_categories (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    parent_category_id TEXT REFERENCES expense_categories(id),
    budget_monthly DECIMAL(10,2) DEFAULT 0,
    is_variable BOOLEAN DEFAULT 0
);

CREATE TABLE expenses (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    expense_id TEXT UNIQUE NOT NULL,
    category_id TEXT REFERENCES expense_categories(id),
    employee_id TEXT REFERENCES employees_complete(id),
    vendor_name TEXT,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    expense_date DATE NOT NULL,
    payment_method TEXT, -- 'corporate-card', 'cash', 'check', 'wire'
    status TEXT DEFAULT 'pending', -- pending, approved, paid, rejected
    receipt_url TEXT,
    approved_by TEXT REFERENCES employees_complete(id),
    department_id TEXT REFERENCES departments(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Revenue recognition
CREATE TABLE revenue_streams (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    description TEXT,
    revenue_type TEXT, -- 'factoring-fee', 'late-fee', 'service-fee', 'interest'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. RISK MANAGEMENT & COMPLIANCE
CREATE TABLE credit_checks (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    client_id TEXT REFERENCES clients(id),
    customer_id TEXT REFERENCES client_customers(id),
    check_type TEXT, -- 'initial', 'annual', 'triggered'
    credit_bureau TEXT, -- 'Experian', 'Equifax', 'Dun & Bradstreet'
    credit_score INTEGER,
    credit_rating TEXT,
    credit_limit_recommended DECIMAL(12,2),
    risk_level TEXT, -- 'low', 'medium', 'high'
    checked_by TEXT REFERENCES employees_complete(id),
    check_date DATE NOT NULL,
    cost DECIMAL(6,2),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compliance_requirements (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    requirement_type TEXT NOT NULL, -- 'KYC', 'AML', 'SOX', 'PCI'
    description TEXT,
    frequency TEXT, -- 'one-time', 'annual', 'quarterly', 'monthly'
    due_date DATE,
    responsible_employee_id TEXT REFERENCES employees_complete(id),
    status TEXT DEFAULT 'pending', -- pending, in-progress, completed, overdue
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. CUSTOMER SUCCESS & SUPPORT
CREATE TABLE support_tickets (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    ticket_id TEXT UNIQUE NOT NULL,
    client_id TEXT REFERENCES clients(id),
    assigned_to TEXT REFERENCES employees_complete(id),
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    category TEXT, -- 'billing', 'technical', 'onboarding', 'compliance'
    subject TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'open', -- open, in-progress, resolved, closed
    resolution TEXT,
    first_response_time_hours INTEGER,
    resolution_time_hours INTEGER,
    satisfaction_score INTEGER, -- 1-5
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME
);

-- 6. MARKETING & GROWTH
CREATE TABLE marketing_campaigns (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    campaign_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    channel TEXT, -- 'google-ads', 'linkedin', 'email', 'content', 'referral'
    budget DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    target_audience TEXT,
    leads_generated INTEGER DEFAULT 0,
    cost_per_lead DECIMAL(8,2),
    conversion_rate DECIMAL(5,4),
    roi DECIMAL(8,4),
    status TEXT DEFAULT 'planning', -- planning, active, paused, completed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. OPERATIONAL METRICS
CREATE TABLE daily_operations (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    date DATE NOT NULL,
    applications_received INTEGER DEFAULT 0,
    applications_approved INTEGER DEFAULT 0,
    applications_rejected INTEGER DEFAULT 0,
    average_approval_time_hours DECIMAL(6,2),
    volume_factored DECIMAL(12,2) DEFAULT 0,
    fees_collected DECIMAL(10,2) DEFAULT 0,
    new_clients_onboarded INTEGER DEFAULT 0,
    support_tickets_opened INTEGER DEFAULT 0,
    support_tickets_closed INTEGER DEFAULT 0,
    website_visitors INTEGER DEFAULT 0,
    leads_generated INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date)
);

-- Enhanced invoice and transaction tables
CREATE TABLE invoices_enhanced (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    invoice_number TEXT NOT NULL,
    client_id TEXT REFERENCES clients(id),
    customer_id TEXT REFERENCES client_customers(id),
    invoice_amount DECIMAL(12,2) NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    service_description TEXT,
    purchase_order_number TEXT,
    industry_sector TEXT,
    payment_terms INTEGER DEFAULT 30,
    late_fee_rate DECIMAL(5,4) DEFAULT 0.015,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected, factored, defaulted
    risk_score INTEGER, -- 1-100
    approval_notes TEXT,
    approved_by TEXT REFERENCES employees_complete(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. COMPETITIVE INTELLIGENCE
CREATE TABLE competitors (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name TEXT NOT NULL,
    website TEXT,
    market_segment TEXT,
    estimated_volume DECIMAL(15,2),
    typical_rates_min DECIMAL(5,4),
    typical_rates_max DECIMAL(5,4),
    strengths TEXT,
    weaknesses TEXT,
    last_analyzed DATE,
    threat_level TEXT -- low, medium, high
);

-- Create indexes for performance
CREATE INDEX idx_employees_dept ON employees_complete(department_id);
CREATE INDEX idx_prospects_stage ON prospects(stage);
CREATE INDEX idx_prospects_rep ON prospects(assigned_rep_id);
CREATE INDEX idx_sales_activities_date ON sales_activities(activity_date);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_category ON expenses(category_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_daily_ops_date ON daily_operations(date);

-- Initial reference data
INSERT INTO departments (name, description, budget_annual) VALUES
('Executive', 'C-Level leadership', 500000),
('Sales', 'Revenue generation and client acquisition', 800000),
('Operations', 'Client onboarding and transaction processing', 600000),
('Underwriting', 'Risk assessment and credit analysis', 400000),
('Customer Success', 'Client retention and support', 300000),
('Finance', 'Financial management and compliance', 350000),
('Marketing', 'Lead generation and brand building', 250000),
('Technology', 'Platform development and IT infrastructure', 450000);

INSERT INTO lead_sources (name, cost_per_lead, conversion_rate) VALUES
('Website Organic', 0, 0.15),
('Google Ads', 45, 0.12),
('LinkedIn Outreach', 25, 0.18),
('Referrals', 5, 0.35),
('Industry Events', 120, 0.22),
('Cold Email', 8, 0.08);

INSERT INTO expense_categories (name, budget_monthly, is_variable) VALUES
('Salaries & Benefits', 85000, 0),
('Office Rent', 8500, 0),
('Software & Technology', 12000, 1),
('Marketing & Advertising', 15000, 1),
('Legal & Compliance', 5000, 1),
('Travel & Entertainment', 3000, 1),
('Utilities', 800, 0),
('Insurance', 2500, 0);