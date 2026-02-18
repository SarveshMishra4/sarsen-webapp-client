'use client'

import { DashboardTrends } from '@/types/dashboard.types'
import { Chart } from '@/components/dashboard/Chart'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { formatChartDate, groupByMonth, formatCurrency } from '@/utils/dashboard.utils'
import { useState } from 'react'

interface RevenueChartProps {
  trends: DashboardTrends | null
  isLoading?: boolean
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  trends,
  isLoading = false
}) => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar')

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse" />
        </CardHeader>
        <CardBody>
          <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
        </CardBody>
      </Card>
    )
  }

  if (!trends) {
    return (
      <Card>
        <CardBody>
          <p className="text-gray-500 text-center py-12">No revenue data available</p>
        </CardBody>
      </Card>
    )
  }

  const getChartData = () => {
    let data = [...trends.revenue]
    
    switch (timeRange) {
      case 'monthly':
        data = groupByMonth(data)
        break
      case 'weekly':
        // Group by week (simplified - group every 7 days)
        const weekly: any[] = []
        for (let i = 0; i < data.length; i += 7) {
          const week = data.slice(i, i + 7)
          const total = week.reduce((sum, d) => sum + d.value, 0)
          weekly.push({
            date: `Week ${Math.floor(i / 7) + 1}`,
            value: total
          })
        }
        data = weekly
        break
    }

    return data.map(d => ({
      ...d,
      date: timeRange === 'daily' ? formatChartDate(d.date) : d.date
    }))
  }

  const chartData = getChartData()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">Revenue Trends</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="bar" onValueChange={(v) => setChartType(v as any)}>
            <TabsList>
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="line">Line</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="daily" onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardBody>
        <Chart
          type={chartType}
          data={chartData}
          xKey="date"
          yKey="value"
          height={300}
          tooltipFormatter={(value) => formatCurrency(value)}
        />
      </CardBody>
    </Card>
  )
}