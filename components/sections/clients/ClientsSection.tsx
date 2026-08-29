"use client";

/* ------------------------------------------------------------------
   ClientsSection — seamless logo marquee + compressed trust metrics
   Light morphism section — unified charcoal brand marks on cream
   ------------------------------------------------------------------ */

// Logo images available in /public/Ecovation Images/logos/
const LOGOS = [
  { name: "ADT",       src: "/Ecovation Images/logos/adt.png"       },
  { name: "Alphadyne", src: "/Ecovation Images/logos/alphadyne.jpeg" },
  { name: "Enfinity",  src: "/Ecovation Images/logos/enfinity.jpg"   },
  { name: "Gen",       src: "/Ecovation Images/logos/gen.jpeg"       },
  { name: "Sears",     src: "/Ecovation Images/logos/sears.jpeg"     },
  { name: "UKG",       src: "/Ecovation Images/logos/ukg.jpeg"       },
] as const;

// Repeat 4× for seamless infinite loop at any viewport
const ROW1 = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
const ROW2 = [...[...LOGOS].reverse(), ...[...LOGOS].reverse(), ...[...LOGOS].reverse(), ...[...LOGOS].reverse()];

export function ClientsSection() {
  return (
    <section
      aria-label="Client logos and trust metrics"
      style={{
        background: "var(--cream)",
        color: "var(--charcoal)",
      }}
      className="overflow-hidden"
    >
      {/* Top rule — charcoal on cream */}
      <div style={{ borderTop: "1px solid rgba(26,26,26,0.12)", margin: "0 5vw" }} />

      {/* ── ROW 1 — LEFT → RIGHT ── */}
      <div className="marquee-fade" style={{ overflow: "hidden", padding: "20px 0 0" }}>
        <div className="marquee-track--ltr">
          {ROW1.map((logo, i) => (
            <LogoCell key={`r1-${i}`} logo={logo} />
          ))}
        </div>
      </div>

      {/* ── ROW 2 — RIGHT → LEFT ── */}
      <div className="marquee-fade" style={{ overflow: "hidden", padding: "12px 0 20px" }}>
        <div className="marquee-track--rtl">
          {ROW2.map((logo, i) => (
            <LogoCell key={`r2-${i}`} logo={logo} />
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{ borderTop: "1px solid rgba(26,26,26,0.12)", margin: "0 5vw" }} />

      {/* ── TRUST METRICS — compressed, no cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
          alignItems: "center",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "28px 24px 36px",
          gap: 0,
        }}
      >
        <StatCell number="38+" label="Years\nExperience" />
        <div style={{ width: "1px", height: "70px", background: "rgba(26,26,26,0.15)", justifySelf: "center" }} />
        <StatCell number="200+" label="Projects\nDelivered" />
        <div style={{ width: "1px", height: "70px", background: "rgba(26,26,26,0.15)", justifySelf: "center" }} />
        <StatCell number="73+" label="Panel Color\nOptions" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Logo cell — marquee item, 24px side padding (48px gap)
   Duotone: high-contrast B&W → mix-blend-mode: multiply
   Renders ALL formats as pure charcoal marks on cream bg
   ------------------------------------------------------------------ */
function LogoCell({ logo }: { logo: { name: string; src: string } }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "200px",
        flexShrink: 0,
        padding: "0 24px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        style={{
          height: "40px",
          width: "auto",
          maxWidth: "120px",
          objectFit: "contain",
          /* Duotone chain: force high-contrast B&W, then multiply on cream bg
             White → transparent (shows cream), Black → charcoal */
          filter: "grayscale(100%) contrast(250%) brightness(0.12)",
          mixBlendMode: "multiply",
          opacity: 0.5,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          display: "block",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.opacity = "1";
          el.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.opacity = "0.5";
          el.style.transform = "scale(1)";
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   Stat cell — large serif number + walnut rule + small label
   Charcoal text on cream bg
   ------------------------------------------------------------------ */
function StatCell({ number, label }: { number: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 12px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(52px, 6vw, 80px)",
          fontWeight: 400,
          color: "var(--charcoal)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {number}
      </span>

      <div
        style={{
          width: "24px",
          height: "1px",
          background: "var(--walnut)",
          margin: "14px auto 10px",
        }}
      />

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: "rgba(26,26,26,0.55)",
          textTransform: "uppercase",
          fontWeight: 500,
          lineHeight: 1.7,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </span>
    </div>
  );
}