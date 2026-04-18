import Link from "next/link";

const links = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c1425] mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 py-12 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">
              AiPi
            </span>
            <span className="text-lg font-light tracking-tight text-white/60">
              Solutions
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <p className="text-base leading-6 text-white/40">
            8230 Leesburg Pike, Suite 660, Vienna, VA 22182
          </p>
        </div>
        <div className="flex items-center justify-between py-6">
          <p className="text-sm text-white/30">
            &copy; 2026 AiPi Solutions. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-sm text-white/30 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
