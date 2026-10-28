const WORDS = ["ELISHA", "CHRISTOPHER"];

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="intro-char inline-block">
          {char}
        </span>
      ))}
    </>
  );
}

// Presentational only — the timeline lives in Landing.tsx.
// Each word is split into its first letter + the rest, so the rest can
// collapse and leave "EC" to fly into the navbar logo slot.
export default function Intro() {
  return (
    <>
      <div className="intro-bg fixed inset-0 z-30 bg-black" />

      <div className="intro-stage pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center">
        <h1 className="intro-name flex items-center whitespace-nowrap font-black uppercase leading-none tracking-tight text-white text-[8.5vw] sm:text-[7vw]">
          {WORDS.map((word, i) => (
            <span key={word} className="flex overflow-hidden py-[0.06em]">
              {i > 0 && <span className="intro-space inline-block w-[0.25em]" />}
              <span className="inline-block">
                <Chars text={word[0]} />
              </span>
              <span className="intro-rest inline-block overflow-hidden">
                <Chars text={word.slice(1)} />
              </span>
            </span>
          ))}
        </h1>
        <p className="intro-tag mt-6 text-xs font-medium uppercase tracking-[0.3em] text-white/70 sm:text-sm">
          Full-Stack Engineer&nbsp;&nbsp;/&nbsp;&nbsp;Content Creator
        </p>
      </div>
    </>
  );
}
