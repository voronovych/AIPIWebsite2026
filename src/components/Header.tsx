import Link from "next/link";
import Image from "next/image";
import aipiLogo from "@/assets/AiPilogo-white.png";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c1425]/60 backdrop-blur-xl border-b border-white/5 font-[family-name:var(--font-dm-sans)]">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={aipiLogo}
              alt="AiPi Solutions"
              className="h-9 w-auto"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-white">
              AiPi
            </span>
            <span className="text-xl font-light tracking-tight text-white/60">
              Solutions
            </span>
          </Link>
          <div className="hidden md:flex md:items-center md:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wide text-white/50 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="border border-white/20 text-white px-5 py-2 text-sm tracking-wide rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
