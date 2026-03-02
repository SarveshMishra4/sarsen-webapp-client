"use client";

/* ======================================================
   IMPORTS
   ====================================================== */

import { useState } from "react";

/* ======================================================
   MAIN PAGE
   ====================================================== */

export default function PartnerAccessPage() {
  /* Modal open/close state */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* Form states */
  const [partnerId, setPartnerId] = useState("");
  const [password, setPassword] = useState("");

  /* Error / success message */
  const [message, setMessage] = useState("");

  /* Dummy data for demo */
  const items = [
    "Growth Strategy Report",
    "Market Analysis Dashboard",
    "Financial Forecast Model",
    "Investor Pitch Deck",
    "Expansion Playbook",
  ];

  /* ======================================================
     OPEN MODAL
     ====================================================== */

  const openModal = () => {
    setIsModalOpen(true);
    setMessage("");
  };

  /* ======================================================
     CLOSE MODAL
     ====================================================== */

  const closeModal = () => {
    setIsModalOpen(false);
    setPartnerId("");
    setPassword("");
    setMessage("");
  };

  /* ======================================================
     HANDLE SUBMIT (FAKE AUTH)
     ====================================================== */

  const handleSubmit = () => {
    /*
      This is dummy validation.
      Later you will connect backend API.
    */

    if (!partnerId || !password) {
      setMessage("Please fill all fields");
      return;
    }

    if (partnerId === "partner123" && password === "secure123") {
      setMessage("Access Granted ✅");
    } else {
      setMessage("Invalid Partner Credentials ❌");
    }
  };

  /* ======================================================
     RENDER
     ====================================================== */

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* ===============================================
          PAGE TITLE
         =============================================== */}

      <h1 className="text-3xl font-bold mb-2">
        Partner Resource Center
      </h1>

      <p className="text-gray-600 mb-8">
        Restricted access to partner-only materials
      </p>

      {/* ===============================================
          SEARCH BAR
         =============================================== */}

      <div className="mb-8 max-w-md">

        <input
          type="text"
          placeholder="Search partner resources..."
          onFocus={openModal}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* ===============================================
          ITEMS LIST
         =============================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">

        {items.map((item, index) => (
          <div
            key={index}
            onClick={openModal}
            className="bg-white p-5 rounded-lg shadow hover:shadow-md cursor-pointer transition"
          >
            <h3 className="font-semibold">{item}</h3>

            <p className="text-sm text-gray-500 mt-1">
              Click to access
            </p>
          </div>
        ))}

      </div>

      {/* ===============================================
          MODAL OVERLAY
         =============================================== */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          {/* ===========================================
              MODAL BOX
             =========================================== */}

          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">
              Partner Access Only
            </h2>

            <p className="text-gray-600 mb-6 text-sm">
              Please enter your partner credentials to continue
            </p>

            {/* =======================================
                FORM
               ======================================= */}

            <div className="space-y-4">

              {/* Partner ID */}
              <div>
                <label className="text-sm font-medium">
                  Partner ID
                </label>

                <input
                  type="text"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Message */}
              {message && (
                <p
                  className={`text-sm ${
                    message.includes("Granted")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Verify Access
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}