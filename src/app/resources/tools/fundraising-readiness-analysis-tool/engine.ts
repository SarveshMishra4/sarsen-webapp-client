// engine.ts — pure calculation engine. Money in ₹ Lakhs. All thresholds are editable placeholders (CFG).
import { SOURCES, W, DW, LIB, AREAS, Source } from './data';

export const CFG = {
  procMonths: [0, 4, 5, 6], closeLag: 1, tsWanted: 2,
  valBand: [[0, 0], [300, 1000], [1000, 4000], [4000, 12000]] as number[][], // pre-money ₹L by stage
  stageWeights: [0.3, 0.25, 0.2, 0.1, 0.15],
  fwd: [{ d: 0.2, p: 0.03 }, { d: 0.18, p: 0.02 }], laterRounds: 3, laterD: 0.15, exits: [10000, 50000, 100000],
  warm: { p1: 0.5, p1c: 0.05, p2: 0.6, p3: 0.35, p4: 0.3, p5: 0.8 },
};
export type Hire = { n: number; c: number; m: number };
export type Inp = {
  sector: string; state: string; dpiit: 'yes' | 'no' | 'process'; women: boolean; target: 1 | 2 | 3;
  m2: number; m1: number; m0: number; gm: number; cust: number; churn: number; pilots: number; prior: number; team: number;
  cash: number; burn: number; liab: number; hires: Hire[]; other: number; T: number; buf: number; mm: number; X: number; dt: number;
  F: number; e: number; A: number; pool: number;
  obj: number[]; proof: boolean[]; dil: number[]; warm: number; listQ: number; hours: number; advisor: boolean; solo: boolean; dur: number;
};
export type Flag = { id: string; sev: 'Critical' | 'High' | 'Medium' | 'Info'; title: string; detail: string };
const cl = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const mean = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

export function run(i: Inp) {
  const flags: Flag[] = []; const fl = (id: string, sev: Flag['sev'], title: string, detail: string) => flags.push({ id, sev, title, detail });
  // ---- M1 stage fit
  const g = i.m2 > 0 ? Math.pow(i.m0 / i.m2, 0.5) - 1 : null;
  const votes = [
    i.m0 <= 0 ? 0 : i.m0 < 1 ? 1 : i.m0 < 10 ? 2 : 3,
    g === null ? 0 : g < 0.05 ? 1 : g < 0.15 ? 2 : 3,
    i.cust === 0 && i.pilots === 0 ? 0 : i.cust === 0 ? 1 : i.cust >= 50 && i.churn <= 5 ? 3 : i.cust >= 10 && i.churn <= 8 ? 2 : 1,
    i.prior, i.team <= 2 ? 0 : i.team <= 4 ? 1 : i.team <= 12 ? 2 : 3,
  ];
  const vbar = votes.reduce((s, v, k) => s + v * CFG.stageWeights[k], 0);
  const stage = Math.min(3, Math.round(vbar)); const spread = Math.max(...votes) - Math.min(...votes);
  const tractionFit = votes.reduce((s, v, k) => s + CFG.stageWeights[k] * 100 * Math.min(1, v / i.target), 0);
  const names = ['Revenue', 'Growth', 'Customers', 'Funding history', 'Team'];
  if (i.target - stage >= 1) fl('RF-01', i.target - stage >= 2 ? 'Critical' : 'High', 'Stage overreach', `You want to raise at stage ${i.target} but traction supports stage ${stage}.`);
  if (spread >= 2) fl('RF-02', 'Medium', 'Mixed stage signals', `${names[votes.indexOf(Math.max(...votes))]} looks far ahead of ${names[votes.indexOf(Math.min(...votes))]}.`);
  // ---- M2 raise math
  const sim = (cash0: number, N: number) => { const out: number[] = []; let c = cash0; const gc = Math.min(g ?? 0, 0.1) * 0.5;
    for (let t = 1; t <= N; t++) { const cost = i.burn + i.hires.reduce((s, h) => s + (t >= h.m ? h.n * h.c : 0), 0) + i.other + (t === 1 ? i.liab : 0); c -= cost - i.m0 * Math.pow(1 + gc, t); out.push(c); } return out; };
  const path = sim(i.cash, i.T); const peak = Math.max(0, -Math.min(...path, 0));
  const raise = Math.max(5, Math.ceil((peak * (1 + Math.max(i.buf, 10) / 100)) / 5) * 5);
  const runwayOf = (c0: number) => { const p = sim(c0, 36); const k = p.findIndex(v => v < 0); return k < 0 ? 36 : k + 1; };
  const R0 = runwayOf(i.cash);
  const P = CFG.procMonths[i.target] + (i.warm === 0 ? 1 : 0) + 0;
  const shortfall = [1, 0.8, 0.6].map(k => { const r = runwayOf(i.cash + k * raise); return { k, runway: r, hit: r >= i.mm }; });
  const dilScore = i.dil.reduce((s, v, k) => s + v * DW[k], 0) / 100;
  const P2 = P + (dilScore < 50 ? 1 : 0); const monthsToStart = R0 - (P2 + CFG.closeLag);
  const start = new Date(); start.setMonth(start.getMonth() + Math.max(0, monthsToStart));
  const ratio = i.X / raise; const post = raise / i.dt; const pre = post - raise; const band = CFG.valBand[i.target];
  if (monthsToStart <= 0) fl('RF-04', 'Critical', 'Late start', `Runway of ${R0} mo cannot fit a ${P2}+${CFG.closeLag} month raise. Start now / bridge.`);
  else if (monthsToStart < 2) fl('RF-04b', 'High', 'Start window closing', `Only ${monthsToStart} month(s) before you must start raising.`);
  if (!shortfall[1].hit) fl('RF-05', 'High', 'Fragile ask', `At 80% of the raise, runway (${shortfall[1].runway} mo) misses your milestone (month ${i.mm}).`);
  if (ratio > 1.5) fl('RF-06', ratio > 2.5 ? 'High' : 'Medium', 'Over-ask', `Your number ₹${i.X}L vs calculated ₹${raise}L: ₹${Math.round(i.X - raise)}L unexplained.`);
  if (ratio < 0.8) fl('RF-07', 'High', 'Under-ask', `Your number ₹${i.X}L is below the calculated ₹${raise}L; runway dies before the milestone.`);
  if (pre < band[0] * 0.6 || pre > band[1] * 1.5) fl('RF-10', 'Medium', 'Valuation out of band', `Implied pre-money ₹${Math.round(pre)}L vs typical ₹${band[0]}–${band[1]}L (placeholder band).`);
  if (i.buf < 10 && !shortfall[1].hit) fl('RF-09', 'High', 'Thin planning', 'Buffer under 10% and the 80% shortfall test fails.');
  const askScore = mean([ratio >= 0.85 && ratio <= 1.15 ? 100 : cl(100 - Math.abs(ratio - 1) * 100 / 0.6), i.buf >= 15 ? 100 : i.buf >= 10 ? 70 : i.buf >= 1 ? 30 : 0, shortfall[1].hit ? 100 : 0, monthsToStart >= 3 ? 100 : monthsToStart >= 1 ? 50 : 0, i.hires.filter(h => h.n > 0).length + (i.other > 0 ? 1 : 0) >= 2 ? 100 : 50]);
  // ---- M3 dilution
  const d = raise / post; const p = i.pool / 100; const F = i.F / 100, A = i.A / 100;
  const founderAfter = (1 - d - p) * (F / Math.max(F + A, 0.0001));
  const rounds = [{ label: 'Today', f: F }, { label: 'After this round', f: founderAfter }]; let f = founderAfter;
  CFG.fwd.forEach((r, k) => { f *= 1 - r.d - r.p; rounds.push({ label: `Round +${k + 1}`, f }); });
  const exitF = f * Math.pow(1 - CFG.laterD, CFG.laterRounds);
  const exitTable = CFG.exits.map(e => ({ exit: e, value: e * exitF }));
  if (d > 0.25) fl('RF-11', d > 0.3 ? 'High' : 'Medium', 'Heavy round dilution', `This round dilutes ${(d * 100).toFixed(0)}%.`);
  if (founderAfter < 0.5 && i.target <= 2) fl('RF-12', 'High', 'Founder control', `Founders would hold ${(founderAfter * 100).toFixed(0)}% after this round.`);
  if (i.pool < 8) fl('RF-13', 'Medium', 'Small option pool', 'Pool under 8% will stall hiring.');
  const capScore = 0.35 * (founderAfter >= 0.6 ? 100 : founderAfter >= 0.5 ? 70 : founderAfter >= 0.4 ? 40 : 10) + 0.25 * (d <= 0.2 ? 100 : d <= 0.25 ? 70 : d <= 0.3 ? 40 : 10) + 0.15 * (i.pool >= 10 ? 100 : i.pool >= 8 ? 70 : 30) + 0.15 * 80 + 0.1 * i.dil[0];
  // ---- M4 matcher
  const mrr = i.m0;
  const ranked = SOURCES.map(s => {
    const stretch = i.target < s.smin || i.target > s.smax; const out = i.target < s.smin - 1 || i.target > s.smax + 1;
    if (out || (s.sec !== 'any' && !s.sec.includes(i.sector)) || (s.geo !== 'all' && !s.geo.includes(i.state)) || (s.dpiit && i.dpiit === 'no') || (s.women && !i.women) || (s.minMrr && mrr < s.minMrr)) return null;
    const mid = (s.cmin + s.cmax) / 2; const cq = mid > raise ? 0.5 : mid >= 0.05 * raise ? 1 : mid / (0.05 * raise);
    const fit = 100 * (0.3 * (stretch ? 0.5 : 1) + 0.2 * cq + 0.2 * (s.sec === 'any' ? 0.6 : 1) + 0.15 * (s.dpiit && i.dpiit === 'process' ? 0.7 : 1) + 0.1 * (s.geo === 'all' ? 0.7 : 1) + 0.05 * 0.2);
    return { s, fit, stretch, priority: 0.75 * fit + 0.25 * ((5 - s.effort) / 4) * 100, lead: s.dil && s.cmax >= 0.4 * raise };
  }).filter(Boolean).sort((a, b) => b!.priority - a!.priority) as { s: Source; fit: number; stretch: boolean; priority: number; lead: boolean }[];
  const nd = ranked.filter(r => !r.s.dil).slice(0, 8);
  const ndReal = nd.reduce((s, r) => s + ((r.s.cmin + r.s.cmax) / 2) * r.s.p, 0); const ndMax = nd.reduce((s, r) => s + r.s.cmax, 0);
  const ndPct = cl((ndReal / raise) * 100);
  if (!ranked.some(r => r.lead)) fl('RF-16', 'High', 'No lead-capable investor', 'No matched investor can plausibly lead a round of this size.');
  if (i.dpiit === 'no') fl('RF-17', 'Info', 'Easy unlock', 'DPIIT recognition would unlock more schemes and tax benefits.');
  // ---- M5 objections
  const adj = i.obj.map((v, k) => (i.proof[k] ? v : Math.min(v, 50)));
  const area = AREAS.map((_, o) => mean([adj[o * 2], adj[o * 2 + 1]]));
  const wsum = W.reduce((s, w) => s + w[i.target], 0); const objScore = W.reduce((s, w, o) => s + w[i.target] * area[o], 0) / wsum;
  const heat = area.map((sc, o) => [0, 1, 2, 3].map(st => ((100 - sc) * W[o][st]) / 5));
  const topAreas = area.map((sc, o) => ({ o, risk: heat[o][i.target] })).sort((a, b) => b.risk - a.risk).slice(0, 3);
  const questions = topAreas.map(t => ({ area: AREAS[t.o], ...LIB[t.o], risk: t.risk }));
  if (i.obj.filter((v, k) => v >= 75 && !i.proof[k]).length >= 6) fl('RF-18', 'Medium', 'Confidence without proof', '6+ answers rated high but without evidence — capped at 50.');
  area.forEach((sc, o) => { if (W[o][i.target] >= 4 && sc < 40) fl('RF-19', 'High', `Blind spot: ${AREAS[o]}`, `Investors weigh this heavily at your stage; score ${sc.toFixed(0)}/100.`); });
  if (i.obj[12] >= 75 && i.hires.filter(h => h.n > 0).length + (i.other > 0 ? 1 : 0) < 2) fl('RF-23', 'Medium', 'Conflict: spend plan', 'You rated your use-of-funds strong but entered fewer than 2 planned cost lines.');
  if (i.obj[4] >= 75 && (i.gm < 30 || i.churn < 0)) fl('RF-24', 'Medium', 'Conflict: unit economics', 'Rated strong, but gross margin is under 30% or churn is untracked.');
  if (i.obj[10] >= 75 && g !== null && g < 0.05) fl('RF-08', 'Medium', 'Conflict: growth', `Channel rated repeatable but computed monthly growth is ${(g * 100).toFixed(1)}%.`);
  // ---- M6 outreach
  const c = CFG.warm; const meetings = CFG.tsWanted / c.p5 / (c.p3 * c.p4);
  let N = meetings / (c.p1c * c.p2); for (let k = 0; k < 4; k++) { const w = Math.min(1, i.warm / N); N = meetings / ((w * c.p1 + (1 - w) * c.p1c) * c.p2); }
  N = Math.ceil(N); const Np = Math.min(N, 60); const wShare = Math.min(1, i.warm / Np);
  const prep = Math.max(3, Math.ceil(dilScore < 50 ? 6 : 4)); const totalWeeks = prep + 2 + 3 + 4 + 4; const availWeeks = 4.33 * (R0 - CFG.closeLag);
  const feasible = totalWeeks <= availWeeks;
  if (wShare < 0.15 && i.target >= 2) fl('RF-20', 'High', 'Cold-heavy outreach', `Only ${(wShare * 100).toFixed(0)}% warm; ${N} contacts needed by the funnel — build warm paths.`);
  if (!feasible) fl('RF-21', 'Critical', 'Timeline infeasible', `Plan needs ~${totalWeeks} weeks but only ~${Math.floor(availWeeks)} weeks of runway remain.`);
  if (i.dur < 3) fl('RF-22', 'Medium', 'Unrealistic timeline', 'Raises rarely close in under 3 months.');
  const outScore = 0.4 * i.listQ + 0.35 * cl((i.warm / Math.max(1, 0.3 * Np)) * 100) + 0.25 * (feasible ? 100 : Math.max(0, (100 * availWeeks) / totalWeeks - 20));
  if (dilScore < 50 && monthsToStart < 2) fl('RF-25', 'High', 'Diligence exposure', 'Weak documents and a short start window: gaps will surface in the first diligence request.');
  if (i.solo && !i.advisor && i.target >= 2) fl('RF-26', 'Medium', 'Solo founder, no advisor', 'Seed+ investors expect team depth or a strong advisor.');
  const perWeek = Math.ceil(Np / 5);
  // ---- M7 gap plan
  type Task = { t: string; days: number; impact: number; gate: boolean };
  const tasks: Task[] = [];
  DW.forEach((_, k) => { if (i.dil[k] < 100) tasks.push({ t: `Complete: ${['Cap table', 'Financial model', 'Legal docs', 'Metrics dashboard', 'Pitch deck', 'Customer references', 'IP / contracts', 'Data-room folder'][k]}`, days: i.dil[k] === 50 ? 2 : 4, impact: DW[k] >= 15 ? 5 : 3, gate: DW[k] >= 15 }); });
  area.forEach((sc, o) => { if (sc < 60) tasks.push({ t: `Build evidence for "${AREAS[o]}" (${sc.toFixed(0)}/100)`, days: 3, impact: Math.min(5, W[o][i.target]), gate: false }); });
  flags.forEach(fg => { if (fg.id === 'RF-06') tasks.push({ t: 'Rebuild use-of-funds sheet with line items', days: 2, impact: 4, gate: true }); if (fg.id === 'RF-17') tasks.push({ t: 'Apply for DPIIT recognition', days: 2, impact: 4, gate: false }); if (fg.id === 'RF-20') tasks.push({ t: 'Map warm-intro paths for top 15 targets', days: 4, impact: 5, gate: true }); });
  if (i.proof.filter(x => !x).length > 6) tasks.push({ t: 'Collect proof documents for weak areas', days: 4, impact: 4, gate: false });
  tasks.push({ t: 'Test pitch on 3 outsiders', days: 2, impact: 4, gate: true });
  const urg = monthsToStart < 2 ? 1.5 : 1; const sorted = tasks.map(t => ({ ...t, pr: (t.impact * (t.gate ? urg : 1)) / t.days })).sort((a, b) => (b.gate ? 1 : 0) - (a.gate ? 1 : 0) || b.pr - a.pr);
  const cap = Math.max(1, (i.hours / 8) * 4.33 * Math.max(1, monthsToStart)); let used = 0; const plan: { t: string; bucket: string }[] = []; const off: string[] = [];
  sorted.forEach(t => { if (used + t.days <= cap) { used += t.days; const w = (used / (i.hours / 8 || 1)); plan.push({ t: t.t, bucket: w <= 4.33 ? '30' : w <= 8.66 ? '60' : '90' }); } else off.push(t.t); });
  // ---- Scoring
  const dims = [['Traction Fit', tractionFit, 20], ['Ask Clarity', askScore, 20], ['Objection Readiness', objScore, 20], ['Diligence', dilScore, 15], ['Outreach', outScore, 15], ['Cap Table Health', capScore, 10]] as [string, number, number][];
  const raw = dims.reduce((s, d2) => s + (d2[1] * d2[2]) / 100, 0);
  const cap2 = flags.some(x => x.sev === 'Critical') ? 55 : flags.some(x => x.sev === 'High') ? 75 : 100; const overall = Math.min(raw, cap2);
  const verdict = overall < 40 ? 'Not ready — do not start outreach' : overall < 60 ? 'Prepare 60–90 days, then launch' : overall < 80 ? 'Soft-launch while closing gaps' : 'Launch';
  return { g, votes, names, stage, spread, tractionFit, raise, R0, monthsToStart, start, shortfall, ratio, pre, post, askScore, d, founderAfter, rounds, exitTable, exitF, capScore,
    ranked, nd, ndReal, ndMax, ndPct, area, heat, questions, meetings, N, Np, wShare, totalWeeks, availWeeks, feasible, perWeek, outScore, dilScore, plan, off, dims, raw, overall, verdict, flags: flags.sort((a, b) => ['Critical', 'High', 'Medium', 'Info'].indexOf(a.sev) - ['Critical', 'High', 'Medium', 'Info'].indexOf(b.sev)) };
}
export type Result = ReturnType<typeof run>;
export const DEFAULT: Inp = {
  sector: 'SaaS/Software', state: 'Karnataka', dpiit: 'no', women: false, target: 2,
  m2: 2, m1: 2.5, m0: 3, gm: 70, cust: 12, churn: 6, pilots: 5, prior: 1, team: 5,
  cash: 30, burn: 8, liab: 0, hires: [{ n: 2, c: 1.5, m: 2 }, { n: 1, c: 2, m: 6 }, { n: 0, c: 0, m: 1 }], other: 3, T: 18, buf: 10, mm: 14, X: 250, dt: 0.18,
  F: 85, e: 0, A: 15, pool: 10, obj: Array(18).fill(50), proof: Array(18).fill(false), dil: Array(8).fill(50), warm: 6, listQ: 20, hours: 20, advisor: false, solo: false, dur: 4,
};
