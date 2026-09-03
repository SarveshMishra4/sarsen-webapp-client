// app/cookie-preferences/page.tsx
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
      name: 'Essential Cookies',
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
      name: 'Functional Cookies',
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
      name: 'Analytics Cookies',
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
      name: 'Marketing Cookies',
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

  // Load saved preferences on mount
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

    localStorage.setItem(
      'cookiePreferences',
      JSON.stringify(preferences)
    );

    setSaveMessage(message);

    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };

  const acceptAll = () => {
    const updatedCategories = cookieCategories.map((category) => ({
      ...category,
      enabled: true,
    }));

    setCookieCategories(updatedCategories);

    savePreferences(
      updatedCategories,
      'All available cookies have been accepted.'
    );
  };

  const rejectAll = () => {
    const updatedCategories = cookieCategories.map((category) => ({
      ...category,
      enabled: category.required,
    }));

    setCookieCategories(updatedCategories);

    savePreferences(
      updatedCategories,
      'Non-essential cookies have been rejected.'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">
            Cookie Preferences
          </h1>

          <p className="text-xl text-blue-100">
            Manage your cookie settings and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>

            <p className="text-green-800 font-medium">
              {saveMessage}
            </p>
          </div>
        )}

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            1. About This Page
          </h2>

          <p className="text-gray-600 mb-4">
            This Cookie Preferences page allows you to review and manage
            your preferences for non-essential cookies and similar
            technologies used on the Sarsen Strategy Partners website.
          </p>

          <p className="text-gray-600 mb-4">
            Essential cookies may continue to operate where they are
            necessary for the security, functionality, or operation of
            the website.
          </p>

          <p className="text-gray-600">
            For information about how personal data may be collected,
            used, stored, or otherwise processed, please review our{' '}
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Legal Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            2. Related Legal Documents
          </h2>

          <p className="text-gray-600 mb-4">
            This page should be read together with the other applicable
            legal documents governing use of the Sarsen Strategy Partners
            website and services, including our{' '}
            <Link
              href="/terms-of-use"
              className="text-blue-600 hover:underline"
            >
              Terms of Use
            </Link>
            ,{' '}
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            ,{' '}
            <Link
              href="/refund-cancellation-policy"
              className="text-blue-600 hover:underline"
            >
              Refund &amp; Cancellation Policy
            </Link>
            , and{' '}
            <Link
              href="/disclaimer"
              className="text-blue-600 hover:underline"
            >
              Disclaimer
            </Link>
            .
          </p>

          <p className="text-gray-600">
            Each document addresses its respective subject matter. Where
            applicable, the document or contractual provision specifically
            governing a particular subject will apply to that subject,
            subject to applicable law.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={acceptAll}
              className="flex-1 bg-[#0A1E3D] hover:bg-[#132B47] text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Accept All Cookies
            </button>

            <button
              onClick={rejectAll}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Reject Non-Essential
            </button>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-6">
          {cookieCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-medium text-gray-800">
                        {category.name}
                      </h3>

                      {category.required && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                          Always Active
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>

                  <div className="ml-4">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      disabled={category.required}
                      aria-label={`Toggle ${category.name}`}
                      aria-pressed={category.enabled}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        category.enabled
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
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
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Examples:
                  </h4>

                  <ul className="text-sm text-gray-600 space-y-1">
                    {category.examples.map((example, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2"
                      >
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              Your selected preferences will be stored on your device
              and used to determine applicable non-essential cookie
              preferences.
            </p>

            <button
              onClick={() => savePreferences()}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
          {/* Cookie Duration */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              3. Cookie Duration
            </h2>

            <p className="text-gray-600 mb-4">
              Cookies may remain on your device for different periods
              depending on their purpose and configuration.
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
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
            </ul>

            <p className="text-gray-600 text-sm mt-4">
              Specific cookie durations may vary depending on the
              technology actually implemented on the website.
            </p>
          </section>

          {/* Browser Controls */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              4. Managing Cookies in Your Browser
            </h2>

            <p className="text-gray-600 mb-4">
              You may also manage or delete cookies through the settings
              provided by your web browser.
            </p>

            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
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
            </ul>

            <p className="text-gray-600 text-sm">
              Browser controls may operate independently from the
              preference controls provided on this page. Blocking
              certain cookies may affect some website functionality.
            </p>
          </section>

          {/* Consent */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              5. Consent for Non-Essential Cookies
            </h2>

            <p className="text-gray-600 mb-4">
              Where consent is required for non-essential cookies or
              similar technologies, those technologies should only be
              activated in accordance with the applicable consent
              mechanism and your selected preferences.
            </p>

            <p className="text-gray-600">
              You may change your preferences at any time through this
              page or through any cookie preference mechanism made
              available on the website.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              6. Third-Party Technologies
            </h2>

            <p className="text-gray-600 mb-4">
              Certain website functions may involve third-party
              technologies or service providers that use cookies or
              similar technologies. The providers and technologies used
              may change as the website and its services develop.
            </p>

            <p className="text-gray-600 mb-4">
              Third-party providers may process information in accordance
              with their own terms, privacy policies, and cookie
              practices.
            </p>

            <p className="text-gray-600">
              Where third-party cookies or similar technologies are used,
              you should review the relevant third party&apos;s privacy
              and cookie information for further details.
            </p>
          </section>

          {/* Do Not Track */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              7. Do Not Track
            </h2>

            <p className="text-gray-600">
              Browser-based &quot;Do Not Track&quot; signals may not be
              consistently supported or interpreted across all browsers,
              devices, technologies, and third-party services. We
              therefore do not make a blanket representation that every
              such signal will automatically disable all forms of
              tracking or similar technology.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              8. Updates to Cookie Practices
            </h2>

            <p className="text-gray-600">
              We may update our cookie practices as our website,
              services, technologies, and applicable requirements change.
              Where appropriate, we will update this page and the
              information describing our cookie practices. You should
              review your preferences periodically.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              9. Contact Us
            </h2>

            <p className="text-gray-600 mb-4">
              If you have questions, concerns, or requests regarding
              cookies or similar technologies used on our website, you
              may contact the Sarsen team by email.
            </p>

            <p className="text-gray-600 mb-4">
              Depending on the nature, seriousness, complexity, and
              volume of matters being handled, a response may take from
              a few hours up to 45 days.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">
                Sarsen Strategy Partners
              </p>

              <p className="text-gray-600">
                Email:{' '}
                <a
                  href="mailto:contact@sarsenpartners.com"
                  className="text-blue-600 hover:underline"
                >
                  contact@sarsenpartners.com
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}