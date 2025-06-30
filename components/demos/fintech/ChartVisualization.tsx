'use client'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts'
import { salesData } from '@/lib/mockData/techflowData'

interface ChartVisualizationProps {
  type: 'bar' | 'line' | 'area'
  data?: any
  locale?: string
}

// Datos para el gráfico de ventas mensuales
const monthlySalesData = [
  { month: 'Jul', sales: 46.2, label: 'Julio' },
  { month: 'Aug', sales: 45.9, label: 'Agosto' },
  { month: 'Sep', sales: 46.5, label: 'Septiembre' },
  { month: 'Oct', sales: 47.2, label: 'Octubre' },
  { month: 'Nov', sales: 46.8, label: 'Noviembre' },
  { month: 'Dec', sales: 48.5, label: 'Diciembre (proj)' }
]

// Datos para proyección Q1 2025
const projectionData = [
  { quarter: 'Q3 2024', actual: 138.6, projected: null },
  { quarter: 'Q4 2024', actual: 142.5, projected: null },
  { quarter: 'Q1 2025', actual: null, projected: 142.5 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value}M
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ChartVisualization({ type, data, locale = 'es' }: ChartVisualizationProps) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="sales" 
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        )
      
      case 'line':
        return (
          <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="quarter" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              name="Actual"
            />
            <Line 
              type="monotone" 
              dataKey="projected" 
              stroke="#f59e0b" 
              strokeWidth={3}
              strokeDasharray="10 5"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
              name="Proyección"
            />
          </LineChart>
        )
      
      case 'area':
        return (
          <AreaChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#areaGradient)"
            />
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mt-3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ResponsiveContainer width="100%" height={200}>
        {renderChart()}
      </ResponsiveContainer>
    </motion.div>
  )
}