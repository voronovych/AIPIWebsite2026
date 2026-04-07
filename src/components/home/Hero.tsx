import Image from "next/image";
import Link from "next/link";
import aipiLogo from "@/assets/AiPilogo-white.png";
import heroBg from "@/assets/sample_image_background.webp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 sm:pt-48 sm:pb-36">
      {/* Background image */}
      <Image
        src={heroBg}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#0c1425]/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.08]">
              Differentiate.<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px white" }}>Develop.</span><br />
              Defend.
            </h1>
            <p className="mt-8 text-lg leading-8 text-white/60 max-w-2xl">
              AiPi helps technology companies build strategic IP positions,
              raise capital, and accelerate growth using proprietary tools
              and senior-level advisory.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/contact"
                className="bg-[#1d4ed8] text-white px-7 py-3 text-sm font-semibold hover:bg-[#1e40af] transition-colors"
              >
                Speak with an Advisor
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-white/50 hover:text-white transition-colors"
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
