import { AboutMe } from "../components/AboutMe";
import { ContactSection } from "../components/ContactSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { NavBar } from "../components/NavBar";
import { ProjectSection } from "../components/ProjectSection";
import { SkillSection } from "../components/SkillSection";
import { SmoothScroll } from "../components/SmoothScroll";

export const Home = () => {
  return (
    <SmoothScroll fixed={<NavBar />}>
      <div className="relative min-h-screen overflow-x-hidden text-foreground">
        <main className="relative z-10">
          <HeroSection />
          <AboutMe />
          <ExperienceSection />
          <SkillSection />
          <ProjectSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
};
