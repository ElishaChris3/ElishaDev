"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Phrase = [string, string];

const CODE_PHRASES: Phrase[] = [
  ["Code that", "ships."],
  ["APIs that", "scale."],
  ["Ideas into", "products."],
  ["Bugs? Already", "squashed."],
  ["Full stack,", "end to end."],
];

const STORY_PHRASES: Phrase[] = [
  ["Stories that", "stick."],
  ["Videos that", "teach."],
  ["Building in", "public."],
  ["Content that", "connects."],
  ["Tutorials that", "click."],
];

// Outer span clips, inner .hero-line is what Home.tsx slides up on reveal.
function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden">
      <span className="hero-line block">{children}</span>
    </span>
  );
}

const headlineClass =
  "font-black uppercase leading-[0.9] tracking-[-0.04em] text-[12vw] sm:text-[5.6vw]";

export function TypedHeadline({ active }: { active: boolean }) {
  const [shown, setShown] = useState<Phrase>(CODE_PHRASES[0]);

  useGSAP(
    () => {
      if (!active) return;

      const show = ([a, b]: Phrase, n: number) =>
        setShown([a.slice(0, n), b.slice(0, Math.max(0, n - a.length))]);

      const tl = gsap.timeline({ repeat: -1 });
      CODE_PHRASES.forEach((phrase, i) => {
        const next = CODE_PHRASES[(i + 1) % CODE_PHRASES.length];
        const len = phrase[0].length + phrase[1].length;
        const nextLen = next[0].length + next[1].length;
        const del = { n: len };
        const type = { n: 0 };

        tl.to({}, { duration: 2.4 })
          .to(del, {
            n: 0,
            duration: len * 0.025,
            ease: "none",
            onUpdate: () => show(phrase, Math.round(del.n)),
          })
          .to(type, {
            n: nextLen,
            duration: nextLen * 0.06,
            ease: "none",
            delay: 0.25,
            onUpdate: () => show(next, Math.round(type.n)),
          });
      });
    },
    { dependencies: [active] }
  );

  const cursorOnSecond = shown[1].length > 0;
  const cursor = <span>|</span>;

  return (
    <h1 className={headlineClass}>
      <Line>
        {shown[0] || "​"}
        {!cursorOnSecond && cursor}
      </Line>
      <Line>
        {shown[1] || "​"}
        {cursorOnSecond && cursor}
      </Line>
    </h1>
  );
}

// Content side: letters roll out upward, the next phrase rolls in from below.
export function RollingHeadline({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      gsap.fromTo(
        ".roll-char",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, stagger: 0.02, ease: "power4.out" }
      );
    },
    { scope: ref, dependencies: [index] }
  );

  useEffect(() => {
    if (!active) return;
    const el = ref.current!;
    let interval: ReturnType<typeof setInterval>;

    const rollOut = () => {
      gsap.to(el.querySelectorAll(".roll-char"), {
        yPercent: -110,
        duration: 0.4,
        stagger: 0.012,
        ease: "power2.in",
        onComplete: () => setIndex((i) => (i + 1) % STORY_PHRASES.length),
      });
    };

    // Offset from the typing side so the two headlines alternate.
    const start = setTimeout(() => {
      rollOut();
      interval = setInterval(rollOut, 3600);
    }, 4200);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
      gsap.killTweensOf(el.querySelectorAll(".roll-char"));
    };
  }, [active]);

  const phrase = STORY_PHRASES[index];

  return (
    <h1 ref={ref} className={`${headlineClass} text-right`}>
      {phrase.map((line, li) => (
        <Line key={li}>
          {line.split("").map((char, ci) => (
            <span key={`${index}-${ci}`} className="roll-char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </Line>
      ))}
    </h1>
  );
}
