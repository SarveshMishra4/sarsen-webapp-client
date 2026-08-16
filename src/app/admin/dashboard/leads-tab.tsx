'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/services/api';
import { QUESTIONS, scaleLabel, CanvasHeatmap } from '@/app/resources/tools/business-heatmap/businessHeatMapConfig';
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

// Generic key/value renderer, used as the fallback for any lead magnet
// type that doesn't have a dedicated "readable" view (see
// BusinessHeatMapAnswers below for the one that does).
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

// Business Heat Map specific view: plain 1, 2, 3... numbering (not q1/q2),
// the actual question text, and the word label for the answer (e.g.
// "Strong") instead of the raw stored number. Pulls QUESTIONS and
// scaleLabel from the shared config file so this can never drift out of
// sync with what the founder actually saw on the public tool.
function BusinessHeatMapAnswers({ answers }: { answers: Record<string, number> }) {
  return (
    <div className="space-y-4">
      {QUESTIONS.map((question, index) => {
        const answerValue = answers[question.id];
        return (
          <div key={question.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <p className="text-sm text-gray-800">
              <span className="text-gray-400 mr-1">{index + 1}.</span>
              {question.text}
            </p>
            <p className="text-sm mt-1">
              {answerValue === undefined ? (
                <span className="text-gray-400">Not answered</span>
              ) : (
                <span className="font-medium text-[#0A1E3D]">{scaleLabel(answerValue)}</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
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

  // Drives the "this modal scrolls" dot indicator below the card. Only
  // true when the body's content is actually taller than its visible
  // area — recalculated whenever a different submission is opened, since
  // Business Heat Map reports are tall but a future lead magnet's might
  // not be.
  const modalBodyRef = React.useRef<HTMLDivElement>(null);
  const [modalScrollable, setModalScrollable] = useState(false);

  useEffect(() => {
    if (!selectedSubmission) {
      setModalScrollable(false);
      return;
    }
    // Runs after the modal's content has painted, so scrollHeight is accurate.
    const check = () => {
      const el = modalBodyRef.current;
      if (el) setModalScrollable(el.scrollHeight > el.clientHeight + 1);
    };
    const raf = requestAnimationFrame(check);
    window.addEventListener('resize', check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', check);
    };
  }, [selectedSubmission]);

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
          className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50 p-4 gap-3"
          onClick={() => setSelectedSubmission(null)}
        >
          {/* Hides the native scrollbar on the modal body. Kept as a plain
              <style> tag (not styled-jsx) so it works regardless of
              whether this app router has the styled-jsx babel plugin
              enabled — harmless to inject repeatedly on open/close. */}
          <style>{`
            .lead-modal-body::-webkit-scrollbar { display: none; }
            .lead-modal-body { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div
            className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed header — not part of the scrolling area, so it never
                clips against the rounded corners no matter how tall the
                body content gets. */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start flex-shrink-0">
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

            {/* Scrolling body. The outer card's overflow-hidden clips this
                completely, so its scrollbar (even before we hide it below)
                can never visually break the rounded corners. */}
            <div ref={modalBodyRef} className="lead-modal-body overflow-y-auto p-6 space-y-6 text-sm text-gray-800">
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

              {selectedSubmission.leadMagnet === 'business_heat_map' ? (
                <>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Answers</p>
                    <BusinessHeatMapAnswers answers={selectedSubmission.answers} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Business Health Map</p>
                    <CanvasHeatmap answers={selectedSubmission.answers} />
                  </div>
                </>
              ) : (
                // Fallback for any future lead magnet type that doesn't yet
                // have a dedicated readable view — see the header comment
                // near LEAD_MAGNET_TYPE_OPTIONS above.
                <>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Result</p>
                    {renderValue(selectedSubmission.result)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Answers</p>
                    {renderValue(selectedSubmission.answers)}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Scroll indicator — lives OUTSIDE the modal card, only shown
              when the body content actually overflows. Click-through to
              the overlay's close handler is intentional (no
              stopPropagation), so clicking the dots also closes the modal
              like clicking anywhere else outside the card. */}
          {modalScrollable && (
            <div className="flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}