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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c1425]">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-28 items-center justify-between border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={aipiLogo}
              alt="AiPi Solutions"
              className="h-12 w-auto"
              priority
            />
            <span className="text-2xl font-bold tracking-tight text-white">
              AiPi
            </span>
            <span className="text-2xl font-light tracking-tight text-white/60">
              Solutions
            </span>
          </Link>
          <div className="hidden md:flex md:items-center md:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg text-white/60 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-7 py-3.5 text-lg font-medium hover:bg-[#1e40af] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
