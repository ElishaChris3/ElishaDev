import Image, { type StaticImageData } from "next/image";

// Desktop screenshot inside a minimal browser frame.
export function BrowserMockup({
  src,
  alt,
  domain,
  sizes,
}: {
  src: StaticImageData;
  alt: string;
  domain: string;
  sizes: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/5 sm:rounded-xl">
      <div className="flex items-center gap-3 border-b border-black/5 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex w-10 shrink-0 gap-1.5">
          <span className="h-2 w-2 rounded-full bg-black/15" />
          <span className="h-2 w-2 rounded-full bg-black/15" />
          <span className="h-2 w-2 rounded-full bg-black/15" />
        </div>
        <div className="mx-auto truncate rounded-md bg-[#efefef] px-3 py-0.5 text-[10px] font-medium text-black/50 sm:text-xs">
          {domain}
        </div>
        <div className="w-10 shrink-0" />
      </div>
      <Image src={src} alt={alt} sizes={sizes} placeholder="blur" className="block h-auto w-full" />
    </div>
  );
}

function Phone({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="work-phone overflow-hidden rounded-[1.1rem] border-[3px] border-black bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] sm:rounded-[1.6rem] sm:border-[5px]">
      <Image
        src={src}
        alt={alt}
        sizes="(min-width: 1024px) 15vw, 30vw"
        placeholder="blur"
        className="block h-auto w-full rounded-[0.8rem] sm:rounded-[1.2rem]"
      />
    </div>
  );
}

// Three app screens; the side phones fan out when the card is hovered.
export function PhoneStack({
  screens,
}: {
  screens: [StaticImageData, StaticImageData, StaticImageData];
}) {
  const [left, center, right] = screens;
  const ease = "transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]";

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={`${ease} relative z-0 mr-[-5%] w-[27%] translate-y-[6%] -rotate-6 group-hover:translate-x-[-12%] group-hover:-rotate-10`}>
        <Phone src={left} alt="Talkio app — practice real conversations with an AI tutor" />
      </div>
      <div className={`${ease} relative z-10 w-[31%] group-hover:translate-y-[-3%]`}>
        <Phone src={center} alt="Talkio app — courses screen" />
      </div>
      <div className={`${ease} relative z-0 ml-[-5%] w-[27%] translate-y-[6%] rotate-6 group-hover:translate-x-[12%] group-hover:rotate-10`}>
        <Phone src={right} alt="Talkio app — progress tracking screen" />
      </div>
    </div>
  );
}
