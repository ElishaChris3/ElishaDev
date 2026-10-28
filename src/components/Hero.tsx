import Image from "next/image";
import { RollingHeadline, TypedHeadline } from "@/components/HeroHeadlines";
import { AI_TOOLS } from "@/components/techLogos";

// Revealed by the timeline in Home.tsx; headlines start cycling once `active`.
export default function Hero({ active }: { active: boolean }) {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full flex-col px-6 pt-28 pb-16 sm:px-10"
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <TypedHeadline active={active} />
        <RollingHeadline active={active} />
      </div>

      <div className="relative mt-4 flex flex-1 flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="hero-fade order-2 flex max-w-md flex-col gap-12 sm:order-1 sm:self-stretch sm:justify-end">
          <div>
            <p className="text-xl leading-relaxed text-black/80 sm:text-2xl">
              I&apos;m Elisha Christopher, a software engineer and AI engineer
              who builds intelligent products end to end.
            </p>
            <p className="mt-5 text-base leading-relaxed text-black/60 sm:text-lg">
              From web and mobile apps to AI agents and RAG pipelines, I take
              ideas from first sketch to production, with clean code, fast
              interfaces and systems that scale. Along the way I share the
              process through content, so others can learn and build too.
            </p>
            <a
              href="#work"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em]"
            >
              See the work <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>

        <div className="hero-portrait order-1 relative aspect-4/5 w-64 overflow-hidden rounded-2xl sm:order-2 sm:w-80">
          <Image
            src="/elishapng.png"
            alt="Elisha Christopher"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="hero-fade order-3 flex w-full max-w-sm flex-col gap-12 text-right sm:w-auto sm:self-stretch sm:justify-between">
          <div className="flex flex-col items-end">
            <div className="mt-8 flex items-end gap-3">
             
       
            </div>
          </div>

          <div className="flex flex-col items-end gap-8">
          <div className="flex w-full flex-col items-end sm:w-64">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-black/50">
              AI tools I build with
            </span>
            <ul className="mt-4 flex w-full flex-col gap-2">
              {AI_TOOLS.map((tool) => (
                <li
                  key={tool.name}
                  className="flex items-center justify-between gap-4 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                    <svg viewBox={tool.viewBox} className="h-5 w-5" fill={tool.hex} aria-hidden>
                      <path d={tool.path!} />
                    </svg>
                  </span>
                  <span className="flex flex-col items-end">
                    <span className="text-sm font-black uppercase leading-none tracking-[-0.01em]">
                      {tool.name}
                    </span>
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-black/40">
                      {tool.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm leading-relaxed text-black/50">
            Software Engineer
            <br />
            AI Engineer
            <br />
            Based Remote
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
