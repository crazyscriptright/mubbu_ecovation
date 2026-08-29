"use client";

import { useEffect, useRef, useState } from "react";

export function WhoWeAreContent() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 500,
    color: "#68645E",
    marginBottom: "20px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: prefersReducedMotion ? "none" : "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const headlineStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(56px, 5.8vw, 92px)",
    fontWeight: 400,
    lineHeight: 0.94,
    letterSpacing: "-0.01em",
    color: "#1A1A1A",
    maxWidth: "700px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: prefersReducedMotion ? "none" : "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: prefersReducedMotion ? "0ms" : "0.1s",
  };

  const bodyStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "clamp(14px, 1.1vw, 15px)",
    lineHeight: 1.6,
    color: "#68645E",
    maxWidth: "440px",
    marginTop: "28px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: prefersReducedMotion ? "none" : "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: prefersReducedMotion ? "0ms" : "0.2s",
  };

  const dividerStyle: React.CSSProperties = {
    width: "100px",
    height: "1px",
    background: "rgba(26,26,26,0.25)",
    marginTop: "24px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(12px)",
    transition: prefersReducedMotion ? "none" : "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: prefersReducedMotion ? "0ms" : "0.3s",
  };

  return (
    <div ref={sectionRef} style={{ minHeight: "1px" }}>
      {/* Section Label */}
      <p style={labelStyle}>
        <span style={{ opacity: 0.6 }}>01 /</span> WHO WE ARE
      </p>

      {/* Main Headline */}
      <h2 style={headlineStyle}>
        WE CREATE SPACES<br />
        THAT FEEL LIKE<br />
        THEY BELONG.
      </h2>

      {/* Body Copy — single paragraph */}
      <p style={bodyStyle}>
        We believe interiors should reflect the people who live within them —
        every material, every line of light, every detail considered as one complete experience.
      </p>

      {/* Editorial Divider */}
      <div className="hidden lg:block" style={dividerStyle} aria-hidden="true" />
    </div>
  );
}