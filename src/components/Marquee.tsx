"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TECH_LOGOS, type TechLogo } from "@/components/techLogos";

function Logo({ logo }: { logo: TechLogo }) {
  if (!logo.path) {
    // RAG: documents feeding a search lens.
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={logo.hex} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
        <path d="M8 8h6M8 12h3" />
        <circle cx="16.5" cy="15.5" r="3.5" />
        <path d="m19 18 2.5 2.5" />
      </svg>
    );
  }

  return (
    <svg viewBox={logo.viewBox} className="h-6 w-6" fill={logo.hex} aria-hidden>
      <path d={logo.path} />
    </svg>
  );
}

export default function Marquee() {
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const row = [...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <div className="no-scrollbar overflow-hidden border-y border-black/10 py-6">
      <ul ref={trackRef} aria-label="Tech stack" className="flex w-max items-center gap-12 pr-12 whitespace-nowrap">
        {row.map((logo, i) => (
          <li
            key={i}
            aria-hidden={i >= TECH_LOGOS.length || undefined}
            className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-black/60"
          >
            <Logo logo={logo} />
            {logo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
