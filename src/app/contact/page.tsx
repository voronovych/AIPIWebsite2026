import type { Metadata } from "next";

import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AiPi Solutions. Let's discuss how to turn your patents into a growth engine.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#0c1425] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Please get in touch
          </h1>
          <p className="mt-6 text-base leading-7 text-white/60">
            Let&apos;s discuss how to turn your patents into a growth engine.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <ContactForm />

          <div className="mt-16 border-t border-[#e5e7eb] pt-10">
            <p className="text-sm text-[#4b5563]">
              8230 Leesburg Pike, Suite 660, Vienna, VA 22182
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
