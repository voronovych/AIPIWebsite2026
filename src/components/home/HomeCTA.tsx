import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#0c1425] sm:text-4xl">
          Have a question or want to explore how AiPi can support your
          innovation strategy?
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="bg-[#1d4ed8] text-white px-8 py-3 text-sm font-semibold hover:bg-[#1e40af] transition-colors"
          >
            Start the Conversation
          </Link>
          <Link
            href="/careers"
            className="border border-[#d1d5db] text-[#4b5563] px-8 py-3 text-sm font-medium hover:border-[#0c1425] hover:text-[#0c1425] transition-colors"
          >
            View Careers
          </Link>
        </div>
      </div>
    </section>
  );
}
