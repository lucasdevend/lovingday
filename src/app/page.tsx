import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import StarsBackground from "@/components/StarsBackground";
import LiveActivity from "@/components/LiveActivity";
import PreviewExperience from "@/components/PreviewExperience";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Moments from "@/components/Moments";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <StarsBackground />

      <Navbar />

      <Hero />
    
      <PreviewExperience />

      <HowItWorks />

      <Features />

      <Moments />

      <Stats />

      <LiveActivity />

      <Testimonials />

      <Pricing />

      <FinalCTA />
    </main>
  );
}