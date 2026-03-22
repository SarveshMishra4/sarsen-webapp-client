'use client';

import React from 'react';
import type { ApiEngagement, ApiContact, ApiFeedback, ApiSubscriber } from './page';

interface OverviewTabProps {
  engagements: ApiEngagement[];
  contacts: ApiContact[];
  feedback: ApiFeedback[];
  subscribers: ApiSubscriber[];
}

export function OverviewTab({ engagements, contacts, feedback, subscribers }: OverviewTabProps) {
  const activeEngagements  = engagements.filter(e => e.status === 'active').length;
  const deliveredCount     = engagements.filter(e => e.status === 'delivered').length;
  const newContactCount    = contacts.filter(c => c.status === 'new').length;
  const avgRating = feedback.length > 0
    ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
    : '—';

  const stats = [
    {
      title: 'Active Engagements',
      value: activeEngagements,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-blue-500',
      sub: `${deliveredCount} delivered · ${engagements.length} total`,
    },
    {
      title: 'New Contact Enquiries',
      value: newContactCount,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-orange-500',
      sub: `${contacts.length} total submissions`,
    },
    {
      title: 'Avg Feedback Rating',
      value: avgRating,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'bg-yellow-500',
      sub: `${feedback.length} review${feedback.length !== 1 ? 's' : ''} received`,
    },
    {
      title: 'Newsletter Subscribers',
      value: subscribers.length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-purple-500',
      sub: 'Total active subscribers',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid — matches original card layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>{stat.icon}</div>
              <span className="text-3xl font-light text-gray-800">{stat.value}</span>
            </div>
            <h3 className="text-gray-700 text-sm font-medium mb-0.5">{stat.title}</h3>
            <p className="text-xs text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity — matches original two-column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Engagements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Recent Engagements</h3>
          {engagements.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No engagements yet.</p>
          ) : (
            <div className="space-y-3">
              {engagements.slice(0, 5).map(e => (
                <div key={e._id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-800 text-sm truncate">{e.userId?.email ?? '—'}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                      e.status === 'delivered' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {e.status === 'delivered' ? 'Delivered' : 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{e.serviceId?.title ?? '—'}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#0A1E3D] rounded-full h-1.5" style={{ width: `${e.progressPercent}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{Math.round(e.progressPercent)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Recent Contact Messages</h3>
          {contacts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No contact messages yet.</p>
          ) : (
            <div className="space-y-3">
              {contacts.slice(0, 5).map(c => (
                <div key={c._id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800 text-sm">{c.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      c.status === 'new' ? 'bg-red-100 text-red-700' :
                      c.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {c.status === 'in_progress' ? 'in progress' : c.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Feedback */}
      {feedback.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Recent Feedback</h3>
          <div className="space-y-3">
            {feedback.slice(0, 5).map(f => (
              <div key={f._id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-800">{f.userId?.email ?? '—'}</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="w-4 h-4" fill={s <= f.rating ? '#F59E0B' : 'none'} stroke={s <= f.rating ? '#F59E0B' : '#D1D5DB'} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                </div>
                {f.comments && <p className="text-sm text-gray-500 ">"{f.comments}"</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}