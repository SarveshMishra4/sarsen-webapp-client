'use client';

import React, { useState } from 'react';
import type { ApiReportInterest } from './page';

interface ReportInterestTabProps {
  submissions: ApiReportInterest[];
}

// Helper to format date in Indian Standard Time (IST) — same pattern as ContactsTab
function formatIST(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formatted = date.toLocaleString('en-IN', options);

  let [datePart, timePart] = formatted.split(', ');
  if (!timePart) {
    timePart = '';
  }

  timePart = timePart.replace(/\b(am|pm)\b/i, (match) => match.toUpperCase());

  return `${datePart} - ${timePart}`;
}

export function ReportInterestTab({ submissions }: ReportInterestTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort by newest first
  const sortedSubmissions = [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-md p-4 shadow-sm border border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-800">{submissions.length}</span> total report
          requests
        </p>
      </div>

      {/* Submissions list */}
      <div className="space-y-4">
        {sortedSubmissions.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-sm">
            No report requests yet.
          </div>
        ) : (
          sortedSubmissions.map((submission) => (
            <div
              key={submission._id}
              className="rounded-md shadow-sm border border-gray-200 bg-white overflow-hidden"
            >
              {/* Header (always visible) */}
              <div
                className="p-6 cursor-pointer hover:bg-black/5 transition-colors flex justify-between items-start"
                onClick={() => toggleExpand(submission._id)}
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{submission.fullName}</h4>
                      <p className="text-sm text-gray-600">{submission.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {submission.describesYou}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {submission.businessStage} · {submission.uncertainty}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatIST(submission.createdAt)}
                  </p>
                </div>
                <div className="ml-4">
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedId === submission._id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded content */}
              {expandedId === submission._id && (
                <div className="border-t border-gray-100 p-6 bg-white/80 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-400 mb-1">Phone</h4>
                      <p className="text-sm text-gray-700">{submission.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-400 mb-1">Describes them as</h4>
                      <p className="text-sm text-gray-700">{submission.describesYou}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-400 mb-1">Business stage</h4>
                      <p className="text-sm text-gray-700">{submission.businessStage}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-400 mb-1">Biggest uncertainty</h4>
                      <p className="text-sm text-gray-700">{submission.uncertainty}</p>
                    </div>
                  </div>

                  {/* Reply via email button */}
                  <div className="pt-2 flex gap-3">
                    <a
                      href={`mailto:${submission.email}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Email Report
                    </a>
                    <a
                      href={`tel:${submission.phone}`}
                      className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Call
                    </a>
                  </div>

                  <div className="text-xs text-gray-400 pt-2">
                    Received: {formatIST(submission.createdAt)}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
