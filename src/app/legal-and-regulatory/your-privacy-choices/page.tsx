'use client';

// ============================================================================
// LAYOUT NOTES (same system as app/terms-of-use/page.tsx):
// - Container matches Header.tsx / Footer.tsx: max-w-[1400px] + px-4 md:px-8
//   (previously this page used max-w-4xl).
// - Gradient header banner restored/kept, full-bleed background with content
//   constrained to the shared container; mt-10/mt-14 gives it room to
//   breathe before the body starts.
// - The big white "card" wrappers (bg-white rounded-xl shadow-sm border p-8
//   md:p-12) around every section have been removed — sections now sit
//   directly on the page, matching the Terms page. Functional controls
//   (toggle rows, request-type boxes) keep light borders since they're
//   interactive components, not blocks of prose.
// - Every heading is a consistent font-semibold; hierarchy comes from size
//   via the `prominent` prop, not weight.
// - Generic Tailwind blue (blue-600 etc.) swapped for the site's actual
//   navy palette (#002855 / hover #0A1E3D) wherever it was standing in as
//   the "default" action color. The four request-type buttons (deletion,
//   portability, correction, objection) keep their distinct semantic
//   colors — red/green/yellow/purple — since those intentionally
//   differentiate one request type from another.
// ============================================================================

import React, { useState } from 'react';
import Link from 'next/link';

interface PrivacyChoice {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

export default function YourPrivacyChoicesPage() {
  const [saveMessage, setSaveMessage] = useState('');

  const [privacyChoices, setPrivacyChoices] = useState<PrivacyChoice[]>([
    {
      id: 'marketing-emails',
      title: 'Marketing Emails',
      description:
        'Receive newsletters, service updates, and other communications from Sarsen by email.',
      enabled: true,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      id: 'sms-notifications',
      title: 'SMS Notifications',
      description:
        'Receive service-related updates or notifications by text message where applicable.',
      enabled: false,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
      ),
    },
    {
      id: 'personalized-content',
      title: 'Personalized Content',
      description:
        'Allow us to use relevant information to provide content and experiences that may be more relevant to you.',
      enabled: true,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
    },
    {
      id: 'data-analytics',
      title: 'Usage Analytics',
      description:
        'Allow the use of analytics and usage information to help us understand and improve our website and services.',
      enabled: true,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
        </svg>
      ),
    },
    {
      id: 'third-party-sharing',
      title: 'Third-Party Sharing',
      description:
        'Control optional sharing of information with third parties where applicable and permitted.',
      enabled: false,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
  ]);

  const toggleChoice = (id: string) => {
    setPrivacyChoices((prev) =>
      prev.map((choice) =>
        choice.id === id ? { ...choice, enabled: !choice.enabled } : choice
      )
    );
  };

  const savePrivacyChoices = () => {
    const preferences = privacyChoices.reduce((acc, choice) => {
      acc[choice.id] = choice.enabled;
      return acc;
    }, {} as Record<string, boolean>);

    localStorage.setItem('privacyChoices', JSON.stringify(preferences));

    setSaveMessage('Your privacy choices have been saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const submitDataRequest = (requestType: string) => {
    setSaveMessage(
      `To request ${requestType}, please contact our team at contact@sarsenpartners.com. We will review your request and respond as soon as possible, depending on the nature, seriousness, complexity, and volume of the matter.`
    );
    setTimeout(() => setSaveMessage(''), 7000);
  };

  return (
    <main className="bg-white text-gray-900">
      {/* ====================================================================
          PAGE HEADER — gradient banner, full-bleed background, content
          constrained to the shared max-w-[1400px] container.
      ==================================================================== */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Your Privacy Choices
          </h1>
          <p className="text-lg text-blue-100 md:text-xl">
            Manage your privacy preferences and contact us regarding your
            personal information
          </p>
        </div>
      </div>

      {/* ====================================================================
          BODY — full container width, margin below the header banner.
      ==================================================================== */}
      <div className="mx-auto mt-10 max-w-[1400px] px-4 pb-14 md:mt-14 md:px-8 md:pb-20">
        {saveMessage && (
          <div className="mb-8 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <svg
              className="h-6 w-6 flex-shrink-0 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <p className="font-medium text-green-800">{saveMessage}</p>
          </div>
        )}

        <article className="space-y-14">
          <Section title="About This Page">
            <P>
              Sarsen Strategy Partners respects the privacy of individuals
              interacting with its website and services. This page provides
              controls for certain preferences and information about how you
              may contact our team regarding personal information.
            </P>
            <P>
              For information about how personal information is collected,
              used, retained, and otherwise handled, please review our{' '}
              <Link
                href="/privacy-policy"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                Privacy Policy
              </Link>
              .
            </P>
          </Section>

          <Section title="Communication & Privacy Preferences" prominent>
            <P>
              You may use the controls below to manage the available
              preferences on this page. Some preferences may not apply to
              every individual or service.
            </P>

            <div className="space-y-4 pt-2">
              {privacyChoices.map((choice) => (
                <div
                  key={choice.id}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-[#002855]/40"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855]">
                    {choice.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-gray-800">
                      {choice.title}
                    </h3>
                    <p className="text-sm leading-snug text-gray-600">
                      {choice.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      aria-label={`Toggle ${choice.title}`}
                      aria-pressed={choice.enabled}
                      onClick={() => toggleChoice(choice.id)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        choice.enabled ? 'bg-[#002855]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          choice.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={savePrivacyChoices}
                className="rounded-md bg-[#002855] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#0A1E3D]"
              >
                Save Preferences
              </button>
            </div>
          </Section>

          <Section title="Requests Concerning Your Personal Information" prominent>
            <P>
              If you would like to ask about, access, correct, delete,
              obtain, or otherwise raise a concern regarding personal
              information held by Sarsen, please contact our team at{' '}
              <a
                href="mailto:contact@sarsenpartners.com"
                className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
              >
                contact@sarsenpartners.com
              </a>
              .
            </P>

            <div className="space-y-4 pt-2">
              {/* Access */}
              <RequestCard
                iconBg="bg-[#002855]/10"
                iconColor="text-[#002855]"
                title="Access Request"
                description="Contact our team if you would like to request access to personal information held by Sarsen, subject to applicable requirements and limitations."
                buttonClass="bg-[#002855] hover:bg-[#0A1E3D]"
                onClick={() => submitDataRequest('a personal information access request')}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                }
              />

              {/* Deletion */}
              <RequestCard
                iconBg="bg-red-50"
                iconColor="text-red-600"
                title="Deletion Request"
                description="Contact our team if you would like to request deletion of personal information, subject to applicable requirements, legitimate business needs, and legal obligations."
                buttonClass="bg-red-600 hover:bg-red-700"
                onClick={() => submitDataRequest('a personal information deletion request')}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                }
              />

              {/* Portability */}
              <RequestCard
                iconBg="bg-green-50"
                iconColor="text-green-600"
                title="Information Transfer Request"
                description="Contact our team if you would like information in a structured or transferable format, where applicable."
                buttonClass="bg-green-600 hover:bg-green-700"
                onClick={() => submitDataRequest('a personal information transfer request')}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" />
                  </svg>
                }
              />

              {/* Correction */}
              <RequestCard
                iconBg="bg-yellow-50"
                iconColor="text-yellow-600"
                title="Correction Request"
                description="Contact our team if you believe personal information associated with you is inaccurate or incomplete."
                buttonClass="bg-yellow-600 hover:bg-yellow-700"
                onClick={() => submitDataRequest('a personal information correction request')}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                }
              />

              {/* Objection */}
              <RequestCard
                iconBg="bg-purple-50"
                iconColor="text-purple-600"
                title="Processing Concern"
                description="Contact our team if you have a concern about the way your personal information is being used or processed."
                buttonClass="bg-purple-600 hover:bg-purple-700"
                onClick={() => submitDataRequest('a privacy or processing concern')}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                }
              />
            </div>

            <div className="mt-6 rounded-lg border border-[#002855]/15 bg-[#002855]/[0.03] p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#002855]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <div>
                  <p className="mb-1 text-sm font-semibold text-[#002855]">
                    Response to Requests
                  </p>
                  <p className="text-sm leading-snug text-gray-700">
                    You may contact our team at{' '}
                    <a
                      href="mailto:contact@sarsenpartners.com"
                      className="font-medium text-[#002855] underline"
                    >
                      contact@sarsenpartners.com
                    </a>
                    . We will review and address requests based on their
                    nature and circumstances. Depending on the seriousness,
                    complexity, and volume of the matter, a response may take
                    up to 45 days.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Privacy Rights and Applicable Law">
            <P>
              Depending on where you are located and the circumstances in
              which Sarsen interacts with you, different privacy rights and
              requirements may apply.
            </P>
            <P>
              Where applicable, individuals may have rights concerning their
              personal information, including rights relating to access,
              correction, deletion, objection, restriction, or other forms of
              control over personal information.
            </P>
            <P>
              The availability and scope of any particular right may depend
              on applicable law, the nature of the information, the purpose
              for which it is processed, and other relevant circumstances.
              Nothing on this page is intended to create rights beyond those
              available under applicable law.
            </P>
          </Section>

          <Section title="Questions About Your Privacy?">
            <P>
              If you have a question about your personal information, wish
              to make a privacy-related request, or have a concern regarding
              the handling of your information, please contact our team.
            </P>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <p className="mb-3 font-medium text-gray-800">
                Sarsen Strategy Partners
              </p>
              <p className="text-gray-600">
                Email:{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="font-medium text-[#002855] underline decoration-gray-300 underline-offset-4 hover:decoration-[#002855]"
                >
                  contact@sarsenpartners.com
                </a>
              </p>
              <p className="mt-4 text-sm text-gray-500">
                You may contact our team through the email address above. We
                will review and address your concern based on its nature and
                circumstances. Depending on the seriousness, complexity, and
                volume of matters being handled, a response may take up to
                45 days.
              </p>
            </div>
          </Section>

          <section className="rounded-lg border border-[#002855]/15 bg-[#002855]/[0.03] p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold text-[#002855] md:text-2xl">
              Related Privacy Resources
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/privacy-policy"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-shadow hover:shadow-md"
              >
                <svg className="h-6 w-6 text-[#002855]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-2 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Privacy Policy</p>
                  <p className="text-sm text-gray-600">Read our privacy policy</p>
                </div>
              </Link>

              <Link
                href="/cookie-preferences"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-shadow hover:shadow-md"
              >
                <svg className="h-6 w-6 text-[#002855]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5c.56-.56 3.58-.56 5.5-.56s4.94 0 5.5.56S18.06 19 17.5 19s-3.58-.56-5.5-.56-4.94 0-5.5.56zm8-9c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-5 0c0-.83-.67-1.5-1.5-1.5S7 7.67 7 8.5 7.67 10 8.5 10s1.5-.67 1.5-1.5z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Cookie Preferences</p>
                  <p className="text-sm text-gray-600">Manage your cookie settings</p>
                </div>
              </Link>
            </div>
          </section>
        </article>

        {/* Back to Home */}
        {/* <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-block rounded-md bg-[#002855] px-8 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#0A1E3D]"
          >
            Back to Home
          </Link>
        </div> */}
      </div>
    </main>
  );
}

// ============================================================================
// SECTION COMPONENT — identical pattern to app/terms-of-use/page.tsx.
// Every heading is font-semibold; hierarchy is driven by size via the
// `prominent` prop, not weight.
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
// PARAGRAPH — justified, tight leading, matching the Terms page's densely
// packed feel for the prose portions of this page.
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
// REQUEST CARD — one row per data-subject request type. Keeps a light
// border since it's a functional, clickable component rather than prose.
// ============================================================================
function RequestCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  buttonClass,
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  buttonClass: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
          <p className="mb-4 text-sm leading-snug text-gray-600">{description}</p>
          <button
            type="button"
            onClick={onClick}
            className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors ${buttonClass}`}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}