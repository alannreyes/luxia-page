// Access Control for TechFlow Factoring AI Assistant

export interface UserRole {
  id: string
  name: string
  level: 'employee' | 'manager' | 'director' | 'executive' | 'admin'
  permissions: string[]
}

export const ROLES: { [key: string]: UserRole } = {
  employee: {
    id: 'employee',
    name: 'Employee',
    level: 'employee',
    permissions: [
      'view_basic_metrics',
      'view_client_list',
      'view_own_performance',
      'view_public_company_info'
    ]
  },
  sales_rep: {
    id: 'sales_rep', 
    name: 'Sales Representative',
    level: 'employee',
    permissions: [
      'view_basic_metrics',
      'view_client_list',
      'view_prospects',
      'view_sales_pipeline',
      'view_own_performance',
      'view_sales_team_performance'
    ]
  },
  manager: {
    id: 'manager',
    name: 'Manager',
    level: 'manager', 
    permissions: [
      'view_basic_metrics',
      'view_client_list',
      'view_prospects',
      'view_sales_pipeline',
      'view_team_performance',
      'view_department_budget',
      'view_client_profitability',
      'view_employee_names_titles'
    ]
  },
  director: {
    id: 'director',
    name: 'Director',
    level: 'director',
    permissions: [
      'view_basic_metrics',
      'view_client_list',
      'view_prospects', 
      'view_sales_pipeline',
      'view_team_performance',
      'view_department_budget',
      'view_client_profitability',
      'view_employee_names_titles',
      'view_salary_ranges',
      'view_financial_statements',
      'view_expense_details',
      'view_compliance_reports'
    ]
  },
  executive: {
    id: 'executive',
    name: 'Executive (C-Level)',
    level: 'executive',
    permissions: [
      'view_all_data',
      'view_employee_salaries',
      'view_employee_addresses',
      'view_equity_information',
      'view_board_materials',
      'view_investor_reports',
      'view_competitive_intelligence',
      'view_strategic_plans',
      'view_audit_logs'
    ]
  }
}

export interface DataClassification {
  level: 'public' | 'internal' | 'confidential' | 'restricted'
  requiredPermissions: string[]
  description: string
}

export const DATA_CLASSIFICATIONS: { [key: string]: DataClassification } = {
  // Public data
  company_basic_info: {
    level: 'public',
    requiredPermissions: ['view_public_company_info'],
    description: 'Company name, founding date, basic business model'
  },
  client_count: {
    level: 'public', 
    requiredPermissions: ['view_basic_metrics'],
    description: 'Total number of clients (aggregate only)'
  },
  
  // Internal data
  employee_names_titles: {
    level: 'internal',
    requiredPermissions: ['view_employee_names_titles'],
    description: 'Employee names, titles, departments'
  },
  client_names: {
    level: 'internal',
    requiredPermissions: ['view_client_list'],
    description: 'Client company names and basic information'
  },
  sales_metrics: {
    level: 'internal',
    requiredPermissions: ['view_basic_metrics'],
    description: 'Revenue, transaction volumes, growth metrics'
  },
  
  // Confidential data
  employee_salaries: {
    level: 'confidential',
    requiredPermissions: ['view_employee_salaries'],
    description: 'Individual employee compensation details'
  },
  salary_ranges: {
    level: 'confidential',
    requiredPermissions: ['view_salary_ranges'],
    description: 'Salary bands and compensation structure'
  },
  expense_details: {
    level: 'confidential',
    requiredPermissions: ['view_expense_details'],
    description: 'Detailed expense breakdowns and vendor information'
  },
  client_profitability: {
    level: 'confidential',
    requiredPermissions: ['view_client_profitability'],
    description: 'Individual client revenue and profit margins'
  },
  
  // Restricted data
  employee_addresses: {
    level: 'restricted',
    requiredPermissions: ['view_employee_addresses'],
    description: 'Employee home addresses and personal contact info'
  },
  equity_information: {
    level: 'restricted',
    requiredPermissions: ['view_equity_information'],
    description: 'Employee equity stakes and ownership details'
  },
  competitive_intelligence: {
    level: 'restricted',
    requiredPermissions: ['view_competitive_intelligence'],
    description: 'Competitor analysis and strategic information'
  }
}

export function checkDataAccess(userRole: string, dataType: string): {
  allowed: boolean
  reason?: string
  suggestedAlternative?: string
} {
  const role = ROLES[userRole]
  const dataClass = DATA_CLASSIFICATIONS[dataType]
  
  if (!role) {
    return { 
      allowed: false, 
      reason: 'Invalid user role' 
    }
  }
  
  if (!dataClass) {
    return { 
      allowed: false, 
      reason: 'Unknown data classification' 
    }
  }
  
  // Check if user has required permissions
  const hasPermission = dataClass.requiredPermissions.some(permission => 
    role.permissions.includes(permission) || role.permissions.includes('view_all_data')
  )
  
  if (hasPermission) {
    return { allowed: true }
  }
  
  // Provide helpful alternatives
  let suggestedAlternative = ''
  switch (dataClass.level) {
    case 'confidential':
      suggestedAlternative = 'Try asking for aggregate metrics or contact your manager for detailed information.'
      break
    case 'restricted':
      suggestedAlternative = 'This information requires executive approval. Please contact leadership.'
      break
    default:
      suggestedAlternative = 'You may need higher access privileges to view this information.'
  }
  
  return {
    allowed: false,
    reason: `Access denied: ${dataClass.level} data requires ${dataClass.requiredPermissions.join(' or ')} permission`,
    suggestedAlternative
  }
}

export function sanitizeQuery(sql: string, userRole: string): {
  sanitizedSQL: string
  modifications: string[]
} {
  const role = ROLES[userRole]
  const modifications: string[] = []
  let sanitizedSQL = sql
  
  // Remove sensitive columns based on role
  if (!role.permissions.includes('view_employee_salaries') && !role.permissions.includes('view_all_data')) {
    if (sql.toLowerCase().includes('salary') || sql.toLowerCase().includes('commission_rate')) {
      modifications.push('Salary information removed (confidential)')
      sanitizedSQL = sanitizedSQL.replace(/,?\s*salary\s*,?/gi, '')
      sanitizedSQL = sanitizedSQL.replace(/,?\s*commission_rate\s*,?/gi, '')
    }
  }
  
  if (!role.permissions.includes('view_employee_addresses') && !role.permissions.includes('view_all_data')) {
    if (sql.toLowerCase().includes('address') || sql.toLowerCase().includes('phone')) {
      modifications.push('Personal contact information removed (restricted)')
      sanitizedSQL = sanitizedSQL.replace(/,?\s*address\s*,?/gi, '')
      sanitizedSQL = sanitizedSQL.replace(/,?\s*phone\s*,?/gi, '')
    }
  }
  
  if (!role.permissions.includes('view_equity_information') && !role.permissions.includes('view_all_data')) {
    if (sql.toLowerCase().includes('equity')) {
      modifications.push('Equity information removed (restricted)')
      sanitizedSQL = sanitizedSQL.replace(/,?\s*equity_percentage\s*,?/gi, '')
    }
  }
  
  return { sanitizedSQL, modifications }
}

// Simulated current user (in real app, this would come from auth)
export function getCurrentUser(): { role: string; name: string; level: string } {
  // For demo purposes, we'll rotate between different roles
  const users = [
    { role: 'sales_rep', name: 'Demo Sales Rep', level: 'employee' },
    { role: 'manager', name: 'Demo Manager', level: 'manager' },
    { role: 'director', name: 'Demo Director', level: 'director' },
    { role: 'executive', name: 'Demo Executive', level: 'executive' }
  ]
  
  // Return a different user based on timestamp (for demo variety)
  const index = Math.floor(Date.now() / 30000) % users.length
  return users[index]
}