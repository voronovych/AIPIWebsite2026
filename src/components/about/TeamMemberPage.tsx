"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Education = {
  degree: string;
  institution: string;
};

export default function TeamMemberPage({
  name,
  title,
  subtitle,
  image,
  flip,
  bio,
  education,
}: {
  name: string;
  title: string;
  subtitle?: string;
  image: StaticImageData;
  flip?: boolean;
  bio: string[];
  education: Education[];
}) {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0c1425] pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background:
              "linear-gradient(135deg, #0c1425 0%, #1a2a47 20%, #0c1425 40%, #162036 60%, #1e3a5f 80%, #0c1425 100%)",
            backgroundSize: "400% 400%",
          }}
        />
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] rounded-full bg-[#1d4ed8]/20 blur-[140px] animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#3b82f6]/15 blur-[120px] animate-pulse-slow-delayed" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to About
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#3b82f6]" />
              <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
                Team
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              {name}
            </h1>
            <p className="mt-3 text-lg font-medium text-[#3b82f6]">{title}</p>
            {subtitle && (
              <p className="mt-1 text-base text-white/50">{subtitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* ─── BIO ─── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
            {/* Photo */}
            <div className="relative overflow-hidden bg-[#f8fafc] aspect-[4/5] rounded-lg shadow-lg">
              <Image
                src={image}
                alt={name}
                fill
                className={`object-cover object-top ${flip ? "-scale-x-100" : ""}`}
              />
            </div>

            {/* Bio text */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl mb-6">
                About {name.split(" ")[0]}
              </h2>
              {bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base text-[#4b5563] leading-relaxed mt-4 first:mt-0"
                >
                  {paragraph}
                </p>
              ))}

              {/* Education — inline */}
              {education.length > 0 && (
                <div className="mt-10 pt-8 border-t border-[#e5e7eb]">
                  <h3 className="text-sm tracking-widest text-[#1d4ed8] uppercase mb-5">Education</h3>
                  <div className={`grid gap-4 ${education.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                    {education.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mt-0.5">
                          <svg className="w-4 h-4 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0c1425] leading-snug">{item.institution}</p>
                          <p className="text-xs text-[#6b7280] mt-0.5 leading-snug">{item.degree}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background:
              "linear-gradient(135deg, #0c1425 0%, #1a2a47 20%, #0c1425 40%, #162036 60%, #1e3a5f 80%, #0c1425 100%)",
            backgroundSize: "400% 400%",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Want to work with {name.split(" ")[0]}?
          </h2>
          <p className="mt-4 text-base text-white/50">
            Get in touch to discuss how AiPi can help your business.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
