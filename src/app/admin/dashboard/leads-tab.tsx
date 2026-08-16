'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/services/api';
import type { ApiLead, ApiLeadSubmission } from './page';

interface LeadsTabProps {
  token: string;
  // Called once, the first time a "New" lead is actually flipped to "Old"
  // by this component (i.e. skipped if it was already viewed). Lets the
  // parent decrement the sidebar badge without a full refetch.
  onLeadMarkedViewed?: () => void;
}

// Add an entry here whenever a new lead magnet ships. Keep the `value` in
// sync with LEAD_MAGNET_TYPES in the backend's leadmagnet.constants.ts —
// there is no shared import between client/ and server/, so this list is
// maintained by hand on this side.
const LEAD_MAGNET_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'business_heat_map', label: 'Business Heat Map' },
];

const PAGE_SIZE = 25;

// Same IST formatting convention as contacts-tab.tsx.
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
  if (!timePart) timePart = '';
  timePart = timePart.replace(/\b(am|pm)\b/i, (m) => m.toUpperCase());
  return `${datePart} - ${timePart}`;
}

function leadMagnetLabel(value: string): string {
  return LEAD_MAGNET_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

// Generic key/value renderer for a submission's `answers` and `result`
// objects. Deliberately generic (not hand-built per lead magnet) since the
// shape varies by type and new lead magnets will add new shapes.
function renderValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) return <span className="text-gray-400">—</span>;
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc list-inside space-y-0.5">
        {value.map((item, i) => (
          <li key={i}>{renderValue(item)}</li>
        ))}
      </ul>
    );
  }
  if (typeof value === 'object') {
    return (
      <div className="pl-3 border-l border-gray-200 space-y-1">
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <div key={k}>
            <span className="text-gray-500">{k}: </span>
            {renderValue(v)}
          </div>
        ))}
      </div>
    );
  }
  return <span>{String(value)}</span>;
}

export function LeadsTab({ token, onLeadMarkedViewed }: LeadsTabProps) {
  const [status, setStatus] = useState<'new' | 'old'>('new');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [leadMagnetType, setLeadMagnetType] = useState<string>('all');
  const [page, setPage] = useState(1);

  const [leads, setLeads] = useState<ApiLead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submissionsByLead, setSubmissionsByLead] = useState<Record<string, ApiLeadSubmission[]>>({});
  const [submissionsLoadingId, setSubmissionsLoadingId] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ApiLeadSubmission | null>(null);

  // Debounce the search box — avoids firing a request on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Reset to page 1 whenever a filter changes (status/search/type).
  useEffect(() => {
    setPage(1);
  }, [status, debouncedSearch, leadMagnetType]);

  const fetchLeads = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('status', status);
      params.set('page', String(page));
      params.set('limit', String(PAGE_SIZE));
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (leadMagnetType !== 'all') params.set('leadMagnetType', leadMagnetType);

      const data = await apiRequest<{ leads: ApiLead[]; total: number }>(
        'GET',
        `/leadmagnets/admin?${params.toString()}`,
        { token }
      );
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [token, status, page, debouncedSearch, leadMagnetType]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const loadSubmissions = async (clientId: string) => {
    if (submissionsByLead[clientId]) return; // already cached
    setSubmissionsLoadingId(clientId);
    try {
      const data = await apiRequest<{ submissions: ApiLeadSubmission[] }>(
        'GET',
        `/leadmagnets/admin/${clientId}/submissions`,
        { token }
      );
      setSubmissionsByLead((prev) => ({ ...prev, [clientId]: data.submissions ?? [] }));
    } catch (err: any) {
      setError(err.message ?? 'Failed to load this lead\'s submissions.');
    } finally {
      setSubmissionsLoadingId(null);
    }
  };

  const toggleExpand = async (lead: ApiLead) => {
    const willExpand = expandedId !== lead.clientId;
    setExpandedId(willExpand ? lead.clientId : null);
    if (!willExpand) return;

    // Fire-and-forget the "mark viewed" call; the endpoint is safe to call
    // repeatedly (no-ops if already viewed). We only need to react locally
    // the first time it actually flips New -> Old.
    if (!lead.isViewed) {
      try {
        await apiRequest('PATCH', `/leadmagnets/admin/${lead.clientId}/view`, { token });
        onLeadMarkedViewed?.();
        // Business rule: once viewed, a lead leaves the "New" list for
        // good. If we're currently looking at the New list, drop it
        // locally rather than waiting on a refetch.
        if (status === 'new') {
          setLeads((prev) => prev.filter((l) => l.clientId !== lead.clientId));
          setTotal((prev) => Math.max(0, prev - 1));
        }
      } catch (err: any) {
        setError(err.message ?? 'Failed to mark lead as viewed.');
      }
    }

    loadSubmissions(lead.clientId);
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-md p-4 shadow-sm border border-gray-200 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['new', 'old'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                status === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s === 'new' ? 'New Leads' : 'Existing Leads'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by email, founder, or company…"
            className="flex-1 min-w-[220px] px-4 py-2 border rounded-md text-gray-900 bg-white placeholder-gray-400"
          />
          <select
            value={leadMagnetType}
            onChange={(e) => setLeadMagnetType(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-900 bg-white"
          >
            <option value="all">All Lead Magnets</option>
            {LEAD_MAGNET_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Leads list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin w-8 h-8 text-[#0A1E3D]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-sm bg-white rounded-md border border-gray-200">
          No {status === 'new' ? 'new' : 'existing'} leads {debouncedSearch ? 'match this search' : 'yet'}.
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => {
            const isExpanded = expandedId === lead.clientId;
            const submissions = submissionsByLead[lead.clientId];
            return (
              <div key={lead.clientId} className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-black/5 transition-colors flex justify-between items-start"
                  onClick={() => toggleExpand(lead)}
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {lead.latestSubmission?.founderName || lead.email}
                        </h4>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        {lead.latestSubmission?.companyName && (
                          <p className="text-xs text-gray-400">{lead.latestSubmission.companyName}</p>
                        )}
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {lead.submissionCount} submission{lead.submissionCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {lead.leadMagnetTypes.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          {leadMagnetLabel(t)}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Last activity: {formatIST(lead.lastActivityAt)}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ml-4 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Reports</p>
                    {submissionsLoadingId === lead.clientId ? (
                      <p className="text-sm text-gray-400">Loading reports…</p>
                    ) : !submissions || submissions.length === 0 ? (
                      <p className="text-sm text-gray-400">No reports found.</p>
                    ) : (
                      <div className="space-y-2">
                        {submissions.map((sub) => (
                          <button
                            key={sub._id}
                            onClick={(e) => { e.stopPropagation(); setSelectedSubmission(sub); }}
                            className="w-full text-left bg-white border border-gray-200 rounded-md px-4 py-3 hover:border-blue-300 hover:bg-blue-50 transition-colors flex justify-between items-center"
                          >
                            <span className="text-sm text-gray-800">{leadMagnetLabel(sub.leadMagnet)}</span>
                            <span className="text-xs text-gray-400">{formatIST(sub.createdAt)}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && total > PAGE_SIZE && (
        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1.5 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Submission detail modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white rounded-md shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {leadMagnetLabel(selectedSubmission.leadMagnet)}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{formatIST(selectedSubmission.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm text-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Founder</p>
                  <p>{selectedSubmission.founderName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p>{selectedSubmission.companyName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Industry</p>
                  <p>{selectedSubmission.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status at submission</p>
                  <p className="capitalize">{selectedSubmission.clientStatusAtSubmission}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Result</p>
                {renderValue(selectedSubmission.result)}
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Answers</p>
                {renderValue(selectedSubmission.answers)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
