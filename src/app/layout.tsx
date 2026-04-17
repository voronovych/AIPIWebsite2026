import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplifyClientSide";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AiPi Solutions | Develop, Protect & Monetize Innovation",
    template: "%s | AiPi Solutions",
  },
  description:
    "AiPi helps technology companies develop, protect, and monetize innovation through strategic patent services, AI-driven patent intelligence, fundraising and diligence support, and go-to-market facilitation.",
  metadataBase: new URL("https://aipisolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AiPi Solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <ConfigureAmplifyClientSide />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
