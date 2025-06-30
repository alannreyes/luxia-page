// Mock data for TechFlow Solutions - Fintech B2B Demo Company

export const companyInfo = {
  name: 'TechFlow Solutions',
  industry: 'Fintech B2B',
  founded: '2021',
  employees: 52,
  monthlyRevenue: 45000000, // $45M
  clients: 1247,
  description: 'Procesamiento de pagos para e-commerce en LATAM'
}

// Sales data with realistic variations
export const salesData = {
  2024: {
    enero: 42500000,
    febrero: 43800000,
    marzo: 44200000,
    abril: 43900000,
    mayo: 45100000,
    junio: 45800000,
    julio: 46200000,
    agosto: 45900000,
    septiembre: 46500000,
    octubre: 47200000,
    noviembre: 46800000,
    diciembre: 48500000
  },
  2023: {
    enero: 38000000,
    febrero: 38500000,
    marzo: 39200000,
    abril: 39800000,
    mayo: 40500000,
    junio: 41200000,
    julio: 41800000,
    agosto: 42100000,
    septiembre: 42500000,
    octubre: 42800000,
    noviembre: 43200000,
    diciembre: 44000000
  }
}

// Top sellers with performance metrics
export const topSellers = [
  {
    id: 1,
    name: 'María Rodriguez',
    photo: '/avatars/maria.jpg',
    role: 'Senior Sales Executive',
    region: 'México',
    currentQuarter: {
      sales: 4250000,
      deals: 23,
      conversion: 68,
      growth: 15
    },
    ytd: 38500000
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    photo: '/avatars/carlos.jpg',
    role: 'Sales Manager',
    region: 'Colombia',
    currentQuarter: {
      sales: 3980000,
      deals: 19,
      conversion: 72,
      growth: 22
    },
    ytd: 35200000
  },
  {
    id: 3,
    name: 'Ana Silva',
    photo: '/avatars/ana.jpg',
    role: 'Sales Executive',
    region: 'Brasil',
    currentQuarter: {
      sales: 3750000,
      deals: 21,
      conversion: 65,
      growth: 18
    },
    ytd: 33800000
  }
]

// Clients with payment status
export const clientsData = [
  {
    id: 'CL001',
    name: 'MercadoTech SA',
    industry: 'E-commerce',
    monthlyVolume: 1250000,
    status: 'active',
    paymentStatus: 'on-time',
    daysOverdue: 0,
    pendingAmount: 0
  },
  {
    id: 'CL002',
    name: 'FastCommerce Ltd',
    industry: 'Marketplace',
    monthlyVolume: 980000,
    status: 'active',
    paymentStatus: 'overdue',
    daysOverdue: 15,
    pendingAmount: 45000
  },
  {
    id: 'CL003',
    name: 'Digital Store Corp',
    industry: 'Retail Tech',
    monthlyVolume: 750000,
    status: 'active',
    paymentStatus: 'overdue',
    daysOverdue: 8,
    pendingAmount: 22000
  }
]

// Product lines
export const products = [
  {
    name: 'Payment Processing',
    revenue: 32000000,
    growth: 18,
    clients: 987
  },
  {
    name: 'SaaS Platform',
    revenue: 8500000,
    growth: 45,
    clients: 234
  },
  {
    name: 'Premium Support',
    revenue: 4500000,
    growth: 12,
    clients: 89
  }
]

// Predefined intelligent responses
export const aiResponses = {
  sales: {
    octubre: {
      text: "Las ventas de octubre fueron de $47.2M, representando un incremento del 2.8% respecto a septiembre y un crecimiento YoY del 10.3% comparado con octubre 2023.",
      showChart: true,
      chartType: 'bar',
      metrics: [
        { label: 'Total Octubre', value: '$47.2M', change: '+2.8%' },
        { label: 'vs Año Anterior', value: '+10.3%', positive: true },
        { label: 'Transacciones', value: '125.4K', change: '+5.2%' }
      ]
    }
  },
  sellers: {
    best: {
      text: "María Rodriguez lidera el trimestre con $4.25M en ventas, 23 deals cerrados y una tasa de conversión del 68%. Ha mostrado un crecimiento del 15% vs Q3.",
      showRanking: true,
      topPerformer: topSellers[0]
    }
  },
  projections: {
    q1_2025: {
      text: "Basado en las tendencias actuales y factores estacionales, proyectamos $142.5M para Q1 2025, un crecimiento del 8.5% YoY. Factores clave: expansión en Brasil (+15%) y nuevos productos SaaS.",
      showChart: true,
      chartType: 'line',
      projection: {
        q1_2025: 142500000,
        confidence: 85,
        factors: ['Expansión Brasil', 'Nuevos productos', 'Temporada alta e-commerce']
      }
    }
  },
  payments: {
    overdue: {
      text: "Hay 2 clientes con pagos pendientes por un total de $67,000. FastCommerce Ltd tiene 15 días de retraso ($45K) y Digital Store Corp 8 días ($22K).",
      showList: true,
      totalOverdue: 67000,
      clients: clientsData.filter(c => c.paymentStatus === 'overdue')
    }
  }
}