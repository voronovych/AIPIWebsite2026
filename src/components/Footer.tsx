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
    <footer className="bg-[#080e1c] mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                AiPi
              </span>
              <span className="text-xl font-light tracking-tight text-white/60">
                Solutions
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/40">
              Strategic IP, finance, and business advisory for
              technology companies.
            </p>
          </div>
          <div>
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-sm leading-6 text-white/50">
              8230 Leesburg Pike, Suite 660
              <br />
              Vienna, VA 22182
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; 2026 AiPi Solutions. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs text-white/30 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
