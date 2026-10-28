"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ContentItem = {
  title: string;
  description: string;
  category: string;
  href: string;
  cta: string;
};

const CONTENT_ITEMS: ContentItem[] = [
  {
    category: "Video",
    title: "Building Scalable APIs",
    description: "Deep dive into creating APIs that can handle millions of requests.",
    href: "#",
    cta: "Watch",
  },
  {
    category: "Article",
    title: "Frontend Performance Tips",
    description: "Practical strategies to optimize your React applications.",
    href: "#",
    cta: "Read",
  },
  {
    category: "Tutorial",
    title: "Next.js App Router Guide",
    description: "Complete guide to mastering the new Next.js app router.",
    href: "#",
    cta: "Learn",
  },
  {
    category: "Video",
    title: "System Design Fundamentals",
    description: "Master the principles of designing large-scale systems.",
    href: "#",
    cta: "Watch",
  },
];

function ContentCard({ item, index }: { item: ContentItem; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <a
      href={item.href}
      className="content-card group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      <div className="content-panel relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-white p-8 sm:p-10 min-h-75 sm:min-h-87.5 flex flex-col justify-between transition-shadow duration-500 group-hover:shadow-[0_20px_50px_-20px_rgba(6,78,59,0.25)]">
        <div>
          <span className="absolute top-5 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            {number}
          </span>
          <span className="absolute top-5 right-5 inline-block rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">
            {item.category}
          </span>

          <div className="mt-8">
            <h3 className="overflow-hidden">
              <span className="content-title block text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] sm:text-4xl">
                {item.title}
              </span>
            </h3>
            <p className="content-meta mt-4 leading-relaxed text-black/60 max-w-lg">
              {item.description}
            </p>
          </div>
        </div>

        <div className="content-meta mt-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em]">
            {item.cta}
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

export default function Content({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".content-heading-line", {
          yPercent: 110,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".content-heading", start: "top 85%" },
        });

        gsap.utils.toArray<HTMLElement>(".content-card").forEach((card) => {
          const q = gsap.utils.selector(card);

          gsap
            .timeline({
              defaults: { ease: "power4.out" },
              scrollTrigger: { trigger: card, start: "top 85%" },
            })
            .fromTo(
              q(".content-panel"),
              { clipPath: "inset(14% 8% 14% 8% round 16px)" },
              { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.3 }
            )
            .from(q(".content-title"), { yPercent: 110, duration: 1 }, 0.3)
            .from(q(".content-meta"), { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08 }, 0.45);
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="content" className="mt-3 px-3 sm:mt-4 sm:px-4">
      <div className="relative overflow-hidden rounded-4xl bg-[#eef4ef] sm:rounded-[3rem]">
        {/* Faint emerald glow, echoing the one in the Contact section. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-32 h-105 w-155 rounded-full bg-emerald-300/30 blur-[120px]"
        />

        <div className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="content-heading flex items-end justify-between gap-6 border-b border-emerald-900/10 pb-8">
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              <span className="block overflow-hidden">
                <span className="content-heading-line block">Content &amp;</span>
              </span>
              <span className="block overflow-hidden">
                <span className="content-heading-line block">Resources</span>
              </span>
            </h2>
            <div className="overflow-hidden text-right text-sm leading-relaxed text-black/50">
              <span className="content-heading-line block">
                ({String(CONTENT_ITEMS.length).padStart(2, "0")}) Latest
                <br />
                Videos &amp; Articles
              </span>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {CONTENT_ITEMS.map((item, i) => (
              <ContentCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
