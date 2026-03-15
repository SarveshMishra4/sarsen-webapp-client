'use client';

// cohorts-tab.tsx
// Static — cohort management is not wired to the backend.
// Original UI preserved exactly. Local state only.

import React, { useState } from 'react';

interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  maxSeats: number;
  enrolledCount: number;
  enrolledEmails: string[];
  status: 'upcoming' | 'active' | 'ended';
  description?: string;
}

export function CohortsTab() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [editingCohort, setEditingCohort] = useState<Cohort | null>(null);
  const [showEnrolledModal, setShowEnrolledModal] = useState<Cohort | null>(null);

  const handleEdit = (cohort: Cohort) => setEditingCohort(cohort);

  const handleSaveEdit = (updated: Cohort) => {
    setCohorts(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditingCohort(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Cohorts Management</h2>
        <span className="text-sm text-gray-500">View and edit upcoming cohorts</span>
      </div>

      {cohorts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400">No cohorts yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cohorts.map(cohort => (
            <div key={cohort.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              {editingCohort?.id === cohort.id ? (
                <EditCohortForm cohort={cohort} onSave={handleSaveEdit} onCancel={() => setEditingCohort(null)} />
              ) : (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-gray-800">{cohort.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cohort.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      cohort.status === 'active'   ? 'bg-green-100 text-green-700' :
                                                     'bg-gray-100 text-gray-700'
                    }`}>
                      {cohort.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Start:</span> {new Date(cohort.startDate).toLocaleDateString()}</p>
                    <p><span className="text-gray-500">End:</span> {new Date(cohort.endDate).toLocaleDateString()}</p>
                    <p><span className="text-gray-500">Price:</span> ₹{cohort.price}</p>
                    <p><span className="text-gray-500">Seats:</span> {cohort.enrolledCount}/{cohort.maxSeats}</p>
                    {cohort.description && <p className="text-gray-600 text-xs mt-2">{cohort.description}</p>}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(cohort)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                      Edit Details
                    </button>
                    <button onClick={() => setShowEnrolledModal(cohort)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 rounded-lg transition-colors">
                      View Enrollees ({cohort.enrolledCount})
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Enrolled Emails Modal */}
      {showEnrolledModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">{showEnrolledModal.name} — Enrollees</h3>
              <button onClick={() => setShowEnrolledModal(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {showEnrolledModal.enrolledEmails.length > 0 ? (
              <ul className="space-y-2">
                {showEnrolledModal.enrolledEmails.map((email, idx) => (
                  <li key={idx} className="p-2 bg-gray-50 rounded text-gray-800">{email}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No enrollees yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EditCohortForm({ cohort, onSave, onCancel }: {
  cohort: Cohort;
  onSave: (updated: Cohort) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(cohort);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-3">
      <input type="text" name="name" value={form.name} onChange={handleChange}
        placeholder="Cohort Name" className="w-full px-3 py-2 border rounded-lg text-sm" required />
      <div className="grid grid-cols-2 gap-2">
        <input type="date" name="startDate" value={form.startDate.slice(0,10)} onChange={handleChange}
          className="px-3 py-2 border rounded-lg text-sm" required />
        <input type="date" name="endDate" value={form.endDate.slice(0,10)} onChange={handleChange}
          className="px-3 py-2 border rounded-lg text-sm" required />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input type="number" name="price" value={form.price} onChange={handleChange}
          placeholder="Price" className="px-3 py-2 border rounded-lg text-sm" required />
        <input type="number" name="maxSeats" value={form.maxSeats} onChange={handleChange}
          placeholder="Max Seats" className="px-3 py-2 border rounded-lg text-sm" required />
      </div>
      <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-sm">
        <option value="upcoming">Upcoming</option>
        <option value="active">Active</option>
        <option value="ended">Ended</option>
      </select>
      <textarea name="description" value={form.description || ''} onChange={handleChange}
        placeholder="Description (optional)" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" />
      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">Save</button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg text-sm">Cancel</button>
      </div>
    </form>
  );
}