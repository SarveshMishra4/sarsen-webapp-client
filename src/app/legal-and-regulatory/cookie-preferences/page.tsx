// app/cookie-preferences/page.tsx
//
// ============================================================================
// LAYOUT NOTES:
// - Container matches Header.tsx / Footer.tsx: max-w-[1400px] + px-4 md:px-8.
// - Gradient header restored/kept, full-bleed background with content
//   constrained to the shared container.
// - All card wrappers removed; sections sit directly on the page.
// - Headings are abstract and indirect by design — they force the reader to
//   engage with the full paragraph rather than skimming for a summary.
// - Typography: **Every** paragraph and list uses `leading-snug` for a
//   dense, legal-document feel, including inside interactive rows.
// - All links and buttons use the site's navy (#002855) or semantic colors
//   where appropriate.
// ============================================================================

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
  examples: string[];
}

export default function CookiePreferencesPage() {
  const [cookieCategories, setCookieCategories] = useState<CookieCategory[]>([
    {
      id: 'essential',
      name: 'The Backbone',
      description:
        'These cookies are necessary for the website to function properly. They may support security, basic functionality, session management, and the operation of privacy preferences. Because they are necessary for core website functionality, they cannot be disabled through this preference tool.',
      required: true,
      enabled: true,
      examples: [
        'Security and fraud prevention',
        'Session management',
        'Basic website functionality',
        'Cookie preference management',
        'Form functionality and error handling',
      ],
    },
    {
      id: 'functional',
      name: 'Personal Touches',
      description:
        'These cookies may be used to remember preferences and support enhanced website functionality. They are not essential to the basic operation of the website and may be disabled.',
      required: false,
      enabled: false,
      examples: [
        'Preference settings',
        'User interface preferences',
        'Language or regional preferences',
        'Enhanced website functionality',
        'Embedded feature preferences',
      ],
    },
    {
      id: 'analytics',
      name: 'Patterns and Usage',
      description:
        'These cookies may be used to understand how visitors interact with the website and to help us evaluate and improve website performance and user experience. Analytics cookies are non-essential and may be disabled.',
      required: false,
      enabled: false,
      examples: [
        'Website traffic measurement',
        'Page views',
        'Navigation patterns',
        'Website performance analysis',
        'General usage information',
      ],
    },
    {
      id: 'marketing',
      name: 'Reaching Further',
      description:
        'These cookies may be used for marketing, advertising, campaign measurement, or similar purposes where such technologies are implemented. Marketing cookies are non-essential and may be disabled.',
      required: false,
      enabled: false,
      examples: [
        'Advertising measurement',
        'Campaign performance',
        'Conversion measurement',
        'Marketing attribution',
        'Personalized marketing where applicable',
      ],
    },
  ]);

  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        setCookieCategories((prev) =>
          prev.map((category) => ({
            ...category,
            enabled: category.required
              ? true
              : Boolean(prefs[category.id] ?? category.enabled),
          }))
        );
      } catch {
        // Ignore invalid stored preferences.
      }
    }
  }, []);

  const toggleCategory = (id: string) => {
    setCookieCategories((prev) =>
      prev.map((category) =>
        category.id === id && !category.required
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };

  const savePreferences = (
    categories: CookieCategory[] = cookieCategories,
    message = 'Cookie preferences saved successfully.'
  ) => {
    const preferences = categories.reduce(
      (acc, category) => {
        acc[category.id] = category.enabled;
        return acc;
      },
      {} as Record<string, boolean>
    );
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const acceptAll = () => {
    const updated = cookieCategories.map((c) => ({ ...c, enabled: true }));
    setCookieCategories(updated);
    savePreferences(updated, 'All available cookies have been accepted.');
  };

  const rejectAll = () => {
    const updated = cookieCategories.map((c) => ({
      ...c,
      enabled: c.required,
    }));
    setCookieCategories(updated);
    savePreferences(updated, 'Non-essential cookies have been rejected.');
  };

  return (
    <main className="bg-white text-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Cookie Preferences
          </h1>
          <p className="text-lg text-blue-100 md:text-xl">
            Manage your cookie settings and preferences
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto mt-10 max-w-[1400px] px-4 pb-14 md:mt-14 md:px-8 md:pb-20">
        {saveMessage && (
          <div className="mb-8 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <svg
              className="h-6 w-6 flex-shrink-0 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <p className="font-medium text-green-800 leading-snug">
              {saveMessage}
            </p>
          </div>
        )}

        <article className="space-y-14">
          {/* Section 1: About */}
          <Section title="Why This Page Exists">
            <P>
              This Cookie Preferences page allows you to review and manage
              your preferences for non-essential cookies and similar
              technologies used on the Sarsen Strategy Partners website.
            </P>
            <P>
              Essential cookies may continue to operate where they are
              necessary for the security, functionality, or operation of
              the website.
            </P>
            <P>
              For information about how personal data may be collected,
              used, stored, or otherwise processed, please review our{' '}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Privacy Policy
              </Link>
              .
            </P>
          </Section>

          {/* Section 2: Related docs */}
          <Section title="The Wider Framework">
            <P>
              This page should be read together with the other applicable
              legal documents governing use of the Sarsen Strategy Partners
              website and services, including our{' '}
              <Link
                href="/terms-of-use"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Terms of Use
              </Link>
              ,{' '}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Privacy Policy
              </Link>
              ,{' '}
              <Link
                href="/refund-cancellation-policy"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Refund &amp; Cancellation Policy
              </Link>
              , and{' '}
              <Link
                href="/disclaimer"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Disclaimer
              </Link>
              .
            </P>
            <P>
              Each document addresses its respective subject matter. Where
              applicable, the document or contractual provision specifically
              governing a particular subject will apply to that subject,
              subject to applicable law.
            </P>
          </Section>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={acceptAll}
              className="flex-1 bg-[#002855] hover:bg-[#0A1E3D] text-white py-3 px-6 rounded-md font-semibold transition-colors"
            >
              Accept All Cookies
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-md font-semibold transition-colors"
            >
              Reject Non-Essential
            </button>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6">
            {cookieCategories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800 leading-snug">
                        {category.name}
                      </h3>
                      {category.required && (
                        <span className="text-xs bg-[#002855]/10 text-[#002855] px-2 py-1 rounded-full font-medium">
                          Always Active
                        </span>
                      )}
                    </div>
                    <P>{category.description}</P>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      disabled={category.required}
                      aria-label={`Toggle ${category.name}`}
                      aria-pressed={category.enabled}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        category.enabled ? 'bg-[#002855]' : 'bg-gray-300'
                      } ${
                        category.required
                          ? 'cursor-not-allowed opacity-50'
                          : 'cursor-pointer'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          category.enabled
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 leading-snug">
                    Examples:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 leading-snug">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#002855] mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <P>
                Your selected preferences will be stored on your device
                and used to determine applicable non-essential cookie
                preferences.
              </P>
              <button
                onClick={() => savePreferences()}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-md font-semibold transition-colors whitespace-nowrap"
              >
                Save Preferences
              </button>
            </div>
          </div>

          {/* Additional sections */}
          <Section title="How Long They Linger">
            <P>
              Cookies may remain on your device for different periods
              depending on their purpose and configuration.
            </P>
            <List>
              <li>
                <strong>Session Cookies:</strong> These generally expire
                when the browsing session ends.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> These may remain on
                your device for a period determined by the cookie
                provider or website configuration.
              </li>
              <li>
                <strong>Third-Party Cookies:</strong> These may be
                controlled by third-party providers and may have
                different retention periods.
              </li>
            </List>
            <P>
              <span className="text-sm text-gray-500">
                Specific cookie durations may vary depending on the
                technology actually implemented on the website.
              </span>
            </P>
          </Section>

          <Section title="Beyond This Page">
            <P>
              You may also manage or delete cookies through the settings
              provided by your web browser.
            </P>
            <List>
              <li>
                <strong>Chrome:</strong> Privacy and security settings
                → Cookies and other site data
              </li>
              <li>
                <strong>Firefox:</strong> Privacy &amp; Security
                settings → Cookies and Site Data
              </li>
              <li>
                <strong>Safari:</strong> Privacy settings → Website
                Data
              </li>
              <li>
                <strong>Edge:</strong> Cookies and site permissions
              </li>
            </List>
            <P>
              <span className="text-sm text-gray-500">
                Browser controls may operate independently from the
                preference controls provided on this page. Blocking
                certain cookies may affect some website functionality.
              </span>
            </P>
          </Section>

          <Section title="The Nature of Consent">
            <P>
              Where consent is required for non-essential cookies or
              similar technologies, those technologies should only be
              activated in accordance with the applicable consent
              mechanism and your selected preferences.
            </P>
            <P>
              You may change your preferences at any time through this
              page or through any cookie preference mechanism made
              available on the website.
            </P>
          </Section>

          <Section title="Where Other Hands Reach">
            <P>
              Certain website functions may involve third-party
              technologies or service providers that use cookies or
              similar technologies. The providers and technologies used
              may change as the website and its services develop.
            </P>
            <P>
              Third-party providers may process information in accordance
              with their own terms, privacy policies, and cookie
              practices.
            </P>
            <P>
              Where third-party cookies or similar technologies are used,
              you should review the relevant third party&apos;s privacy
              and cookie information for further details.
            </P>
          </Section>

          <Section title="Signals and Their Limits">
            <P>
              Browser-based &quot;Do Not Track&quot; signals may not be
              consistently supported or interpreted across all browsers,
              devices, technologies, and third-party services. We
              therefore do not make a blanket representation that every
              such signal will automatically disable all forms of
              tracking or similar technology.
            </P>
          </Section>

          <Section title="How This Can Change">
            <P>
              We may update our cookie practices as our website,
              services, technologies, and applicable requirements change.
              Where appropriate, we will update this page and the
              information describing our cookie practices. You should
              review your preferences periodically.
            </P>
          </Section>

          <Section title="Reaching Out">
            <P>
              If you have questions, concerns, or requests regarding
              cookies or similar technologies used on our website, you
              may contact the Sarsen team by email.
            </P>
            <P>
              Depending on the nature, seriousness, complexity, and
              volume of matters being handled, a response may take from
              a few hours up to 45 days.
            </P>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-2 font-medium text-gray-800 leading-snug">
                Sarsen Strategy Partners
              </p>
              <p className="text-gray-600 leading-snug">
                Email:{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
                >
                  contact@sarsenpartners.com
                </a>
              </p>
            </div>
          </Section>
        </article>

        {/* Back to Home */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-block rounded-md bg-[#002855] px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0A1E3D]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

// ============================================================================
// SECTION COMPONENT — identical pattern to the Terms and Privacy pages.
// Hierarchy is by size (`prominent` prop), not weight.
// ============================================================================
function Section({
  title,
  prominent = false,
  children,
}: {
  title: string;
  prominent?: boolean;
  children: React.ReactNode;
}) {
  const sizeClass = prominent ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';

  return (
    <section>
      <h2 className={`mb-4 font-semibold text-[#002855] ${sizeClass}`}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

// ============================================================================
// PARAGRAPH — justified, hyphenated body copy with leading-snug.
// ============================================================================
function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-justify text-[15px] leading-snug text-gray-700 md:text-base"
      style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
    >
      {children}
    </p>
  );
}

// ============================================================================
// LIST — same justified/hyphenated treatment, leading-snug.
// ============================================================================
function List({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="ml-4 list-disc space-y-1.5 text-justify text-[15px] leading-snug text-gray-700 md:text-base"
      style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}
    >
      {children}
    </ul>
  );
}