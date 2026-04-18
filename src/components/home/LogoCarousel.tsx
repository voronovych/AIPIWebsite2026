"use client";

import Image from "next/image";

import SymmatricsLogo from "@/assets/CompanyLogos/Symmatrics_Logo.svg";
import VectigoLogo from "@/assets/CompanyLogos/VectigoLogo.svg";
import VerdelisLogo from "@/assets/CompanyLogos/VerdelisLogo.svg";
import NewSapienceLogo from "@/assets/CompanyLogos/NewSapienceLogo.svg";
import ETCapitalLogo from "@/assets/CompanyLogos/ETCapitalLogo.svg";
import APSLogo from "@/assets/CompanyLogos/APSLogo.svg";
import GroNaturalLogo from "@/assets/CompanyLogos/GroNaturalLogo.svg";
import PreVueLogo from "@/assets/CompanyLogos/PreVueLogo.svg";
import NaturalVenturesLogo from "@/assets/CompanyLogos/NaturalVenturesLogo.svg";
import GenfoquestLogo from "@/assets/CompanyLogos/GenfoquestLogo.svg";
import CaliberLogo from "@/assets/CompanyLogos/CaliberLogo.svg";
import AccumontLogo from "@/assets/CompanyLogos/AccumontLogo.svg";

const row1 = [
  { src: SymmatricsLogo, alt: "Symmatrics" },
  { src: VectigoLogo, alt: "Vectigo" },
  { src: VerdelisLogo, alt: "Verdelis" },
  { src: NewSapienceLogo, alt: "New Sapience" },
  { src: ETCapitalLogo, alt: "ET Capital" },
  { src: APSLogo, alt: "APS" },
];

const row2 = [
  { src: GroNaturalLogo, alt: "GroNatural" },
  { src: PreVueLogo, alt: "PreVue" },
  { src: NaturalVenturesLogo, alt: "Natural Ventures" },
  { src: GenfoquestLogo, alt: "Genfoquest" },
  { src: CaliberLogo, alt: "Caliber" },
  { src: AccumontLogo, alt: "Accumont" },
];

const rows = [
  { logos: row1, animation: "animate-scroll" },
  { logos: row2, animation: "animate-scroll-reverse" },
];

export default function LogoCarousel() {
  return (
    <section className="relative bg-[#0c1425] py-20 sm:py-28 overflow-hidden">
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1d4ed8] via-[#3b82f6] to-[#1d4ed8]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Trusted By <span className="text-white/40 font-bold">Industry Leaders</span>
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
            className={`flex items-center gap-20 ${row.animation} ${rowIndex > 0 ? "mt-14" : ""}`}
            style={{ width: "max-content" }}
          >
            {tripled.map((logo, i) => (
              <div
                key={`${logo.alt}-${rowIndex}-${i}`}
                className="flex-shrink-0 h-12 w-44 relative opacity-60 hover:opacity-90 transition-all duration-300"
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
