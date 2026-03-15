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
  const [selectedMessage, setSelectedMessage] = useState<ApiContact | null>(null);
  const [filterStatus,    setFilterStatus]    = useState<'all' | 'new' | 'in_progress' | 'resolved' | 'ignored'>('all');
  const [noteInput,       setNoteInput]       = useState('');
  const [noteLoading,     setNoteLoading]     = useState(false);
  const [statusLoading,   setStatusLoading]   = useState(false);
  const [detailLoading,   setDetailLoading]   = useState(false);
  const [error,           setError]           = useState('');

  const filteredMessages =
    filterStatus === 'all' ? contacts : contacts.filter(m => m.status === filterStatus);

  // ── Open detail ───────────────────────────────────────────────────────────
  const openMessage = async (contact: ApiContact) => {
    setDetailLoading(true);
    setError('');
    try {
      const data = await apiRequest<ApiContact>('GET', `/contact/admin/${contact._id}`, { token });
      setSelectedMessage(data);
    } catch {
      setSelectedMessage(contact); // fall back to list data on error
    } finally {
      setDetailLoading(false);
    }
  };

  // ── Update status ─────────────────────────────────────────────────────────
  const updateStatus = async (id: string, status: string) => {
    setStatusLoading(true);
    setError('');
    try {
      await apiRequest('PATCH', `/contact/admin/${id}/status`, { body: { status }, token });
      const s = status as ApiContact['status'];
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status: s } : c));
      setSelectedMessage(prev => prev?._id === id ? { ...prev, status: s } : prev);
    } catch (err: any) {
      setError(err.message ?? 'Failed to update status.');
    } finally {
      setStatusLoading(false);
    }
  };

  // ── Add internal note ─────────────────────────────────────────────────────
  const addNote = async () => {
    if (!selectedMessage || !noteInput.trim()) return;
    setNoteLoading(true);
    try {
      await apiRequest('POST', `/contact/admin/${selectedMessage._id}/notes`, {
        body: { note: noteInput.trim() },
        token,
      });
      const updated = await apiRequest<ApiContact>('GET', `/contact/admin/${selectedMessage._id}`, { token });
      setSelectedMessage(updated);
      setNoteInput('');
    } catch (err: any) {
      setError(err.message ?? 'Failed to add note.');
    } finally {
      setNoteLoading(false);
    }
  };

  const dismissMessage = (id: string) => {
    if (confirm('Remove this message from view?')) {
      setContacts(prev => prev.filter(c => c._id !== id));
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-wrap gap-2">
        {[
          { key: 'all',         label: 'All' },
          { key: 'new',         label: 'New' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'resolved',    label: 'Responded' },
          { key: 'ignored',     label: 'Ignored' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

      {/* Two-panel layout — matches original */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Left — list */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="text-center text-gray-400 py-20 text-sm">No messages in this category.</div>
          ) : (
            filteredMessages.map(message => (
              <div
                key={message._id}
                onClick={() => openMessage(message)}
                className={`p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage?._id === message._id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{message.name}</h4>
                    <p className="text-sm text-gray-600">{message.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[message.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {STATUS_DISPLAY[message.status] ?? message.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 mb-2">{message.message}</p>
                <p className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        {/* Right — detail */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          {detailLoading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="animate-spin w-6 h-6 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-2">{selectedMessage.name}</h3>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => dismissMessage(selectedMessage._id)}
                  className="text-red-600 hover:text-red-700 p-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
              </div>

              {/* Internal notes */}
              {selectedMessage.notes.length > 0 && (
                <div className="border-t border-gray-200 pt-5">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Internal Notes</h4>
                  <div className="space-y-2">
                    {selectedMessage.notes.map((n, i) => (
                      <div key={i} className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{n.note}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.addedBy} · {new Date(n.addedAt).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add note */}
              <div className="border-t border-gray-200 pt-5">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Add Internal Note</h4>
                <div className="flex gap-2">
                  <textarea
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    placeholder="Private note — not visible to sender…"
                    rows={2}
                    className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-400 bg-gray-50"
                  />
                  <button
                    onClick={addNote}
                    disabled={noteLoading || !noteInput.trim()}
                    className="px-4 py-2 bg-[#0A1E3D] text-white text-sm rounded-lg disabled:opacity-40 self-end hover:bg-[#0d2a52] transition-colors"
                  >
                    {noteLoading ? '…' : 'Add'}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">Received: {new Date(selectedMessage.createdAt).toLocaleString()}</p>
              </div>

              {/* Action buttons — matches original layout */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center text-sm"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => updateStatus(selectedMessage._id, 'resolved')}
                  disabled={statusLoading || selectedMessage.status === 'resolved'}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm disabled:opacity-50"
                >
                  {statusLoading ? 'Updating…' : selectedMessage.status === 'resolved' ? '✓ Responded' : 'Mark as Responded'}
                </button>
              </div>

              {/* Status change buttons */}
              <div className="flex gap-2 flex-wrap pt-1">
                <p className="text-xs text-gray-400 w-full">Change status:</p>
                {(['new', 'in_progress', 'resolved', 'ignored'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selectedMessage._id, s)}
                    disabled={statusLoading || selectedMessage.status === s}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-50 ${
                      selectedMessage.status === s
                        ? `${STATUS_COLORS[s]} border-current`
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {STATUS_DISPLAY[s]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-20">Select a message to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}