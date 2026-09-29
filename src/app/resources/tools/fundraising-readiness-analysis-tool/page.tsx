// app/fundraising-planner/page.tsx  (server component)
import type { Metadata } from 'next';
import PlannerClient from './PlannerClient';
export const metadata: Metadata = { title: 'Fundraising Planner', description: 'Raise amount, dilution, capital sources, objection prep and outreach plan for pre-Series A founders.' };
export default function Page() { return <PlannerClient />; }
