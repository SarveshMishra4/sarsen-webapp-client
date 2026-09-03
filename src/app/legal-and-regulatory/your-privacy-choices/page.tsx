'use client';

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
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
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
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
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
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
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
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
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
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
  ]);

  const toggleChoice = (id: string) => {
    setPrivacyChoices((prev) =>
      prev.map((choice) =>
        choice.id === id
          ? { ...choice, enabled: !choice.enabled }
          : choice
      )
    );
  };

  const savePrivacyChoices = () => {
    const preferences = privacyChoices.reduce(
      (acc, choice) => {
        acc[choice.id] = choice.enabled;
        return acc;
      },
      {} as Record<string, boolean>
    );

    localStorage.setItem(
      'privacyChoices',
      JSON.stringify(preferences)
    );

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
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">
            Your Privacy Choices
          </h1>

          <p className="text-xl text-blue-100">
            Manage your privacy preferences and contact us regarding your
            personal information
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
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
            Your Privacy Choices
          </h2>

          <p className="text-gray-600 mb-4">
            Sarsen Strategy Partners respects the privacy of individuals
            interacting with its website and services. This page provides
            controls for certain preferences and information about how you may
            contact our team regarding personal information.
          </p>

          <p className="text-gray-600">
            For information about how personal information is collected, used,
            retained, and otherwise handled, please review our{' '}
            <Link
              href="/privacy-policy"
              className="text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Communication Preferences */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">

            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Communication & Privacy Preferences
            </h2>

            <p className="text-gray-600 mb-6">
              You may use the controls below to manage the available
              preferences on this page. Some preferences may not apply to
              every individual or service.
            </p>

            <div className="space-y-4">
              {privacyChoices.map((choice) => (
                <div
                  key={choice.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    {choice.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {choice.title}
                    </h3>

                    <p className="text-sm text-gray-600">
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
                        choice.enabled
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          choice.enabled
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={savePrivacyChoices}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors"
              >
                Save Preferences
              </button>
            </div>

          </div>
        </section>

        {/* Data Rights */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">

            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Requests Concerning Your Personal Information
            </h2>

            <p className="text-gray-600 mb-6">
              If you would like to ask about, access, correct, delete, obtain,
              or otherwise raise a concern regarding personal information held
              by Sarsen, please contact our team at{' '}
              <a
                href="mailto:contact@sarsenpartners.com"
                className="text-blue-600 hover:underline"
              >
                contact@sarsenpartners.com
              </a>
              .
            </p>

            <div className="space-y-6">

              {/* Access */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Access Request
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      Contact our team if you would like to request access to
                      personal information held by Sarsen, subject to
                      applicable requirements and limitations.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        submitDataRequest('a personal information access request')
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Deletion */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Deletion Request
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      Contact our team if you would like to request deletion
                      of personal information, subject to applicable
                      requirements, legitimate business needs, and legal
                      obligations.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        submitDataRequest('a personal information deletion request')
                      }
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Portability */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Information Transfer Request
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      Contact our team if you would like information in a
                      structured or transferable format, where applicable.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        submitDataRequest('a personal information transfer request')
                      }
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Correction */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Correction Request
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      Contact our team if you believe personal information
                      associated with you is inaccurate or incomplete.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        submitDataRequest('a personal information correction request')
                      }
                      className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Objection */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Processing Concern
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      Contact our team if you have a concern about the way
                      your personal information is being used or processed.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        submitDataRequest('a privacy or processing concern')
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Processing Time */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>

                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    Response to Requests
                  </p>

                  <p className="text-sm text-blue-700">
                    You may contact our team at{' '}
                    <a
                      href="mailto:contact@sarsenpartners.com"
                      className="font-medium underline"
                    >
                      contact@sarsenpartners.com
                    </a>
                    . We will review and address requests based on their nature
                    and circumstances. Depending on the seriousness,
                    complexity, and volume of the matter, a response may take
                    up to 45 days.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Jurisdiction-Neutral Privacy Rights */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">

            <h2 className="text-2xl font-medium text-gray-800 mb-6">
              Privacy Rights and Applicable Law
            </h2>

            <p className="text-gray-600 mb-4">
              Depending on where you are located and the circumstances in which
              Sarsen interacts with you, different privacy rights and
              requirements may apply.
            </p>

            <p className="text-gray-600 mb-4">
              Where applicable, individuals may have rights concerning their
              personal information, including rights relating to access,
              correction, deletion, objection, restriction, or other forms of
              control over personal information.
            </p>

            <p className="text-gray-600">
              The availability and scope of any particular right may depend on
              applicable law, the nature of the information, the purpose for
              which it is processed, and other relevant circumstances. Nothing
              on this page is intended to create rights beyond those available
              under applicable law.
            </p>

          </div>
        </section>

        {/* Contact Privacy Team */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">

            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Questions About Your Privacy?
            </h2>

            <p className="text-gray-600 mb-6">
              If you have a question about your personal information, wish to
              make a privacy-related request, or have a concern regarding the
              handling of your information, please contact our team.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-3">
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

              <p className="text-gray-500 text-sm mt-4">
                You may contact our team through the email address above. We
                will review and address your concern based on its nature and
                circumstances. Depending on the seriousness, complexity, and
                volume of matters being handled, a response may take up to
                45 days.
              </p>
            </div>

          </div>
        </section>

        {/* Related Links */}
        <section>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">

            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Related Privacy Resources
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <Link
                href="/privacy-policy"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-2 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>

                <div>
                  <p className="font-medium text-gray-800">
                    Privacy Policy
                  </p>
                  <p className="text-sm text-gray-600">
                    Read our privacy policy
                  </p>
                </div>
              </Link>

              <Link
                href="/cookie-preferences"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5c.56-.56 3.58-.56 5.5-.56s4.94 0 5.5.56S18.06 19 17.5 19s-3.58-.56-5.5-.56-4.94 0-5.5.56zm8-9c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-5 0c0-.83-.67-1.5-1.5-1.5S7 7.67 7 8.5 7.67 10 8.5 10s1.5-.67 1.5-1.5z" />
                </svg>

                <div>
                  <p className="font-medium text-gray-800">
                    Cookie Preferences
                  </p>
                  <p className="text-sm text-gray-600">
                    Manage your cookie settings
                  </p>
                </div>
              </Link>

            </div>
          </div>
        </section>

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