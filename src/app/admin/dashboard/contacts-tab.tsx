'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/services/api';
import type { ApiContact } from './page';

interface ContactsTabProps {
  contacts: ApiContact[];
  setContacts: React.Dispatch<React.SetStateAction<ApiContact[]>>;
  token: string;
}

const STATUS_DISPLAY: Record<string, string> = {
  new:         'new',
  in_progress: 'in progress',
  resolved:    'responded',
  ignored:     'ignored',
};

const STATUS_COLORS: Record<string, string> = {
  new:         'bg-red-100 text-red-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved:    'bg-green-100 text-green-700',
  ignored:     'bg-gray-100 text-gray-700',
};

export function ContactsTab({ contacts, setContacts, token }: ContactsTabProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'in_progress' | 'resolved' | 'ignored'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState('');

  // Sort by newest first (backend already does, but we double-check)
  const sortedContacts = [...contacts].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredMessages =
    filterStatus === 'all'
      ? sortedContacts
      : sortedContacts.filter(m => m.status === filterStatus);

  // Update status
  const updateStatus = async (id: string, status: ApiContact['status']) => {
    setStatusLoading(true);
    setError('');
    try {
      await apiRequest('PATCH', `/contact/admin/${id}/status`, { body: { status }, token });
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
      // If the expanded contact status changed, keep it expanded
    } catch (err: any) {
      setError(err.message ?? 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  };

  // Toggle expansion
  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'new', label: 'New' },
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
          filteredMessages.map(contact => (
            <div
              key={contact._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Header (always visible) */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-start"
                onClick={() => toggleExpand(contact._id)}
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        STATUS_COLORS[contact.status] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {STATUS_DISPLAY[contact.status] ?? contact.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(contact.createdAt).toLocaleString()}
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
                <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
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
                              ? `${STATUS_COLORS[s]} border-current`
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
                    Received: {new Date(contact.createdAt).toLocaleString()}
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