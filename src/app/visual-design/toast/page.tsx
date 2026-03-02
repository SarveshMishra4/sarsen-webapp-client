"use client";

import { useToast } from "@/ui/primitives/Toast";

export default function ToastTestPage() {
  const { showToast } = useToast();

  /* Test Functions */

  const testSuccess = () => {
    showToast("Payment completed successfully", "success");
  };

  const testError = () => {
    showToast("Payment failed. Please retry.", "error");
  };

  const testInfo = () => {
    showToast("Your report is being generated", "info");
  };

  const testWarning = () => {
    showToast("Session will expire in 2 minutes", "warning");
  };

  const testMultiple = () => {
    showToast("Step 1 completed", "info");
    showToast("Step 2 completed", "success");
    showToast("Minor issue detected", "warning");
    showToast("Process failed", "error");
  };

  const testLongMessage = () => {
    showToast(
      "This is a long notification message to verify how the toast component behaves when handling extended text content in real-world enterprise workflows.",
      "info"
    );
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">

      {/* Page Title */}

      <h1 className="text-3xl font-bold mb-2">
        Toast System Test Panel
      </h1>

      <p className="text-gray-600 mb-8">
        Use this page to validate all toast behaviors in the system.
      </p>

      {/* Buttons Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <button
          onClick={testSuccess}
          className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Test Success Toast
        </button>

        <button
          onClick={testError}
          className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Test Error Toast
        </button>

        <button
          onClick={testInfo}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Test Info Toast
        </button>

        <button
          onClick={testWarning}
          className="px-5 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
        >
          Test Warning Toast
        </button>

        <button
          onClick={testMultiple}
          className="px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Test Multiple Toasts
        </button>

        <button
          onClick={testLongMessage}
          className="px-5 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Test Long Message
        </button>

      </div>

      {/* Info Section */}

      <div className="mt-10 p-5 bg-gray-50 border rounded-lg text-sm text-gray-700">

        <h2 className="font-semibold mb-2">What This Page Tests</h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Global Toast Provider wiring</li>
          <li>All toast variants</li>
          <li>Auto-dismiss behavior</li>
          <li>Manual close button</li>
          <li>Stacking logic</li>
          <li>UI overflow handling</li>
        </ul>

      </div>

    </div>
  );
}