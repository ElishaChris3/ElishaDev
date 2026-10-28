"use client";

import { useEffect, useRef } from "react";
import type { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BrowserMockup, PhoneStack } from "@/components/WorkMockups";
import talkioWeb from "@/assets/work/talkio-web.webp";
import talkioApp1 from "@/assets/work/talkio-app-1.webp";
import talkioApp2 from "@/assets/work/talkio-app-2.webp";
import talkioApp3 from "@/assets/work/talkio-app-3.webp";
import nowvplay from "@/assets/work/nowvplay.webp";
import skilkit from "@/assets/work/skilkit.webp";
import olleh from "@/assets/work/olleh.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  href: string;
  cta: string;
  wide?: boolean;
} & (
  | { kind: "web"; image: StaticImageData; domain: string; alt: string }
  | { kind: "app"; screens: [StaticImageData, StaticImageData, StaticImageData] }
);

const PROJECTS: Project[] = [
  {
    kind: "web",
    title: "Talkio",
    blurb:
      "AI-powered language training platform — learners practise speaking with an AI tutor and get feedback on pronunciation and fluency.",
    tags: ["Web App", "AI", "EdTech"],
    href: "https://www.talkio.ai/",
    cta: "Visit site",
    image: talkioWeb,
    domain: "talkio.ai",
    alt: "Talkio website — Practice Languages with AI",
  },
  {
    kind: "app",
    title: "Talkio Mobile",
    blurb:
      "Talkio on Android — real conversations with an AI tutor, structured courses and progress tracking in your pocket.",
    tags: ["Mobile App", "Android"],
    href: "https://play.google.com/store/apps/details?id=com.talkio.mobile&hl=en",
    cta: "Get the app",
    screens: [talkioApp1, talkioApp2, talkioApp3],
  },
  {
    kind: "web",
    title: "Now V Play",
    blurb:
      "Sports venue platform — find turf, matches and academies nearby and book them in a few taps.",
    tags: ["Platform", "Booking", "Sports"],
    href: "https://www.nowvplay.com/",
    cta: "Visit site",
    image: nowvplay,
    domain: "nowvplay.com",
    alt: "Now V Play website — Find your next game",
  },
  {
    kind: "web",
    title: "Skilkit",
    blurb:
      "Scalable mentoring and training programs for people and organisations, with a dashboard for programs, users and analytics.",
    tags: ["SaaS", "Dashboard"],
    href: "https://www.skilkit.com/",
    cta: "Visit site",
    image: skilkit,
    domain: "skilkit.com",
    alt: "Skilkit website — Scalable Mentoring and Training Programs",
  },
  {
    kind: "web",
    title: "Olleh.ai",
    blurb:
      "AI voice agents that turn static websites into conversations — engaging visitors and answering customers around the clock.",
    tags: ["AI", "Voice Agents"],
    href: "https://olleh.ai/",
    cta: "Visit site",
    image: olleh,
    domain: "olleh.ai",
    alt: "Olleh.ai website — AI voice agents for customer calls",
  },
];

function ProjectCard({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  const number = String(index + 1).padStart(2, "0");

  if (compact) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — ${project.cta.toLowerCase()} (opens in a new tab)`}
        className="work-card group block w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#053d2e]"
      >
        <div className="work-panel flex h-full flex-col overflow-hidden rounded-xl bg-linear-to-br from-slate-100 to-slate-200 text-black">
          <div className="relative aspect-video overflow-hidden">
            <div className="work-media absolute inset-0 flex items-center justify-center">
              {project.kind === "web" ? (
                <div className="w-[78%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-1 group-hover:scale-[1.02]">
                  <BrowserMockup
                    src={project.image}
                    alt={project.alt}
                    domain={project.domain}
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 40vw, 90vw"
                  />
                </div>
              ) : (
                <div className="h-full w-[66%]">
                  <PhoneStack screens={project.screens} />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
              Live
            </span>
            <h3 className="overflow-hidden">
              <span className="work-title block text-lg font-black uppercase leading-none tracking-[-0.02em] sm:text-xl">
                {project.title}
              </span>
            </h3>
            <p className="work-meta mt-2 line-clamp-2 text-sm leading-relaxed text-black/60">
              {project.blurb}
            </p>

            <div className="work-meta mt-auto pt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em]">
                {project.cta}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-rotate-45"
                >
                  &rarr;
                </span>
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.cta.toLowerCase()} (opens in a new tab)`}
      className={`work-card group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 ${
        project.wide ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={`work-panel relative overflow-hidden rounded-2xl bg-[#efefef] aspect-square sm:aspect-4/3 ${
          project.wide ? "lg:aspect-video" : ""
        }`}
      >
        <div className="work-media absolute inset-0 flex items-center justify-center">
          {project.kind === "web" ? (
            <div className={`w-[82%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-2 group-hover:scale-[1.02] ${
              project.wide ? "lg:w-[70%]" : ""
            }`}>
              <BrowserMockup
                src={project.image}
                alt={project.alt}
                domain={project.domain}
                sizes={project.wide ? "(min-width: 1024px) 70vw, 90vw" : "(min-width: 1024px) 45vw, 90vw"}
              />
            </div>
          ) : (
            <PhoneStack screens={project.screens} />
          )}
        </div>

        <span className="absolute top-5 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          {number}
        </span>
        <span className="absolute top-5 right-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div>
          <h3 className="overflow-hidden">
            <span className="work-title block text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-5xl">
              {project.title}
            </span>
          </h3>
          <p className="work-meta mt-3 max-w-md leading-relaxed text-black/60">{project.blurb}</p>
        </div>

        <div className="work-meta flex shrink-0 flex-col gap-4 sm:items-end">
          <ul className="flex flex-wrap gap-2 sm:justify-end">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-black/60"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em]">
            {project.cta}
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-rotate-45"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

// `ready` flips once the intro timeline in Home.tsx finishes and scrolling unlocks.
export default function Work({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".work-heading-line", {
          yPercent: 110,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".work-heading", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          const q = gsap.utils.selector(card);

          gsap
            .timeline({
              defaults: { ease: "power4.out" },
              scrollTrigger: { trigger: card, start: "top 85%" },
            })
            .fromTo(
              q(".work-panel"),
              { clipPath: "inset(14% 8% 14% 8% round 16px)" },
              { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.3 }
            )
            .from(q(".work-media"), { scale: 1.15, duration: 1.6 }, 0)
            .from(q(".work-phone"), { yPercent: 40, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 0.15)
            .from(q(".work-title"), { yPercent: 110, duration: 1 }, 0.3)
            .from(q(".work-meta"), { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.45);

          // Gentle parallax on the mockup while the card passes through the viewport.
          gsap.fromTo(
            q(".work-media"),
            { y: 16 },
            {
              y: -16,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="mt-16 px-3 sm:mt-24 sm:px-4">
      <div className="relative overflow-hidden rounded-4xl bg-[#053d2e] text-white sm:rounded-[3rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -left-32 h-105 w-155 rounded-full bg-emerald-400/25 blur-[120px]"
        />

        <div className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="work-heading mb-12 flex items-end justify-between gap-6 border-b border-white/15 pb-8">
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl">
              <span className="block overflow-hidden">
                <span className="work-heading-line block">Selected</span>
              </span>
              <span className="block overflow-hidden">
                <span className="work-heading-line block text-emerald-300">Work</span>
              </span>
            </h2>
            <a
              href="/work"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[#053d2e]"
            >
              View All
              <span className="inline-block transition-transform duration-300 group-hover:-rotate-45">→</span>
            </a>
          </div>

          <div className="work-scroll-container flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4" style={{ scrollBehavior: "smooth" }}>
            {PROJECTS.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
