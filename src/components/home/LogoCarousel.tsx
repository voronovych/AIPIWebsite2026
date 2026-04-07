"use client";

import Image from "next/image";

// Add your logo imports here, e.g.:
// import logo1 from "@/assets/logos/company1.png";
// import logo2 from "@/assets/logos/company2.png";

// Replace these placeholders with real logos — 6 per row
const row1: { src: string; alt: string }[] = [
  { src: "/logos/placeholder-1.png", alt: "Company 1" },
  { src: "/logos/placeholder-2.png", alt: "Company 2" },
  { src: "/logos/placeholder-3.png", alt: "Company 3" },
  { src: "/logos/placeholder-4.png", alt: "Company 4" },
  { src: "/logos/placeholder-5.png", alt: "Company 5" },
  { src: "/logos/placeholder-6.png", alt: "Company 6" },
];

const row2: { src: string; alt: string }[] = [
  { src: "/logos/placeholder-1.png", alt: "Company 7" },
  { src: "/logos/placeholder-2.png", alt: "Company 8" },
  { src: "/logos/placeholder-3.png", alt: "Company 9" },
  { src: "/logos/placeholder-4.png", alt: "Company 10" },
  { src: "/logos/placeholder-5.png", alt: "Company 11" },
  { src: "/logos/placeholder-6.png", alt: "Company 12" },
];

const row3: { src: string; alt: string }[] = [
  { src: "/logos/placeholder-1.png", alt: "Company 13" },
  { src: "/logos/placeholder-2.png", alt: "Company 14" },
  { src: "/logos/placeholder-3.png", alt: "Company 15" },
  { src: "/logos/placeholder-4.png", alt: "Company 16" },
  { src: "/logos/placeholder-5.png", alt: "Company 17" },
  { src: "/logos/placeholder-6.png", alt: "Company 18" },
];

const rows = [
  { logos: row1, animation: "animate-scroll" },
  { logos: row2, animation: "animate-scroll-reverse" },
  { logos: row3, animation: "animate-scroll" },
];

export default function LogoCarousel() {
  return (
    <section className="relative bg-[#0c1425] py-20 sm:py-28 overflow-hidden">
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1d4ed8] via-[#3b82f6] to-[#1d4ed8]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Trusted By <span className="text-transparent" style={{ WebkitTextStroke: "1.5px white" }}>Industry Leaders</span>
        </h2>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0c1425] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0c1425] to-transparent" />

      {rows.map((row, rowIndex) => {
        const tripled = [...row.logos, ...row.logos, ...row.logos];
        return (
          <div
            key={rowIndex}
            className={`flex items-center gap-20 ${row.animation} ${rowIndex > 0 ? "mt-10" : ""}`}
            style={{ width: "max-content" }}
          >
            {tripled.map((logo, i) => (
              <div
                key={`${logo.alt}-${rowIndex}-${i}`}
                className="flex-shrink-0 h-12 w-36 relative opacity-30 hover:opacity-90 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
