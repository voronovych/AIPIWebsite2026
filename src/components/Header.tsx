"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import aipiLogo from "@/assets/AiPilogo-white.png";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

const serviceLinks = [
  { name: "Strategic Patent Services", href: "/services/strategic" },
  { name: "Technology", href: "/services/technology" },
  { name: "Growth Facilitation", href: "/services/growth-facilitation" },
  { name: "Litigation Finance", href: "/services/litigation-finance" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-x-8">
            {navigation.map((item) =>
              item.name === "Services" ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="text-sm tracking-wide text-white/50 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>

                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      servicesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="bg-[#0c1425]/90 backdrop-blur-xl border border-white/10 rounded-lg py-2 min-w-[220px] shadow-xl">
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm tracking-wide text-white/50 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              className="border border-white/20 text-white px-5 py-2 text-sm tracking-wide rounded-full hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0c1425]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1">
          {navigation.map((item) =>
            item.name === "Services" ? (
              <div key={item.name}>
                <button
                  className="w-full flex items-center justify-between py-3 text-sm tracking-wide text-white/70"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    mobileServicesOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 pb-2 space-y-1">
                    <Link
                      href="/services"
                      className="block py-2 text-sm text-white/50 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      All Services
                    </Link>
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block py-2 text-sm text-white/50 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-sm tracking-wide text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ),
          )}
          <div className="pt-3 border-t border-white/10">
            <Link
              href="/contact"
              className="block text-center border border-white/20 text-white px-5 py-2.5 text-sm tracking-wide rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
