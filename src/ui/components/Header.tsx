"use client";

import { useState } from "react";

export default function Header() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  // State to track which mega menu is currently active (desktop)
  // Uses a union type derived from the keys of megaMenuContent (e.g., "about" | "resources" | ...)
  // null means no menu is open.
  const [activeMenu, setActiveMenu] = useState<keyof typeof megaMenuContent | null>(null);

  // State to control the mobile menu (hamburger) open/close.
  // When true, the mobile menu slides down.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State to track which submenu (accordion) is currently expanded in mobile view.
  // Each top-level menu can have its own expanded submenu; only one can be open at a time.
  const [mobileSubmenu, setMobileSubmenu] = useState<keyof typeof megaMenuContent | null>(null);

  // ============================================================================
  // MEGA MENU CONTENT CONFIGURATION
  // ============================================================================
  // This object defines all the navigation items and their submenu content.
  // Each key corresponds to a main navigation item (e.g., "about", "resources").
  // The structure is strongly typed via TypeScript inference.
  // The commented-out "home" section is not currently used but kept as a template.
  const megaMenuContent = {
    // ----------------------------------------------------------------------------
    // HOME NAVIGATION (commented out, possibly for future use)
    // ----------------------------------------------------------------------------
    // home: {
    //   title: "Welcome to Sarsen",
    //   description: "Your gateway to strategic excellence and innovative solutions.",
    //   links: [
    //     {
    //       label: "User Dashboard",
    //       href: "/home#user-dashboard",
    //       description: "Access your personalized dashboard"
    //     },
    //     ... (more links)
    //   ],
    //   highlight: {
    //     title: "Quick Access",
    //     description: "Dashboard & Login",
    //     thumbnail: "/images/dashboard-thumb.jpg",
    //     buttonText: "Get Started"
    //   }
    // },

    // ----------------------------------------------------------------------------
    // ABOUT NAVIGATION
    // ----------------------------------------------------------------------------
    about: {
      title: "About Sarsen & Company",
      description: "Learn about our philosophy, approach, and the people driving our mission.",
      links: [
        {
          label: "How We Think",
          href: "/about#how-we-think",
          description: "Our operating philosophy"
        },
        {
          label: "How We Approach",
          href: "/about#how-we-approach",
          description: "Our strategic methodology"
        },
        {
          label: "The People Behind the Work",
          href: "/about#people",
          description: "Meet our team of experts"
        },
        {
          label: "How We Are And How We Become",
          href: "/about#evolution",
          description: "Our partnership and the transformation"
        },
      ],
      highlight: {
        title: "Our Philosophy",
        description: "Discover our approach",
        thumbnail: "/assets/thumbnail-header/work.webp",
        buttonText: "Learn More",
        link: "/about"                 // 👈 added
      }
    },

    // ----------------------------------------------------------------------------
    // RESOURCES NAVIGATION
    // ----------------------------------------------------------------------------
    resources: {
      title: "Resources & Insights",
      description: "Access our comprehensive library of frameworks, research, and industry insights.",
      links: [
        {
          label: "Frameworks We Use",
          href: "/resources#frameworks",
          description: "Strategic frameworks and methodologies"
        },
        {
          label: "Case Studies",
          href: "/resources/case-studies",
          description: "Real‑world success stories"
        },
        {
          label: "Tools",
          href: "/resources/tools",
          description: "Specialized analytical tools"
        },
        {
          label: "Research & Reports",
          href: "/resources/reports",
          description: "In‑depth analysis and insights"
        },
      ],
      highlight: {
        title: "Latest Framework",
        description: "Strategic Planning Guide",
        thumbnail: "/assets/thumbnail-header/report.webp",
        buttonText: "View Resources",
        link: "/resources"             // 👈 added
      }
    },

    // ----------------------------------------------------------------------------
    // WORK NAVIGATION
    // ----------------------------------------------------------------------------
    work: {
      title: "Our Engagement Portfolio",
      description: "Explore our work across industries and see the impact we've delivered.",
      links: [
        {
          label: "Work on Engagement",
          href: "/work#engagement",
          description: "Combined engagement approaches"
        },
        {
          label: "Communication & Guidance",
          href: "/work#communication",
          description: "Strategic communication services"
        },
        {
          label: "Work by Sector",
          href: "/work#by-sector",
          description: "Industry-specific solutions"
        },
        {
          label: "Storytelling & Presentations",
          href: "/work#storytelling",
          description: "Narrative development and delivery"
        },
      ],
      highlight: {
        title: "Featured Work",
        description: "Recent client success",
        thumbnail: "/assets/thumbnail-header/our team.webp",
        buttonText: "View Portfolio",
        link: "/work"                  // 👈 added
      }
    },

    // ----------------------------------------------------------------------------
    // SERVICES NAVIGATION
    // ----------------------------------------------------------------------------
    services: {
      title: "Our Service Offerings",
      description: "Comprehensive solutions tailored to drive your business forward.",
      links: [
        {
          label: "Know What’s Really Going On",
          href: "/services/business-diagnostic-direction",
          description: "Business Diagnostic & Direction"
        },
        {
          label: "Is Your Idea Worth Pursuing ?",
          href: "/services/idea-to-validation",
          description: "Idea‑to‑Validation"
        },
        {
          label: "Make Customers Actually Want Your Product",
          href: "/services/product-market-fit-clarity",
          description: "Product‑Market Fit Clarity"
        },
        {
          label: "Stop Random Sales, Start Repeatable Growth",
          href: "/services/go-to-market-strategy",
          description: "Go‑To‑Market Strategy"
        },
        {
          label: "Stop Being the Bottleneck",
          href: "/services/operations-scalability",
          description: "Operations & Scalability"
        },
        {
          label: "Raise Capital with Confidence",
          href: "/services/fundraising-readiness",
          description: "Fundraising Readiness"
        },
        {
          label: "Survive & Recover Now",
          href: "/services/turnaround-stabilisation",
          description: "Turnaround & Stabilisation"
        },
        {
          label: "Scale Without Breaking",
          href: "/services/scale-expansion-strategy",
          description: "Scale & Expansion Strategy"
        },
      ],
      highlight: {
        title: "Popular Service",
        description: "Clarity Reset Program",
        thumbnail: "/assets/thumbnail-header/happy cliet.webp",
        buttonText: "Explore Services",
        link: "/services"              // 👈 added
      }
    },
  };

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handles mouse enter event on desktop navigation items.
   * Only activates on desktop screens (width >= 1024px) to avoid interference with touch devices.
   * Tablets (768px–1023px) are treated the same as mobile — no hover mega menu.
   * Sets the activeMenu state to the hovered menu, triggering the mega menu dropdown.
   */
  const handleMouseEnter = (menu: keyof typeof megaMenuContent) => {
    if (window.innerWidth >= 1024) {
      setActiveMenu(menu);
    }
  };

  /**
   * Handles mouse leave event to close the mega menu on desktop.
   * Only triggers on desktop (>= 1024px), setting activeMenu back to null.
   * This is attached to the nav container and also to the dropdown itself to keep it open when interacting.
   */
  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setActiveMenu(null);
    }
  };

  /**
   * Toggles submenu visibility in mobile/tablet view.
   * Works like an accordion: if the same menu is clicked, it closes; otherwise it opens the new menu.
   * Used for the mobile/tablet dropdown (hamburger menu) where each top-level item expands to show its links.
   */
  const toggleMobileSubmenu = (menu: keyof typeof megaMenuContent) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  return (
    <>
      {/* ========================================================================== */}
      {/* CURVED TAB STYLING */}
      {/* ========================================================================== */}
      {/* 
        This <style jsx> block adds scoped CSS for the curved effect on the active navigation tab.
        It creates two pseudo-elements (::before and ::after) that draw semi‑circles to simulate 
        a smooth transition from the white active tab to the blue header background.
        The effect is applied only to the element with class "active-tab-curved".
      */}
      <style>{`
        .active-tab-curved {
          position: relative;
          border-radius: 8px 8px 0 0;
        }
        
        /* Left curve: a radial gradient positioned at the top‑left corner */
        .active-tab-curved::before {
          content: '';
          position: absolute;
          left: -8px;
          bottom: 0;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at 0 0, transparent 8px, white 8px);
        }
        
        /* Right curve: similar but at the top‑right corner */
        .active-tab-curved::after {
          content: '';
          position: absolute;
          right: -8px;
          bottom: 0;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at 100% 0, transparent 8px, white 8px);
        }
      `}</style>

      {/* ========================================================================== */}
      {/* HEADER CONTAINER */}
      {/* ========================================================================== */}
      {/* 
        Sticky header with a dark blue background (#002855). 
        z-50 ensures it stays above other content. 
        The nav element has a max width and centered margins.
        onMouseLeave is attached here to close the mega menu when the mouse leaves the entire navigation area.
      */}
      <header className="sticky top-0 z-50 bg-[#002855]">
        <nav
          className="max-w-[1400px] mx-auto px-4 lg:px-8 relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* ====================================================================== */}
          {/* TOP BAR - Logo, Navigation, CTA Button */}
          {/* ====================================================================== */}
          {/* 
            Flex container that holds the logo, desktop nav links, desktop CTA, and mobile/tablet hamburger.
            h-16 on mobile/tablet, h-20 on large screens and up. 
            relative z-20 ensures it stays above the dropdown when active.
          */}
          <div className="flex items-center justify-between h-16 lg:h-20 relative z-20">

            {/* ---------------------------------------------------------------------- */}
            {/* LOGO SECTION */}
            {/* ---------------------------------------------------------------------- */}
            {/* 
              Link wrapping the logo and company name. group class enables hover effects on children.
              The image uses object-contain to maintain aspect ratio.
            */}
            <a href="/" className="flex items-center space-x-2 lg:space-x-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
                <img
                  src="/assets/brand/Sarsen-White.svg"
                  alt="Sarsen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-white">
                <div className="text-lg lg:text-xl font-bold ">Sarsen</div>
                <div className="text-xs lg:text-sm  ">& Company</div>
              </div>
            </a>

            {/* ---------------------------------------------------------------------- */}
            {/* DESKTOP NAVIGATION MENU */}
            {/* ---------------------------------------------------------------------- */}
            {/* 
              Hidden on mobile and tablet (hidden lg:flex). Horizontal list of navigation items.
              ml-16 adds left margin to space from logo.
              Each item is a link that also handles hover to show the mega menu.
              The active item gets a white background and the curved class; it also has a larger bottom padding
              to overlap the dropdown, creating a seamless connection.
              The style prop dynamically adjusts marginBottom and zIndex to make the active tab appear 
              attached to the dropdown.
            */}
            <div className="hidden lg:flex items-center space-x-2 ml-16 relative z-20">
              {Object.keys(megaMenuContent).map((menu) => (
                <a
                  key={menu}
                  href={`/${menu}`}
                  className={`px-5 font-medium relative ${activeMenu === menu
                    ? 'text-[#002855] bg-white pt-3 pb-6 active-tab-curved'
                    : 'text-white hover:text-[#002855] py-3'
                    }`}
                  onMouseEnter={() => handleMouseEnter(menu as keyof typeof megaMenuContent)}
                  style={{
                    marginBottom: activeMenu === menu ? '-1.25rem' : '0', // Pulls the tab down to overlap dropdown
                    zIndex: activeMenu === menu ? 30 : 20,               // Higher z-index when active to stay above dropdown border
                    transition: 'none',                                   // No transition to avoid flicker on hover
                    color: activeMenu === menu ? '#002855' : undefined
                  }}
                >
                  {/* Capitalize first letter of menu name */}
                  {menu.charAt(0).toUpperCase() + menu.slice(1)}
                </a>
              ))}
            </div>

            {/* ---------------------------------------------------------------------- */}
            {/* CONTACT US BUTTON - Desktop Only */}
            {/* ---------------------------------------------------------------------- */}
            {/* 
              Visible only on desktop (lg and above). A white button with hover effect.
              shadow-lg adds depth.
            */}
            <a
              href="/contact"
              className="hidden lg:block px-6 lg:px-8 py-2 lg:py-3 bg-white text-[#002855] font-semibold rounded-md hover:bg-blue-50 transition-colors shadow-lg text-sm lg:text-base"
              style={{ color: '#002855' }}
            >
              Contact Us
            </a>

            {/* ---------------------------------------------------------------------- */}
            {/* MOBILE & TABLET HAMBURGER MENU TOGGLE */}
            {/* ---------------------------------------------------------------------- */}
            {/* 
              Button that toggles mobileMenuOpen state. Visible on mobile and tablet (lg:hidden).
              Displays an X icon when menu is open, hamburger icon when closed.
              Uses SVG icons from Heroicons style.
            */}
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
          {/* DESKTOP MEGA MENU DROPDOWN */}
          {/* ====================================================================== */}
          {/* 
            Only rendered when activeMenu is not null (i.e., a menu is hovered).
            Hidden on mobile and tablet (hidden lg:block). Positioned absolutely below the top bar (top: 100%).
            animate-fadeIn is a custom Tailwind animation (likely defined elsewhere) for a smooth fade.
            onMouseEnter ensures the dropdown stays open when mouse moves from tab into dropdown.
            onMouseLeave closes it when mouse leaves the dropdown area.
          */}
          {activeMenu && megaMenuContent[activeMenu] && (
            <div
              className="hidden lg:block absolute left-8 right-8 z-10 animate-fadeIn"
              style={{ top: '100%' }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-white shadow-2xl rounded-md overflow-hidden">
                {/* Three-column layout: description, links, highlight card */}
                <div className="flex min-h-[320px]">

                  {/* ------------------------------------------------------------------ */}
                  {/* SECTION 1: Title & Description (30% width) */}
                  {/* ------------------------------------------------------------------ */}
                  {/* 
                    Light blue gradient background, vertical border on the right.
                    Displays the title and description of the selected mega menu.
                  */}
                  <div className="w-[30%] bg-gradient-to-br from-blue-50 to-white p-8 border-r border-gray-200">
                    <h3 className="text-2xl font-bold text-[#002855] mb-3">
                      {megaMenuContent[activeMenu].title}
                    </h3>
                    <p className="text-gray-600 text-md ">
                      {megaMenuContent[activeMenu].description}
                    </p>
                  </div>

                  {/* ------------------------------------------------------------------ */}
                  {/* SECTION 2: Navigation Links (50% width) */}
                  {/* ------------------------------------------------------------------ */}
                  {/* 
                    Displays up to 7 links from the current menu's "links" array.
                    Each link uses anchor links (#section) for same‑page navigation.
                    The href includes the base path plus the anchor (e.g., "/about#how-we-think").
                    Hover effects change text color and group‑hover affects children.
                  */}
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
                            <span className="text-gray-500 text-sm mt-0.5 group-hover:text-gray-700 ">
                              {link.description}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* ------------------------------------------------------------------ */}
                  {/* SECTION 3: Highlight Card (20% width) */}
                  {/* ------------------------------------------------------------------ */}
                  {/* 
                    Featured content card with a thumbnail image, title, description, and a CTA button.
                    The button is a full-width blue CTA.
                    A footer note indicates that resources are downloadable.
                  */}
                  <div className="w-[20%] p-8 bg-gradient-to-br from-gray-50 to-white">
                    <div className="h-full flex flex-col">
                      <div className="mb-4 overflow-hidden rounded-md border border-gray-200">
                        <div className="aspect-video relative overflow-hidden bg-gray-100">

                          <img
                            key={activeMenu}
                            src={megaMenuContent[activeMenu].highlight.thumbnail}
                            alt="Preview"
                            className="w-full h-full object-cover transition-opacity duration-300"
                          />

                          {/* Optional dark overlay */}
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

                      {/* changed from <button> to <a> with the new link */}
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
          {/* MOBILE & TABLET MENU */}
          {/* ====================================================================== */}
          {/* 
            Full‑width dropdown menu for mobile and tablet devices. Rendered when mobileMenuOpen is true.
            Positioned absolutely below the header (top-full). 
            max‑height and overflow‑auto allow scrolling if content exceeds viewport height.
            Uses an accordion pattern: each top‑level item can be expanded to show its submenu.
          */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-full bg-white shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-4 py-4 space-y-2">
                {/* Loop through all menu items to create accordion sections */}
                {Object.keys(megaMenuContent).map((menu) => (
                  <div key={menu} className="border-b border-gray-200 pb-2">
                    {/* Accordion header (clickable) */}
                    <button
                      className="w-full flex items-center justify-between py-3 text-blue-600 font-semibold hover:text-blue-600 transition-colors"
                      onClick={() => toggleMobileSubmenu(menu as keyof typeof megaMenuContent)}
                    >
                      <span className="capitalize">{menu}</span>
                      {/* Chevron icon that rotates when submenu is open */}
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileSubmenu === menu ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Accordion panel (shown only when this menu's submenu is active) */}
                    {mobileSubmenu === menu && (
                      <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-md">
                        {/* Description of the menu */}
                        <p className="text-sm text-gray-600 mb-3">
                          {megaMenuContent[menu].description}
                        </p>

                        {/* Links list (same as desktop, limited to 7) */}
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
                                <span className="text-gray-500 text-xs mt-0.5 group-hover:text-gray-700 ">
                                  {link.description}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* Mobile & tablet version of the highlight card */}
                        {/* Uses a horizontal layout with the actual thumbnail image, title, description, and button */}
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-md border border-blue-100">
                          <div className="flex items-start space-x-3">
                            {/* Thumbnail image replacing the previous SVG icon placeholder */}
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
                              {/* changed from <button> to <a> with the new link */}
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

                {/* Mobile & Tablet Contact CTA Button */}
                {/* A prominent blue button at the bottom of the mobile/tablet menu */}
                <a
                  href="/contact"
                  className="block w-full mt-4 px-6 py-3 bg-[#002855] text-blue-400
                   font-semibold rounded-md hover:bg-blue-900 transition-colors text-center"
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