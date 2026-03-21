'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/services/api';
import type { ApiContact } from './page';

interface ContactsTabProps {
  contacts: ApiContact[];
  setContacts: React.Dispatch<React.SetStateAction<ApiContact[]>>;
  token: string;
}

// Display names for each status
const STATUS_DISPLAY: Record<string, string> = {
  new:         'Pending',
  in_progress: 'In Progress',
  resolved:    'Responded',
  ignored:     'Ignored',
};

// Badge colors (kept distinct for visibility)
const BADGE_COLORS: Record<string, string> = {
  new:         'bg-gray-300 text-gray-700',
  in_progress: 'bg-yellow-300 text-yellow-800',
  resolved:    'bg-orange-300 text-orange-800',
  ignored:     'bg-blue-300 text-blue-800',
};

// Card background & border colors per status
const CARD_STYLES: Record<string, string> = {
  new:         'bg-white border-gray-200',
  in_progress: 'bg-yellow-50 border-yellow-200',
  resolved:    'bg-orange-50 border-orange-200',
  ignored:     'bg-blue-50 border-blue-200',
};

// Helper to format date in Indian Standard Time (IST) with custom format
function formatIST(dateString: string): string {
  const date = new Date(dateString);
  
  // Get the date parts in IST using toLocaleString
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
  
  // 'en-IN' produces something like "13 Mar 2026, 12:21:14 pm"
  // We'll split it to remove the comma and capitalize AM/PM
  let [datePart, timePart] = formatted.split(', ');
  if (!timePart) {
    // fallback if no comma found
    timePart = '';
  }
  
  // Capitalize AM/PM (convert "pm" to "PM", "am" to "AM")
  timePart = timePart.replace(/\b(am|pm)\b/i, (match) => match.toUpperCase());
  
  // Return with dash between date and time
  return `${datePart} - ${timePart}`;
}

export function ContactsTab({ contacts, setContacts, token }: ContactsTabProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'in_progress' | 'resolved' | 'ignored'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState('');

  // Sort by newest first
  const sortedContacts = [...contacts].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredMessages =
    filterStatus === 'all'
      ? sortedContacts
      : sortedContacts.filter(m => m.status === filterStatus);

  const updateStatus = async (id: string, status: ApiContact['status']) => {
    setStatusLoading(true);
    setError('');
    try {
      await apiRequest('PATCH', `/contact/admin/${id}/status`, { body: { status }, token });
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    } catch (err: any) {
      setError(err.message ?? 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'new', label: 'Pending' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'resolved', label: 'Responded' },
          { key: 'ignored', label: 'Ignored' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
            {key !== 'all' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({contacts.filter(c => c.status === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Contact list */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-sm">
            No messages in this category.
          </div>
        ) : (
          filteredMessages.map(contact => {
            const cardStyle = CARD_STYLES[contact.status] || 'bg-white border-gray-200';
            return (
              <div
                key={contact._id}
                className={`rounded-xl shadow-sm border overflow-hidden ${cardStyle}`}
              >
                {/* Header (always visible) */}
                <div
                  className="p-6 cursor-pointer hover:bg-black/5 transition-colors flex justify-between items-start"
                  onClick={() => toggleExpand(contact._id)}
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${BADGE_COLORS[contact.status]}`}
                      >
                        {STATUS_DISPLAY[contact.status] ?? contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{contact.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatIST(contact.createdAt)}
                    </p>
                  </div>
                  <div className="ml-4">
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedId === contact._id ? 'rotate-180' : ''
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
                {expandedId === contact._id && (
                  <div className="border-t border-gray-100 p-6 bg-white/80 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {contact.message}
                      </p>
                    </div>

                    {/* Status buttons */}
                    <div className="pt-4">
                      <p className="text-xs text-gray-400 mb-2">Change status:</p>
                      <div className="flex gap-2 flex-wrap">
                        {(['new', 'in_progress', 'resolved', 'ignored'] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(contact._id, s)}
                            disabled={statusLoading || contact.status === s}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-50 ${
                              contact.status === s
                                ? `${BADGE_COLORS[s]} border-current`
                                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {STATUS_DISPLAY[s]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reply via email button */}
                    <div className="pt-2">
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reply via Email
                      </a>
                    </div>

                    <div className="text-xs text-gray-400 pt-2">
                      Received: {formatIST(contact.createdAt)}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}