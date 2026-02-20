import { TrendDataPoint } from '@/types/dashboard.types'

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format compact number (1K, 1M, 1B)
export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Calculate percentage change
export const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return Number(((current - previous) / previous * 100).toFixed(1))
}

// Get trend direction
export const getTrendDirection = (change: number): 'up' | 'down' | 'stable' => {
  if (change > 0) return 'up'
  if (change < 0) return 'down'
  return 'stable'
}

// Get trend color
export const getTrendColor = (change: number, invert: boolean = false): string => {
  const isPositive = invert ? change < 0 : change > 0
  if (isPositive) return 'text-green-600'
  if (change < 0) return 'text-red-600'
  return 'text-gray-600'
}

// Get trend icon
export const getTrendIcon = (change: number): string => {
  if (change > 0) return '↑'
  if (change < 0) return '↓'
  return '→'
}

// Calculate moving average
export const calculateMovingAverage = (data: TrendDataPoint[], window: number = 7): TrendDataPoint[] => {
  const result: TrendDataPoint[] = []
  
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - window + 1)
    const end = i + 1
    const slice = data.slice(start, end)
    const sum = slice.reduce((acc, point) => acc + point.value, 0)
    const avg = sum / slice.length
    
    result.push({
      date: data[i].date,
      value: Number(avg.toFixed(1))
    })
  }
  
  return result
}

// Format date for display
export const formatChartDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Group data by month
export const groupByMonth = (data: TrendDataPoint[]): TrendDataPoint[] => {
  const grouped: Record<string, number> = {}
  
  data.forEach(point => {
    const date = new Date(point.date)
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
    grouped[monthKey] = (grouped[monthKey] || 0) + point.value
  })
  
  return Object.entries(grouped).map(([key, value]) => ({
    date: key,
    value
  })).sort((a, b) => a.date.localeCompare(b.date))
}