import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "AiPi LLC — 11 years accelerating the value of science and deep tech. Offices in the US and UK, serving innovators across North America and Europe.",
};

export default function AboutPage() {
  return <AboutContent />;
}
