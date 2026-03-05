'use client';

import React, { useState } from 'react';
import { ContactMessage } from './types';

export function ContactsTab({
  contactMessages,
  setContactMessages,
}: {
  contactMessages: ContactMessage[];
  setContactMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'responded'>('all');

  const filteredMessages =
    filterStatus === 'all' ? contactMessages : contactMessages.filter((m) => m.status === filterStatus);

  const markAsRead = (id: string) => {
    setContactMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg)));
  };

  const deleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setContactMessages((prev) => prev.filter((msg) => msg.id !== id));
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-wrap gap-2">
        {['all', 'unread', 'read', 'responded'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => {
                setSelectedMessage(message);
                if (message.status === 'unread') markAsRead(message.id);
              }}
              className={`p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedMessage?.id === message.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{message.name}</h4>
                  <p className="text-sm text-gray-600">{message.email}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    message.status === 'unread'
                      ? 'bg-red-100 text-red-700'
                      : message.status === 'read'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {message.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2 mb-2">{message.message}</p>
              <p className="text-xs text-gray-500">{new Date(message.submittedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Detail View */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-2">{selectedMessage.name}</h3>
                  <p className="text-gray-600">{selectedMessage.email}</p>
                  {selectedMessage.phone && <p className="text-gray-600">{selectedMessage.phone}</p>}
                </div>
                <button onClick={() => deleteMessage(selectedMessage.id)} className="text-red-600 hover:text-red-700 p-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">Received: {new Date(selectedMessage.submittedAt).toLocaleString()}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  Reply via Email
                </button>
                <button
                  onClick={() => {
                    setContactMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === selectedMessage.id ? { ...msg, status: 'responded' } : msg
                      )
                    );
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Mark as Responded
                </button>
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