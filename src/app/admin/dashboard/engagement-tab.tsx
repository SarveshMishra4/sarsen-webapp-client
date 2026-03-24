'use client';

import React, { useState, useRef, useEffect } from 'react';
import { apiRequest } from '@/services/api';
import type { ApiEngagement } from './page';

// ─── Types ────────────────────────────────────────────────────────────────────

type ResourceType =
  | 'pdf' | 'excel' | 'ppt' | 'google-sheet' | 'google-doc'
  | 'google-slides' | 'website' | 'notion' | 'figma' | 'other';

interface ApiMessage {
  _id: string;
  content: string;
  senderRole: 'admin' | 'user';
  createdAt: string;
}
interface ApiFile {
  _id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
}
interface ApiQuestionnaire {
  _id: string;
  title: string;
  deadline?: string;
  isSubmitted: boolean;
  questions: { _id: string; text: string; order: number }[];
  answers: { questionId: string; answerText: string }[];
}
interface PurchaseAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}
interface ApiUser { _id: string; email: string; }
interface AdminEngagementDetail extends ApiEngagement { userId: ApiUser; }

// ─── Resource helpers ─────────────────────────────────────────────────────────

const RESOURCE_TYPES: { value: ResourceType; label: string }[] = [
  { value: 'pdf',           label: 'PDF Document' },
  { value: 'excel',         label: 'Excel Spreadsheet' },
  { value: 'ppt',           label: 'PowerPoint Presentation' },
  { value: 'google-sheet',  label: 'Google Sheets' },
  { value: 'google-doc',    label: 'Google Docs' },
  { value: 'google-slides', label: 'Google Slides' },
  { value: 'website',       label: 'Website/Link' },
  { value: 'notion',        label: 'Notion Page' },
  { value: 'figma',         label: 'Figma Design' },
  { value: 'other',         label: 'Other' },
];

const RESOURCE_COLORS: Record<string, string> = {
  pdf:            'bg-red-100 text-red-700',
  excel:          'bg-green-100 text-green-700',
  ppt:            'bg-orange-100 text-orange-700',
  'google-sheet': 'bg-emerald-100 text-emerald-700',
  'google-doc':   'bg-blue-100 text-blue-700',
  'google-slides':'bg-yellow-100 text-yellow-700',
  website:        'bg-purple-100 text-purple-700',
  notion:         'bg-gray-100 text-gray-700',
  figma:          'bg-pink-100 text-pink-700',
  other:          'bg-gray-100 text-gray-700',
};

function ResourceIcon({ type }: { type: string }) {
  if (type === 'pdf')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
  if (type === 'excel' || type === 'google-sheet')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
  if (type === 'ppt' || type === 'google-slides')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
  if (type === 'google-doc')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  if (type === 'website')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
  if (type === 'notion')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  if (type === 'figma')
    return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>;
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENT 1 — EngagementOverview
// Original UI preserved: client info, service details, 3 stat cards, activity timeline
// Data comes from API props (files, questionnaires, messages, purchaseAnswers)
// ─────────────────────────────────────────────────────────────────────────────

function EngagementOverview({
  engagement,
  files,
  questionnaires,
  messages,
  purchaseAnswers,
}: {
  engagement: AdminEngagementDetail;
  files: ApiFile[];
  questionnaires: ApiQuestionnaire[];
  messages: ApiMessage[];
  purchaseAnswers: PurchaseAnswer[];
}) {
  // Build a unified activity feed sorted by date — mirrors original timeline logic
  type ActivityItem =
    | { kind: 'file';          data: ApiFile;            date: string }
    | { kind: 'questionnaire'; data: ApiQuestionnaire;   date: string }
    | { kind: 'message';       data: ApiMessage;         date: string };

  const activityFeed: ActivityItem[] = [
    ...files.map(f => ({ kind: 'file' as const, data: f, date: f.createdAt })),
    ...questionnaires.map(q => ({ kind: 'questionnaire' as const, data: q, date: q.deadline ?? '' })),
    ...messages.map(m => ({ kind: 'message' as const, data: m, date: m.createdAt })),
  ]
    .filter(item => item.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Client Information */}
      <div className="bg-gray-50 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Client Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-800">{engagement.userId?.email ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Started</p>
            <p className="text-sm font-medium text-gray-800">{new Date(engagement.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-blue-50 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Service Details</h4>
        <p className="text-lg font-medium text-blue-800 mb-3">{engagement.serviceId?.title ?? '—'}</p>
        {purchaseAnswers.length > 0 && (
          <div className="space-y-2">
            {purchaseAnswers.map((a, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{a.questionText}:</span>
                <span className="font-medium text-gray-800">{a.answer || '—'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats — 3 cards matching original */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-md">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl  text-gray-800">{files.length}</p>
              <p className="text-xs text-gray-600">Resources Shared</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-md">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <p className="text-2xl  text-gray-800">{questionnaires.length}</p>
              <p className="text-xs text-gray-600">Questionnaires</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-md">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl  text-gray-800">{messages.length}</p>
              <p className="text-xs text-gray-600">Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
        {activityFeed.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6 bg-gray-50 rounded-md">No activity yet.</p>
        ) : (
          <div className="space-y-3">
            {activityFeed.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                <div className={`p-2 rounded-md ${
                  item.kind === 'file' ? 'bg-green-100' :
                  item.kind === 'questionnaire' ? 'bg-purple-100' : 'bg-blue-100'
                }`}>
                  {item.kind === 'file' && (
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  )}
                  {item.kind === 'questionnaire' && (
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                  )}
                  {item.kind === 'message' && (
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.kind === 'file'          && `Resource: ${(item.data as ApiFile).fileName}`}
                    {item.kind === 'questionnaire' && `Questionnaire: ${(item.data as ApiQuestionnaire).title}`}
                    {item.kind === 'message'       && 'New Message'}
                  </p>
                  <p className="text-xs text-gray-600">{new Date(item.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checklist progress */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Progress ({Math.round(engagement.progressPercent)}%)</h4>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div className="bg-[#0A1E3D] rounded-full h-2 transition-all" style={{ width: `${engagement.progressPercent}%` }} />
        </div>
        <p className="text-xs text-gray-500">
          {engagement.engagementChecklist.filter(s => s.isCompleted).length} of {engagement.engagementChecklist.length} steps completed
          {engagement.canDeliver && ' — ready to deliver'}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENT 2 — ResourcesManagement
// Original UI preserved: add form with all fields, colored type icons,
// resource cards with open + delete buttons
// ─────────────────────────────────────────────────────────────────────────────

function ResourcesManagement({
  engagementId, files, setFiles, token, isDelivered,
}: {
  engagementId: string;
  files: ApiFile[];
  setFiles: React.Dispatch<React.SetStateAction<ApiFile[]>>;
  token: string;
  isDelivered: boolean;
}) {
  const [isAdding,  setIsAdding]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState('');
  const [formData,  setFormData]  = useState({
    name: '', url: '', type: 'pdf' as ResourceType, description: '',
  });

  const handleAddResource = async () => {
    if (!formData.name || !formData.url || !formData.type) {
      alert('Please fill in all required fields'); return;
    }
    setUploading(true); setError('');
    try {
      await apiRequest('POST', `/engagements/${engagementId}/files/admin`, {
        body: { fileName: formData.name, fileUrl: formData.url, fileType: formData.type },
        token,
      });
      const data = await apiRequest<{ files: ApiFile[] }>('GET', `/engagements/${engagementId}/files`, { token });
      setFiles(data.files ?? []);
      setFormData({ name: '', url: '', type: 'pdf', description: '' });
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message ?? 'Failed to attach file.');
    } finally {
      setUploading(false);
    }
  };

  // NOTE: Backend has no delete file endpoint.
  // Delete is local-only — removes from UI but not from DB.
  const handleDeleteResource = (fileId: string) => {
    if (confirm('Remove this resource from the list?')) {
      setFiles(prev => prev.filter(f => f._id !== fileId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-800">Shared Resources</h4>
        {!isDelivered && (
          <button onClick={() => setIsAdding(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Resource
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-blue-50 rounded-md p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium text-gray-800">Add New Resource</h5>
            <button onClick={() => { setIsAdding(false); setFormData({ name: '', url: '', type: 'pdf', description: '' }); setError(''); }} className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Name <span className="text-red-500">*</span></label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Q4 Strategy Document" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource URL <span className="text-red-500">*</span></label>
              <input type="url" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type <span className="text-red-500">*</span></label>
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as ResourceType })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                {RESOURCE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Brief description of this resource..." />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddResource} disabled={uploading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium transition-colors disabled:opacity-50">
                {uploading ? 'Attaching…' : 'Add Resource'}
              </button>
              <button onClick={() => { setIsAdding(false); setFormData({ name: '', url: '', type: 'pdf', description: '' }); }}
                className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {files.length > 0 ? (
          files.map(file => (
            <div key={file._id} className="bg-white rounded-md p-4 border border-gray-200 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-md ${RESOURCE_COLORS[file.fileType] ?? 'bg-gray-100 text-gray-700'}`}>
                    <ResourceIcon type={file.fileType} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 mb-1">{file.fileName}</h5>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full ${RESOURCE_COLORS[file.fileType] ?? 'bg-gray-100 text-gray-700'}`}>
                        {RESOURCE_TYPES.find(t => t.value === file.fileType)?.label ?? file.fileType.toUpperCase()}
                      </span>
                      <span>Shared {new Date(file.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <a href={file.fileUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Open Resource">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <button onClick={() => handleDeleteResource(file._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Resource">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-md">
            No resources shared yet. Click "Add Resource" to share resources with the client.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENT 3 — QuestionnairesManagement
// Original UI preserved: full build-form with question type/required/options,
// questions-added list with remove, response display in green box,
// delete questionnaire button, add-question-to-existing
// ─────────────────────────────────────────────────────────────────────────────

function QuestionnairesManagement({
  engagementId, questionnaires, setQuestionnaires, token, isDelivered,
}: {
  engagementId: string;
  questionnaires: ApiQuestionnaire[];
  setQuestionnaires: React.Dispatch<React.SetStateAction<ApiQuestionnaire[]>>;
  token: string;
  isDelivered: boolean;
}) {
  const [isCreating,  setIsCreating]  = useState(false);
  const [creating,    setCreating]    = useState(false);
  const [qAddingTo,   setQAddingTo]   = useState<string | null>(null);
  const [inlineQ,     setInlineQ]     = useState('');
  const [error,       setError]       = useState('');

  const [formData, setFormData] = useState({
    title: '', description: '', deadline: '',
    questions: [] as { id: string; question: string; type: string; options: string; required: boolean }[],
  });
  const [newQuestion, setNewQuestion] = useState({ question: '', type: 'text', options: '', required: true });

  const refreshQuestionnaires = async () => {
    try {
      const data = await apiRequest<{ questionnaires: ApiQuestionnaire[] }>(
        'GET', `/engagements/${engagementId}/questionnaires/admin`, { token }
      );
      setQuestionnaires(data.questionnaires ?? []);
    } catch {}
  };

  const handleAddLocalQuestion = () => {
    if (!newQuestion.question) { alert('Please enter a question'); return; }
    setFormData(f => ({
      ...f,
      questions: [...f.questions, { id: Date.now().toString(), ...newQuestion }],
    }));
    setNewQuestion({ question: '', type: 'text', options: '', required: true });
  };

const handleCreateQuestionnaire = async () => {
  if (!formData.title || formData.questions.length === 0) {
    alert('Please add a title and at least one question');
    return;
  }
  if (!formData.deadline) {
    alert('Please select a deadline.');
    return;
  }
  setCreating(true);
  setError('');
  try {
    // Convert YYYY-MM-DD to ISO datetime string (midnight UTC)
    const deadlineISO = new Date(formData.deadline).toISOString();

    // POST to create questionnaire; response is the created questionnaire object
    const created = await apiRequest<any>(
      'POST', `/engagements/${engagementId}/questionnaires/admin`,
      { body: { title: formData.title, deadline: deadlineISO }, token }
    );

    // Extract questionnaire ID – handle both possible shapes
    const questionnaireId = created._id ?? created.questionnaire?._id;
    if (!questionnaireId) {
      throw new Error('Failed to retrieve questionnaire ID from response.');
    }

    // Add each question using the questionnaire ID
    for (let i = 0; i < formData.questions.length; i++) {
      await apiRequest('POST', `/questionnaires/${questionnaireId}/questions/admin`, {
        body: { text: formData.questions[i].question, order: i + 1 }, token,
      });
    }

    await refreshQuestionnaires();
    setFormData({ title: '', description: '', deadline: '', questions: [] });
    setIsCreating(false);
  } catch (err: any) {
    setError(err.message ?? 'Failed to create questionnaire.');
  } finally {
    setCreating(false);
  }
};

  // Local-only delete — no backend delete endpoint for questionnaires
  const handleDeleteQuestionnaire = (questionnaireId: string) => {
    if (confirm('Are you sure you want to delete this questionnaire?')) {
      setQuestionnaires(prev => prev.filter(q => q._id !== questionnaireId));
    }
  };

  const handleAddInlineQuestion = async (questionnaireId: string) => {
    if (!inlineQ.trim()) return;
    const nextOrder = (questionnaires.find(q => q._id === questionnaireId)?.questions.length ?? 0) + 1;
    try {
      await apiRequest('POST', `/questionnaires/${questionnaireId}/questions/admin`, {
        body: { text: inlineQ.trim(), order: nextOrder }, token,
      });
      await refreshQuestionnaires();
      setInlineQ(''); setQAddingTo(null);
    } catch (err: any) {
      setError(err.message ?? 'Failed to add question.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-800">Questionnaires</h4>
        {!isDelivered && (
          <button onClick={() => setIsCreating(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Questionnaire
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-purple-50 rounded-md p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-medium text-gray-800">Create New Questionnaire</h5>
            <button onClick={() => { setIsCreating(false); setFormData({ title: '', description: '', deadline: '', questions: [] }); setError(''); }} className="text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Questionnaire Title <span className="text-red-500">*</span></label>
              <input type="text" value={formData.title} onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Initial Discovery Questions" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description of this questionnaire..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
              <input type="date" value={formData.deadline} onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            {formData.questions.length > 0 && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Questions Added:</label>
                {formData.questions.map((q, index) => (
                  <div key={q.id} className="bg-white rounded-md p-3 border border-gray-200 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-purple-600">Q{index + 1}</span>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{q.type}</span>
                        {q.required && <span className="text-xs text-red-500">*</span>}
                      </div>
                      <p className="text-sm font-medium text-gray-800">{q.question}</p>
                      {q.options && <p className="text-xs text-gray-600 mt-1">Options: {q.options}</p>}
                    </div>
                    <button onClick={() => setFormData(f => ({ ...f, questions: f.questions.filter(x => x.id !== q.id) }))} className="text-red-600 hover:text-red-700 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add question dashed form — matches original exactly */}
            <div className="bg-white rounded-md p-4 border-2 border-dashed border-gray-300">
              <h6 className="text-sm font-medium text-gray-700 mb-3">Add Question</h6>
              <div className="space-y-3">
                <input type="text" value={newQuestion.question} onChange={e => setNewQuestion(q => ({ ...q, question: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" placeholder="Enter your question..." />
                <div className="grid grid-cols-2 gap-3">
                  <select value={newQuestion.type} onChange={e => setNewQuestion(q => ({ ...q, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                    <option value="text">Short Text</option>
                    <option value="textarea">Long Text</option>
                    <option value="select">Dropdown</option>
                    <option value="multiselect">Multiple Choice</option>
                    <option value="radio">Radio Buttons</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req" checked={newQuestion.required}
                      onChange={e => setNewQuestion(q => ({ ...q, required: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                    <label htmlFor="req" className="text-sm text-gray-700">Required</label>
                  </div>
                </div>
                {['select', 'multiselect', 'radio'].includes(newQuestion.type) && (
                  <input type="text" value={newQuestion.options} onChange={e => setNewQuestion(q => ({ ...q, options: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Options (comma-separated): Option 1, Option 2, Option 3" />
                )}
                <button onClick={handleAddLocalQuestion}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
                  Add Question
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button onClick={handleCreateQuestionnaire} disabled={creating || formData.questions.length === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                {creating ? 'Creating…' : 'Send Questionnaire to Client'}
              </button>
              <button onClick={() => { setIsCreating(false); setFormData({ title: '', description: '', deadline: '', questions: [] }); }}
                className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {questionnaires.length > 0 ? (
          questionnaires.map(q => (
            <div key={q._id} className="bg-white rounded-md p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-medium text-gray-800">{q.title}</h5>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${q.isSubmitted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {q.isSubmitted ? 'completed' : 'sent'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {q.deadline && `Due ${new Date(q.deadline).toLocaleDateString()} • `}
                    {q.questions.length} question{q.questions.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {/* Delete questionnaire button — matches original */}
                <button onClick={() => handleDeleteQuestionnaire(q._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete Questionnaire">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>

              {/* Questions preview — matches original */}
              <div className="bg-gray-50 rounded-md p-4">
                <h6 className="text-sm font-medium text-gray-700 mb-3">Questions:</h6>
                <div className="space-y-2">
                  {q.questions.sort((a, b) => a.order - b.order).map((qn, idx) => (
                    <div key={qn._id} className="flex items-start gap-2">
                      <span className="text-xs font-medium text-purple-600 mt-0.5">Q{idx + 1}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{qn.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-600">textarea</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client response section — matches original green box */}
              {q.isSubmitted && q.answers.length > 0 && (
                <div className="mt-4 bg-green-50 rounded-md p-4 border border-green-200">
                  <h6 className="text-sm font-medium text-green-800 mb-3">Client Response:</h6>
                  <div className="space-y-2">
                    {q.questions.sort((a, b) => a.order - b.order).map(qn => {
                      const answer = q.answers.find(a => a.questionId === qn._id);
                      return (
                        <div key={qn._id} className="bg-white rounded p-3">
                          <p className="text-xs text-gray-600 mb-1">{qn.text}</p>
                          <p className="text-sm font-medium text-gray-800">{answer?.answerText ?? <span className="text-gray-300 ">No answer</span>}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add question to existing questionnaire */}
              {!isDelivered && !q.isSubmitted && (
                qAddingTo === q._id ? (
                  <div className="flex gap-2 mt-4">
                    <input type="text" value={inlineQ} onChange={e => setInlineQ(e.target.value)} placeholder="Question text"
                      className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-400" />
                    <button onClick={() => handleAddInlineQuestion(q._id)} disabled={!inlineQ.trim()}
                      className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md disabled:opacity-40">Add</button>
                    <button onClick={() => { setQAddingTo(null); setInlineQ(''); }}
                      className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setQAddingTo(q._id)} className="text-purple-600 text-sm hover:text-purple-800 transition-colors mt-4 block">
                    + Add question
                  </button>
                )
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-md">
            No questionnaires sent yet. Click "Create Questionnaire" to send questions to the client.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENT 4 — MessagesManagement
// Original UI preserved: bubble chat, delete button on admin messages,
// auto-scroll, Enter-to-send, message stats grid
// ─────────────────────────────────────────────────────────────────────────────

function MessagesManagement({
  engagementId, messages, setMessages, token, isDelivered,
}: {
  engagementId: string;
  messages: ApiMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ApiMessage[]>>;
  token: string;
  isDelivered: boolean;
}) {
  const [newMessage, setNewMessage] = useState('');
  const [sending,    setSending]    = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      await apiRequest('POST', `/engagements/${engagementId}/messages`, { body: { content: newMessage.trim() }, token });
      const data = await apiRequest<{ messages: ApiMessage[] }>('GET', `/engagements/${engagementId}/messages`, { token });
      setMessages(data.messages ?? []);
      setNewMessage('');
    } catch {}
    finally { setSending(false); }
  };

  // Local-only delete — no backend delete endpoint for messages
  const handleDeleteMessage = (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(m => m._id !== messageId));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-md border border-gray-200 h-[500px] flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white rounded-t-md">
          <h4 className="text-lg font-medium text-gray-800">Conversation</h4>
          <p className="text-sm text-gray-600">{messages.length} message{messages.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length > 0 ? (
            <>
              {messages.map(message => (
                <div key={message._id} className={`flex ${message.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-md p-4 ${
                    message.senderRole === 'admin' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    {/* Delete button on admin messages — matches original */}
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      {message.senderRole === 'admin' && (
                        <button onClick={() => handleDeleteMessage(message._id)} className="text-white/80 hover:text-white flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      )}
                    </div>
                    <div className={`flex items-center gap-2 mt-2 text-xs ${message.senderRole === 'admin' ? 'text-white/70' : 'text-gray-500'}`}>
                      <span>{new Date(message.createdAt).toLocaleString()}</span>
                      {message.senderRole === 'admin' && <><span>•</span><span>Sent</span></>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-sm">No messages yet</p>
                <p className="text-xs text-gray-400 mt-1">Start the conversation below</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white rounded-b-md">
          {isDelivered ? (
            <p className="text-sm text-gray-400 text-center py-2">This engagement has been delivered. Messaging is closed.</p>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-3">
                <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={handleKeyPress}
                  rows={2} className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)" />
                <button onClick={handleSendMessage} disabled={!newMessage.trim() || sending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:w-auto w-full">
                  <span className="hidden sm:inline">{sending ? 'Sending…' : 'Send'}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Messages will be visible to the client in their dashboard</p>
            </>
          )}
        </div>
      </div>

      {/* Message stats — matches original 3-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Messages</p>
          <p className="text-2xl  text-gray-800">{messages.length}</p>
        </div>
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">From Admin</p>
          <p className="text-2xl  text-gray-800">{messages.filter(m => m.senderRole === 'admin').length}</p>
        </div>
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">From Client</p>
          <p className="text-2xl  text-gray-800">{messages.filter(m => m.senderRole === 'user').length}</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — EngagementWorkspaceTab
// Original list/detail view mode preserved.
// List cards now show progress bar. Detail has all original sub-tabs.
// ─────────────────────────────────────────────────────────────────────────────

type DetailTab = 'overview' | 'resources' | 'questionnaires' | 'messages' | 'brief' | 'users';

interface Props {
  engagements: ApiEngagement[];
  setEngagements: React.Dispatch<React.SetStateAction<ApiEngagement[]>>;
  token: string;
  onRefresh: () => void;
}

export function EngagementWorkspaceTab({ engagements, setEngagements, token, onRefresh }: Props) {
  const [selected,          setSelected]         = useState<AdminEngagementDetail | null>(null);
  const [detailLoading,     setDetailLoading]     = useState(false);
  const [activeSubTab,      setActiveSubTab]      = useState<DetailTab>('overview');
  const [viewMode,          setViewMode]          = useState<'list' | 'detail'>('list');
  const [messages,          setMessages]          = useState<ApiMessage[]>([]);
  const [files,             setFiles]             = useState<ApiFile[]>([]);
  const [questionnaires,    setQuestionnaires]    = useState<ApiQuestionnaire[]>([]);
  const [purchaseAnswers,   setPurchaseAnswers]   = useState<PurchaseAnswer[]>([]);
  const [users,             setUsers]             = useState<ApiUser[]>([]);
  const [delivering,        setDelivering]        = useState(false);
  const [checklistLoading,  setChecklistLoading]  = useState<string | null>(null);
  const [resetUserId,       setResetUserId]       = useState<string | null>(null);
  const [resetPasswordText, setResetPasswordText] = useState<string | null>(null);
  const [error,             setError]             = useState('');

  const openEngagement = async (id: string) => {
    setDetailLoading(true); setSelected(null); setActiveSubTab('overview'); setViewMode('detail'); setError('');
    try {
      const [detail, msgData, fileData, qData, briefData] = await Promise.all([
        apiRequest<AdminEngagementDetail>('GET', `/engagements/admin/${id}`, { token }),
        apiRequest<{ messages: ApiMessage[] }>('GET', `/engagements/${id}/messages`, { token }),
        apiRequest<{ files: ApiFile[] }>('GET', `/engagements/${id}/files`, { token }),
        apiRequest<{ questionnaires: ApiQuestionnaire[] }>('GET', `/engagements/${id}/questionnaires/admin`, { token }),
        apiRequest<{ answers: PurchaseAnswer[] }>('GET', `/engagements/admin/${id}/purchase-answers`, { token }),
      ]);
      setSelected(detail); setMessages(msgData.messages ?? []); setFiles(fileData.files ?? []);
      setQuestionnaires(qData.questionnaires ?? []); setPurchaseAnswers(briefData.answers ?? []);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load engagement.');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBackToList = () => { setSelected(null); setViewMode('list'); setError(''); };

  const toggleStep = async (stepId: string, current: boolean) => {
    if (!selected) return;
    setChecklistLoading(stepId);
    try {
      const data = await apiRequest<AdminEngagementDetail>(
        'PATCH', `/engagements/admin/${selected._id}/checklist/${stepId}`, { body: { isCompleted: !current }, token }
      );
      setSelected(data);
      setEngagements(prev => prev.map(e => e._id === selected._id ? { ...e, progressPercent: data.progressPercent, canDeliver: data.canDeliver } : e));
    } catch (err: any) {
      setError(err.message ?? 'Failed to update checklist.');
    } finally { setChecklistLoading(null); }
  };

  const deliverEngagement = async () => {
    if (!selected) return;
    if (!confirm('Mark this engagement as delivered? This action cannot be undone and will lock messaging.')) return;
    setDelivering(true);
    try {
      const data = await apiRequest<AdminEngagementDetail>('PATCH', `/engagements/admin/${selected._id}/deliver`, { token });
      setSelected(data);
      setEngagements(prev => prev.map(e => e._id === selected._id ? { ...e, status: 'delivered' } : e));
    } catch (err: any) {
      setError(err.message ?? 'Cannot deliver. Ensure all checklist steps are complete.');
    } finally { setDelivering(false); }
  };

  const loadUsers = async () => {
    try {
      const data = await apiRequest<{ users: ApiUser[] }>('GET', '/auth/admin/users', { token });
      setUsers(data.users ?? []);
    } catch {}
  };

  const handleResetPassword = async (userId: string) => {
    if (!confirm("Reset this user's password? The new password will only be shown once.")) return;
    setResetUserId(userId);
    try {
      const data = await apiRequest<{ plainPassword: string }>('POST', `/auth/admin/users/${userId}/reset-password`, { token });
      setResetPasswordText(data.plainPassword);
    } catch (err: any) {
      setError(err.message ?? 'Failed to reset password.');
    } finally { setResetUserId(null); }
  };

  // ── LIST VIEW — original card style with stats icons ──────────────────────

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          <h3 className="text-lg font-medium text-gray-800 sticky top-0 bg-gray-100 py-2">Active Engagements</h3>
          {engagements.length === 0 ? (
            <div className="text-center text-gray-500 py-10 bg-white rounded-md">No active engagements</div>
          ) : (
            engagements.map(e => (
              <div key={e._id} onClick={() => openEngagement(e._id)}
                className={`bg-white rounded-md p-4 shadow-sm border cursor-pointer hover:shadow-md transition-all ${
                  selected?._id === e._id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{e.userId?.email ?? '—'}</h4>
                    <p className="text-xs text-gray-600">{e.serviceId?.title ?? '—'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    e.status === 'delivered' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {e.status === 'delivered' ? 'delivered' : 'active'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-2 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#0A1E3D] rounded-full h-1.5" style={{ width: `${e.progressPercent}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{Math.round(e.progressPercent)}%</span>
                </div>

                {/* Engagement stats row — matches original icon badges */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2 pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    {e.engagementChecklist?.filter(s => s.isCompleted).length ?? 0}/{e.engagementChecklist?.length ?? 0} steps
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Started {new Date(e.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (detailLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg className="animate-spin w-8 h-8 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!selected) return null;

  // ── DETAIL VIEW ───────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-md shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <button onClick={handleBackToList} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to engagements
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-medium text-gray-800">{selected.userId?.email}</h3>
              <p className="text-gray-600">{selected.serviceId?.title}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${selected.status === 'delivered' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                  {selected.status === 'delivered' ? 'Delivered' : 'Active'}
                </span>
                <span className="text-sm text-gray-500">{Math.round(selected.progressPercent)}% complete</span>
              </div>
            </div>
            {selected.status !== 'delivered' && selected.canDeliver && (
              <button onClick={deliverEngagement} disabled={delivering}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 self-start flex items-center gap-2">
                {delivering && <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                Mark as Delivered
              </button>
            )}
            {selected.status !== 'delivered' && !selected.canDeliver && (
              <p className="text-xs text-gray-400 max-w-xs self-start">Complete all checklist steps to unlock delivery.</p>
            )}
          </div>

          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#0A1E3D] rounded-full h-2 transition-all" style={{ width: `${selected.progressPercent}%` }} />
          </div>

          {error && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded-md px-4 py-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Sub-tabs — matches original style */}
          <div className="flex flex-wrap gap-2 mt-4">
            {([
              { id: 'overview',       label: 'Overview' },
              { id: 'resources',      label: `Resources (${files.length})` },
              { id: 'questionnaires', label: `Questionnaires (${questionnaires.length})` },
              { id: 'messages',       label: `Messages (${messages.length})` },
              { id: 'brief',          label: `Client Brief${purchaseAnswers.length > 0 ? ` (${purchaseAnswers.length})` : ''}` },
              { id: 'users',          label: 'Users' },
            ] as { id: DetailTab; label: string }[]).map(t => (
              <button key={t.id}
                onClick={() => { setActiveSubTab(t.id); if (t.id === 'users') loadUsers(); }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSubTab === t.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeSubTab === 'overview' && (
            <EngagementOverview
              engagement={selected}
              files={files}
              questionnaires={questionnaires}
              messages={messages}
              purchaseAnswers={purchaseAnswers}
            />
          )}

          {activeSubTab === 'resources' && (
            <ResourcesManagement engagementId={selected._id} files={files} setFiles={setFiles} token={token} isDelivered={selected.status === 'delivered'} />
          )}

          {activeSubTab === 'questionnaires' && (
            <QuestionnairesManagement engagementId={selected._id} questionnaires={questionnaires} setQuestionnaires={setQuestionnaires} token={token} isDelivered={selected.status === 'delivered'} />
          )}

          {activeSubTab === 'messages' && (
            <MessagesManagement engagementId={selected._id} messages={messages} setMessages={setMessages} token={token} isDelivered={selected.status === 'delivered'} />
          )}

          {activeSubTab === 'brief' && (
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-1">Client Brief — Purchase Answers</h4>
              <p className="text-sm text-gray-500 mb-4">Answers submitted by the client at checkout. Read-only.</p>
              {purchaseAnswers.length === 0 ? (
                <div className="text-center text-gray-400 py-10 bg-gray-50 rounded-md">No purchase answers recorded.</div>
              ) : (
                <div className="space-y-3">
                  {purchaseAnswers.map((a, i) => (
                    <div key={i} className="bg-gray-50 rounded-md p-4">
                      <p className="text-xs font-medium text-gray-500 mb-1">{a.questionText}</p>
                      <p className="text-sm text-gray-800">{a.answer || <span className="text-gray-300 ">No answer</span>}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'users' && (
            <div className="space-y-4">
              {resetPasswordText && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-5">
                  <p className="text-sm font-medium text-amber-800 mb-2">New password — shown once only</p>
                  <div className="flex items-center gap-3">
                    <code className="bg-white border border-amber-200 rounded px-3 py-2 text-base font-mono text-amber-900 st">{resetPasswordText}</code>
                    <button onClick={() => navigator.clipboard.writeText(resetPasswordText)} className="px-3 py-2 bg-amber-500 text-white text-sm rounded-md hover:bg-amber-600 transition-colors">Copy</button>
                  </div>
                  <p className="text-xs text-amber-600 mt-2">This will not be shown again. Share it with the user now.</p>
                  <button onClick={() => setResetPasswordText(null)} className="text-xs text-amber-400 underline mt-1">Dismiss</button>
                </div>
              )}
              <h4 className="text-lg font-medium text-gray-800 mb-1">All Users</h4>
              <p className="text-sm text-gray-500 mb-4">Reset a user's password if they are locked out.</p>
              {users.length === 0 ? (
                <p className="text-sm text-gray-400">Loading users…</p>
              ) : (
                <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                  <div className="divide-y divide-gray-50">
                    {users.map(u => (
                      <div key={u._id} className="px-6 py-4 flex items-center justify-between">
                        <p className="text-sm text-gray-700">{u.email}</p>
                        <button onClick={() => handleResetPassword(u._id)} disabled={resetUserId === u._id}
                          className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md hover:bg-red-100 transition-colors disabled:opacity-50">
                          {resetUserId === u._id ? 'Resetting…' : 'Reset Password'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Checklist — accessible from within overview but also as standalone for quick ticking */}
          {activeSubTab === 'overview' && selected.engagementChecklist.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Checklist (Admin Control)</h4>
              <div className="space-y-2">
                {selected.engagementChecklist.slice().sort((a, b) => a.order - b.order).map(step => (
                  <div key={step.stepId} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                    <button onClick={() => toggleStep(step.stepId, step.isCompleted)}
                      disabled={checklistLoading === step.stepId || selected.status === 'delivered'}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-50 ${step.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'}`}>
                      {step.isCompleted && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      {checklistLoading === step.stepId && <svg className="w-3 h-3 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">{step.order}.</span>
                      <p className={`text-sm ${step.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>{step.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}