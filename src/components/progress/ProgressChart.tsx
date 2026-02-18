'use client'

import { MilestoneTiming } from '@/types/progress.types'
import { useProgress } from '@/hooks/useProgress'

interface ProgressChartProps {
  timeline: MilestoneTiming[]
  height?: number
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  timeline,
  height = 200
}) => {
  const { getColor } = useProgress()

  if (timeline.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No timeline data available
      </div>
    )
  }

  // Sort by date
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.reachedAt).getTime() - new Date(b.reachedAt).getTime()
  )

  const maxValue = 100
  const minDate = new Date(sortedTimeline[0].reachedAt).getTime()
  const maxDate = new Date(sortedTimeline[sortedTimeline.length - 1].reachedAt).getTime()
  const dateRange = maxDate - minDate

  const points = sortedTimeline.map(point => {
    const x = ((new Date(point.reachedAt).getTime() - minDate) / dateRange) * 100
    const y = (point.value / maxValue) * 100
    return { x, y, ...point }
  })

  // Create SVG path
  const pathData = points.map((point, i) => {
    return `${i === 0 ? 'M' : 'L'} ${point.x} ${100 - point.y}`
  }).join(' ')

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
        <span>100%</span>
        <span>75%</span>
        <span>50%</span>
        <span>25%</span>
        <span>0%</span>
      </div>

      {/* Chart area */}
      <div className="ml-8 h-full relative">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {/* Horizontal grid lines */}
          {[0, 25, 50, 75, 100].map(level => (
            <line
              key={level}
              x1="0"
              y1={`${level}%`}
              x2="100%"
              y2={`${level}%`}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Progress line */}
          <path
            d={pathData}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={`${point.x}%`}
                cy={`${100 - point.y}%`}
                r="6"
                fill="white"
                stroke={getColor(point.value)}
                strokeWidth="2"
              />
              <circle
                cx={`${point.x}%`}
                cy={`${100 - point.y}%`}
                r="4"
                fill={getColor(point.value)}
              />
              
              {/* Tooltip on hover - simplified, would need proper tooltip component */}
              <title>{point.label} - {new Date(point.reachedAt).toLocaleDateString()}</title>
            </g>
          ))}
        </svg>

        {/* X-axis labels (simplified - show first, middle, last) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
          <span>{new Date(sortedTimeline[0].reachedAt).toLocaleDateString()}</span>
          {sortedTimeline.length > 2 && (
            <span>{new Date(sortedTimeline[Math.floor(sortedTimeline.length / 2)].reachedAt).toLocaleDateString()}</span>
          )}
          <span>{new Date(sortedTimeline[sortedTimeline.length - 1].reachedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}