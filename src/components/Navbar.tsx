const LINKS = ["Work", "Approach", "About", "Contact"];

// Presentational only — Landing.tsx animates it in from the intro:
// empty pill at top-center -> "EC" lands in .nav-logo-mark -> links fade in
// -> pill slides to the left and the CTA appears.
export default function Navbar() {
  return (
    <div className="nav-wrap pointer-events-none fixed inset-x-0 top-0 z-40 h-24">
      <div
        className="nav-pill pointer-events-auto absolute top-6 left-1/2 flex items-center gap-8 rounded-lg bg-[#efefef] px-5 py-3"
        style={{ visibility: "hidden" }}
      >
        <a href="#home" className="nav-logo flex items-start text-2xl font-black leading-none tracking-tight">
          <span className="nav-logo-mark">EC</span>
          <span className="nav-logo-reg ml-0.5 text-[0.4em]">&reg;</span>
        </a>
        <nav className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link text-base font-semibold text-black transition-opacity hover:opacity-60"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <a
        href="#contact"
        className="nav-cta pointer-events-auto absolute top-6 right-6 flex items-center gap-2 rounded-lg bg-[#efefef] px-5 py-3 text-base font-semibold text-black"
        style={{ visibility: "hidden" }}
      >
        Let&apos;s Talk
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </a>
    </div>
  );
}
