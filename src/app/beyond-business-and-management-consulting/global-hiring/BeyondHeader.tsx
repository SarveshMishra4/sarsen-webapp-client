"use client";

import { useState } from "react";

// ============================================================================
// BEYOND HEADER
// Used on every page under /beyond-business-and-management (Governance & Political, Global Hiring,
// Eminence Advisory). Same layout, same sticky behaviour, same curved-tab
// mega menu and same mobile menu as the main Header — only the content has
// changed, and the thumbnail image section has been removed (so the image
// preloader is gone too).
// ============================================================================

export default function BeyondHeader() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [activeMenu, setActiveMenu] = useState<keyof typeof megaMenuContent | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<keyof typeof megaMenuContent | null>(null);

  // ============================================================================
  // MEGA MENU CONTENT CONFIGURATION
  // `label` is the tab text, `href` is where clicking the tab itself goes.
  // ============================================================================
  const megaMenuContent = {
    governance: {
      label: "Governance",
      href: "/beyond-business-and-management/political-consulting",
      title: "Governance & Political Consulting",
      description: "We observe, analyze and decipher governance and politics across India, Brazil and the United States.",
      links: [
        { label: "How We Decipher", href: "/beyond-business-and-management/political-consulting#approach", description: "Observe, analyze, decipher" },
        { label: "Geographies We Observe", href: "/beyond-business-and-management/political-consulting#geographies", description: "India, Brazil and the United States" },
        { label: "What We Decipher", href: "/beyond-business-and-management/political-consulting#capabilities", description: "Policy, risk, sentiment and scenarios" },
        { label: "Our Principles", href: "/beyond-business-and-management/political-consulting#principles", description: "Non-partisan, evidence-led, discreet" },
      ],
      highlight: {
        title: "Governance Briefing",
        description: "Independent analysis ahead of your next decision",
        buttonText: "Request a Briefing",
        link: "/beyond-business-and-management/political-consulting#enquiry",
      },
    },

    hiring: {
      label: "Global Hiring",
      href: "/beyond-business-and-management/global-hiring",
      title: "Global Hiring & Project Workforce",
      description: "From a single CEO to a 2,000-strong project workforce. We find, vet and deliver people at every level, anywhere.",
      links: [
        { label: "What We Hire For", href: "/beyond-business-and-management/global-hiring#spectrum", description: "From the boardroom to the build site" },
        { label: "Executive & Project Hiring", href: "/beyond-business-and-management/global-hiring#models", description: "Two engagement models" },
        { label: "Workforce Mobilisation", href: "/beyond-business-and-management/global-hiring#project-workforce", description: "Thousands of workers, on schedule" },
        { label: "Global Reach", href: "/beyond-business-and-management/global-hiring#regions", description: "Hire anywhere, deploy anywhere" },
      ],
      highlight: {
        title: "Share Your Hiring Need",
        description: "One leader or an entire workforce",
        buttonText: "Start Hiring",
        link: "/beyond-business-and-management/global-hiring#enquiry",
      },
    },

    eminence: {
      label: "Eminence",
      href: "/beyond-business-and-management/eminence-advisory",
      title: "Eminence & Personal Brand Advisory",
      description: "Strategic counsel for athletes, actors, artists and public figures building enduring influence.",
      links: [
        { label: "Personal Brand Strategy", href: "/beyond-business-and-management/eminence-advisory#brand", description: "Positioning that lasts" },
        { label: "Reputation & Perception", href: "/beyond-business-and-management/eminence-advisory#reputation", description: "How you are seen and why" },
        { label: "Career & Legacy Planning", href: "/beyond-business-and-management/eminence-advisory#legacy", description: "Beyond the current peak" },
        { label: "Partnerships & Ventures", href: "/beyond-business-and-management/eminence-advisory#ventures", description: "Turning influence into enterprise" },
      ],
      highlight: {
        title: "Eminence Advisory",
        description: "For those whose name is the brand",
        buttonText: "Explore Eminence",
        link: "/beyond-business-and-management/eminence-advisory",
      },
    },

    firm: {
      label: "The Firm",
      href: "/",
      title: "Sarsen Strategy Partners",
      description: "Return to our core practice in business strategy and its implementation.",
      links: [
        { label: "About Sarsen", href: "/about", description: "Our philosophy and people" },
        { label: "Business Services", href: "/services", description: "Strategy for founders and leaders" },
        { label: "Our Work", href: "/work", description: "Engagements and methodology" },
        { label: "Resources & Insights", href: "/resources", description: "Frameworks, research and case studies" },
      ],
      highlight: {
        title: "Core Practice",
        description: "Business strategy and implementation",
        buttonText: "Visit Main Site",
        link: "/",
      },
    },
  };

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleMouseEnter = (menu: keyof typeof megaMenuContent) => {
    if (window.innerWidth >= 1024) {
      setActiveMenu(menu);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setActiveMenu(null);
    }
  };

  const toggleMobileSubmenu = (menu: keyof typeof megaMenuContent) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  const menuKeys = Object.keys(megaMenuContent) as (keyof typeof megaMenuContent)[];

  return (
    <>
      <style>{`
        .active-tab-curved {
          position: relative;
          border-radius: 8px 8px 0 0;
        }
        .active-tab-curved::before {
          content: '';
          position: absolute;
          left: -8px;
          bottom: 0;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at 0 0, transparent 8px, white 8px);
        }
        .active-tab-curved::after {
          content: '';
          position: absolute;
          right: -8px;
          bottom: 0;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at 100% 0, transparent 8px, white 8px);
        }

        @keyframes megaMenuFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mega-menu-dropdown {
          animation: megaMenuFadeIn 0.15s ease-out forwards;
          will-change: opacity, transform;
        }
      `}</style>

      {/* ========================================================================== */}
      {/* HEADER CONTAINER                                                           */}
      {/* ========================================================================== */}
      <header data-beyond-header className="sticky top-0 z-50 bg-[#002855]">
        <nav
          className="max-w-[1400px] mx-auto px-4 lg:px-8 relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* ====================================================================== */}
          {/* TOP BAR                                                                */}
          {/* ====================================================================== */}
          <div className="flex items-center justify-between h-16 lg:h-20 relative z-20">

            {/* LOGO */}
            <a href="/" className="flex items-center space-x-2 lg:space-x-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                <img
                  src="/assets/brand/Sarsen-White.svg"
                  alt="Sarsen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-white">
                <div className="text-lg lg:text-xl font-bold">Sarsen</div>
                <div className="text-xs lg:text-sm">Strategy Partners</div>
              </div>
            </a>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden lg:flex items-center space-x-2 ml-16 relative z-20">
              {menuKeys.map((menu) => (
                <a
                  key={menu}
                  href={megaMenuContent[menu].href}
                  className={`px-5 font-medium relative whitespace-nowrap ${
                    activeMenu === menu
                      ? "text-[#002855] bg-white pt-3 pb-6 active-tab-curved"
                      : "text-white hover:text-[#002855] py-3"
                  }`}
                  onMouseEnter={() => handleMouseEnter(menu)}
                  style={{
                    marginBottom: activeMenu === menu ? "-1.25rem" : "0",
                    zIndex: activeMenu === menu ? 30 : 20,
                    transition: "none",
                    color: activeMenu === menu ? "#002855" : undefined,
                  }}
                >
                  {megaMenuContent[menu].label}
                </a>
              ))}
            </div>

            {/* DESKTOP CTA */}
            <a
              href="/contact"
              className="hidden lg:block px-6 lg:px-8 py-2 lg:py-3 bg-white text-[#002855] font-semibold rounded-md hover:bg-blue-50 transition-colors shadow-lg text-sm lg:text-base"
              style={{ color: "#002855" }}
            >
              Contact Us
            </a>

            {/* HAMBURGER */}
            <button
              className="lg:hidden text-white z-10 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* ====================================================================== */}
          {/* DESKTOP MEGA MENU DROPDOWN                                             */}
          {/* ====================================================================== */}
          {activeMenu && megaMenuContent[activeMenu] && (
            <div
              className="hidden lg:block absolute left-8 right-8 z-10 mega-menu-dropdown"
              style={{ top: "100%" }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-white shadow-2xl rounded-md overflow-hidden">
                <div className="flex min-h-[320px]">

                  {/* Section 1 — Title & Description (30%) */}
                  <div className="w-[30%] bg-gradient-to-br from-blue-50 to-white p-8 border-r border-gray-200">
                    <h3 className="text-2xl font-bold text-[#002855] mb-3">
                      {megaMenuContent[activeMenu].title}
                    </h3>
                    <p className="text-gray-600 text-md">
                      {megaMenuContent[activeMenu].description}
                    </p>
                  </div>

                  {/* Section 2 — Links (50%) */}
                  <div className="w-[50%] p-8 border-r border-gray-200">
                    <div className="space-y-1">
                      {megaMenuContent[activeMenu].links.slice(0, 7).map((link, idx) => (
                        <a
                          key={idx}
                          href={link.href}
                          className="block py-2 px-3 hover:text-[#002855] transition-colors duration-200 group cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-[15px] text-[#002855] group-hover:text-[#002855]">
                              {link.label}
                            </span>
                            <span className="text-gray-500 text-sm mt-0.5 group-hover:text-gray-700">
                              {link.description}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Section 3 — Highlight Card (20%) — image removed */}
                  <div className="w-[20%] p-8 bg-gradient-to-br from-gray-50 to-white">
                    <div className="h-full flex flex-col">
                      <div className="mb-4 rounded-md border border-gray-200 bg-white p-4">
                        <div className="text-md font-semibold text-[#002855]">
                          {megaMenuContent[activeMenu].highlight.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {megaMenuContent[activeMenu].highlight.description}
                        </div>
                      </div>

                      <a
                        href={megaMenuContent[activeMenu].highlight.link}
                        className="mt-auto w-full py-3 bg-[#002855] text-white font-semibold rounded-md hover:bg-[#0a1E3D] transition-colors text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200 text-center"
                      >
                        {megaMenuContent[activeMenu].highlight.buttonText}
                      </a>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 text-center">
                          All engagements are held in strict confidence
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ====================================================================== */}
          {/* MOBILE & TABLET MENU                                                   */}
          {/* ====================================================================== */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-full bg-white shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-4 py-4 space-y-2">
                {menuKeys.map((menu) => (
                  <div key={menu} className="border-b border-gray-200 pb-2">
                    <button
                      className="w-full flex items-center justify-between py-3 text-blue-600 font-semibold hover:text-blue-600 transition-colors"
                      onClick={() => toggleMobileSubmenu(menu)}
                    >
                      <span>{megaMenuContent[menu].label}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileSubmenu === menu ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {mobileSubmenu === menu && (
                      <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600 mb-3">
                          {megaMenuContent[menu].description}
                        </p>

                        <div className="space-y-1">
                          {megaMenuContent[menu].links.slice(0, 7).map((link, idx) => (
                            <a
                              key={idx}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 px-3 hover:text-[#002855] transition-colors duration-200 group cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-[15px] text-blue-600 group-hover:text-[#002855]">
                                  {link.label}
                                </span>
                                <span className="text-gray-500 text-xs mt-0.5 group-hover:text-gray-700">
                                  {link.description}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* Highlight — image removed */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-md border border-blue-100">
                          <h4 className="font-bold text-blue-600 text-sm">
                            {megaMenuContent[menu].highlight.title}
                          </h4>
                          <p className="text-gray-600 text-xs mt-1">
                            {megaMenuContent[menu].highlight.description}
                          </p>
                          <a
                            href={megaMenuContent[menu].highlight.link}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-2 px-4 py-2 bg-[#002855] text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-semibold w-full text-center block"
                          >
                            {megaMenuContent[menu].highlight.buttonText}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <a
                  href="/contact"
                  className="block w-full mt-4 px-6 py-3 bg-[#002855] text-white font-semibold rounded-md hover:bg-blue-900 transition-colors text-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          )}

        </nav>
      </header>
    </>
  );
}