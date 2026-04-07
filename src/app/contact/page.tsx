import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with AiPi Solutions. Let's discuss how to turn your patents into a growth engine.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#0c1425] pt-36 pb-24 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Please get in touch
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Let&apos;s discuss how to turn your patents into a growth engine.
          </p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1d4ed8] text-white py-3 text-sm font-semibold hover:bg-[#1e40af] transition-colors"
            >
              Send Message
            </button>
          </form>

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
