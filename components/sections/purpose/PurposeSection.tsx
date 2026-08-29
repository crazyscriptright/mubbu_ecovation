"use client";

import { useEffect, useRef, useState } from "react";

/* ─── SVG Icons — thin-line editorial style ─── */
function IconThoughtful() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4 C10 4, 5 9, 5 15 C5 19, 7 22, 11 24 L11 27 L21 27 L21 24 C25 22, 27 19, 27 15 C27 9, 22 4, 16 4Z" />
      <line x1="13" y1="27" x2="19" y2="27" />
      <line x1="13" y1="29" x2="19" y2="29" />
    </svg>
  );
}

function IconTimeless() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4 L22 4 L22 5 Q22 10, 16 14 Q10 10, 10 5 Z" />
      <path d="M10 28 L22 28 L22 27 Q22 22, 16 18 Q10 22, 10 27 Z" />
      <line x1="8" y1="4" x2="24" y2="4" />
      <line x1="8" y1="28" x2="24" y2="28" />
    </svg>
  );
}

function IconHuman() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="10" r="5" />
      <path d="M6 28 C6 22, 9 18, 16 18 C23 18, 26 22, 26 28" />
    </svg>
  );
}

function IconSustainable() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28 C16 28, 6 22, 6 13 C6 8, 10 5, 16 7 C22 5, 26 8, 26 13 C26 22, 16 28, 16 28Z" />
      <line x1="16" y1="28" x2="16" y2="14" />
      <path d="M16 18 C16 18, 20 15, 23 12" />
    </svg>
  );
}

const PILLARS = [
  {
    num: "01",
    Icon: IconThoughtful,
    title: "Thoughtful by Design",
    body: "We start with people, not trends. Every space is designed around lifestyle, needs, and purpose.",
  },
  {
    num: "02",
    Icon: IconTimeless,
    title: "Timeless in Essence",
    body: "We embrace enduring materials, refined palettes, and honest details that stand the test of time.",
  },
  {
    num: "03",
    Icon: IconHuman,
    title: "Human at Heart",
    body: "We create environments that nurture well-being, connection, and a sense of belonging.",
  },
  {
    num: "04",
    Icon: IconSustainable,
    title: "Sustainable in Mind",
    body: "We respect our planet by making responsible choices that create better spaces for generations.",
  },
];

function PillarCard({
  pillar,
  delay,
}: {
  pillar: (typeof PILLARS)[0];
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const rmo = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: rmo ? "none" : `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Number */}
      <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.18em", color: "#a89880", fontWeight: 500, marginBottom: "18px" }}>
        {pillar.num}
      </span>

      {/* Icon */}
      <div style={{ marginBottom: "16px", opacity: 0.85 }}>
        <pillar.Icon />
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 1.5vw, 22px)", fontWeight: 400, color: "#1a1a1a", marginBottom: "10px", lineHeight: 1.2 }}>
        {pillar.title}
      </h3>

      {/* Gold accent rule */}
      <div style={{ width: "28px", height: "1px", background: "#b89a6a", marginBottom: "14px" }} />

      {/* Body */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.75, color: "#6a6460", maxWidth: "260px" }}>
        {pillar.body}
      </p>
    </div>
  );
}

export function PurposeSection() {
  const [leftVisible, setLeftVisible] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const purposeSectionRef = useRef<HTMLElement>(null);
  const purposeMaskRef = useRef<HTMLDivElement>(null);
  const purposeImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLeftVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = purposeSectionRef.current;
    const mask = purposeMaskRef.current;
    const img = purposeImgRef.current;
    if (!section || !mask || !img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mask.style.clipPath = "inset(0% 0% 0% 0%)";
      mask.style.transform = "translateY(0%)";
      img.style.transform = "translateY(0%) scale(1.05)";
      return;
    }

    let frameId: number | null = null;

    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = rect.height + windowH;
      const currentScroll = windowH - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));

      const insetVertical = (1 - progress) * 12;
      const maskY = (1 - progress) * 10;
      const imgY = -4 + progress * 8;

      mask.style.clipPath = `inset(${insetVertical}% 0% ${insetVertical}% 0%)`;
      mask.style.transform = `translateY(${maskY}%)`;
      img.style.transform = `translateY(${imgY}%) scale(1.05)`;
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(() => {
          updateScrollProgress();
          frameId = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const rmo = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <section
        ref={purposeSectionRef}
        aria-label="Our purpose"
        style={{ background: "#F2EFE9", color: "#1a1a1a", overflow: "hidden" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            maxWidth: "100%",
          }}
          className="purpose-grid"
        >
          {/* ── LEFT ── eyebrow + heading + image ── */}
          <div
            ref={leftRef}
            style={{
              padding: "clamp(56px, 7vw, 96px) clamp(32px, 4vw, 72px) clamp(56px, 7vw, 96px) clamp(48px, 6vw, 96px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: "1px solid rgba(26,26,26,0.08)",
            }}
          >
            <div>
              {/* Eyebrow */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#a89880",
                  fontWeight: 500,
                  marginBottom: "12px",
                  opacity: leftVisible ? 1 : 0,
                  transition: rmo ? "none" : "opacity 0.7s ease",
                }}
              >
                OUR PURPOSE
              </p>

              {/* Eyebrow underline */}
              <div
                style={{
                  width: "36px",
                  height: "1px",
                  background: "rgba(26,26,26,0.25)",
                  marginBottom: "28px",
                  opacity: leftVisible ? 1 : 0,
                  transition: rmo ? "none" : "opacity 0.7s ease 0.1s",
                }}
                aria-hidden="true"
              />

              {/* Serif heading */}
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(42px, 4.8vw, 68px)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                  marginBottom: "clamp(32px, 4vw, 56px)",
                  opacity: leftVisible ? 1 : 0,
                  transform: leftVisible ? "translateY(0)" : "translateY(30px)",
                  transition: rmo ? "none" : "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Thoughtful.
                <br />
                Timeless.
                <br />
                Human.
              </h2>
            </div>

            {/* Interior photo — scroll-driven mask reveal & inner parallax.
                3:4 portrait: width:100% + height:auto renders the full image.
                Container overflow:hidden clips it; translateY scrolls through
                the image without any hard crop. */}
            <div
              ref={purposeMaskRef}
              style={{
                width: "100%",
                overflow: "hidden",
                clipPath: "inset(12% 0% 12% 0%)",
                transform: "translateY(10%)",
                willChange: "transform, clip-path",
                opacity: leftVisible ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={purposeImgRef}
                src="/Ecovation Images/hero/ourpurpose.png"
                alt="Ecovation luxury interior — dark sideboard with architectural vase and warm ambient light"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transform: "translateY(-4%) scale(1.02)",
                  willChange: "transform",
                }}
              />
            </div>
          </div>

          {/* ── RIGHT ── 2×2 pillars grid ── */}
          <div
            style={{
              padding: "clamp(56px, 7vw, 96px) clamp(32px, 4vw, 72px)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: "clamp(40px, 5vw, 64px) clamp(24px, 3vw, 48px)",
              alignContent: "center",
            }}
            className="pillars-grid"
          >
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.num} pillar={pillar} delay={100 + i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM — full-width dark quote band
          ══════════════════════════════════════════ */}
      <QuoteBand />
    </>
  );
}

function QuoteBand() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const rmo = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section
      ref={ref}
      aria-label="Design philosophy quote"
      style={{
        background: "#141414",
        padding: "clamp(56px, 7vw, 90px) clamp(32px, 6vw, 100px)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Left accent vertical line */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          left: "10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "64px",
          background: "rgba(255,255,255,0.18)",
          opacity: visible ? 1 : 0,
          transition: rmo ? "none" : "opacity 0.8s ease",
        }}
        aria-hidden="true"
      />

      {/* Center quote + signature block */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
        }}
      >
        <blockquote
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3vw, 42px)",
            fontWeight: 400,
            color: "#f0ebe0",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            margin: "0 0 24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: rmo ? "none" : "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          “Great design enhances the way you live,
          <br />
          not just the way it looks.”
        </blockquote>

        {/* SVG Signature */}
        <div
          style={{
            opacity: visible ? 0.85 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: rmo ? "none" : "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          <svg width="90" height="40" viewBox="0 0 90 40" fill="none" stroke="#f0ebe0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 28 C18 10, 24 35, 32 15 C38 28, 44 20, 52 24 C60 18, 68 25, 78 20" />
            <path d="M40 30 L80 30" strokeOpacity="0.5" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Right accent vertical line */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          right: "10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1px",
          height: "64px",
          background: "rgba(255,255,255,0.18)",
          opacity: visible ? 1 : 0,
          transition: rmo ? "none" : "opacity 0.8s ease",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
