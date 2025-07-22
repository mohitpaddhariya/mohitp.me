"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const EXPERTISE_LIST = [
  "Fullstack & Gen AI Developer",
  "Creating Fullstack Gen AI Solutions",
  "Architecting Scalable Web Applications",
];

export default function MainLoader() {
  // Core state for visibility and progress
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(false);

  // State for cycling expertise text
  const [expertiseIndex, setExpertiseIndex] = useState(0);

  // Refs for elements and GSAP animations
  const textContainerRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLParagraphElement>(null);
  // A ref for the GSAP tween allows us to control it later
  const progressTween = useRef<gsap.core.Tween | null>(null);

  // Effect for all initial animations and load tracking
  useEffect(() => {
    // 1. Animate the text into view
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    // 2. Start the "fake" progress animation that moves towards 90%
    const progressProxy = { value: 0 };
    progressTween.current = gsap.to(progressProxy, {
      value: 90,
      duration: 10, // A long duration to make it feel like it's loading
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(progressProxy.value);
      },
    });

    // 3. Set up the listener for when the page is ACTUALLY loaded
    const handleLoad = () => {
      setPageLoaded(true);
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      // Clean up GSAP animations on unmount
      progressTween.current?.kill();
    };
  }, []);

  // Effect that runs when the page is confirmed to be loaded
  useEffect(() => {
    if (pageLoaded) {
      // 1. Stop the old progress animation
      if (progressTween.current) {
        progressTween.current.kill();
      }

      // 2. Animate the progress from its current value to 100%
      const progressProxy = { value: progress };
      gsap.to(progressProxy, {
        value: 100,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(progressProxy.value);
        },
        // 3. When the bar hits 100%, start the fade-out process
        onComplete: () => {
          setTimeout(() => setFade(true), 400); // Wait a moment
          setTimeout(() => setShow(false), 1000); // 400ms delay + 600ms transition
        },
      });
    }
  }, [pageLoaded, progress]); // Depend on 'progress' to get the current value correctly

  // Effect for cycling expertise text (starts immediately)
  useEffect(() => {
    const interval = setInterval(() => {
      setExpertiseIndex((prevIndex) => (prevIndex + 1) % EXPERTISE_LIST.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--theme-bg)",
        transition: "opacity 0.6s cubic-bezier(.4,0,.2,1)",
        opacity: fade ? 0 : 1,
        pointerEvents: fade ? "none" : "auto",
      }}
    >
      {/* Container for the text elements for a unified animation */}
      <div ref={textContainerRef} style={{ textAlign: "center", opacity: 0 }}>
        <h1
          className="font-bogue-bold"
          style={{
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            color: "var(--theme-text)",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          Mohit Paddhariya
        </h1>
        <p
          ref={expertiseRef}
          key={expertiseIndex}
          className="font-saprona-light"
          style={{
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            color: "var(--theme-alt-text)",
            margin: "0.5rem 0 0 0",
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {EXPERTISE_LIST[expertiseIndex]}
        </p>
      </div>

      {/* Progress Bar and Percentage Counter */}
      <div style={{ position: "absolute", bottom: "30%", width: "250px", maxWidth: "80%" }}>
        <div style={{ width: "100%", backgroundColor: "var(--theme-text)", opacity: 0.1, height: "2px", borderRadius: "2px" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "var(--theme-text)",
                transform: `scaleX(${progress / 100})`,
                transformOrigin: "left",
                transition: "transform 0.2s linear", // Smoothly update the bar
                borderRadius: "2px",
              }}
            />
        </div>
        <p className="font-saprona-regular" style={{color: "var(--theme-alt-text)", fontSize: "0.875rem", textAlign: "center", marginTop: "1rem"}}>
            Loading... {Math.round(progress)}%
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}