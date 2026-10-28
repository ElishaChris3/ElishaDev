"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Content from "@/components/Content";
import Contact from "@/components/Contact";

gsap.registerPlugin(useGSAP);

function center(el: Element) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function fontSize(el: Element) {
  return parseFloat(getComputedStyle(el).fontSize);
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);

  useGSAP(
    () => {
      const name = root.current!.querySelector(".intro-name")!;
      const logoMark = root.current!.querySelector(".nav-logo-mark")!;

      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      gsap.set(".intro-char", { yPercent: 110 });
      gsap.set(".intro-tag", { autoAlpha: 0, y: 12 });
      gsap.set(".nav-pill", { xPercent: -50, y: -16, autoAlpha: 0 });
      gsap.set([".nav-logo", ".nav-logo-reg"], { autoAlpha: 0 });
      gsap.set(".nav-link", { autoAlpha: 0, y: 8 });
      gsap.set(".nav-cta", { autoAlpha: 0, x: 24 });
      gsap.set(".hero-line", { yPercent: 110 });
      gsap.set(".hero-portrait", { autoAlpha: 0, y: 40, scale: 0.96 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          gsap.set([".intro-bg", ".intro-stage"], { display: "none" });
          setIntroDone(true);
        },
      });

      // 1. Full name reveals on black
      tl.to(".intro-char", { yPercent: 0, duration: 0.9, stagger: 0.035 })
        .to(".intro-tag", { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to({}, { duration: 0.4 })

        // 2. Invert: black -> white
        .addLabel("invert")
        .to(".intro-bg", { backgroundColor: "#ffffff", duration: 0.6, ease: "power2.inOut" }, "invert")
        .to(name, { color: "#0a0a0a", duration: 0.6, ease: "power2.inOut" }, "invert")
        .to(".intro-tag", { autoAlpha: 0, y: -8, duration: 0.4, ease: "power2.in" }, "invert")

        // 3. "ELISHA CHRISTOPHER" -> "EC", empty nav pill drops in at top-center
        .addLabel("collapse")
        .to([".intro-rest", ".intro-space"], { width: 0, duration: 0.8, ease: "power3.inOut" }, "collapse")
        .to(".intro-rest .intro-char", { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "collapse")
        .to(".nav-pill", { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "collapse+=0.5")

        // 4. "EC" flies into the navbar logo slot (values measured when this step starts)
        .to(name, {
          x: () => center(logoMark).x - center(name).x,
          y: () => center(logoMark).y - center(name).y,
          scale: () => fontSize(logoMark) / fontSize(name),
          duration: 1,
          ease: "power3.inOut",
        })
        .set(".nav-logo", { autoAlpha: 1 })
        .set(".intro-stage", { autoAlpha: 0 })

        // 5. Links fill the pill
        .to(".nav-logo-reg", { autoAlpha: 1, duration: 0.3 })
        .to(".nav-link", { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, "<")

        // 6. Pill slides left, CTA appears, hero reveals
        .addLabel("slide", "+=0.3")
        .to(".nav-pill", { left: 24, xPercent: 0, duration: 1, ease: "power3.inOut" }, "slide")
        .to(".nav-cta", { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" }, "slide+=0.4")
        .set(".intro-bg", { autoAlpha: 0 }, "slide")
        .to(".hero-line", { yPercent: 0, duration: 1, stagger: 0.1 }, "slide+=0.3")
        .to(".hero-portrait", { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, "slide+=0.7")
        .to(".hero-fade", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, "slide+=0.8");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tl.progress(1);
      }

      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <Intro />
      <Navbar />
      <Hero active={introDone} />
      <Marquee />

      <Work ready={introDone} />

      <Content ready={introDone} />

      <section id="about" className="mx-auto max-w-[1600px] px-6 py-32 sm:px-10">
        <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
          About
        </h2>
      </section>

      <Contact ready={introDone} />
    </div>
  );
}
