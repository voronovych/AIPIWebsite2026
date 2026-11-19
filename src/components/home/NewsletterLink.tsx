import Link from "next/link";

export default function NewsletterLink() {
  return (
    <Link
      href="/services/technology#newsletter"
      className="group block bg-[#f8fafc] border-b border-[#e5e7eb]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3.5 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1 text-sm text-[#4b5563]">
        <span className="text-xs tracking-widest text-[#1d4ed8] uppercase">
          Weekly Client Newsletter
        </span>
        <span>
          The week&apos;s most relevant patent filings for your technology,
          sent every week.
        </span>
        <span className="font-semibold text-[#1d4ed8] group-hover:text-[#1e40af] transition-colors whitespace-nowrap">
          See how it works &rarr;
        </span>
      </div>
    </Link>
  );
}
