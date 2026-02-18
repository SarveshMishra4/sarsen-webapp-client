'use client'

import { FeedbackStats as StatsType } from '@/types/feedback.types'
import { getRatingColor } from '@/utils/feedback.utils'

interface FeedbackStatsProps {
  stats: StatsType
}

export const FeedbackStats: React.FC<FeedbackStatsProps> = ({ stats }) => {
  const ratingOrder: (1 | 2 | 3 | 4 | 5)[] = [5, 4, 3, 2, 1]

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900">
          {stats.averageRating.toFixed(1)}
        </div>
        <div className="text-sm text-gray-500 mt-1">out of 5</div>
        <div className="mt-2 text-sm text-gray-600">
          Based on {stats.totalCount} review{stats.totalCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {ratingOrder.map((rating) => {
          const count = stats.ratingDistribution[rating] || 0
          const percentage = stats.totalCount > 0
            ? Math.round((count / stats.totalCount) * 100)
            : 0

          return (
            <div key={rating} className="flex items-center text-sm">
              <div className="w-12 font-medium">{rating} star</div>
              <div className="flex-1 mx-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getRatingColor(rating).replace('text', 'bg')}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-right text-gray-600">{percentage}%</div>
            </div>
          )
        })}
      </div>

      {/* Recommendation Rates */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.recommendRate}%
          </div>
          <div className="text-sm text-gray-500">Would Recommend</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.wouldUseAgainRate}%
          </div>
          <div className="text-sm text-gray-500">Would Use Again</div>
        </div>
      </div>

      {/* Category Ratings */}
      {(stats.averageCommunication !== undefined ||
        stats.averageQuality !== undefined ||
        stats.averageTimeliness !== undefined ||
        stats.averageValue !== undefined) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Category Ratings</h4>
          <div className="space-y-2">
            {stats.averageCommunication !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Communication</span>
                <span className="font-medium">{stats.averageCommunication.toFixed(1)}/5</span>
              </div>
            )}
            {stats.averageQuality !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quality</span>
                <span className="font-medium">{stats.averageQuality.toFixed(1)}/5</span>
              </div>
            )}
            {stats.averageTimeliness !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Timeliness</span>
                <span className="font-medium">{stats.averageTimeliness.toFixed(1)}/5</span>
              </div>
            )}
            {stats.averageValue !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Value</span>
                <span className="font-medium">{stats.averageValue.toFixed(1)}/5</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Common Praises */}
      {stats.commonPraises.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">What Clients Loved</h4>
          <div className="space-y-2">
            {stats.commonPraises.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm text-gray-600 flex-1">{item.text}</span>
                <span className="text-xs text-gray-400 ml-2">({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Improvements */}
      {stats.commonImprovements.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Suggestions for Improvement</h4>
          <div className="space-y-2">
            {stats.commonImprovements.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-amber-500 mr-2">!</span>
                <span className="text-sm text-gray-600 flex-1">{item.text}</span>
                <span className="text-xs text-gray-400 ml-2">({item.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}