import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { Herosection } from "../components/Herosection";
import { AboutMe } from "../components/AboutMe";
import { EducationSection } from "../components/EducationSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ResearchInterestSection } from "../components/ResearchInterestSection";
import { ResearchSection } from "../components/ResearchSection";
import { SkillsSection } from "../components/SkillsSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />
      {/* Nav */}
      <Navbar />
      {/* Main */}
      <main>
        <Herosection />
        <AboutMe />
        <ResearchInterestSection />
        <EducationSection />
        <ExperienceSection />
        <ResearchSection />
        <SkillsSection />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};
