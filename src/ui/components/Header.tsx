"use client";

import { useState, useEffect } from "react";

// ============================================================================
// IMAGE PRELOADER — runs immediately when the module loads (not on hover)
// Eagerly fetches all mega-menu thumbnails into the browser cache so that
// the first hover shows the image instantly instead of waiting for a network
// round-trip.
// ============================================================================
const HIGHLIGHT_IMAGES = [
  "/assets/thumbnail-header/work.webp",
  "/assets/thumbnail-header/report.webp",
  "/assets/thumbnail-header/our-team.webp",   // renamed: spaces → hyphens
  "/assets/thumbnail-header/happy-client.webp", // renamed: fixed typo + spaces
];

if (typeof window !== "undefined") {
  HIGHLIGHT_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

export default function Header() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [activeMenu, setActiveMenu] = useState<keyof typeof megaMenuContent | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<keyof typeof megaMenuContent | null>(null);

  // ============================================================================
  // MEGA MENU CONTENT CONFIGURATION
  // ============================================================================
  const megaMenuContent = {
    about: {
      title: "About Sarsen Strategy Partners",
      description: "Learn about our philosophy, approach, and the people driving our mission.",
      links: [
        { label: "How We Think", href: "/about#how-we-think", description: "Our operating philosophy" },
        { label: "How We Approach", href: "/about#how-we-approach", description: "Our strategic methodology" },
        { label: "The People Behind the Work", href: "/about#people", description: "Meet our team of experts" },
        { label: "How We Are And How We Become", href: "/about#evolution", description: "Our partnership and the transformation" },
      ],
      highlight: {
        title: "Our Philosophy",
        description: "Discover our approach",
        thumbnail: "/assets/thumbnail-header/work.webp",
        buttonText: "Learn More",
        link: "/about",
      },
    },

    resources: {
      title: "Resources & Insights",
      description: "Access our comprehensive library of frameworks, research, and industry insights.",
      links: [
        { label: "Frameworks We Use", href: "/resources#frameworks", description: "Strategic frameworks and methodologies" },
        { label: "Case Studies", href: "/resources/case-studies", description: "Real‑world success stories" },
        { label: "Tools", href: "/resources/tools", description: "Specialized analytical tools" },
        { label: "Research & Reports", href: "/resources/reports", description: "In‑depth analysis and insights" },
      ],
      highlight: {
        title: "Latest Framework",
        description: "Strategic Planning Guide",
        thumbnail: "/assets/thumbnail-header/report.webp",
        buttonText: "View Resources",
        link: "/resources",
      },
    },

    work: {
      title: "Our Engagement Portfolio",
      description: "Explore our work across industries and see the impact we've delivered.",
      links: [
        { label: "Work on Engagement", href: "/work#engagement", description: "Combined engagement approaches" },
        { label: "Communication & Guidance", href: "/work#communication", description: "Strategic communication services" },
        { label: "Work by Sector", href: "/work#by-sector", description: "Industry-specific solutions" },
        { label: "Storytelling & Presentations", href: "/work#storytelling", description: "Narrative development and delivery" },
      ],
      highlight: {
        title: "Featured Work",
        description: "Recent client success",
        thumbnail: "/assets/thumbnail-header/our-team.webp",  // renamed
        buttonText: "View Portfolio",
        link: "/work",
      },
    },

    services: {
      title: "Our Service Offerings",
      description: "Comprehensive solutions tailored to drive your business forward.",
      links: [
        { label: "Know What's Really Going On", href: "/services/business-diagnostic-direction", description: "Business Diagnostic & Direction" },
        { label: "Is Your Idea Worth Pursuing ?", href: "/services/idea-to-validation", description: "Idea‑to‑Validation" },
        { label: "Make Customers Actually Want Your Product", href: "/services/product-market-fit-clarity", description: "Product‑Market Fit Clarity" },
        { label: "Stop Random Sales, Start Repeatable Growth", href: "/services/go-to-market-strategy", description: "Go‑To‑Market Strategy" },
        { label: "Stop Being the Bottleneck", href: "/services/operations-scalability", description: "Operations & Scalability" },
        { label: "Raise Capital with Confidence", href: "/services/fundraising-readiness", description: "Fundraising Readiness" },
        { label: "Survive & Recover Now", href: "/services/turnaround-stabilisation", description: "Turnaround & Stabilisation" },
        { label: "Scale Without Breaking", href: "/services/scale-expansion-strategy", description: "Scale & Expansion Strategy" },
      ],
      highlight: {
        title: "Popular Service",
        description: "Clarity Reset Program",
        thumbnail: "/assets/thumbnail-header/happy-client.webp", // renamed
        buttonText: "Explore Services",
        link: "/services",
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

  return (
    <>
      {/*
        ============================================================================
        CURVED TAB CSS — moved from inline <style> string to a proper <style> tag
        that Next.js hoists once. No more per-render style recalculation.

        NOTE: The best practice is to move these rules into globals.css entirely.
        If you do that, delete this <style> block. The classes are:
          .active-tab-curved
          .active-tab-curved::before
          .active-tab-curved::after
          .mega-menu-dropdown   ← new GPU-composited fade-in (replaces animate-fadeIn)
        ============================================================================
      */}
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

        /*
          GPU-accelerated dropdown fade.
          Only animates opacity + transform — both handled entirely by the
          compositor thread, zero layout/paint cost, zero jank.
          Replaces whatever animate-fadeIn was doing before.
        */
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
      <header className="sticky top-0 z-50 bg-[#002855]">
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
              {Object.keys(megaMenuContent).map((menu) => (
                <a
                  key={menu}
                  href={`/${menu}`}
                  className={`px-5 font-medium relative ${
                    activeMenu === menu
                      ? "text-[#002855] bg-white pt-3 pb-6 active-tab-curved"
                      : "text-white hover:text-[#002855] py-3"
                  }`}
                  onMouseEnter={() => handleMouseEnter(menu as keyof typeof megaMenuContent)}
                  style={{
                    marginBottom: activeMenu === menu ? "-1.25rem" : "0",
                    zIndex: activeMenu === menu ? 30 : 20,
                    transition: "none",
                    color: activeMenu === menu ? "#002855" : undefined,
                  }}
                >
                  {menu.charAt(0).toUpperCase() + menu.slice(1)}
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
          {/*
            Key change: replaced "animate-fadeIn" (unknown/possibly jank custom class)
            with "mega-menu-dropdown" which uses the GPU-composited keyframe above.
            Everything else — layout, sizing, content — is identical.
          */}
          {activeMenu && megaMenuContent[activeMenu] && (
            <div
              className="hidden lg:block absolute left-8 right-8 z-10 mega-menu-dropdown"
              style={{ top: "calc(100%" }} // overlaps the 1px bottom border of the active tab to create a seamless connection
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

                  {/* Section 3 — Highlight Card (20%) */}
                  <div className="w-[20%] p-8 bg-gradient-to-br from-gray-50 to-white">
                    <div className="h-full flex flex-col">
                      <div className="mb-4 overflow-hidden rounded-md border border-gray-200">
                        <div className="aspect-video relative overflow-hidden bg-gray-100">
                          {/*
                            fetchpriority="high" tells the browser to treat this as
                            a high-priority resource the moment the dropdown mounts.
                            Combined with the JS preload above, the image is already
                            in cache before the user even hovers.
                          */}
                          <img
                            key={activeMenu}
                            src={megaMenuContent[activeMenu].highlight.thumbnail}
                            alt="Preview"
                            className="w-full h-full object-cover transition-opacity duration-300"
                            fetchPriority="high"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                        <div className="p-3 bg-white">
                          <div className="text-md font-semibold text-[#002855] truncate">
                            {megaMenuContent[activeMenu].highlight.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {megaMenuContent[activeMenu].highlight.description}
                          </div>
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
                          All resources are available for download
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
                {Object.keys(megaMenuContent).map((menu) => (
                  <div key={menu} className="border-b border-gray-200 pb-2">
                    <button
                      className="w-full flex items-center justify-between py-3 text-blue-600 font-semibold hover:text-blue-600 transition-colors"
                      onClick={() => toggleMobileSubmenu(menu as keyof typeof megaMenuContent)}
                    >
                      <span className="capitalize">{menu}</span>
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

                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-md border border-blue-100">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
                              <img
                                src={megaMenuContent[menu].highlight.thumbnail}
                                alt={megaMenuContent[menu].highlight.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-blue-600 text-sm">
                                {megaMenuContent[menu].highlight.title}
                              </h4>
                              <p className="text-gray-600 text-xs mt-1">
                                {megaMenuContent[menu].highlight.description}
                              </p>
                              <a
                                href={megaMenuContent[menu].highlight.link}
                                className="mt-2 px-4 py-2 bg-[#002855] text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-semibold w-full text-center block"
                              >
                                {megaMenuContent[menu].highlight.buttonText}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <a
                  href="/contact"
                  className="block w-full mt-4 px-6 py-3 bg-[#002855] text-blue-400 font-semibold rounded-md hover:bg-blue-900 transition-colors text-center"
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