// app/cookie-preferences/page.tsx
'use client';

import React, { useState } from 'react';
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
      description: 'These cookies are necessary for the website to function and cannot be disabled. They are usually set in response to actions you take, such as setting privacy preferences, logging in, or filling in forms.',
      required: true,
      enabled: true,
      examples: [
        'Session management and authentication',
        'Security and fraud prevention',
        'Load balancing and performance',
        'Form submission and error handling',
        'Cookie consent preferences'
      ]
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, or region. They may be set by us or third-party providers.',
      required: false,
      enabled: true,
      examples: [
        'Language and region preferences',
        'User interface customization',
        'Video player settings',
        'Chat widget preferences',
        'Accessibility settings'
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
      required: false,
      enabled: true,
      examples: [
        'Google Analytics',
        'Page views and navigation patterns',
        'Time spent on pages',
        'Traffic sources and referrals',
        'Device and browser information'
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites and deliver more relevant advertising. They may also be used to limit the number of times you see an advertisement and measure campaign effectiveness.',
      required: false,
      enabled: false,
      examples: [
        'Google Ads and remarketing',
        'Social media advertising (LinkedIn, Facebook)',
        'Email marketing tracking',
        'Conversion tracking',
        'Personalized advertisements'
      ]
    }
  ]);

  const [saveMessage, setSaveMessage] = useState('');

  const toggleCategory = (id: string) => {
    setCookieCategories(prev =>
      prev.map(cat =>
        cat.id === id && !cat.required
          ? { ...cat, enabled: !cat.enabled }
          : cat
      )
    );
  };

  const acceptAll = () => {
    setCookieCategories(prev =>
      prev.map(cat => ({ ...cat, enabled: true }))
    );
    savePreferences(true);
  };

  const rejectAll = () => {
    setCookieCategories(prev =>
      prev.map(cat => ({ ...cat, enabled: cat.required }))
    );
    savePreferences(false);
  };

  const savePreferences = (acceptedAll: boolean = false) => {
    // In a real implementation, this would save to cookies/localStorage
    const preferences = cookieCategories.reduce((acc, cat) => {
      acc[cat.id] = cat.enabled;
      return acc;
    }, {} as Record<string, boolean>);

    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    setSaveMessage(acceptedAll ? 'All cookies accepted!' : 'Cookie preferences saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1E3D] to-[#1E5A8E] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Cookie Preferences</h1>
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
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            <p className="text-green-800 font-medium">{saveMessage}</p>
          </div>
        )}

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">About Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, understanding how you use our site, and improving our services.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You can control which cookies we use by adjusting your preferences below. Please note that disabling certain cookies may affect the functionality of our website.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For more detailed information about how we use cookies and process your data, please read our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
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
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      disabled={category.required}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        category.enabled
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      } ${category.required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          category.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {category.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
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
              Your preferences will be saved and applied to your browsing experience.
            </p>
            <button
              onClick={() => savePreferences(false)}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Save Preferences
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-6">
          
          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Cookie Duration</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Cookies may be stored on your device for different periods:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</li>
              <li><strong>Third-Party Cookies:</strong> Set by external services we use (analytics, advertising, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Managing Cookies in Your Browser</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You can also manage cookies directly through your browser settings. Here's how:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm">
              Note: Blocking all cookies may prevent you from using certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Do Not Track (DNT)</h2>
            <p className="text-gray-600 leading-relaxed">
              We respect Do Not Track (DNT) browser settings. If you enable DNT in your browser, we will not track your activity across other websites. However, essential cookies required for website functionality will still be used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the following third-party services that may set cookies:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-gray-800">Google Analytics</p>
                <p className="text-sm text-gray-600">Used to analyze website traffic and user behavior</p>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  Privacy Policy →
                </a>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-gray-800">Payment Processors</p>
                <p className="text-sm text-gray-600">Secure payment processing and fraud prevention</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-gray-800">Social Media Platforms</p>
                <p className="text-sm text-gray-600">Share buttons and embedded content</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Updates to Cookie Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update our cookie practices from time to time. When we make changes, we will update the "Last Updated" date on this page and notify you through our website. Please review your cookie preferences periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about our use of cookies:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-800 font-medium mb-2">Sarsen Strategy Partners</p>
              <p className="text-gray-600">Email: privacy@sarsenstrategy.com</p>
              <p className="text-gray-600">Phone: +91 [Your Phone Number]</p>
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