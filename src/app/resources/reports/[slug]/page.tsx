import { getReportBySlug, getAllReports } from './data';
import ReportPage from './report';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>; // 👈 params is a Promise now
}

export default async function ReportSlugPage({ params }: PageProps) {
  const { slug } = await params; // 👈 await the Promise
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  return <ReportPage report={report} />;
}

// generateStaticParams stays the same – it's already async-compatible
export async function generateStaticParams() {
  const reports = getAllReports();
  return reports.map((report) => ({
    slug: report.slug,
  }));
}