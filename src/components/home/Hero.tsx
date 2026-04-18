import Image from "next/image";
import Link from "next/link";
import aipiLogo from "@/assets/AiPilogo-white.png";
import heroBg from "@/assets/sample_image_background.webp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background image */}
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* Gradient overlay — dark on left for text, transparent on right to show image */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, #0c1425 0%, rgba(12,20,37,0.85) 35%, rgba(12,20,37,0.4) 65%, rgba(12,20,37,0.2) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl leading-[1.08] drop-shadow-lg">
              Differentiate.<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px white" }}>Develop.</span><br />
              Defend.
            </h1>
            <p className="mt-8 text-lg leading-8 text-white/80 max-w-2xl drop-shadow-md">
              AiPi helps technology companies build strategic patent positions,
              raise capital, and accelerate growth using proprietary tools
              and senior-level advisory.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/contact"
                className="bg-[#1d4ed8] text-white px-7 py-3 text-base font-semibold hover:bg-[#1e40af] transition-colors"
              >
                Speak with an Advisor
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-white/70 hover:text-white transition-colors drop-shadow-md"
              >
                About the Firm &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
