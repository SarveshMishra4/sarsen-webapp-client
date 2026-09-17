// app/founder-fit/founderPsychometricClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import {
  QUESTIONS,
  LIKERT_OPTIONS,
  CONSTRUCTS,
  CONSTRUCT_META,
  ROLE_META,
  generateIndividualReport,
  generateTeamReport,
  hasCompleteAnswers,
  type ConstructKey,
  type RoleKey,
  type IndividualReport,
  type TeamReport,
} from './founderPsychometricEngine';

// =====================================================
// PERSISTENCE — everything lives in the browser only.
// No network call is ever made from this file. Clearing this key (the
// "Start a New Assessment Round" action) is the only way data leaves.
// =====================================================
const STORAGE_KEY = 'sarsen_founder_fit_v1';

type Status = 'pending' | 'in_progress' | 'completed';

type Participant = {
  id: string;
  name: string;
  email: string;
  status: Status;
  answers: Record<string, number>;
};

type StoredState = { roster: Participant[] };

function loadState(): StoredState {
  if (typeof window === 'undefined') return { roster: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { roster: [] };
    const parsed = JSON.parse(raw);
    return { roster: Array.isArray(parsed.roster) ? parsed.roster : [] };
  } catch {
    return { roster: [] };
  }
}

function saveState(state: StoredState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable — the demo still works in-memory for this session
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function isValidEmail(value: string): boolean {
  return value.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// =====================================================
// BRAND CONSTANTS — matches the Business Heat Map tool
// =====================================================
const BRAND = '#0A1E3D';
const TINT = '#EEF2F9';
const ADVANCE_DELAY_MS = 550;

function scoreColor(score: number): { bg: string; text: string; band: string } {
  if (score < 3) return { bg: 'bg-red-50', text: 'text-red-700', band: 'Low' };
  if (score < 5) return { bg: 'bg-orange-50', text: 'text-orange-700', band: 'Leaning Low' };
  if (score < 7) return { bg: 'bg-yellow-50', text: 'text-yellow-700', band: 'Moderate' };
  if (score < 8.5) return { bg: 'bg-green-50', text: 'text-green-700', band: 'Leaning High' };
  return { bg: 'bg-emerald-50', text: 'text-emerald-700', band: 'High' };
}

// =====================================================
// SMALL PRESENTATION PIECES
// =====================================================
function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string }> = {
    pending: { label: 'Not Started', className: 'bg-gray-100 text-gray-600' },
    in_progress: { label: 'In Progress', className: 'bg-yellow-50 text-yellow-700' },
    completed: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700' },
  };
  const m = map[status];
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.className}`}>{m.label}</span>;
}

function ConstructBar({ label, score }: { label: string; score: number }) {
  const c = scoreColor(score);
  return (
    <div className={`rounded-md p-3.5 ${c.bg}`}>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-sm font-semibold text-[#0A1E3D]">{label}</p>
        <p className={`text-sm font-bold ${c.text}`}>{score.toFixed(1)}</p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/70 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score * 10}%`, backgroundColor: BRAND }} />
      </div>
      <p className={`text-xs mt-1.5 font-medium ${c.text}`}>{c.band}</p>
    </div>
  );
}

// -----------------------------------------------------
// RADAR CHART — all 10 traits at a glance.
// Plain SVG, hand-computed polar coordinates — no charting library,
// consistent with the rest of this codebase's visuals.
// -----------------------------------------------------
function RadarChart({ scores }: { scores: Record<ConstructKey, number> }) {
  const size = 340;
  const center = size / 2;
  const maxR = 118;
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  const axes = CONSTRUCTS.map((key, i) => ({
    key,
    angle: -Math.PI / 2 + i * ((2 * Math.PI) / CONSTRUCTS.length),
  }));

  const point = (angle: number, r: number) => `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;

  const dataPoints = axes.map((a) => point(a.angle, (scores[a.key] / 10) * maxR)).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Radar chart of all ten trait scores">
      {gridLevels.map((level) => (
        <polygon key={level} points={axes.map((a) => point(a.angle, level * maxR)).join(' ')} fill="none" stroke="#E2E8F0" strokeWidth={1} />
      ))}
      {axes.map((a) => (
        <line key={a.key} x1={center} y1={center} x2={center + maxR * Math.cos(a.angle)} y2={center + maxR * Math.sin(a.angle)} stroke="#E2E8F0" strokeWidth={1} />
      ))}
      <polygon points={dataPoints} fill="#0A1E3D2E" stroke={BRAND} strokeWidth={2} />
      {axes.map((a) => {
        const r = (scores[a.key] / 10) * maxR;
        return <circle key={`${a.key}-dot`} cx={center + r * Math.cos(a.angle)} cy={center + r * Math.sin(a.angle)} r={3} fill={BRAND} />;
      })}
      {axes.map((a) => {
        const labelR = maxR + 26;
        const x = center + labelR * Math.cos(a.angle);
        const y = center + labelR * Math.sin(a.angle);
        return (
          <text key={a.key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight={600} fill="#374151">
            {CONSTRUCT_META[a.key].label.split(' ')[0].split('/')[0]}
          </text>
        );
      })}
    </svg>
  );
}

// -----------------------------------------------------
// ROLE FIT BAR CHART — the 5 roles compared side by side.
// -----------------------------------------------------
function RoleFitChart({ roleFit }: { roleFit: { role: RoleKey; score: number }[] }) {
  return (
    <div className="space-y-3" role="img" aria-label="Bar chart comparing fit scores across the five founding-team roles">
      {roleFit.map((fit) => {
        const c = scoreColor(fit.score);
        return (
          <div key={fit.role}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{ROLE_META[fit.role].label}</span>
              <span className={`text-sm font-bold ${c.text}`}>{fit.score.toFixed(1)}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${fit.score * 10}%`, backgroundColor: BRAND }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------
// HEADER BACKGROUND PATTERN — identical diagonal-line pattern used on the
// Business Heat Map tool's header. Renders as an absolutely-positioned
// overlay at 20% opacity behind the header's text content.
// -----------------------------------------------------
function HeaderBackgroundPattern() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="founder-fit-grid" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#founder-fit-grid)" />
      </svg>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================
type Phase = 'setup' | 'roster' | 'consent' | 'test' | 'individual' | 'team';

export default function FounderPsychometricClient() {
  const [roster, setRoster] = useState<Participant[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<Phase>('setup');
  const [activeId, setActiveId] = useState<string | null>(null);

  // setup-screen local state
  const [plannedCount, setPlannedCount] = useState<number | null>(null);
  const [draftRows, setDraftRows] = useState<{ name: string; email: string }[]>([]);
  const [setupTouched, setSetupTouched] = useState(false);

  // roster-screen "add more" state
  const [addingMore, setAddingMore] = useState(false);
  const [addCount, setAddCount] = useState<number>(1);
  const [addRows, setAddRows] = useState<{ name: string; email: string }[]>([{ name: '', email: '' }]);

  // test-screen state
  const [currentQ, setCurrentQ] = useState(0);
  const [advancing, setAdvancing] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // -------------------------------------------------
  // Load from localStorage once on mount
  // -------------------------------------------------
  useEffect(() => {
    const state = loadState();
    setRoster(state.roster);
    setPhase(state.roster.length > 0 ? 'roster' : 'setup');
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState({ roster });
  }, [roster, hydrated]);

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // -------------------------------------------------
  // SETUP flow
  // -------------------------------------------------
  function handlePlanCount(n: number) {
    const count = Math.max(1, Math.min(20, Math.round(n)));
    setPlannedCount(count);
    setDraftRows(Array.from({ length: count }, () => ({ name: '', email: '' })));
    setSetupTouched(false);
  }

  function handleCreateRoster() {
    setSetupTouched(true);
    if (draftRows.some((r) => !r.name.trim()) || draftRows.some((r) => !isValidEmail(r.email))) return;

    const created: Participant[] = draftRows.map((r) => ({
      id: makeId(),
      name: r.name.trim(),
      email: r.email.trim(),
      status: 'pending',
      answers: {},
    }));
    setRoster(created);
    setPhase('roster');
    scrollTop();
  }

  // -------------------------------------------------
  // ADD MORE PEOPLE (post-test, roster screen)
  // -------------------------------------------------
  function handleAddCount(n: number) {
    const count = Math.max(1, Math.min(20, Math.round(n)));
    setAddCount(count);
    setAddRows(Array.from({ length: count }, () => ({ name: '', email: '' })));
  }

  function handleAppendToRoster() {
    if (addRows.some((r) => !r.name.trim()) || addRows.some((r) => !isValidEmail(r.email))) return;
    const created: Participant[] = addRows.map((r) => ({
      id: makeId(),
      name: r.name.trim(),
      email: r.email.trim(),
      status: 'pending',
      answers: {},
    }));
    setRoster((prev) => [...prev, ...created]);
    setAddingMore(false);
    setAddCount(1);
    setAddRows([{ name: '', email: '' }]);
  }

  // -------------------------------------------------
  // TEST flow
  // -------------------------------------------------
  function startTest(id: string) {
    setActiveId(id);
    setRoster((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status === 'completed' ? p.status : 'in_progress' } : p)));
    setCurrentQ(0);
    setPhase('consent');
    scrollTop();
  }

  function beginQuestions() {
    setPhase('test');
    scrollTop();
  }

  function handleAnswer(value: number) {
    if (advancing || !activeId) return;
    const q = QUESTIONS[currentQ];

    setRoster((prev) => prev.map((p) => (p.id === activeId ? { ...p, answers: { ...p.answers, [q.id]: value } } : p)));
    setAdvancing(true);

    window.setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        setRoster((prev) => prev.map((p) => (p.id === activeId ? { ...p, status: 'completed' } : p)));
        setPhase('individual');
      }
      scrollTop();
      setAdvancing(false);
    }, ADVANCE_DELAY_MS);
  }

  function viewReport(id: string) {
    setActiveId(id);
    setPhase('individual');
    scrollTop();
  }

  function resetAll() {
    if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY);
    setRoster([]);
    setActiveId(null);
    setPlannedCount(null);
    setDraftRows([]);
    setPhase('setup');
  }

  if (!hydrated) return null;

  const completedParticipants = roster.filter((p) => p.status === 'completed' && hasCompleteAnswers(p.answers));

  // =====================================================
  // PHASE: SETUP
  // =====================================================
  if (phase === 'setup') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="relative bg-[#0A1E3D] pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <HeaderBackgroundPattern />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-4">Founder &amp; Founding-Team Fit Assessment</p>
            <h1 className="text-3xl sm:text-4xl text-white mb-4 leading-tight">Match the People to the Responsibilities, Before You Assign Them</h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
              This is built for the people making judgment calls in an early-stage business — founders, co-founders,
              and the first functional leads. It's not a general aptitude or literacy test, and it's not meant for
              operational or shop-floor roles. Everything below runs and is scored on this device; nothing is sent
              anywhere.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm mb-6">
              <h2 className="text-xl font-semibold text-[#0A1E3D] mb-2">How to take it honestly</h2>
              <ul className="text-sm text-gray-600 leading-relaxed space-y-2 list-disc pl-5">
                <li>There are 32 short statements, answered on a 5-point agree/disagree scale.</li>
                <li>Several statements will feel similar to ones you've already answered. That's intentional — it's how the results stay honest rather than easy to game.</li>
                <li>Answer with your first, honest reaction. Don't try to reverse-engineer what a "good" answer looks like — the scoring is built to catch that.</li>
                <li>Takes about 8–10 minutes per person.</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-8 shadow-sm">
              {plannedCount === null ? (
                <>
                  <h2 className="text-xl font-semibold text-[#0A1E3D] mb-2">How many people are taking this right now?</h2>
                  <p className="text-sm text-gray-500 mb-5">You can always add more people to the roster later, after this batch has finished.</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      defaultValue={1}
                      id="planned-count-input"
                      className="w-24 rounded-md border-2 border-gray-200 bg-white px-3 py-2 text-lg font-semibold text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:border-[#0A1E3D]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('planned-count-input') as HTMLInputElement | null;
                        handlePlanCount(el ? Number(el.value) || 1 : 1);
                      }}
                      className="bg-[#0A1E3D] hover:opacity-90 text-white py-2.5 px-6 rounded-md font-medium text-sm transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-[#0A1E3D] mb-1">Who's taking it?</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Add each person's name and email. In production this is where they'd receive a personal link — for
                    this demo, you'll hand the device to each person (or they'll open it themselves) when it's their turn.
                  </p>

                  <div className="space-y-3 mb-6">
                    {draftRows.map((row, i) => (
                      <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          placeholder={`Name — Person ${i + 1}`}
                          value={row.name}
                          onChange={(e) => setDraftRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, name: e.target.value } : r)))}
                          className={`rounded-md border-2 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none ${setupTouched && !row.name.trim() ? 'border-red-300' : 'border-gray-200 focus:border-[#0A1E3D]'}`}
                        />
                        <input
                          type="email"
                          placeholder="Email (optional for this demo)"
                          value={row.email}
                          onChange={(e) => setDraftRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, email: e.target.value } : r)))}
                          className={`rounded-md border-2 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none ${setupTouched && !isValidEmail(row.email) ? 'border-red-300' : 'border-gray-200 focus:border-[#0A1E3D]'}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPlannedCount(null)}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2.5"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateRoster}
                      className="flex-1 bg-[#0A1E3D] hover:opacity-90 text-white py-3 px-6 rounded-md font-medium text-sm transition-all"
                    >
                      Create Assessment Roster
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // PHASE: ROSTER (dashboard)
  // =====================================================
  if (phase === 'roster') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="relative bg-[#0A1E3D] pt-16 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <HeaderBackgroundPattern />
          <div className="relative max-w-4xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-3">Founder &amp; Founding-Team Fit Assessment</p>
            <h1 className="text-2xl sm:text-3xl text-white">Assessment Roster</h1>
          </div>
        </section>

        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm mb-6 overflow-hidden">
              {roster.map((p, i) => (
                <div key={p.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                  <div>
                    <p className="text-sm font-semibold text-[#0A1E3D]">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.email || 'No email on file'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={p.status} />
                    {p.status === 'completed' ? (
                      <button
                        type="button"
                        onClick={() => viewReport(p.id)}
                        className="text-sm font-medium text-[#0A1E3D] border-2 border-[#0A1E3D] rounded-md px-4 py-1.5 hover:bg-[#EEF2F9] transition-all"
                      >
                        View Report
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startTest(p.id)}
                        className="text-sm font-medium text-white bg-[#0A1E3D] rounded-md px-4 py-1.5 hover:opacity-90 transition-all"
                      >
                        {p.status === 'in_progress' ? 'Resume Assessment' : 'Take Assessment'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ADD MORE PEOPLE */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5 sm:p-6 mb-6">
              {!addingMore ? (
                <button
                  type="button"
                  onClick={() => setAddingMore(true)}
                  className="text-sm font-semibold text-[#0A1E3D] hover:underline"
                >
                  + Add More People to This Roster
                </button>
              ) : (
                <>
                  <h3 className="text-base font-semibold text-[#0A1E3D] mb-1">How many more people?</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={addCount}
                      onChange={(e) => handleAddCount(Number(e.target.value) || 1)}
                      className="w-20 rounded-md border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-[#0A1E3D] placeholder:text-gray-400 focus:outline-none focus:border-[#0A1E3D]"
                    />
                  </div>
                  <div className="space-y-2.5 mb-4">
                    {addRows.map((row, i) => (
                      <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          placeholder={`Name — Person ${i + 1}`}
                          value={row.name}
                          onChange={(e) => setAddRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, name: e.target.value } : r)))}
                          className="rounded-md border-2 border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0A1E3D]"
                        />
                        <input
                          type="email"
                          placeholder="Email (optional for this demo)"
                          value={row.email}
                          onChange={(e) => setAddRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, email: e.target.value } : r)))}
                          className="rounded-md border-2 border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0A1E3D]"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setAddingMore(false)} className="text-sm font-medium text-gray-500 px-4 py-2">
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAppendToRoster}
                      className="bg-[#0A1E3D] hover:opacity-90 text-white py-2.5 px-6 rounded-md font-medium text-sm transition-all"
                    >
                      Add to Roster
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={completedParticipants.length === 0}
                onClick={() => setPhase('team')}
                className={`flex-1 py-3 px-6 rounded-md font-medium text-sm transition-all ${
                  completedParticipants.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#0A1E3D] hover:opacity-90 text-white'
                }`}
              >
                View Team Report Card {completedParticipants.length > 0 ? `(${completedParticipants.length} completed)` : ''}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="py-3 px-6 rounded-md font-medium text-sm text-gray-500 border-2 border-gray-200 hover:border-gray-300 transition-all"
              >
                Start a New Assessment Round
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const activeParticipant = roster.find((p) => p.id === activeId) || null;

  // =====================================================
  // PHASE: CONSENT / INSTRUCTIONS
  // =====================================================
  if (phase === 'consent' && activeParticipant) {
    return (
      <main className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4" ref={topRef}>
        <div className="max-w-xl w-full bg-white border border-gray-200 rounded-md p-7 sm:p-9 shadow-sm">
          <p className="text-sm text-gray-400 mb-2">Founder &amp; Founding-Team Fit Assessment</p>
          <h1 className="text-2xl font-semibold text-[#0A1E3D] mb-4">Hi {activeParticipant.name.split(' ')[0]}, before you start</h1>
          <ul className="text-sm text-gray-600 leading-relaxed space-y-2.5 list-disc pl-5 mb-7">
            <li>32 short statements, roughly 8–10 minutes.</li>
            <li>Answer with your first honest reaction — there's no right answer.</li>
            <li>Some statements will feel similar to earlier ones. That's deliberate, not a mistake.</li>
            <li>Your answers stay on this device for this session — they aren't sent anywhere.</li>
          </ul>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setPhase('roster')} className="text-sm font-medium text-gray-500 px-4 py-2.5">
              Back
            </button>
            <button
              type="button"
              onClick={beginQuestions}
              className="flex-1 bg-[#0A1E3D] hover:opacity-90 text-white py-3 px-6 rounded-md font-medium text-sm transition-all"
            >
              Begin Assessment
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // PHASE: TEST
  // =====================================================
  if (phase === 'test' && activeParticipant) {
    const q = QUESTIONS[currentQ];
    const currentAnswer = activeParticipant.answers[q.id];
    const progress = Math.round(((currentQ + (currentAnswer !== undefined ? 1 : 0)) / QUESTIONS.length) * 100);

    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <style>{`
          @keyframes slideInRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
          .slide-in-right { animation: slideInRight 0.26s ease-out; }
        `}</style>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-sm text-gray-500 font-medium">{activeParticipant.name}</span>
            <span className="text-sm text-gray-600 font-semibold">
              Question {currentQ + 1} of {QUESTIONS.length}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-7 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: BRAND }} />
          </div>

          <div key={q.id} className="bg-white border border-gray-200 rounded-md p-6 sm:p-9 shadow-sm mb-6 slide-in-right">
            <p className="text-xl sm:text-2xl font-medium text-gray-800 mb-8 leading-snug">{q.text}</p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {LIKERT_OPTIONS.map((opt) => {
                const isSelected = currentAnswer === opt.value;
                const locked = advancing && !isSelected;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={advancing}
                    onClick={() => handleAnswer(opt.value)}
                    aria-pressed={isSelected}
                    className={`flex-1 text-center rounded-lg border-2 px-2 py-4 transition-all duration-150 active:scale-[0.98] ${
                      isSelected ? '' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    } ${locked ? 'opacity-40' : ''}`}
                    style={isSelected ? { borderColor: BRAND, backgroundColor: TINT } : undefined}
                  >
                    <p className="text-xs sm:text-sm font-semibold leading-tight" style={{ color: isSelected ? BRAND : '#374151' }}>
                      {opt.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // PHASE: INDIVIDUAL REPORT
  // =====================================================
  if (phase === 'individual' && activeParticipant) {
    const report: IndividualReport = generateIndividualReport(activeParticipant.name, activeParticipant.answers);
    const topRole = ROLE_META[report.roleFit[0].role];

    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="relative bg-[#0A1E3D] pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <HeaderBackgroundPattern />
          <div className="relative max-w-4xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-3">{activeParticipant.name} · Fit Report</p>
            <h1 className="text-3xl sm:text-4xl text-white mb-3">Strongest Fit: {topRole.label}</h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">{topRole.oneLiner}</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* SUMMARY */}
            <div className="bg-white border border-gray-200 rounded-md p-6 sm:p-7 shadow-sm">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{report.overallSummary}</p>
            </div>

            {/* VALIDITY NOTE */}
            {(report.validity.elevatedImpressionManagement || report.validity.reliabilityIndex < 6) && (
              <div className="border-2 border-yellow-300 bg-yellow-50 rounded-md p-5">
                <p className="text-sm font-semibold text-yellow-800 mb-1">Read This Result With Some Caution</p>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  {report.validity.elevatedImpressionManagement
                    ? 'This person agreed strongly with statements almost no one can honestly agree with in absolute terms. Treat the scores as a conversation starter rather than a final read.'
                    : `Reliability index: ${report.validity.reliabilityIndex.toFixed(1)}/10 — answers to related statements varied more than typical on ${report.validity.inconsistentConstructs
                        .map((c) => CONSTRUCT_META[c].label)
                        .join(', ')}.`}
                </p>
              </div>
            )}

            {/* TRAIT PROFILE — RADAR CHART */}
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Trait Profile at a Glance</p>
              <p className="text-sm text-gray-500 mb-4">All ten traits plotted together — the shape matters more than any single point.</p>
              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                <RadarChart scores={Object.fromEntries(CONSTRUCTS.map((c) => [c, report.constructScores[c].score])) as Record<ConstructKey, number>} />
              </div>
            </div>

            {/* ROLE FIT */}
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Role Fit Ranking</p>
              <p className="text-sm text-gray-500 mb-4">Where this person's natural tendencies point, ranked highest to lowest.</p>

              <div className="bg-white border border-gray-200 rounded-md p-5 sm:p-6 shadow-sm mb-4">
                <RoleFitChart roleFit={report.roleFit} />
              </div>

              <div className="space-y-3">
                {report.roleFit.map((fit, i) => {
                  const meta = ROLE_META[fit.role];
                  const c = scoreColor(fit.score);
                  return (
                    <div key={fit.role} className={`rounded-md border-2 p-4 sm:p-5 ${i === 0 ? 'border-[#0A1E3D]' : 'border-gray-200'} bg-white`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-base font-semibold text-[#0A1E3D]">{meta.label}</p>
                        <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>{fit.score.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{meta.oneLiner}</p>
                      {i === 0 && (
                        <div className="border-t border-gray-100 pt-3 mt-1">
                          <p className="text-xs font-semibold text-gray-500 mb-1.5">Fits well with</p>
                          <p className="text-sm text-gray-600 mb-3">{meta.idealResponsibilities.join(' · ')}</p>
                          <p className="text-xs font-semibold text-gray-500 mb-1.5">Watch for</p>
                          <p className="text-sm text-gray-600">{meta.watchOuts.join(' ')}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CONSTRUCT SCORES */}
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Full Trait Breakdown</p>
              <p className="text-sm text-gray-500 mb-4">All scores are out of 10. This is the raw signal the role-fit ranking above is built from.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CONSTRUCTS.map((c) => (
                  <ConstructBar key={c} label={CONSTRUCT_META[c].label} score={report.constructScores[c].score} />
                ))}
              </div>
            </div>

            {/* STRENGTHS / BLIND SPOTS */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="border-2 border-[#0A1E3D] bg-[#EEF2F9] rounded-md p-5">
                <p className="text-base font-semibold text-[#0A1E3D] mb-3">Strongest Traits</p>
                {report.topStrengths.map((c) => (
                  <p key={c} className="text-sm text-[#0A1E3D] leading-relaxed mb-2 flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0A1E3D] flex-shrink-0" />
                    <span><strong>{CONSTRUCT_META[c].label}:</strong> {CONSTRUCT_META[c].highDescription}</span>
                  </p>
                ))}
              </div>
              <div className="border-2 border-gray-300 bg-white rounded-md p-5">
                <p className="text-base font-semibold text-[#0A1E3D] mb-3">Likely Blind Spots</p>
                {report.blindSpots.map((c) => (
                  <p key={c} className="text-sm text-gray-600 leading-relaxed mb-2 flex items-start gap-2">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                    <span><strong>{CONSTRUCT_META[c].label}:</strong> {CONSTRUCT_META[c].lowDescription}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* PATTERN INSIGHTS */}
            {report.patternInsights.length > 0 && (
              <div>
                <p className="text-lg font-semibold text-[#0A1E3D] mb-1">What This Combination Means in Practice</p>
                <p className="text-sm text-gray-500 mb-4">Single scores rarely tell you what to do with someone — these are the combinations that do.</p>
                <div className="border-2 border-[#0A1E3D] bg-[#EEF2F9] rounded-md p-4 sm:p-5">
                  {report.patternInsights.map((p, i) => (
                    <div key={p.title} className={i > 0 ? 'mt-4 pt-4 border-t border-[#0A1E3D]/10' : ''}>
                      <p className="text-base font-semibold text-[#0A1E3D] mb-1.5">{p.title}</p>
                      <p className="text-sm text-[#0A1E3D] leading-relaxed mb-1.5">{p.insight}</p>
                      <p className="text-sm text-[#0A1E3D] leading-relaxed font-medium">→ {p.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setPhase('roster')}
                className="flex-1 py-3 px-6 rounded-md font-medium text-sm border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
              >
                Back to Roster
              </button>
              {completedParticipants.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPhase('team')}
                  className="flex-1 py-3 px-6 rounded-md font-medium text-sm bg-[#0A1E3D] hover:opacity-90 text-white transition-all"
                >
                  View Team Report Card
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // PHASE: TEAM REPORT
  // =====================================================
  if (phase === 'team') {
    const team: TeamReport = generateTeamReport(completedParticipants.map((p) => ({ name: p.name, answers: p.answers })));

    return (
      <main className="min-h-screen bg-[#F0F4F8]" ref={topRef}>
        <section className="relative bg-[#0A1E3D] pt-20 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <HeaderBackgroundPattern />
          <div className="relative max-w-4xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-wide mb-3">Team Report Card</p>
            <h1 className="text-3xl sm:text-4xl text-white mb-3">How This Team's Tendencies Line Up</h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Based on {completedParticipants.length} completed assessment{completedParticipants.length === 1 ? '' : 's'}.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* ROLE COVERAGE */}
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Role Coverage</p>
              <p className="text-sm text-gray-500 mb-4">Who leads each function, based on natural fit rather than title.</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {team.roleLeaders.map(({ role, leader, score }) => {
                  const meta = ROLE_META[role];
                  const isGap = team.coverageGaps.includes(role);
                  return (
                    <div key={role} className={`rounded-md p-4 border-2 ${isGap ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
                      <p className="text-sm font-semibold text-[#0A1E3D] mb-1">{meta.label}</p>
                      {leader ? (
                        <p className="text-sm text-gray-600">
                          <strong>{leader}</strong> — {score?.toFixed(1)}/10
                        </p>
                      ) : (
                        <p className="text-sm text-red-600">No one assessed yet</p>
                      )}
                      {isGap && <p className="text-xs text-red-600 mt-1 font-medium">Coverage gap</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NARRATIVE */}
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">What This Means For You</p>
              <p className="text-sm text-gray-500 mb-4">The practical read on the team's shape — not just the scores.</p>
              <div className="border-2 border-[#0A1E3D] bg-[#EEF2F9] rounded-md p-4 sm:p-5">
                {team.narrative.map((n, i) => (
                  <p key={i} className={`text-sm text-[#0A1E3D] leading-relaxed flex items-start gap-2 ${i > 0 ? 'mt-4 pt-4 border-t border-[#0A1E3D]/10' : ''}`}>
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#0A1E3D] flex-shrink-0" />
                    <span>{n}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* PER-PERSON TABLE */}
            <div>
              <p className="text-lg font-semibold text-[#0A1E3D] mb-1">Everyone Assessed</p>
              <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                {team.members.map((m, i) => {
                  const participant = completedParticipants.find((p) => p.name === m.name);
                  return (
                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <div>
                        <p className="text-sm font-semibold text-[#0A1E3D]">{m.name}</p>
                        <p className="text-xs text-gray-400">
                          Top fit: {ROLE_META[m.topRole].label} ({m.topRoleScore.toFixed(1)}) · Reliability {m.reliabilityIndex.toFixed(1)}/10
                        </p>
                      </div>
                      {participant && (
                        <button
                          type="button"
                          onClick={() => viewReport(participant.id)}
                          className="text-sm font-medium text-[#0A1E3D] border-2 border-[#0A1E3D] rounded-md px-4 py-1.5 hover:bg-[#EEF2F9] transition-all"
                        >
                          View Report
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPhase('roster')}
              className="w-full py-3 px-6 rounded-md font-medium text-sm border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all"
            >
              Back to Roster
            </button>
          </div>
        </section>
      </main>
    );
  }

  // Fallback — shouldn't normally be reached.
  return (
    <main className="min-h-screen bg-[#F0F4F8] flex items-center justify-center">
      <button type="button" onClick={() => setPhase('roster')} className="text-sm font-medium text-[#0A1E3D] underline">
        Back to Roster
      </button>
    </main>
  );
}