import Image from "next/image";

export function HeroVisual() {
  return (
    <>
      {/* Full-bleed background image via CSS classes (see globals.css .hero-bg) */}
      <div
        className="absolute inset-0 hero-bg"
        aria-hidden="true"
      />

      {/* Directional overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
    </>
  );
}