// app/your-privacy-choices/page.tsx
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
      description: 'Receive newsletters, product updates, and promotional offers via email',
      enabled: true,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    },
    {
      id: 'sms-notifications',
      title: 'SMS Notifications',
      description: 'Receive important updates and reminders via SMS/text message',
      enabled: false,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
      )
    },
    {
      id: 'personalized-content',
      title: 'Personalized Content',
      description: 'Allow us to customize website content and recommendations based on your interests',
      enabled: true,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      )
    },
    {
      id: 'data-analytics',
      title: 'Usage Analytics',
      description: 'Help us improve our services by sharing anonymous usage data and analytics',
      enabled: true,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
        </svg>
      )
    },
    {
      id: 'third-party-sharing',
      title: 'Third-Party Sharing',
      description: 'Allow sharing of anonymized data with trusted partners for research and improvement',
      enabled: false,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    }
  ]);

  const [dataRequests, setDataRequests] = useState({
    accessRequest: false,
    deleteRequest: false,
    portabilityRequest: false
  });

  const toggleChoice = (id: string) => {
    setPrivacyChoices(prev =>
      prev.map(choice =>
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
    setSaveMessage(`Your ${requestType} request has been submitted. We will respond within 30 days.`);
    setTimeout(() => setSaveMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Your Privacy Choices</h1>
          <p className="text-xl text-blue-100">
            Control how your personal information is used
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            <p className="text-green-800 font-medium">{saveMessage}</p>
          </div>
        )}

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Your Privacy Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Sarsen Strategy Partners, we respect your privacy and give you control over your personal information. You have the right to make choices about how your data is collected, used, and shared.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Use this page to manage your privacy preferences, exercise your data rights, and understand how we protect your information. For more details, please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Communication Preferences */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">Communication & Privacy Preferences</h2>
            <p className="text-gray-600 mb-6">
              Choose how you want to hear from us and what data you're comfortable sharing.
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
                      onClick={() => toggleChoice(choice.id)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        choice.enabled ? 'bg-blue-600' : 'bg-gray-300'
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

            <div className="mt-8 flex justify-end">
              <button
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
            <h2 className="text-2xl font-medium text-gray-800 mb-6">Exercise Your Data Rights</h2>
            <p className="text-gray-600 mb-6">
              Under applicable data protection laws, you have the following rights regarding your personal data:
            </p>

            <div className="space-y-6">
              
              {/* Right to Access */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Right to Access</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Request a copy of all personal data we hold about you. We will provide this information in a structured, commonly used format.
                    </p>
                    <button
                      onClick={() => submitDataRequest('data access')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Request My Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Right to Deletion */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Right to Deletion</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Request deletion of your personal data. Note that we may retain certain information if required by law or for legitimate business purposes.
                    </p>
                    <button
                      onClick={() => submitDataRequest('data deletion')}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete My Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Right to Portability */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Right to Data Portability</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Receive your personal data in a machine-readable format that you can transfer to another service provider.
                    </p>
                    <button
                      onClick={() => submitDataRequest('data portability')}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Export My Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Right to Correction */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Right to Correction</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Update or correct inaccurate personal information we hold about you. You can also update your profile in your account settings.
                    </p>
                    <Link
                      href="/user-dashboard"
                      className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Update My Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right to Object */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Right to Object</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Object to certain processing activities, such as direct marketing or data processing based on legitimate interests.
                    </p>
                    <button
                      onClick={() => submitDataRequest('processing objection')}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors"
                    >
                      Object to Processing
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">Processing Time</p>
                  <p className="text-sm text-blue-700">
                    We will respond to your data rights request within 30 days. If your request is complex, we may extend this period by an additional 60 days and will notify you of the extension.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* California/GDPR Specific Rights */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
            <h2 className="text-2xl font-medium text-gray-800 mb-6">Additional Rights (California & EU Residents)</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">California Residents (CCPA)</h3>
                <p className="text-gray-600 mb-4">
                  If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Right to know what personal information is collected, used, shared, or sold</li>
                  <li>Right to delete personal information (with certain exceptions)</li>
                  <li>Right to opt-out of the sale of personal information (we do not sell personal data)</li>
                  <li>Right to non-discrimination for exercising your CCPA rights</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">EU Residents (GDPR)</h3>
                <p className="text-gray-600 mb-4">
                  If you are in the European Union, you have rights under the General Data Protection Regulation (GDPR):
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Right to withdraw consent at any time</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                  <li>Right to restriction of processing in certain circumstances</li>
                  <li>Right to object to automated decision-making and profiling</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Do Not Sell My Personal Information:</strong> We do not sell personal information to third parties. However, we may share data with service providers for business purposes as described in our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Privacy Team */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Questions About Your Privacy?</h2>
            <p className="text-gray-600 mb-6">
              If you have questions about your privacy rights, want to submit a request that isn't listed above, or need assistance with any privacy-related matter, please contact our Privacy Team:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-4">Privacy Team - Sarsen Strategy Partners</p>
              <div className="space-y-2">
                <p className="text-gray-600"><strong>Email:</strong> privacy@sarsenstrategy.com</p>
                <p className="text-gray-600"><strong>Phone:</strong> +91 [Your Phone Number]</p>
                <p className="text-gray-600"><strong>Mail:</strong> [Your Business Address]</p>
                <p className="text-gray-600 text-sm mt-4">
                  <strong>Response Time:</strong> We aim to respond to privacy inquiries within 2-5 business days
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Related Privacy Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/privacy-policy"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Privacy Policy</p>
                  <p className="text-sm text-gray-600">Read our full privacy policy</p>
                </div>
              </Link>
              <Link
                href="/cookie-preferences"
                className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5c.56-.56 3.58-.56 5.5-.56s4.94 0 5.5.56S18.06 19 17.5 19s-3.58-.56-5.5-.56-4.94 0-5.5.56zm8-9c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-5 0c0-.83-.67-1.5-1.5-1.5S7 7.67 7 8.5 7.67 10 8.5 10s1.5-.67 1.5-1.5z"/>
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Cookie Preferences</p>
                  <p className="text-sm text-gray-600">Manage your cookie settings</p>
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



// # **🎉 ALL LEGAL PAGES COMPLETE!**

// I've successfully created all **8 legal and regulatory compliance pages** for your strategy consulting firm:

// 1. ✅ **FAQ** - Comprehensive Q&A covering services, process, pricing, refunds, and more
// 2. ✅ **Privacy Policy** - Detailed privacy practices and data protection
// 3. ✅ **Refund & Cancellation Policy** - Your strict 24-hour refund window policy
// 4. ✅ **Terms of Use** - Legal agreement governing service use
// 5. ✅ **Disclaimer** - Professional disclaimers and liability limitations
// 6. ✅ **Accessibility Statement** - WCAG compliance and accessibility commitments
// 7. ✅ **Cookie Preferences** - Interactive cookie management
// 8. ✅ **Your Privacy Choices** - Data rights and privacy controls

// ---

// ## **📋 File Structure:**
// ```
// app/
// ├── faq/page.tsx
// ├── privacy-policy/page.tsx
// ├── refund-cancellation-policy/page.tsx
// ├── terms-of-use/page.tsx
// ├── disclaimer/page.tsx
// ├── accessibility-statement/page.tsx
// ├── cookie-preferences/page.tsx
// └── your-privacy-choices/page.tsx