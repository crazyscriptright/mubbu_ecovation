"use client";

export function HeroContent() {
  return (
    <div
      className="absolute left-0 bottom-0 flex max-w-[650px] flex-col gap-6"
      style={{
        left: "var(--hero-content-left)",
        bottom: "var(--hero-content-bottom)",
        maxWidth: "var(--hero-content-max-width)",
      } as React.CSSProperties}
    >
      {/* Eyebrow */}
      <p
        className="reveal font-body text-[10px] font-medium uppercase tracking-[0.25em] text-cream/65"
        style={{ "--reveal-y": "30px" } as React.CSSProperties}
      >
        WE DON&apos;T JUST DESIGN
      </p>

      {/* Heading — three lines */}
      <h1
        className="reveal font-display text-cream"
        style={{
          fontSize: "clamp(56px, 7.2vw, 86px)",
          lineHeight: "0.96",
          "--reveal-y": "30px",
          "--reveal-delay": "120ms",
        } as React.CSSProperties}
      >
        <span className="block">WE DESIGN</span>
        <span className="block" style={{ animationDelay: "120ms" as React.CSSProperties["animationDelay"] }}>
          SPACES THAT
        </span>
        <span className="block" style={{ animationDelay: "240ms" as React.CSSProperties["animationDelay"] }}>
          DEFINE LIVING.
        </span>
      </h1>

      {/* Description — three lines */}
      <p
        className="reveal font-body text-[11px] leading-[1.8] tracking-[0.16em] text-cream/70"
        style={{
          "--reveal-y": "20px",
          "--reveal-delay": "360ms",
        } as React.CSSProperties}
      >
        THOUGHTFUL DESIGN.{" "}
        <br />
        TIMELESS SPACES.{" "}
        <br />
        INSPIRED LIVING.
      </p>

      {/* CTA — editorial text link with arrow */}
      <div
        className="reveal flex items-center gap-2"
        style={{
          "--reveal-y": "20px",
          "--reveal-delay": "480ms",
        } as React.CSSProperties}
      >
        <a
          href="/projects"
          className="link-underline link-underline--narrow font-body text-[11px] font-medium uppercase tracking-[0.06em] text-cream group"
        >
          EXPLORE OUR WORK
          <span
            className="inline-block transition-transform duration-300 group-hover:translate-x-[8px]"
            aria-hidden="true"
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
}