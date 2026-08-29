"use client";

import { useEffect, useRef, useState } from "react";

export function WhoWeAreImage() {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(1.06)",
    transition: prefersReducedMotion ? "none" : "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: prefersReducedMotion ? "0ms" : "0.2s",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: prefersReducedMotion ? "none" : "transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div
      ref={imgRef}
      style={containerStyle}
      className="who-we-are-image-wrapper"
      onMouseEnter={(e) => {
        if (!prefersReducedMotion && e.currentTarget instanceof HTMLElement) {
          const img = e.currentTarget.querySelector("img") as HTMLImageElement;
          if (img) img.style.transform = "scale(1.02)";
        }
      }}
      onMouseLeave={(e) => {
        if (!prefersReducedMotion && e.currentTarget instanceof HTMLElement) {
          const img = e.currentTarget.querySelector("img") as HTMLImageElement;
          if (img) img.style.transform = "scale(1)";
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Ecovation Images/Residential/resident1.jpg"
        alt="Ecovation interior design project — sophisticated living space with warm neutral palette, natural light, and premium materials"
        style={imageStyle}
      />
    </div>
  );
}