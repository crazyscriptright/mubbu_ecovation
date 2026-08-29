"use client";

import { useEffect, useRef, useState } from "react";

export function PurposeStatement() {
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
      { threshold: 0.1, rootMargin: "0px 0px -150px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "10px",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 500,
    color: "#68645E",
    marginBottom: "18px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(15px)",
    transition: prefersReducedMotion ? "none" : "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: prefersReducedMotion ? "0ms" : "0.1s",
  };

  const statementStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(32px, 3.5vw, 42px)",
    fontWeight: 400,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    color: "#1A1A1A",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: prefersReducedMotion ? "none" : "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: prefersReducedMotion ? "0ms" : "0.2s",
  };

  return (
    <div ref={sectionRef} style={{ marginTop: "28px" }}>
      <p style={labelStyle}>OUR PURPOSE</p>
      <p style={statementStyle}>
        THOUGHTFUL.<br />
        TIMELESS.<br />
        HUMAN.
      </p>
    </div>
  );
}