import Image from "next/image";
import Link from "next/link";
import ericHeadshot from "@/assets/headshots/Eric_Morehouse_BW_Headshot.png";

const founder = {
  name: "Eric Morehouse",
  title: "Founder, Managing Director",
  quote:
    "Our work sits at the intersection of product direction, patent positioning, finance, and commercialization. This is where material business value is often won or lost.",
};

export default function VisionStatement() {
  return (
    <section className="relative bg-white py-10 sm:py-14 overflow-hidden">
      {/* Eric's photo — full section height, anchored right */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0"
        style={{ aspectRatio: "1 / 1", height: "100%" }}
      >
        <Image
          src={ericHeadshot}
          alt="Eric Morehouse"
          fill
          className="object-cover object-top grayscale"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-center items-start text-left lg:max-w-[70%]">
          <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 inline-block">
            <p className="text-lg font-medium italic leading-7 text-[#0c1425] sm:text-xl sm:leading-8">
              &ldquo;{founder.quote}&rdquo;
            </p>
            <p className="mt-6 text-base font-semibold text-[#0c1425]">
              {founder.name}
            </p>
            <p className="text-base text-[#6b7280]">{founder.title}</p>
          </div>
        </div>

        {/* Link */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link
            href="/about"
            className="text-base font-semibold text-[#6b7280] hover:text-[#0c1425] transition-colors"
          >
            See the Difference We Make &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
