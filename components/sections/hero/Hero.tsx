import { HeroVisual } from "./HeroVisual";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[720px] h-[100svh] w-full"
      aria-labelledby="hero-heading"
      style={{ minHeight: "var(--hero-min-height)" } as React.CSSProperties}
    >
      <HeroVisual />
      <HeroContent />

    </section>
  );
}