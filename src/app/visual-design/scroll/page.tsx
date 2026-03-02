"use client";

/* ======================================================
   IMPORTS
   ====================================================== */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Register GSAP plugin */
gsap.registerPlugin(ScrollTrigger);

/* ======================================================
   MAIN COMPONENT
   ====================================================== */

export default function ScrollDemoPage() {
  /* Reference to main pinned section */
  const containerRef = useRef<HTMLDivElement>(null);

  /* Track which stage is active (for UI + logic) */
  const [activeStage, setActiveStage] = useState(1);

  /* For typing effect */
  const [typedText, setTypedText] = useState("");

  /* Text to type */
  const fullText =
    "We convert strategy into measurable business outcomes.";

  /* ======================================================
     TYPING EFFECT LOGIC
     ====================================================== */

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));

      index++;

      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  /* ======================================================
     GSAP SCROLL + ANIMATION SETUP
     ====================================================== */

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Main timeline controlled by scroll */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-section",
          start: "top top",        // Start when section hits top
          end: "+=3500",           // How long scroll is locked
          scrub: true,            // Sync scroll with animation
          pin: true,              // Freeze section
          anticipatePin: 1,
        },
      });

      /* ==================================================
         STAGE 1 → STAGE 2
         ================================================== */

      timeline

        /* Fade + shrink panel 1 */
        .to(".panel-1", {
          opacity: 0,
          scale: 0.85,
          duration: 1,
          onStart: () => setActiveStage(2),
        })

        /* Bring panel 2 */
        .fromTo(
          ".panel-2",
          { opacity: 0, scale: 1.2 },
          { opacity: 1, scale: 1, duration: 1 }
        );

      /* ==================================================
         STAGE 2 → STAGE 3
         ================================================== */

      timeline

        .to(".panel-2", {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          onStart: () => setActiveStage(3),
        })

        .fromTo(
          ".panel-3",
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1 }
        );

      /* ==================================================
         ROTATING RING (LOOPS FOREVER)
         ================================================== */

      gsap.to(".rotating-ring", {
        rotation: 360,
        repeat: -1,     // Infinite
        duration: 12,
        ease: "linear",
      });

      /* ==================================================
         FLOATING DOTS
         ================================================== */

      gsap.to(".floating-dot", {
        y: -30,
        repeat: -1,
        yoyo: true,
        duration: 2,
        stagger: 0.2,
        ease: "power1.inOut",
      });

    }, containerRef);

    return () => ctx.revert();

  }, []);

  /* ======================================================
     RENDER
     ====================================================== */

  return (
    <div className="bg-gray-100 overflow-x-hidden">

      {/* ===============================================
          NORMAL SCROLL BEFORE
         =============================================== */}

      <section className="h-screen flex items-center justify-center bg-white">
        <h1 className="text-4xl font-bold text-gray-800">
          Scroll Down to Start
        </h1>
      </section>

      {/* ===============================================
          PINNED SCROLL SECTION
         =============================================== */}

      <section
        ref={containerRef}
        className="scroll-section relative h-screen bg-black text-white overflow-hidden"
      >

        {/* ===========================================
            TOP STATUS BAR
           =========================================== */}

        <div className="absolute top-4 left-4 z-50 text-sm bg-white/10 px-3 py-1 rounded">
          Stage: {activeStage}
        </div>

        {/* ===========================================
            SCROLL PROGRESS BAR
           =========================================== */}

        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
          <div
            className="h-full bg-green-500 transition-all"
            style={{
              width: `${(activeStage / 3) * 100}%`,
            }}
          />
        </div>

        {/* ===========================================
            ROTATING RING
           =========================================== */}

        <div className="rotating-ring absolute inset-0 flex items-center justify-center pointer-events-none">

          <div className="w-[420px] h-[420px] border border-dashed border-gray-600 rounded-full" />

        </div>

        {/* ===========================================
            FLOATING DOTS
           =========================================== */}

        <div className="absolute inset-0 pointer-events-none">

          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-dot absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${10 + i * 7}%`,
                top: `${20 + (i % 4) * 15}%`,
              }}
            />
          ))}

        </div>

        {/* ===========================================
            PANEL 1
           =========================================== */}

        <div className="panel-1 absolute inset-0 flex items-center justify-center">

          <div className="text-center max-w-xl">

            <h2 className="text-5xl font-bold mb-4">
              Strategy Discovery
            </h2>

            <p className="text-gray-300 mb-6">
              Market, competitors, positioning
            </p>

            {/* Typing Effect */}
            <p className="text-green-400 font-mono">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>

          </div>
        </div>

        {/* ===========================================
            PANEL 2
           =========================================== */}

        <div className="panel-2 absolute inset-0 flex items-center justify-center opacity-0">

          <div className="text-center max-w-xl">

            <h2 className="text-5xl font-bold mb-4">
              Quantitative Modeling
            </h2>

            <p className="text-gray-300 mb-6">
              Financial, risk, growth simulations
            </p>

            {/* Animated Cards */}
            <div className="grid grid-cols-3 gap-4">

              {["ROI", "CAC", "LTV"].map((item) => (
                <div
                  key={item}
                  className="bg-white/10 p-4 rounded-lg backdrop-blur"
                >
                  <h3 className="font-semibold">{item}</h3>
                  <p className="text-sm text-gray-400">
                    Optimized
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>

        {/* ===========================================
            PANEL 3
           =========================================== */}

        <div className="panel-3 absolute inset-0 flex items-center justify-center opacity-0">

          <div className="text-center max-w-xl">

            <h2 className="text-5xl font-bold mb-4">
              Execution Roadmap
            </h2>

            <p className="text-gray-300 mb-6">
              Clear milestones and KPIs
            </p>

            {/* Timeline */}
            <div className="space-y-3 text-left">

              {["Month 1: Setup", "Month 2: Scale", "Month 3: Optimize"].map(
                (step, i) => (
                  <div
                    key={i}
                    className="bg-white/10 px-4 py-2 rounded"
                  >
                    {step}
                  </div>
                )
              )}

            </div>

          </div>
        </div>

      </section>

      {/* ===============================================
          NORMAL SCROLL AFTER
         =============================================== */}

      <section className="h-screen flex items-center justify-center bg-white">

        <h1 className="text-4xl font-bold text-gray-800">
          Normal Scrolling Resumes
        </h1>

      </section>

    </div>
  );
}