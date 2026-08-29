"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40"
      style={{ height: "var(--header-height)" }}
    >
      {/* Primary bar */}
      <div className="flex justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] items-center" style={{ paddingInline: "var(--header-pad-x)", height: "var(--header-height)" }}>
        {/* Logo */}
        <Link
          href="/"
          className="reveal flex flex-col justify-center"
          style={{ "--reveal-y": "-15px" } as React.CSSProperties}
          aria-label="NEXORA — Interior Design, home"
        >
          <span className="font-body text-[15px] font-semibold uppercase tracking-[0.28em] text-cream">
            Nexora
          </span>
          <span className="font-body text-[9px] uppercase tracking-[0.34em] text-cream-muted/80">
            Interior Design
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul
            className="flex items-center gap-9 xl:gap-12"
            style={{ marginInline: "4vw" }}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`reveal link-underline font-body text-[11px] font-medium uppercase tracking-[0.06em] text-cream transition-opacity hover:opacity-90 ${
                    isActive ? "link-underline--fixed" : ""
                  }`}
                  style={{ "--reveal-y": "-10px", "--reveal-delay": `${60 + i * 50}ms` } as React.CSSProperties}
                >
                  {link.label}
                </Link>
              </li>
            )})}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center justify-end gap-8">
          <Link
            href="/contact"
            className="reveal link-underline link-underline--narrow hidden font-body text-[11px] font-medium uppercase tracking-[0.06em] text-cream md:inline-block"
            style={{ "--reveal-y": "-10px", "--reveal-delay": "360ms" } as React.CSSProperties}
          >
            Let&apos;s Connect
          </Link>

          {/* Hamburger — CSS lines, toggle for mobile menu */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="reveal group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            style={{ "--reveal-y": "-10px", "--reveal-delay": "420ms" } as React.CSSProperties}
          >
            <span className="flex w-[30px] flex-col items-end gap-[7px]" aria-hidden="true">
              <span className={`h-px bg-cream transition-all duration-300 ${menuOpen ? "w-[30px] translate-y-[4px] rotate-45" : "w-[30px] group-hover:w-[22px]"}`} />
              <span className={`h-px bg-cream transition-all duration-300 ${menuOpen ? "w-[30px] -translate-y-[4px] -rotate-45" : "w-[22px] group-hover:w-[30px]"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet overlay menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0a0a]/95 px-6 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
              <li 
                key={link.label}
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? "translate-y-0 opacity-100 blur-none" : "translate-y-8 opacity-0 blur-sm"
                }`}
                style={{ transitionDelay: `${menuOpen ? 150 + i * 50 : 0}ms` }}
              >
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`font-display text-3xl sm:text-4xl tracking-wide transition-all duration-300 hover:text-white ${
                    isActive ? "text-white" : "text-cream/50 hover:scale-105 hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )})}
          </ul>
        </nav>
        
        <div 
          className={`mt-16 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="font-body text-xs uppercase tracking-[0.2em] text-cream-muted transition-colors hover:text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-cream-muted/30 after:transition-all hover:after:bg-white"
          >
            Let&apos;s Connect
          </Link>
        </div>
      </div>
    </header>
  );
}