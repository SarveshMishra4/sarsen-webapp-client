// app/services/[slug]/page.tsx

import { getServiceBySlug } from "./data";
import ServicePage from "./services";
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

export default async function ServiceSlugPage({
  params,
}: PageProps) {
  // IMPORTANT: unwrap params
  const { slug } = await params;

  // Fetch service
  const service = await getServiceBySlug(slug);

  // Validate
  if (!service) {
    notFound();
  }

  return <ServicePage service={service} />;
}