import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AiPi Solutions, a multidisciplinary team shaping the future of innovation and intellectual property.",
};

export default function CareersPage() {
  return (
    <>
      <section className="bg-[#0c1425] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join our team at AiPi
          </h1>
          <p className="mt-6 text-base leading-7 text-white/60">
            AiPi is growing. Join a multidisciplinary team shaping the future of
            innovation and intellectual property.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[#374151] mb-2"
                >
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors"
                  placeholder="First name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[#374151] mb-2"
                >
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors"
                  placeholder="Last name"
                />
              </div>
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
                htmlFor="position"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Position interested in
              </label>
              <input
                type="text"
                id="position"
                name="position"
                className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors"
                placeholder="Position title or area of interest"
              />
            </div>

            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Resume / CV
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="w-full text-sm text-[#6b7280] file:mr-4 file:py-2.5 file:px-4 file:border file:border-[#d1d5db] file:bg-white file:text-sm file:font-medium file:text-[#374151] hover:file:bg-[#f9fafb] file:transition-colors file:cursor-pointer"
              />
            </div>

            <div>
              <label
                htmlFor="coverLetter"
                className="block text-sm font-medium text-[#374151] mb-2"
              >
                Cover letter / Message
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={5}
                className="w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1d4ed8] text-white py-3 text-base font-semibold hover:bg-[#1e40af] transition-colors"
            >
              Submit Application
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
