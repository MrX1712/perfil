import Hero from "@/components/Hero";
import ValleySection from "@/components/ValleySection";
import TruthsSection from "@/components/TruthsSection";
import MountainLevels from "@/components/MountainLevels";
import LevelsCTA from "@/components/LevelsCTA";
import BarbellCTA from "@/components/BarbellCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValleySection />
      <TruthsSection />
      <MountainLevels />
      <LevelsCTA />
      <BarbellCTA />
      <Footer />
    </div>
  );
};

export default Index;
