import Hero from "@/components/home/Hero";
import IntroStats from "@/components/home/IntroStats";
import ServicesPreview from "@/components/home/ServicesPreview";
import VisionStatement from "@/components/home/VisionStatement";
import LogoCarousel from "@/components/home/LogoCarousel";
import EngagementModel from "@/components/home/EngagementModel";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStats />
      <ServicesPreview />
      <VisionStatement />
      <LogoCarousel />
      <EngagementModel />
    </>
  );
}
