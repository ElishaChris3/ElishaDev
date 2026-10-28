"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EMAIL, INSTAGRAM, LINKEDIN } from "@/components/socials";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Channel = {
  label: string;
  handle: string;
  href: string;
  note: string;
  icon: ReactNode;
  external: boolean;
};

const iconProps = { width: 22, height: 22, viewBox: "0 0 24 24", "aria-hidden": true } as const;

const CHANNELS: Channel[] = [
  {
    label: "Email",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    note: "Projects, collabs & enquiries",
    external: false,
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: LINKEDIN.handle,
    href: LINKEDIN.href,
    note: "Work history & professional updates",
    external: true,
    icon: (
      <svg {...iconProps} fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    handle: INSTAGRAM.handle,
    href: INSTAGRAM.href,
    note: "Behind-the-scenes & dev content",
    external: true,
    icon: (
      <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Contact({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: { trigger: root.current, start: "top 75%" },
          })
          .from(".contact-line", { yPercent: 110, duration: 1, stagger: 0.1 })
          .from(".contact-fade", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.3)
          .from(".contact-card", { autoAlpha: 0, y: 32, duration: 1, stagger: 0.1 }, 0.4);
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden rounded-t-[2rem] bg-[#0a0a0a] text-white sm:rounded-t-[3rem]"
    >
      {/* Soft emerald glow ties back to the "Live" badges on the work cards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 pt-24 pb-10 sm:px-10 sm:pt-32">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="contact-fade mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </span>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              <span className="block overflow-hidden">
                <span className="contact-line block">Let&apos;s Talk</span>
              </span>
              <span className="block overflow-hidden">
                <span className="contact-line block text-white/40">Say Hello.</span>
              </span>
            </h2>
          </div>

          <div className="contact-fade max-w-sm">
            <p className="leading-relaxed text-white/60">
              Have a product to build, a collab in mind, or just want to say hi? My inbox and DMs are open.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-emerald-400"
            >
              Send an email
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-rotate-45"
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <li key={c.label} className="contact-card">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${c.label}: ${c.handle}${c.external ? " (opens in a new tab)" : ""}`}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-5 outline-none transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-white sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-500 group-hover:bg-emerald-500">
                    {c.icon}
                  </span>
                  <span
                    aria-hidden
                    className="text-white/40 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-rotate-45 group-hover:text-white"
                  >
                    &rarr;
                  </span>
                </div>

                <span className="mt-10 text-lg font-black uppercase leading-none tracking-[-0.02em] sm:text-xl">
                  {c.label}
                </span>
                <span className="mt-2 truncate text-sm text-white/70">{c.handle}</span>
                <span className="mt-4 text-xs uppercase tracking-[0.15em] text-white/40">{c.note}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="contact-fade mt-24 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.15em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Elisha Christopher</span>
          <span>Full-Stack Engineer &amp; Content Creator</span>
          <a href="#home" className="transition-colors hover:text-white">
            Back to top &uarr;
          </a>
        </div>
      </div>
    </section>
  );
}
