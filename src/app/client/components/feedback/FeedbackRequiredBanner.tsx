'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface FeedbackRequiredBannerProps {
  engagementId: string
  engagementName: string
}

export const FeedbackRequiredBanner: React.FC<FeedbackRequiredBannerProps> = ({
  engagementId,
  engagementName
}) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-sm font-medium text-yellow-800">
              Feedback Required
            </h3>
          </div>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              The engagement <span className="font-medium">{engagementName}</span> is complete.
              Please provide your feedback to continue accessing the dashboard.
            </p>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <Link href={`/client/feedback/${engagementId}`}>
            <Button variant="primary" size="sm">
              Give Feedback
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}