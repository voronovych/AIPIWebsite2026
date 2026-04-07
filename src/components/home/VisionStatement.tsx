"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import ericHeadshot from "@/assets/Eric_Morehouse_BW_Headshot.png";
import joeHeadshot from "@/assets/Joe_eaton.png";

const founders = [
  {
    name: "Eric Morehouse",
    title: "Founder, Managing Director",
    quote:
      "Our work sits at the intersection of product direction, IP positioning, finance, and commercialization. That overlap is the point, because that is where material business value is often won or lost.",
  },
  {
    name: "Joe Eaton",
    title: "CTO, Managing Director",
    quote:
      "The companies that win are the ones that understand what they own, why it matters, and how to make it work harder than the competition ever expected.",
  },
];

export default function VisionStatement() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(
    () => setActive((i) => (i + 1) % founders.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, 6000);
    return () => clearInterval(id);
  }, [paused, advance]);

  return (
    <section
      className="relative bg-white py-24 sm:py-32 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Eric's photo — full section height, anchored right */}
      <div
        className={`hidden lg:block absolute inset-y-0 right-0 transition-opacity duration-700 ${
          active === 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "1 / 1", height: "100%" }}
      >
        <Image
          src={ericHeadshot}
          alt="Eric Morehouse"
          fill
          className="object-cover object-top grayscale"
        />
      </div>

      {/* Joe's photo — full section height, anchored left (mirrored) */}
      <div
        className={`hidden lg:block absolute inset-y-0 left-0 transition-opacity duration-700 ${
          active === 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "1 / 1", height: "100%" }}
      >
        <Image
          src={joeHeadshot}
          alt="Joe Eaton"
          fill
          className="object-cover object-top grayscale"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative min-h-[320px] sm:min-h-[280px]">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === active
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={index !== active}
            >
              <div className={`flex h-full flex-col justify-center ${
                index === 0 ? "items-start text-left lg:max-w-[70%]" : "items-end text-right lg:max-w-[70%] lg:ml-auto"
              }`}>
                <p className="text-2xl font-medium italic leading-10 text-[#0c1425] sm:text-3xl">
                  &ldquo;{founder.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm font-semibold text-[#0c1425]">
                  {founder.name}
                </p>
                <p className="text-sm text-[#6b7280]">{founder.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots + link */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {founders.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show quote ${i + 1}`}
                className={`h-2 transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-[#1d4ed8]"
                    : "w-2 bg-[#0c1425]/15 hover:bg-[#0c1425]/30"
                }`}
              />
            ))}
          </div>
          <Link
            href="/about"
            className="text-sm font-semibold text-[#6b7280] hover:text-[#0c1425] transition-colors"
          >
            See the Difference We Make &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
