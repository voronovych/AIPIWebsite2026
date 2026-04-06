import Image from "next/image";
import Link from "next/link";
import aipiLogo from "@/assets/AiPilogo-white.png";

export default function Hero() {
  return (
    <section className="bg-[#0c1425] pt-36 pb-28 sm:pt-48 sm:pb-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_3fr]">
          <div className="hidden lg:flex items-center justify-start -ml-4">
            <Image
              src={aipiLogo}
              alt="AiPi Solutions"
              className="w-full max-w-md brightness-110"
              priority
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl leading-[1.08]">
              Develop, protect, and monetize innovation
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
