import Hero from "@/components/home/Hero";
import IntroStats from "@/components/home/IntroStats";
import ServicesPreview from "@/components/home/ServicesPreview";
import VisionStatement from "@/components/home/VisionStatement";
import WhyAiPi from "@/components/home/WhyAiPi";
import EngagementModel from "@/components/home/EngagementModel";
import HomeCTA from "@/components/home/HomeCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStats />
      <ServicesPreview />
      <VisionStatement />
      <WhyAiPi />
      <EngagementModel />
      <HomeCTA />
    </>
  );
}
