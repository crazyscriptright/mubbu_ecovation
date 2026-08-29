"use client";

import { useEffect, useRef } from "react";
import { WhoWeAreContent } from "./WhoWeAreContent";
import { PurposeStatement } from "./PurposeStatement";

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskRef.current;
    const img = imageRef.current;
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
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

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

  useEffect(() => {
    const mobileWrap = mobileWrapRef.current;
    if (!mobileWrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mobileWrap.style.clipPath = "inset(0% 0% 0% 0%)";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mobileWrap.style.clipPath = "inset(0% 0% 0% 0%)";
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(mobileWrap);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="who-we-are-heading"
      style={{
        background: "#F2EFE9",
        color: "#1A1A1A",
      }}
      className="relative"
    >
      <div
        className="hidden lg:flex min-h-[165vh] w-full"
        style={{
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "42%",
            position: "sticky",
            top: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px 4vw 60px 6vw",
          }}
        >
          <WhoWeAreContent />
          <PurposeStatement />
        </div>

        <div
          style={{
            width: "58%",
            position: "sticky",
            top: "120px",
            height: "calc(100vh - 160px)",
            minHeight: "520px",
            paddingRight: "5vw",
            paddingLeft: "2vw",
          }}
        >
          <div
            ref={maskRef}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              clipPath: "inset(12% 0% 12% 0%)",
              transform: "translateY(10%)",
              willChange: "transform, clip-path",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src="/Ecovation Images/hero/whoweare.png"
              alt="Ecovation interior design project — sophisticated living space with warm neutral palette, natural light, and premium materials"
              style={{
                /* 9:16 portrait — natural width fills container, height is auto so full image
                   renders. Container overflow:hidden clips it; translateY scrolls through
                   the image without any cropping. */
                width: "100%",
                height: "auto",
                display: "block",
                transform: "translateY(-4%) scale(1.02)",
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="lg:hidden"
        style={{
          padding: "60px 24px",
        }}
      >
        <WhoWeAreContent />
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "rgba(26,26,26,0.2)",
            margin: "36px 0",
          }}
          aria-hidden="true"
        />
        <PurposeStatement />
        <div
          ref={mobileWrapRef}
          style={{
            marginTop: "40px",
            overflow: "hidden",
            clipPath: "inset(8% 0 8% 0)",
            transition: "clip-path 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Ecovation Images/Residential/resident1.jpg"
            alt="Ecovation interior design project — sophisticated living space with warm neutral palette, natural light, and premium materials"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "480px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
}