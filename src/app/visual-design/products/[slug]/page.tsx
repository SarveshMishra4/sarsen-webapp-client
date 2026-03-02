import { products } from "../data";
import { notFound } from "next/navigation";

/* =====================================
   TYPES
   ===================================== */

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =====================================
   PAGE
   ===================================== */

export default async function ProductPage({ params }: PageProps) {
  /* Await route params */
  const { slug } = await params;

  /* Find product */
  const product = products.find(
    (item) => item.slug === slug
  );

  /* 404 */
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===================================
          HERO SECTION
         =================================== */}

      <section className="bg-white border-b">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <h1 className="text-4xl font-bold mb-3">
            {product.title}
          </h1>

          <p className="text-xl text-gray-600 mb-4">
            {product.tagline}
          </p>

          <p className="text-gray-700 max-w-3xl">
            {product.description}
          </p>

        </div>

      </section>

      {/* ===================================
          MAIN CONTENT
         =================================== */}

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ================================
            LEFT CONTENT
           ================================ */}

        <div className="lg:col-span-2 space-y-10">

          {/* Overview */}
          <section className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-3">
              Overview
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {product.longDescription}
            </p>

          </section>

          {/* Features */}
          <section className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-4">
              Key Features
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded"
                >
                  ✅ {feature}
                </li>
              ))}

            </ul>

          </section>

          {/* Deliverables */}
          <section className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-4">
              Deliverables
            </h2>

            <ul className="space-y-2">

              {product.deliverables.map((item, index) => (
                <li
                  key={index}
                  className="border-l-4 border-blue-500 pl-3"
                >
                  {item}
                </li>
              ))}

            </ul>

          </section>

          {/* Ideal For */}
          <section className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-4">
              Ideal For
            </h2>

            <div className="flex flex-wrap gap-2">

              {product.idealFor.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}

            </div>

          </section>

        </div>

        {/* ================================
            RIGHT SIDEBAR
           ================================ */}

        <div className="space-y-6">

          {/* Pricing Card */}
          <div className="bg-white p-6 rounded-xl shadow sticky top-24">

            <h3 className="text-xl font-semibold mb-2">
              Engagement Details
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>Price</span>
                <strong>{product.price}</strong>
              </div>

              <div className="flex justify-between">
                <span>Duration</span>
                <strong>{product.duration}</strong>
              </div>

              <div className="flex justify-between">
                <span>Consultant</span>
                <strong>{product.consultant.name}</strong>
              </div>

              <div className="flex justify-between">
                <span>Experience</span>
                <strong>{product.consultant.experience}</strong>
              </div>

            </div>

            <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Request Consultation
            </button>

          </div>

          {/* Meta Info */}
          <div className="bg-white p-6 rounded-xl shadow text-sm">

            <h4 className="font-semibold mb-2">
              Additional Information
            </h4>

            <p>
              <strong>Industries:</strong>
            </p>

            <div className="flex flex-wrap gap-2 mt-2 mb-4">

              {product.industries.map((industry, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  {industry}
                </span>
              ))}

            </div>

            <p>
              <strong>Last Updated:</strong>{" "}
              {product.lastUpdated}
            </p>

          </div>

        </div>

      </div>

      {/* ===================================
          CTA SECTION
         =================================== */}

      <section className="bg-blue-600 text-white mt-16">

        <div className="max-w-6xl mx-auto px-6 py-14 text-center">

          <h2 className="text-3xl font-bold mb-3">
            Ready to Accelerate Your Growth?
          </h2>

          <p className="mb-6 text-blue-100">
            Book a discovery call with our senior consultants
          </p>

          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Schedule Call
          </button>

        </div>

      </section>

    </div>
  );
}