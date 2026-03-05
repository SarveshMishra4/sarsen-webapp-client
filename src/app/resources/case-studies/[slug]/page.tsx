// app/case-studies/[slug]/page.tsx

import {
  getCaseStudyBySlug,
  getAllCaseStudies,
} from "./data";

import CaseStudyPage from "./case";
import { notFound } from "next/navigation";

/* ---------------------------------------------
   TYPES
---------------------------------------------- */

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ---------------------------------------------
   PAGE
---------------------------------------------- */

export default async function CaseStudySlugPage({
  params,
}: PageProps) {
  // Unwrap params (required in modern Next.js)
  const { slug } = await params;

  // Fetch case study (sync/async safe)
  const study = await getCaseStudyBySlug(slug);

  // Validate (preserves old behaviour)
  if (!study) {
    notFound();
  }

  return <CaseStudyPage study={study} />;
}

/* ---------------------------------------------
   STATIC GENERATION
---------------------------------------------- */

export async function generateStaticParams() {
  // Preserve existing SSG behaviour
  const studies = getAllCaseStudies();

  return studies.map((study) => ({
    slug: study.slug,
  }));
}