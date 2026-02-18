'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps
} from 'recharts'

export type ChartType = 'line' | 'bar' | 'area' | 'pie'

interface ChartProps {
  type: ChartType
  data: any[]
  xKey: string
  yKey?: string
  yKeys?: string[]
  colors?: string[]
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  tooltipFormatter?: (value: any) => string
  onClick?: (data: any) => void
}

const DEFAULT_COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6']

export const Chart: React.FC<ChartProps> = ({
  type,
  data,
  xKey,
  yKey,
  yKeys = [],
  colors = DEFAULT_COLORS,
  height = 300,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  tooltipFormatter,
  onClick
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            {showTooltip && (
              <Tooltip
                formatter={tooltipFormatter}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
            )}
            {showLegend && <Legend />}
            {yKeys.length > 0 ? (
              yKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))
            ) : yKey ? (
              <Line
                type="monotone"
                dataKey={yKey}
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ) : null}
          </LineChart>
        )

      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            {showTooltip && (
              <Tooltip
                formatter={tooltipFormatter}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
            )}
            {showLegend && <Legend />}
            {yKeys.length > 0 ? (
              yKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : yKey ? (
              <Bar
                dataKey={yKey}
                fill={colors[0]}
                radius={[4, 4, 0, 0]}
              />
            ) : null}
          </BarChart>
        )

      case 'area':
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            {showTooltip && (
              <Tooltip
                formatter={tooltipFormatter}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
            )}
            {showLegend && <Legend />}
            {yKeys.length > 0 ? (
              yKeys.map((key, index) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.1}
                />
              ))
            ) : yKey ? (
              <Area
                type="monotone"
                dataKey={yKey}
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.1}
              />
            ) : null}
          </AreaChart>
        )

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // FIX: Use PieLabelRenderProps type from recharts
              label={(entry: PieLabelRenderProps) => {
                // Safely access name with fallback to empty string
                return entry.name || ''
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onClick={onClick}
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip 
                formatter={tooltipFormatter}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
            )}
            {showLegend && <Legend />}
          </PieChart>
        )

      default:
        return null
    }
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  )
}