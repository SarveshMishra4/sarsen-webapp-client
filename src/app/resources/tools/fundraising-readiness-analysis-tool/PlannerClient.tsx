'use client';
// PlannerClient.tsx — wizard, free preview, simulated payment, PDF download. Requires: npm i jspdf
import { useMemo, useState } from 'react';
import { run, DEFAULT, Inp, Result } from './engine';
import { AREAS, OBJ_Q, DILIGENCE, SECTORS, STATES, OVERLOOK_STAT } from './data';

const fmt = (l: number) => (l >= 100 ? `₹${(l / 100).toFixed(2)} Cr` : `₹${Math.round(l)} L`);
const SEV: Record<string, string> = { Critical: 'bg-red-600 text-white', High: 'bg-orange-500 text-white', Medium: 'bg-yellow-400 text-black', Info: 'bg-sky-500 text-white' };
const STEPS = ['Profile', 'Traction', 'Money', 'Cap table', 'Readiness'];
const heatCls = (v: number) => (v >= 50 ? 'bg-red-500 text-white' : v >= 25 ? 'bg-amber-300' : 'bg-green-400');

function Num({ label, v, on, hint }: { label: string; v: number; on: (n: number) => void; hint?: string }) {
  return (<label className="block text-sm"><span className="font-medium">{label}</span>{hint && <span className="ml-1 text-xs text-gray-500">{hint}</span>}
    <input type="number" value={Number.isNaN(v) ? '' : v} onChange={e => on(parseFloat(e.target.value))} className="mt-1 w-full rounded border px-2 py-1.5" /></label>);
}
function Sel({ label, v, on, opts }: { label: string; v: string; on: (s: string) => void; opts: string[] }) {
  return (<label className="block text-sm"><span className="font-medium">{label}</span>
    <select value={v} onChange={e => on(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5">{opts.map(o => <option key={o}>{o}</option>)}</select></label>);
}
function Radar({ dims }: { dims: [string, number, number][] }) {
  const c = 130, r = 90; const pt = (k: number, s: number) => { const a = (Math.PI * 2 * k) / dims.length - Math.PI / 2; return `${c + Math.cos(a) * r * s / 100},${c + Math.sin(a) * r * s / 100}`; };
  return (<svg viewBox="0 0 260 260" className="mx-auto w-full max-w-xs">
    {[25, 50, 75, 100].map(s => <polygon key={s} points={dims.map((_, k) => pt(k, s)).join(' ')} fill="none" stroke="#ddd" />)}
    <polygon points={dims.map((_, k) => pt(k, 70)).join(' ')} fill="none" stroke="#999" strokeDasharray="4" />
    <polygon points={dims.map((d, k) => pt(k, d[1])).join(' ')} fill="rgba(79,70,229,.3)" stroke="#4f46e5" strokeWidth="2" />
    {dims.map((d, k) => { const [x, y] = pt(k, 118).split(',').map(Number); return <text key={d[0]} x={x} y={y} fontSize="9" textAnchor="middle">{d[0]}</text>; })}
  </svg>);
}
function Lock({ paid, children, label }: { paid: boolean; children: React.ReactNode; label: string }) {
  return paid ? <>{children}</> : (<div className="relative"><div className="pointer-events-none select-none blur-sm">{children}</div>
    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-indigo-700">🔒 {label} — in your full report</div></div>);
}

async function makePdf(i: Inp, r: Result) {
  const { jsPDF } = await import('jspdf'); const doc = new jsPDF(); let y = 15;
  const W = 180;
  const line = (t: string, size = 10, bold = false) => { doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.splitTextToSize(t, W).forEach((s: string) => { if (y > 280) { doc.addPage(); y = 15; } doc.text(s, 15, y); y += size * 0.5 + 1.5; }); };
  const h = (t: string) => { y += 4; line(t, 13, true); };
  line('Fundraising Plan', 20, true); line(`${new Date().toDateString()}  |  Sector: ${i.sector}  |  Target stage: ${['', 'Pre-seed', 'Seed', 'Pre-Series A'][i.target]}`);
  h(`Verdict: ${r.verdict} (${r.overall.toFixed(0)}/100)`);
  r.dims.forEach(d => line(`${d[0]}: ${d[1].toFixed(0)}/100`));
  h('1. The number'); line(`Calculated raise: ${fmt(r.raise)} (yours: ${fmt(i.X)}). Runway without raise: ${r.R0} months. Start raising by: ${r.start.toLocaleDateString()} (${r.monthsToStart} months from now).`);
  r.shortfall.forEach(s => line(`If you raise ${s.k * 100}%: runway ${s.runway} mo — milestone (month ${i.mm}) ${s.hit ? 'hit' : 'MISSED'}`));
  line(`Implied valuation at ${(i.dt * 100).toFixed(0)}% dilution: pre ${fmt(r.pre)}, post ${fmt(r.post)}.`);
  h('2. Dilution'); r.rounds.forEach(x => line(`${x.label}: founders ${(x.f * 100).toFixed(1)}%`)); r.exitTable.forEach(x => line(`Exit ${fmt(x.exit)} → founders keep ${fmt(x.value)}`));
  h('3. Red flags'); r.flags.length ? r.flags.forEach(f => line(`[${f.sev}] ${f.id} ${f.title}: ${f.detail}`)) : line('None.');
  h('4. Who to ask (unverified sample data — verify before use)'); line(`Non-dilutive potential (estimate): ~${fmt(r.ndReal)} = ${r.ndPct.toFixed(0)}% of raise; upper bound ${fmt(r.ndMax)}.`);
  r.ranked.slice(0, 14).forEach((x, k) => line(`${k + 1}. ${x.s.name} [${x.s.cat}${x.s.dil ? ', equity' : ', non-dilutive'}] fit ${x.fit.toFixed(0)}${x.stretch ? ' (stretch)' : ''} — ${x.s.how}`));
  h('5. Investor objection prep'); r.questions.forEach(q => { line(`Q (${q.area}): ${q.q}`, 10, true); line(`Testing: ${q.test}. Answer: ${q.skel}. Bring: ${q.proof}.`); });
  h('6. Outreach plan'); line(`Funnel says ~${r.N} contacts; practical list ${r.Np} (warm share ${(r.wShare * 100).toFixed(0)}%). ~${r.perWeek} contacts/week over 5 outreach weeks. Total plan ${r.totalWeeks} weeks vs ${Math.floor(r.availWeeks)} available.`);
  h('7. 30-60-90 gap plan'); (['30', '60', '90'] as const).forEach(b => { line(`Days 1–${b}:`, 10, true); r.plan.filter(p => p.bucket === b).forEach(p => line(`  [ ] ${p.t}`)); });
  if (r.off.length) { line('Will not fit before your raise-by date:', 10, true); r.off.forEach(t => line(`  - ${t}`)); }
  h('Disclaimer'); line('Heuristic estimates from your inputs and editable assumptions. Not legal or financial advice. Source dataset entries are unverified samples.', 9);
  doc.save(`Fundraising-Plan-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export default function PlannerClient() {
  const [i, setI] = useState<Inp>(DEFAULT); const [step, setStep] = useState(0); const [done, setDone] = useState(false);
  const [paid, setPaid] = useState(false); const [modal, setModal] = useState<'' | 'pay' | 'wait'>('');
  const set = <K extends keyof Inp>(k: K, v: Inp[K]) => setI(p => ({ ...p, [k]: v }));
  const r = useMemo(() => (done ? run(i) : null), [i, done]);
  const pay = () => { setModal('wait'); setTimeout(async () => { setPaid(true); setModal(''); await makePdf(i, run(i)); }, 1500); };

  if (done && r) return (
    <main className="mx-auto max-w-4xl space-y-6 p-4">
      <button onClick={() => setDone(false)} className="text-sm text-indigo-600 underline">← Edit inputs</button>
      <section className="rounded-xl border p-5 text-center"><div className="text-5xl font-bold">{r.overall.toFixed(0)}<span className="text-xl">/100</span></div>
        <div className="mt-1 text-lg font-semibold">{r.verdict}</div>
        <div className="mt-1 text-sm text-gray-600">Traction supports stage {['Idea', 'Pre-seed', 'Seed', 'Pre-Series A'][r.stage]}; you are targeting {['', 'Pre-seed', 'Seed', 'Pre-Series A'][i.target]}.</div>
        <Radar dims={r.dims} /></section>
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4"><div className="text-xs text-gray-500">Raise (approx.)</div><div className="text-xl font-bold">{paid ? fmt(r.raise) : `${fmt(r.raise * 0.85)} – ${fmt(r.raise * 1.15)}`}</div></div>
        <div className="rounded-xl border p-4"><div className="text-xs text-gray-500">Start raising by</div><div className="text-xl font-bold">{r.monthsToStart <= 0 ? 'NOW' : r.start.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div></div>
        <div className="rounded-xl border p-4"><div className="text-xs text-gray-500">Non-dilutive potential</div><div className="text-xl font-bold">{r.nd.length} sources</div>
          {OVERLOOK_STAT && <div className="text-xs text-gray-500">{OVERLOOK_STAT} of founders overlook these</div>}</div>
      </section>
      <section className="rounded-xl border p-4"><h2 className="mb-2 font-semibold">Red flags</h2>
        {r.flags.length === 0 && <p className="text-sm">None detected.</p>}
        {r.flags.slice(0, paid ? 99 : 3).map((f, k) => <div key={k} className="mb-2 flex gap-2 text-sm"><span className={`h-fit rounded px-2 py-0.5 text-xs ${SEV[f.sev]}`}>{f.sev}</span><span><b>{f.title}</b>{paid ? ` — ${f.detail}` : ''}</span></div>)}
        {!paid && r.flags.length > 3 && <p className="text-xs text-gray-500">+{r.flags.length - 3} more in full report</p>}</section>
      <section className="rounded-xl border p-4"><h2 className="mb-2 font-semibold">Stage signals</h2>
        {r.names.map((n, k) => <div key={n} className="mb-1 flex items-center gap-2 text-sm"><span className="w-32">{n}</span><div className="flex-1 rounded bg-gray-100"><div className="h-2 rounded bg-indigo-500" style={{ width: `${(r.votes[k] / 3) * 100}%` }} /></div><span className="w-24 text-xs">{['Idea', 'Pre-seed', 'Seed', 'Pre-A'][r.votes[k]]}</span></div>)}</section>
      <Lock paid={paid} label="Risk heatmap"><section className="overflow-x-auto rounded-xl border p-4"><h2 className="mb-2 font-semibold">Investor-risk heatmap (what turns red if you pitch higher)</h2>
        <table className="w-full text-xs"><thead><tr><th className="text-left">Area</th>{['Idea', 'Pre-seed', 'Seed', 'Pre-A'].map(s => <th key={s}>{s}</th>)}</tr></thead>
          <tbody>{AREAS.map((a, o) => <tr key={a}><td className="py-0.5">{a}</td>{r.heat[o].map((v, s) => <td key={s} className={`text-center ${heatCls(v)}`}>{v.toFixed(0)}</td>)}</tr>)}</tbody></table></section></Lock>
      <Lock paid={paid} label="Dilution & exit table"><section className="rounded-xl border p-4 text-sm"><h2 className="mb-2 font-semibold">Dilution</h2>
        <p>Round dilutes {(r.d * 100).toFixed(1)}% · implied pre-money {fmt(r.pre)}</p>
        {r.rounds.map(x => <div key={x.label} className="flex justify-between"><span>{x.label}</span><b>{(x.f * 100).toFixed(1)}%</b></div>)}
        {r.exitTable.map(x => <div key={x.exit} className="flex justify-between text-gray-600"><span>Exit {fmt(x.exit)}</span><span>founders keep {fmt(x.value)}</span></div>)}</section></Lock>
      <Lock paid={paid} label="Who to ask"><section className="rounded-xl border p-4 text-sm"><h2 className="mb-2 font-semibold">Capital sources for you ({r.ranked.length} matched)</h2>
        <p className="mb-2 text-xs text-gray-500">Sample data — unverified. ~{r.ndPct.toFixed(0)}% of your raise (~{fmt(r.ndReal)}) could come non-dilutively.</p>
        {r.ranked.slice(0, 8).map(x => <div key={x.s.name} className="flex justify-between border-b py-1"><span>{x.s.name} <i className="text-xs text-gray-500">{x.s.cat}</i></span><span>{x.fit.toFixed(0)}{x.stretch ? ' · stretch' : ''}</span></div>)}</section></Lock>
      <Lock paid={paid} label="Objection prep, outreach plan, 30-60-90"><section className="rounded-xl border p-4 text-sm"><h2 className="mb-2 font-semibold">Top likely investor questions</h2>
        {r.questions.map(q => <p key={q.q} className="mb-1">• {q.q} <i className="text-xs text-gray-500">({q.area})</i></p>)}
        <h2 className="mb-1 mt-3 font-semibold">Outreach</h2><p>~{r.Np} targets, {r.perWeek}/week; plan {r.totalWeeks} wks vs {Math.floor(r.availWeeks)} available.</p>
        <h2 className="mb-1 mt-3 font-semibold">Gap plan</h2>{r.plan.slice(0, 5).map(p => <p key={p.t}>☐ {p.t} <i className="text-xs text-gray-500">by day {p.bucket}</i></p>)}</section></Lock>
      <div className="sticky bottom-3 text-center">
        <button onClick={() => (paid ? makePdf(i, r) : setModal('pay'))} className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg">{paid ? 'Download report again (PDF)' : 'Download full report — ₹250'}</button></div>
      {modal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-sm space-y-3 rounded-xl bg-white p-5">
        <div className="rounded bg-yellow-100 p-2 text-center text-xs font-bold">TEST MODE — no money is charged</div>
        {modal === 'wait' ? <p className="py-6 text-center">Processing payment…</p> : <>
          <p className="font-semibold">Pay ₹250 for your full report</p>
          <input className="w-full rounded border px-2 py-1.5" placeholder="Card / UPI (any value)" /><input className="w-full rounded border px-2 py-1.5" placeholder="Name" />
          <button onClick={pay} className="w-full rounded bg-indigo-600 py-2 font-semibold text-white">Pay ₹250 (test)</button>
          <button onClick={() => setModal('')} className="w-full text-sm text-gray-500">Cancel</button></>}</div></div>}
    </main>);

  const H = (n: number) => i.hires[n];
  const setH = (n: number, k: 'n' | 'c' | 'm', v: number) => set('hires', i.hires.map((h, x) => (x === n ? { ...h, [k]: v } : h)));
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Fundraising Planner</h1>
      <div className="flex gap-1">{STEPS.map((s, k) => <div key={s} className={`flex-1 rounded px-1 py-1 text-center text-xs ${k === step ? 'bg-indigo-600 text-white' : k < step ? 'bg-indigo-200' : 'bg-gray-100'}`}>{s}</div>)}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {step === 0 && <>
          <Sel label="Sector" v={i.sector} on={v => set('sector', v)} opts={SECTORS} /><Sel label="State" v={i.state} on={v => set('state', v)} opts={STATES} />
          <Sel label="DPIIT recognised?" v={i.dpiit} on={v => set('dpiit', v as Inp['dpiit'])} opts={['yes', 'no', 'process']} />
          <Sel label="Stage you want to raise" v={String(i.target)} on={v => set('target', Number(v) as 1 | 2 | 3)} opts={['1', '2', '3']} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={i.women} onChange={e => set('women', e.target.checked)} />Women-led</label>
          <p className="text-xs text-gray-500 sm:col-span-2">Stage: 1 = Pre-seed, 2 = Seed, 3 = Pre-Series A. All money in ₹ Lakhs (100 L = 1 Cr).</p></>}
        {step === 1 && <>
          <Num label="MRR 3 months ago" hint="₹L" v={i.m2} on={v => set('m2', v)} /><Num label="MRR 2 months ago" hint="₹L" v={i.m1} on={v => set('m1', v)} /><Num label="MRR this month" hint="₹L" v={i.m0} on={v => set('m0', v)} />
          <Num label="Gross margin %" v={i.gm} on={v => set('gm', v)} /><Num label="Paying customers" v={i.cust} on={v => set('cust', v)} /><Num label="Monthly churn % (-1 = not tracked)" v={i.churn} on={v => set('churn', v)} />
          <Num label="Pilots / active users" v={i.pilots} on={v => set('pilots', v)} /><Num label="Team size (FTE)" v={i.team} on={v => set('team', v)} />
          <Sel label="Prior funding" v={['None', 'F&F/Angels', 'Seed', 'Seed+'][i.prior]} on={v => set('prior', ['None', 'F&F/Angels', 'Seed', 'Seed+'].indexOf(v))} opts={['None', 'F&F/Angels', 'Seed', 'Seed+']} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={i.solo} onChange={e => set('solo', e.target.checked)} />Solo founder</label></>}
        {step === 2 && <>
          <Num label="Cash in bank" hint="₹L" v={i.cash} on={v => set('cash', v)} /><Num label="Monthly expenses today" hint="₹L" v={i.burn} on={v => set('burn', v)} />
          <Num label="Liabilities due (12 mo)" hint="₹L" v={i.liab} on={v => set('liab', v)} /><Num label="Other new monthly spend" hint="₹L" v={i.other} on={v => set('other', v)} />
          {[0, 1, 2].map(n => <div key={n} className="grid grid-cols-3 gap-2 rounded border p-2 sm:col-span-2"><Num label={`Hire ${n + 1}: count`} v={H(n).n} on={v => setH(n, 'n', v)} /><Num label="₹L/mo each" v={H(n).c} on={v => setH(n, 'c', v)} /><Num label="Starts month" v={H(n).m} on={v => setH(n, 'm', v)} /></div>)}
          <Num label="Target runway after raise (months)" v={i.T} on={v => set('T', v)} /><Num label="Buffer % planned" v={i.buf} on={v => set('buf', v)} />
          <Num label="Milestone month you'll promise" v={i.mm} on={v => set('mm', v)} /><Num label="Amount YOU plan to raise" hint="₹L" v={i.X} on={v => set('X', v)} />
          <Num label="Target dilution (0.18 = 18%)" v={i.dt} on={v => set('dt', v)} /></>}
        {step === 3 && <>
          <Num label="Founders hold %" v={i.F} on={v => set('F', v)} /><Num label="Angels / others %" v={i.A} on={v => set('A', v)} />
          <Num label="Existing ESOP %" v={i.e} on={v => set('e', v)} /><Num label="ESOP pool wanted after round %" v={i.pool} on={v => set('pool', v)} /></>}
        {step === 4 && <div className="space-y-4 sm:col-span-2">
          <p className="text-xs text-gray-500">Rate 0–100 (0 not done · 50 partly · 100 fully). Tick "proof" only if you can show a document — otherwise the score is capped at 50.</p>
          {OBJ_Q.map((q, k) => <div key={q} className="flex items-center gap-2 text-sm"><span className="flex-1">{q}</span>
            <select value={i.obj[k]} onChange={e => set('obj', i.obj.map((v, x) => (x === k ? Number(e.target.value) : v)))} className="rounded border px-1">{[0, 25, 50, 75, 100].map(v => <option key={v}>{v}</option>)}</select>
            <label className="text-xs"><input type="checkbox" checked={i.proof[k]} onChange={e => set('proof', i.proof.map((v, x) => (x === k ? e.target.checked : v)))} /> proof</label></div>)}
          <h3 className="font-semibold">Diligence documents</h3>
          {DILIGENCE.map((d, k) => <div key={d} className="flex items-center justify-between text-sm"><span>{d}</span>
            <select value={i.dil[k]} onChange={e => set('dil', i.dil.map((v, x) => (x === k ? Number(e.target.value) : v)))} className="rounded border px-1"><option value={0}>None</option><option value={50}>Partial</option><option value={100}>Ready</option></select></div>)}
          <h3 className="font-semibold">Process</h3>
          <div className="grid gap-3 sm:grid-cols-2"><Num label="Warm intros available to investors" v={i.warm} on={v => set('warm', v)} /><Num label="Founder hours/week for fundraising prep" v={i.hours} on={v => set('hours', v)} />
            <Num label="Planned raise duration (months)" v={i.dur} on={v => set('dur', v)} />
            <Sel label="How was investor list built?" v={i.listQ === 20 ? 'Search / friends' : i.listQ === 70 ? 'Researched' : 'Thesis + portfolio fit'} on={v => set('listQ', v === 'Search / friends' ? 20 : v === 'Researched' ? 70 : 100)} opts={['Search / friends', 'Researched', 'Thesis + portfolio fit']} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={i.advisor} onChange={e => set('advisor', e.target.checked)} />Have an advisor who has raised before</label></div></div>}
      </div>
      <div className="flex justify-between pt-2">
        <button disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded border px-4 py-2 disabled:opacity-30">Back</button>
        <button onClick={() => (step === 4 ? setDone(true) : setStep(step + 1))} className="rounded bg-indigo-600 px-4 py-2 text-white">{step === 4 ? 'See my plan' : 'Next'}</button></div>
    </main>);
}
