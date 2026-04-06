import Link from "next/link";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c1425]">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              AiPi
            </span>
            <span className="text-xl font-light tracking-tight text-white/60">
              Solutions
            </span>
          </Link>
          <div className="hidden md:flex md:items-center md:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#1e40af] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
